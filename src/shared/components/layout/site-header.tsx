import { useEffect, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Menu, X } from 'lucide-react'

import { buildWhatsAppLink } from '#/shared/data/constants'
import { cn } from '#/shared/lib/utils'
import type { SiteContent } from '#/features/site-content'

const NAV_LINKS = [
  { label: 'Accueil', to: '/', exact: true },
  { label: 'Kits', to: '/kits', exact: false },
  { label: 'À propos', to: '/a-propos', exact: false },
  { label: 'Contact', to: '/contact', exact: false },
] as const

export function SiteHeader({ content }: { content: SiteContent }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Empeche le defilement de l'arriere-plan quand le menu mobile est ouvert.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-100 h-header border-b border-sand-100 bg-cream/92 backdrop-blur-md transition-shadow',
        scrolled && 'shadow-brand',
      )}
    >
      <div className="mx-auto flex h-full w-[min(1120px,92vw)] items-center justify-between gap-4">
        <Link
          to="/"
          aria-label="Charette Plus — Accueil"
          onClick={() => setOpen(false)}
        >
          <img
            src="/assets/logo.svg"
            alt="Charette Plus"
            className="h-10 w-auto sm:h-11"
          />
        </Link>

        <button
          type="button"
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="grid size-10 place-items-center rounded-full text-navy transition-colors hover:bg-sand-100 md:hidden"
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>

        <nav
          className={cn(
            'fixed inset-x-0 top-header max-h-[calc(100svh-var(--spacing-header))] flex-col gap-1 overflow-y-auto border-b border-sand-100 bg-cream p-6 shadow-brand transition-all duration-200 md:static md:flex md:max-h-none md:flex-row md:items-center md:gap-8 md:overflow-visible md:border-0 md:p-0 md:shadow-none',
            open ? 'flex' : 'hidden',
          )}
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              activeOptions={{ exact: link.exact }}
              activeProps={{ className: 'text-orange' }}
              className="rounded-lg py-3 text-[1rem] font-medium text-navy-mid transition-colors hover:text-orange md:py-0 md:text-[0.925rem]"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={buildWhatsAppLink(
              content.whatsappNumber,
              content.orderWhatsappMessage,
            )}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="mt-3 inline-flex items-center justify-center gap-2 rounded-full bg-orange px-5 py-3 font-semibold text-white transition-all hover:-translate-y-px hover:bg-[#d04f12] md:mt-0 md:py-2.5"
          >
            Commander
          </a>
        </nav>
      </div>
    </header>
  )
}
