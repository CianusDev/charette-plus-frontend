# Pattern : Service

Un service encapsule les appels API d'une feature. Il utilise l'instance `api` de `#/shared/lib/api`.

## Règles

- Un service par feature : `src/features/{feature}/{feature}.service.ts`
- Fonctions pures — pas d'état React, pas de hooks
- Typage explicite sur entrées et sorties
- Erreurs propagées via `ApiError` (ne pas catch ici — gérer dans le hook ou le composant)

## Structure

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

## Utilisation de `Api`

L'instance singleton `api` est dans `#/shared/lib/api`. Méthodes disponibles :

```ts
api.get<T>(endpoint, options?)         // GET
api.post<T>(endpoint, data?, options?) // POST
api.put<T>(endpoint, data?, options?)  // PUT
api.patch<T>(endpoint, data?, options?)// PATCH
api.delete<T>(endpoint, options?)      // DELETE
```

`options` = `RequestInit` natif de fetch (`signal`, `headers`, etc.).

Erreur HTTP → throw `ApiError` avec `.status` (code HTTP) et `.data` (body).

## Gestion des erreurs (dans le hook)

```ts
import { ApiError } from '#/shared/lib/api'

try {
  const user = await getUserById(id)
} catch (err) {
  if (err instanceof ApiError) {
    console.error(err.status, err.message, err.data)
  }
}
```

## Service avec auth (token custom)

Si besoin d'un header spécifique, instancier `Api` avec headers custom :

```ts
import { Api } from '#/shared/lib/api'

const authedApi = new Api({ Authorization: `Bearer ${token}` })
export const getProtectedData = () => authedApi.get<Data>('/protected')
```

## Service cross-feature

Si logique partagée entre plusieurs features → `src/shared/` (pas dans une feature).

```ts
// src/shared/lib/session.service.ts
import api from '#/shared/lib/api'

export async function refreshToken(token: string) {
  return api.post<{ token: string }>('/auth/refresh', { token })
}
```
