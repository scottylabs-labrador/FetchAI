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
    <div className="page">
      <div className="page-hero">
        <h1 className="page-title">Profile</h1>
      </div>

      <div className="section">
        <div className="profile-card">
          {user && (
            <div className="profile-info">
              <div className="profile-avatar">{user.email?.charAt(0).toUpperCase()}</div>
              <div>
                <p className="profile-label">Email</p>
                <p className="profile-value">{user.email}</p>
              </div>
            </div>
          )}
          <button onClick={handleLogout} className="btn-secondary">
            Sign out
          </button>
        </div>
      </div>
    </div>
  )
}
