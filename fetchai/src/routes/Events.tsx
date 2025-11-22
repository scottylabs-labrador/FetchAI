// src/routes/Events.tsx
import React from 'react';
import { useCMUEvents } from '../hooks/useCMUEvents';

const Events: React.FC = () => {
  const { events, loading, error } = useCMUEvents();

  if (loading) return <div className="p-4">Loading CMU Events...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error.message}</div>;

  return (
    <div className="events-container" style={{ padding: '20px' }}>
      <h1 className="text-2xl font-bold mb-4">CMU CS Events</h1>
      
      <div className="grid gap-4">
        {events.map((event) => (
          <div 
            key={event.uid} 
            className="event-card"
            style={{ 
              border: '1px solid #ccc', 
              padding: '16px', 
              borderRadius: '8px',
              marginBottom: '12px'
            }}
          >
            <h3 className="text-xl font-semibold text-blue-700">{event.summary}</h3>
            
            <div className="text-sm text-gray-600 mt-2">
              <p>
                <strong>📅 Date:</strong> {event.start.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
              <p>
                <strong>⏰ Time:</strong> {event.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {event.end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
              <p>
                <strong>📍 Location:</strong> {event.location}
              </p>
            </div>

            {event.description && (
              <div className="mt-3 text-gray-800 text-sm">
                 <details>
                    <summary className="cursor-pointer font-medium">Description</summary>
                    <p className="mt-1 whitespace-pre-wrap">{event.description}</p>
                 </details>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;