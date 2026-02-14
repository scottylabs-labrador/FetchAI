import { createFileRoute, redirect } from '@tanstack/react-router'
import { supabase } from '../lib/supabase'

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

function HomeComponent() {
  return (
    <div className="page">
      {/* Hero */}
      <div className="page-hero">
        <h1 className="page-title">Bulletin Board</h1>
        <p className="page-description">
          One-liner information about the bulletin board
        </p>
      </div>

      {/* Cards */}
      <div className="section">
        <h2 className="section-title">Summary of Info</h2>
        <div className="card-grid">
          {[
            {
              title: 'Information about Event 1',
              summary: 'Summary or description.',
              tag: 'Technology',
            },
            {
              title: 'Information about Event 2',
              summary: 'Summary or description.',
              tag: 'Clubs',
            },
            {
              title: 'Information about Event 3',
              summary: 'Summary or description.',
              tag: 'Events',
            },
            {
              title: 'Information about Event 4',
              summary: 'Summary or description.',
              tag: 'Opportunities',
            },
            {
              title: 'Information about Event 5',
              summary: 'Summary or description.',
              tag: 'Research',
            },
            {
              title: 'Information about Event 6',
              summary: 'Summary or description.',
              tag: 'Community',
            },
          ].map((post, i) => (
            <div key={i} className="card">
              <div>
                <span className="card-tag">{post.tag}</span>
                <h3 className="card-title">{post.title}</h3>
                <p className="card-text">{post.summary}</p>
              </div>
              <button className="card-link">Read more →</button>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="page-footer">
        <p>© {new Date().getFullYear()} FetchAI. All rights reserved.</p>
      </footer>
    </div>
  )
}