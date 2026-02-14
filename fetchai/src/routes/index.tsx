import { createFileRoute, redirect, Link } from '@tanstack/react-router'
import { supabase } from '../lib/supabase'
import { useEvents } from '../hooks/useEvents'
import { usePreferences } from '../hooks/usePreferences'
import { SOURCE_MAP, SOURCES } from '../lib/sources'

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
    })
  } catch {
    return ''
  }
}

function formatTime(dateStr: string | null): string {
  if (!dateStr) return ''
  try {
    const d = new Date(dateStr)
    return d.toLocaleTimeString('en-US', {
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

      {/* Source filter pills */}
      {!prefsLoading && selectedSources.length > 0 && (
        <div className="active-sources">
          {selectedSources.map((id) => {
            const src = SOURCE_MAP.get(id)
            return src ? (
              <span key={id} className="active-source-badge" data-source={id}>
                {src.shortName}
              </span>
            ) : null
          })}
          <Link to="/profile" className="active-source-edit">
            Edit
          </Link>
        </div>
      )}

      {/* Content */}
      <div className="section">
        {isLoading && (
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p className="loading-text">Fetching events from {selectedSources.length} source{selectedSources.length !== 1 ? 's' : ''}...</p>
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
          <div className="empty-state">
            <p className="empty-icon">📭</p>
            <p className="empty-title">No events found</p>
            <p className="empty-text">
              Try selecting more departments in your{' '}
              <Link to="/profile" className="auth-link">profile</Link>.
            </p>
          </div>
        )}

        {!isLoading && events.length > 0 && (
          <>
            <div className="section-header">
              <h2 className="section-title">
                {events.length} event{events.length !== 1 ? 's' : ''}
              </h2>
              <span className="section-subtitle">
                from {selectedSources.length} department{selectedSources.length !== 1 ? 's' : ''}
              </span>
            </div>
            <div className="card-grid">
              {events.map((event, i) => {
                const src = SOURCE_MAP.get(event.source)
                const date = formatDate(event.startDate)
                const time = formatTime(event.startDate)
                return (
                  <article
                    key={i}
                    className="card"
                    style={{ animationDelay: `${Math.min(i * 30, 600)}ms` }}
                  >
                    {/* Header row */}
                    <div className="card-header">
                      <div className="card-meta">
                        {src && (
                          <span className="card-source" data-source={event.source}>
                            {src.shortName}
                          </span>
                        )}
                        <span className="card-tag">{event.eventType}</span>
                      </div>
                    </div>

                    {/* Body */}
                    <div className="card-body">
                      <h3 className="card-title">{event.title}</h3>

                      {(date || event.location) && (
                        <div className="card-details">
                          {date && (
                            <span className="card-detail">
                              <span className="card-detail-icon">📅</span>
                              {date}{time ? ` · ${time}` : ''}
                            </span>
                          )}
                          {event.location && (
                            <span className="card-detail">
                              <span className="card-detail-icon">📍</span>
                              {event.location}
                            </span>
                          )}
                        </div>
                      )}

                      <p className="card-text">
                        {event.aiSummary ||
                          event.description.slice(0, 180) +
                          (event.description.length > 180 ? '...' : '')}
                      </p>

                      {event.speaker && (
                        <div className="card-speaker">
                          <span className="card-speaker-dot"></span>
                          {event.speaker}
                        </div>
                      )}
                    </div>

                    {/* Footer */}
                    {event.link && (
                      <div className="card-footer">
                        <a
                          href={event.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="card-link"
                        >
                          View event
                          <span className="card-link-arrow">→</span>
                        </a>
                      </div>
                    )}
                  </article>
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