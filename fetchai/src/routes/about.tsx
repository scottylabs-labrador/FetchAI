import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: AboutComponent,
})

function AboutComponent() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <section className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-4">About FetchAI</h1>
          <p className="text-lg text-gray-100 max-w-2xl mx-auto">
            Some kind of one-liner about FetchAI
          </p>
        </div>
      </section>

      <section className="py-16 px-6 max-w-5xl mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-6">Some Section</h2>
        <p className="text-lg text-gray-700 leading-relaxed text-center max-w-3xl mx-auto">
          FetchAI, some kind of useful information about the project, how it works and how to use it maybe.
        </p>
      </section>

      {/* Maybe a section about the websites or apps we support webscraping from */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6 rounded-2xl shadow-lg">
            <h3 className="text-xl font-bold mb-3">Slack</h3>
            <p className="text-gray-600">
              Something about what kind of information we grab, maybe add a link here.
            </p>
          </div>
          <div className="p-6 rounded-2xl shadow-lg">
            <h3 className="text-xl font-bold mb-3">Gmail</h3>
            <p className="text-gray-600">
              Something about what kind of information we grab, maybe add a link here.
            </p>
          </div>
          <div className="p-6 rounded-2xl shadow-lg">
            <h3 className="text-xl font-bold mb-3">CMU Websites</h3>
            <p className="text-gray-600">
              Something about what kind of information we grab, maybe add a link here.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold mb-6">Meet the Team</h2>
          <p className="text-gray-700 max-w-3xl mx-auto mb-10">
            FetchAI is something about the team.
          </p>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
            {[
              { name: 'Person 1', role: 'role' },
              { name: 'Person 2', role: 'role' },
              { name: 'Person 3', role: 'role' },
              { name: 'Person 4', role: 'role' },
              { name: 'Person 5', role: 'in case we get more people' },
              { name: 'Person 6', role: 'role' },
            ].map((member, i) => (
              <div
                key={i}
                className="p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="w-24 h-24 mx-auto bg-gray-300 rounded-full mb-4"></div>
                <h4 className="font-semibold text-lg">{member.name}</h4>
                <p className="text-sm text-gray-500">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-6 text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} FetchAI. All rights reserved.
        </p>
      </footer>
    </div>
  )
}
