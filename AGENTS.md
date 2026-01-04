# Repository Guidelines

## Project Structure & Module Organization
- `src/app` uses the Next.js App Router; route folders are mostly kebab-case (e.g., `prefabrik-evler`, `urun-detay`).
- `src/components` contains shared UI and page clients (file naming varies; follow the local pattern).
- `src/assets` holds bundled media; `public` stores static files served at the site root.
- `src/lib` and `src/types` are shared utilities and TypeScript types.
- Root configs include `next.config.ts`, `eslint.config.mjs`, `postcss.config.mjs`, and `tsconfig.json`.

## Build, Test, and Development Commands
- `pnpm dev`: start the Next.js dev server at `http://localhost:3000`.
- `pnpm build`: create a production build.
- `pnpm start`: run the production server from `.next`.
- `pnpm lint`: run ESLint with the Next.js config.

## Coding Style & Naming Conventions
- Language: TypeScript with React and Next.js App Router.
- Formatting: follow existing file style; ESLint is the primary style gate.
- Components: React components live in `src/components` and are exported by file; keep names consistent with the surrounding folder.
- Routes: keep App Router folders in kebab-case to match existing routes.
- Styling: Tailwind CSS is configured; global styles live in `src/app/globals.css`.

## Testing Guidelines
- No automated test framework is configured in this repo.
- If you add tests, keep them close to the source (e.g., `src/components/__tests__`) and document the runner in this file.

## Commit & Pull Request Guidelines
- Recent commits are short and descriptive (e.g., `seo 3`, `new`); keep messages concise and task-focused.
- PRs should include a brief summary, key changes, and screenshots for UI updates.
- Link any related issue or ticket when available.

## Configuration Notes
- Environment-specific values should go in `.env.local` (not committed).
- Keep `node_modules` out of version control; use `pnpm install` to restore dependencies.
