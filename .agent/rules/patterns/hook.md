# Pattern : Hook React

## Règles

- Nom de fichier : `use-{nom}.ts` (kebab-case)
- Export nommé : `useNom` (camelCase)
- Hook global (multi-feature) → `src/shared/hooks/`
- Hook spécifique → `src/features/{feature}/use-{nom}.ts`
- Pas de logique métier dans les hooks globaux — uniquement utilitaires

## Hook de data fetching (liste)

```ts
import { useState, useEffect, useCallback } from 'react'
import { getUsers } from './users.service'
import type { User } from './users.types'

export function useUsers() {
  const [data, setData] = useState<User[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetch = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      setData(await getUsers())
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetch() }, [fetch])

  return { data, loading, error, refetch: fetch }
}
```

## Hook de mutation (create/update/delete)

```ts
import { useState } from 'react'
import { createUser } from './users.service'
import type { CreateUserPayload, User } from './users.types'

export function useCreateUser() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const mutate = async (payload: CreateUserPayload): Promise<User | null> => {
    setLoading(true)
    setError(null)
    try {
      return await createUser(payload)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur')
      return null
    } finally {
      setLoading(false)
    }
  }

  return { mutate, loading, error }
}
```

## Hook utilitaire global

```ts
// src/shared/hooks/use-local-storage.ts
import { useState } from 'react'

export function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key)
      return item ? (JSON.parse(item) as T) : initial
    } catch {
      return initial
    }
  })

  const set = (newValue: T) => {
    setValue(newValue)
    localStorage.setItem(key, JSON.stringify(newValue))
  }

  const remove = () => {
    setValue(initial)
    localStorage.removeItem(key)
  }

  return [value, set, remove] as const
}
```

## Hook avec AbortController (annulation)

```ts
import { useState, useEffect } from 'react'
import api from '#/shared/lib/api'

export function useUserDetail(id: string) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    api.get<User>(`/users/${id}`, { signal: controller.signal })
      .then(setUser)
      .catch(() => {}) // AbortError ignoré

    return () => controller.abort()
  }, [id])

  return user
}
```

## Ce qu'un hook NE doit pas faire

- Pas de `fetch()` direct — passer par un service
- Pas de logique métier complexe dans un hook global
- Pas de side effects permanents sans cleanup dans `useEffect`
