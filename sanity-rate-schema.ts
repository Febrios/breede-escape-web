// sanity-rate-schema.ts
export default {
    name: 'rate',
    title: 'Rate',
    type: 'document',
    fields: [
        { name: 'camp', title: 'Camp', type: 'reference', to: [{ type: 'camp' }], validation: Rule => Rule.required() },
        { name: 'label', title: 'Label', type: 'string' },
        { name: 'name', title: 'Rate Name', type: 'string', validation: Rule => Rule.required() },
        { name: 'price', title: 'Price', type: 'string', validation: Rule => Rule.required() },
        { name: 'unit', title: 'Unit', type: 'string' },
        { name: 'includes', title: 'Includes', type: 'array', of: [{ type: 'string' }] },
        { name: 'note', title: 'Note', type: 'text' },
        { name: 'order', title: 'Order', type: 'number' },
    ],
};
