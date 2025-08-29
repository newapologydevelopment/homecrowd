import { defineType } from 'sanity'

export const footerBlock = defineType({
  name: 'footerBlock',
  title: 'Footer',
  type: 'object',
  fields: [
    {
      name: 'companyName',
      title: 'Company Name',
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
    },
    {
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'socialLink',
          title: 'Social Link',
          fields: [
            {
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: [
                  { title: 'Instagram', value: 'instagram' },
                  { title: 'LinkedIn', value: 'linkedin' },
                  { title: 'Twitter', value: 'twitter' },
                  { title: 'Facebook', value: 'facebook' },
                  { title: 'YouTube', value: 'youtube' },
                ],
              },
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              platform: 'platform',
              url: 'url',
            },
            prepare(selection) {
              return {
                title: selection.platform,
                subtitle: selection.url,
              }
            },
          },
        },
      ],
    },
    {
      name: 'copyrightText',
      title: 'Copyright Text',
      type: 'string',
      description: 'Copyright notice (year will be automatically added)',
    },
  ],
  preview: {
    select: {
      companyName: 'companyName',
      socialLinksCount: 'socialLinks.length',
    },
    prepare(selection) {
      return {
        title: 'Footer',
        subtitle: `${selection.companyName} (${selection.socialLinksCount || 0} social links)`,
      }
    },
  },
})

