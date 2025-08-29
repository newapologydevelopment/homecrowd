import { defineType } from 'sanity'

export const mediaUnion = defineType({
  name: 'mediaUnion',
  title: 'Media (Image or Video)',
  type: 'object',
  fields: [
    {
      name: 'mediaType',
      title: 'Media Type',
      type: 'string',
      options: {
        list: [
          { title: 'Image', value: 'image' },
          { title: 'Video', value: 'video' },
        ],
        layout: 'radio',
      },
      initialValue: 'image',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Important for accessibility and SEO',
        },
      ],
      hidden: ({ parent }) => parent?.mediaType !== 'image',
    },
    {
      name: 'video',
      title: 'Video',
      type: 'file',
      options: {
        accept: 'video/*',
      },
      fields: [
        {
          name: 'title',
          title: 'Video Title',
          type: 'string',
        },
      ],
      hidden: ({ parent }) => parent?.mediaType !== 'video',
    },
  ],
  preview: {
    select: {
      mediaType: 'mediaType',
      image: 'image',
      video: 'video',
    },
    prepare(selection) {
      const { mediaType, image, video } = selection
      return {
        title: mediaType === 'image' ? 'Image' : 'Video',
        media: mediaType === 'image' ? image : video,
      }
    },
  },
})

