---
title: Eyeot
eyebrow: IoT à grande échelle
summary: Plateforme IoT scalable pour agréger, superviser et automatiser un très grand nombre de capteurs, jusqu'à 1000 Hz.
year: 2025 — 2026
order: 1
featured: true
cover: /img/eyeot.webp
coverAlt: Visuel de la plateforme Eyeot
hue: 165
stack: [Flask, MQTT, Docker, Kubernetes, Grafana, n8n]
facts:
  - { label: Objectif, value: "Connecter une quantité « illimitée » de capteurs et centraliser la donnée" }
  - { label: Spécificité, value: "Capteurs très haute fréquence, jusqu'à 1000 Hz" }
  - { label: Architecture, value: "Nœuds terrain → serveurs → dashboard et automatisations" }
links:
  - { label: eyeot.fr, href: "https://eyeot.fr/" }
gallery:
  - { src: /img/eyeotdash.webp, alt: "Dashboard de supervision et de pilotage des flux" }
  - { src: /img/eyeottools.webp, alt: "Outillage et intégrations de la plateforme" }
---

## Le projet

Eyeot est une plateforme IoT conçue pour agréger et superviser un très grand nombre de capteurs, y compris des capteurs haute fréquence capables de produire des mesures à 1000 Hz. L'objectif : un socle qui permet de déployer des capteurs à grande échelle tout en gardant une vue claire de ce qui se passe.

Le modèle est **nœuds → serveurs**. Les capteurs sont rattachés à des nœuds terrain qui collectent, normalisent et bufferisent les mesures. Les serveurs centralisent, traitent et exposent la donnée via dashboards, cartographie, automatisations et intégrations.

## Architecture

- **Nœuds terrain** : connexion multi-capteurs, flux temps réel, bufferisation et envoi optimisé vers le serveur.
- **Transport** : MQTT en pub/sub, pour découpler capteurs et services et absorber de gros volumes de messages.
- **Serveurs** : back-end Flask packagé en Docker, pensé pour être orchestré par Kubernetes (montée en charge horizontale, isolation, redémarrage).
- **Observabilité** : Grafana pour les graphiques, l'historique et l'alerting.
- **Automatisation** : workflows n8n et intégrations tierces (Pi-hole, Philips Hue…).

## La contrainte des 1000 Hz

Collecter ne suffit pas : il faut éviter de saturer l'ingestion, le stockage et la visualisation. L'architecture filtre ou agrège quand c'est nécessaire, bufferise côté nœud et sépare ingestion, traitement, visualisation et automatisations pour que chaque brique monte en charge indépendamment.

## Fonctionnalités

- Dashboards temps réel et historique.
- Cartographie des objets connectés.
- Gestion des utilisateurs, rôles et périmètres d'accès.
- Inventaire précis des capteurs, nœuds et objets.
- Alertes et workflows métier via n8n.

## Cas d'usage

Supervision d'environnements distribués (sites industriels, santé, smart city), suivi terrain en temps réel, déclenchement d'actions automatiques sur seuil.
