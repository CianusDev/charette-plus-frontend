import { useTransition } from 'react'
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema'
import { useRouter } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { FormInput } from '#/shared/components/form-inputs'
import { Button } from '#/shared/components/ui/button'
import { LoginSchema } from '../auth.schemas'
import { signIn } from '../auth.service'
import type { LoginDto } from '../auth.types'

export function LoginForm() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: standardSchemaResolver(LoginSchema),
  })

  const onSubmit = (payload: LoginDto) => {
    startTransition(async () => {
      try {
        const user = await signIn(payload)
        toast.success(`Bienvenue ${user.username}`)
        await router.navigate({ to: '/admin' })
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : 'Erreur lors de la connexion',
        )
      }
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <FormInput
        label="Nom d'utilisateur"
        type="text"
        autoComplete="username"
        placeholder="admin"
        error={errors.username?.message}
        {...register('username')}
      />
      <FormInput
        label="Mot de passe"
        type="password"
        autoComplete="current-password"
        placeholder="••••••••"
        error={errors.password?.message}
        {...register('password')}
      />
      <Button className="mt-2 w-full" type="submit" loading={isPending}>
        Se connecter
      </Button>
    </form>
  )
}
