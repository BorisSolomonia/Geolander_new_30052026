# CLAUDE.md

## Build & Dev Commands
- `npm run dev` — Start dev server (Turbopack, port 3000)
- `npm run build` — Production build
- `npm run lint` — ESLint
- `npm run db:generate` — Generate Drizzle migrations
- `npm run db:migrate` — Run Drizzle migrations
- `npm run db:push` — Push schema to DB (no migration files)
- `npm run db:seed` — Seed database (`npx tsx drizzle/seed.ts`)
- `npm run db:studio` — Open Drizzle Studio

## Architecture

Next.js 16 App Router with `src/` directory. TypeScript throughout.

**Stack**: Next.js 16.1.6, Drizzle ORM + Neon PostgreSQL (serverless), Auth.js v5 (next-auth@5.0.0-beta.30), next-intl v4.8.2, shadcn/ui, Tailwind CSS v4 (CSS-first config in `src/app/globals.css`).

### Critical: Middleware Location
In Next.js 16 with Turbopack + `src/` directory, the middleware file **must** be `src/proxy.ts` — not `middleware.ts`, not at project root. Import paths are relative to `src/` (e.g., `./i18n/routing`).

### Database-Optional Mode
The app runs without `DATABASE_URL` using static data fallback:
- `src/lib/db-mode.ts` — `hasDatabase` flag + `NoDatabaseError`
- `src/lib/static-data.ts` — All seed data with deterministic UUIDs
- Every action file in `src/lib/actions/` checks `hasDatabase` before DB calls
- No DB: static data for reads, `NoDatabaseError` for writes
- `/login` and `/admin` redirect to `/` when no DB
- `auth.ts` `authorize()` returns null when no DB

### i18n (next-intl)
- Locales: `en` (default), `ka` (Georgian)
- `localePrefix: "as-needed"` — no `/en` prefix for default locale
- Config: `src/i18n/routing.ts`, `src/i18n/request.ts`
- Messages: `messages/en.json`, `messages/ka.json`
- All pages under `src/app/[locale]/`

### Server Actions Pattern
All in `src/lib/actions/` (7 files: cars, bookings, places, music, travel-info, coupons, settings). Pattern:
```typescript
"use server";
// Read: if (!hasDatabase) return staticData; else DB query
// Write: if (!hasDatabase) throw new NoDatabaseError(); else Zod validate → DB insert → revalidatePath
```

### Auth
Credentials provider only. Single admin user. Protected by `auth()` check in admin layout. Session checked via `auth()` from `src/lib/auth.ts`.

## Key Directories
- `src/app/[locale]/` — All pages (public + admin)
- `src/lib/actions/` — Server actions (data access layer)
- `src/lib/` — db.ts, auth.ts, db-mode.ts, static-data.ts, utils.ts
- `src/components/` — Shared React components (shadcn/ui in `ui/`)
- `drizzle/` — Schema (`schema.ts`), migrations, seed script
- `messages/` — i18n JSON files

## Environment Variables
- `DATABASE_URL` — Neon PostgreSQL connection string (optional — app works without it)
- `AUTH_SECRET` — Auth.js secret
- `NEXTAUTH_URL` — Auth.js base URL

## Conventions
- File naming: kebab-case for files, PascalCase for components
- Schema: All tables in single `drizzle/schema.ts` with UUID primary keys
- Images: `public/images/cars/`, `public/images/places/`, etc.
- No test framework configured yet
