# Palettify

Color palette generator & WCAG contrast checker. Monorepo: core library (`palettify`) + Next.js web app.

## Packages

- `packages/core` — TypeScript library published to npm
- `packages/web` — Next.js 15 demo / playground

## Features

- Parse & convert colors (hex, rgb, hsl, oklch)
- WCAG contrast ratio + AA/AAA validation
- Palette harmonies: complementary, analogous, triadic, tetradic, monochromatic
- Export: CSS variables, Tailwind config, JSON, W3C design tokens
- Shareable palettes via URL

## Development

```bash
npm install
npm run build --workspace=packages/core
npm run dev   # starts web app
npm test      # runs core tests
npm run lint  # biome
```

## Usage (library)

```ts
import { palette, contrast, exportCss } from "palettify";

const colors = palette("#3b82f6", "triadic");
const { ratio, aa } = contrast("#ffffff", "#3b82f6");
const css = exportCss(colors);
```

## License

MIT
