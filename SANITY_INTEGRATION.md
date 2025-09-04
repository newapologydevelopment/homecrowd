# Sanity Integration Guide

## Переключення з мокових даних на реальні дані з Sanity

### 1. Структура проекту

Проект тепер використовує:
- **`src/app/page.tsx`** - Server Component, який отримує дані з Sanity
- **`src/components/HomePageContent.tsx`** - Client Component для обробки стану
- **`src/lib/sanity.ts`** - Sanity клієнт та GROQ запити
- **`src/components/ui/SanityMedia.tsx`** - Компонент для рендерингу медіа
- **`src/components/ui/SanityLogo.tsx`** - Компонент для рендерингу логотипу
- **`src/components/ui/SanityVideo.tsx`** - Компонент для рендерингу відео

### 2. Шрифти Baikal

Проект використовує три основні шрифти Baikal:

#### Доступні шрифти
- **`font-baikal-light`** - основний текст, описи, параграфи
- **`font-baikal-condensed`** - заголовки, акценти, верхні написи
- **`font-baikal-extracondensed-bold`** - логотипи, великі заголовки, футер

#### Використання в Tailwind CSS
```tsx
// Основний текст
<p className="font-baikal-light text-lg">
  Transform your living spaces with our expert design team
</p>

// Заголовки
<h2 className="font-baikal-condensed text-2xl">
  Premium Home Services
</h2>

// Логотипи та великі заголовки
<h1 className="font-baikal-extracondensed-bold text-6xl">
  HOMECROWD
</h1>
```

#### CSS Variables
```css
font-family: var(--font-baikal-light);
font-family: var(--font-baikal-condensed);
font-family: var(--font-baikal-extracondensed-bold);
```

#### Демо-сторінка
Перегляньте всі шрифти на `/fonts-demo`

### 3. Налаштування середовища

Створіть `.env.local` файл:
```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=mftmflti
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token_here
```

### 4. Створення головної сторінки з усіма блоками

#### Варіант 1: Автоматичне створення через скрипт
```bash
npm run create:homepage
```

Цей скрипт створить повну головну сторінку з усіма блоками:
- ✅ Preloader з лого та фоном
- ✅ Hero блок з медіа
- ✅ Video testimonials
- ✅ Animated cards
- ✅ Marquee
- ✅ Stacked cards
- ✅ Slot machine text
- ✅ CTA блок
- ✅ Email signup
- ✅ Footer

#### Варіант 2: Ручне створення через Sanity Studio
1. Запустіть Studio: `npm run studio`
2. Перейдіть на `http://localhost:3333/studio`
3. Створіть новий документ типу "Page"
4. Встановіть ID: `homepage`
5. Додайте блоки в потрібному порядку

### 5. Структура блоків

#### Preloader Block
```typescript
{
  _type: 'preloaderBlock',
  _key: 'preloader-1',
  logo: SanityImage,
  backgroundMedia: MediaUnion,
  duration: 3000
}
```

#### Hero Block
```typescript
{
  _type: 'heroBlock',
  _key: 'hero-1',
  backgroundMedia: MediaUnion,
  title: 'Transform Your Home with HomeCrowd',
  subtitle: 'Premium home services delivered with excellence and care'
}
```

#### Video Testimonials Block
```typescript
{
  _type: 'videoTestimonialsBlock',
  _key: 'testimonials-1',
  title: 'What Our Clients Say',
  videos: [
    {
      _key: 'video-1',
      video: SanityVideo,
      institution: 'Luxury Homes Inc.',
      testimonialText: 'HomeCrowd transformed our entire property...',
      authorName: 'Sarah Johnson',
      authorRole: 'Property Manager'
    }
  ],
  autoplay: true,
  autoplayInterval: 5000
}
```

#### Animated Cards Block
```typescript
{
  _type: 'animatedCardsBlock',
  _key: 'cards-1',
  title: 'Our Services',
  cards: [
    {
      _key: 'card-1',
      title: 'Interior Design',
      description: 'Transform your living spaces...',
      media: MediaUnion,
      eyebrowText: 'Design'
    }
  ]
}
```

#### Marquee Block
```typescript
{
  _type: 'marqueeBlock',
  _key: 'marquee-1',
  text: 'Premium Home Services • Expert Craftsmanship • Quality Guaranteed',
  speed: 50,
  direction: 'left'
}
```

