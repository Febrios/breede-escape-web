// sanity-testimonial-schema.ts
export default {
    name: 'testimonial',
    title: 'Testimonial',
    type: 'document',
    fields: [
        { name: 'name', title: 'Name', type: 'string', validation: Rule => Rule.required() },
        { name: 'text', title: 'Text', type: 'text', validation: Rule => Rule.required() },
        { name: 'source', title: 'Source', type: 'string' },
        { name: 'stars', title: 'Stars', type: 'number', validation: Rule => Rule.min(1).max(5) },
        { name: 'image', title: 'Image', type: 'image' },
        { name: 'order', title: 'Order', type: 'number' },
    ],
};
