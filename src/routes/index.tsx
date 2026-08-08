import { createFileRoute } from '@tanstack/react-router'

import { getKits } from '#/features/kits'
import { AboutSection } from '#/features/landing/components/about-section'
import { ContactSection } from '#/features/landing/components/contact-section'
import { FilieresSection } from '#/features/landing/components/filieres-section'
import { HeroSection } from '#/features/landing/components/hero-section'
import { WhySection } from '#/features/landing/components/why-section'
import { PublicLayout } from '#/shared/components/layout/public-layout'

export const Route = createFileRoute('/')({
  loader: () => getKits(),
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
  const kits = Route.useLoaderData()

  return (
    <PublicLayout>
      <HeroSection />
      <FilieresSection kits={kits} />
      <WhySection />
      <AboutSection />
      <ContactSection />
    </PublicLayout>
  )
}
