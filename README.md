# HomeCrowd - Premium Home Transformation Website

A premium single-page website built with Next.js 15, React 18, and Sanity CMS featuring advanced animations and modular content blocks.

## ✨ Features

- **Modern Tech Stack**: Next.js 15 with App Router, React 18, TypeScript
- **Modular CMS**: Sanity v3 with flexible block-based content
- **Premium Animations**: Framer Motion + GSAP for smooth interactions
- **Responsive Design**: Tailwind CSS + shadcn/ui components
- **Video Integration**: Mux video support with adaptive streaming
- **Smooth Scrolling**: Lenis for buttery-smooth scroll experience

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Sanity account (for CMS)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd homecrowd
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp env.example .env.local
```

Fill in your Sanity project details:
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token
```

4. Start the development server:
```bash
npm run dev
```

5. Start Sanity Studio (in separate terminal):
```bash
npm run studio
```

## 📱 Page Sections

### 1. Preloader + Hero
- Logo mask animation with background video/image
- Smooth reveal transition
- Sticky navigation appears after scroll

### 2. Video Testimonials
- Auto-playing carousel with 3-12 videos
- Central focus with dimmed inactive videos
- Fullscreen video player on hover/click
- Institution overlays editable in Sanity

### 3. Animated Cards
- Fade + slide up animations on scroll
- Modular content blocks
- Image/video media support

### 4. Marquee
- Scrolling tagline with logo
- Configurable speed and direction

### 5. Stacked Cards (How it works)
- Cards stack and unstack on scroll
- Active card highlighted with blue accent
- Right-side media updates with active card
- Light and dark theme variants

### 6. Slot Machine Text
- 3D rotating text effect
- Blurred previous/next text for depth
- Configurable rotation speed

### 7. CTA + Email Signup
- Sticky CTA button management
- Email collection with success states
- Background media support

### 8. Animated Footer
- Wave animation on letter hover
- Social media links
- Company information

## 🔧 Technology Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 18** - UI library with RSC support
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Component library

### Animations
- **Framer Motion** - React animations (70% of effects)
- **GSAP + ScrollTrigger** - Complex scroll animations
- **Lenis** - Smooth scrolling

### CMS & Media
- **Sanity v3** - Headless CMS
- **Mux** - Video hosting and streaming
- **Next/Image** - Optimized images

### Carousels
- **Embla Carousel** - Lightweight carousel library

## 📁 Project Structure

```
src/
├── app/                    # Next.js 15 App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/
│   ├── blocks/            # Content blocks
│   │   ├── PreloaderBlock.tsx
│   │   ├── HeroBlock.tsx
│   │   ├── VideoTestimonialsBlock.tsx
│   │   ├── AnimatedCardsBlock.tsx
│   │   ├── MarqueeBlock.tsx
│   │   ├── StackedCardsBlock.tsx
│   │   ├── SlotMachineTextBlock.tsx
│   │   ├── CTABlock.tsx
│   │   ├── EmailSignupBlock.tsx
│   │   └── FooterBlock.tsx
│   ├── navigation/        # Navigation components
│   └── ui/               # shadcn/ui components
├── data/                 # Mock data
├── lib/                  # Utilities
└── types/               # TypeScript definitions

sanity/
├── schemas/
│   ├── blocks/          # Block schemas
│   ├── documents/       # Document schemas
│   └── objects/         # Object schemas
└── sanity.config.ts     # Sanity configuration
```

## 🎨 Design Principles

- **Mobile-first**: Responsive design from the ground up
- **Performance**: Optimized images, lazy loading, efficient animations
- **Accessibility**: Semantic HTML, ARIA labels, keyboard navigation
- **SEO**: Meta tags, structured data, optimized content

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on git push

### Other Platforms

1. Build the project:
```bash
npm run build
```

2. Start production server:
```bash
npm start
```

## 📋 Content Management

Access Sanity Studio at `/studio` to manage:

- **Page Blocks**: Reorder and configure sections
- **Media Assets**: Upload images and videos
- **Content**: Edit text, CTAs, and settings
- **SEO**: Meta descriptions, titles, og:images

## 🔧 Customization

### Adding New Blocks

1. Create component in `src/components/blocks/`
2. Add schema in `sanity/schemas/blocks/`
3. Update types in `src/types/index.ts`
4. Register in `BlockRenderer.tsx`

### Styling

- Tailwind classes for rapid styling
- Custom animations in `globals.css`
- Theme configuration in `tailwind.config.js`

## 🚀 Quick Setup для GitHub

### Крок 1: Клонування та встановлення
```bash
git clone https://github.com/yourusername/homecrowd.git
cd homecrowd
npm install
```

### Крок 2: Налаштування змінних середовища
```bash
cp env.example .env.local
# Відредагуйте .env.local з вашими Sanity даними
```

### Крок 3: Запуск
```bash
npm run dev          # Next.js сайт (http://localhost:3000)
npm run studio       # Sanity CMS (http://localhost:3333)
```

## 🌐 Deployment на Vercel

1. Підключіть GitHub репозиторій до Vercel
2. Додайте змінні середовища в Vercel dashboard:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
   - `SANITY_API_TOKEN`
3. Deploy автоматично при push

## 📞 Support

For technical support or customization requests, please contact the development team.

## 📄 License

All rights reserved. This project is proprietary software.

