# Skill : Créer une feature

## Quand utiliser ce skill

Quand on demande de créer une nouvelle fonctionnalité, un nouveau module métier, ou un nouveau domaine (ex: `users`, `products`, `auth`, `orders`).

## Prérequis

- Connaître le nom de la feature (ex: `users`)
- Connaître les entités et opérations nécessaires

## Étapes

### 1. Créer la structure de dossiers

```
src/features/{feature}/
├── components/
├── index.ts                  ← à créer vide d'abord
├── {feature}.schemas.ts      ← si la feature a des formulaires
├── {feature}.service.ts
├── {feature}.types.ts
└── use-{feature}.ts
```

### 2. Définir les schémas Zod (`{feature}.schemas.ts`)

Si la feature expose des formulaires ou valide des payloads :

```ts
import { z } from 'zod'

export const Create{Entity}Schema = z.object({
  name: z.string({ message: 'Requis' }),
  email: z.email(),
})
```

**Import obligatoire :** `import { z } from 'zod'` (named import, Zod v4).

### 3. Définir les types (`{feature}.types.ts`)

```ts
export type {Entity} = {
  id: string
  // ... propriétés
}

export type Create{Entity}Payload = Omit<{Entity}, 'id'>
export type Update{Entity}Payload = Partial<Create{Entity}Payload>
```

Si un schéma Zod existe pour le type, dériver via `z.infer` :

```ts
import type z from 'zod'
import type { Create{Entity}Schema } from './{feature}.schemas'

export type Create{Entity}Payload = z.infer<typeof Create{Entity}Schema>
```

Lire `rules/patterns/form.md` → section Types pour guide complet.

### 4. Créer le service (`{feature}.service.ts`)

Toutes les fonctions retournent `Promise<APIResponse<T>>`.

```ts
import api from '#/shared/lib/api'
import type { APIResponse } from '#/shared/lib/api'
import type { {Entity}, Create{Entity}Payload } from './{feature}.types'

export async function get{Entities}(): Promise<APIResponse<{Entity}[]>> {
  return api.get<{Entity}[]>('/{feature}s')
}

export async function create{Entity}(payload: Create{Entity}Payload): Promise<APIResponse<{Entity}>> {
  return api.post<{Entity}>('/{feature}s', payload)
}

export async function update{Entity}(id: string, payload: Update{Entity}Payload): Promise<APIResponse<{Entity}>> {
  return api.patch<{Entity}>(`/{feature}s/${id}`, payload)
}

export async function delete{Entity}(id: string): Promise<APIResponse> {
  return api.delete(`/{feature}s/${id}`)
}
```

Lire `rules/patterns/service.md` pour guide complet.

### 5. Créer le hook (`use-{feature}.ts`)

```ts
import { useState, useEffect, useCallback } from 'react'
import { get{Entities} } from './{feature}.service'
import type { {Entity} } from './{feature}.types'

export function use{Entities}() {
  const [data, setData] = useState<{Entity}[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)
    const { success, data: items, message } = await get{Entities}()
    if (success && items) setData(items)
    else setError(message ?? 'Erreur')
    setLoading(false)
  }, [])

  useEffect(() => { fetchData() }, [fetchData])

  return { data, loading, error, refetch: fetchData }
}
```

### 6. Créer les composants si nécessaire (`components/`)

```tsx
import { cn } from '#/shared/lib/utils'
import type { {Entity} } from '../{feature}.types'

interface {Entity}CardProps {
  item: {Entity}
  className?: string
}

export function {Entity}Card({ item, className }: {Entity}CardProps) {
  return (
    <div className={cn('rounded-lg border p-4', className)}>
      {/* contenu */}
    </div>
  )
}
```

Pour formulaires → lire `rules/patterns/form.md` et skill `create-form-input.md`.

### 7. Exposer via le barrel (`index.ts`)

```ts
export { use{Entities} } from './use-{feature}'
export { {Entity}Card } from './components/{entity}-card'
export type { {Entity}, Create{Entity}Payload } from './{feature}.types'
```

Ne pas exporter les fonctions service directement — les consommateurs passent par le hook.

### 8. Créer la route si nécessaire

Si la feature a une page dédiée → suivre le skill `create-route.md`.
Si la route doit être protégée → lire `rules/patterns/guard.md`.

## Vérification finale

- [ ] `{feature}.schemas.ts` — `import { z } from 'zod'` (named import)
- [ ] `{feature}.types.ts` — types définis, dérivés de schéma si possible
- [ ] `{feature}.service.ts` — retourne `APIResponse<T>`, utilise `api` de `#/shared/lib/api`
- [ ] `use-{feature}.ts` — destructure `{ success, data, message }` de l'API
- [ ] `index.ts` — exports publics corrects
- [ ] Nommage respecte `rules/conventions.md`
- [ ] Pas d'imports `@/`, uniquement `#/` ou relatifs
