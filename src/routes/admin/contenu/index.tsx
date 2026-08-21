import { Link, createFileRoute, useRouter } from '@tanstack/react-router'
import { ExternalLink } from 'lucide-react'
import { toast } from 'sonner'

import { getAdminSiteContent, updateSiteContent } from '#/features/site-content'
import { SiteContentForm } from '#/features/site-content/components/site-content-form'
import type { SiteContentPayload } from '#/features/site-content'

export const Route = createFileRoute('/admin/contenu/')({
  loader: () => getAdminSiteContent(),
  component: SiteContentPage,
})

function SiteContentPage() {
  const content = Route.useLoaderData()
  const router = useRouter()

  const handleSubmit = async (payload: SiteContentPayload) => {
    try {
      await updateSiteContent(payload)
      toast.success('Contenu du site mis à jour')
      await router.invalidate()
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Enregistrement impossible',
      )
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm text-gray-500">
            Textes, coordonnées et images de la vitrine. Les changements sont
            visibles immédiatement.
          </p>
        </div>
        <Link
          to="/"
          target="_blank"
          className="inline-flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-orange"
        >
          Voir la vitrine
          <ExternalLink className="size-4" />
        </Link>
      </header>

      <SiteContentForm content={content} onSubmit={handleSubmit} />
    </div>
  )
}
