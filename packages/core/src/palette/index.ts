import { oklch, formatHex, type Color } from "culori";
import { parse, toHex } from "../color";

export type PaletteMode =
  | "complementary"
  | "analogous"
  | "triadic"
  | "tetradic"
  | "monochromatic";

export interface PaletteOptions {
  /** Number of shades for monochromatic mode (default 5). */
  steps?: number;
  /** Lightness range for monochromatic [min,max] (default [0.2,0.9]). */
  lightnessRange?: [number, number];
}

function makeOklch(base: string) {
  const c = oklch(parse(base));
  if (!c) throw new Error(`Invalid color: ${base}`);
  return { l: c.l ?? 0.5, c: c.c ?? 0, h: c.h ?? 0, alpha: c.alpha };
}

function fromOklch(l: number, c: number, h: number): string {
  return formatHex({ mode: "oklch", l, c, h }) ?? "#000000";
}

export function palette(base: string, mode: PaletteMode, options: PaletteOptions = {}): string[] {
  const { l, c, h } = makeOklch(base);
  switch (mode) {
    case "complementary":
      return [fromOklch(l, c, h), fromOklch(l, c, (h + 180) % 360)];
    case "analogous":
      return [-30, 0, 30].map((d) => fromOklch(l, c, (h + d + 360) % 360));
    case "triadic":
      return [0, 120, 240].map((d) => fromOklch(l, c, (h + d) % 360));
    case "tetradic":
      return [0, 90, 180, 270].map((d) => fromOklch(l, c, (h + d) % 360));
    case "monochromatic": {
      const steps = options.steps ?? 5;
      const [min, max] = options.lightnessRange ?? [0.2, 0.9];
      const out: string[] = [];
      for (let i = 0; i < steps; i++) {
        const t = steps === 1 ? 0.5 : i / (steps - 1);
        const lightness = min + (max - min) * t;
        out.push(fromOklch(lightness, c, h));
      }
      return out;
    }
    default:
      return [toHex(parse(base))];
  }
}

export function shades(base: string, steps = 5): string[] {
  return palette(base, "monochromatic", { steps });
}
