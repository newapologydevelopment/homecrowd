import { NextResponse } from 'next/server'
import { getHomepageData } from '@/lib/sanity'

export async function GET() {
  try {
    console.log('Testing Sanity connection...')
    console.log('Project ID:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID)
    console.log('Dataset:', process.env.NEXT_PUBLIC_SANITY_DATASET)
    console.log('API Token exists:', !!process.env.SANITY_API_TOKEN)
    
    const data = await getHomepageData()
    
    return NextResponse.json({ 
      success: true, 
      data,
      env: {
        projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
        dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
        hasToken: !!process.env.SANITY_API_TOKEN
      }
    })
  } catch (error) {
    console.error('Sanity connection error:', error)
    
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error',
      env: {
        projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
        dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
        hasToken: !!process.env.SANITY_API_TOKEN
      }
    }, { status: 500 })
  }
}
