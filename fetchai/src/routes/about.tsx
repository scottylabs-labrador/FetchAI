import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: AboutComponent,
})

function AboutComponent() {
  return (
    <div className="page">
      {/* Hero */}
      <div className="page-hero">
        <h1 className="page-title">About FetchAI</h1>
        <p className="page-description">
          Some kind of one-liner about FetchAI
        </p>
      </div>

      {/* Mission */}
      <div className="section">
        <h2 className="section-title">Some Section</h2>
        <p className="section-text">
          FetchAI, some kind of useful information about the project, how it works and how to use it maybe.
        </p>
      </div>

      {/* Sources */}
      <div className="section">
        <div className="card-grid">
          {[
            {
              title: 'Slack',
              description: 'Something about what kind of information we grab, maybe add a link here.',
            },
            {
              title: 'Gmail',
              description: 'Something about what kind of information we grab, maybe add a link here.',
            },
            {
              title: 'CMU Websites',
              description: 'Something about what kind of information we grab, maybe add a link here.',
            },
          ].map((source, i) => (
            <div key={i} className="card">
              <h3 className="card-title">{source.title}</h3>
              <p className="card-text">{source.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team */}
      <div className="section">
        <h2 className="section-title">Meet the Team</h2>
        <p className="section-text">
          FetchAI is something about the team.
        </p>
        <div className="card-grid" style={{ marginTop: '2rem' }}>
          {[
            { name: 'Person 1', role: 'role' },
            { name: 'Person 2', role: 'role' },
            { name: 'Person 3', role: 'role' },
            { name: 'Person 4', role: 'role' },
            { name: 'Person 5', role: 'in case we get more people' },
            { name: 'Person 6', role: 'role' },
          ].map((member, i) => (
            <div key={i} className="card" style={{ textAlign: 'center' }}>
              <div className="avatar-placeholder"></div>
              <h4 className="card-title" style={{ marginTop: '0.75rem' }}>{member.name}</h4>
              <p className="card-text">{member.role}</p>
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
