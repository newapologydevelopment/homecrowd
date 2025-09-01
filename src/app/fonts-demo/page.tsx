export default function FontsDemoPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto space-y-12">
        <h1 className="text-4xl font-bold text-center mb-12">Baikal Fonts Demo</h1>
        
        {/* Baikal Book */}
        <section className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Baikal Book</h2>
          <div className="space-y-4">
            <p 
              className="text-6xl text-blue-600"
              style={{ fontFamily: 'var(--font-baikal-book)' }}
            >
              HOMECROWD
            </p>
            <p 
              className="text-2xl text-gray-700"
              style={{ fontFamily: 'var(--font-baikal-book)' }}
            >
              Premium Home Services
            </p>
            <p 
              className="text-lg text-gray-600"
              style={{ fontFamily: 'var(--font-baikal-book)' }}
            >
              Transform your living spaces with our expert design team
            </p>
          </div>
        </section>

        {/* Baikal Condensed */}
        <section className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Baikal Condensed</h2>
          <div className="space-y-4">
            <p 
              className="text-6xl text-green-600"
              style={{ fontFamily: 'var(--font-baikal-condensed)' }}
            >
              HOMECROWD
            </p>
            <p 
              className="text-2xl text-gray-700"
              style={{ fontFamily: 'var(--font-baikal-condensed)' }}
            >
              Premium Home Services
            </p>
            <p 
              className="text-lg text-gray-600"
              style={{ fontFamily: 'var(--font-baikal-condensed)' }}
            >
              Transform your living spaces with our expert design team
            </p>
          </div>
        </section>

        {/* Baikal Extra Condensed Bold */}
        <section className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Baikal Extra Condensed Bold</h2>
          <div className="space-y-4">
            <p 
              className="text-6xl text-red-600"
              style={{ fontFamily: 'var(--font-baikal-extracondensed-bold)' }}
            >
              HOMECROWD
            </p>
            <p 
              className="text-2xl text-gray-700"
              style={{ fontFamily: 'var(--font-baikal-extracondensed-bold)' }}
            >
              Premium Home Services
            </p>
            <p 
              className="text-lg text-gray-600"
              style={{ fontFamily: 'var(--font-baikal-extracondensed-bold)' }}
            >
              Transform your living spaces with our expert design team
            </p>
          </div>
        </section>

        {/* Usage Examples */}
        <section className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Tailwind CSS Usage</h2>
          <div className="space-y-4 text-sm">
            <div className="bg-gray-50 p-4 rounded">
              <code className="text-blue-600">font-baikal-book</code> - для основного тексту
            </div>
            <div className="bg-gray-50 p-4 rounded">
              <code className="text-green-600">font-baikal-condensed</code> - для заголовків та акценту
            </div>
            <div className="bg-gray-50 p-4 rounded">
              <code className="text-red-600">font-baikal-extracondensed-bold</code> - для логотипів та великих заголовків
            </div>
          </div>
        </section>

        {/* CSS Variables */}
        <section className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">CSS Variables</h2>
          <div className="space-y-2 text-sm font-mono bg-gray-50 p-4 rounded">
            <div>--font-baikal-book</div>
            <div>--font-baikal-condensed</div>
            <div>--font-baikal-extracondensed-bold</div>
          </div>
        </section>
      </div>
    </div>
  )
}
