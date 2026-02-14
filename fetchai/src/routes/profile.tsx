import { createFileRoute, useNavigate, redirect } from '@tanstack/react-router'
import { useAuth } from '../hooks/useAuth'
import { usePreferences } from '../hooks/usePreferences'
import { SOURCES } from '../lib/sources'
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
  const { sources, loading, saving, saved, toggleSource } = usePreferences()

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
        {/* User Info */}
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

        {/* Preferences */}
        <div className="preferences-section">
          <h2 className="section-title">Your Interests</h2>
          <p className="preferences-hint">
            Select the departments and schools you want to see events from.
          </p>

          {loading ? (
            <div className="loading-state">
              <div className="loading-spinner"></div>
            </div>
          ) : (
            <div className="source-grid">
              {SOURCES.map((source) => {
                const isSelected = sources.includes(source.id)
                return (
                  <button
                    key={source.id}
                    className={`source-chip ${isSelected ? 'source-chip--active' : ''}`}
                    onClick={() => toggleSource(source.id)}
                  >
                    <span className="source-chip-check">
                      {isSelected ? '✓' : ''}
                    </span>
                    <span className="source-chip-label">
                      <strong>{source.shortName}</strong>
                      <span className="source-chip-full">{source.name}</span>
                    </span>
                  </button>
                )
              })}
            </div>
          )}

          <div className="preferences-status">
            {saving && <span className="preferences-saving">Saving...</span>}
            {saved && <span className="preferences-saved">Saved ✓</span>}
          </div>
        </div>
      </div>
    </div>
  )
}
