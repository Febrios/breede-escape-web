const siteSettings = {
    name: 'siteSettings',
    title: 'Site Settings',
    type: 'document',
    fields: [
        {
            name: 'contactEmail',
            title: 'Contact Email',
            type: 'string',
            validation: (Rule: any) => Rule.required().email(),
        },
        {
            name: 'phone',
            title: 'Phone',
            type: 'string',
        },
        {
            name: 'address',
            title: 'Address',
            type: 'string',
        },
        {
            name: 'socialLinks',
            title: 'Social Links',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'label', title: 'Label', type: 'string' },
                        { name: 'url', title: 'URL', type: 'url' },
                    ],
                },
            ],
        },
        {
            name: 'aboutText',
            title: 'About Text',
            type: 'text',
        },
        {
            name: 'galleryText',
            title: 'Gallery Text',
            type: 'text',
            description: 'Text or description for the Gallery section',
        },
        {
            name: 'rules',
            title: 'Rules',
            type: 'array',
            of: [{ type: 'string' }],
        },
        {
            name: 'heroContent',
            title: 'Hero Content',
            type: 'text',
            description: 'Main text or tagline for the Hero section',
        },
        {
            name: 'heroBackground',
            title: 'Hero Background Image',
            type: 'image',
            options: { hotspot: true },
            description: 'Background image for the Hero section',
        },
        {
            name: 'aboutImage',
            title: 'About Image',
            type: 'image',
            options: { hotspot: true },
            description: 'Image for the About section',
        },
    ],
};

