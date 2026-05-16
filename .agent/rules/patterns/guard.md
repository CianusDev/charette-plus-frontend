# Pattern : Route Guard

Guards protègent les routes via `beforeLoad` dans `createFileRoute`. Deux guards dans `src/features/auth/auth.guard.ts`.

## Implémentation (`auth.guard.ts`)

```ts
import { redirect } from '@tanstack/react-router'
import storage from '#/shared/lib/local-storage'
import { LOCAL_STORAGE_KEYS } from '#/shared/data/local-storage-keys'

export function requireAuth() {
  const token = storage.get<string>(LOCAL_STORAGE_KEYS.AUTH_TOKEN)
  if (!token) throw redirect({ to: '/login' })
  return { token }
}

export function requireGuest() {
  const token = storage.get<string>(LOCAL_STORAGE_KEYS.AUTH_TOKEN)
  if (token) throw redirect({ to: '/dashboard' })
}
```

## Usage dans une route

**Route protégée (connecté requis) :**

```ts
// src/routes/dashboard/index.tsx
import { createFileRoute } from '@tanstack/react-router'
import { requireAuth } from '#/features/auth/auth.guard'

export const Route = createFileRoute('/dashboard/')({
  beforeLoad: () => requireAuth(),
  component: DashboardPage,
})
```

**Route invité (déjà connecté → redirect) :**

```ts
// src/routes/login/index.tsx
import { createFileRoute } from '@tanstack/react-router'
import { requireGuest } from '#/features/auth/auth.guard'

export const Route = createFileRoute('/login/')({
  beforeLoad: () => requireGuest(),
  component: LoginPage,
})
```

## Règles

- `throw redirect(...)` — **jamais** `Route.redirect()` ni `return redirect()`
- Guards lisent localStorage directement (sync) — pas d'`async`
- `requireAuth()` retourne `{ token }` → disponible dans `context` de la route si besoin
- Guards dans `#/features/auth/auth.guard` — importés directement (pas via `index.ts`)
- Créer d'autres guards dans le même fichier si nécessaire (ex: `requireAdmin`)
