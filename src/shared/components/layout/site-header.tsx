import { useEffect, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Menu, X } from 'lucide-react'

import { buildWhatsAppLink } from '#/shared/data/constants'
import { cn } from '#/shared/lib/utils'

const NAV_LINKS = [
  { label: 'Filières', hash: 'filieres' },
  { label: 'Pourquoi nous', hash: 'pourquoi' },
  { label: 'À propos', hash: 'apropos' },
  { label: 'Contact', hash: 'contact' },
]

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-100 h-header border-b border-sand-100 bg-cream/92 backdrop-blur-md transition-shadow',
        scrolled && 'shadow-brand',
      )}
    >
      <div className="mx-auto flex h-full w-[min(1120px,92vw)] items-center justify-between gap-4">
        <Link to="/" aria-label="Charette Plus — Accueil" onClick={() => setOpen(false)}>
          <img src="/assets/logo.svg" alt="Charette Plus" className="h-11 w-auto" />
        </Link>

        <button
          type="button"
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="p-1 text-navy md:hidden"
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>

        <nav
          className={cn(
            'fixed inset-x-0 top-header flex-col gap-4 border-b border-sand-100 bg-white p-6 transition-all duration-300 md:static md:flex md:flex-row md:items-center md:gap-8 md:border-0 md:bg-transparent md:p-0',
            open ? 'flex' : 'hidden',
          )}
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.hash}
              to="/"
              hash={link.hash}
              onClick={() => setOpen(false)}
              className="text-[0.925rem] font-medium text-navy-mid transition-colors hover:text-orange"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={buildWhatsAppLink(
              'Bonjour Charette Plus, je souhaite commander un kit de rentrée.',
            )}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-orange px-5 py-2.5 font-semibold text-white transition-all hover:-translate-y-px hover:bg-[#d04f12]"
          >
            Commander
          </a>
        </nav>
      </div>
    </header>
  )
}
