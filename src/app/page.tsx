import { Suspense } from 'react'
import { getHomepageData } from '@/lib/sanity'
import { HomePageContent } from '@/components/HomePageContent'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

export default async function HomePage() {
  const pageData = await getHomepageData()

  console.log('pageData', pageData)
  if (!pageData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Page</h1>
          <p className="text-gray-600">Failed to load page data from Sanity</p>
        </div>
      </div>
    )
  }

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <HomePageContent pageData={pageData} />
    </Suspense>
  )
}

