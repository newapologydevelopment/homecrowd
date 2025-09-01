import { defineType } from 'sanity'

export const preloaderBlock = defineType({
  name: 'preloaderBlock',
  title: 'Preloader',
  type: 'object',
  fields: [
    {
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'preloader_title',
      title: 'Preloader Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'preloader_subtitle',
      title: 'Preloader Subtitle',
      type: 'text',
      rows: 2,
    },
    {
      name: 'backgroundMedia',
      title: 'Background Media',
      type: 'mediaUnion',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'duration',
      title: 'Duration (milliseconds)',
      type: 'number',
      initialValue: 3000,
      validation: (Rule) => Rule.min(1000).max(10000),
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'Preloader',
        subtitle: 'Loading animation with logo reveal',
      }
    },
  },
})

