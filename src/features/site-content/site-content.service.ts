import api, { unwrap } from '#/shared/lib/api'
import type { ApiEnvelope } from '#/shared/lib/api'
import type { SiteContent } from './site-content.types'

/** Contenu editorial de la vitrine (route publique). */
export async function getSiteContent(): Promise<SiteContent> {
  const response =
    await api.get<ApiEnvelope<{ content: SiteContent }>>('/site-content')
  return unwrap(response).content
}
