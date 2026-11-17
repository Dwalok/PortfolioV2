import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

/* ---------- Smooth scroll ---------- */
let lenis: Lenis | null = null;
if (!reduce) {
  lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis!.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
}

/* ---------- Mobile menu ---------- */
const menuBtn = document.querySelector<HTMLButtonElement>('.menu-btn');
const menu = document.querySelector<HTMLElement>('.mobile-menu');
function setMenu(open: boolean) {
  if (!menuBtn || !menu) return;
  menuBtn.setAttribute('aria-expanded', String(open));
  menuBtn.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
  if (open) {
    menu.hidden = false;
    lenis?.stop();
    requestAnimationFrame(() => document.documentElement.classList.add('menu-open'));
  } else {
    document.documentElement.classList.remove('menu-open');
    lenis?.start();
    setTimeout(() => {
      if (!document.documentElement.classList.contains('menu-open')) menu.hidden = true;
    }, 400);
  }
}
menuBtn?.addEventListener('click', () => setMenu(menuBtn.getAttribute('aria-expanded') !== 'true'));
menu?.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') setMenu(false);
});

document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((a) => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href')!;
    const el = id === '#' ? document.body : document.querySelector(id);
    if (!el) return;
    e.preventDefault();
    if (lenis) lenis.scrollTo(el as HTMLElement, { offset: -20, duration: 1.4 });
    else (el as HTMLElement).scrollIntoView();
    history.replaceState(null, '', id);
  });
});

/* ---------- Header: hide on scroll down, active section ---------- */
const header = document.querySelector<HTMLElement>('.site-header');
let lastY = 0;
window.addEventListener(
  'scroll',
  () => {
    const y = window.scrollY;
    header?.classList.toggle('is-scrolled', y > 40);
    header?.classList.toggle('is-hidden', y > lastY && y > 400);
    lastY = y;
  },
  { passive: true },
);

const navLinks = [...document.querySelectorAll<HTMLAnchorElement>('.nav a[href^="#"]')];
navLinks.forEach((link) => {
  const section = document.querySelector(link.getAttribute('href')!);
  if (!section) return;
  ScrollTrigger.create({
    trigger: section,
    start: 'top 50%',
    end: 'bottom 50%',
    onToggle: (self) => link.classList.toggle('is-active', self.isActive),
  });
});

/* ---------- Reveals ---------- */
if (reduce) {
  gsap.set('[data-reveal]', { opacity: 1, y: 0 });
} else {
  ScrollTrigger.batch('[data-reveal]', {
    start: 'top bottom-=10',
    once: true,
    onEnter: (els) =>
      gsap.to(els, { opacity: 1, y: 0, duration: 1.1, ease: 'expo.out', stagger: 0.08, overwrite: true }),
  });
}

/* Split headings into masked lines of words that rise in */
document.querySelectorAll<HTMLElement>('[data-split]').forEach((el) => {
  const words = splitWords(el);
  if (reduce) return;
  gsap.set(words, { yPercent: 110 });
  ScrollTrigger.create({
    trigger: el,
    start: 'top 85%',
    once: true,
    onEnter: () => gsap.to(words, { yPercent: 0, duration: 1.2, ease: 'expo.out', stagger: 0.035 }),
  });
});

/* Scroll-scrubbed manifesto: words light up as you read */
document.querySelectorAll<HTMLElement>('[data-scrub]').forEach((el) => {
  const words = splitWords(el, false);
  if (reduce) return;
  gsap.set(words, { opacity: 0.14 });
  gsap.to(words, {
    opacity: 1,
    stagger: 0.1,
    ease: 'none',
    scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 45%', scrub: true },
  });
});

function splitWords(el: HTMLElement, mask = true): HTMLElement[] {
  const out: HTMLElement[] = [];
  const walk = (node: Node) => {
    [...node.childNodes].forEach((child) => {
      if (child.nodeType === Node.TEXT_NODE) {
        const frag = document.createDocumentFragment();
        child.textContent!.split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) {
            frag.append(part);
            return;
          }
          const inner = document.createElement('span');
          inner.textContent = part;
          inner.style.display = 'inline-block';
          if (mask) {
            const outer = document.createElement('span');
            outer.style.cssText = 'display:inline-block;overflow:hidden;vertical-align:top;padding-bottom:0.08em;margin-bottom:-0.08em';
            outer.append(inner);
            frag.append(outer);
          } else frag.append(inner);
          out.push(inner);
        });
        child.replaceWith(frag);
      } else if (child.nodeType === Node.ELEMENT_NODE) walk(child);
    });
  };
  walk(el);
  return out;
}

