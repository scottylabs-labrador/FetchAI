export interface Source {
    id: string
    name: string
    shortName: string
    proxyPath: string
    type: 'rss' | 'html'
    url: string
}

export const SOURCES: Source[] = [
    {
        id: 'scs',
        name: 'School of Computer Science',
        shortName: 'SCS',
        proxyPath: '/api/cmu-scs-rss',
        type: 'rss',
        url: 'https://www.cs.cmu.edu/calendar/',
    },
    {
        id: 'ece',
        name: 'Electrical & Computer Engineering',
        shortName: 'ECE',
        proxyPath: '/api/cmu-ece',
        type: 'html',
        url: 'https://www.ece.cmu.edu/news-and-events',
    },
    {
        id: 'tepper',
        name: 'Tepper School of Business',
        shortName: 'Tepper',
        proxyPath: '/api/cmu-tepper',
        type: 'html',
        url: 'https://events.cmu.edu/tepper',
    },
    {
        id: 'heinz',
        name: 'Heinz College',
        shortName: 'Heinz',
        proxyPath: '/api/cmu-heinz',
        type: 'html',
        url: 'https://www.heinz.cmu.edu/events',
    },
    {
        id: 'mcs',
        name: 'Mellon College of Science',
        shortName: 'MCS',
        proxyPath: '/api/cmu-mcs',
        type: 'html',
        url: 'https://www.cmu.edu/mcs/news-events/',
    },
    {
        id: 'cfa',
        name: 'College of Fine Arts',
        shortName: 'CFA',
        proxyPath: '/api/cmu-cfa',
        type: 'html',
        url: 'https://art.cmu.edu/events/',
    },
]

export const SOURCE_MAP = new Map(SOURCES.map((s) => [s.id, s]))

export const DEFAULT_SOURCES = ['scs']
