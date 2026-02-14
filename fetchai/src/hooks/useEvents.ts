import { useState, useEffect, useRef } from 'react'
import { fetchCMUEvents, type CMUEvent } from '../lib/rss'
import { summarizeEvents } from '../lib/ai'

export interface EnrichedEvent extends CMUEvent {
    aiSummary?: string
}

// Simple in-memory cache
let cachedEvents: EnrichedEvent[] | null = null

export function useEvents() {
    const [events, setEvents] = useState<EnrichedEvent[]>(cachedEvents ?? [])
    const [loading, setLoading] = useState(!cachedEvents)
    const [error, setError] = useState<string | null>(null)
    const fetchedRef = useRef(false)

    const load = async () => {
        if (cachedEvents) {
            setEvents(cachedEvents)
            setLoading(false)
            return
        }

        setLoading(true)
        setError(null)

        try {
            // 1. Fetch events from RSS
            const rawEvents = await fetchCMUEvents()

            // Show events immediately while AI processes
            setEvents(rawEvents)
            setLoading(false)

            // 2. Summarize with AI (non-blocking)
            const summaries = await summarizeEvents(rawEvents)

            const enriched = rawEvents.map((e) => ({
                ...e,
                aiSummary: summaries.get(e.title) ?? undefined,
            }))

            cachedEvents = enriched
            setEvents(enriched)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load events')
            setLoading(false)
        }
    }

    useEffect(() => {
        if (!fetchedRef.current) {
            fetchedRef.current = true
            load()
        }
    }, [])

    const retry = () => {
        fetchedRef.current = false
        cachedEvents = null
        load()
    }

    return { events, loading, error, retry }
}
