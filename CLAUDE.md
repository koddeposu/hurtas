# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

CT Prefabrik is a Next.js 16 full-stack web application for a Turkish prefabricated house manufacturer. It features a public-facing website and a protected admin panel for content/product management.

**Tech Stack:** Next.js 16 (App Router), TypeScript 5, React 19, PostgreSQL with Drizzle ORM, Better Auth, Radix UI + shadcn, Tailwind CSS v4, Jotai, React Hook Form + Zod, Cloudflare R2 for file storage.

## Build & Development Commands

```bash
pnpm dev              # Start dev server (http://localhost:3000)
pnpm build            # Production build
pnpm start            # Run production build
pnpm lint             # Run ESLint
pnpm lint:fix         # Fix linting issues

# Database
npx drizzle-kit generate  # Create migration
npx drizzle-kit migrate   # Apply migrations
npx drizzle-kit studio    # Open Drizzle Studio (DB GUI)
```

## Architecture

### Route Groups
- `(website)` - Public pages with Turkish URLs (kebab-case: `/prefabrik-evler`, `/urun-detay/[slug]`)
- `(admin)` - Protected admin routes; all except `/admin/login` require auth via `requireAuth()`

### Key Directories
- `src/actions/` - Server Actions for data mutations (protected with `requireAuth()`)
- `src/db/schema.ts` - All Drizzle ORM table definitions
- `src/lib/auth.ts` - Better Auth server config
- `src/lib/auth-client.ts` - Better Auth client config
- `src/lib/s3.ts` - Cloudflare R2 upload/delete utilities
- `src/lib/slug.ts` - Unique slug generation with Turkish character handling
- `src/components/ui/` - shadcn UI components

### Database Schema
Tables: `user`, `session`, `account`, `verification` (Better Auth), `category`, `product`, `productImage`, `project`, `blogPost`, `contactSubmission`

Key patterns:
- UUID primary keys (text type)
- `order` column for custom sorting
- `isActive`/`isPublished` flags for soft visibility control
- Auto timestamps with update triggers

### Authentication Pattern
```typescript
import { requireAuth } from "@/lib/requireAuth";

export default async function AdminPage() {
  const session = await requireAuth(); // Redirects to /admin/login if unauthenticated
  // Page content
}
```

### Server Action Pattern
```typescript
"use server";
import { requireAuth } from "@/lib/requireAuth";

export async function actionName(data) {
  await requireAuth();
  // Database mutation with Drizzle
  revalidatePath("/path");
  return result;
}
```

### File Upload Pattern
Files upload to Cloudflare R2 via `src/lib/s3.ts`. Images served from `https://cdn.ctprefabrik.com`.

### Slug Generation
Use `generateUniqueSlug(tableName, title, existingId?)` from `src/lib/slug.ts` for URL-safe, unique slugs with Turkish character support.

## Important Constraints

1. **Website styling is locked** - Don't modify the approved customer design
2. **Admin panel only** - New features go in `/admin`
3. **Authentication** - Email/password only, signup disabled
4. **Language** - Turkish (tr_TR) throughout
5. **Images** - Must use Cloudflare R2, not local storage
