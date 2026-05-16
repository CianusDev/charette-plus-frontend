# Pattern : Route (TanStack Router)

## Principe

TanStack Router génère automatiquement `src/routeTree.gen.ts` à partir des fichiers dans `src/routes/`.  
**Ne jamais éditer `routeTree.gen.ts` manuellement.**

Convention : un fichier = une route.

| Fichier | URL |
|---------|-----|
| `src/routes/index.tsx` | `/` |
| `src/routes/users/index.tsx` | `/users` |
| `src/routes/users/$id.tsx` | `/users/:id` |
| `src/routes/users/$id/edit.tsx` | `/users/:id/edit` |
| `src/routes/__root.tsx` | Layout racine (toutes les routes) |

`$` dans le nom de fichier = paramètre dynamique.

## Route simple

```tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/users/')({
  component: UsersPage,
})

function UsersPage() {
  return <div>Liste des utilisateurs</div>
}
```

## Route avec paramètre dynamique

```tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/users/$id')({
  component: UserDetailPage,
})

function UserDetailPage() {
  const { id } = Route.useParams()
  return <div>Utilisateur {id}</div>
}
```

## Route avec loader (data fetching SSR)

```tsx
import { createFileRoute } from '@tanstack/react-router'
import { getUserById } from '#/features/users'

export const Route = createFileRoute('/users/$id')({
  loader: async ({ params }) => {
    const user = await getUserById(params.id)
    return { user }
  },
  component: UserDetailPage,
})

function UserDetailPage() {
  const { user } = Route.useLoaderData()
  return <div>{user.name}</div>
}
```

## Route avec beforeLoad (guard/redirect)

```tsx
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/')({
  beforeLoad: ({ context }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({ to: '/login' })
    }
  },
  component: DashboardPage,
})
```

## Route avec search params

```tsx
import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

const searchSchema = z.object({
  page: z.number().default(1),
  q: z.string().optional(),
})

export const Route = createFileRoute('/users/')({
  validateSearch: searchSchema,
  component: UsersPage,
})

function UsersPage() {
  const { page, q } = Route.useSearch()
  return <div>Page {page} — Recherche: {q}</div>
}
```

## Layout imbriqué

Créer un fichier `{segment}.tsx` sans `index` pour un layout parent :

```tsx
// src/routes/users.tsx  → layout pour toutes les routes /users/*
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/users')({
  component: UsersLayout,
})

function UsersLayout() {
  return (
    <div>
      <nav>Navigation users</nav>
      <Outlet />
    </div>
  )
}
```

## Root layout (`__root.tsx`)

Définit le shell HTML global. Modifiable pour ajouter des providers globaux.

```tsx
import { HeadContent, Scripts, createRootRoute, Outlet } from '@tanstack/react-router'
import appCss from '../styles.css?url'

export const Route = createRootRoute({
  head: () => ({ /* meta, links */ }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head><HeadContent /></head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}
```
