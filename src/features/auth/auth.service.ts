import api, { unwrap } from '#/shared/lib/api'
import type { ApiEnvelope } from '#/shared/lib/api'
import type { AuthUser, LoginDto } from './auth.types'

export async function signIn(payload: LoginDto): Promise<AuthUser> {
  const response = await api.post<ApiEnvelope<{ user: AuthUser }>>(
    '/auth/login',
    payload,
  )
  return unwrap(response).user
}

export async function signOut(): Promise<void> {
  await api.post<ApiEnvelope<null>>('/auth/logout')
}

/** Renvoie l'admin connecte, ou null si le cookie de session est absent/expire. */
export async function getProfile(): Promise<AuthUser | null> {
  const response = await api.get<ApiEnvelope<{ user: AuthUser }>>(
    '/auth/profile',
  )
  if (!response.success || !response.data) {
    return null
  }
  return response.data.data.user
}
