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
        {
            name: 'badges',
            title: 'Badges',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        {
                            name: 'icon',
                            title: 'Icon',
                            type: 'image',
                            options: { hotspot: true },
                        },
                        {
                            name: 'url',
                            title: 'URL',
                            type: 'url',
                        },
                        {
                            name: 'title',
                            title: 'Title',
                            type: 'string',
                        },
                    ],
                },
            ],
            description: 'List of badges to display in the hero section. Each badge must have an icon, and can optionally have a URL and title.',
        },
    ],
};
