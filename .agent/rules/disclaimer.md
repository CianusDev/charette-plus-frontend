# Disclaimer — Règles Critiques

Directives non-négociables pour tout agent IA travaillant sur ce projet.

---

## Fichiers à ne jamais modifier

| Fichier | Raison |
|---------|--------|
| `src/routeTree.gen.ts` | Auto-généré par TanStack Router au démarrage |
| `src/shared/components/ui/*` | Géré par `pnpm shadcn add` |
| `vite.config.ts` | Config critique (alias env, plugins SSR) |
| `tsconfig.json` | Config TypeScript stricte |

---

## Interdits absolus

**TypeScript**
- Pas de `any` → utiliser `unknown` ou generics
- Pas de `@ts-ignore` / `@ts-nocheck`
- Pas de `as` unsafe (`as SomeType` sur `unknown` sans validation)

**Architecture**
- Pas d'imports `@/` dans le code → uniquement `#/` ou relatifs
- Pas d'import direct depuis l'intérieur d'une feature depuis l'extérieur → passer par `index.ts`
- Pas de logique métier dans `src/shared/` → `shared/` = utilitaires transversaux uniquement

**Environnement**
- Pas de valeurs en dur (URLs, clés, secrets) → tout vient de `#/environments`
- Pas de lecture de `process.env` directement → passer par `environment` object

**Routing**
- Pas de `Route.redirect()` → utiliser `throw redirect({ to: '...' })` de `@tanstack/react-router`
- Pas d'édition manuelle de `src/routeTree.gen.ts`

---

## Checklist avant de terminer

- [ ] `pnpm type-check` — zéro erreur TypeScript
- [ ] `pnpm lint` — zéro warning ESLint
- [ ] Nommage respecte `conventions.md`
- [ ] Nouveaux fichiers au bon endroit (`conventions.md` → tableau placement)
- [ ] Pas de code dupliqué entre features ou avec `shared/`
- [ ] `index.ts` mis à jour si nouvelle feature ou nouveau composant exporté

---

## En cas de doute

1. Lire `architecture.md` pour comprendre la structure
2. Lire le pattern correspondant dans `patterns/`
3. Demander clarification — ne pas faire d'hypothèse sur les besoins métier
