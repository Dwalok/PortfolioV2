---
title: VaultPilot
eyebrow: Outillage IA · CLI
summary: Launcher en ligne de commande qui ouvre le bon outil IA dans le bon dossier, avec une mémoire projet partagée en Markdown.
year: 2026
order: 5
hue: 120
stack: [Python, Rich, Questionary, YAML, Ollama]
facts:
  - { label: Objectif, value: "Un point d'entrée unique pour mes outils IA, avec contexte projet" }
  - { label: LLM, value: "Ollama, Claude Code, Codex, OpenCode…" }
  - { label: Mémoire, value: "Notes Markdown partagées (vault Obsidian)" }
links:
  - { label: GitHub, href: "https://github.com/Dwalok/VaultPilot" }
---

## Le projet

J'utilise plusieurs assistants IA au quotidien. VaultPilot évite de relancer à la main le bon outil, dans le bon dossier, avec le bon contexte.

## Fonctionnement

1. Choix d'un usage : mode libre, correction, reformulation, résumé…
2. Choix du moteur : Ollama en local, Claude Code, Codex, OpenCode ou un simple terminal.
3. Choix du projet, seulement si l'usage en a besoin.
4. VaultPilot prépare le contexte à partir d'une mémoire projet en Markdown, puis lance la commande.

## Stack

Python 3, Rich pour l'affichage, Questionary pour les menus interactifs, PyYAML pour la configuration. Installable comme commande globale.