#### Stacked Cards Block
```typescript
{
  _type: 'stackedCardsBlock',
  _key: 'stacked-1',
  title: 'How It Works',
  eyebrowText: 'Process',
  variant: 'light',
  cards: [
    {
      _key: 'stacked-1',
      title: 'Consultation',
      description: 'We start with a detailed consultation...',
      media: MediaUnion,
      eyebrowText: 'Step 1'
    }
  ]
}
```

#### Slot Machine Text Block
```typescript
{
  _type: 'slotMachineTextBlock',
  _key: 'slot-1',
  prefix: 'We specialize in',
  suffix: 'for your home',
  rotatingTexts: ['Interior Design', 'Renovation', 'Landscaping'],
  animationSpeed: 2000
}
```

#### CTA Block
```typescript
{
  _type: 'ctaBlock',
  _key: 'cta-1',
  title: 'Ready to Transform Your Home?',
  description: 'Get in touch with our team...',
  buttonText: 'Get Started',
  buttonLink: '/contact',
  backgroundMedia: MediaUnion
}
```

#### Email Signup Block
```typescript
{
  _type: 'emailSignupBlock',
  _key: 'signup-1',
  title: 'Stay Updated',
  description: 'Subscribe to our newsletter...',
  placeholder: 'Enter your email',
  buttonText: 'Subscribe',
  successMessage: 'Thank you for subscribing!'
}
```

#### Footer Block
```typescript
{
  _type: 'footerBlock',
  _key: 'footer-1',
  copyrightText: '© 2024 HomeCrowd. All rights reserved.',
  contactEmail: 'hello@homecrowd.com'
}
```

### 6. Рендеринг медіа

#### Зображення
```tsx
import { SanityMedia } from '@/components/ui/SanityMedia'

<SanityMedia 
  media={block.backgroundMedia} 
  className="w-full h-full object-cover"
  fill
/>
```

#### Логотип
```tsx
import { SanityLogo } from '@/components/ui/SanityLogo'

<SanityLogo 
  logo={pageData.logo} 
  className="h-12 w-auto"
  priority
/>
```

#### Відео
```tsx
import { SanityVideo } from '@/components/ui/SanityVideo'

<SanityVideo 
  video={videoData.video} 
  className="w-full h-full object-cover"
  autoPlay
  muted
  loop
/>
```

### 7. Перевірка роботи

1. **Запустіть dev сервер**: `npm run dev`
2. **Перевірте тестову сторінку**: `http://localhost:3000/test-sanity`
3. **Перевірте основну сторінку**: `http://localhost:3000`
4. **Перевірте шрифти**: `http://localhost:3000/fonts-demo`

### 8. Наступні кроки після створення блоків

1. **Завантажте медіа файли** в Sanity Studio
2. **Замініть asset references** в блоках на реальні
3. **Налаштуйте контент** під ваші потреби
4. **Протестуйте анімації** та інтерактивність

### 9. Корисні команди

```bash
# Запуск Next.js dev сервера
npm run dev

# Запуск Sanity Studio
npm run studio

# Sanity CLI команди
npm run sanity -- deploy
npm run sanity -- build

# Створення головної сторінки
npm run create:homepage

# Seeding даних
npm run seed:sanity
```

### 10. Troubleshooting

#### Блоки не відображаються
- Перевірте, чи правильно створені блоки в Sanity
- Перевірте консоль браузера на помилки
- Перевірте, чи правильно налаштований `BlockRenderer`

#### Медіа не завантажується
- Перевірте, чи завантажені файли в Sanity
- Перевірте, чи правильно налаштовані asset references
- Перевірте, чи правильно налаштований `next.config.js`

#### Помилки TypeScript
- Перевірте, чи правильно імпортовані типи
- Перезапустіть TypeScript сервер
- Перевірте, чи правильно налаштований `tsconfig.json`

#### Шрифти не відображаються
- Перевірте, чи правильно завантажені файли в `public/fonts/`
- Перевірте, чи правильно налаштовані CSS variables
- Перезапустіть dev сервер

### 11. Переваги нової архітектури

- ✅ **Модульність** - блоки можна легко переставляти та редагувати
- ✅ **Типізація** - повна TypeScript підтримка для всіх блоків
- ✅ **Медіа оптимізація** - автоматична оптимізація зображень та відео
- ✅ **Редагування** - контент можна змінювати через Sanity Studio
- ✅ **Масштабованість** - легко додавати нові блоки та сторінки
- ✅ **SEO оптимізація** - Server Components для кращого SEO
- ✅ **Шрифти** - три різні стилі Baikal для різних потреб
