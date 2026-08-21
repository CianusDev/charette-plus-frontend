/** En-tete des pages interieures : titre, introduction, fond clair. */
export function PageHero({
  label,
  title,
  intro,
}: {
  label?: string
  title: string
  intro?: string
}) {
  return (
    <section className="bg-sand-50 pt-[calc(var(--spacing-header)+2.5rem)] pb-10 md:pb-14">
      <div className="mx-auto w-[min(1120px,92vw)] text-center">
        {label ? (
          <span className="mb-3 inline-block text-[0.8rem] font-bold tracking-[0.08em] text-orange uppercase">
            {label}
          </span>
        ) : null}
        <h1 className="text-[clamp(1.75rem,4vw,2.75rem)] font-bold text-navy-dark">
          {title}
        </h1>
        {intro ? (
          <p className="mx-auto mt-3 max-w-[640px] text-[1.05rem] text-gray-700">
            {intro}
          </p>
        ) : null}
      </div>
    </section>
  )
}
