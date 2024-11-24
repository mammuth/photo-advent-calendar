export interface CalendarData {
    title: string;
    description: string;
    slug: string;
}

export const calendars: CalendarData[] = [
    {
        title: 'Merry Christmas 2024!',
        description: 'Demo advent calendar via https://github.com/mammuth/photo-advent-calendar',
        slug: 'demo'
    },
    {
        title: 'Adventskalender 2024',
        description: 'Von Max für Marion, Stefan, Irmgard, und Manfred.',
        slug: 'muth'
    },
];