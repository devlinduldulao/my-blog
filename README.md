# devlinduldulao

Personal Astro site and blog.

## Requirements

- Node.js `^20.19.1 || >=22.12.0`
- npm

## Install

```bash
npm install
```

## Development

```bash
npm run dev
```

## Validation

Run the available checks individually:

```bash
npm test
npm run lint
npm run typecheck
npm run build
```

Watch tests during development:

```bash
npm run test:watch
```

## Notes

- `npm run build` runs Astro checks, performs the production build, generates Pagefind search indexes, and copies them into `public/`.
- CI runs on pushes to `main` and on pull requests via `.github/workflows/ci.yml`.
