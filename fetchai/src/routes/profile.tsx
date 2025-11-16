import { createFileRoute, useNavigate, redirect } from '@tanstack/react-router'
import { useAuth } from '../hooks/useAuth'
import { supabase } from '../lib/supabase'

export const Route = createFileRoute('/profile')({
  beforeLoad: async () => {
    const { data } = await supabase.auth.getSession()
    if (!data.session) {
      throw redirect({
        to: '/login',
      })
    }
  },
  component: Profile,
})

function Profile() {
  const { user } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate({ to: '/login' })
  }

  return (
    <div className="form-container">
      <h2>User Profile</h2>
      {user && (
        <div>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
        </div>
      )}
      <button onClick={handleLogout} className="mt-4">
        Logout
      </button>
    </div>
  )
}
