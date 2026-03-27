# CLAUDE.md

## Project Overview

Japanese corporate website for a home renovation (リフォーム) company. Single-page application with a React frontend and minimal Express backend for static file serving. Deployed on Vercel.

**Production URL**: https://sanei-reform.vercel.app/

## Tech Stack

- **Frontend**: React 19, TypeScript (strict mode), Vite 7
- **Styling**: Tailwind CSS v4, CSS variables (oklch color space), shadcn/ui components (Radix UI)
- **Routing**: wouter v3 (patched — see `patches/`)
- **Forms**: react-hook-form + zod validation, Formspree for submission
- **Animations**: Framer Motion, Embla Carousel
- **Backend**: Express.js (serves static files, SPA fallback)
- **Package Manager**: pnpm (v10.4.1)

## Commands

```bash
pnpm dev          # Dev server (port 3000)
pnpm build        # Build client (Vite) + server (esbuild)
pnpm start        # Production server (NODE_ENV=production)
pnpm check        # TypeScript type checking (tsc --noEmit)
pnpm format       # Prettier formatting
```

## Project Structure

```
client/
  src/
    components/
      sections/     # 14 page sections (Header, Hero, Services, Cases, Contact, etc.)
      ui/           # ~50 shadcn/ui components (button, card, dialog, etc.)
      Map.tsx       # Google Maps integration
    pages/          # Home.tsx (main landing), NotFound.tsx
    hooks/          # useComposition, useFadeIn, useMobile, usePersistFn
    contexts/       # ThemeContext (light/dark mode)
    lib/
      utils.ts      # cn() utility (clsx + tailwind-merge)
      images.ts     # Image URL constants (CDN + local)
    index.css       # Tailwind imports + CSS custom properties
    App.tsx         # Router wrapper
    main.tsx        # Entry point
  public/           # Static assets (images, sitemap.xml, robots.txt)
server/
  index.ts          # Express static server + SPA fallback
shared/
  const.ts          # Shared constants (cookies)
```

## Code Conventions

### TypeScript
- Strict mode enabled (`strict: true`, `noUnusedLocals`, `noUnusedParameters`)
- No ESLint — rely on TypeScript strict checks
- Run `pnpm check` to verify type correctness

### Formatting (Prettier)
- Double quotes, semicolons, trailing commas (es5)
- 2-space indentation, 80 char print width
- Arrow parens: avoid when possible
- Run `pnpm format` before committing

### Styling
- Utility-first Tailwind CSS — no CSS modules
- Use `cn()` from `lib/utils.ts` for conditional class merging
- CVA (class-variance-authority) for component variants
- Design tokens defined as CSS variables in `client/src/index.css`
- Key colors: `--primary` (navy), `--cta-green` (action buttons), `--text-main`
- Fonts: Noto Sans JP (body), Noto Serif JP (headings)

### Components
- shadcn/ui pattern: components in `ui/` are primitives, page sections in `sections/`
- Each section component is self-contained with its own data and layout
- Animations use `useFadeIn` hook (Intersection Observer) for scroll reveals
- Japanese IME input handled via `useComposition` hook

### State Management
- Minimal: React Context (theme only) + local useState
- No global state library — each component manages its own state
- Form state via react-hook-form

### Routing
- SPA with wouter: `/` → Home, everything else → 404
- Server returns `index.html` for all routes (SPA fallback)

## Environment Variables

Frontend (VITE_ prefix, accessed via `import.meta.env`):
- `VITE_FRONTEND_FORGE_API_KEY` — Map API key
- `VITE_FRONTEND_FORGE_API_URL` — Map API URL
- `VITE_ANALYTICS_ENDPOINT` — Umami analytics endpoint
- `VITE_ANALYTICS_WEBSITE_ID` — Analytics website ID

Server:
- `NODE_ENV` — production/development
- `PORT` — Server port (default 3000)

## Testing

No test framework is currently configured. TypeScript type checking (`pnpm check`) is the primary automated quality gate.

## Build & Deployment

- Client builds to `dist/public/` via Vite
- Server bundles to `dist/index.js` via esbuild
- Deployed on Vercel
- SEO: schema.org structured data in `client/index.html`, sitemap.xml, robots.txt

## Important Notes

- All user-facing content is in **Japanese**
- The wouter router has a **custom patch** (`patches/wouter@3.7.1.patch`) — don't update without checking compatibility
- Images use a mix of CDN URLs (`manuscdn.com`) and local files in `client/public/images/`
- Contact form submits to Formspree (ID: `mpqypvlk`)
- Manus debug plugin exists in `vite.config.ts` — this is development tooling, not production code
