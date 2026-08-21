import api, { unwrap } from '#/shared/lib/api'
import type { ApiEnvelope } from '#/shared/lib/api'
import type { SiteContent, SiteContentPayload } from './site-content.types'

export async function getAdminSiteContent(): Promise<SiteContent> {
  const response =
    await api.get<ApiEnvelope<{ content: SiteContent }>>('/admin/site-content')
  return unwrap(response).content
}

export async function updateSiteContent(
  payload: SiteContentPayload,
): Promise<SiteContent> {
  const response = await api.put<ApiEnvelope<{ content: SiteContent }>>(
    '/admin/site-content',
    payload,
  )
  return unwrap(response).content
}
