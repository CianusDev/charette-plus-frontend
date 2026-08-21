import { Link, Outlet, createFileRoute, useRouter } from '@tanstack/react-router'
import { FileText, LogOut, Package, Store } from 'lucide-react'
import { toast } from 'sonner'

import { requireAdmin, signOut } from '#/features/auth'

export const Route = createFileRoute('/admin')({
  // Toute la console admin est rendue cote client : le cookie httpOnly de session
  // n'est pas disponible pendant le rendu serveur.
  ssr: false,
  beforeLoad: () => requireAdmin(),
  component: AdminLayout,
})

function AdminLayout() {
  const { user } = Route.useRouteContext()
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut()
    toast.success('Déconnexion réussie')
    await router.navigate({ to: '/login' })
  }

  return (
    <div className="min-h-svh bg-sand-50">
      <header className="border-b border-sand-200 bg-white">
        <div className="mx-auto flex w-[min(1200px,94vw)] items-center justify-between gap-4 py-4">
          <div className="flex items-center gap-6">
            <Link to="/admin" className="flex items-center gap-3">
              <img src="/assets/logo.svg" alt="Charette Plus" className="h-9 w-auto" />
              <span className="rounded-full bg-navy px-3 py-1 text-xs font-semibold text-white">
                Admin
              </span>
            </Link>
            <nav className="hidden items-center gap-4 text-sm font-medium sm:flex">
              <Link
                to="/admin"
                className="flex items-center gap-2 text-navy-mid transition-colors hover:text-orange"
                activeProps={{ className: 'text-orange' }}
                activeOptions={{ exact: true }}
              >
                <Package className="size-4" />
                Kits
              </Link>
              <Link
                to="/admin/contenu"
                className="flex items-center gap-2 text-navy-mid transition-colors hover:text-orange"
                activeProps={{ className: 'text-orange' }}
              >
                <FileText className="size-4" />
                Contenu
              </Link>
              <Link
                to="/"
                className="flex items-center gap-2 text-navy-mid transition-colors hover:text-orange"
              >
                <Store className="size-4" />
                Voir la vitrine
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden text-sm text-gray-500 sm:inline">
              {user.username}
            </span>
            <button
              type="button"
              onClick={handleSignOut}
              className="flex items-center gap-2 rounded-full border border-sand-200 px-4 py-2 text-sm font-medium text-navy transition-colors hover:border-navy"
            >
              <LogOut className="size-4" />
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-[min(1200px,94vw)] py-8">
        <Outlet />
      </main>
    </div>
  )
}
