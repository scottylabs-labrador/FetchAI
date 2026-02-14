import { createFileRoute, redirect } from '@tanstack/react-router'
import { supabase } from '../lib/supabase'
import { useEvents } from '../hooks/useEvents'
import { usePreferences } from '../hooks/usePreferences'
import { SOURCE_MAP } from '../lib/sources'

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
  const { sources: selectedSources, loading: prefsLoading } = usePreferences()
  const { events, loading, error, retry } = useEvents(selectedSources)

  const isLoading = prefsLoading || loading

  return (
    <div className="page">
      {/* Hero */}
      <div className="page-hero">
        <h1 className="page-title">Bulletin Board</h1>
        <p className="page-description">
          Live events from your selected CMU departments
        </p>
      </div>

      {/* Source badges */}
      {!prefsLoading && selectedSources.length > 0 && (
        <div className="active-sources">
          {selectedSources.map((id) => {
            const src = SOURCE_MAP.get(id)
            return src ? (
              <span key={id} className="active-source-badge">
                {src.shortName}
              </span>
            ) : null
          })}
        </div>
      )}

      {/* Content */}
      <div className="section">
        {isLoading && (
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

        {!isLoading && !error && events.length === 0 && (
          <p className="empty-text">No upcoming events found.</p>
        )}

        {!isLoading && events.length > 0 && (
          <>
            <h2 className="section-title">
              {events.length} event{events.length !== 1 ? 's' : ''} found
            </h2>
            <div className="card-grid">
              {events.map((event, i) => {
                const src = SOURCE_MAP.get(event.source)
                return (
                  <div key={i} className="card">
                    <div>
                      <div className="card-meta">
                        {src && (
                          <span
                            className="card-source"
                            data-source={event.source}
                          >
                            {src.shortName}
                          </span>
                        )}
                        <span className="card-tag">{event.eventType}</span>
                      </div>
                      <h3 className="card-title">{event.title}</h3>
                      {event.startDate && (
                        <p className="card-date">
                          {formatDate(event.startDate)}
                        </p>
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
                )
              })}
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <footer className="page-footer">
        <p>
          Data from CMU department calendars
          {' · '}© {new Date().getFullYear()} FetchAI
        </p>
      </footer>
    </div>
  )
}