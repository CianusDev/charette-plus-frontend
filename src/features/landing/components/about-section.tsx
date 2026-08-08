const VALUES = [
  { title: 'Spécialisation', text: 'Expertise par filière académique' },
  { title: 'Simplicité', text: "Un kit, une commande, c'est tout" },
  { title: 'Qualité', text: 'Matériel sélectionné avec soin' },
  { title: 'Proximité', text: 'Basés à Bondoukou, proches des étudiants' },
]

export function AboutSection() {
  return (
    <section id="apropos" className="py-14 md:py-20">
      <div className="mx-auto grid w-[min(1120px,92vw)] items-center gap-12 md:grid-cols-2">
        <div>
          <span className="mb-3 inline-block text-[0.8rem] font-bold tracking-[0.08em] text-orange uppercase">
            Notre mission
          </span>
          <h2 className="mb-4 text-[2rem] font-bold">
            Charette Plus, votre partenaire de rentrée
          </h2>
          <p className="mb-4 text-gray-700">
            Charette Plus est une entreprise ivoirienne spécialisée dans la
            conception et la commercialisation de kits de rentrée académique.
            Nous accompagnons les étudiants des filières techniques et créatives
            — architecture, urbanisme, architecture d'intérieure — en leur
            fournissant tout le matériel indispensable pour démarrer l'année
            académique.
          </p>
          <p className="text-gray-700">
            Contrairement aux papeteries traditionnelles, nous adoptons une
            approche centrée sur les besoins réels des étudiants. Chaque kit
            rassemble, dans un seul ensemble, le matériel recommandé par les
            établissements.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {VALUES.map((value) => (
              <div key={value.title} className="rounded-[10px] bg-sand-50 p-4">
                <strong className="mb-1 block text-navy">{value.title}</strong>
                <span className="text-[0.85rem] text-gray-500">{value.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl shadow-brand-lg">
          {/* Remplacer le fichier public/assets/images/apropos.jpg pour changer cette photo. */}
          <img
            src="/assets/images/apropos.jpg"
            alt="Étudiant en architecture au travail"
            loading="lazy"
            className="aspect-4/3 w-full object-cover"
          />
        </div>
      </div>
    </section>
  )
}
