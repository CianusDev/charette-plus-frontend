import { SiteFooter } from './site-footer'
import { SiteHeader } from './site-header'
import { WhatsAppFloat } from './whatsapp-float'
import type { SiteContent } from '#/features/site-content'

/** Coquille de la vitrine publique : header fixe, contenu, footer et bouton WhatsApp. */
export function PublicLayout({
  content,
  children,
}: {
  content: SiteContent
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-svh flex-col overflow-x-hidden bg-cream text-navy">
      <SiteHeader content={content} />
      <main className="flex-1">{children}</main>
      <SiteFooter content={content} />
      <WhatsAppFloat content={content} />
    </div>
  )
}
