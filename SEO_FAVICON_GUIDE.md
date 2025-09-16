# SEO Favicon Integration Guide

## Overview

The system now supports dynamic favicon and Apple Touch Icon loading from Sanity CMS.

## What was added

### 1. Sanity Schema Updates
- **Favicon field** - for uploading favicon (32x32px recommended)
- **Apple Touch Icon field** - for uploading Apple Touch Icon (180x180px recommended)

### 2. Dynamic Metadata Generation
- **generateMetadata()** function in `layout.tsx` - generates metadata from Sanity
- **Open Graph tags** - for social networks
- **Twitter Card tags** - for Twitter
- **Dynamic icons** - favicon and Apple Touch Icon from Sanity

### 3. Client-side Favicon Updates
- **SEOHead component** - updates favicon dynamically on the client
- **Automatic updates** - when data changes in Sanity

## How to use

### In Sanity Studio:
1. Open the "homepage" page in Sanity Studio
2. Navigate to the "SEO Settings" section
3. Upload favicon (32x32px or 16x16px)
4. Upload Apple Touch Icon (180x180px)
5. Fill in other SEO fields (title, description, keywords, ogImage)

### Automatic fallbacks:
- If favicon is not uploaded in Sanity, static files from `/public/` are used
- If Sanity is unavailable, fallback metadata is used

## Technical details

### Files that were modified:
- `sanity/schemas/objects/seoSettings.ts` - added favicon fields
- `src/lib/sanity.ts` - updated queries and added getImageUrl function
- `src/app/layout.tsx` - added generateMetadata function
- `src/components/HomePageContent.tsx` - added SEOHead component
- `src/components/SEOHead.tsx` - new component for dynamic favicon

### Functions:
- **getImageUrl()** - generates image URLs from Sanity with dimensions
- **generateMetadata()** - generates metadata for Next.js
- **SEOHead** - updates favicon on the client

## Benefits

1. **Centralized management** - all SEO elements in one place (Sanity)
2. **Dynamic updates** - changes in Sanity are automatically reflected
3. **Fallback system** - always has backup options
4. **SEO optimization** - complete set of meta tags for search engines
5. **Social networks** - Open Graph and Twitter Card support

## Recommendations

- Upload favicon in PNG or ICO format
- Use square images for better display
- Optimize file sizes for fast loading
- Test display in different browsers and devices
