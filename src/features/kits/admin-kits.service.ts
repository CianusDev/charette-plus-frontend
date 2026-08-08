import api, { unwrap } from '#/shared/lib/api'
import type { ApiEnvelope } from '#/shared/lib/api'
import type { Kit, KitItemPayload, KitPayload } from './kits.types'

/** Routes d'administration : necessitent le cookie de session admin. */

export async function getAdminKits(): Promise<Array<Kit>> {
  const response =
    await api.get<ApiEnvelope<{ kits: Array<Kit> }>>('/admin/kits')
  return unwrap(response).kits
}

export async function getAdminKit(id: string): Promise<Kit> {
  const response = await api.get<ApiEnvelope<{ kit: Kit }>>(
    `/admin/kits/${id}`,
  )
  return unwrap(response).kit
}

export async function createKit(payload: KitPayload): Promise<Kit> {
  const response = await api.post<ApiEnvelope<{ kit: Kit }>>(
    '/admin/kits',
    payload,
  )
  return unwrap(response).kit
}

export async function updateKit(
  id: string,
  payload: Partial<KitPayload>,
): Promise<Kit> {
  const response = await api.patch<ApiEnvelope<{ kit: Kit }>>(
    `/admin/kits/${id}`,
    payload,
  )
  return unwrap(response).kit
}

export async function deleteKit(id: string): Promise<void> {
  const response = await api.delete<ApiEnvelope<null>>(`/admin/kits/${id}`)
  if (!response.success) {
    throw new Error(response.message ?? 'Suppression impossible')
  }
}

export async function addKitItem(
  kitId: string,
  payload: KitItemPayload,
): Promise<Kit> {
  const response = await api.post<ApiEnvelope<{ kit: Kit }>>(
    `/admin/kits/${kitId}/items`,
    payload,
  )
  return unwrap(response).kit
}

export async function updateKitItem(
  itemId: string,
  payload: Partial<KitItemPayload>,
): Promise<Kit> {
  const response = await api.patch<ApiEnvelope<{ kit: Kit }>>(
    `/admin/kits/items/${itemId}`,
    payload,
  )
  return unwrap(response).kit
}

export async function deleteKitItem(itemId: string): Promise<Kit> {
  const response = await api.delete<ApiEnvelope<{ kit: Kit }>>(
    `/admin/kits/items/${itemId}`,
  )
  return unwrap(response).kit
}
