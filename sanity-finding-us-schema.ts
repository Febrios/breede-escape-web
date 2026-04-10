export default {
    name: 'findingUsSettings',
    title: 'Finding Us',
    type: 'document',
    fields: [
        { name: 'content', title: 'Content', type: 'text' },
        {
            name: 'towns',
            title: 'Towns',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'name', title: 'Name', type: 'string' },
                        { name: 'distance', title: 'Distance', type: 'string' },
                    ],
                },
            ],
        },
        {
            name: 'directions',
            title: 'Directions',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'name', title: 'Name', type: 'string' },
                        { name: 'direction', title: 'Direction', type: 'text' },
                    ],
                },
            ],
        },
    ],
};
