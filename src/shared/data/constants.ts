export const PRODUCT_PLACEHOLDER = '/assets/images/product-placeholder.svg'

/**
 * Construit un lien wa.me avec un message pre-rempli.
 * Le numero et les messages viennent du contenu du site, editable depuis
 * l'administration — ils ne sont plus codes en dur ici.
 */
export function buildWhatsAppLink(number: string, message: string): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`
}
