import api from '#/shared/lib/api'
import type { LoginDto } from './auth.types'

export async function signIn(payload: LoginDto) {
  return await api.post('/auth/login', payload)
}
