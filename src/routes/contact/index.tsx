import { createFileRoute } from '@tanstack/react-router'

import { ContactSection } from '#/features/landing/components/contact-section'
import { DEFAULT_SITE_CONTENT, getSiteContent } from '#/features/site-content'
import { PageHero } from '#/shared/components/layout/page-hero'
import { PublicLayout } from '#/shared/components/layout/public-layout'
import logger from '#/shared/lib/logger'

export const Route = createFileRoute('/contact/')({
  loader: () =>
    getSiteContent().catch((error: unknown) => {
      logger.error('Chargement du contenu du site impossible', error)
      return DEFAULT_SITE_CONTENT
    }),
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.contactTitle ?? 'Contact'} — Charette Plus` },
      {
        name: 'description',
        content: loaderData?.contactIntro ?? DEFAULT_SITE_CONTENT.contactIntro,
      },
    ],
  }),
  component: ContactPage,
})

function ContactPage() {
  const content = Route.useLoaderData()

  return (
    <PublicLayout content={content}>
      <PageHero
        label={content.contactLabel}
        title={content.contactTitle}
        intro={content.contactIntro}
      />
      <ContactSection content={content} withHeading={false} />
    </PublicLayout>
  )
}
