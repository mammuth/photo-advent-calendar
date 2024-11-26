export interface CalendarData {
    title: string;
    description: string;
    slug: string;
    shuffleDoors: boolean;
}

export const calendars: CalendarData[] = [
    {
        title: 'Merry Christmas 2024!',
        description: 'Demo advent calendar via https://github.com/mammuth/photo-advent-calendar',
        slug: 'demo',
        shuffleDoors: true,
    },
];