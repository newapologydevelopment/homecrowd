/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cdn.sanity.io', 'image.mux.com'],
    formats: ['image/webp', 'image/avif'],
  },
  env: {
    NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
    SANITY_API_TOKEN: process.env.SANITY_API_TOKEN,
  },
}

module.exports = nextConfig

