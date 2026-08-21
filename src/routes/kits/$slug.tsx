import { Link, createFileRoute } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'

import {
  buildKitOrderMessage,
  formatPrice,
  getKitBySlug,
  getKitImage,
} from '#/features/kits'
import { ProductCard } from '#/features/kits/components/product-card'
import { DEFAULT_SITE_CONTENT, getSiteContent } from '#/features/site-content'
import { brandButton } from '#/shared/components/brand/brand-button'
import { PublicLayout } from '#/shared/components/layout/public-layout'
import { buildWhatsAppLink } from '#/shared/data/constants'
import logger from '#/shared/lib/logger'

export const Route = createFileRoute('/kits/$slug')({
  loader: async ({ params }) => {
    const [kit, content] = await Promise.all([
      getKitBySlug(params.slug),
      getSiteContent().catch((error: unknown) => {
        logger.error('Chargement du contenu du site impossible', error)
        return DEFAULT_SITE_CONTENT
      }),
    ])
    return { kit, content }
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `Kit ${loaderData.kit.name} — Charette Plus` },
          { name: 'description', content: loaderData.kit.tagline },
        ]
      : [],
  }),
  errorComponent: KitNotFound,
  component: KitDetailPage,
})

function KitNotFound() {
  return (
    <PublicLayout content={DEFAULT_SITE_CONTENT}>
      <section className="mx-auto w-[min(1120px,92vw)] pt-[calc(var(--spacing-header)+4rem)] pb-20 text-center">
        <h1 className="mb-4 text-3xl font-bold">Kit introuvable</h1>
        <p className="mb-8 text-gray-700">
          Ce kit n'existe pas ou n'est plus disponible.
        </p>
        <Link to="/" hash="filieres" className={brandButton({ variant: 'primary' })}>
          Voir toutes les filières
        </Link>
      </section>
    </PublicLayout>
  )
}

function KitDetailPage() {
  const { kit, content } = Route.useLoaderData()

  return (
    <PublicLayout content={content}>
      <section className="mx-auto w-[min(1120px,92vw)] pt-[calc(var(--spacing-header)+3rem)] pb-20">
        <Link
          to="/"
          hash="filieres"
          className="mb-8 inline-flex items-center gap-2 text-[0.9rem] text-gray-500 transition-colors hover:text-orange"
        >
          <ArrowLeft className="size-4" />
          Retour aux filières
        </Link>

        <div className="mb-12 grid gap-12 md:grid-cols-2">
          <img
            src={getKitImage(kit)}
            alt={`Kit ${kit.name}`}
            className="aspect-4/3 w-full rounded-2xl object-cover shadow-brand-lg"
          />

          <div>
            <h1 className="mb-2 text-[2rem] font-bold">{kit.name}</h1>
            <p className="mb-2 text-gray-700">{kit.tagline}</p>
            <p className="mb-6 text-gray-700">{kit.description}</p>

            <div className="mb-6 rounded-2xl bg-sand-50 p-6">
              <div className="font-display text-[2rem] font-bold text-orange">
                {formatPrice(kit.total)}
              </div>
              <div className="text-sm text-gray-500">
                Prix total du kit · {kit.itemCount} articles
              </div>
            </div>

            {kit.highlights.length > 0 ? (
              <ul className="mb-8 space-y-1">
                {kit.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex items-center gap-2 py-1.5 text-[0.925rem]"
                  >
                    <span className="font-bold text-[#059669]">✓</span>
                    {highlight}
                  </li>
                ))}
              </ul>
            ) : null}

            <a
              href={buildWhatsAppLink(
                content.whatsappNumber,
                buildKitOrderMessage(kit),
              )}
              target="_blank"
              rel="noopener noreferrer"
              className={brandButton({ variant: 'primary' })}
            >
              Commander sur WhatsApp
            </a>
          </div>
        </div>

        <div>
          <h2 className="mb-2 text-[1.25rem] font-semibold">
            Contenu détaillé du kit
          </h2>
          <p className="mb-7 text-[0.95rem] text-gray-500">
            Parcourez chaque fourniture incluse dans votre kit, comme dans un
            catalogue.
          </p>

          <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-5">
            {kit.items.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </div>

          <div className="flex items-center justify-between rounded-2xl bg-navy px-6 py-5 text-[1.05rem] text-white">
            <span>Total du kit</span>
            <strong className="font-display text-[1.35rem] text-orange-light">
              {formatPrice(kit.total)}
            </strong>
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}
