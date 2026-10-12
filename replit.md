# Biolaunchpad

A public website explaining Biolaunchpad's partnership with healthcare professionals to turn clinical ideas into healthtech products.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

_Populate as you build — short repo map plus pointers to the source-of-truth file for DB schema, API contracts, theme files, etc._

## Architecture decisions

_Populate as you build — non-obvious choices a reader couldn't infer from the code (3-5 bullets)._

## Product

_Describe the high-level user-facing capabilities of this app once they exist._

- Matter of Medtech is an initiative by Ninad Saraf focused on medtech's evolution from an Indian perspective, with discussions, insights and collaborations. Feature it as a collaboration, distinct from Biolaunchpad's product-development work, not as an established news outlet.
- Keep the Matter of Medtech collaboration last on the landing page, immediately above the footer. The user explicitly rejected placing it in the middle because it looks odd there.

## User preferences

- Do not use em dashes in website content.
- Rewrite content for simple, clear understanding, not merely a visual refresh.
- Always spell the brand name "Biolaunchpad", with a lowercase l, everywhere going forward.
- The user loves the forest-green and ivory redesign: preserve that direction when extending the site.
- Keep the approved definition: "Biolaunchpad partners with healthcare professionals to turn first-hand problems into products that improve patient care."
- The landing screen must show the hero headline, "Let's build it", the approved definition and the green blob together without scrolling on desktop and mobile. Supporting explanation belongs below.
- Explain the partnership through medtech hardware costs, development complexity and regulatory challenges, not comparisons with agencies. Clinical practice is an advantage for evidence and adoption; innovators need not leave their whole practice.
- Explicitly include technicians, healthcare helpers, and anyone working directly with patients. Their first-hand understanding of real problems matters alongside clinical qualifications.
- Use the supplied Biolaunchpad logo. LSI USA Summit, Redesign Health, and Terrarium are design and content inspiration only; do not copy them directly.
- The existing live website must remain untouched while the replacement is developed here.

## Gotchas

_Populate as you build — sharp edges, "always run X before Y" rules._

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
