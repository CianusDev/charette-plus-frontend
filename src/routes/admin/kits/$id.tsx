import { useState } from 'react'
import { Link, createFileRoute } from '@tanstack/react-router'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import { toast } from 'sonner'

import { getAdminKit, updateKit } from '#/features/kits'
import { KitForm } from '#/features/kits/components/kit-form'
import { KitItemsManager } from '#/features/kits/components/kit-items-manager'
import type { Kit, KitPayload } from '#/features/kits'

export const Route = createFileRoute('/admin/kits/$id')({
  loader: ({ params }) => getAdminKit(params.id),
  component: EditKitPage,
})

function EditKitPage() {
  const loaded = Route.useLoaderData()
  const [kit, setKit] = useState<Kit>(loaded)

  const handleSubmit = async (payload: KitPayload) => {
    try {
      setKit(await updateKit(kit.id, payload))
      toast.success('Kit mis à jour')
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Modification impossible',
      )
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link
          to="/admin"
          className="inline-flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-orange"
        >
          <ArrowLeft className="size-4" />
          Retour aux kits
        </Link>

        <Link
          to="/kits/$slug"
          params={{ slug: kit.slug }}
          target="_blank"
          className="inline-flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-orange"
        >
          Voir sur la vitrine
          <ExternalLink className="size-4" />
        </Link>
      </div>

      <h1 className="text-2xl font-bold text-navy">
        {kit.icon ? `${kit.icon} ` : ''}
        {kit.name}
      </h1>

      <KitForm kit={kit} submitLabel="Enregistrer" onSubmit={handleSubmit} />

      <KitItemsManager kit={kit} onKitChange={setKit} />
    </div>
  )
}
