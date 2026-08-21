import { useState, useTransition } from 'react'
import { toast } from 'sonner'

import { FormInput } from '#/shared/components/form-inputs'
import { Button } from '#/shared/components/ui/button'
import { changePassword } from '../auth.service'

export function ChangePasswordForm() {
  const [isPending, startTransition] = useTransition()
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmation, setConfirmation] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    if (newPassword !== confirmation) {
      setError('La confirmation ne correspond pas au nouveau mot de passe')
      return
    }
    setError(null)

    startTransition(async () => {
      try {
        await changePassword(currentPassword, newPassword)
        toast.success('Mot de passe mis à jour')
        setCurrentPassword('')
        setNewPassword('')
        setConfirmation('')
      } catch (submitError) {
        toast.error(
          submitError instanceof Error
            ? submitError.message
            : 'Modification impossible',
        )
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-md flex-col gap-4">
      <FormInput
        label="Mot de passe actuel"
        type="password"
        autoComplete="current-password"
        value={currentPassword}
        onChange={(event) => setCurrentPassword(event.target.value)}
        required
      />
      <FormInput
        label="Nouveau mot de passe"
        type="password"
        autoComplete="new-password"
        description="8 caractères minimum, avec au moins une majuscule, une minuscule et un chiffre."
        value={newPassword}
        onChange={(event) => setNewPassword(event.target.value)}
        required
      />
      <FormInput
        label="Confirmer le nouveau mot de passe"
        type="password"
        autoComplete="new-password"
        error={error ?? undefined}
        value={confirmation}
        onChange={(event) => setConfirmation(event.target.value)}
        required
      />
      <div>
        <Button type="submit" loading={isPending}>
          Mettre à jour le mot de passe
        </Button>
      </div>
    </form>
  )
}
