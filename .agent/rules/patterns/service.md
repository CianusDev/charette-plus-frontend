# Pattern : Service

Un service encapsule les appels API d'une feature. Il utilise l'instance `api` de `#/shared/lib/api`.

## Règles

- Un service par feature : `src/features/{feature}/{feature}.service.ts`
- Les routes d'administration vont dans un fichier séparé : `admin-{feature}.service.ts`
- Fonctions pures — pas d'état React, pas de hooks
- Typage explicite sur entrées et sorties
- Le service **déballe** l'enveloppe de l'API et lève une `Error` en cas d'échec

## L'enveloppe de l'API

L'API NestJS répond toujours avec la même structure :

```json
{ "success": true, "message": "Kits recuperes avec succes", "data": { "kits": [] } }
```

`api.get<T>()` ne lève jamais : il renvoie `APIResponse<T>` (`{ success, data?, message? }`). Le helper `unwrap()` fait le pont :

```ts
import api, { unwrap } from '#/shared/lib/api'
import type { ApiEnvelope } from '#/shared/lib/api'
import type { Kit } from './kits.types'

export async function getKits(): Promise<Array<Kit>> {
  const response = await api.get<ApiEnvelope<{ kits: Array<Kit> }>>('/kits')
  return unwrap(response).kits
}
```

`unwrap()` renvoie `data` ou lève une `Error` portant le message de l'API — utilisable tel quel dans un loader (l'`errorComponent` de la route prend le relais) ou dans un `try/catch` de composant pour afficher un toast.

## Méthodes disponibles

```ts
api.get<T>(endpoint, options?)
api.post<T>(endpoint, data?, options?)
api.put<T>(endpoint, data?, options?)
api.patch<T>(endpoint, data?, options?)
api.delete<T>(endpoint, options?)
```

`options` = `RequestInit` natif (`signal`, `headers`, `params`).

Toutes les requêtes partent avec `credentials: 'include'` : le cookie de session `authentication` accompagne automatiquement les appels aux routes protégées. Ne jamais ajouter de header `Authorization`.

## Gestion des erreurs (dans le composant)

```ts
try {
  const kit = await updateKit(id, payload)
  toast.success('Kit mis à jour')
} catch (error) {
  toast.error(error instanceof Error ? error.message : 'Modification impossible')
}
```

## Service cross-feature

Si la logique est partagée entre plusieurs features → `src/shared/lib/` (jamais dans une feature).
