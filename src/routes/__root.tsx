import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { Toaster } from 'sonner'

import { environment } from '#/environments'
import appCss from '../styles.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: `${environment.appName} — Kits de rentrée académique`,
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
      {
        rel: 'icon',
        type: 'image/svg+xml',
        href: '/assets/logo.svg',
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Toaster className="font-sans" position="top-center" richColors />
        <Scripts />
      </body>
    </html>
  )
}
