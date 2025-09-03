import { defineType } from 'sanity'

export const valuePropositionBlock = defineType({
  name: 'valuePropositionBlock',
  title: 'Value Proposition',
  type: 'object',
  fields: [
    {
      name: 'title_before_accent',
      title: 'Title (before accent)',
      type: 'string',
    },
    {
      name: 'title_accent_part',
      title: 'Title (accent part)',
      type: 'string',
    },
    {
      name: 'title_after_accent',
      title: 'Title (after accent)',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    },
  ],
  preview: {
    select: {
      before: 'title_before_accent',
      accent: 'title_accent_part',
      after: 'title_after_accent',
    },
    prepare(selection) {
      const before = selection.before || ''
      const accent = selection.accent || ''
      const after = selection.after || ''
      const composed = `${before}${accent ? ` ${accent}` : ''}${after ? ` ${after}` : ''}`.trim() || 'Untitled'
      return {
        title: 'Value Proposition',
        subtitle: composed,
      }
    },
  },
})
