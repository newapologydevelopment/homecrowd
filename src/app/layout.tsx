import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

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
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}

