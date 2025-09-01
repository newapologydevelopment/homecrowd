import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'mftmflti',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

async function seedSanity() {
  try {
    console.log('🌱 Starting Sanity seeding...')

    // Create homepage document
    const homepageDoc = await client.create({
      _type: 'page',
      _id: 'homepage',
      title: 'Homepage',
      slug: {
        current: 'home'
      },
      blocks: [
        {
          _type: 'preloaderBlock',
          _key: 'preloader-1',
          logo: {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: 'image-123' // This will need to be replaced with actual asset reference
            },
            alt: 'HomeCrowd Logo'
          },
          backgroundMedia: {
            mediaType: 'image',
            image: {
              _type: 'image',
              asset: {
                _type: 'reference',
                _ref: 'image-456' // This will need to be replaced with actual asset reference
              },
              alt: 'Background Image'
            }
          },
          duration: 3000
        },
        {
          _type: 'heroBlock',
          _key: 'hero-1',
          backgroundMedia: {
            mediaType: 'image',
            image: {
              _type: 'image',
              asset: {
                _type: 'reference',
                _ref: 'image-789' // This will need to be replaced with actual asset reference
              },
              alt: 'Hero Background'
            }
          },
          title: 'Welcome to HomeCrowd',
          subtitle: 'Your trusted partner in home services'
        },
        {
          _type: 'footerBlock',
          _key: 'footer-1',
          copyrightText: '© 2024 HomeCrowd. All rights reserved.',
          contactEmail: 'hello@homecrowd.com'
        }
      ]
    })

    console.log('✅ Homepage created:', homepageDoc._id)
    console.log('🎉 Seeding completed successfully!')

  } catch (error) {
    console.error('❌ Error seeding Sanity:', error)
  }
}

seedSanity()
