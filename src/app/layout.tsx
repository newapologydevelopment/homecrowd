import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'

// Register local Baikal fonts from public/fonts as primary app fonts
const baikal = localFont({
  src: [
    { path: '../../public/fonts/BaikalTrial-Thin.woff2', weight: '100', style: 'normal' },
    { path: '../../public/fonts/BaikalTrial-Light.woff2', weight: '300', style: 'normal' },
    { path: '../../public/fonts/BaikalTrial-Regular.woff2', weight: '400', style: 'normal' },
    { path: '../../public/fonts/BaikalTrial-Medium.woff2', weight: '500', style: 'normal' },
    { path: '../../public/fonts/BaikalTrial-SemiBold.woff2', weight: '600', style: 'normal' },
    { path: '../../public/fonts/BaikalTrial-ExtraBold.woff2', weight: '800', style: 'normal' },
  ],
  display: 'swap',
  variable: '--font-baikal',
})

export const metadata: Metadata = {
  title: 'HomeCrowd - Transform Your Space',
  description: 'Experience premium home transformation services with HomeCrowd',
  keywords: ['home renovation', 'interior design', 'home transformation'],
  openGraph: {
    title: 'HomeCrowd - Transform Your Space',
    description: 'Experience premium home transformation services with HomeCrowd',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${baikal.variable} font-baikal`}>
        {children}
      </body>
    </html>
  )
}

