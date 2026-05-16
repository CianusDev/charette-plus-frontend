# Agent Rules — Index

Dossier de référence pour tout agent IA travaillant sur ce projet.

## Ordre de lecture

1. **Ce fichier** → Vue d'ensemble
2. `architecture.md` → Stack, structure des dossiers, système d'env, routage
3. `conventions.md` → Nommage, placement, règles TypeScript
4. `patterns/` → Guides d'implémentation par type de fichier

## Navigation rapide

| Je veux... | Lire |
|------------|------|
| Comprendre la structure du projet | `architecture.md` |
| Savoir où placer un fichier | `conventions.md` |
| Créer une feature | `patterns/feature.md` |
| Ajouter une route | `patterns/route.md` |
| Appeler une API | `patterns/service.md` |
| Créer un hook React | `patterns/hook.md` |
| Créer un composant | `patterns/component.md` |
| Créer une feature complète | `../../skills/create-feature.md` |
| Créer une route/page | `../../skills/create-route.md` |
| Créer un composant | `../../skills/create-component.md` |

## Structure `src/`

```
src/
├── environments/       # Configs dev/staging/prod (Vite alias)
├── features/           # Modules fonctionnels autonomes ⭐
├── shared/             # Code transversal
│   ├── components/ui/  # shadcn — ne pas modifier
│   ├── data/           # Constantes, clés localStorage
│   ├── hooks/          # Hooks globaux
│   ├── lib/            # api.ts, logger.ts, utils.ts
│   └── providers/      # Context providers
├── routes/             # Pages TanStack Router (file-based)
├── router.tsx          # Instance du router
├── routeTree.gen.ts    # AUTO-GÉNÉRÉ — ne jamais modifier
└── styles.css          # Styles globaux
```

## Règles absolues

- Alias import : `#/` → `src/` (pas `@/`)
- Ne jamais toucher `src/routeTree.gen.ts`
- Ne jamais modifier `src/shared/components/ui/` manuellement
- Pas de `any`, pas de `@ts-ignore`
- Toutes les variables d'env viennent de `#/environments`
