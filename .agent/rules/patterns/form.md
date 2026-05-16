# Pattern : Formulaire

Formulaires utilisent `react-hook-form` + Zod v4 + `zodResolver`. Schéma dans `{feature}.schemas.ts`, types dérivés dans `{feature}.types.ts`.

## Structure fichiers

```
src/features/auth/
├── auth.schemas.ts        # Schémas Zod
├── auth.types.ts          # Types dérivés (z.infer)
└── components/
    └── login-form.tsx     # Composant formulaire
```

## 1. Schéma (`{feature}.schemas.ts`)

```ts
import { z } from 'zod'

export const LoginSchema = z.object({
  email: z.email(),
  password: z.string({ message: 'Le mot de passe est requis' }),
})
```

**Import obligatoire :** `import { z } from 'zod'` (named import). Zod v4 — `z.email()` est top-level, pas `z.string().email()`.

## 2. Types (`{feature}.types.ts`)

```ts
import type z from 'zod'
import type { LoginSchema } from './auth.schemas'

export type LoginDto = z.infer<typeof LoginSchema>
```

Types dérivés via `z.infer` → toujours en sync avec le schéma. Pas de duplication manuelle.

## 3. Composant formulaire (`components/{name}-form.tsx`)

```tsx
import { useTransition } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
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
      const { success, data, message } = await signIn(payload)
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

## Points clés

| Sujet | Règle |
|-------|-------|
| Pending state | `useTransition` — pas `useState<boolean>` |
| Validation | `zodResolver(Schema)` dans `useForm` |
| Erreur affichée | `errors.field?.message` → prop `error` de `FormInput` |
| Feedback | `toast.error` / `toast.success` (sonner) |
| API response | Destructurer `{ success, data, message }` — voir `APIResponse<T>` |
| Password | `type="password"` active toggle automatiquement dans `FormInput` |

## Dépendances requises

```bash
pnpm add react-hook-form @hookform/resolvers zod sonner
```

`zod` déjà présent dans le boilerplate. `sonner` peut l'être aussi — vérifier `package.json`.
