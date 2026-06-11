# More Historical Leaders Website

Cloudflare Pages project for the More Historical Leaders Civilization VI mod page.

## Cloudflare Pages

Build settings:

- Framework preset: `Vite`
- Build command: `npm run build`
- Build output directory: `dist`

## Comments

The comments API uses a Cloudflare D1 binding named `DB`.

1. Create a D1 database named `more_historical_leaders_comments`.
2. Run `migrations/0001_comments.sql` in the D1 console.
3. In the Pages project, add a D1 binding with variable name `DB`.
4. Redeploy the Pages project.
