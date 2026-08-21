import { brandButton } from '#/shared/components/brand/brand-button'
import {
  PRODUCT_PLACEHOLDER,
  buildWhatsAppLink,
} from '#/shared/data/constants'
import type { SiteContent } from '#/features/site-content'

export function HeroSection({ content }: { content: SiteContent }) {
  return (
    <section className="relative overflow-hidden bg-linear-160 from-sand-50 from-0% via-cream via-50% to-[#fff5ef] to-100% pt-[calc(var(--spacing-header)+3rem)] pb-16">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-[20%] -right-[10%] size-[500px] rounded-full bg-[radial-gradient(circle,rgba(234,91,23,0.08)_0%,transparent_70%)]"
      />
      <div className="mx-auto grid w-[min(1120px,92vw)] items-center gap-12 lg:grid-cols-2">
        <div className="order-2 lg:order-1">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-sand-200 bg-white px-4 py-1.5 text-[0.85rem] font-medium text-blue">
            📍 {content.heroBadge}
          </div>

          <h1 className="mb-4 text-[clamp(2rem,5vw,3.25rem)] leading-[1.15] font-bold text-navy-dark">
            {content.heroTitleBefore}
            <br />
            <span className="text-orange">{content.heroTitleHighlight}</span>
            <br />
            {content.heroTitleAfter}
          </h1>

          <p className="mb-8 max-w-[480px] text-[1.125rem] text-gray-700">
            {content.heroSubtitle}
          </p>

          <div className="mb-8 flex flex-wrap gap-3">
            {content.heroSteps.map((step, index) => (
              <div
                key={step}
                className="flex items-center gap-2 rounded-[10px] bg-white px-4 py-2 text-sm font-semibold shadow-brand"
              >
                <span className="grid size-6 place-items-center rounded-full bg-navy text-xs text-white">
                  {index + 1}
                </span>
                {step}
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            <a href="#filieres" className={brandButton({ variant: 'primary' })}>
              {content.heroPrimaryCta}
            </a>
            <a
              href={buildWhatsAppLink(
                content.whatsappNumber,
                content.defaultWhatsappMessage,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className={brandButton({ variant: 'secondary' })}
            >
              {content.heroSecondaryCta}
            </a>
          </div>
        </div>

        <div className="relative order-1 lg:order-2">
          <img
            src={content.heroImageUrl ?? PRODUCT_PLACEHOLDER}
            alt="Matériel de dessin et architecture"
            loading="eager"
            className="aspect-4/3 w-full rounded-2xl object-cover shadow-brand-lg"
          />
          <div className="absolute -bottom-4 right-0 flex items-center gap-3 rounded-[10px] bg-white px-5 py-4 shadow-brand-lg md:-left-6 md:right-auto">
            <span className="text-[1.75rem]">🎓</span>
            <div>
              <strong className="block text-[0.95rem]">
                {content.heroFloatTitle}
              </strong>
              <span className="text-[0.8rem] text-gray-500">
                {content.heroFloatText}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
