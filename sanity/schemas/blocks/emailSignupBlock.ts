import { defineType } from 'sanity'

export const emailSignupBlock = defineType({
  name: 'emailSignupBlock',
  title: 'Email Signup',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
    },
    {
      name: 'placeholder',
      title: 'Input Placeholder',
      type: 'string',
      initialValue: 'Enter your email address',
    },
    {
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
      initialValue: 'Subscribe',
    },
    {
      name: 'successMessage',
      title: 'Success Message',
      type: 'text',
      rows: 2,
      initialValue: 'Thank you for subscribing! We\'ll be in touch soon.',
    },
  ],
  preview: {
    select: {
      title: 'title',
      buttonText: 'buttonText',
    },
    prepare(selection) {
      return {
        title: 'Email Signup',
        subtitle: `"${selection.title}" - Button: "${selection.buttonText}"`,
      }
    },
  },
})

