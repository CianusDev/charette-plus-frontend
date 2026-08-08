import api, { unwrap } from '#/shared/lib/api'
import type { ApiEnvelope } from '#/shared/lib/api'
import type { Kit } from './kits.types'

/** Kits visibles sur la vitrine (uniquement ceux marques disponibles). */
export async function getKits(): Promise<Array<Kit>> {
  const response =
    await api.get<ApiEnvelope<{ kits: Array<Kit> }>>('/kits')
  return unwrap(response).kits
}

export async function getKitBySlug(slug: string): Promise<Kit> {
  const response = await api.get<ApiEnvelope<{ kit: Kit }>>(
    `/kits/${encodeURIComponent(slug)}`,
  )
  return unwrap(response).kit
}
