import { Link, createFileRoute } from '@tanstack/react-router'
import {
  AlertTriangle,
  ArrowRight,
  Eye,
  EyeOff,
  FileText,
  ImageOff,
  Package,
} from 'lucide-react'

import { formatPrice, getAdminKits } from '#/features/kits'
import { getAdminSiteContent } from '#/features/site-content'
import { buttonVariants } from '#/shared/components/ui/button'

export const Route = createFileRoute('/admin/')({
  loader: async () => {
    const [kits, content] = await Promise.all([
      getAdminKits(),
      getAdminSiteContent(),
    ])
    return { kits, content }
  },
  component: DashboardPage,
})

function StatCard({
  icon: Icon,
  label,
  value,
  hint,
}: {
  icon: typeof Package
  label: string
  value: string | number
  hint?: string
}) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-brand">
      <div className="mb-3 grid size-10 place-items-center rounded-xl bg-sand-50 text-navy">
        <Icon className="size-5" />
      </div>
      <p className="text-2xl font-bold text-navy">{value}</p>
      <p className="text-sm text-gray-500">{label}</p>
      {hint ? <p className="mt-1 text-xs text-gray-500">{hint}</p> : null}
    </div>
  )
}

function DashboardPage() {
  const { kits, content } = Route.useLoaderData()

  const online = kits.filter((kit) => kit.available)
  const hidden = kits.filter((kit) => !kit.available)
  const withoutImage = kits.filter((kit) => !kit.imageUrl)
  const withoutItems = kits.filter((kit) => kit.itemCount === 0)
  const catalogTotal = online.reduce((sum, kit) => sum + kit.total, 0)

  const updatedAt = new Date(content.updatedAt)
  const updatedLabel = Number.isNaN(updatedAt.getTime())
    ? '—'
    : new Intl.DateTimeFormat('fr-FR', {
        dateStyle: 'long',
        timeStyle: 'short',
      }).format(updatedAt)

  const alerts = [
    ...withoutImage.map((kit) => ({
      id: `image-${kit.id}`,
      kitId: kit.id,
      icon: ImageOff,
      text: `« ${kit.name} » n'a pas d'image`,
    })),
    ...withoutItems.map((kit) => ({
      id: `items-${kit.id}`,
      kitId: kit.id,
      icon: AlertTriangle,
      text: `« ${kit.name} » ne contient aucun article`,
    })),
  ]

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={Package} label="Kits au total" value={kits.length} />
        <StatCard icon={Eye} label="En ligne" value={online.length} />
        <StatCard icon={EyeOff} label="Masqués" value={hidden.length} />
        <StatCard
          icon={FileText}
          label="Valeur du catalogue en ligne"
          value={formatPrice(catalogTotal)}
          hint={`${online.reduce((sum, kit) => sum + kit.itemCount, 0)} articles`}
        />
      </div>

      <section className="rounded-2xl bg-white p-6 shadow-brand">
        <h2 className="mb-1 text-xl font-semibold text-navy">À vérifier</h2>
        <p className="mb-4 text-sm text-gray-500">
          Ce qui empêche un kit d'être présentable sur la vitrine.
        </p>

        {alerts.length === 0 ? (
          <p className="rounded-xl bg-[#ecfdf5] p-4 text-sm font-medium text-[#059669]">
            Tout est en ordre : chaque kit a une image et au moins un article.
          </p>
        ) : (
          <ul className="flex flex-col gap-2">
            {alerts.map((alert) => (
              <li key={alert.id}>
                <Link
                  to="/admin/kits/$id"
                  params={{ id: alert.kitId }}
                  className="flex items-center gap-3 rounded-xl bg-sand-50 px-4 py-3 text-sm text-navy transition-colors hover:bg-sand-100"
                >
                  <alert.icon className="size-4 shrink-0 text-orange" />
                  <span className="flex-1">{alert.text}</span>
                  <ArrowRight className="size-4 shrink-0 text-gray-500" />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <div className="grid gap-4 md:grid-cols-2">
        <section className="rounded-2xl bg-white p-6 shadow-brand">
          <h2 className="mb-1 text-lg font-semibold text-navy">Catalogue</h2>
          <p className="mb-4 text-sm text-gray-500">
            Créer, modifier, publier ou masquer un kit et ses articles.
          </p>
          <Link to="/admin/kits" className={buttonVariants()}>
            Gérer les kits
            <ArrowRight className="size-4" />
          </Link>
        </section>

        <section className="rounded-2xl bg-white p-6 shadow-brand">
          <h2 className="mb-1 text-lg font-semibold text-navy">Contenu du site</h2>
          <p className="mb-4 text-sm text-gray-500">
            Dernière modification : {updatedLabel}
          </p>
          <Link
            to="/admin/contenu"
            className={buttonVariants({ variant: 'outline' })}
          >
            Modifier le contenu
            <ArrowRight className="size-4" />
          </Link>
        </section>
      </div>
    </div>
  )
}
