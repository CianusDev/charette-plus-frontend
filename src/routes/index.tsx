import { createFileRoute } from '@tanstack/react-router'

import { getKits } from '#/features/kits'
import { AboutSection } from '#/features/landing/components/about-section'
import { ContactSection } from '#/features/landing/components/contact-section'
import { FilieresSection } from '#/features/landing/components/filieres-section'
import { HeroSection } from '#/features/landing/components/hero-section'
import { WhySection } from '#/features/landing/components/why-section'
import { DEFAULT_SITE_CONTENT, getSiteContent } from '#/features/site-content'
import { PublicLayout } from '#/shared/components/layout/public-layout'
import logger from '#/shared/lib/logger'

export const Route = createFileRoute('/')({
  // L'API injoignable ne doit pas renvoyer une page 500 : la vitrine reste
  // consultable avec le contenu de secours, et la section des filieres
  // affiche l'indisponibilite du catalogue.
  loader: async () => {
    const [kits, content] = await Promise.all([
      getKits().catch((error: unknown) => {
        logger.error('Chargement des kits impossible', error)
        return null
      }),
      getSiteContent().catch((error: unknown) => {
        logger.error('Chargement du contenu du site impossible', error)
        return DEFAULT_SITE_CONTENT
      }),
    ])

    return { kits: kits ?? [], unavailable: kits === null, content }
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        name: 'description',
        content:
          loaderData?.content.heroSubtitle ??
          DEFAULT_SITE_CONTENT.heroSubtitle,
      },
    ],
  }),
  component: LandingPage,
})

function LandingPage() {
  const { kits, unavailable, content } = Route.useLoaderData()

  return (
    <PublicLayout content={content}>
      <HeroSection content={content} />
      <FilieresSection kits={kits} content={content} unavailable={unavailable} />
      <WhySection content={content} />
      <AboutSection content={content} />
      <ContactSection content={content} />
    </PublicLayout>
  )
}
