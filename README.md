# Portfolio — Samuel Van Der Hoeven (v3)

Site statique généré avec [Astro](https://astro.build). Scène 3D Three.js, animations GSAP + Lenis.

## Commandes

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # sortie dans dist/ (à servir par Nginx)
npm run preview
```

## Modifier le contenu

- Profil, parcours, compétences, chiffres, outils internes : `src/data/profile.ts`
- Projets : un fichier Markdown par projet dans `src/content/projects/`
  (frontmatter : titre, résumé, stack, facts, liens, galerie ; `order` pour l'ordre, `featured` pour la mise en avant)
- Images : `public/img/` (WebP)
- CV : `public/CV_Samuel_Van_Der_Hoeven.pdf`

Les valeurs YAML contenant des virgules doivent être entre guillemets.
