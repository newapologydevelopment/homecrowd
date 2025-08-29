import { defineType } from 'sanity'

export const slotMachineTextBlock = defineType({
  name: 'slotMachineTextBlock',
  title: 'Slot Machine Text',
  type: 'object',
  fields: [
    {
      name: 'prefix',
      title: 'Prefix Text',
      type: 'string',
      description: 'Text before the rotating words',
    },
    {
      name: 'rotatingTexts',
      title: 'Rotating Texts',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.required().min(2).max(10),
      description: 'Words that will rotate in the slot machine effect',
    },
    {
      name: 'suffix',
      title: 'Suffix Text',
      type: 'string',
      description: 'Text after the rotating words',
    },
    {
      name: 'animationSpeed',
      title: 'Animation Speed (milliseconds)',
      type: 'number',
      initialValue: 2000,
      validation: (Rule) => Rule.min(1000).max(5000),
      description: 'How fast the text rotates (1000 = fast, 5000 = slow)',
    },
  ],
  preview: {
    select: {
      prefix: 'prefix',
      suffix: 'suffix',
      rotatingTexts: 'rotatingTexts',
    },
    prepare(selection) {
      const { prefix, suffix, rotatingTexts } = selection
      const firstRotatingText = rotatingTexts?.[0] || '[rotating text]'
      const previewText = `${prefix || ''} ${firstRotatingText} ${suffix || ''}`.trim()
      
      return {
        title: 'Slot Machine Text',
        subtitle: previewText,
      }
    },
  },
})

