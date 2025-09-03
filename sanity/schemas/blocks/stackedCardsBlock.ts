import { defineType } from 'sanity'

export const stackedCardsBlock = defineType({
  name: 'stackedCardsBlock',
  title: 'Stacked Cards',
  type: 'object',
  fields: [
    {
      name: 'cards',
      title: 'Cards',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'stackedCard',
          title: 'Stacked Card',
          fields: [
            {
              name: 'variant',
              title: 'Visual Variant',
              type: 'string',
              options: {
                list: [
                  { title: 'Light Theme', value: 'light' },
                  { title: 'Dark Theme', value: 'dark' },
                ],
                layout: 'radio',
              },
              initialValue: 'light',
            },
            {
              name: 'eyebrowText',
              title: 'Eyebrow Text',
              type: 'string',
              description: 'Small text above the title (e.g., "Step 01")',
            },
            {
              name: 'title',
              title: 'Card Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 4,
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'image',
              title: 'Image',
              type: 'image',
              options: { hotspot: true },
              fields: [
                {
                  name: 'alt',
                  title: 'Alt Text',
                  type: 'string',
                },
              ],
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: 'title',
              eyebrowText: 'eyebrowText',
              media: 'image',
            },
            prepare(selection) {
              return {
                title: selection.title,
                subtitle: selection.eyebrowText,
                media: selection.media,
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(2).max(5),
    },
  ],
  preview: {
    select: {
      title: 'title',
      cardsCount: 'cards.length',
    },
    prepare(selection) {
      return {
        title: 'Stacked Cards',
        subtitle: `${selection.title || ''} (${selection.cardsCount || 0} cards)`,
      }
    },
  },
})

