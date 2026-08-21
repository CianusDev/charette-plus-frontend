import { useEffect, useState } from 'react'
import {
  Link,
  Outlet,
  createFileRoute,
  useRouter,
  useRouterState,
} from '@tanstack/react-router'
import {
  FileText,
  LayoutDashboard,
  LogOut,
  Menu,
  Package,
  Store,
  UserCog,
  X,
} from 'lucide-react'
import { toast } from 'sonner'

import { requireAdmin, signOut } from '#/features/auth'
import { cn } from '#/shared/lib/utils'

export const Route = createFileRoute('/admin')({
  // Toute la console admin est rendue cote client : le cookie httpOnly de session
  // n'est pas disponible pendant le rendu serveur.
  ssr: false,
  beforeLoad: () => requireAdmin(),
  component: AdminLayout,
})

const NAV_ITEMS = [
  { to: '/admin', label: 'Tableau de bord', icon: LayoutDashboard, exact: true },
  { to: '/admin/kits', label: 'Kits', icon: Package, exact: false },
  { to: '/admin/contenu', label: 'Contenu du site', icon: FileText, exact: false },
  { to: '/admin/compte', label: 'Compte', icon: UserCog, exact: false },
] as const

/** Titre affiche dans la barre du haut, deduit de la route courante. */
function useCurrentTitle(): string {
  const pathname = useRouterState({ select: (state) => state.location.pathname })
  const match = [...NAV_ITEMS]
    .sort((a, b) => b.to.length - a.to.length)
    .find((item) => pathname === item.to || pathname.startsWith(`${item.to}/`))
  return match?.label ?? 'Administration'
}

function AdminLayout() {
  const { user } = Route.useRouteContext()
  const router = useRouter()
  const title = useCurrentTitle()
  const pathname = useRouterState({ select: (state) => state.location.pathname })
  const [open, setOpen] = useState(false)

  // Refermer le tiroir a chaque navigation sur mobile.
  useEffect(() => setOpen(false), [pathname])

  const handleSignOut = async () => {
    await signOut()
    toast.success('Déconnexion réussie')
    await router.navigate({ to: '/login' })
  }

  return (
    <div className="min-h-svh bg-sand-50">
      {open ? (
        <button
          type="button"
          aria-label="Fermer le menu"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-navy-dark/40 lg:hidden"
        />
      ) : null}

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-sand-200 bg-white transition-transform duration-200 lg:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-sand-200 px-5">
          <Link to="/admin" className="flex items-center gap-3">
            <img src="/assets/logo.svg" alt="Charette Plus" className="h-8 w-auto" />
            <span className="rounded-full bg-navy px-2.5 py-0.5 text-xs font-semibold text-white">
              Admin
            </span>
          </Link>
          <button
            type="button"
            aria-label="Fermer le menu"
            onClick={() => setOpen(false)}
            className="grid size-9 place-items-center rounded-full text-gray-500 hover:bg-sand-100 lg:hidden"
          >
            <X className="size-5" />
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-4">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.exact }}
              activeProps={{ className: 'bg-navy text-white hover:bg-navy hover:text-bg-navy' }}
              className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-navy-mid transition-colors hover:bg-sand-100"
            >
              <item.icon className="size-4 shrink-0" />
              {item.label}
            </Link>
          ))}

          <div className="my-3 border-t border-sand-200" />

          <Link
            to="/"
            target="_blank"
            className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-navy-mid transition-colors hover:bg-sand-100"
          >
            <Store className="size-4 shrink-0" />
            Voir la vitrine
          </Link>
        </nav>

        <div className="border-t border-sand-200 p-4">
          <p className="mb-3 px-1 text-sm">
            <span className="block font-semibold text-navy">{user.username}</span>
            <span className="text-xs text-gray-500">Administrateur</span>
          </p>
          <button
            type="button"
            onClick={handleSignOut}
            className="flex w-full items-center gap-3 rounded-xl border border-sand-200 px-4 py-2.5 text-sm font-medium text-navy transition-colors hover:border-navy"
          >
            <LogOut className="size-4" />
            Déconnexion
          </button>
        </div>
      </aside>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-sand-200 bg-white/95 px-4 backdrop-blur-md sm:px-6">
          <button
            type="button"
            aria-label="Ouvrir le menu"
            onClick={() => setOpen(true)}
            className="grid size-10 place-items-center rounded-full text-navy hover:bg-sand-100 lg:hidden"
          >
            <Menu className="size-5" />
          </button>
          <h1 className="truncate text-lg font-semibold text-navy">{title}</h1>
        </header>

        <main className="px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
