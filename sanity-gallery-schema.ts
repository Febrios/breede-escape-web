export default {
    name: 'gallerySettings',
    title: 'Gallery',
    type: 'document',
    fields: [
        { name: 'content', title: 'Content', type: 'text' },
        {
            name: 'images',
            title: 'Images',
            type: 'array',
            of: [{ type: 'image', options: { hotspot: true } }],
        },
    ],
};
