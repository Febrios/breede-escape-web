// sanity-camp-schema.ts
export default {
    name: 'camp',
    title: 'Camp',
    type: 'document',
    fields: [
        // @ts-ignore
        { name: 'name', title: 'Camp Name', type: 'string', validation: Rule => Rule.required() },
        { name: 'tagline', title: 'Tagline', type: 'string' },
        { name: 'description', title: 'Description', type: 'text' },
        { name: 'features', title: 'Features', type: 'array', of: [{ type: 'string' }] },
        { name: 'image', title: 'Main Image', type: 'image', options: { hotspot: true } },
        { name: 'gallery', title: 'Gallery Images', type: 'array', of: [{ type: 'image' }] },
        { name: 'order', title: 'Order', type: 'number' },
        { name: 'link', title: 'Link', type: 'string' },
        { name: 'googleCalendarId', title: 'Google Calendar ID', type: 'string', description: 'The Google Calendar ID for this camp (e.g. your-camp@gmail.com or calendar-id@group.calendar.google.com)' },
    ],
};
