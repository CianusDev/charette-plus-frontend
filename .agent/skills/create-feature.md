# Skill : Créer une feature

## Quand utiliser ce skill

Quand on demande de créer une nouvelle fonctionnalité, un nouveau module métier, ou un nouveau domaine (ex: "users", "products", "auth", "orders").

## Prérequis

- Connaître le nom de la feature (ex: `users`)
- Connaître les entités et opérations nécessaires

## Étapes

### 1. Créer la structure de dossiers

```
src/features/{feature}/
├── components/
├── index.ts              ← à créer vide d'abord
├── {feature}.service.ts
├── {feature}.types.ts
└── use-{feature}.ts
```

### 2. Définir les types (`{feature}.types.ts`)

```ts
export type {Entity} = {
  id: string
  // ... propriétés
}

export type Create{Entity}Payload = Omit<{Entity}, 'id'>
export type Update{Entity}Payload = Partial<Create{Entity}Payload>
```

Lire `rules/patterns/feature.md` → section Types pour guide complet.

### 3. Créer le service (`{feature}.service.ts`)

```ts
import api from '#/shared/lib/api'
import type { {Entity}, Create{Entity}Payload } from './{feature}.types'

export async function get{Entities}(): Promise<{Entity}[]> {
  return api.get<{Entity}[]>('/{feature}s')
}

export async function create{Entity}(payload: Create{Entity}Payload): Promise<{Entity}> {
  return api.post<{Entity}>('/{feature}s', payload)
}
// ... autres CRUD selon besoin
```

Lire `rules/patterns/service.md` pour guide complet.

### 4. Créer le hook (`use-{feature}.ts`)

```ts
import { useState, useEffect, useCallback } from 'react'
import { get{Entities} } from './{feature}.service'
import type { {Entity} } from './{feature}.types'

export function use{Entities}() {
  const [data, setData] = useState<{Entity}[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetch = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      setData(await get{Entities}())
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

### 5. Créer les composants si nécessaire (`components/`)

Pour chaque composant d'affichage de la feature :

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

### 6. Exposer via le barrel (`index.ts`)

```ts
export { use{Entities} } from './use-{feature}'
export { {Entity}Card } from './components/{entity}-card'
export type { {Entity}, Create{Entity}Payload } from './{feature}.types'
```

Ne pas exporter les fonctions service directement — les consommateurs passent par le hook.

### 7. Créer la route si nécessaire

Si la feature a une page dédiée → suivre le skill `create-route.md`.

## Vérification finale

- [ ] `{feature}.types.ts` — types définis, exportés
- [ ] `{feature}.service.ts` — appels API via `api` de `#/shared/lib/api`
- [ ] `use-{feature}.ts` — hook avec loading/error/data
- [ ] `index.ts` — exports publics corrects
- [ ] Nommage respecte `rules/conventions.md`
- [ ] Pas d'imports `@/`, uniquement `#/` ou relatifs
