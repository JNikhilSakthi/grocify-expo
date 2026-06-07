<h1 align="center">🛒 Full-Stack Grocery List Mobile App  🛒</h1>

![Demo App](/assets/images/screenshot-for-readme.png)

✨ **Highlights:**

- 📱 Fully Functional Mobile App built with React Native & Expo
- 🧑‍💻 Beginner-Friendly
- 📱 Cross-Platform Support (iOS & Android)
- 🔐 Authentication with Clerk (Google, Apple & GitHub login)
- 🧾 List Screen to manage grocery items
- ✅ Mark Items as Purchased with check functionality
- 🔢 Update Item Quantities
- 🗑️ Delete Items
- 📝 Planner Screen to add new grocery items
- 📊 Insights Screen with profile information and analytics
- 🚪 Secure Logout Flow
- 🧹 Clear Completed Items with a single button
- 💬 User Feedback Button to collect feature suggestions and bug reports
- 🎨 Liquid Glass iOS Tab Effect using Expo Native Tabs
- 🗄️ PostgreSQL Database for persistent data storage
- 🧩 Drizzle ORM for type-safe database queries
- ☁️ Cloud Database Hosting with Neon
- 🎨 Styling with NativeWind (TailwindCSS for React Native)
- ⚡ Global State Management with Zustand
- 🚀 Modern Full-Stack Mobile Architecture
- 🆓 100% Free Setup — No credit card required
- 📂 Full Source Code Provided

---

# ✅ Prerequisites

- **[Bun](https://bun.sh)** (package manager & runtime)
- **Docker** (for the local Postgres database — no cloud account needed)
- **Xcode** (for `expo run:ios`) or **Android Studio + Android SDK** (for `expo run:android`)
- A free **[Clerk](https://dashboard.clerk.com)** application → gives you `EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY`
- *(Optional)* A free **[Sentry](https://sentry.io)** project → gives you `EXPO_PUBLIC_SENTRY_DSN`

# 🧪 `.env` Setup

Create a `.env` file in the **root of the project** (you can copy `.env.example`) and add the following variables:

```bash
# Postgres connection string (required) — local Docker DB on port 5435
DATABASE_URL=postgresql://postgres:postgres@localhost:5435/grocify

# Clerk publishable key (required)
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key

# Sentry error tracking (optional — leave blank to disable)
EXPO_PUBLIC_SENTRY_DSN=your_sentry_dsn
SENTRY_AUTH_TOKEN=your_sentry_auth_token
```

> ⚠️ The app throws on startup if `DATABASE_URL` or `EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY` are missing.

# 🗄️ Database Setup (local Docker Postgres)

The app talks to a standard Postgres database via Drizzle ORM. A `docker-compose.yml`
is included that runs Postgres on **host port 5435** (so it won't clash with any
Postgres you already run on 5432). Start it, create the schema, and seed sample data:

```bash
bun run db:start       # start Postgres in Docker (docker compose up -d)
bun run db:push        # create the grocery_items table from src/lib/server/db/schema.ts
bun run seed:grocery   # insert 10 sample grocery items
```

Stop the database any time with `bun run db:stop`. Data persists in a named Docker volume.

> Prefer the cloud? Drop a [Neon](https://neon.tech) connection string into `DATABASE_URL`
> instead — the `pg` driver works with both.

## 🔧 Run the App

```bash
bun install
bun run db:start && bun run db:push && bun run seed:grocery   # one-time DB setup

bunx expo run:ios       # build & run on iOS  (requires Xcode)
# or
bunx expo run:android   # build & run on Android (requires Android Studio)
```
