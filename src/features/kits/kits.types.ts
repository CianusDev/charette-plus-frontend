export interface KitItem {
  id: string
  kitId: string
  name: string
  price: number
  quantity: number
  imageUrl: string | null
  imagePublicId: string | null
  position: number
}

export interface Kit {
  id: string
  slug: string
  name: string
  icon: string | null
  tagline: string
  description: string
  imageUrl: string | null
  imagePublicId: string | null
  available: boolean
  highlights: Array<string>
  position: number
  items: Array<KitItem>
  /** Somme des prix des articles, calculee par l'API. */
  total: number
  itemCount: number
}

export interface KitPayload {
  slug?: string
  name: string
  icon?: string
  tagline: string
  description: string
  imageUrl?: string
  imagePublicId?: string
  available?: boolean
  highlights?: Array<string>
  position?: number
}

export interface KitItemPayload {
  name: string
  price: number
  quantity?: number
  imageUrl?: string
  imagePublicId?: string
  position?: number
}
