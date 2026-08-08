import { SectionHeader } from './section-header'

const ADVANTAGES = [
  {
    icon: '📦',
    title: 'Kits complets',
    text: "Plus besoin de courir dans plusieurs magasins. Tout le matériel recommandé par votre établissement, en un seul ensemble.",
  },
  {
    icon: '🎯',
    title: 'Par filière',
    text: "Chaque kit est adapté aux exigences de votre domaine : architecture, urbanisme et architecture d'intérieure.",
  },
  {
    icon: '💰',
    title: 'Prix transparents',
    text: 'Consultez le détail de chaque article et le prix total avant de commander. Aucune surprise.',
  },
  {
    icon: '⚡',
    title: 'Commande rapide',
    text: 'Commandez en moins de 2 minutes via WhatsApp. Réponse rapide et livraison à Bondoukou.',
  },
  {
    icon: '✅',
    title: 'Qualité garantie',
    text: 'Matériel soigneusement sélectionné pour répondre aux standards académiques de votre filière.',
  },
  {
    icon: '🤝',
    title: 'Accompagnement',
    text: 'Notre équipe vous guide dans le choix du kit adapté à votre niveau et votre formation.',
  },
]

export function WhySection() {
  return (
    <section id="pourquoi" className="py-14 md:py-20">
      <div className="mx-auto w-[min(1120px,92vw)]">
        <SectionHeader label="Nos avantages" title="Pourquoi choisir Charette Plus ?">
          Nous éliminons le stress de la rentrée en regroupant tout le matériel
          dont vous avez besoin, sélectionné par des experts.
        </SectionHeader>

        <div className="grid gap-6 grid-cols-3">
          {ADVANTAGES.map((advantage) => (
            <div
              key={advantage.title}
              className="rounded-2xl border border-sand-100 bg-sand-50 p-8"
            >
              <div className="mb-4 grid size-12 place-items-center rounded-xl bg-white text-2xl shadow-brand">
                {advantage.icon}
              </div>
              <h3 className="mb-2 text-[1.1rem] font-semibold">{advantage.title}</h3>
              <p className="text-[0.925rem] text-gray-700">{advantage.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
