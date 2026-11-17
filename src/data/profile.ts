export const profile = {
  name: 'Samuel Van Der Hoeven',
  role: 'Directeur Parc & Sécurité informatique',
  company: 'Moonrise Education',
  location: 'Paris',
  email: 'samuelvdh531@gmail.com',
  site: 'https://www.samuelvanderhoeven.fr',
  linkedin: 'https://www.linkedin.com/in/samuel-van-der-hoeven-6a4a77251/',
  github: 'https://github.com/Dwalok',
  cv: '/CV_Samuel_Van_Der_Hoeven.pdf',
  languages: 'Français natif · Anglais professionnel B2',
};

export const metrics = [
  { value: 30, suffix: '+', label: 'projets livrés' },
  { value: 3, suffix: '+', label: "années d'expérience IT" },
  { value: 40, suffix: '+', label: 'clients accompagnés' },
  { value: 15, suffix: '+', label: 'avis 5 étoiles' },
];

export const focus = [
  'Pilotage du parc informatique et de la sécurité de Moonrise Education.',
  "Fusion, rationalisation et sécurisation d'environnements IT multi-écoles.",
  'Structuration des accès, des processus, de la documentation et des sauvegardes.',
  "Outils internes pour automatiser l'inventaire, les audits et le pilotage.",
];

export const strengths = [
  "Une vision bout en bout, de la stratégie SI jusqu'à l'exploitation technique.",
  'Vulgariser clairement des sujets SSI auprès de non-techniciens.',
  'Des livrables actionnables : recommandations, plans de remédiation, scripts, documentation.',
  'Une culture d’infrastructure propre : observabilité, sauvegardes, segmentation, standardisation.',
];

export const certifications = [
  'GCP cybersécurité',
  'Cisco Introduction to Cybersecurity',
  'TryHackMe 4000+ points',
  'Pix 743 points',
];

export const skills = [
  {
    title: 'Cyber gouvernance & conformité',
    items: ['EBIOS RM', 'ISO 27001', 'NIST CSF', 'RGPD', 'Audit SSI', 'Plans de remédiation'],
  },
  {
    title: 'Réseaux & sécurité réseau',
    items: ['Cisco Routing / Switching', 'BGP', 'OSPF', 'VLAN', 'ACL', 'DNS / DHCP', 'OpenVPN', 'IPSec', 'WireGuard', 'pfSense', 'Cisco ASA', 'UniFi', 'IDS / IPS'],
  },
  {
    title: 'Cloud, virtualisation & services',
    items: ['Docker', 'Kubernetes (bases)', 'Proxmox', 'VMware', 'Unraid', 'AWS EC2 / S3', 'GCP IAM', 'Azure (bases)', 'Google Workspace', 'Nginx / NPM', 'Cloudflare'],
  },
  {
    title: 'Systèmes, supervision & détection',
    items: ['Windows Server', 'Active Directory', 'GPO', 'Linux', 'Grafana', 'Prometheus', 'Zabbix', 'Netdata', 'Uptime Kuma', 'Wazuh / ELK', 'Splunk'],
  },
  {
    title: 'Automatisation & développement',
    items: ['Python', 'PowerShell', 'Bash', 'Ansible', 'n8n', 'APIs REST', 'Flask', 'Next.js / TypeScript', 'PRA / PCA'],
  },
  {
    title: 'Fabrication',
    items: ['Impression 3D', 'Fusion 360'],
  },
];

export const experience = [
  {
    period: "2026 — aujourd'hui",
    title: 'Directeur Parc & Sécurité informatique',
    org: 'Moonrise Education · Paris',
    text: "Pilotage du parc informatique et de la sécurité, fusion des systèmes d'information de plusieurs écoles : gouvernance, accès, support, documentation et outillage interne.",
    current: true,
  },
  {
    period: '2025',
    title: 'Consultant cyberdéfense',
    org: 'CGI · Toulouse',
    text: "Analyse de risques EBIOS RM sur un système critique, audit SSI (ISO 27001, NIST CSF, recommandations ANSSI), scripts d'automatisation pour fiabiliser la gestion des accès.",
  },
  {
    period: '2023 — 2025',
    title: 'Co-associé & directeur technique',
    org: 'MASC-IT',
    text: 'Gestion de parc, supervision, sauvegardes, administration Windows / Linux, bases de données et projets web pour particuliers, associations et PME.',
  },
  {
    period: '2023',
    title: 'Développeur & technicien informatique',
    org: "L'Îlot Vents",
    text: "Site de vente, mise en place d'un intranet, sauvegardes et support utilisateurs.",
  },
];

export const education = [
  {
    period: '2023 — 2025',
    title: "Master Cyber Défense des Systèmes d'Information",
    org: 'Université Polytechnique Hauts-de-France',
    text: 'Analyse de risques, sécurité opérationnelle, gouvernance SSI et conformité.',
  },
  {
    period: '2023 — 2025',
    title: "Titre d'ingénieur Réseaux & Télécommunications",
    org: 'INSA Hauts-de-France',
    text: 'Infrastructures, réseaux, architecture et ingénierie télécom.',
  },
  {
    period: '2019 — 2023',
    title: "Licence d'informatique",
    org: 'Université Polytechnique Hauts-de-France',
    text: 'Systèmes, réseaux, développement et fondamentaux informatiques.',
  },
];

/** Outils développés en poste : décrits sans nom interne, sans chiffre ni donnée du Groupe. */
export const internalTools = [
  {
    title: 'Inventaire de parc multi-sites',
    text: "Clients légers macOS et Windows qui remontent l'inventaire des postes vers un serveur central : dédoublonnage, tableau de bord, carte des équipements.",
    stack: ['Python / Flask', 'Bash', 'PowerShell', 'Nginx'],
    status: 'En production',
  },
  {
    title: 'Audit automatisé des licences',
    text: "Pipeline qui croise l'outil de téléphonie, la base RH et l'annuaire Google Workspace pour repérer les comptes d'anciens salariés encore actifs.",
    stack: ['Python', 'APIs REST', 'Google Admin SDK'],
    status: 'Livré',
  },
  {
    title: 'Cockpit de pilotage IT',
    text: 'Inbox unifiée qui agrège mails, messagerie d’équipe et tickets, avec une vue des priorités du jour et des incidents en cours.',
    stack: ['Next.js', 'PostgreSQL', 'Prisma', 'OAuth'],
    status: 'En cours',
  },
];
