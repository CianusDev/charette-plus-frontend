import api, { unwrap } from '#/shared/lib/api'
import type { ApiEnvelope } from '#/shared/lib/api'

interface UploadSignature {
  cloudName: string
  apiKey: string
  timestamp: number
  folder: string
  signature: string
  uploadUrl: string
}

export interface UploadedImage {
  url: string
  publicId: string
}

/**
 * Upload direct navigateur -> Cloudinary.
 * Le backend signe la requete, le fichier ne transite jamais par l'API.
 */
export async function uploadImage(
  file: File,
  folder?: string,
): Promise<UploadedImage> {
  const response = await api.post<ApiEnvelope<{ signature: UploadSignature }>>(
    '/uploads/signature',
    folder ? { folder } : {},
  )
  const signature = unwrap(response).signature

  const formData = new FormData()
  formData.append('file', file)
  formData.append('api_key', signature.apiKey)
  formData.append('timestamp', String(signature.timestamp))
  formData.append('folder', signature.folder)
  formData.append('signature', signature.signature)

  const cloudinaryResponse = await fetch(signature.uploadUrl, {
    method: 'POST',
    body: formData,
  })

  if (!cloudinaryResponse.ok) {
    // Cloudinary detaille la cause du refus (signature invalide, preset
    // manquant, format rejete...) : la remonter telle quelle, sinon l'erreur
    // affichee ne permet aucun diagnostic.
    const detail = await cloudinaryResponse
      .json()
      .then((body: { error?: { message?: string } }) => body.error?.message)
      .catch(() => undefined)

    throw new Error(
      detail
        ? `Cloudinary a refusé l'image : ${detail}`
        : `L'envoi de l'image a échoué (HTTP ${cloudinaryResponse.status})`,
    )
  }

  const result = (await cloudinaryResponse.json()) as {
    secure_url: string
    public_id: string
  }

  return { url: result.secure_url, publicId: result.public_id }
}
