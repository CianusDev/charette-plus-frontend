export interface Advantage {
  id: string
  icon: string
  title: string
  text: string
  position: number
}

export interface AboutValue {
  id: string
  title: string
  text: string
  position: number
}

export interface SiteContent {
  id: string

  whatsappNumber: string
  whatsappDisplay: string
  city: string
  country: string
  openingHours: string
  defaultWhatsappMessage: string
  orderWhatsappMessage: string

  heroBadge: string
  heroTitleBefore: string
  heroTitleHighlight: string
  heroTitleAfter: string
  heroSubtitle: string
  heroSteps: Array<string>
  heroPrimaryCta: string
  heroSecondaryCta: string
  heroImageUrl: string | null
  heroImagePublicId: string | null
  heroFloatTitle: string
  heroFloatText: string

  kitsLabel: string
  kitsTitle: string
  kitsIntro: string

  advantagesLabel: string
  advantagesTitle: string
  advantagesIntro: string
  advantages: Array<Advantage>

  aboutLabel: string
  aboutTitle: string
  aboutParagraphs: Array<string>
  aboutImageUrl: string | null
  aboutImagePublicId: string | null
  aboutValues: Array<AboutValue>

  contactLabel: string
  contactTitle: string
  contactIntro: string
  contactCardTitle: string
  contactWhatsappTitle: string
  contactWhatsappText: string
  contactWhatsappCta: string

  footerDescription: string
}

/** Corps attendu par `PUT /admin/site-content` : le contenu sans ses identifiants. */
export type SiteContentPayload = Omit<
  SiteContent,
  'id' | 'advantages' | 'aboutValues' | 'heroImageUrl' | 'heroImagePublicId' | 'aboutImageUrl' | 'aboutImagePublicId'
> & {
  heroImageUrl?: string
  heroImagePublicId?: string
  aboutImageUrl?: string
  aboutImagePublicId?: string
  advantages: Array<Omit<Advantage, 'id'>>
  aboutValues: Array<Omit<AboutValue, 'id'>>
}
