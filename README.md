# HomeCrowd

Modern single-page website built with Next.js 15, React 18, and Sanity CMS.

## 🚀 Quick Start

```bash
npm install
npm run dev
```

## 📱 Sanity Studio

```bash
npm run studio
```

Studio will be available at `http://localhost:3333/studio`

## 🔄 Switching from Mock Data to Sanity

The project is now configured to use real data from Sanity instead of mock data.

### What Changed

1. **`src/app/page.tsx`** - Now a Server Component that fetches data from Sanity
2. **`src/components/HomePageContent.tsx`** - Client Component for handling state
3. **`src/lib/sanity.ts`** - Sanity client and GROQ queries
4. **`sanity.cli.js`** - CLI configuration for deployment

### Setup Steps

1. **Environment Variables** - Create `.env.local`:
   ```bash
   NEXT_PUBLIC_SANITY_PROJECT_ID=mftmflti
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_API_TOKEN=your_api_token_here
   ```

2. **Create Content** - Use Sanity Studio to create a page document with ID `homepage`

3. **Test** - Run `npm run dev` and check if data loads from Sanity

### Available Commands

```bash
npm run dev          # Next.js dev server
npm run studio       # Sanity Studio
npm run sanity -- deploy  # Deploy Studio
npm run seed:sanity  # Seed initial data (requires setup)
```

See `SANITY_INTEGRATION.md` for detailed integration guide.

## 🏗️ Project Structure

```
src/
├── app/                 # Next.js App Router
├── components/          # React components
│   ├── blocks/         # Content block components
│   ├── navigation/     # Navigation components
│   └── ui/            # UI components (shadcn/ui)
├── lib/                # Utilities and configurations
├── types/              # TypeScript type definitions
└── data/               # Mock data (legacy)

sanity/
├── schemas/            # Sanity schema definitions
└── config.ts           # Sanity configuration
```

## 🎨 Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **CMS**: Sanity v3
- **Animations**: Framer Motion, GSAP
- **Smooth Scrolling**: Lenis

## 📚 Documentation

- [Sanity Integration Guide](./SANITY_INTEGRATION.md)
- [Next.js Documentation](https://nextjs.org/docs)
- [Sanity Documentation](https://www.sanity.io/docs)

## 🚀 Deployment

### Sanity Studio
```bash
npm run sanity -- deploy
```

### Next.js App
Deploy to Vercel or your preferred hosting platform.

## 📝 License

This project is private and proprietary.

