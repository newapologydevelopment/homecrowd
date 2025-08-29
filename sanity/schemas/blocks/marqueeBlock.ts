import { defineType } from 'sanity'

export const marqueeBlock = defineType({
  name: 'marqueeBlock',
  title: 'Marquee Text',
  type: 'object',
  fields: [
    {
      name: 'text',
      title: 'Marquee Text',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Text that will scroll horizontally',
    },
    {
      name: 'logo',
      title: 'Logo/Icon',
      type: 'image',
      description: 'Optional logo to display between text repetitions',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'speed',
      title: 'Animation Speed',
      type: 'number',
      initialValue: 50,
      validation: (Rule) => Rule.min(10).max(200),
      description: 'Speed of the marquee animation (10 = slow, 200 = fast)',
    },
    {
      name: 'direction',
      title: 'Direction',
      type: 'string',
      options: {
        list: [
          { title: 'Left to Right', value: 'left' },
          { title: 'Right to Left', value: 'right' },
        ],
        layout: 'radio',
      },
      initialValue: 'left',
    },
  ],
  preview: {
    select: {
      text: 'text',
      direction: 'direction',
    },
    prepare(selection) {
      return {
        title: 'Marquee Text',
        subtitle: `"${selection.text}" (${selection.direction})`,
      }
    },
  },
})

