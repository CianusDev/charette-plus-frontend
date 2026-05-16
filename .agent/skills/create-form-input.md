# Skill : Créer un FormInput

## Quand utiliser ce skill

Quand on demande d'ajouter un champ de formulaire typé, intégrable avec `react-hook-form`.

## Prérequis

**react-hook-form non installé par défaut.** Si le projet doit gérer des formulaires, installer d'abord :

```bash
pnpm add react-hook-form
```

## Composants disponibles (déjà dans le projet)

| Import | Provenance |
|--------|------------|
| `Field` | `#/shared/components/ui/field` |
| `FieldLabel` | `#/shared/components/ui/field` |
| `FieldDescription` | `#/shared/components/ui/field` |
| `FieldError` | `#/shared/components/ui/field` |
| `Input` | `#/shared/components/ui/input` |

`FieldError` accepte `children` string directement → parfait pour `errors.field?.message`.

## Où placer le composant

- Utilisé par plusieurs features → `src/shared/components/form-input.tsx`
- Spécifique à une feature → `src/features/{feature}/components/form-input.tsx`

## Implémentation

```tsx
import { useId } from 'react'
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
  ...props
}: FormInputProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId

  return (
    <Field
      data-invalid={error ? true : undefined}
      className={cn('flex flex-col gap-1', containerClassName)}
    >
      <FieldLabel htmlFor={inputId}>{label}</FieldLabel>
      <Input id={inputId} aria-invalid={!!error} {...props} />
      {description && <FieldDescription>{description}</FieldDescription>}
      {error && <FieldError>{error}</FieldError>}
    </Field>
  )
}
```

**Pourquoi `React.ComponentProps<'input'>` et non `InputHTMLAttributes` :**
React 19 — `ref` est un prop normal. `React.ComponentProps<'input'>` l'inclut, ce qui permet le `register()` de react-hook-form sans problème.

## Usage avec react-hook-form

```tsx
import { useForm } from 'react-hook-form'
import { FormInput } from '#/shared/components/form-input'

type LoginForm = {
  email: string
  password: string
}

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>()

  const onSubmit = (data: LoginForm) => console.log(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <FormInput
        label="E-mail"
        type="email"
        placeholder="you@example.com"
        error={errors.email?.message}
        {...register('email', { required: 'E-mail requis' })}
      />
      <FormInput
        label="Mot de passe"
        type="password"
        description="8 caractères minimum."
        error={errors.password?.message}
        {...register('password', { minLength: { value: 8, message: '8 caractères min.' } })}
      />
      <button type="submit">Connexion</button>
    </form>
  )
}
```

## Variantes supplémentaires (optionnel)

Si le projet a besoin de `FormSelect`, `FormTextarea`, etc., répliquer le même pattern :

```tsx
// src/shared/components/form-textarea.tsx
interface FormTextareaProps extends React.ComponentProps<'textarea'> {
  label: string
  description?: string
  error?: string
  containerClassName?: string
}

export function Formtextarea({ label, description, error, containerClassName, id, ...props }: FormTextareaProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId

  return (
    <Field data-invalid={error ? true : undefined} className={cn('flex flex-col gap-1', containerClassName)}>
      <FieldLabel htmlFor={inputId}>{label}</FieldLabel>
      <textarea id={inputId} aria-invalid={!!error} {...props} />
      {description && <FieldDescription>{description}</FieldDescription>}
      {error && <FieldError>{error}</FieldError>}
    </Field>
  )
}
```

## Vérification finale

- [ ] `react-hook-form` installé si utilisé
- [ ] `useId()` utilisé pour générer l'id (accessibilité label ↔ input)
- [ ] `aria-invalid={!!error}` présent sur l'input (style destructive shadcn)
- [ ] `data-invalid` sur `Field` (style couleur hérité via CSS)
- [ ] Props `{...register('field')}` spread en dernier pour ne pas écraser `id`
- [ ] Exporté dans `index.ts` si dans une feature
