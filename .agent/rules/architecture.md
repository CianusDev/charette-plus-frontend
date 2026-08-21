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
| `src/routes/index.tsx` | `/` — accueil (hero, 3 kits en avant, avantages, CTA) |
| `src/routes/kits/index.tsx` | `/kits` — catalogue complet (recherche, tri) |
| `src/routes/kits/$slug.tsx` | `/kits/:slug` — détail d'un kit |
| `src/routes/a-propos/index.tsx` | `/a-propos` |
| `src/routes/contact/index.tsx` | `/contact` |
| `src/routes/login/index.tsx` | `/login` — connexion admin |
| `src/routes/admin/route.tsx` | Layout `/admin/*` (sidebar), protégé par `requireAdmin` |
| `src/routes/admin/index.tsx` | `/admin` — tableau de bord |
| `src/routes/admin/kits/index.tsx` | `/admin/kits` — liste des kits |
| `src/routes/admin/kits/new.tsx` | `/admin/kits/new` |
| `src/routes/admin/kits/$id.tsx` | `/admin/kits/:id` — édition kit + articles |
| `src/routes/admin/contenu/index.tsx` | `/admin/contenu` — contenu du site (onglets) |
| `src/routes/admin/compte/index.tsx` | `/admin/compte` — mot de passe |

La navigation publique se fait par **pages**, plus par ancres : chaque section a son URL indexable. Le titre de la barre admin est déduit de la route, donc une page admin ne réaffiche pas son propre `<h1>`.

Les routes publiques sont rendues côté serveur (loader → API). Les routes `/admin/*` et `/login` portent `ssr: false` : la session est un cookie httpOnly, indisponible pendant le rendu serveur.

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

Classe `Api` basée sur `fetch`, instance singleton exportée. Toutes les requêtes partent avec `credentials: 'include'` (session par cookie httpOnly — aucun token manipulé en JavaScript).

`api.get/post/...` ne lèvent jamais : elles renvoient `APIResponse<T>` (`{ success, data?, message? }`). Le helper `unwrap()` déballe l'enveloppe `ControllerResponse` de l'API et lève une `Error` en cas d'échec.

```ts
import api, { unwrap } from '#/shared/lib/api'
import type { ApiEnvelope } from '#/shared/lib/api'

const kits = unwrap(await api.get<ApiEnvelope<{ kits: Array<Kit> }>>('/kits')).kits
```

Voir `patterns/service.md`.

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

Features du projet :

```
features/
├── kits/                     # Domaine metier : kits et articles
│   ├── index.ts              # Exports publics
│   ├── kits.service.ts       # Routes publiques
│   ├── admin-kits.service.ts # Routes d'administration
│   ├── kits.utils.ts         # formatPrice, images, message WhatsApp
│   ├── kits.types.ts
│   └── components/           # kit-card, product-card, kit-form, kit-items-manager
├── landing/components/       # Sections de la vitrine (hero, why, about, contact…)
├── auth/                     # Connexion admin, guards de route
└── uploads/                  # Upload direct vers Cloudinary (signature via l'API)
```

La charte graphique est reprise de la maquette statique : couleurs et ombres sont des tokens Tailwind déclarés dans `src/styles.css` (`--color-navy`, `--color-orange`, `--shadow-brand`…), polices DM Sans / Outfit via `@fontsource-variable`.

Voir `patterns/feature.md` pour le guide complet.
