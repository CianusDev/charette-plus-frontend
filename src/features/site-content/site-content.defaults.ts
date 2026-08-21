import type { SiteContent } from './site-content.types'

/**
 * Contenu de secours, identique au seed de l'API.
 * Sert uniquement quand l'API est injoignable : la vitrine reste complete et
 * lisible au lieu de s'afficher vide.
 */
export const DEFAULT_SITE_CONTENT: SiteContent = {
  id: 'site',

  whatsappNumber: '2250171224359',
  whatsappDisplay: '01 71 22 43 59',
  city: 'Bondoukou',
  country: "Côte d'Ivoire",
  openingHours: 'Lundi – Samedi, 8h – 18h',
  defaultWhatsappMessage:
    'Bonjour Charette Plus, je souhaite des informations sur vos kits de rentrée. Merci !',
  orderWhatsappMessage:
    'Bonjour Charette Plus, je souhaite commander un kit de rentrée.',

  heroBadge: "Bondoukou, Côte d'Ivoire",
  heroTitleBefore: 'Choisissez votre filière.',
  heroTitleHighlight: 'Découvrez votre kit.',
  heroTitleAfter: 'Préparez votre rentrée.',
  heroSubtitle:
    "Charette Plus simplifie la préparation de la rentrée académique avec des kits complets, organisés par filière, pour les étudiants en architecture, urbanisme et architecture d'intérieure.",
  heroSteps: [
    'Choisissez votre filière',
    'Découvrez votre kit',
    'Commandez sur WhatsApp',
  ],
  heroPrimaryCta: 'Voir les kits',
  heroSecondaryCta: 'Nous contacter',
  heroImageUrl: '/assets/images/image-accueil.jpg',
  heroImagePublicId: null,
  heroFloatTitle: 'Kits complets par filière',
  heroFloatText: 'Tout le matériel en un seul achat',

  kitsLabel: 'Nos filières',
  kitsTitle: "Choisissez votre domaine d'études",
  kitsIntro:
    'Chaque kit est conçu pour répondre aux exigences spécifiques de votre formation. Cliquez sur une filière pour voir le contenu détaillé.',
  kitsCtaLabel: 'Voir tous les kits',
  kitsPageTitle: 'Nos kits de rentrée',
  kitsPageIntro:
    'Tous nos kits, filière par filière. Chaque kit détaille son contenu et son prix total, sans surprise.',

  advantagesLabel: 'Nos avantages',
  advantagesTitle: 'Pourquoi choisir Charette Plus ?',
  advantagesIntro:
    'Nous éliminons le stress de la rentrée en regroupant tout le matériel dont vous avez besoin, sélectionné par des experts.',
  advantages: [
    {
      id: 'default-1',
      icon: '📦',
      title: 'Kits complets',
      text: 'Plus besoin de courir dans plusieurs magasins. Tout le matériel recommandé par votre établissement, en un seul ensemble.',
      position: 0,
    },
    {
      id: 'default-2',
      icon: '🎯',
      title: 'Par filière',
      text: "Chaque kit est adapté aux exigences de votre domaine : architecture, urbanisme et architecture d'intérieure.",
      position: 1,
    },
    {
      id: 'default-3',
      icon: '💰',
      title: 'Prix transparents',
      text: 'Consultez le détail de chaque article et le prix total avant de commander. Aucune surprise.',
      position: 2,
    },
    {
      id: 'default-4',
      icon: '⚡',
      title: 'Commande rapide',
      text: 'Commandez en moins de 2 minutes via WhatsApp. Réponse rapide et livraison à Bondoukou.',
      position: 3,
    },
    {
      id: 'default-5',
      icon: '✅',
      title: 'Qualité garantie',
      text: 'Matériel soigneusement sélectionné pour répondre aux standards académiques de votre filière.',
      position: 4,
    },
    {
      id: 'default-6',
      icon: '🤝',
      title: 'Accompagnement',
      text: 'Notre équipe vous guide dans le choix du kit adapté à votre niveau et votre formation.',
      position: 5,
    },
  ],

  aboutLabel: 'Notre mission',
  aboutTitle: 'Charette Plus, votre partenaire de rentrée',
  aboutParagraphs: [
    "Charette Plus est une entreprise ivoirienne spécialisée dans la conception et la commercialisation de kits de rentrée académique. Nous accompagnons les étudiants des filières techniques et créatives — architecture, urbanisme, architecture d'intérieure — en leur fournissant tout le matériel indispensable pour démarrer l'année académique.",
    'Contrairement aux papeteries traditionnelles, nous adoptons une approche centrée sur les besoins réels des étudiants. Chaque kit rassemble, dans un seul ensemble, le matériel recommandé par les établissements.',
  ],
  aboutImageUrl: '/assets/images/apropos.jpg',
  aboutImagePublicId: null,
  aboutValues: [
    {
      id: 'default-1',
      title: 'Spécialisation',
      text: 'Expertise par filière académique',
      position: 0,
    },
    {
      id: 'default-2',
      title: 'Simplicité',
      text: "Un kit, une commande, c'est tout",
      position: 1,
    },
    {
      id: 'default-3',
      title: 'Qualité',
      text: 'Matériel sélectionné avec soin',
      position: 2,
    },
    {
      id: 'default-4',
      title: 'Proximité',
      text: 'Basés à Bondoukou, proches des étudiants',
      position: 3,
    },
  ],

  contactLabel: 'Contact',
  contactTitle: 'Prêt pour votre rentrée ?',
  contactIntro:
    'Contactez-nous sur WhatsApp pour commander votre kit ou poser vos questions.',
  contactCardTitle: 'Nos coordonnées',
  contactWhatsappTitle: 'Commander en 2 minutes',
  contactWhatsappText:
    'Envoyez-nous un message WhatsApp avec la filière choisie. Nous confirmons votre commande rapidement.',
  contactWhatsappCta: 'Ouvrir WhatsApp',

  footerDescription:
    'La référence ivoirienne en kits de rentrée académique pour les filières techniques et créatives.',

  updatedAt: new Date(0).toISOString(),
}
