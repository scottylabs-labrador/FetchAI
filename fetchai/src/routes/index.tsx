import { createFileRoute, redirect } from '@tanstack/react-router'
import { supabase } from '../lib/supabase'
import { useEvents } from '../hooks/useEvents'

export const Route = createFileRoute('/')({
  beforeLoad: async () => {
    const { data } = await supabase.auth.getSession()
    if (!data.session) {
      throw redirect({
        to: '/login',
      })
    }
  },
  component: HomeComponent,
})

function formatDate(dateStr: string | null): string {
  if (!dateStr) return ''
  try {
    const d = new Date(dateStr)
    return d.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    })
  } catch {
    return ''
  }
}

function HomeComponent() {
  const { events, loading, error, retry } = useEvents()

  return (
    <div className="page">
      {/* Hero */}
      <div className="page-hero">
        <h1 className="page-title">Bulletin Board</h1>
        <p className="page-description">
          Live events from the CMU School of Computer Science
        </p>
      </div>

      {/* Content */}
      <div className="section">
        {loading && (
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p className="loading-text">Fetching events...</p>
          </div>
        )}

        {error && (
          <div className="error-state">
            <p className="error-text">{error}</p>
            <button onClick={retry} className="btn-secondary">
              Try again
            </button>
          </div>
        )}

        {!loading && !error && events.length === 0 && (
          <p className="empty-text">No upcoming events found.</p>
        )}

        {!loading && events.length > 0 && (
          <>
            <h2 className="section-title">
              {events.length} upcoming event{events.length !== 1 ? 's' : ''}
            </h2>
            <div className="card-grid">
              {events.map((event, i) => (
                <div key={i} className="card">
                  <div>
                    <span className="card-tag">{event.eventType}</span>
                    <h3 className="card-title">{event.title}</h3>
                    {event.startDate && (
                      <p className="card-date">{formatDate(event.startDate)}</p>
                    )}
                    <p className="card-text">
                      {event.aiSummary ||
                        event.description.slice(0, 150) +
                        (event.description.length > 150 ? '...' : '')}
                    </p>
                    {event.speaker && (
                      <p className="card-speaker">🎤 {event.speaker}</p>
                    )}
                  </div>
                  {event.link && (
                    <a
                      href={event.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="card-link"
                    >
                      Read more →
                    </a>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <footer className="page-footer">
        <p>
          Data from{' '}
          <a
            href="https://www.cs.cmu.edu/calendar/"
            target="_blank"
            rel="noopener noreferrer"
            className="auth-link"
          >
            CMU SCS Calendar
          </a>
          {' · '}© {new Date().getFullYear()} FetchAI
        </p>
      </footer>
    </div>
  )
}