import { brandButton } from '#/shared/components/brand/brand-button'
import { WhatsAppIcon } from '#/shared/components/brand/whatsapp-icon'
import { buildWhatsAppLink } from '#/shared/data/constants'
import { SectionHeader } from './section-header'
import type { SiteContent } from '#/features/site-content'

export function ContactSection({
  content,
  withHeading = true,
}: {
  content: SiteContent
  /** Faux quand la page affiche deja le titre via PageHero. */
  withHeading?: boolean
}) {
  const details = [
    {
      icon: '📍',
      label: 'Adresse',
      value: `${content.city}, ${content.country}`,
    },
    { icon: '📱', label: 'WhatsApp', value: content.whatsappDisplay },
    { icon: '🕐', label: 'Horaires', value: content.openingHours },
  ]

  return (
    <section id="contact" className="bg-cream py-14 md:py-20">
      <div className="mx-auto w-[min(1120px,92vw)]">
        {withHeading ? (
          <SectionHeader
            label={content.contactLabel}
            title={content.contactTitle}
          >
            {content.contactIntro}
          </SectionHeader>
        ) : null}

        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl bg-white p-8 shadow-brand">
            <h3 className="mb-4 text-xl font-semibold">
              {content.contactCardTitle}
            </h3>
            {details.map((detail) => (
              <div key={detail.label} className="flex items-start gap-4 py-3">
                <span className="text-xl">{detail.icon}</span>
                <div>
                  <strong className="block text-[0.9rem]">{detail.label}</strong>
                  <span className="text-sm text-gray-500">{detail.value}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center justify-center rounded-2xl bg-linear-135 from-[#25d366] to-[#128c7e] p-10 text-center text-white shadow-brand">
            <h3 className="mb-2 text-xl font-semibold text-white">
              {content.contactWhatsappTitle}
            </h3>
            <p className="mb-6 text-[0.925rem] opacity-90">
              {content.contactWhatsappText}
            </p>
            <a
              href={buildWhatsAppLink(
                content.whatsappNumber,
                content.orderWhatsappMessage,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className={brandButton({ variant: 'whatsapp' })}
            >
              <WhatsAppIcon className="size-5" />
              {content.contactWhatsappCta}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
