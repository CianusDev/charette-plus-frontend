import { useState, useTransition } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import { toast } from 'sonner'

import { ImageUploadField } from '#/features/uploads/components/image-upload-field'
import { Button } from '#/shared/components/ui/button'
import { Input } from '#/shared/components/ui/input'
import { addKitItem, deleteKitItem, updateKitItem } from '../admin-kits.service'
import { formatPrice } from '../kits.utils'
import type { Kit, KitItem } from '../kits.types'

interface KitItemsManagerProps {
  kit: Kit
  onKitChange: (kit: Kit) => void
}

export function KitItemsManager({ kit, onKitChange }: KitItemsManagerProps) {
  const [isPending, startTransition] = useTransition()
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [quantity, setQuantity] = useState('1')

  const handleAdd = () => {
    const parsedPrice = Number(price)
    if (!name.trim() || Number.isNaN(parsedPrice) || parsedPrice < 0) {
      toast.error('Renseignez un nom et un prix valide')
      return
    }

    startTransition(async () => {
      try {
        const updated = await addKitItem(kit.id, {
          name: name.trim(),
          price: Math.round(parsedPrice),
          quantity: Math.max(1, Number(quantity) || 1),
        })
        onKitChange(updated)
        setName('')
        setPrice('')
        setQuantity('1')
        toast.success('Article ajouté')
      } catch (error) {
        toast.error(error instanceof Error ? error.message : 'Ajout impossible')
      }
    })
  }

  const handleDelete = (item: KitItem) => {
    startTransition(async () => {
      try {
        onKitChange(await deleteKitItem(item.id))
        toast.success('Article supprimé')
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : 'Suppression impossible',
        )
      }
    })
  }

  const handleUpdate = (item: KitItem, changes: Partial<KitItem>) => {
    startTransition(async () => {
      try {
        onKitChange(
          await updateKitItem(item.id, {
            name: changes.name,
            price: changes.price,
            quantity: changes.quantity,
            imageUrl: changes.imageUrl ?? undefined,
            imagePublicId: changes.imagePublicId ?? undefined,
          }),
        )
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : 'Modification impossible',
        )
      }
    })
  }

  return (
    <section className="rounded-2xl bg-white p-6 shadow-brand">
      <header className="mb-6 flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-xl font-semibold">Articles du kit</h2>
        <span className="text-sm text-gray-500">
          {kit.itemCount} articles · total {formatPrice(kit.total)}
        </span>
      </header>

      <div className="mb-6 grid gap-3 rounded-xl bg-sand-50 p-4 sm:grid-cols-[1fr_140px_100px_auto]">
        <Input
          placeholder="Nom de l'article"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <Input
          type="number"
          min={0}
          placeholder="Prix (FCFA)"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
        />
        <Input
          type="number"
          min={1}
          placeholder="Qté"
          value={quantity}
          onChange={(event) => setQuantity(event.target.value)}
        />
        <Button type="button" onClick={handleAdd} loading={isPending}>
          <Plus className="size-4" />
          Ajouter
        </Button>
      </div>

      {kit.items.length === 0 ? (
        <p className="rounded-xl border border-dashed border-sand-200 p-8 text-center text-gray-500">
          Aucun article. Ajoutez le premier ci-dessus.
        </p>
      ) : (
        <ul className="divide-y divide-sand-100">
          {kit.items.map((item) => (
            <li
              key={item.id}
              className="grid items-center gap-3 py-3 sm:grid-cols-[1fr_140px_90px_auto]"
            >
              <Input
                defaultValue={item.name}
                onBlur={(event) => {
                  const value = event.target.value.trim()
                  if (value && value !== item.name) {
                    handleUpdate(item, { name: value })
                  }
                }}
              />

              <Input
                type="number"
                min={0}
                defaultValue={item.price}
                onBlur={(event) => {
                  const value = Number(event.target.value)
                  if (!Number.isNaN(value) && value !== item.price) {
                    handleUpdate(item, { price: Math.round(value) })
                  }
                }}
              />

              <Input
                type="number"
                min={1}
                defaultValue={item.quantity}
                onBlur={(event) => {
                  const value = Number(event.target.value)
                  if (value >= 1 && value !== item.quantity) {
                    handleUpdate(item, { quantity: Math.round(value) })
                  }
                }}
              />

              <div className="flex items-center gap-2">
                <ImageUploadField
                  label=""
                  value={item.imageUrl}
                  folder="items"
                  className="[&>label]:sr-only"
                  onChange={(image) =>
                    handleUpdate(item, {
                      imageUrl: image?.url ?? null,
                      imagePublicId: image?.publicId ?? null,
                    })
                  }
                />
                <button
                  type="button"
                  aria-label={`Supprimer ${item.name}`}
                  onClick={() => handleDelete(item)}
                  className="grid size-9 place-items-center rounded-full text-gray-500 transition-colors hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
