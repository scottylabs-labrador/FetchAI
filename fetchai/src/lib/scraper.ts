import type { CMUEvent } from './rss'

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions'
const MODEL = 'meta-llama/llama-3.1-8b-instruct:free'

/**
 * Strip HTML tags from a string, keeping text content.
 */
function stripHtml(html: string): string {
    const doc = new DOMParser().parseFromString(html, 'text/html')
    return doc.body.textContent?.trim() ?? ''
}

/**
 * Truncate text to a max character length for the AI prompt.
 */
function truncate(text: string, max: number): string {
    if (text.length <= max) return text
    return text.slice(0, max) + '...'
}

/**
 * Fetch HTML from a Vite proxy endpoint and extract events using AI.
 */
export async function scrapeHTMLEvents(
    proxyPath: string,
    sourceId: string,
    sourceName: string,
): Promise<CMUEvent[]> {
    const apiKey = import.meta.env.VITE_OPENROUTER_KEY
    if (!apiKey) {
        console.warn('No VITE_OPENROUTER_KEY — skipping HTML scraping for', sourceId)
        return []
    }

    // 1. Fetch the HTML
    let html: string
    try {
        const res = await fetch(proxyPath)
        if (!res.ok) {
            console.warn(`Failed to fetch ${proxyPath}: ${res.status}`)
            return []
        }
        html = await res.text()
    } catch (err) {
        console.warn(`Network error fetching ${proxyPath}:`, err)
        return []
    }

    // 2. Strip HTML to plain text and truncate for the prompt
    const plainText = truncate(stripHtml(html), 6000)

    // 3. Ask AI to extract structured event data
    const prompt = `You are extracting event information from the ${sourceName} department page at Carnegie Mellon University.

Here is the page text:
---
${plainText}
---

Extract ALL events or news items you can find. For each, provide:
- title: the event/article title
- description: a 1-2 sentence description
- date: the date string if found, or null
- link: the URL if found, or ""

Return ONLY a JSON array like:
[{"title":"...","description":"...","date":"...","link":"..."}]

If no events are found, return an empty array [].`

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
                temperature: 0.2,
                max_tokens: 3000,
            }),
        })

        if (!res.ok) {
            console.error(`OpenRouter error for ${sourceId}:`, res.status)
            return []
        }

        const data = await res.json()
        const content: string = data.choices?.[0]?.message?.content ?? '[]'

        // Extract JSON array from response
        const jsonMatch = content.match(/\[[\s\S]*\]/)
        if (!jsonMatch) return []

        const parsed = JSON.parse(jsonMatch[0]) as Array<{
            title: string
            description: string
            date: string | null
            link: string
        }>

        return parsed.map((item) => ({
            title: item.title || 'Untitled Event',
            description: item.description || '',
            link: item.link || '',
            startDate: item.date || null,
            endDate: null,
            location: '',
            eventType: sourceName,
            speaker: '',
            source: sourceId,
        }))
    } catch (err) {
        console.error(`AI extraction failed for ${sourceId}:`, err)
        return []
    }
}
