import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'

import { ImageUploadField } from '#/features/uploads/components/image-upload-field'
import type { UploadedImage } from '#/features/uploads/uploads.service'
import { FormInput } from '#/shared/components/form-inputs'
import { Button } from '#/shared/components/ui/button'
import { FieldDescription, FieldLabel } from '#/shared/components/ui/field'
import { Switch } from '#/shared/components/ui/switch'
import { Textarea } from '#/shared/components/ui/textarea'
import type { Kit, KitPayload } from '../kits.types'

interface KitFormValues {
  name: string
  slug: string
  icon: string
  tagline: string
  description: string
  highlights: string
}

interface KitFormProps {
  kit?: Kit
  submitLabel: string
  onSubmit: (payload: KitPayload) => Promise<void>
}

export function KitForm({ kit, submitLabel, onSubmit }: KitFormProps) {
  const [isPending, startTransition] = useTransition()
  const [available, setAvailable] = useState(kit?.available ?? true)
  const [image, setImage] = useState<{ url: string; publicId: string } | null>(
    kit?.imageUrl ? { url: kit.imageUrl, publicId: kit.imagePublicId ?? '' } : null,
  )

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<KitFormValues>({
    defaultValues: {
      name: kit?.name ?? '',
      slug: kit?.slug ?? '',
      icon: kit?.icon ?? '',
      tagline: kit?.tagline ?? '',
      description: kit?.description ?? '',
      highlights: kit?.highlights.join('\n') ?? '',
    },
  })

  const submit = (values: KitFormValues) => {
    startTransition(async () => {
      await onSubmit({
        name: values.name.trim(),
        slug: values.slug.trim() || undefined,
        icon: values.icon.trim() || undefined,
        tagline: values.tagline.trim(),
        description: values.description.trim(),
        highlights: values.highlights
          .split('\n')
          .map((line) => line.trim())
          .filter(Boolean),
        available,
        imageUrl: image?.url,
        imagePublicId: image?.publicId || undefined,
      })
    })
  }

  const handleImageChange = (uploaded: UploadedImage | null) => {
    setImage(uploaded)
  }

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="flex flex-col gap-6 rounded-2xl bg-white p-6 shadow-brand"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <FormInput
          label="Nom de la filière"
          placeholder="Architecture"
          error={errors.name?.message}
          {...register('name', { required: 'Le nom est obligatoire' })}
        />
        <FormInput
          label="Slug (URL)"
          description="Laisser vide pour le générer depuis le nom"
          placeholder="architecture"
          error={errors.slug?.message}
          {...register('slug', {
            pattern: {
              value: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
              message: 'Minuscules, chiffres et tirets uniquement',
            },
          })}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-[120px_1fr]">
        <FormInput
          label="Icône"
          placeholder="🏛️"
          error={errors.icon?.message}
          {...register('icon')}
        />
        <FormInput
          label="Slogan"
          placeholder="Le kit complet pour démarrer en architecture"
          error={errors.tagline?.message}
          {...register('tagline', { required: 'Le slogan est obligatoire' })}
        />
      </div>

      <div className="flex flex-col gap-1">
        <FieldLabel htmlFor="kit-description">Description</FieldLabel>
        <Textarea
          id="kit-description"
          rows={4}
          placeholder="Tout le matériel recommandé pour…"
          {...register('description', {
            required: 'La description est obligatoire',
          })}
        />
        {errors.description ? (
          <p className="text-sm text-destructive">{errors.description.message}</p>
        ) : null}
      </div>

      <div className="flex flex-col gap-1">
        <FieldLabel htmlFor="kit-highlights">Points forts</FieldLabel>
        <Textarea
          id="kit-highlights"
          rows={3}
          placeholder={'Un point fort par ligne'}
          {...register('highlights')}
        />
        <FieldDescription>Un point fort par ligne (10 maximum).</FieldDescription>
      </div>

      <ImageUploadField
        label="Image du kit"
        value={image?.url ?? null}
        folder="kits"
        onChange={handleImageChange}
      />

      <div className="flex items-center gap-3">
        <Switch
          id="kit-available"
          checked={available}
          onCheckedChange={setAvailable}
        />
        <FieldLabel htmlFor="kit-available">
          Visible sur la vitrine
        </FieldLabel>
      </div>

      <div>
        <Button type="submit" loading={isPending}>
          {submitLabel}
        </Button>
      </div>
    </form>
  )
}
