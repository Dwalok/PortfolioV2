---
title: VaultGen
eyebrow: Cybersécurité · Outil web
summary: Générateur et analyseur de mots de passe — entropie, composition et détection des mots de passe courants, sans dépendance.
year: 2024
order: 7
cover: /img/vaultgen.webp
coverAlt: Interface de VaultGen
hue: 260
stack: [HTML, CSS, JavaScript]
facts:
  - { label: Objectif, value: "Générer et auditer un mot de passe sans service tiers" }
  - { label: Rôle, value: "Conception UI, développement, logique d'analyse" }
  - { label: Public, value: "Utilisateurs finaux, sensibilisation" }
links:
  - { label: GitHub, href: "https://github.com/Dwalok/VaultGen" }
gallery:
  - { src: /img/gen.webp, alt: "Réglages du générateur" }
---

## Le projet

VaultGen est une application web légère et responsive pour améliorer l'hygiène des mots de passe au quotidien : un générateur configurable et un analyseur qui rend la robustesse lisible.

## Fonctionnalités

- **Générateur** : longueur ajustable, minuscules, majuscules, chiffres, caractères spéciaux.
- **Analyse** : entropie estimée, composition, retour visuel compréhensible (pas juste « faible / fort »).
- **Mots de passe courants** : comparaison avec la liste [Common-Credentials](https://github.com/BrandonW6000/Common-Credentials) et alerte en cas de correspondance.

## Pistes pour une V2

Mode passphrase, vérification de compromission par k-anonymity (type Have I Been Pwned) plutôt qu'une liste locale, détection de motifs clavier et de dates.
