# Geolander Web

## Local Run

1. Copy `.env.example` to `.env`.
2. Set `APP_PORT`, `DATABASE_URL`, and the Firebase client/admin variables in `.env`.
3. Install dependencies:

```bash
npm install
```

4. Start the dev server:

```bash
npm run dev
```

5. Open:

```text
http://localhost:3015
```

If you change `APP_PORT`, update the URL accordingly.

## Firebase

The current migration state is hybrid:

- Firebase Auth handles login and admin sessions
- Firebase Storage handles admin image uploads
- PostgreSQL still backs the main application data and admin CRUD

Set `FIREBASE_PRIVATE_KEY` as a single-line env value with escaped newlines:

```env
FIREBASE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n
```

## Checks

```bash
npm run lint
npm run build
```

## Database

If you configure `DATABASE_URL`, you can seed the database with:

```bash
npm run db:seed
```
"# Geolander_new_30052026" 
