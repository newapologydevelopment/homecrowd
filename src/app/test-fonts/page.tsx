export default function TestFontsPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-center mb-8">Font Loading Test</h1>
        
        {/* Test each font */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Baikal Book</h2>
          <p 
            className="text-3xl text-blue-600"
            style={{ fontFamily: 'var(--font-baikal-light)' }}
          >
            This is Baikal Book font
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Baikal Condensed</h2>
          <p 
            className="text-3xl text-green-600"
            style={{ fontFamily: 'var(--font-baikal-condensed)' }}
          >
            This is Baikal Condensed font
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Baikal Extra Condensed Bold</h2>
          <p 
            className="text-3xl text-red-600"
            style={{ fontFamily: 'var(--font-baikal-extracondensed-bold)' }}
          >
            This is Baikal Extra Condensed Bold font
          </p>
        </div>

        {/* CSS Variables check */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">CSS Variables</h2>
          <div className="text-sm font-mono bg-gray-50 p-4 rounded">
            <div>--font-baikal-light: {typeof window !== 'undefined' ? getComputedStyle(document.documentElement).getPropertyValue('--font-baikal-light') : 'Loading...'}</div>
            <div>--font-baikal-condensed: {typeof window !== 'undefined' ? getComputedStyle(document.documentElement).getPropertyValue('--font-baikal-condensed') : 'Loading...'}</div>
            <div>--font-baikal-extracondensed-bold: {typeof window !== 'undefined' ? getComputedStyle(document.documentElement).getPropertyValue('--font-baikal-extracondensed-bold') : 'Loading...'}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
