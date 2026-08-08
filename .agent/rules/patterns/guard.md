# Pattern : Route Guard

Les guards protègent les routes via `beforeLoad` dans `createFileRoute`. Ils vivent dans `src/features/auth/auth.guard.ts`.

## Point clé : la session n'est pas lisible en JavaScript

L'API pose un cookie **httpOnly** `authentication`. Il est donc impossible de savoir si l'admin est connecté en lisant `localStorage` ou `document.cookie` : le seul moyen fiable est d'appeler `GET /auth/profile`. Les guards sont donc **asynchrones**.

Conséquence : toute route protégée doit être rendue côté client (`ssr: false`), car le cookie du navigateur n'est pas transmis au serveur de rendu.

## Implémentation (`auth.guard.ts`)

```ts
import { redirect } from '@tanstack/react-router'
import { getProfile } from './auth.service'
import type { AuthUser } from './auth.types'

export async function requireAdmin(): Promise<{ user: AuthUser }> {
  const user = await getProfile()
  if (!user) {
    throw redirect({ to: '/login' })
  }
  return { user }
}

export async function requireGuest(): Promise<void> {
  const user = await getProfile()
  if (user) {
    throw redirect({ to: '/admin' })
  }
}
```

## Usage dans une route

**Layout protégé** — le guard est posé une seule fois sur `routes/admin/route.tsx`, il couvre toutes les pages `/admin/*` :

```tsx
export const Route = createFileRoute('/admin')({
  ssr: false,
  beforeLoad: () => requireAdmin(),
  component: AdminLayout,
})
```

L'objet retourné par `beforeLoad` alimente le contexte de la route :

```tsx
const { user } = Route.useRouteContext()
```

**Route invité** — la page de connexion, hors du layout admin :

```tsx
export const Route = createFileRoute('/login/')({
  ssr: false,
  beforeLoad: () => requireGuest(),
  component: LoginPage,
})
```

## Règles

- `throw redirect(...)` — **jamais** `Route.redirect()` ni `return redirect()`
- Une route protégée porte toujours `ssr: false`
- Ne jamais stocker de token en `localStorage` : le cookie httpOnly est la seule source de vérité
- Protéger un groupe de pages par le `route.tsx` du dossier plutôt que page par page
