import { Link, Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { useAuth } from '../hooks/useAuth'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  const { session } = useAuth()

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
                <Link
                  to="/Events"
                  activeProps={{
                    className: 'active',
                  }}
                >
                  Events
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
