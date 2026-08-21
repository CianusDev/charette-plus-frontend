import { Plus, Trash2 } from 'lucide-react'

import { Button } from '#/shared/components/ui/button'

interface RepeatableListProps<T> {
  label: string
  description?: string
  items: Array<T>
  addLabel: string
  max?: number
  onAdd: () => void
  onRemove: (index: number) => void
  renderItem: (item: T, index: number) => React.ReactNode
}

/**
 * Liste editable generique (etapes du hero, avantages, valeurs, paragraphes).
 * L'ordre d'affichage sur la vitrine suit l'ordre de cette liste.
 */
export function RepeatableList<T>({
  label,
  description,
  items,
  addLabel,
  max,
  onAdd,
  onRemove,
  renderItem,
}: RepeatableListProps<T>) {
  const canAdd = max === undefined || items.length < max

  return (
    <div className="flex flex-col gap-3">
      <div>
        <h3 className="font-semibold text-navy">{label}</h3>
        {description ? (
          <p className="text-sm text-gray-500">{description}</p>
        ) : null}
      </div>

      {items.length === 0 ? (
        <p className="rounded-xl border border-dashed border-sand-200 p-6 text-center text-sm text-gray-500">
          Aucun élément.
        </p>
      ) : (
        <ul className="flex flex-col gap-3">
          {items.map((item, index) => (
            <li
              key={index}
              className="flex items-start gap-3 rounded-xl bg-sand-50 p-3"
            >
              <div className="flex-1">{renderItem(item, index)}</div>
              <button
                type="button"
                onClick={() => onRemove(index)}
                aria-label={`Supprimer l'élément ${index + 1}`}
                className="mt-1 grid size-9 shrink-0 place-items-center rounded-full text-gray-500 transition-colors hover:bg-red-50 hover:text-red-600"
              >
                <Trash2 className="size-4" />
              </button>
            </li>
          ))}
        </ul>
      )}

      {canAdd ? (
        <div>
          <Button type="button" variant="outline" onClick={onAdd}>
            <Plus className="size-4" />
            {addLabel}
          </Button>
        </div>
      ) : null}
    </div>
  )
}
