import { defineType } from 'sanity'

export const ctaBlock = defineType({
  name: 'ctaBlock',
  title: 'Call to Action',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    },
    {
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'buttonLink',
      title: 'Button Link',
      type: 'url',
      validation: (Rule) => Rule.required(),
      description: 'URL the button should link to (e.g., Calendly link)',
    },
    {
      name: 'backgroundMedia',
      title: 'Background Media',
      type: 'mediaUnion',
      description: 'Optional background image or video',
    },
  ],
  preview: {
    select: {
      title: 'title',
      buttonText: 'buttonText',
    },
    prepare(selection) {
      return {
        title: 'Call to Action',
        subtitle: `"${selection.title}" - Button: "${selection.buttonText}"`,
      }
    },
  },
})

