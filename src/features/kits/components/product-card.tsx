import { formatPrice, getItemImage } from '../kits.utils'
import type { KitItem } from '../kits.types'

export function ProductCard({ item }: { item: KitItem }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-sand-100 bg-white shadow-brand transition-all duration-300 hover:-translate-y-1 hover:shadow-brand-lg">
      <div className="relative aspect-4/3 overflow-hidden bg-sand-50">
        <img
          src={getItemImage(item)}
          alt={item.name}
          loading="lazy"
          className="size-full object-cover transition-transform duration-400 group-hover:scale-105"
        />
        {item.quantity > 1 ? (
          <span className="absolute top-2.5 right-2.5 rounded-full bg-navy/85 px-2 py-0.5 text-xs font-bold text-white backdrop-blur-[4px]">
            ×{item.quantity}
          </span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col gap-2 px-4 pt-4 pb-[1.15rem]">
        <h4 className="flex-1 text-sm leading-[1.4] font-semibold text-navy">
          {item.name}
        </h4>
        <p className="font-display text-[1.125rem] font-bold text-orange">
          {formatPrice(item.price)}
        </p>
      </div>
    </article>
  )
}
