import { redirect } from '@tanstack/react-router'

import storage from '#/shared/lib/local-storage'
import { LOCAL_STORAGE_KEYS } from '#/shared/data/local-storage-keys'

export function requireAuth() {
  const token = storage.get<string>(LOCAL_STORAGE_KEYS.AUTH_TOKEN)
  if (!token) {
    throw redirect({ to: '/login' })
  }
  return { token }
}

export function requireGuest() {
  const token = storage.get<string>(LOCAL_STORAGE_KEYS.AUTH_TOKEN)
  if (token) {
    throw redirect({ to: '/dashboard' })
  }
}

// Exemple d'utilisation
//
// export const Route =
// createFileRoute('/dashboard/')({
//   beforeLoad: () => requireAuth(),
//   component: DashboardPage,
// })

// Route invité (déjà connecté → redirect) :
// // src/routes/login/index.tsx
// import { createFileRoute } from
// '@tanstack/react-router'
// import { requireGuest } from
// '#/features/auth/auth.guard'

// export const Route =
// createFileRoute('/login/')({
//   beforeLoad: () => requireGuest(),
//   component: LoginPage,
// })
