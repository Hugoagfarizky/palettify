# Contributing to Palettify

Thanks for your interest in contributing! This document explains how to get
started.

## Development setup

```bash
git clone https://github.com/Hugoagfarizky/palettify.git
cd palettify
npm install
npm run build --workspace=packages/core
npm run dev   # starts the web app at http://localhost:3000
```

## Project structure

- `packages/core` — TypeScript library (published to npm as `palettify`)
- `packages/web` — Next.js 15 demo / playground

## Workflow

1. Fork the repo and create a feature branch: `git checkout -b feat/my-feature`
2. Make your changes. Keep commits small and focused.
3. Run checks before committing:
   ```bash
   npm test
   npm run lint
   npm run build
   ```
4. Open a pull request against `main` with a clear description.

## Code style

- TypeScript strict mode; avoid `any`.
- Formatting/linting via Biome (`npm run lint`, `npm run format`).
- Tests in `packages/core/tests`.

## Commit messages

Follow Conventional Commits: `feat:`, `fix:`, `docs:`, `chore:`, `ci:`, etc.

## Reporting bugs

Open an issue with reproduction steps, expected vs. actual behavior, and
environment details.
