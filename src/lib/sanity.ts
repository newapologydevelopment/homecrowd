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

export function getImageUrl(source: SanityImageSource, width?: number, height?: number) {
  if (!source) return null
  
  let imageBuilder = builder.image(source)
  
  if (width) {
    imageBuilder = imageBuilder.width(width)
  }
  
  if (height) {
    imageBuilder = imageBuilder.height(height)
  }
  
  return imageBuilder.url()
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
          asset->{ url }
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
          asset->{ url }
        }
      },
      // Handle video testimonials
      videos[] {
        _key,
        muxPlaybackId,
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
        variant,
        image {
          asset,
          alt,
          hotspot,
          crop
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
      },
      favicon {
        asset,
        alt
      },
      appleTouchIcon {
        asset,
        alt
      }
    },
    scheduleButton {
      title,
      link
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
          asset->{ url }
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
          asset->{ url }
        }
      },
      videos[] {
        _key,
        muxPlaybackId,
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
        variant,
        image {
          asset,
          alt,
          hotspot,
          crop
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

export async function getHomepageData() {
  try {
    const data = await client.fetch(homepageQuery)
    return data
  } catch (error) {
    console.error('Error fetching homepage data:', error)
    return null
  }
}

export async function getPageData(slug: string) {
  try {
    const data = await client.fetch(pageQuery, { slug })
    return data
  } catch (error) {
    console.error('Error fetching page data:', error)
    return null
  }
}

