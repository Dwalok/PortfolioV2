---
title: Owasp-Challenge
eyebrow: Cybersécurité · Projet académique
summary: Plateforme volontairement vulnérable pour entraîner une promotion sur 8 scénarios inspirés de l'OWASP Top 10.
year: 2024
order: 6
cover: /img/owasp.webp
coverAlt: Visuel du projet Owasp-Challenge
hue: 350
stack: [PHP, HTML, CSS, JavaScript]
facts:
  - { label: Objectif, value: "Une plateforme d'entraînement à 8 failles web" }
  - { label: Rôle, value: "Conception des challenges, développement, tests, parcours" }
  - { label: Livrables, value: "Plateforme, 8 challenges, consignes, environnement de déploiement" }
links:
  - { label: GitHub, href: "https://github.com/Dwalok/Owasp-Challenge" }
gallery:
  - { src: /img/owasp1.webp, alt: "Page d'accueil des challenges" }
---

## Le projet

Owasp-Challenge est une plateforme web développée dans un cadre académique pour permettre à des étudiants de s'entraîner sur les vulnérabilités web les plus fréquentes. L'interface reste volontairement sobre (HTML/CSS/JS) ; les failles sont implémentées en PHP pour reproduire des erreurs de développement réalistes.

Le but n'est pas de « casser pour casser » : chaque challenge relie l'exploit à sa cause dans le code, puis à la bonne mitigation.

## Les 8 challenges

1. **Injection SQL** — entrées non filtrées côté base.
2. **XSS** — rendu non échappé.
3. **CSRF** — actions déclenchables sans jeton.
4. **Broken Authentication** — gestion de session fragile.
5. **XXE** — parsing XML mal configuré.
6. **IDOR** — accès direct à des ressources sans contrôle d'autorisation.
7. **Insecure Deserialization** — désérialisation non sûre.
8. **SSRF** — le serveur détourné en proxy vers des ressources internes.

## Cadre

Vulnérable par conception, donc déployé isolé : machine de lab dédiée, aucun accès à des données réelles, périmètre réseau restreint et documentation claire sur où et comment le déployer sans risque.
