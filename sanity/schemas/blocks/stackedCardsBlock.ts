import { defineType } from 'sanity'

export const stackedCardsBlock = defineType({
  name: 'stackedCardsBlock',
  title: 'Stacked Cards',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Section Title',
      type: 'string',
    },
    {
      name: 'eyebrowText',
      title: 'Eyebrow Text',
      type: 'string',
      description: 'Small text above the title',
    },
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
              name: 'media',
              title: 'Media',
              type: 'mediaUnion',
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: 'title',
              eyebrowText: 'eyebrowText',
              media: 'media.image',
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
      variant: 'variant',
      cardsCount: 'cards.length',
    },
    prepare(selection) {
      return {
        title: 'Stacked Cards',
        subtitle: `${selection.title || ''} (${selection.variant}, ${selection.cardsCount || 0} cards)`,
      }
    },
  },
})

