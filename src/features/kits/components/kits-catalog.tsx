import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'

import { Input } from '#/shared/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '#/shared/components/ui/select'
import { KitCard } from './kit-card'
import type { Kit } from '../kits.types'

type SortKey = 'position' | 'price-asc' | 'price-desc' | 'name'

const SORT_LABELS: Record<SortKey, string> = {
  position: 'Ordre du site',
  'price-asc': 'Prix croissant',
  'price-desc': 'Prix décroissant',
  name: 'Nom (A-Z)',
}

/** Compare sans tenir compte des accents ni de la casse. */
function normalize(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}

export function KitsCatalog({ kits }: { kits: Array<Kit> }) {
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState<SortKey>('position')

  const visibleKits = useMemo(() => {
    const term = normalize(search.trim())
    const filtered = term
      ? kits.filter((kit) =>
          [kit.name, kit.tagline, kit.description].some((field) =>
            normalize(field).includes(term),
          ),
        )
      : kits

    const sorted = [...filtered]
    switch (sort) {
      case 'price-asc':
        sorted.sort((a, b) => a.total - b.total)
        break
      case 'price-desc':
        sorted.sort((a, b) => b.total - a.total)
        break
      case 'name':
        sorted.sort((a, b) => a.name.localeCompare(b.name, 'fr'))
        break
      default:
        sorted.sort((a, b) => a.position - b.position)
    }
    return sorted
  }, [kits, search, sort])

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-gray-500" />
          <Input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Rechercher un kit…"
            aria-label="Rechercher un kit"
            className="pl-9"
          />
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden text-sm text-gray-500 sm:inline">
            {visibleKits.length} kit{visibleKits.length > 1 ? 's' : ''}
          </span>
          <Select
            value={sort}
            onValueChange={(value) => setSort(value as SortKey)}
          >
            <SelectTrigger className="w-full sm:w-[190px]" aria-label="Trier les kits">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(SORT_LABELS).map(([key, label]) => (
                <SelectItem key={key} value={key}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {visibleKits.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-sand-200 bg-white p-10 text-center text-gray-500">
          {search.trim()
            ? `Aucun kit ne correspond à « ${search.trim()} ».`
            : 'Aucun kit disponible pour le moment. Revenez très bientôt.'}
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visibleKits.map((kit) => (
            <KitCard key={kit.id} kit={kit} />
          ))}
        </div>
      )}
    </div>
  )
}
