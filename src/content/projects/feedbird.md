---
title: FeedBird
eyebrow: Veille cyber · Auto-hébergé
summary: Dashboard de veille technique auto-hébergeable qui transforme un flux FreshRSS en timeline de lecture moderne.
year: 2026
order: 4
hue: 190
stack: [Next.js, TypeScript, Tailwind CSS, SQLite, FreshRSS, Docker]
facts:
  - { label: Objectif, value: "Centraliser la veille cyber (CVE, CISA, rapports, tendances) dans une interface ciblée" }
  - { label: Source, value: "FreshRSS via son API compatible Google Reader" }
  - { label: Déploiement, value: "Docker, sur le homelab" }
links:
  - { label: GitHub, href: "https://github.com/Dwalok/FeedBird" }
---

## Le projet

FeedBird part d'un constat simple : un lecteur RSS brut n'est pas fait pour la veille technique. L'application reprend le flux de mon FreshRSS auto-hébergé et le présente comme une timeline orientée lecture.

## Fonctionnalités

- Recherche transverse sur titre, contenu, source, catégorie et tags.
- Filtres combinables : catégorie, source, date, lu / non lu, favoris, importance.
- Favoris et états de lecture stockés localement en SQLite, sans écrire dans FreshRSS.
- Mode clair / sombre.
- Bascule automatique sur des données de démonstration si FreshRSS est indisponible.

## Choix techniques

Front et back dans une seule application Next.js (App Router). Authentification personnelle par cookie sécurisé et mot de passe hashé en scrypt. La synchronisation charge tout le non-lu puis un historique récent configurable, sans rescanner l'archive à chaque rafraîchissement. Livré avec Dockerfile et docker-compose.
