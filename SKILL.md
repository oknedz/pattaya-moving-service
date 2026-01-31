---
name: Next.js Bilingual Landing Page
description: A skill for building premium, bilingual (English/Thai) landing pages using Next.js 14+ (App Router), Tailwind CSS, and next-intl.
---

# Next.js Bilingual Landing Page Development

This skill outlines the architecture and components required to build a high-performance, bilingual landing page, specifically tailored for service businesses (e.g., Moving Services) in Thailand.

## Core Architecture

### 1. Technology Stack
- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS
- **Internationalization**: `next-intl`
- **Icons**: `lucide-react`
- **Animations**: `framer-motion`
- **Fonts**: `next/font/google` (Outfit, Inter, etc.)

### 2. Project Structure
```
src/
├── app/
│   ├── [locale]/           # Localized routes
│   │   ├── layout.tsx      # Root layout with i18n provider
│   │   └── page.tsx        # Main landing page
│   └── globals.css         # Global styles & Tailwind
├── components/             # Reusable UI components
├── context/                # React Contexts (e.g., QuoteContext)
├── i18n/                   # i18n configuration
│   ├── request.ts          # Request handler
│   └── routing.ts          # Routing configuration
├── messages/               # Translation files
│   ├── en.json
│   └── th.json
└── middleware.ts           # Language detection middleware
```

## Implementation Steps

### Step 1: Initialization along with i18n
1. Initialize Next.js with Tailwind, TypeScript, and ESLint.
2. Install dependencies: `npm install next-intl framer-motion lucide-react`.
3. Configure `next.config.ts` with `createNextIntlPlugin`.
4. Create translation files in `src/messages/*.json`.
5. Set up `src/i18n/routing.ts` and `src/i18n/request.ts`.
6. Create `src/middleware.ts` to handle language detection.

### Step 2: Component Development
Build components using a mobile-first approach:

- **Navbar**: Responsive, sticky, with language switcher.
- **Hero**: High-impact visual with primary CTA.
- **Services**: Grid layout highlighting key offerings.
- **QuoteModal**: specialized form for lead generation (replaces generic maps).
- **MobileStickyBar**: Bottom-fixed bar for mobile users (Call, Quote, Line).

### Step 3: Localization Pattern
Use `useTranslations` hook for client components:
```tsx
const t = useTranslations('Namespace');
<h1>{t('key')}</h1>
```
Use `getMessages` and `unstable_setRequestLocale` (if needed) for server components.

## Best Practices
- **Performance**: Use `next/font` and `next/image`.
- **UX**: Ensure seamless language switching without page reload (handled by `next-intl`).
- **Mobile**: Hide desktop elements on mobile using `hidden md:flex` and vice-versa.
- **State Management**: Use Context API for global UI states like Modals.
