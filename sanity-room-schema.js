// schemas/room.js
export default {
  name: 'room',
  title: 'Room',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required().min(2)
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'price',
      title: 'Price per night (ZAR)',
      type: 'number',
      validation: Rule => Rule.min(1).precision(0)
    },
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{ type: 'image' }],
      options: { layout: 'grid' }
    }
  ]
}
