const galleryImage = {
    name: 'galleryImage',
    title: 'Gallery Image',
    type: 'document',
    fields: [
        {
            name: 'image',
            title: 'Image',
            type: 'image',
            options: { hotspot: true },
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'alt',
            title: 'Alt Text',
            type: 'string',
            validation: (Rule: any) => Rule.required().min(3),
        },
        {
            name: 'caption',
            title: 'Caption',
            type: 'string',
        },
        {
            name: 'category',
            title: 'Category',
            type: 'string',
            options: {
                list: [
                    { title: 'Rooms', value: 'rooms' },
                    { title: 'Nature', value: 'nature' },
                    { title: 'Activities', value: 'activities' },
                ],
            },
        },
    ],
};

