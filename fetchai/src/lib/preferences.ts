import { supabase } from './supabase'
import { DEFAULT_SOURCES } from './sources'

/**
 * Get the user's preferred event sources from Supabase.
 * Returns default sources if none saved yet.
 */
export async function getPreferences(userId: string): Promise<string[]> {
    const { data, error } = await supabase
        .from('user_preferences')
        .select('sources')
        .eq('user_id', userId)
        .single()

    if (error || !data) {
        return DEFAULT_SOURCES
    }

    return data.sources ?? DEFAULT_SOURCES
}

/**
 * Save the user's preferred event sources to Supabase.
 * Uses upsert so it works for both new and existing preferences.
 */
export async function savePreferences(
    userId: string,
    sources: string[],
): Promise<boolean> {
    const { error } = await supabase.from('user_preferences').upsert(
        {
            user_id: userId,
            sources,
            updated_at: new Date().toISOString(),
        },
        { onConflict: 'user_id' },
    )

    if (error) {
        console.error('Failed to save preferences:', error)
        return false
    }

    return true
}
