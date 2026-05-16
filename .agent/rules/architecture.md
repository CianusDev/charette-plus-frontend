# Architecture du Projet

## Stack technique

| Technologie | Rôle |
|-------------|------|
| **TanStack Start** | Framework SSR React (Vite + Nitro) |
| **TanStack Router** | Routage file-based, typé |
| **React 19** | UI |
| **TypeScript** | Typage strict |
| **Tailwind CSS v4** | Styling utility-first |
| **shadcn/ui** (`radix-ui`, style `radix-vega`) | Composants UI |
| **Vitest** + `@testing-library/react` | Tests |

> Ce projet utilise **TanStack Start**, pas Next.js. Pas de `"use server"` / `"use client"`. Le SSR est géré par TanStack Router loaders.

---

## Commandes

```bash
pnpm dev              # Dev sur port 3000 (mode development)
pnpm dev:staging      # Dev mode staging
pnpm dev:prod         # Dev mode production
pnpm build            # Build development
pnpm build:staging    # Build staging
pnpm build:prod       # Build production
pnpm preview          # Preview build
pnpm test             # Tests (vitest)
pnpm type-check       # Vérification TypeScript
pnpm lint             # ESLint
pnpm format           # Prettier + ESLint fix
```

---

## Import alias

L'alias `#/` est configuré dans `package.json` (champ `imports`) et mappe vers `./src/`.

```ts
import { cn } from '#/shared/lib/utils'
import { logger } from '#/shared/lib/logger'
import api from '#/shared/lib/api'
import { environment } from '#/environments'
```

**Jamais** utiliser `@/` dans le code — c'est uniquement dans `components.json` (config shadcn).

---

## Système d'environnement

Vite résout dynamiquement l'environnement via un alias dans `vite.config.ts` :

| Commande | Fichier chargé |
|----------|----------------|
| `pnpm dev` | `src/environments/environment.ts` |
| `pnpm dev:staging` | `src/environments/environment.staging.ts` |
| `pnpm dev:prod` / `build:prod` | `src/environments/environment.prod.ts` |

**Import unique** dans le code :
```ts
import { environment } from '#/environments'
// → résolu automatiquement selon le mode Vite
```

Ne jamais importer directement `environment.prod.ts` ou `environment.staging.ts`.

L'interface `Environment` est définie dans `src/environments/environment.interface.ts`.

---

## Routage (TanStack Router)

Routes définies dans `src/routes/` via la convention de fichiers TanStack Router.

| Fichier | URL |
|---------|-----|
| `src/routes/__root.tsx` | Layout racine (shell HTML) |
| `src/routes/index.tsx` | `/` |
| `src/routes/forms/index.tsx` | `/forms` |
| `src/routes/users/$id.tsx` | `/users/:id` |

**`src/routeTree.gen.ts` est auto-généré** par TanStack Router au démarrage du dev server. Ne jamais l'éditer.

Structure d'une route :
```tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/ma-route')({
  component: MaPage,
  // loader, beforeLoad, etc.
})

function MaPage() {
  return <div>...</div>
}
```

---

## Shared — Code transversal

`src/shared/` contient tout ce qui est utilisé par plusieurs features.

| Dossier | Contenu |
|---------|---------|
| `shared/components/ui/` | Composants shadcn (auto-générés) |
| `shared/data/` | `constants.ts`, `local-storage-keys.ts` |
| `shared/hooks/` | Hooks React globaux (`use-*.ts`) |
| `shared/lib/` | `api.ts`, `logger.ts`, `utils.ts` |
| `shared/providers/` | Context providers React |

### `shared/lib/api.ts`

Classe `Api` et `ApiError` basées sur `fetch`. Instance singleton exportée.

```ts
import api from '#/shared/lib/api'

const users = await api.get<User[]>('/users')
const user = await api.post<User>('/users', { name: 'Alice' })
```

`ApiError` contient `.status` (HTTP code) et `.data` (body de l'erreur).

### `shared/lib/logger.ts`

```ts
import { logger } from '#/shared/lib/logger'

logger.debug('message')
logger.info('message')
logger.warn('message')
logger.error('message', error)
```

Niveau de log contrôlé par `environment.logLevel`.

### `shared/lib/utils.ts`

```ts
import { cn } from '#/shared/lib/utils'
// fusion classes Tailwind : cn('base', condition && 'variant', className)
```

---

## Features

Chaque feature dans `src/features/{nom-feature}/` est autonome.

Structure type :
```
features/
└── users/
    ├── index.ts              # Exports publics de la feature
    ├── users.service.ts      # Appels API (utilise api de shared/lib)
    ├── use-users.ts          # Hook React
    ├── users.types.ts        # Types/interfaces spécifiques
    └── components/
        └── user-card.tsx     # Composants UI spécifiques
```

Voir `patterns/feature.md` pour le guide complet.
