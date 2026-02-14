import type { CMUEvent } from './rss'

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions'
const MODEL = 'meta-llama/llama-3.1-8b-instruct:free'

/**
 * Summarize a batch of events using OpenRouter LLM.
 * Returns a map of event title → 1-2 sentence summary.
 */
export async function summarizeEvents(
    events: CMUEvent[],
): Promise<Map<string, string>> {
    const apiKey = import.meta.env.VITE_OPENROUTER_KEY
    if (!apiKey) {
        console.warn('No VITE_OPENROUTER_KEY set — skipping AI summarization')
        return new Map()
    }

    // Build a numbered list of events for the prompt
    const eventList = events
        .slice(0, 20) // Limit to 20 to keep prompt small
        .map((e, i) => `${i + 1}. "${e.title}": ${e.description.slice(0, 300)}`)
        .join('\n')

    const prompt = `You are a helpful assistant for CMU students. Summarize each of the following campus events in exactly 1-2 concise sentences. Focus on what the event IS, when it happens, and why a student might attend. Return ONLY a JSON object mapping each event number to its summary, like {"1": "summary", "2": "summary"}.

Events:
${eventList}`

    try {
        const res = await fetch(OPENROUTER_API_URL, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': window.location.origin,
                'X-Title': 'FetchAI Bulletin Board',
            },
            body: JSON.stringify({
                model: MODEL,
                messages: [{ role: 'user', content: prompt }],
                temperature: 0.3,
                max_tokens: 2000,
            }),
        })

        if (!res.ok) {
            console.error('OpenRouter API error:', res.status)
            return new Map()
        }

        const data = await res.json()
        const content: string = data.choices?.[0]?.message?.content ?? '{}'

        // Extract JSON from response (may be wrapped in markdown code block)
        const jsonMatch = content.match(/\{[\s\S]*\}/)
        if (!jsonMatch) return new Map()

        const parsed = JSON.parse(jsonMatch[0]) as Record<string, string>
        const summaryMap = new Map<string, string>()

        events.slice(0, 20).forEach((e, i) => {
            const summary = parsed[String(i + 1)]
            if (summary) {
                summaryMap.set(e.title, summary)
            }
        })

        return summaryMap
    } catch (err) {
        console.error('AI summarization failed:', err)
        return new Map()
    }
}
