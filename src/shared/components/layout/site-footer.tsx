import { Link } from '@tanstack/react-router'

import { buildWhatsAppLink } from '#/shared/data/constants'
import type { SiteContent } from '#/features/site-content'

export function SiteFooter({ content }: { content: SiteContent }) {
  return (
    <footer className="bg-navy-dark py-12 pb-6 text-white/70">
      <div className="mx-auto w-[min(1120px,92vw)]">
        <div className="mb-8 grid gap-8 md:grid-cols-[2fr_1fr_1fr]">
          <div>
            <img
              src="/assets/logo.svg"
              alt="Charette Plus"
              className="mb-4 h-10 w-auto brightness-0 invert"
            />
            <p className="max-w-[280px] text-sm">{content.footerDescription}</p>
          </div>

          <div>
            <h4 className="mb-4 text-[0.9rem] text-white">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/kits"
                  className="transition-colors hover:text-orange-light"
                >
                  Nos kits
                </Link>
              </li>
              <li>
                <Link
                  to="/a-propos"
                  className="transition-colors hover:text-orange-light"
                >
                  À propos
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="transition-colors hover:text-orange-light"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-[0.9rem] text-white">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/contact"
                  className="transition-colors hover:text-orange-light"
                >
                  {content.city}, {content.country}
                </Link>
              </li>
              <li>
                <a
                  href={buildWhatsAppLink(
                    content.whatsappNumber,
                    content.defaultWhatsappMessage,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-orange-light"
                >
                  WhatsApp : {content.whatsappDisplay}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 text-center text-[0.8rem]">
          © {new Date().getFullYear()} Charette Plus. Tous droits réservés.
        </div>
      </div>
    </footer>
  )
}
