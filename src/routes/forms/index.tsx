import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/forms/')({
  beforeLoad: () => {
    throw redirect({ to: '/' })
  },
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/forms/"!</div>
}
