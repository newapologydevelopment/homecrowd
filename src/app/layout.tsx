import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import localFont from 'next/font/local'
import './globals.css'
import { LenisProvider } from '@/components/providers/LenisProvider'
import { getHomepageData, getImageUrl } from '@/lib/sanity'

const inter = Inter({ subsets: ['latin'] })

// Local Baikal fonts
const baikalBook = localFont({
  src: [
    {
      path: '../../public/fonts/Baikal-Book.woff2',
      weight: '400',
      style: 'normal',
    }
  ],
  variable: '--font-baikal-light',
  display: 'swap',
})

const baikalCondensed = localFont({
  src: [
    {
      path: '../../public/fonts/Baikal-Condensed.woff2',
      weight: '400',
      style: 'normal',
    }
  ],
  variable: '--font-baikal-condensed',
  display: 'swap',
})

const baikalExtraCondensedBold = localFont({
  src: [
    {
      path: '../../public/fonts/Baikal-ExtraCondensedBold.woff2',
      weight: '800',
      style: 'normal',
    }
  ],
  variable: '--font-baikal-extracondensed-bold',
  display: 'swap',
})

const baikalLight = localFont({
  src: [
    {
      path: '../../public/fonts/Baikal-Light.woff2',
      weight: '300',
      style: 'normal',
    }
  ],
  variable: '--font-baikal-light',
  display: 'swap',
})

// Generate metadata dynamically from Sanity
export async function generateMetadata(): Promise<Metadata> {
  try {
    const pageData = await getHomepageData()
    
    if (!pageData?.seo) {
      return {
        title: 'HomeCrowd',
        description: 'HomeCrowd - Your trusted platform for home services and solutions',
        icons: {
          icon: [
            { url: '/favicon.ico', sizes: 'any' },
            { url: '/favicon-96.png', sizes: '96x96', type: 'image/png' },
            { url: '/favicon-192.png', sizes: '192x192', type: 'image/png' },
            { url: '/favicon-512.png', sizes: '512x512', type: 'image/png' },
          ],
          apple: [
            { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
          ],
        },
      }
    }

    const { seo } = pageData
    const faviconUrl = getImageUrl(seo.favicon?.asset, 32, 32)
    const appleTouchIconUrl = getImageUrl(seo.appleTouchIcon?.asset, 180, 180)
    const ogImageUrl = getImageUrl(seo.ogImage?.asset, 1200, 630)

    return {
      title: seo.title || 'HomeCrowd',
      description: seo.description || 'HomeCrowd - Your trusted platform for home services and solutions',
      keywords: seo.keywords?.join(', '),
      icons: {
        icon: [
          ...(faviconUrl ? [{ url: faviconUrl, sizes: '32x32', type: 'image/png' }] : []),
          { url: '/favicon.ico', sizes: 'any' },
          { url: '/favicon-96.png', sizes: '96x96', type: 'image/png' },
          { url: '/favicon-192.png', sizes: '192x192', type: 'image/png' },
          { url: '/favicon-512.png', sizes: '512x512', type: 'image/png' },
        ],
        apple: [
          ...(appleTouchIconUrl ? [{ url: appleTouchIconUrl, sizes: '180x180', type: 'image/png' }] : []),
          { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
        ],
      },
      openGraph: {
        title: seo.title || 'HomeCrowd',
        description: seo.description || 'HomeCrowd',
        images: ogImageUrl ? [{ url: ogImageUrl, width: 1200, height: 630, alt: seo.ogImage?.alt || 'HomeCrowd' }] : [],
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: seo.title || 'HomeCrowd',
        description: seo.description || 'HomeCrowd',
        images: ogImageUrl ? [ogImageUrl] : [],
      },
    }
  } catch (error) {
    console.error('Error generating metadata:', error)
    
    // Fallback metadata
    return {
      title: 'HomeCrowd',
      description: 'HomeCrowd - Your trusted platform for home services and solutions',
      icons: {
        icon: [
          { url: '/favicon.ico', sizes: 'any' },
          { url: '/favicon-96.png', sizes: '96x96', type: 'image/png' },
          { url: '/favicon-192.png', sizes: '192x192', type: 'image/png' },
          { url: '/favicon-512.png', sizes: '512x512', type: 'image/png' },
        ],
        apple: [
          { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
        ],
      },
    }
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="antialiased">
      <body className={`${inter.className} ${baikalBook.variable} ${baikalCondensed.variable} ${baikalExtraCondensedBold.variable} ${baikalLight.variable}`}>
        <LenisProvider />
        {children}
      </body>
    </html>
  )
}

