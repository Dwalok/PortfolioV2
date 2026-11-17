---
title: Homelab
eyebrow: Auto-hébergement & fabrication
summary: Une infrastructure personnelle sur plusieurs machines — NAS au boîtier imprimé en 3D, DNS, reverse proxy, supervision, VPN et une quinzaine de services.
year: Depuis 2023
order: 3
featured: true
cover: /img/server.webp
coverAlt: Serveurs du homelab
hue: 205
stack: [Unraid, ZFS, Docker, Portainer, Nginx Proxy Manager, Pi-hole, Uptime Kuma, WireGuard, Cloudflare]
facts:
  - { label: Objectif, value: "Garder mes données chez moi et réduire la dépendance au cloud" }
  - { label: Rôle, value: "Architecture, déploiement, sécurisation, exploitation" }
  - { label: NAS, value: "Boîtier imprimé en 3D · Ryzen 5 5600G · 32 Go · 4 HDD + 2 SSD · 18 To" }
  - { label: Machines, value: "NAS Unraid, serveur applicatif, 2 Raspberry Pi" }
gallery:
  - { src: /img/nas.webp, alt: "Boîtier du NAS imprimé en 3D" }
  - { src: /img/nas1.webp, alt: "Intérieur du NAS, câblage et ventilation" }
  - { src: /img/nas2.webp, alt: "Modélisation 3D du boîtier" }
---

## Le projet

Mon homelab est un projet long terme : une plateforme personnelle qui héberge mes services — stockage, DNS, reverse proxy, supervision, médias, automatisation — avec un objectif simple : garder mes données chez moi et maîtriser la sécurité de bout en bout.

L'approche reste pragmatique : des briques simples, documentées, évolutives. Chaque service doit apporter une valeur réelle et rester exploitable dans la durée.

## Les machines

- **NAS (Unraid)** — boîtier conçu et imprimé en 3D, pensé pour le flux d'air, le passage des câbles et l'accès aux disques. Ryzen 5 5600G, 32 Go de RAM, 4 HDD + 2 SSD, 18 To en ZFS. Partages SMB et Time Machine.
- **Serveur applicatif (Windows)** — médias et sites web.
- **Raspberry Pi 5** — DNS filtrant, supervision, hébergement web (dont ce portfolio).
- **Raspberry Pi 4** — passerelle VPN WireGuard pour l'accès distant.

## Les services

- **Réseau & accès** : Nginx Proxy Manager, Cloudflare, Let's Encrypt, Pi-hole, WireGuard.
- **Supervision** : Uptime Kuma avec alertes Discord, Portainer pour piloter les conteneurs sur plusieurs hôtes.
- **Données & médias** : Immich (photos), Jellyfin.
- **Veille & automatisation** : FreshRSS, RSSHub, n8n, Home Assistant, Homarr.

## Le NAS imprimé en 3D

Le boîtier a été modélisé sous Fusion 360 puis imprimé : ventilation dimensionnée, cheminement des câbles, accès rapide aux disques. Côté logiciel : pool ZFS, suivi SMART, partages par usage (documents, médias, sauvegardes) avec droits séparés.

## Sécurité

Exposition Internet minimale : les services restent internes par défaut, l'accès distant passe par le VPN, et seuls quelques sites publics sortent derrière le reverse proxy et Cloudflare. Séparation des comptes admin et utilisateur, mises à jour maîtrisées.

## Prochaines étapes

Généraliser la sauvegarde (aujourd'hui le point faible), ajouter Fail2Ban / CrowdSec, et un VPN de secours hébergé hors du réseau domestique.
