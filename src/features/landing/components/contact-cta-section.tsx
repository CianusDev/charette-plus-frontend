import { Link } from '@tanstack/react-router'

import { brandButton } from '#/shared/components/brand/brand-button'
import { WhatsAppIcon } from '#/shared/components/brand/whatsapp-icon'
import { buildWhatsAppLink } from '#/shared/data/constants'
import type { SiteContent } from '#/features/site-content'

/**
 * Bloc de fin d'accueil : renvoie vers WhatsApp et vers la page contact,
 * qui porte desormais les coordonnees completes.
 */
export function ContactCtaSection({ content }: { content: SiteContent }) {
  return (
    <section className="py-14 md:py-20">
      <div className="mx-auto w-[min(1120px,92vw)]">
        <div className="flex flex-col items-center gap-6 rounded-2xl bg-linear-135 from-[#25d366] to-[#128c7e] px-6 py-12 text-center text-white shadow-brand md:px-12">
          <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-bold text-white">
            {content.contactWhatsappTitle}
          </h2>
          <p className="max-w-[560px] text-[0.975rem] opacity-90">
            {content.contactWhatsappText}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
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
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-full border-2 border-white/70 px-7 py-3.5 text-[0.95rem] font-semibold text-white transition-colors hover:bg-white/10"
            >
              Voir nos coordonnées
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
