import { Link, Outlet, createRootRoute, useRouterState } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { useAuth } from '../hooks/useAuth'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  const { session } = useAuth()
  const routerState = useRouterState()
  const currentPath = routerState.location.pathname

  const isAuthPage = currentPath === '/login' || currentPath === '/signup' || currentPath === '/forgot-password'

  if (isAuthPage) {
    return (
      <>
        <Outlet />
        <TanStackRouterDevtools position="bottom-right" />
      </>
    )
  }

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-brand">
            FetchAI
          </Link>
          <div className="navbar-links">
            {session ? (
              <>
                <Link
                  to="/"
                  activeProps={{
                    className: 'active',
                  }}
                  activeOptions={{ exact: true }}
                >
                  Home
                </Link>
                <Link
                  to="/about"
                  activeProps={{
                    className: 'active',
                  }}
                >
                  About
                </Link>
                <Link
                  to="/profile"
                  activeProps={{
                    className: 'active',
                  }}
                >
                  Profile
                </Link>
              </>
            ) : (
              <Link
                to="/login"
                activeProps={{
                  className: 'active',
                }}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>
      <div className="container">
        <Outlet />
      </div>
      <TanStackRouterDevtools position="bottom-right" />
    </>
  )
}
