import { Link, createFileRoute } from '@tanstack/react-router'

import { LoginForm, requireGuest } from '#/features/auth'

export const Route = createFileRoute('/login/')({
  // La session vit dans un cookie httpOnly : la verification doit avoir lieu
  // dans le navigateur, pas pendant le rendu serveur.
  ssr: false,
  beforeLoad: () => requireGuest(),
  head: () => ({
    meta: [{ title: 'Connexion — Charette Plus' }],
  }),
  component: LoginPage,
})

function LoginPage() {
  return (
    <div className="grid min-h-svh place-items-center bg-sand-50 px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-brand">
        <Link to="/" className="mb-6 block">
          <img src="/assets/logo.svg" alt="Charette Plus" className="h-10 w-auto" />
        </Link>
        <h1 className="mb-1 text-2xl font-bold text-navy">Espace administration</h1>
        <p className="mb-6 text-sm text-gray-500">
          Connectez-vous pour gérer les kits et leurs articles.
        </p>
        <LoginForm />
      </div>
    </div>
  )
}
