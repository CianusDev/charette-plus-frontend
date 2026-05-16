# Conventions

## Nommage des fichiers

| Type | Convention | Exemple |
|------|------------|---------|
| Composant React | `kebab-case.tsx` | `user-card.tsx` |
| Hook | `use-*.ts` | `use-users.ts` |
| Service | `*.service.ts` | `users.service.ts` |
| Types/interfaces | `*.types.ts` | `users.types.ts` |
| Modèle d'entité | `*.model.ts` | `user.model.ts` |
| Guard de route | `*.guard.ts` | `auth.guard.ts` |
| Store Zustand | `*.store.ts` | `ui.store.ts` |
| Constantes | `*.ts` (kebab-case) | `constants.ts` |

## Nommage des exports

| Type | Convention | Exemple |
|------|------------|---------|
| Composant | PascalCase | `UserCard` |
| Hook | camelCase + `use` | `useUsers` |
| Fonction | camelCase | `getUsers` |
| Type / Interface | PascalCase | `User`, `ApiResponse` |
| Constante | SCREAMING_SNAKE_CASE | `TOKEN_VALIDITY_PERIOD` |
| Enum | PascalCase | `UserStatus` |

## Où placer les fichiers

| Je crée... | Emplacement |
|------------|-------------|
| Une nouvelle page/route | `src/routes/{chemin}/index.tsx` |
| Composant UI générique (shadcn) | `pnpm shadcn add {nom}` → `src/shared/components/ui/` |
| Composant métier d'une feature | `src/features/{feature}/components/` |
| Hook global (multi-feature) | `src/shared/hooks/use-*.ts` |
| Hook spécifique à une feature | `src/features/{feature}/use-*.ts` |
| Appels API d'une feature | `src/features/{feature}/*.service.ts` |
| Types d'une feature | `src/features/{feature}/*.types.ts` |
| Constante globale | `src/shared/data/constants.ts` |
| Clé localStorage | `src/shared/data/local-storage-keys.ts` |
| Provider React global | `src/shared/providers/` |

## TypeScript

- **Pas de `any`** — utiliser `unknown` ou generics
- **Pas de `@ts-ignore` / `@ts-nocheck`**
- Typer explicitement les retours de fonctions publiques
- Interfaces pour les objets complexes, `type` pour unions/aliases simples
- Generics pour les fonctions réutilisables

```ts
// ❌
function process(data: any) {}

// ✅
function process<T>(data: T): T {}
function parseResponse(data: unknown): User {}
```

## Imports

Ordre recommandé :
1. Packages externes (`react`, `@tanstack/...`)
2. Alias internes (`#/shared/...`, `#/features/...`)
3. Imports relatifs (`./local-file`)

```ts
import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'

import api from '#/shared/lib/api'
import { cn } from '#/shared/lib/utils'

import type { User } from './users.types'
```

## Règles de sécurité

- Variables d'env **toujours** via `#/environments` — jamais hardcodées
- Secrets sensibles dans `.env.local` uniquement
- Valider les données externes (API, formulaires) — Zod si complexe

## Fichiers interdits à modifier

| Fichier | Raison |
|---------|--------|
| `src/routeTree.gen.ts` | Auto-généré par TanStack Router |
| `src/shared/components/ui/*` | Géré par `pnpm shadcn add` |
| `vite.config.ts` | Config critique (alias env, plugins) |
