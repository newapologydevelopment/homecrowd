import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!
const apiVersion = '2024-01-01'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  token: process.env.SANITY_API_TOKEN,
})

const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

// GROQ queries for fetching data
export const pageQuery = `
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    seo,
    blocks[] {
      _type,
      _key,
      ...,
      // Handle media unions
      backgroundMedia {
        mediaType,
        image {
          asset,
          alt,
          hotspot,
          crop
        },
        video {
          asset
        }
      },
      media {
        mediaType,
        image {
          asset,
          alt,
          hotspot,
          crop
        },
        video {
          asset
        }
      },
      // Handle video testimonials
      videos[] {
        _key,
        video {
          asset
        },
        institution,
        testimonialText,
        authorName,
        authorRole
      },
      // Handle cards arrays
      cards[] {
        _key,
        title,
        description,
        eyebrowText,
        media {
          mediaType,
          image {
            asset,
            alt,
            hotspot,
            crop
          },
          video {
            asset
          }
        }
      },
      // Handle social links
      socialLinks[] {
        _key,
        platform,
        url
      }
    }
  }
`

export const homepageQuery = `
  *[_type == "page" && _id == "homepage"][0] {
    _id,
    title,
    slug,
    seo {
      title,
      description,
      keywords,
      ogImage {
        asset,
        alt
      }
    },
    blocks[] {
      _type,
      _key,
      ...,
      backgroundMedia {
        mediaType,
        image {
          asset,
          alt,
          hotspot,
          crop
        },
        video {
          asset
        }
      },
      media {
        mediaType,
        image {
          asset,
          alt,
          hotspot,
          crop
        },
        video {
          asset
        }
      },
      videos[] {
        _key,
        video {
          asset
        },
        institution,
        testimonialText,
        authorName,
        authorRole
      },
      cards[] {
        _key,
        title,
        description,
        eyebrowText,
        media {
          mediaType,
          image {
            asset,
            alt,
            hotspot,
            crop
          },
          video {
            asset
          }
        }
      },
      socialLinks[] {
        _key,
        platform,
        url
      },
      logo {
        asset,
        alt
      }
    }
  }
`

