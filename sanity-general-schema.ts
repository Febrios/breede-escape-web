export default {
    name: 'generalSettings',
    title: 'General',
    type: 'document',
    fields: [
        { name: 'phone', title: 'Phone', type: 'string' },
        { name: 'email', title: 'Email', type: 'string' },
        {
            name: 'socials',
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
            name: 'rules',
            title: 'Rules',
            type: 'array',
            of: [{ type: 'string' }],
        },
        {
            name: 'activities',
            title: 'Activities',
            type: 'array',
            of: [{
                name: 'activity',
                title: 'Activity',
                type: 'document',
                fields: [
                    { name: 'name', title: 'Activity Name', type: 'string' },
                    { name: 'icon', title: 'Icon (emoji)', type: 'string' },
                    { name: 'description', title: 'Description', type: 'text' },
                ],
            }],
        }
    ],
};
