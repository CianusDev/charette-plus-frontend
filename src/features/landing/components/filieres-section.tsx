import { KitCard } from '#/features/kits/components/kit-card'
import { SectionHeader } from './section-header'
import type { Kit } from '#/features/kits'

export function FilieresSection({ kits }: { kits: Array<Kit> }) {
  return (
    <section id="filieres" className="bg-sand-50 py-14 md:py-20">
      <div className="mx-auto w-[min(1120px,92vw)]">
        <SectionHeader label="Nos filières" title="Choisissez votre domaine d'études">
          Chaque kit est conçu pour répondre aux exigences spécifiques de votre
          formation. Cliquez sur une filière pour voir le contenu détaillé.
        </SectionHeader>

        {kits.length === 0 ? (
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
