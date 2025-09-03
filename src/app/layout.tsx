import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import localFont from 'next/font/local'
import './globals.css'
import { LenisProvider } from '@/components/providers/LenisProvider'

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
  variable: '--font-baikal-book',
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

export const metadata: Metadata = {
  title: 'HomeCrowd',
  description: '',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${baikalBook.variable} ${baikalCondensed.variable} ${baikalExtraCondensedBold.variable} ${baikalLight.variable}`}>
        {children}
      </body>
    </html>
  )
}

