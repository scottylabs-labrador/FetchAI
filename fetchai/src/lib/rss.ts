export interface CMUEvent {
    title: string
    description: string
    link: string
    startDate: string | null
    endDate: string | null
    location: string
    eventType: string
    speaker: string
    source: string
    aiSummary?: string
}

/**
 * Strip HTML tags and decode entities from a string.
 */
function stripHtml(html: string): string {
    const doc = new DOMParser().parseFromString(html, 'text/html')
    return doc.body.textContent?.trim() ?? ''
}

/**
 * Get text from an XML element by tag name, or return a fallback.
 */
function getTagText(item: Element, tag: string, fallback = ''): string {
    return item.getElementsByTagName(tag)[0]?.textContent?.trim() ?? fallback
}

/**
 * Extract custom Trumba fields from an RSS item.
 */
function getCustomField(item: Element, fieldName: string): string {
    const fields = item.getElementsByTagName('x-trumba:customfield')
    for (let i = 0; i < fields.length; i++) {
        if (fields[i].getAttribute('name') === fieldName) {
            return fields[i].textContent?.trim() ?? ''
        }
    }
    return ''
}

/**
 * Fetch and parse the CMU SCS calendar RSS feed.
 * Uses the Vite dev proxy at /api/cmu-scs-rss.
 */
export async function fetchCMUEvents(): Promise<CMUEvent[]> {
    const res = await fetch('/api/cmu-scs-rss')
    if (!res.ok) {
        throw new Error(`Failed to fetch RSS feed: ${res.status}`)
    }

    const xml = await res.text()
    const doc = new DOMParser().parseFromString(xml, 'application/xml')
    const items = doc.querySelectorAll('item')
    const events: CMUEvent[] = []

    items.forEach((item) => {
        const rawDesc = getTagText(item, 'description')
        const description = stripHtml(rawDesc)

        events.push({
            title: getTagText(item, 'title'),
            description,
            link: getTagText(item, 'link'),
            startDate: getTagText(item, 'xCal:dtstart') || null,
            endDate: getTagText(item, 'xCal:dtend') || null,
            location: getTagText(item, 'xCal:location'),
            eventType: getCustomField(item, 'Event Type') || 'Event',
            speaker: getCustomField(item, "Speaker's Name"),
            source: 'scs',
        })
    })

    return events
}
