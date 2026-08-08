import { Link } from '@tanstack/react-router'

import { CONTACT, buildWhatsAppLink } from '#/shared/data/constants'

export function SiteFooter() {
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
            <p className="max-w-[280px] text-sm">
              La référence ivoirienne en kits de rentrée académique pour les
              filières techniques et créatives.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-[0.9rem] text-white">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" hash="filieres" className="transition-colors hover:text-orange-light">
                  Filières
                </Link>
              </li>
              <li>
                <Link to="/" hash="pourquoi" className="transition-colors hover:text-orange-light">
                  Pourquoi nous
                </Link>
              </li>
              <li>
                <Link to="/" hash="apropos" className="transition-colors hover:text-orange-light">
                  À propos
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-[0.9rem] text-white">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" hash="contact" className="transition-colors hover:text-orange-light">
                  {CONTACT.city}, CI
                </Link>
              </li>
              <li>
                <a
                  href={buildWhatsAppLink('Bonjour Charette Plus !')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-orange-light"
                >
                  WhatsApp : {CONTACT.whatsappDisplay}
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
