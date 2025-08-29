import { defineType } from 'sanity'

export const animatedCardsBlock = defineType({
  name: 'animatedCardsBlock',
  title: 'Animated Cards',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Section Title',
      type: 'string',
    },
    {
      name: 'cards',
      title: 'Cards',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'animatedCard',
          title: 'Card',
          fields: [
            {
              name: 'eyebrowText',
              title: 'Eyebrow Text',
              type: 'string',
              description: 'Small text above the title',
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
              rows: 3,
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
      validation: (Rule) => Rule.required().min(1).max(6),
    },
  ],
  preview: {
    select: {
      title: 'title',
      cardsCount: 'cards.length',
    },
    prepare(selection) {
      return {
        title: 'Animated Cards',
        subtitle: selection.title || `${selection.cardsCount || 0} cards`,
      }
    },
  },
})

