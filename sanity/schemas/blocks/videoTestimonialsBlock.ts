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
              name: 'muxPlaybackId',
              title: 'Mux Playback ID',
              type: 'string',
              description: 'Mux video playback ID (e.g. cLbG6RpaDcNDue2CiqvyD3K5sCgEL0079WVs3TkJ8gec)',
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
            },
            prepare(selection) {
              return {
                title: selection.institution,
                subtitle: selection.authorName,
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

