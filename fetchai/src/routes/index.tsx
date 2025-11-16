import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: HomeComponent,
})

function HomeComponent() {
  return (
    <div className="min-h-screen bg-neutral-100 text-gray-800">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-500 to-blue-600 text-white py-12 text-center shadow-md">
        <h1 className="text-5xl font-bold mb-3">FetchAI Bulletin Board</h1>
        <p className="text-lg opacity-90">
          One-liner information about the bulletin board
        </p>
      </header>

      {/* Bulletin Board */}
      <main className="max-w-7xl mx-auto py-16 px-6">
        <h2 className="text-2xl font-semibold mb-8 text-gray-700">Summary of Info: </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Bulletin Card Example */}
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
            <div
              key={i}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow p-6 border border-gray-200 flex flex-col justify-between"
            >
              <div>
                <span className="text-sm font-semibold text-blue-600 uppercase">
                  {post.tag}
                </span>
                <h3 className="text-xl font-bold mt-2 mb-3">{post.title}</h3>
                <p className="text-gray-600">{post.summary}</p>
              </div>
              <button className="mt-6 text-sm font-medium text-blue-600 hover:text-blue-800 self-start">
                Read more →
              </button>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-gray-500 py-8 text-sm">
        <p>© {new Date().getFullYear()} FetchAI Bulletin Board. All rights reserved.</p>
      </footer>
    </div>
  )
}

