import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Color,
  PerspectiveCamera,
  Points,
  Scene,
  ShaderMaterial,
  Vector2,
  WebGLRenderer,
} from 'three';

/**
 * Hero background: a particle "network globe" that unfolds into a flowing
 * data terrain as the page scrolls. Reacts to the pointer.
 */
const vertex = /* glsl */ `
  uniform float uTime;
  uniform float uMorph;
  uniform vec2  uMouse;
  uniform float uSize;
  uniform float uPixelRatio;
  attribute vec3 aTarget;
  attribute float aRand;
  varying float vAlpha;
  varying float vMix;

  void main() {
    float m = smoothstep(0.0, 1.0, clamp(uMorph * 1.15 - aRand * 0.15, 0.0, 1.0));
    vec3 a = position;
    float t = uTime * 0.35;

    // breathing shell
    float n = sin(a.x * 2.7 + t) * sin(a.y * 2.3 + t * 1.3) * sin(a.z * 2.1 + t * 0.7);
    a += normalize(a) * n * 0.22;

    // terrain waves
    vec3 b = aTarget;
    b.y += sin(b.x * 0.9 + t * 2.0) * 0.28 + cos(b.z * 1.1 + t * 1.6) * 0.28;
    b.y += sin((b.x + b.z) * 2.2 + t * 3.0) * 0.06;

    vec3 p = mix(a, b, m);

    // pointer repulsion (in local xy)
    vec2 d = p.xy - uMouse * vec2(3.2, 2.0);
    float f = exp(-dot(d, d) * 1.6) * (1.0 - m * 0.6);
    p.xy += normalize(d + 0.0001) * f * 0.45;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * uPixelRatio * (0.45 + aRand) * (1.0 / -mv.z);

    vAlpha = mix(0.55 + n * 0.45, 0.25 + clamp((b.y + 2.0) * 0.9, 0.0, 1.0), m);
    vMix = clamp(aRand + f * 1.5, 0.0, 1.0);
  }
`;

const fragment = /* glsl */ `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  varying float vAlpha;
  varying float vMix;

  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    if (d > 0.5) discard;
    float glow = pow(1.0 - d * 2.0, 1.8);
    vec3 col = mix(uColorA, uColorB, smoothstep(0.55, 1.0, vMix));
    gl_FragColor = vec4(col, glow * vAlpha);
  }
`;

export function initScene(canvas: HTMLCanvasElement, zone: Element = canvas) {
  let renderer: WebGLRenderer;
  try {
    renderer = new WebGLRenderer({ canvas, antialias: false, alpha: true, powerPreference: 'high-performance' });
  } catch {
    canvas.dataset.fallback = 'true';
    return;
  }

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const small = window.matchMedia('(max-width: 820px)').matches;
  const count = small ? 6500 : 16000;

  const scene = new Scene();
  const camera = new PerspectiveCamera(42, 1, 0.1, 100);
  camera.position.set(0, 0, 7);

  const pos = new Float32Array(count * 3);
  const target = new Float32Array(count * 3);
  const rand = new Float32Array(count);
  const golden = Math.PI * (3 - Math.sqrt(5));
  const side = Math.ceil(Math.sqrt(count));

  for (let i = 0; i < count; i++) {
    // fibonacci sphere with a slightly thick shell
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const th = golden * i;
    const R = 2.05 + (Math.random() - 0.5) * 0.12;
    pos[i * 3] = Math.cos(th) * r * R;
    pos[i * 3 + 1] = y * R;
    pos[i * 3 + 2] = Math.sin(th) * r * R;

    // flat grid terrain
    const gx = (i % side) / side - 0.5;
    const gz = Math.floor(i / side) / side - 0.5;
    target[i * 3] = gx * 14 + (Math.random() - 0.5) * 0.04;
    target[i * 3 + 1] = -1.4;
    target[i * 3 + 2] = gz * 14 + (Math.random() - 0.5) * 0.04;

    rand[i] = Math.random();
  }

  const geometry = new BufferGeometry();
  geometry.setAttribute('position', new BufferAttribute(pos, 3));
  geometry.setAttribute('aTarget', new BufferAttribute(target, 3));
  geometry.setAttribute('aRand', new BufferAttribute(rand, 1));

  const uniforms = {
    uTime: { value: 0 },
    uMorph: { value: 0 },
    uMouse: { value: new Vector2(10, 10) },
    uSize: { value: small ? 34 : 42 },
    uPixelRatio: { value: Math.min(window.devicePixelRatio, 1.75) },
    uColorA: { value: new Color('#6effc9') },
    uColorB: { value: new Color('#8c7bff') },
  };

  const material = new ShaderMaterial({
    vertexShader: vertex,
    fragmentShader: fragment,
    uniforms,
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
  });

  const points = new Points(geometry, material);
  scene.add(points);

  const mouse = new Vector2(10, 10);
  const mouseTarget = new Vector2(10, 10);
  let morph = 0;
  let morphTarget = 0;
  let visible = true;
  let raf = 0;

  function resize() {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    // keep the globe framed on narrow screens
    camera.position.z = w < h ? 9.5 : 7;
    camera.updateProjectionMatrix();
  }

  function onScroll() {
    morphTarget = Math.min(window.scrollY / (window.innerHeight * 1.1), 1);
  }

  function onPointer(e: PointerEvent) {
    mouseTarget.set((e.clientX / window.innerWidth) * 2 - 1, -((e.clientY / window.innerHeight) * 2 - 1));
  }

  const start = performance.now();
  function frame() {
    const t = (performance.now() - start) / 1000;
    morph += (morphTarget - morph) * 0.06;
    mouse.lerp(mouseTarget, 0.08);

    uniforms.uTime.value = t;
    uniforms.uMorph.value = morph;
    uniforms.uMouse.value.copy(mouse);

    points.rotation.y = t * 0.06 * (1 - morph) + mouse.x * 0.25;
    points.rotation.x = mouse.y * 0.12 - morph * 0.35;
    points.position.y = -morph * 0.4;

    renderer.render(scene, camera);
    if (!reduce && visible) raf = requestAnimationFrame(frame);
  }

  resize();
  onScroll();
  window.addEventListener('resize', resize);
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('pointermove', onPointer, { passive: true });

  // stop rendering once the hero is far off-screen or the tab is hidden
  const io = new IntersectionObserver(([entry]) => {
    const was = visible;
    visible = entry.isIntersecting && !document.hidden;
    if (visible && !was && !reduce) raf = requestAnimationFrame(frame);
  });
  io.observe(zone);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      visible = false;
      cancelAnimationFrame(raf);
    } else {
      visible = true;
      if (!reduce) raf = requestAnimationFrame(frame);
    }
  });

  frame();
  canvas.classList.add('is-ready');
}
