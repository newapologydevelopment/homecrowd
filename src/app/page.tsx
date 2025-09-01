import { Suspense } from 'react'
import { getHomepageData } from '@/lib/sanity'
import { HomePageContent } from '@/components/HomePageContent'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

export default async function HomePage() {
  try {
    console.log('Starting to fetch homepage data...')
    console.log('Environment variables:', {
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
      hasToken: !!process.env.SANITY_API_TOKEN
    })
    
    const pageData = await getHomepageData()
    
    console.log('pageData received:', pageData)
    
    if (!pageData) {
      console.error('No page data received from Sanity')
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">No Page Data</h1>
            <p className="text-gray-600 mb-4">No homepage data found in Sanity</p>
            <p className="text-sm text-gray-500">Check if homepage document exists with ID &ldquo;homepage&rdquo;</p>
          </div>
        </div>
      )
    }

    return (
      <Suspense fallback={<LoadingSpinner />}>
        <HomePageContent pageData={pageData} />
      </Suspense>
    )
  } catch (error) {
    console.error('Error in HomePage:', error)
    
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Page</h1>
          <p className="text-gray-600 mb-4">Failed to load page data from Sanity</p>
          <p className="text-sm text-gray-500 mb-4">
            Error: {error instanceof Error ? error.message : 'Unknown error'}
          </p>
          <div className="text-xs text-gray-400">
            <p>Project ID: {process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'Not set'}</p>
            <p>Dataset: {process.env.NEXT_PUBLIC_SANITY_DATASET || 'Not set'}</p>
            <p>API Token: {process.env.SANITY_API_TOKEN ? 'Set' : 'Not set'}</p>
          </div>
        </div>
      </div>
    )
  }
}

