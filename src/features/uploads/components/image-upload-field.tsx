import { useId, useState } from 'react'
import { ImagePlus, Loader2, X } from 'lucide-react'
import { toast } from 'sonner'

import { FieldLabel } from '#/shared/components/ui/field'
import { cn } from '#/shared/lib/utils'
import { uploadImage } from '../uploads.service'
import type { UploadedImage } from '../uploads.service'

interface ImageUploadFieldProps {
  label: string
  value: string | null
  folder?: string
  className?: string
  onChange: (image: UploadedImage | null) => void
}

export function ImageUploadField({
  label,
  value,
  folder,
  className,
  onChange,
}: ImageUploadFieldProps) {
  const inputId = useId()
  const [isUploading, setIsUploading] = useState(false)

  const handleFile = async (file: File | undefined) => {
    if (!file) return
    setIsUploading(true)
    try {
      const image = await uploadImage(file, folder)
      onChange(image)
      toast.success('Image envoyée')
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Envoi de l'image impossible",
      )
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <FieldLabel htmlFor={inputId}>{label}</FieldLabel>

      <div className="flex items-center gap-4">
        <div className="relative size-24 shrink-0 overflow-hidden rounded-xl border border-sand-200 bg-sand-50">
          {value ? (
            <>
              <img src={value} alt="" className="size-full object-cover" />
              <button
                type="button"
                onClick={() => onChange(null)}
                aria-label="Retirer l'image"
                className="absolute top-1 right-1 grid size-6 place-items-center rounded-full bg-navy/80 text-white"
              >
                <X className="size-3.5" />
              </button>
            </>
          ) : (
            <div className="grid size-full place-items-center text-gray-500">
              <ImagePlus className="size-6" />
            </div>
          )}
        </div>

        <label
          htmlFor={inputId}
          className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-sand-200 px-4 py-2 text-sm font-medium text-navy transition-colors hover:border-navy"
        >
          {isUploading ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <ImagePlus className="size-4" />
          )}
          {isUploading ? 'Envoi…' : 'Choisir une image'}
        </label>
        <input
          id={inputId}
          type="file"
          accept="image/*"
          className="hidden"
          disabled={isUploading}
          onChange={(event) => {
            void handleFile(event.target.files?.[0])
            event.target.value = ''
          }}
        />
      </div>
    </div>
  )
}
