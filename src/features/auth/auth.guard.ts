import { redirect } from '@tanstack/react-router'
import { getProfile } from './auth.service'
import type { AuthUser } from './auth.types'

/**
 * La session vit dans un cookie httpOnly : impossible de la lire en JavaScript.
 * Le seul moyen fiable de savoir si l'admin est connecte est d'interroger l'API.
 */
export async function requireAdmin(): Promise<{ user: AuthUser }> {
  const user = await getProfile()
  if (!user) {
    throw redirect({ to: '/login' })
  }
  return { user }
}

/** Empeche d'afficher le formulaire de connexion a un admin deja connecte. */
export async function requireGuest(): Promise<void> {
  const user = await getProfile()
  if (user) {
    throw redirect({ to: '/admin' })
  }
}
