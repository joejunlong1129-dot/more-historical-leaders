# More Historical Leaders Website

Cloudflare Pages project for the More Historical Leaders Civilization VI mod page.

## Cloudflare Pages

Build settings:

- Framework preset: `Vite`
- Build command: `npm run build`
- Build output directory: `dist`

## Comments

The comments form is backed by the Pages Function at `/api/comments` and a Cloudflare D1 binding named `DB`.

1. Create a D1 database named `more_historical_leaders_comments`.
2. Run the migration in Cloudflare:

   ```sh
   npx wrangler d1 execute more_historical_leaders_comments --remote --file=./migrations/0001_comments.sql
   ```

3. In the Pages project, open **Settings > Functions > D1 database bindings**.
4. Add a binding with variable name `DB` and select `more_historical_leaders_comments`.
5. Redeploy the Pages project.

If deploying by Wrangler instead of the Pages dashboard, fill the `database_id` in `wrangler.toml` first.
