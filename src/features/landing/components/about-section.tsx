import { PRODUCT_PLACEHOLDER } from '#/shared/data/constants'
import type { SiteContent } from '#/features/site-content'

export function AboutSection({ content }: { content: SiteContent }) {
  return (
    <section id="apropos" className="py-14 md:py-20">
      <div className="mx-auto grid w-[min(1120px,92vw)] items-center gap-12 md:grid-cols-2">
        <div>
          <span className="mb-3 inline-block text-[0.8rem] font-bold tracking-[0.08em] text-orange uppercase">
            {content.aboutLabel}
          </span>
          <h2 className="mb-4 text-[2rem] font-bold">{content.aboutTitle}</h2>

          {content.aboutParagraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 40)} className="mb-4 text-gray-700">
              {paragraph}
            </p>
          ))}

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {content.aboutValues.map((value) => (
              <div key={value.id} className="rounded-[10px] bg-sand-50 p-4">
                <strong className="mb-1 block text-navy">{value.title}</strong>
                <span className="text-[0.85rem] text-gray-500">
                  {value.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl shadow-brand-lg">
          <img
            src={content.aboutImageUrl ?? PRODUCT_PLACEHOLDER}
            alt="Étudiant en architecture au travail"
            loading="lazy"
            className="aspect-4/3 w-full object-cover"
          />
        </div>
      </div>
    </section>
  )
}
