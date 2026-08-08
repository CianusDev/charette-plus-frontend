import { brandButton } from '#/shared/components/brand/brand-button'
import { CONTACT, buildWhatsAppLink } from '#/shared/data/constants'

const STEPS = [
  'Choisissez votre filière',
  'Découvrez votre kit',
  'Commandez sur WhatsApp',
]

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-linear-160 from-sand-50 from-0% via-cream via-50% to-[#fff5ef] to-100% pt-[calc(var(--spacing-header)+3rem)] pb-16">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-[20%] -right-[10%] size-[500px] rounded-full bg-[radial-gradient(circle,rgba(234,91,23,0.08)_0%,transparent_70%)]"
      />
      <div className="mx-auto grid w-[min(1120px,92vw)] items-center gap-12 md:grid-cols-2">
        <div className="order-2 md:order-1">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-sand-200 bg-white px-4 py-1.5 text-[0.85rem] font-medium text-blue">
            📍 {CONTACT.city}, {CONTACT.country}
          </div>

          <h1 className="mb-4 text-[clamp(2rem,5vw,3.25rem)] leading-[1.15] font-bold text-navy-dark">
            Choisissez votre filière.
            <br />
            <span className="text-orange">Découvrez votre kit.</span>
            <br />
            Préparez votre rentrée.
          </h1>

          <p className="mb-8 max-w-[480px] text-[1.125rem] text-gray-700">
            Charette Plus simplifie la préparation de la rentrée académique avec
            des kits complets, organisés par filière, pour les étudiants en
            architecture, urbanisme et architecture d'intérieure.
          </p>

          <div className="mb-8 flex flex-wrap gap-3">
            {STEPS.map((step, index) => (
              <div
                key={step}
                className="flex items-center gap-2 rounded-[10px] bg-white px-4 py-2 text-sm font-semibold shadow-brand"
              >
                <span className="grid size-6 place-items-center rounded-full bg-navy text-xs text-white">
                  {index + 1}
                </span>
                {step}
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            <a href="#filieres" className={brandButton({ variant: 'primary' })}>
              Voir les kits
            </a>
            <a
              href={buildWhatsAppLink(
                "Bonjour Charette Plus, j'aimerais en savoir plus sur vos kits de rentrée.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className={brandButton({ variant: 'secondary' })}
            >
              Nous contacter
            </a>
          </div>
        </div>

        <div className="relative order-1 md:order-2">
          <img
            src="/assets/images/image-accueil.jpg"
            alt="Matériel de dessin et architecture"
            loading="eager"
            className="aspect-4/3 w-full rounded-2xl object-cover shadow-brand-lg"
          />
          <div className="absolute -bottom-4 right-0 flex items-center gap-3 rounded-[10px] bg-white px-5 py-4 shadow-brand-lg md:-left-6 md:right-auto">
            <span className="text-[1.75rem]">🎓</span>
            <div>
              <strong className="block text-[0.95rem]">
                Kits complets par filière
              </strong>
              <span className="text-[0.8rem] text-gray-500">
                Tout le matériel en un seul achat
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
