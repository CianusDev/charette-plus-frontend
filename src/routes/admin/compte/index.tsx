import { createFileRoute } from '@tanstack/react-router'

import { ChangePasswordForm } from '#/features/auth'

export const Route = createFileRoute('/admin/compte/')({
  component: AccountPage,
})

function AccountPage() {
  const { user } = Route.useRouteContext()

  return (
    <div className="flex max-w-2xl flex-col gap-6">
      <section className="rounded-2xl bg-white p-6 shadow-brand">
        <h2 className="text-xl font-semibold text-navy">Compte</h2>
        <p className="mt-1 text-sm text-gray-500">
          Un seul compte administre le site.
        </p>
        <dl className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl bg-sand-50 p-4">
            <dt className="text-xs text-gray-500">Nom d'utilisateur</dt>
            <dd className="font-semibold text-navy">{user.username}</dd>
          </div>
          <div className="rounded-xl bg-sand-50 p-4">
            <dt className="text-xs text-gray-500">Rôle</dt>
            <dd className="font-semibold text-navy">{user.role}</dd>
          </div>
        </dl>
      </section>

      <section className="rounded-2xl bg-white p-6 shadow-brand">
        <h2 className="text-xl font-semibold text-navy">Mot de passe</h2>
        <p className="mt-1 mb-4 text-sm text-gray-500">
          Le mot de passe actuel est redemandé pour confirmer le changement.
        </p>
        <ChangePasswordForm />
      </section>
    </div>
  )
}
