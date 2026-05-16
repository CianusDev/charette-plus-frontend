# Skill : Créer un FormInput

## Quand utiliser ce skill

Quand on demande d'ajouter un champ de formulaire typé, intégrable avec `react-hook-form`.

## Prérequis

**Dépendances non installées par défaut :**

```bash
pnpm add react-hook-form @hookform/resolvers zod
```

`zod` déjà présent dans le boilerplate. Vérifier `package.json` avant d'installer.

## Composant déjà disponible

`FormInput` existe dans `src/shared/components/form-inputs/form-input.tsx`, exporté via :

```ts
import { FormInput } from '#/shared/components/form-inputs'
```

**Ne pas recréer** — l'utiliser directement.

## Comportement built-in

- `type="password"` → toggle Eye/EyeClosed automatique, pas de config supplémentaire
- `error` prop → affiche `FieldError` + style destructive via `aria-invalid` + `data-invalid`
- `useId()` interne → label ↔ input lié automatiquement (accessibilité)
- `React.ComponentProps<'input'>` → React 19 `ref` inclus → fonctionne avec `{...register(...)}`

## Composants UI sous-jacents

| Import | Provenance |
|--------|------------|
| `Field` | `#/shared/components/ui/field` |
| `FieldLabel` | `#/shared/components/ui/field` |
| `FieldDescription` | `#/shared/components/ui/field` |
| `FieldError` | `#/shared/components/ui/field` |
| `Input` | `#/shared/components/ui/input` |

## Usage avec react-hook-form + Zod

```tsx
import { useTransition } from 'react'
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { LoginSchema } from '../auth.schemas'
import type { LoginDto } from '../auth.types'
import { signIn } from '../auth.service'
import { FormInput } from '#/shared/components/form-inputs'
import { Button } from '#/shared/components/ui/button'

export function LoginForm() {
  const [isPending, startTransition] = useTransition()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginDto>({
    resolver: zodResolver(LoginSchema),
  })

  const onSubmit = (payload: LoginDto) => {
    startTransition(async () => {
      const { success, message } = await signIn(payload)
      if (!success) {
        toast.error(message || 'Erreur')
        return
      }
      toast.success(message || 'Succès')
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <FormInput
        label="E-mail"
        type="email"
        placeholder="you@example.com"
        error={errors.email?.message}
        {...register('email')}
      />
      <FormInput
        label="Mot de passe"
        type="password"
        error={errors.password?.message}
        {...register('password')}
      />
      <Button type="submit" loading={isPending}>
        Se connecter
      </Button>
    </form>
  )
}
```

**Points clés :**
- `useTransition` pour le pending state — pas `useState<boolean>`
- `Button` a un prop `loading` — passe `isPending` directement
- `{...register('field')}` spread en **dernier** pour ne pas écraser `id`
- `type="password"` → toggle visible/caché intégré, rien à ajouter

## Implémentation complète (si besoin de créer un nouveau FormInput)

```tsx
import { useId, useState } from 'react'
import { Eye, EyeClosed } from 'lucide-react'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '#/shared/components/ui/field'
import { Input } from '#/shared/components/ui/input'
import { cn } from '#/shared/lib/utils'

interface FormInputProps extends React.ComponentProps<'input'> {
  label: string
  description?: string
  error?: string
  containerClassName?: string
}

export function FormInput({
  label,
  description,
  error,
  containerClassName,
  id,
  type,
  ...props
}: FormInputProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const isPassword = type === 'password'
  const [showPassword, setShowPassword] = useState(false)

  return (
    <Field
      data-invalid={error ? true : undefined}
      className={cn('flex flex-col gap-1', containerClassName)}
    >
      <FieldLabel htmlFor={inputId}>{label}</FieldLabel>
      {isPassword ? (
        <div className="relative">
          <Input
            id={inputId}
            aria-invalid={!!error}
            type={showPassword ? 'text' : 'password'}
            {...props}
          />
          <button
            type="button"
            tabIndex={-1}
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-muted-foreground"
            aria-label={showPassword ? 'Cacher le mot de passe' : 'Afficher le mot de passe'}
          >
            {showPassword ? <Eye className="size-4" /> : <EyeClosed className="size-4" />}
          </button>
        </div>
      ) : (
        <Input id={inputId} aria-invalid={!!error} type={type} {...props} />
      )}
      {description && <FieldDescription>{description}</FieldDescription>}
      {error && <FieldError>{error}</FieldError>}
    </Field>
  )
}
```

Exporter dans `src/shared/components/form-inputs/index.ts` :

```ts
export { FormInput } from './form-input'
```

## Variantes supplémentaires

Même pattern pour `FormTextarea`, `FormSelect`, etc. :

```tsx
interface FormTextareaProps extends React.ComponentProps<'textarea'> {
  label: string
  description?: string
  error?: string
  containerClassName?: string
}
```

Placer dans `src/shared/components/form-inputs/form-textarea.tsx`, exporter via le même `index.ts`.

## Vérification finale

- [ ] `react-hook-form` + `@hookform/resolvers` installés
- [ ] Schéma Zod défini dans `{feature}.schemas.ts` avec `import { z } from 'zod'`
- [ ] `zodResolver(Schema)` passé à `useForm`
- [ ] `useTransition` pour pending state — pas `useState`
- [ ] `Button loading={isPending}` pour feedback visuel
- [ ] `{...register('field')}` spread en dernier sur `FormInput`
- [ ] Import depuis `#/shared/components/form-inputs` (barrel, pluriel)
