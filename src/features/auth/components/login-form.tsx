import { useTransition } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import type { LoginDto } from '../auth.types'
import { toast } from 'sonner'
import logger from '#/shared/lib/logger'
import { FormInput } from '#/shared/components/form-inputs'
import { signIn } from '../auth.service'
import { LoginSchema } from '../auth.schemas'

export function LoginForm() {
  const [isPending, startTransition] = useTransition()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginSchema),
  })

  const onSubmit = (paylaod: LoginDto) => {
    startTransition(async () => {
      const { success, data, message } = await signIn(paylaod)
      if (!success) {
        toast.error(message || 'Erreur lors de la connexion')
        return
      }
      toast.success(message || 'Connexion réussie')
      logger.debug('Apres connexion:', {
        data,
      })
    })
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          label="E-mail"
          type="email"
          placeholder="e-mail"
          error={errors.email?.message}
          {...register('email')}
        />
        <FormInput
          label="Mot de passe"
          type="password"
          placeholder="mot de passe"
          error={errors.password?.message}
          {...register('password')}
        />
        <Button className="mt-2" type="submit" loading={isPending}>
          Se connecter
        </Button>
      </form>
    </div>
  )
}
