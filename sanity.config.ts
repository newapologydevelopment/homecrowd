import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemas'

  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'mftmflti'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

console.log('Sanity Config - projectId:', projectId, 'dataset:', dataset)
export default defineConfig({
  name: 'homecrowd',
  title: 'HomeCrowd',
  projectId,
  dataset,
  basePath: '/studio',
  plugins: [
    deskTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // Page document
            S.listItem()
              .title('Homepage')
              .child(
                S.document()
                  .schemaType('page')
                  .documentId('homepage')
              ),
            // Other content types
            S.divider(),
            ...S.documentTypeListItems().filter(
              (listItem) => !['page'].includes(listItem.getId()!)
            ),
          ]),
    }),

    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
})

