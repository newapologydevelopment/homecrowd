import { defineType } from 'sanity'

export const page = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
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
      name: 'seo',
      title: 'SEO Settings',
      type: 'seoSettings',
    },
    {
      name: 'scheduleButton',
      title: 'Schedule Button',
      type: 'scheduleButton',
    },
    {
      name: 'blocks',
      title: 'Page Blocks',
      type: 'array',
      of: [
        { type: 'preloaderBlock' },
        { type: 'heroBlock' },
        { type: 'videoTestimonialsBlock' },
        { type: 'animatedCardsBlock' },
        { type: 'marqueeBlock' },
        { type: 'stackedCardsBlock' },
        { type: 'slotMachineTextBlock' },
        { type: 'ctaBlock' },
        { type: 'emailSignupBlock' },
        { type: 'footerBlock' },
      ],
      validation: (Rule) => Rule.required().min(1),
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
})

