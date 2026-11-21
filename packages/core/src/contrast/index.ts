import { wcagContrast } from "culori";
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
