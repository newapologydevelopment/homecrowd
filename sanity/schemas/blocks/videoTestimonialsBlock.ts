import { defineType } from 'sanity'

export const videoTestimonialsBlock = defineType({
  name: 'videoTestimonialsBlock',
  title: 'Video Testimonials',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Section Title',
      type: 'string',
    },
    {
      name: 'videos',
      title: 'Testimonial Videos',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'testimonialVideo',
          title: 'Testimonial Video',
          fields: [
            {
              name: 'video',
              title: 'Video',
              type: 'file',
              options: {
                accept: 'video/*',
              },
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'institution',
              title: 'Institution/Company',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'testimonialText',
              title: 'Testimonial Text',
              type: 'text',
              rows: 3,
            },
            {
              name: 'authorName',
              title: 'Author Name',
              type: 'string',
            },
            {
              name: 'authorRole',
              title: 'Author Role',
              type: 'string',
            },
          ],
          preview: {
            select: {
              institution: 'institution',
              authorName: 'authorName',
              video: 'video',
            },
            prepare(selection) {
              return {
                title: selection.institution,
                subtitle: selection.authorName,
                media: selection.video,
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    },
    {
      name: 'autoplay',
      title: 'Enable Autoplay',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'autoplayInterval',
      title: 'Autoplay Interval (milliseconds)',
      type: 'number',
      initialValue: 5000,
      hidden: ({ parent }) => !parent?.autoplay,
    },
  ],
  preview: {
    select: {
      title: 'title',
      videosCount: 'videos.length',
    },
    prepare(selection) {
      return {
        title: 'Video Testimonials',
        subtitle: selection.title || `${selection.videosCount || 0} videos`,
      }
    },
  },
})

