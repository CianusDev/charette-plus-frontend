export function SectionHeader({
  label,
  title,
  children,
}: {
  label: string
  title: string
  children?: React.ReactNode
}) {
  return (
    <div className="mx-auto mb-12 max-w-[640px] text-center">
      <span className="mb-3 inline-block text-[0.8rem] font-bold tracking-[0.08em] text-orange uppercase">
        {label}
      </span>
      <h2 className="mb-3 text-[clamp(1.75rem,4vw,2.5rem)] font-bold text-navy-dark">
        {title}
      </h2>
      {children ? (
        <p className="text-[1.05rem] text-gray-700">{children}</p>
      ) : null}
    </div>
  )
}
