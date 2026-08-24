# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository structure

This is a monorepo-like layout with two independent pnpm projects:

- **root (`/`)** — the publishable component library `@pk-design/react-tailwind` (source in `src/`, built with Rollup, tested with Jest).
- **`my-ui-pages/`** — a Vite + React Router documentation/demo site that consumes the library via `"@pk-design/react-tailwind": "file:.."`. It has its own `package.json`, lint config, and pnpm lockfile.

Always run commands from the correct directory: library commands from repo root, docs-site commands from `my-ui-pages/`.

## Common commands

### Library (root)

```bash
pnpm run build          # rollup -c && tsc --emitDeclarationOnly -> dist/
pnpm run test           # jest --watch
pnpm run test:ci        # jest --runInBand --ci (single run, used in CI and pre-push hook)
pnpm run lint           # prettier --check .
pnpm run format         # prettier --write .
```

Run a single test file: `pnpm exec jest src/components/Button/Button.test.tsx`
Run tests matching a name: `pnpm exec jest -t "renders as a custom element"`

### Docs site (`my-ui-pages/`)

```bash
cd my-ui-pages
pnpm run dev            # vite dev server (does NOT regenerate docs data — see below)
pnpm run build          # generate-data, then tsc -b && vite build
pnpm run lint           # eslint .
pnpm run generate-data  # build-docs + build-search (see below)
pnpm run build-docs     # regenerates src/data/components/**/*.json from library source via react-docgen-typescript
pnpm run build-search   # regenerates public/search-index.json
```

`build-docs` and `build-search` read component source directly from `../src/components`. `src/data/components/**/*.json` and `public/search-index.json` are gitignored, purely-generated output (never hand-edited, never committed) — `pnpm run build` regenerates them automatically first, so CI and the GitHub Pages deploy (`.github/workflows/deploy.yml`) always publish fresh data with no manual step. `pnpm run dev` does _not_ regenerate them (to keep dev-server startup fast on repeat runs), so on a fresh checkout, or after changing any component's props/types/JSDoc, run `pnpm run generate-data` manually before/while using `dev` to see the docs site reflect the current library source.

### Git hooks (husky)

- `pre-commit` → `lint-staged` (prettier on staged `.ts,.tsx,.js,.jsx,.json,.css,.md`)
- `commit-msg` → commitlint against `@commitlint/config-conventional` (commits must follow Conventional Commits, e.g. `feat(Tabs): ...`, `fix: ...`, `chore(release): ...`)
- `pre-push` → `pnpm run test:ci`

Releases are automated via `semantic-release` (`.releaserc.json`) off conventional commit types on `main`; do not hand-edit `CHANGELOG.md` or bump `version` in `package.json`.

## Architecture: component library (`src/`)

Every component lives in its own folder under `src/components/<Name>/` with a consistent 4-file shape:

```
src/components/<Name>/
  <Name>.tsx          # implementation
  <Name>.types.ts      # exported prop types, JSDoc'd (JSDoc feeds the docs-site prop tables)
  <Name>.test.tsx      # Jest + Testing Library tests
  index.ts             # re-exports component + types
```

All components are re-exported from the single barrel `src/index.ts`, which is the package entry point (`src/index.ts` also imports `./styles/tokens.css` so consumers get design tokens automatically). When adding a new component, add its barrel export to `src/index.ts` and its docs page under `my-ui-pages/src/pages/components/`.

**Polymorphic `as` prop pattern**: most components accept an `as` prop to render as a different element/component while keeping correct prop typing. This is built on shared helpers in `src/components/common-type.ts`:

- `PolymorphicProps<C, Props>` — merges custom props with the inferred props of element `C`, omitting collisions.
- `PolymorphicRef<C>` — extracts the correct ref type for element `C`.

Follow this pattern (see `Button.types.ts`/`Button.tsx`) for any new component that should support `as`.

**Styling**: TailwindCSS utility classes composed via `src/utils/build-classname.ts` (a `tailwind-merge`-based helper) rather than manual string concatenation. Shared design tokens live in `src/styles/tokens.css`.

**Peer dependencies**: `react`, `react-dom`, `@headlessui/react`, `tailwind-merge`, and (optional) `react-window` are peer deps, not bundled — Rollup externalizes them (`rollup.config.mjs`). `_Dialog` and headless-UI-backed components (`Drawer`, `Dropdown`, etc.) rely on `@headlessui/react`. `VirtualizedDataTable` relies on the optional `react-window` peer dep.

**Docs comments matter functionally**: JSDoc comments and `@default` tags on exported types in `*.types.ts` are parsed by `react-docgen-typescript` (via `my-ui-pages/utils/generateDocs.ts`) to generate the prop tables shown on the docs site. Keep them accurate and up to date when changing prop types.

## Architecture: docs site (`my-ui-pages/`)

- `App.tsx` / `layouts/DocsLayout.tsx` / `layouts/BasePageLayout.tsx` — routing shell and page chrome.
- `pages/components/<Name>.tsx` — one demo page per library component, generally rendered inside `DocsPageLayout` with live examples plus a generated `PropsTable`.
- `src/data/components/<Name>/*.json` — **generated** prop-table data (see `build-docs` above); do not hand-edit.
- `public/search-index.json` — **generated** search index (see `build-search` above); do not hand-edit.
- `contexts/AppContext.tsx` — shared app-level React context for the docs site.
- Uses Tailwind v4 via `@tailwindcss/vite`, React Router v7 (`react-router`), `framer-motion` for animation, `lucide-react` for icons, `fuse.js` for client-side search, and `prism-react-renderer` for code blocks (`components/CodeBlock.tsx`).

## Deployment

- `pnpm run deploy` (root): builds the docs site (`predeploy` → `cd my-ui-pages && pnpm run build`) and publishes `my-ui-pages/dist` to the `gh-pages` branch via `gh-pages` CLI.
- `.github/workflows/deploy.yml` and `pr-checks.yml` handle CI; `pr-checks.yml` runs `pnpm run test:ci` and `pnpm run build` on every PR to `main`.
