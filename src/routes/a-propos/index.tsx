import { createFileRoute } from '@tanstack/react-router'

import { AboutSection } from '#/features/landing/components/about-section'
import { WhySection } from '#/features/landing/components/why-section'
import { DEFAULT_SITE_CONTENT, getSiteContent } from '#/features/site-content'
import { PageHero } from '#/shared/components/layout/page-hero'
import { PublicLayout } from '#/shared/components/layout/public-layout'
import logger from '#/shared/lib/logger'

export const Route = createFileRoute('/a-propos/')({
  loader: () =>
    getSiteContent().catch((error: unknown) => {
      logger.error('Chargement du contenu du site impossible', error)
      return DEFAULT_SITE_CONTENT
    }),
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.aboutTitle ?? 'À propos'} — Charette Plus` },
      {
        name: 'description',
        content:
          loaderData?.aboutParagraphs[0] ?? DEFAULT_SITE_CONTENT.aboutParagraphs[0],
      },
    ],
  }),
  component: AboutPage,
})

function AboutPage() {
  const content = Route.useLoaderData()

  return (
    <PublicLayout content={content}>
      <PageHero label={content.aboutLabel} title={content.aboutTitle} />
      <AboutSection content={content} withHeading={false} />
      <WhySection content={content} />
    </PublicLayout>
  )
}
