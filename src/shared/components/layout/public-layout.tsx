import { SiteFooter } from './site-footer'
import { SiteHeader } from './site-header'
import { WhatsAppFloat } from './whatsapp-float'

/** Coquille de la vitrine publique : header fixe, contenu, footer et bouton WhatsApp. */
export function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-svh flex-col overflow-x-hidden bg-cream text-navy">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <WhatsAppFloat />
    </div>
  )
}
