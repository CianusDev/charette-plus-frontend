# Pattern : Composant React

## Règles

- Nom de fichier : `kebab-case.tsx`
- Export nommé PascalCase (pas default export)
- Props interface au-dessus du composant
- `cn()` pour fusionner les classes Tailwind
- Composant partagé → `src/shared/components/`
- Composant métier → `src/features/{feature}/components/`
- `src/shared/components/ui/` = shadcn uniquement — ne pas modifier

## Structure de base

```tsx
import { cn } from '#/shared/lib/utils'

interface CardProps {
  title: string
  description?: string
  className?: string
  children?: React.ReactNode
}

export function Card({ title, description, className, children }: CardProps) {
  return (
    <div className={cn('rounded-lg border bg-card p-4', className)}>
      <h3 className="font-semibold">{title}</h3>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
      {children}
    </div>
  )
}
```

## Utilisation des composants shadcn

Importer depuis `#/shared/components/ui/` :

```tsx
import { Button } from '#/shared/components/ui/button'
import { Input } from '#/shared/components/ui/input'
import { Label } from '#/shared/components/ui/label'

export function LoginForm() {
  return (
    <form>
      <Label htmlFor="email">Email</Label>
      <Input id="email" type="email" placeholder="you@example.com" />
      <Button type="submit">Se connecter</Button>
    </form>
  )
}
```

Ajouter un composant shadcn : `pnpm shadcn add {nom}` → généré dans `src/shared/components/ui/`.

## Composant avec état local

```tsx
import { useState } from 'react'
import { Button } from '#/shared/components/ui/button'

interface CounterProps {
  initial?: number
  onCount?: (count: number) => void
}

export function Counter({ initial = 0, onCount }: CounterProps) {
  const [count, setCount] = useState(initial)

  const increment = () => {
    const next = count + 1
    setCount(next)
    onCount?.(next)
  }

  return (
    <div className="flex items-center gap-2">
      <span>{count}</span>
      <Button onClick={increment} size="sm">+</Button>
    </div>
  )
}
```

## Composant avec données (hook intégré)

```tsx
import { useUsers } from '#/features/users'
import { UserCard } from './user-card'

export function UserList() {
  const { data, loading, error } = useUsers()

  if (loading) return <div>Chargement...</div>
  if (error) return <div className="text-destructive">{error}</div>

  return (
    <ul className="flex flex-col gap-2">
      {data.map(user => (
        <li key={user.id}>
          <UserCard user={user} />
        </li>
      ))}
    </ul>
  )
}
```

## Composant polymorphe (asChild pattern via Radix)

```tsx
import { Slot } from 'radix-ui'

interface WrapperProps {
  asChild?: boolean
  className?: string
  children: React.ReactNode
}

export function Wrapper({ asChild, className, children }: WrapperProps) {
  const Comp = asChild ? Slot.Root : 'div'
  return <Comp className={cn('wrapper-styles', className)}>{children}</Comp>
}
```

## Variantes avec `cva`

```tsx
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '#/shared/lib/utils'

const badgeVariants = cva('inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium', {
  variants: {
    variant: {
      default: 'bg-primary/10 text-primary',
      success: 'bg-green-100 text-green-800',
      error: 'bg-red-100 text-red-800',
    },
  },
  defaultVariants: { variant: 'default' },
})

interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />
}
```
