---
title: Lofi
eyebrow: Front léger · Auto-hébergé
summary: Page d'ambiance minimaliste pour écouter du lofi avec fonds animés, horloge et minuteur, servie depuis mon homelab.
year: 2024
order: 9
cover: /img/lofi2.webp
coverAlt: Page principale de Lofi
hue: 300
stack: [HTML, CSS, JavaScript, Nginx]
facts:
  - { label: Objectif, value: "Écouter du lofi chez soi, sans abonnement ni plateforme tierce" }
  - { label: Rôle, value: "Conception UI/UX, développement, déploiement" }
  - { label: Hébergement, value: "Statique, servi par Nginx sur le homelab" }
links:
  - { label: lofi.samuelvanderhoeven.fr, href: "https://lofi.samuelvanderhoeven.fr/" }
  - { label: GitHub, href: "https://github.com/Dwalok/Lofi" }
gallery:
  - { src: /img/lofi3.webp, alt: "Sélecteur de fonds d'écran" }
  - { src: /img/lofi4.webp, alt: "Minuteur et contrôles audio" }
---

## Le projet

Lofi est une page web minimaliste qui lance une musique lofi sur un fond d'écran animé. L'idée : une ambiance de travail instantanée, sans pub, sans compte, sans abonnement.

## Fonctionnalités

- Lecture / pause et réglage du volume.
- Plusieurs fonds animés pour changer d'ambiance.
- Horloge en temps réel et minuteur, utilisable en mode pomodoro.

## Technique

Volontairement sans framework : HTML, CSS et JavaScript, chaque fonctionnalité isolée (lecteur, minuteur, fonds). Servi en statique par Nginx sur mon homelab, donc rapide à charger et sans dépendance externe.

## Évolutions prévues

Bruits d'ambiance (pluie, feu de cheminée, bruit blanc), meilleur responsive, choix de playlists ou de radios depuis l'interface, et une configuration JSON pour ajouter facilement des fonds et des sources audio.
