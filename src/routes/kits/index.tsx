import { createFileRoute } from '@tanstack/react-router'

import { getKits } from '#/features/kits'
import { KitsCatalog } from '#/features/kits/components/kits-catalog'
import { DEFAULT_SITE_CONTENT, getSiteContent } from '#/features/site-content'
import { PageHero } from '#/shared/components/layout/page-hero'
import { PublicLayout } from '#/shared/components/layout/public-layout'
import logger from '#/shared/lib/logger'

export const Route = createFileRoute('/kits/')({
  loader: async () => {
    const [kits, content] = await Promise.all([
      getKits().catch((error: unknown) => {
        logger.error('Chargement des kits impossible', error)
        return []
      }),
      getSiteContent().catch((error: unknown) => {
        logger.error('Chargement du contenu du site impossible', error)
        return DEFAULT_SITE_CONTENT
      }),
    ])
    return { kits, content }
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.content.kitsPageTitle ?? 'Nos kits'} — Charette Plus` },
      {
        name: 'description',
        content:
          loaderData?.content.kitsPageIntro ?? DEFAULT_SITE_CONTENT.kitsPageIntro,
      },
    ],
  }),
  component: KitsPage,
})

function KitsPage() {
  const { kits, content } = Route.useLoaderData()

  return (
    <PublicLayout content={content}>
      <PageHero
        label={content.kitsLabel}
        title={content.kitsPageTitle}
        intro={content.kitsPageIntro}
      />
      <section className="py-10 md:py-14">
        <div className="mx-auto w-[min(1120px,92vw)]">
          <KitsCatalog kits={kits} />
        </div>
      </section>
    </PublicLayout>
  )
}
