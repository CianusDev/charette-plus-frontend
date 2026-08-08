import { Link, createFileRoute, useRouter } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import { toast } from 'sonner'

import { createKit } from '#/features/kits'
import { KitForm } from '#/features/kits/components/kit-form'
import type { KitPayload } from '#/features/kits'

export const Route = createFileRoute('/admin/kits/new')({
  component: NewKitPage,
})

function NewKitPage() {
  const router = useRouter()

  const handleSubmit = async (payload: KitPayload) => {
    try {
      const kit = await createKit(payload)
      toast.success('Kit créé')
      await router.navigate({ to: '/admin/kits/$id', params: { id: kit.id } })
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Création impossible')
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <Link
        to="/admin"
        className="inline-flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-orange"
      >
        <ArrowLeft className="size-4" />
        Retour aux kits
      </Link>

      <h1 className="text-2xl font-bold text-navy">Nouveau kit</h1>

      <KitForm submitLabel="Créer le kit" onSubmit={handleSubmit} />
    </div>
  )
}
