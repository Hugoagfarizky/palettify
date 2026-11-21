import { converter, wcagContrast } from "culori";
import * as culori from "culori";
import { parse, toHex } from "../color";

export interface ContrastResult {
  ratio: number;
  aa: boolean;
  aaLarge: boolean;
  aaa: boolean;
  aaaLarge: boolean;
  fg: string;
  bg: string;
}

export function contrast(foreground: string, background: string): ContrastResult {
  const fg = parse(foreground);
  const bg = parse(background);
  const ratio = wcagContrast(fg, bg);
  const rounded = Math.round(ratio * 100) / 100;
  return {
    ratio: rounded,
    aa: ratio >= 4.5,
    aaLarge: ratio >= 3,
    aaa: ratio >= 7,
    aaaLarge: ratio >= 4.5,
    fg: toHex(fg),
    bg: toHex(bg),
  };
}

export function passesAA(foreground: string, background: string, largeText = false): boolean {
  return contrast(foreground, background)[largeText ? "aaLarge" : "aa"];
}

export function passesAAA(foreground: string, background: string, largeText = false): boolean {
  return contrast(foreground, background)[largeText ? "aaaLarge" : "aaa"];
}

export function suggestForeground(background: string): string {
  const black = contrast("#000000", background).ratio;
  const white = contrast("#ffffff", background).ratio;
  return black >= white ? "#000000" : "#ffffff";
}

export function fixContrast(foreground: string, background: string, target = 4.5): string {
  const fgColor = parse(foreground);
  const bgColor = parse(background);
  const toHslFn = converter("hsl");
  const fgHsl = toHslFn(fgColor);
  const h = fgHsl.h ?? 0;
  const s = fgHsl.s ?? 0;
  const origL = fgHsl.l ?? 0.5;

  const ratioAt = (l: number) => wcagContrast({ mode: "hsl", h, s, l }, bgColor);

  let bestL = origL;
  let bestDist = Number.POSITIVE_INFINITY;
  let found = false;
  for (let i = 0; i <= 100; i++) {
    const l = i / 100;
    if (ratioAt(l) >= target) {
      const dist = Math.abs(l - origL);
      if (dist < bestDist) {
        bestDist = dist;
        bestL = l;
        found = true;
      }
    }
  }
  if (!found) {
    if (ratioAt(0) >= target) bestL = 0;
    else if (ratioAt(1) >= target) bestL = 1;
  }

  const { formatHex } = culori as { formatHex: (c: unknown) => string | undefined };
  return formatHex({ mode: "hsl", h, s, l: bestL }) ?? foreground;
}