/* ---------- Parallax ---------- */
if (!reduce) {
  document.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
    const amount = parseFloat(el.dataset.parallax || '0.15');
    gsap.fromTo(
      el,
      { yPercent: -amount * 100 },
      {
        yPercent: amount * 100,
        ease: 'none',
        scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
      },
    );
  });

  // horizontal marquee driven by scroll velocity
  document.querySelectorAll<HTMLElement>('[data-marquee]').forEach((track) => {
    const dir = track.dataset.marquee === 'reverse' ? 1 : -1;
    let x = 0;
    let boost = 0;
    lenis?.on('scroll', ({ velocity }: { velocity: number }) => {
      boost = Math.min(Math.abs(velocity) * 0.6, 12);
    });
    gsap.ticker.add(() => {
      const half = track.scrollWidth / 2;
      x += dir * (0.5 + boost);
      boost *= 0.92;
      if (x <= -half) x += half;
      if (x >= 0) x -= half;
      track.style.transform = `translate3d(${x}px,0,0)`;
    });
  });
}

/* ---------- Counters ---------- */
document.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
  const end = parseFloat(el.dataset.count!);
  if (reduce) {
    el.textContent = String(end);
    return;
  }
  const obj = { v: 0 };
  ScrollTrigger.create({
    trigger: el,
    start: 'top 90%',
    once: true,
    onEnter: () =>
      gsap.to(obj, {
        v: end,
        duration: 2,
        ease: 'expo.out',
        onUpdate: () => (el.textContent = String(Math.round(obj.v))),
      }),
  });
});

/* ---------- Pointer effects ---------- */
if (finePointer && !reduce) {
  const cursor = document.querySelector<HTMLElement>('.cursor');
  const dot = cursor?.querySelector<HTMLElement>('.cursor__dot');
  const ring = cursor?.querySelector<HTMLElement>('.cursor__ring');
  const label = cursor?.querySelector<HTMLElement>('.cursor__label');
  if (cursor && dot && ring && label) {
    const pos = { x: innerWidth / 2, y: innerHeight / 2 };
    const ringPos = { ...pos };
    window.addEventListener('pointermove', (e) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      dot.style.transform = `translate(${pos.x}px, ${pos.y}px) translate(-50%,-50%)`;
    });
    gsap.ticker.add(() => {
      ringPos.x += (pos.x - ringPos.x) * 0.18;
      ringPos.y += (pos.y - ringPos.y) * 0.18;
      ring.style.transform = `translate(${ringPos.x}px, ${ringPos.y}px) translate(-50%,-50%)`;
    });
    document.addEventListener('pointerover', (e) => {
      const target = (e.target as HTMLElement).closest<HTMLElement>('a, button, [data-cursor]');
      cursor.classList.toggle('is-hover', !!target);
      const text = target?.dataset.cursor;
      cursor.classList.toggle('has-label', !!text);
      if (text) label.textContent = text;
    });
    document.addEventListener('pointerleave', () => cursor.classList.remove('is-hover', 'has-label'));
  }

  document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => {
    const strength = parseFloat(el.dataset.magnetic || '0.3');
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      gsap.to(el, {
        x: (e.clientX - r.left - r.width / 2) * strength,
        y: (e.clientY - r.top - r.height / 2) * strength,
        duration: 0.6,
        ease: 'power3.out',
      });
    });
    el.addEventListener('pointerleave', () => gsap.to(el, { x: 0, y: 0, duration: 0.9, ease: 'elastic.out(1, 0.4)' }));
  });

  document.querySelectorAll<HTMLElement>('[data-tilt]').forEach((el) => {
    const max = parseFloat(el.dataset.tilt || '6');
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      el.style.setProperty('--mx', `${px * 100}%`);
      el.style.setProperty('--my', `${py * 100}%`);
      gsap.to(el, {
        rotateY: (px - 0.5) * max * 2,
        rotateX: -(py - 0.5) * max * 2,
        duration: 0.8,
        ease: 'power3.out',
        transformPerspective: 1200,
      });
    });
    el.addEventListener('pointerleave', () => gsap.to(el, { rotateX: 0, rotateY: 0, duration: 1, ease: 'power3.out' }));
  });
}

/* Live clock (Paris) */
const clock = document.querySelector<HTMLElement>('[data-clock]');
if (clock) {
  const fmt = new Intl.DateTimeFormat('fr-FR', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Paris' });
  const tick = () => (clock.textContent = fmt.format(new Date()));
  tick();
  setInterval(tick, 15000);
}
