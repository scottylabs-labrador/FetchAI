import { useState, useEffect, useRef } from 'react'
import { useAuth } from './useAuth'
import { getPreferences, savePreferences } from '../lib/preferences'
import { DEFAULT_SOURCES } from '../lib/sources'

export function usePreferences() {
    const { user } = useAuth()
    const [sources, setSources] = useState<string[]>(DEFAULT_SOURCES)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [saved, setSaved] = useState(false)
    const fetchedRef = useRef(false)

    useEffect(() => {
        if (!user || fetchedRef.current) return
        fetchedRef.current = true

        getPreferences(user.id).then((prefs) => {
            setSources(prefs)
            setLoading(false)
        })
    }, [user])

    const toggleSource = async (sourceId: string) => {
        if (!user) return

        const next = sources.includes(sourceId)
            ? sources.filter((s) => s !== sourceId)
            : [...sources, sourceId]

        // Don't allow deselecting all sources
        if (next.length === 0) return

        setSources(next)
        setSaving(true)
        setSaved(false)

        const ok = await savePreferences(user.id, next)
        setSaving(false)
        if (ok) {
            setSaved(true)
            setTimeout(() => setSaved(false), 2000)
        }
    }

    return { sources, loading, saving, saved, toggleSource }
}
