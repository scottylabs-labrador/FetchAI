import { useState, useEffect, useRef, useCallback } from 'react'
import { fetchCMUEvents, type CMUEvent } from '../lib/rss'
import { summarizeEvents } from '../lib/ai'
import { scrapeHTMLEvents } from '../lib/scraper'
import { SOURCE_MAP } from '../lib/sources'

// Simple in-memory cache keyed by sorted source IDs
const cache = new Map<string, CMUEvent[]>()

function cacheKey(sources: string[]): string {
    return [...sources].sort().join(',')
}

export function useEvents(selectedSources: string[]) {
    const key = cacheKey(selectedSources)
    const [events, setEvents] = useState<CMUEvent[]>(cache.get(key) ?? [])
    const [loading, setLoading] = useState(!cache.has(key))
    const [error, setError] = useState<string | null>(null)
    const fetchedKeyRef = useRef<string | null>(null)

    const load = useCallback(async () => {
        if (cache.has(key)) {
            setEvents(cache.get(key)!)
            setLoading(false)
            return
        }

        setLoading(true)
        setError(null)

        try {
            // Fetch from all selected sources in parallel
            const promises = selectedSources.map(async (sourceId) => {
                const source = SOURCE_MAP.get(sourceId)
                if (!source) return []

                if (source.type === 'rss') {
                    return fetchCMUEvents()
                } else {
                    return scrapeHTMLEvents(source.proxyPath, source.id, source.shortName)
                }
            })

            const results = await Promise.allSettled(promises)
            const allEvents: CMUEvent[] = []

            results.forEach((result) => {
                if (result.status === 'fulfilled') {
                    allEvents.push(...result.value)
                }
            })

            // Show events immediately
            setEvents(allEvents)
            setLoading(false)

            // AI summarize in background (only for events without aiSummary)
            const unsummarized = allEvents.filter((e) => !e.aiSummary)
            if (unsummarized.length > 0) {
                const summaries = await summarizeEvents(unsummarized)
                const enriched = allEvents.map((e) => ({
                    ...e,
                    aiSummary: e.aiSummary || summaries.get(e.title) || undefined,
                }))
                cache.set(key, enriched)
                setEvents(enriched)
            } else {
                cache.set(key, allEvents)
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load events')
            setLoading(false)
        }
    }, [key, selectedSources])

    useEffect(() => {
        if (fetchedKeyRef.current !== key) {
            fetchedKeyRef.current = key
            load()
        }
    }, [key, load])

    const retry = () => {
        cache.delete(key)
        fetchedKeyRef.current = null
        load()
    }

    return { events, loading, error, retry }
}
