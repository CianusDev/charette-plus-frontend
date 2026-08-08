import { WhatsAppIcon } from '#/shared/components/brand/whatsapp-icon'
import { buildWhatsAppLink } from '#/shared/data/constants'

export function WhatsAppFloat() {
  return (
    <a
      href={buildWhatsAppLink(
        'Bonjour Charette Plus, je souhaite des informations sur vos kits de rentrée.',
      )}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contacter sur WhatsApp"
      className="fixed right-6 bottom-6 z-200 grid size-15 place-items-center rounded-full bg-whatsapp shadow-[0_4px_20px_rgb(37_211_102_/_0.5)] transition-transform hover:scale-110"
    >
      <WhatsAppIcon className="size-8 text-white" />
    </a>
  )
}
