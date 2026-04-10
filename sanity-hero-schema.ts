export default {
    name: 'heroSettings',
    title: 'Hero',
    type: 'document',
    fields: [
        { name: 'content', title: 'Content', type: 'text' },
        {
            name: 'backgroundImage',
            title: 'Background Image',
            type: 'image',
            options: { hotspot: true },
        },
    ],
};
