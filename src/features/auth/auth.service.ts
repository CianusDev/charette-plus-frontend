import api from '#/shared/lib/api'
import type { LoginDto } from './auth.types'

export async function signIn(payload: LoginDto) {
  // Simuler une requête d'authentification (remplacez par une vraie requête API)
  const endpoint = '/auth/login'
  return await api.post(endpoint, payload)
}
