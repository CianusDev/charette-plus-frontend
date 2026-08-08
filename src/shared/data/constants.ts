/** Coordonnees de contact affichees sur la vitrine. */
export const CONTACT = {
  whatsapp: '2250171224359',
  whatsappDisplay: '01 71 22 43 59',
  city: 'Bondoukou',
  country: "Côte d'Ivoire",
  openingHours: 'Lundi – Samedi, 8h – 18h',
} as const

export const DEFAULT_WHATSAPP_MESSAGE =
  'Bonjour Charette Plus, je souhaite des informations sur vos kits de rentrée. Merci !'

export const PRODUCT_PLACEHOLDER = '/assets/images/product-placeholder.svg'

/** Construit un lien wa.me avec un message pre-rempli. */
export function buildWhatsAppLink(message?: string): string {
  const text = encodeURIComponent(message ?? DEFAULT_WHATSAPP_MESSAGE)
  return `https://wa.me/${CONTACT.whatsapp}?text=${text}`
}
