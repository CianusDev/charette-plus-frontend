import { brandButton } from '#/shared/components/brand/brand-button'
import { WhatsAppIcon } from '#/shared/components/brand/whatsapp-icon'
import { CONTACT, buildWhatsAppLink } from '#/shared/data/constants'
import { SectionHeader } from './section-header'

const DETAILS = [
  { icon: '📍', label: 'Adresse', value: `${CONTACT.city}, ${CONTACT.country}` },
  { icon: '📱', label: 'WhatsApp', value: CONTACT.whatsappDisplay },
  { icon: '🕐', label: 'Horaires', value: CONTACT.openingHours },
]

export function ContactSection() {
  return (
    <section id="contact" className="bg-sand-50 py-14 md:py-20">
      <div className="mx-auto w-[min(1120px,92vw)]">
        <SectionHeader label="Contact" title="Prêt pour votre rentrée ?">
          Contactez-nous sur WhatsApp pour commander votre kit ou poser vos
          questions.
        </SectionHeader>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl bg-white p-8 shadow-brand">
            <h3 className="mb-4 text-xl font-semibold">Nos coordonnées</h3>
            {DETAILS.map((detail) => (
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
              Commander en 2 minutes
            </h3>
            <p className="mb-6 text-[0.925rem] opacity-90">
              Envoyez-nous un message WhatsApp avec la filière choisie. Nous
              confirmons votre commande rapidement.
            </p>
            <a
              href={buildWhatsAppLink(
                "Bonjour Charette Plus, je souhaite commander un kit de rentrée. Pouvez-vous m'aider à choisir ?",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className={brandButton({ variant: 'whatsapp' })}
            >
              <WhatsAppIcon className="size-5" />
              Ouvrir WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
