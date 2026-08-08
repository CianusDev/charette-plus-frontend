import { Link } from '@tanstack/react-router'

import { formatPrice, getKitImage } from '../kits.utils'
import type { Kit } from '../kits.types'

export function KitCard({ kit }: { kit: Kit }) {
  return (
    <Link
      to="/kits/$slug"
      params={{ slug: kit.slug }}
      className="group block overflow-hidden rounded-2xl border-2 border-transparent bg-white shadow-brand transition-all duration-300 hover:-translate-y-1.5 hover:border-orange hover:shadow-brand-lg"
    >
      <img
        src={getKitImage(kit)}
        alt={`Kit ${kit.name}`}
        loading="lazy"
        className="h-40 w-full object-cover"
      />
      <div className="p-5">
        {kit.icon ? <div className="mb-2 text-2xl">{kit.icon}</div> : null}
        <h3 className="mb-1.5 text-xl font-semibold">{kit.name}</h3>
        <p className="mb-4 text-sm text-gray-500">{kit.tagline}</p>
        <div className="flex items-center justify-between">
          <span className="text-[1.05rem] font-bold text-navy">
            {formatPrice(kit.total)}
          </span>
          <span className="rounded-full bg-[#ecfdf5] px-3 py-1 text-xs font-semibold text-[#059669]">
            Disponible
          </span>
        </div>
      </div>
    </Link>
  )
}
