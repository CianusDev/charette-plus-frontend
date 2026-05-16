# Skill : Créer un composant

## Quand utiliser ce skill

Quand on demande d'ajouter un composant UI, un élément réutilisable, ou un bloc d'interface.

## Décision : où placer le composant ?

```
Composant métier spécifique à une feature
  → src/features/{feature}/components/{nom}.tsx

Composant partagé entre plusieurs features
  → src/shared/components/{nom}.tsx

Composant shadcn (généré)
  → pnpm shadcn add {nom}  (ne pas créer manuellement)
```

## Étapes

### 1. Créer le fichier

Nom en `kebab-case.tsx`.

```tsx
// src/features/users/components/user-card.tsx
// ou
// src/shared/components/stat-card.tsx
```

### 2. Définir l'interface des props

```tsx
interface UserCardProps {
  user: User           // type métier
  className?: string   // toujours inclure pour flexibilité Tailwind
  onDelete?: (id: string) => void  // callbacks optionnels
}
```

### 3. Écrire le composant

```tsx
import { cn } from '#/shared/lib/utils'
import type { User } from '../users.types'

interface UserCardProps {
  user: User
  className?: string
  onDelete?: (id: string) => void
}

export function UserCard({ user, className, onDelete }: UserCardProps) {
  return (
    <div className={cn('rounded-lg border bg-card p-4 shadow-sm', className)}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold">{user.name}</h3>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>
        {onDelete && (
          <button
            onClick={() => onDelete(user.id)}
            className="text-destructive hover:text-destructive/80"
          >
            Supprimer
          </button>
        )}
      </div>
    </div>
  )
}
```

### 4. Utiliser les composants shadcn si disponibles

Préférer les composants `src/shared/components/ui/` aux éléments HTML natifs :

```tsx
import { Button } from '#/shared/components/ui/button'
import { Input } from '#/shared/components/ui/input'
import { Label } from '#/shared/components/ui/label'
```

Vérifier les composants disponibles : `ls src/shared/components/ui/`

Si le composant n'existe pas → `pnpm shadcn add {nom}`.

### 5. Exporter depuis le barrel de la feature

Si composant dans une feature, l'exposer dans `index.ts` :

```ts
// src/features/users/index.ts
export { UserCard } from './components/user-card'
```

## Vérification finale

- [ ] Fichier en `kebab-case.tsx`
- [ ] Export nommé PascalCase (pas default export)
- [ ] Props interface définie et typée
- [ ] `className?: string` inclus pour override Tailwind
- [ ] `cn()` utilisé pour merger les classes
- [ ] Composants shadcn utilisés si disponibles
- [ ] Exporté dans `index.ts` si dans une feature
