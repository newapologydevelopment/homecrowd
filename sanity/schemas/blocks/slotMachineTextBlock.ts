import { defineType } from 'sanity'

export const slotMachineTextBlock = defineType({
  name: 'slotMachineTextBlock',
  title: 'Slot Machine',
  type: 'object',
  fields: [
    {
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'slotItem',
          title: 'Item',
          fields: [
            { name: 'number', title: 'Number', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'text', title: 'Text', type: 'string', validation: (Rule) => Rule.required() },
          ],
          preview: {
            select: { number: 'number', text: 'text' },
            prepare({ number, text }) {
              return { title: `${number} ${text}` }
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1).max(10),
      description: 'Each item has a number and text',
    },
  ],
  preview: {
    select: { items: 'items' },
    prepare({ items }) {
      const first = items?.[0]
      const subtitle = first ? `${first.number} ${first.text}` : 'No items'
      return { title: 'Slot Machine', subtitle }
    },
  },
})

