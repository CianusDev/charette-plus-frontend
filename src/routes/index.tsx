import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <div className="p-8 flex flex-col gap-4 items-center justify-center h-svh">
      <h1>
        Welcome to <span className="text-red-600">TanStack Start</span>
      </h1>
      <div className="p-8 grid grid-cols-2 gap-4 max-w-2xl w-full">
        <Link to="/login" className="p-4 border rounded-md">
          <h2 className="text-lg font-bold mb-2">Login</h2>
        </Link>
        <div className="p-4 border rounded-md">
          <h2 className="text-lg font-bold mb-2">TanStack Query</h2>
        </div>
      </div>
    </div>
  )
}
