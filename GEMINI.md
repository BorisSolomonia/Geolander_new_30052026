# Geolander Web

Geolander Web is a premium car rental and tourism platform designed for the Georgian market. It provides a comprehensive solution for renting vehicles and exploring tourist regions in Georgia, featuring a localized experience and an admin dashboard for fleet management.

## 🚀 Tech Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **Frontend Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/) (Radix UI)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Database**: [PostgreSQL](https://www.postgresql.org/) (via [Neon](https://neon.tech/))
- **ORM**: [Drizzle ORM](https://orm.drizzle.team/)
- **Authentication & Storage**: [Firebase](https://firebase.google.com/) (Auth and Storage)
- **Internationalization**: [next-intl](https://next-intl-docs.vercel.app/) (Locales: `en`, `ka`)
- **Form Management**: [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/) validation

## 📁 Project Structure

- `src/app/[locale]`: Localized application routes.
- `src/components`: UI components organized by domain (`admin`, `fleet`, `home`, `layout`, `places`, `shared`, `ui`).
- `src/lib`: Core application logic, including database configuration, auth, and utility functions.
- `drizzle`: Database schema (`schema.ts`), relations, and seed scripts.
- `messages`: Translation files for English (`en.json`) and Georgian (`ka.json`).
- `scripts`: Custom execution scripts (e.g., `run-next.mjs`).
- `data`: Static/JSON data used for fallbacks or initial state.
- `public`: Static assets including icons, logos, and images.

## 🛠️ Getting Started

### Prerequisites

- Node.js (v20+ recommended)
- PostgreSQL database (Neon recommended)
- Firebase project for Auth and Storage

### Setup

1.  **Clone the repository and install dependencies:**
    ```bash
    npm install
    ```

2.  **Environment Configuration:**
    Copy `.env.example` to `.env` and fill in the required variables, including database credentials and Firebase configuration.

3.  **Run Development Server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:3015` (or the port specified in `APP_PORT`).

### Database Management

- **Push Schema**: `npm run db:push`
- **Generate Migrations**: `npm run db:generate`
- **Seed Database**: `npm run db:seed`
- **Drizzle Studio**: `npm run db:studio`

## ⌨️ Development Conventions

- **Localization**: All user-facing text must be localized using `next-intl`. Use the translation keys defined in `messages/`.
- **Styling**: Adhere to Tailwind CSS 4 utility classes. Prefer CSS variables for theme-consistent colors.
- **Components**: Follow the Shadcn UI pattern. Place reusable UI primitives in `src/components/ui`.
- **Type Safety**: Maintain strict TypeScript typing. Define Zod schemas for all form validations and API responses.
- **Database**: Always update `drizzle/schema.ts` for data model changes and use `npm run db:push` for local development.

## 🧪 Commands

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the dev server with Turbopack on port 3015. |
| `npm run build` | Builds the application for production. |
| `npm run lint` | Runs ESLint for code quality checks. |
| `npm run start` | Starts the production server. |
| `npm run db:seed` | Seeds the database with initial data. |
| `npm run db:push` | Pushes Drizzle schema changes to the database. |
