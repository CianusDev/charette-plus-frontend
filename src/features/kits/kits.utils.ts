import { PRODUCT_PLACEHOLDER } from '#/shared/data/constants'
import type { Kit, KitItem } from './kits.types'

/** Format monetaire du projet : "92 400 FCFA". */
export function formatPrice(amount: number): string {
  return `${new Intl.NumberFormat('fr-FR').format(amount)} FCFA`
}

export function getItemImage(item: Pick<KitItem, 'imageUrl'>): string {
  return item.imageUrl?.trim() ? item.imageUrl : PRODUCT_PLACEHOLDER
}

export function getKitImage(kit: Pick<Kit, 'imageUrl'>): string {
  return kit.imageUrl?.trim() ? kit.imageUrl : PRODUCT_PLACEHOLDER
}

export function buildKitOrderMessage(kit: Pick<Kit, 'name' | 'total'>): string {
  return `Bonjour Charette Plus, je souhaite commander le Kit ${kit.name} (${formatPrice(kit.total)}). Merci de me confirmer la disponibilité.`
}
