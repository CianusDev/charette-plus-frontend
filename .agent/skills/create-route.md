# Skill : Créer une route

## Quand utiliser ce skill

Quand on demande d'ajouter une page, une nouvelle URL, ou une nouvelle vue.

## Prérequis

- Connaître l'URL cible (ex: `/users`, `/users/$id`, `/settings/profile`)
- Savoir si la route a besoin de données (loader) ou d'une protection (beforeLoad)

## Convention de nommage des fichiers

| URL cible | Fichier à créer |
|-----------|-----------------|
| `/users` | `src/routes/users/index.tsx` |
| `/users/:id` | `src/routes/users/$id.tsx` |
| `/users/:id/edit` | `src/routes/users/$id/edit.tsx` |
| `/settings` | `src/routes/settings/index.tsx` |

## Étapes

### 1. Créer le fichier de route

Le chemin du fichier détermine l'URL automatiquement.

```tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/users/')({
  component: UsersPage,
})

function UsersPage() {
  return <div>Page users</div>
}
```

> TanStack Router détecte le fichier et met à jour `routeTree.gen.ts` automatiquement au prochain `pnpm dev`. Ne jamais éditer `routeTree.gen.ts`.

### 2. Ajouter un loader si données nécessaires

```tsx
import { createFileRoute } from '@tanstack/react-router'
import { getUsers } from '#/features/users'

export const Route = createFileRoute('/users/')({
  loader: async () => {
    const users = await getUsers()
    return { users }
  },
  component: UsersPage,
})

function UsersPage() {
  const { users } = Route.useLoaderData()
  return (
    <ul>
      {users.map(u => <li key={u.id}>{u.name}</li>)}
    </ul>
  )
}
```

### 3. Route avec paramètre dynamique

```tsx
import { createFileRoute } from '@tanstack/react-router'
import { getUserById } from '#/features/users'

export const Route = createFileRoute('/users/$id')({
  loader: async ({ params }) => {
    return { user: await getUserById(params.id) }
  },
  component: UserDetailPage,
})

function UserDetailPage() {
  const { user } = Route.useLoaderData()
  const { id } = Route.useParams() // si besoin du param dans le composant
  return <div>{user.name}</div>
}
```

### 4. Protection de route (beforeLoad)

```tsx
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/')({
  beforeLoad: ({ context }) => {
    if (!context.auth?.isAuthenticated) {
      throw redirect({ to: '/login', search: { redirect: '/dashboard' } })
    }
  },
  component: DashboardPage,
})
```

### 5. Ajouter un lien vers la route

```tsx
import { Link } from '@tanstack/react-router'

// Lien simple
<Link to="/users">Voir les utilisateurs</Link>

// Lien avec paramètre
<Link to="/users/$id" params={{ id: user.id }}>
  {user.name}
</Link>
```

### 6. Navigation programmatique

```tsx
import { useNavigate } from '@tanstack/react-router'

function MyComponent() {
  const navigate = useNavigate()

  const handleSubmit = async () => {
    await createSomething()
    navigate({ to: '/users' })
  }
}
```

## Vérification finale

- [ ] Fichier créé dans `src/routes/` avec bon chemin
- [ ] `createFileRoute` avec l'URL exacte comme premier argument
- [ ] Composant page défini dans le même fichier
- [ ] Loader utilisé si données nécessaires au rendu initial
- [ ] `routeTree.gen.ts` PAS modifié manuellement
- [ ] `pnpm dev` relancé pour régénérer le route tree si nécessaire
