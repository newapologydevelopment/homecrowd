import { MetadataRoute } from 'next'
import { client } from '@/lib/sanity'

export async function GET(): Promise<Response> {
  try {
    // Fetch all pages from Sanity
    const pages = await client.fetch(`
      *[_type == "page"] {
        _id,
        slug,
        _updatedAt
      }
    `)

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://homecrowd.com'
    
    // Generate sitemap entries
    const sitemapEntries: MetadataRoute.Sitemap = [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 1,
      },
      // Add dynamic pages from Sanity
      ...pages.map((page: any) => ({
        url: `${baseUrl}/${page.slug?.current || ''}`,
        lastModified: page._updatedAt ? new Date(page._updatedAt) : new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      }))
    ]

    // Generate XML sitemap
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries.map(entry => `  <url>
    <loc>${entry.url}</loc>
    <lastmod>${entry.lastModified instanceof Date ? entry.lastModified.toISOString() : new Date(entry.lastModified || '').toISOString()}</lastmod>
    <changefreq>${entry.changeFrequency}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`).join('\n')}
</urlset>`

    return new Response(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    })
  } catch (error) {
    console.error('Error generating sitemap:', error)
    
    // Fallback sitemap with just homepage
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://homecrowd.com'
    const fallbackSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1</priority>
  </url>
</urlset>`

    return new Response(fallbackSitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=300, s-maxage=300',
      },
    })
  }
}
