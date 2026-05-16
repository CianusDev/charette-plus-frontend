# Pattern : Feature Module

Une feature est un module autonome dans `src/features/{nom-feature}/`.
Elle encapsule sa logique, ses types, ses composants et ses appels API.

## Structure complète

```
src/features/users/
├── index.ts                  # Exports publics (ce que les autres voient)
├── users.service.ts          # Appels API
├── use-users.ts              # Hook React (state + mutations)
├── users.types.ts            # Types spécifiques à la feature
└── components/
    ├── user-card.tsx         # Composant d'affichage
    └── user-form.tsx         # Composant formulaire
```

Seul `index.ts` est importé depuis l'extérieur. Imports internes restent relatifs.

## 1. Types (`users.types.ts`)

```ts
export type User = {
  id: string
  name: string
  email: string
  status: UserStatus
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export type CreateUserPayload = Pick<User, 'name' | 'email'>
export type UpdateUserPayload = Partial<CreateUserPayload>
```

## 2. Service (`users.service.ts`)

Utilise l'instance `api` de `#/shared/lib/api`.

```ts
import api from '#/shared/lib/api'
import type { User, CreateUserPayload, UpdateUserPayload } from './users.types'

export async function getUsers(): Promise<User[]> {
  return api.get<User[]>('/users')
}

export async function getUserById(id: string): Promise<User> {
  return api.get<User>(`/users/${id}`)
}

export async function createUser(payload: CreateUserPayload): Promise<User> {
  return api.post<User>('/users', payload)
}

export async function updateUser(id: string, payload: UpdateUserPayload): Promise<User> {
  return api.patch<User>(`/users/${id}`, payload)
}

export async function deleteUser(id: string): Promise<void> {
  return api.delete(`/users/${id}`)
}
```

## 3. Hook (`use-users.ts`)

Gère l'état React et les mutations.

```ts
import { useState, useEffect, useCallback } from 'react'
import { getUsers, createUser } from './users.service'
import type { User, CreateUserPayload } from './users.types'

export function useUsers() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchUsers = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getUsers()
      setUsers(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  const addUser = useCallback(async (payload: CreateUserPayload) => {
    const newUser = await createUser(payload)
    setUsers(prev => [...prev, newUser])
    return newUser
  }, [])

  return { users, loading, error, refetch: fetchUsers, addUser }
}
```

## 4. Composant (`components/user-card.tsx`)

```tsx
import { cn } from '#/shared/lib/utils'
import type { User } from '../users.types'

interface UserCardProps {
  user: User
  className?: string
  onDelete?: (id: string) => void
}

export function UserCard({ user, className, onDelete }: UserCardProps) {
  return (
    <div className={cn('rounded-lg border p-4', className)}>
      <h3 className="font-semibold">{user.name}</h3>
      <p className="text-sm text-muted-foreground">{user.email}</p>
      {onDelete && (
        <button onClick={() => onDelete(user.id)}>Supprimer</button>
      )}
    </div>
  )
}
```

## 5. Barrel (`index.ts`)

N'exporte que ce qui est nécessaire à l'extérieur.

```ts
export { useUsers } from './use-users'
export { UserCard } from './components/user-card'
export type { User, UserStatus, CreateUserPayload } from './users.types'
// Ne pas exporter les fonctions service directement (passer par le hook)
```

## Règles

- Imports depuis l'extérieur **uniquement via `index.ts`**
- Imports internes à la feature : relatifs (`./users.types`)
- Composants spécifiques à la feature → `features/{feature}/components/`
- Si un composant est utilisé par plusieurs features → `shared/components/`
- Un service = une feature. Pas de logique cross-feature dans un service.
