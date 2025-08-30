import { defineType } from 'sanity'

export const footerBlock = defineType({
  name: 'footerBlock',
  title: 'Footer',
  type: 'object',
  fields: [
    {
      name: 'copyrightText',
      title: 'Copyright Text',
      type: 'string',
      description: 'Copyright notice displayed in top left corner',
      placeholder: '©2025 HOMECROWD. ALL RIGHTS RESERVED',
      validation: (Rule) => Rule.max(100).warning('Keep copyright text concise'),
    },
    {
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
      description: 'Email address displayed in top right corner',
      placeholder: 'INFO@HOMECROWD.ONLINE',
      validation: (Rule) => Rule.email().required(),
    },
  ],
  preview: {
    select: {
      copyrightText: 'copyrightText',
      contactEmail: 'contactEmail',
    },
    prepare(selection) {
      return {
        title: 'Footer',
        subtitle: selection.contactEmail || 'No contact email set',
      }
    },
  },
})

