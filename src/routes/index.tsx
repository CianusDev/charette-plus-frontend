import { createFileRoute } from '@tanstack/react-router'

import { getKits } from '#/features/kits'
import { AboutSection } from '#/features/landing/components/about-section'
import { ContactSection } from '#/features/landing/components/contact-section'
import { FilieresSection } from '#/features/landing/components/filieres-section'
import { HeroSection } from '#/features/landing/components/hero-section'
import { WhySection } from '#/features/landing/components/why-section'
import { PublicLayout } from '#/shared/components/layout/public-layout'
import logger from '#/shared/lib/logger'

export const Route = createFileRoute('/')({
  // L'API injoignable ne doit pas renvoyer une page 500 : la vitrine reste
  // consultable et la section des filieres affiche l'indisponibilite.
  loader: async () => {
    try {
      return { kits: await getKits(), unavailable: false }
    } catch (error) {
      logger.error('Chargement des kits impossible', error)
      return { kits: [], unavailable: true }
    }
  },
  head: () => ({
    meta: [
      {
        name: 'description',
        content:
          "Charette Plus — Kits de rentrée académique pour Architecture, Urbanisme et Architecture d'intérieure. Bondoukou, Côte d'Ivoire.",
      },
    ],
  }),
  component: LandingPage,
})

function LandingPage() {
  const { kits, unavailable } = Route.useLoaderData()

  return (
    <PublicLayout>
      <HeroSection />
      <FilieresSection kits={kits} unavailable={unavailable} />
      <WhySection />
      <AboutSection />
      <ContactSection />
    </PublicLayout>
  )
}
