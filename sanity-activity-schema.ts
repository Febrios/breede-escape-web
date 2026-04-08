// sanity-activity-schema.ts
export default {
    name: 'activity',
    title: 'Activity',
    type: 'document',
    fields: [
        { name: 'name', title: 'Activity Name', type: 'string', validation: Rule => Rule.required() },
        { name: 'icon', title: 'Icon (emoji)', type: 'string' },
        { name: 'description', title: 'Description', type: 'text' },
        { name: 'order', title: 'Order', type: 'number' },
    ],
};
