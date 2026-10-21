# DIH — NOSC-UA Digital Innovation Hub

Website of the NOSC-UA Digital Innovation Hub. Built with Next.js 15 (Pages Router), React 19, Tailwind CSS v4 and `next-intl`, with Payload CMS 3 on Postgres for news and science posts. Available in Ukrainian (default) and English.

## Getting started

Requirements: Node.js 20+, pnpm, Docker.

```bash
cp .env.example .env      # then fill in PAYLOAD_SECRET (and S3_* if needed)
pnpm install
pnpm db:up                # Postgres on localhost:5434
pnpm dev
```

- Site: [http://localhost:3000](http://localhost:3000). The English version is served under `/en`.
- Admin: [http://localhost:3000/admin](http://localhost:3000/admin). On an empty database, the first account you create becomes the **superadmin**. A fresh database is also seeded with the posts from the original design.

## Scripts

| Command                     | Description                                         |
| --------------------------- | --------------------------------------------------- |
| `pnpm dev`                  | Dev server (Turbopack), port 3000                   |
| `pnpm build`                | Production build                                    |
| `pnpm start`                | Serve the production build, port 3005               |
| `pnpm exec tsc --noEmit`    | Type check                                          |
| `pnpm db:up`                | Start only Postgres from docker-compose             |
| `pnpm generate:types`       | Regenerate `src/payload-types.ts`                   |
| `pnpm generate:importmap`   | Regenerate the admin import map                     |
| `pnpm migrate:create <name>`| Create a DB migration after changing collections    |
| `pnpm docker:up`            | Build and run app + Postgres in Docker (port 3005)  |
| `pnpm docker:down`          | Stop the containers                                 |
| `pnpm docker:logs`          | Follow app logs                                     |

## Project structure

```
src/
  pages/            public site (Pages Router), one folder per route
  app/(payload)/    Payload admin + REST API (generated, App Router)
  cms/              collections, access rules, hooks, seed
  migrations/       Postgres migrations, applied on startup in production
  components/       Navbar, Footer, posts/, icons/
  constants/        post categories (shared by CMS and pages)
  lib/              data access (posts.ts, server only) and helpers
  messages/         translations: uk.json, en.json
  payload.config.ts Payload configuration
public/             images, grouped by page
```

### Adding a page

1. Create `src/pages/<route>/index.tsx`.
2. Export `getStaticProps` (or `getServerSideProps`) that loads `@/messages/${locale}.json` and returns `messages` and `locale`. Copy it from any existing page.
3. Add a namespace with the same keys to both `src/messages/uk.json` and `src/messages/en.json`.
4. If it is a top-level section, add it to the `routes` list in `src/components/NavBar`. If the page has a light background, also add it to `blackRoutes`.

### Adding a post category

Add it to `src/constants/postCategories.ts`, then run `pnpm generate:types` and `pnpm migrate:create add-<category>`. Science categories get their list and post pages automatically at `/science-services/<category>`; add a link to the menu in `src/pages/science-services/index.tsx`.

### Changing CMS collections

After editing anything in `src/cms/collections`:

1. Restart `pnpm dev`. Payload doesn't hot-reload its config.
2. Run `pnpm generate:types`.
3. Run `pnpm migrate:create <name>` and commit the migration. Production applies migrations on startup; dev syncs the schema automatically.

## CMS

- **Posts** have a title, excerpt and content in uk/en, plus a category, optional cover, YouTube link and attachments. Drafts and scheduled publishing are supported. Ukrainian is required; empty English fields fall back to Ukrainian. The publish date is set automatically.
- **Roles**: the `superadmin` manages users; an `admin` manages content and their own account.
- **Uploads** go to S3-compatible storage (Cloudflare R2) when the `S3_*` variables are set, under the `S3_PREFIX` folder. Otherwise they are stored in `./media`.

## Deployment

Every push to `master` triggers `.github/workflows/deploy.yml` (it can also be run by hand from the Actions tab). The workflow builds the Docker image on GitHub's runner and pushes it to GHCR, because the server doesn't have enough RAM to build it. Then it connects to the server over SSH, pulls the image and restarts the stack with `docker compose up -d`. The stack is app on port 3005 (proxied by nginx) plus Postgres. Migrations run automatically when the app starts.

GitHub secrets:

- `SERVER_HOST`, `SERVER_USER`, `SERVER_SSH_KEY`, `PROJECT_PATH`: SSH access.
- `POSTGRES_PASSWORD`, `PAYLOAD_SECRET`, `NEXT_PUBLIC_SERVER_URL`: required. The workflow stops before touching the server if any of them is missing.
- `S3_ENDPOINT`, `S3_BUCKET`, `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY`: R2 storage. Without them, uploads are stored in a docker volume.

The workflow generates `.env` on the server from these secrets on every deploy. Never change `POSTGRES_PASSWORD` or `PAYLOAD_SECRET` after the first deploy: the database volume is initialized with that password, and the secret signs admin sessions. If the build or the image pull fails, the old container keeps running.

## Roadmap

- Site-wide search from the header, covering section names, page content and posts.
- News period navigation and latest news on the landing page.
