import { KitCard } from '#/features/kits/components/kit-card'
import { brandButton } from '#/shared/components/brand/brand-button'
import { buildWhatsAppLink } from '#/shared/data/constants'
import { SectionHeader } from './section-header'
import type { Kit } from '#/features/kits'
import type { SiteContent } from '#/features/site-content'

export function FilieresSection({
  kits,
  content,
  unavailable = false,
}: {
  kits: Array<Kit>
  content: SiteContent
  /** Vrai quand le catalogue n'a pas pu etre charge depuis l'API. */
  unavailable?: boolean
}) {
  return (
    <section id="filieres" className="bg-sand-50 py-14 md:py-20">
      <div className="mx-auto w-[min(1120px,92vw)]">
        <SectionHeader label={content.kitsLabel} title={content.kitsTitle}>
          {content.kitsIntro}
        </SectionHeader>

        {unavailable ? (
          <div className="rounded-2xl border border-dashed border-sand-200 bg-white p-10 text-center">
            <p className="mb-4 text-gray-700">
              Le catalogue est momentanément indisponible. Contactez-nous
              directement, nous vous répondons tout de suite.
            </p>
            <a
              href={buildWhatsAppLink(
                content.whatsappNumber,
                content.defaultWhatsappMessage,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className={brandButton({ variant: 'primary' })}
            >
              Nous écrire sur WhatsApp
            </a>
          </div>
        ) : kits.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-sand-200 bg-white p-10 text-center text-gray-500">
            Aucun kit disponible pour le moment. Revenez très bientôt.
          </p>
        ) : (
          <div className="grid gap-6 [grid-template-columns:repeat(auto-fit,minmax(240px,1fr))]">
            {kits.map((kit) => (
              <KitCard key={kit.id} kit={kit} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
