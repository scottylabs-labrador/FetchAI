import { useState, useEffect } from 'react';
import ICAL from 'ical.js';

export interface CMUEvent {
  uid: string;
  summary: string;
  description: string;
  location: string;
  start: Date;
  end: Date;
}

interface UseCMUEventsResult {
  events: CMUEvent[];
  loading: boolean;
  error: Error | null;
}

export const useCMUEvents = (): UseCMUEventsResult => {
  const [events, setEvents] = useState<CMUEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const PROXY = "https://api.allorigins.win/raw?url=";
        const TARGET_URL = "https://www.cs.cmu.edu/calendar/export.ics";

        const response = await fetch(`${PROXY}${encodeURIComponent(TARGET_URL)}`);

        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.statusText}`);
        }

        const icsData = await response.text();

        const jcalData = ICAL.parse(icsData);
        const comp = new ICAL.Component(jcalData);
        const vevents = comp.getAllSubcomponents('vevent');

        const formattedEvents: CMUEvent[] = vevents.map((vevent) => {
          const eventObj = new ICAL.Event(vevent);
          return {
            uid: eventObj.uid,
            summary: eventObj.summary,
            description: eventObj.description,
            location: eventObj.location,
            start: eventObj.startDate.toJSDate(),
            end: eventObj.endDate.toJSDate(),
          };
        });

        formattedEvents.sort((a, b) => a.start.getTime() - b.start.getTime());

        setEvents(formattedEvents);
      } catch (err) {
        console.error("Error parsing calendar:", err);
        setError(err instanceof Error ? err : new Error('Unknown error occurred'));
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return { events, loading, error };
};