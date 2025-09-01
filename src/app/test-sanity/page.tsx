import { getHomepageData } from '@/lib/sanity'

export default async function TestSanityPage() {
  const data = await getHomepageData()
  
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6">Sanity Connection Test</h1>
      
      {data ? (
        <div className="space-y-4">
          <div className="p-4 bg-green-100 border border-green-300 rounded">
            <h2 className="text-xl font-semibold text-green-800">✅ Connected to Sanity!</h2>
            <p className="text-green-700">Project ID: {process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}</p>
            <p className="text-green-700">Dataset: {process.env.NEXT_PUBLIC_SANITY_DATASET}</p>
          </div>
          
          <div className="p-4 bg-blue-100 border border-blue-300 rounded">
            <h3 className="text-lg font-semibold text-blue-800">Page Data:</h3>
            <pre className="text-sm text-blue-700 overflow-auto">
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        </div>
      ) : (
        <div className="p-4 bg-red-100 border border-red-300 rounded">
          <h2 className="text-xl font-semibold text-red-800">❌ Failed to connect to Sanity</h2>
          <p className="text-red-700">Check your environment variables and Sanity configuration</p>
          <div className="mt-2 text-sm text-red-600">
            <p>NEXT_PUBLIC_SANITY_PROJECT_ID: {process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'Not set'}</p>
            <p>NEXT_PUBLIC_SANITY_DATASET: {process.env.NEXT_PUBLIC_SANITY_DATASET || 'Not set'}</p>
            <p>SANITY_API_TOKEN: {process.env.SANITY_API_TOKEN ? 'Set' : 'Not set'}</p>
          </div>
        </div>
      )}
      
      <div className="mt-8 p-4 bg-gray-100 border border-gray-300 rounded">
        <h3 className="text-lg font-semibold mb-2">Next Steps:</h3>
        <ol className="list-decimal list-inside space-y-1 text-sm">
          <li>Create a page document in Sanity Studio with ID &ldquo;homepage&rdquo;</li>
          <li>Add some content blocks to the page</li>
          <li>Check the main page at <code className="bg-gray-200 px-1 rounded">/</code></li>
        </ol>
      </div>
    </div>
  )
}
