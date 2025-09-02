import { defineField, defineType } from 'sanity'

export const scheduleButton = defineType({
  name: 'scheduleButton',
  title: 'Schedule Button',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required().min(1),
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'url',
      validation: Rule => Rule.required().uri({ allowRelative: true, scheme: ['http','https','mailto','tel','/', ''] }),
    }),
  ],
  preview: {
    select: { title: 'title', link: 'link' },
    prepare({ title, link }) {
      return { title: title || 'Schedule Button', subtitle: link }
    },
  },
})


