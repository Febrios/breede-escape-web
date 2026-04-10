export default {
    name: 'storySettings',
    title: 'Story',
    type: 'document',
    fields: [
        { name: 'content', title: 'Content', type: 'text' },
        {
            name: 'image',
            title: 'Image',
            type: 'image',
            options: { hotspot: true },
        },
    ],
};
