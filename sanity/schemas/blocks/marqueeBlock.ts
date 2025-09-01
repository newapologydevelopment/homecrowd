import { defineType } from 'sanity'

export const marqueeBlock = defineType({
  name: 'marqueeBlock',
  title: 'Marquee Block',
  type: 'object',
  fields: [
    {
      name: 'text',
      title: 'Marquee Text',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
      ],
    },
    {
      name: 'color',
      title: 'Text Color',
      type: 'string',
      description: 'Hex color code (e.g., #00C8FF)',
      initialValue: '#00C8FF',
      validation: (Rule) => Rule.regex(/^#[0-9A-F]{6}$/i).error('Please enter a valid hex color code'),
    },
    {
      name: 'speed',
      title: 'Animation Speed',
      type: 'number',
      description: 'Animation speed (1-100, higher = faster)',
      initialValue: 50,
      validation: (Rule) => Rule.min(1).max(500),
    },
    {
      name: 'direction',
      title: 'Direction',
      type: 'string',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Right', value: 'right' },
        ],
      },
      initialValue: 'left',
    },
  ],
  preview: {
    select: {
      title: 'text',
      logo: 'logo',
      color: 'color',
      direction: 'direction',
    },
    prepare({ title, logo, color, direction }) {
      return {
        title: title || 'Marquee Block',
        subtitle: `${direction || 'left'} direction${color ? ` • ${color}` : ''}`,
        media: logo,
      }
    },
  },
})

