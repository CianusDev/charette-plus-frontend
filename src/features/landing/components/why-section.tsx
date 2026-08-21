import { SectionHeader } from './section-header'
import type { SiteContent } from '#/features/site-content'

export function WhySection({ content }: { content: SiteContent }) {
  return (
    <section id="pourquoi" className="py-14 md:py-20">
      <div className="mx-auto w-[min(1120px,92vw)]">
        <SectionHeader
          label={content.advantagesLabel}
          title={content.advantagesTitle}
        >
          {content.advantagesIntro}
        </SectionHeader>

        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {content.advantages.map((advantage) => (
            <div
              key={advantage.id}
              className="rounded-2xl border border-sand-100 bg-sand-50 p-8"
            >
              <div className="mb-4 grid size-12 place-items-center rounded-xl bg-white text-2xl shadow-brand">
                {advantage.icon}
              </div>
              <h3 className="mb-2 text-[1.1rem] font-semibold">
                {advantage.title}
              </h3>
              <p className="text-[0.925rem] text-gray-700">{advantage.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
