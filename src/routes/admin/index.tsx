import { useState, useTransition } from 'react'
import { Link, createFileRoute } from '@tanstack/react-router'
import { Eye, EyeOff, Pencil, Plus, Trash2 } from 'lucide-react'
import { toast } from 'sonner'

import {
  deleteKit,
  formatPrice,
  getAdminKits,
  getKitImage,
  updateKit,
} from '#/features/kits'
import type { Kit } from '#/features/kits'
import { buttonVariants } from '#/shared/components/ui/button'

export const Route = createFileRoute('/admin/')({
  loader: () => getAdminKits(),
  component: AdminKitsPage,
})

function AdminKitsPage() {
  const initialKits = Route.useLoaderData()
  const [kits, setKits] = useState<Array<Kit>>(initialKits)
  const [isPending, startTransition] = useTransition()

  const replaceKit = (updated: Kit) => {
    setKits((current) =>
      current.map((kit) => (kit.id === updated.id ? updated : kit)),
    )
  }

  const toggleAvailability = (kit: Kit) => {
    startTransition(async () => {
      try {
        replaceKit(await updateKit(kit.id, { available: !kit.available }))
        toast.success(
          kit.available ? 'Kit masqué de la vitrine' : 'Kit publié sur la vitrine',
        )
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : 'Modification impossible',
        )
      }
    })
  }

  const removeKit = (kit: Kit) => {
    if (
      !window.confirm(
        `Supprimer définitivement le kit "${kit.name}" et ses ${kit.itemCount} articles ?`,
      )
    ) {
      return
    }

    startTransition(async () => {
      try {
        await deleteKit(kit.id)
        setKits((current) => current.filter((entry) => entry.id !== kit.id))
        toast.success('Kit supprimé')
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : 'Suppression impossible',
        )
      }
    })
  }

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy">Kits</h1>
          <p className="text-sm text-gray-500">
            {kits.length} kit{kits.length > 1 ? 's' : ''} · le contenu de la
            vitrine se met à jour immédiatement.
          </p>
        </div>
        <Link to="/admin/kits/new" className={buttonVariants()}>
          <Plus className="size-4" />
          Nouveau kit
        </Link>
      </header>

      {kits.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-sand-200 bg-white p-12 text-center text-gray-500">
          Aucun kit pour le moment. Créez le premier.
        </p>
      ) : (
        <div className="grid gap-4">
          {kits.map((kit) => (
            <article
              key={kit.id}
              className="flex flex-wrap items-center gap-4 rounded-2xl bg-white p-4 shadow-brand"
            >
              <img
                src={getKitImage(kit)}
                alt=""
                className="size-20 rounded-xl border border-sand-100 object-cover"
              />

              <div className="min-w-[200px] flex-1">
                <div className="flex items-center gap-2">
                  {kit.icon ? <span>{kit.icon}</span> : null}
                  <h2 className="text-lg font-semibold">{kit.name}</h2>
                  <span
                    className={
                      kit.available
                        ? 'rounded-full bg-[#ecfdf5] px-2.5 py-0.5 text-xs font-semibold text-[#059669]'
                        : 'rounded-full bg-sand-100 px-2.5 py-0.5 text-xs font-semibold text-gray-500'
                    }
                  >
                    {kit.available ? 'En ligne' : 'Masqué'}
                  </span>
                </div>
                <p className="text-sm text-gray-500">{kit.tagline}</p>
                <p className="mt-1 text-sm">
                  <span className="font-semibold text-navy">
                    {formatPrice(kit.total)}
                  </span>
                  <span className="text-gray-500"> · {kit.itemCount} articles</span>
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={isPending}
                  onClick={() => toggleAvailability(kit)}
                  aria-label={kit.available ? 'Masquer le kit' : 'Publier le kit'}
                  className="grid size-10 place-items-center rounded-full border border-sand-200 text-navy transition-colors hover:border-navy disabled:opacity-50"
                >
                  {kit.available ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>

                <Link
                  to="/admin/kits/$id"
                  params={{ id: kit.id }}
                  aria-label={`Modifier ${kit.name}`}
                  className="grid size-10 place-items-center rounded-full border border-sand-200 text-navy transition-colors hover:border-navy"
                >
                  <Pencil className="size-4" />
                </Link>

                <button
                  type="button"
                  disabled={isPending}
                  onClick={() => removeKit(kit)}
                  aria-label={`Supprimer ${kit.name}`}
                  className="grid size-10 place-items-center rounded-full border border-sand-200 text-gray-500 transition-colors hover:border-red-300 hover:text-red-600 disabled:opacity-50"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
