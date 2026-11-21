import { type Color as CuloriColor, converter, parse as culoriParse, formatHex } from "culori";

export type Color = CuloriColor;

export function parse(input: string): Color {
  const c = culoriParse(input);
  if (!c) throw new Error(`Invalid color: "${input}"`);
  return c;
}

export function tryParse(input: string): Color | null {
  return culoriParse(input) ?? null;
}

export function toHex(color: Color | string): string {
  const c = typeof color === "string" ? parse(color) : color;
  return formatHex(c) ?? "#000000";
}

const toRgbFn = converter("rgb");
const toHslFn = converter("hsl");
const toOklchFn = converter("oklch");

export interface RgbColor {
  r: number;
  g: number;
  b: number;
  alpha?: number;
}

export interface HslColor {
  h: number;
  s: number;
  l: number;
  alpha?: number;
}

export interface OklchColor {
  l: number;
  c: number;
  h: number;
  alpha?: number;
}

export function toRgb(color: Color | string): RgbColor {
  const c = typeof color === "string" ? parse(color) : color;
  const r = toRgbFn(c);
  return {
    r: Math.round((r.r ?? 0) * 255),
    g: Math.round((r.g ?? 0) * 255),
    b: Math.round((r.b ?? 0) * 255),
    alpha: r.alpha,
  };
}

export function toHsl(color: Color | string): HslColor {
  const c = typeof color === "string" ? parse(color) : color;
  const h = toHslFn(c);
  return {
    h: Math.round(h.h ?? 0),
    s: Math.round((h.s ?? 0) * 100),
    l: Math.round((h.l ?? 0) * 100),
    alpha: h.alpha,
  };
}

export function toOklch(color: Color | string): OklchColor {
  const c = typeof color === "string" ? parse(color) : color;
  const o = toOklchFn(c);
  return {
    l: o.l ?? 0,
    c: o.c ?? 0,
    h: o.h ?? 0,
    alpha: o.alpha,
  };
}

export function formatRgb(color: Color | string): string {
  const { r, g, b, alpha } = toRgb(color);
  return alpha !== undefined && alpha < 1
    ? `rgba(${r}, ${g}, ${b}, ${alpha.toFixed(2)})`
    : `rgb(${r}, ${g}, ${b})`;
}

export function formatHsl(color: Color | string): string {
  const { h, s, l, alpha } = toHsl(color);
  return alpha !== undefined && alpha < 1
    ? `hsla(${h}, ${s}%, ${l}%, ${alpha.toFixed(2)})`
    : `hsl(${h}, ${s}%, ${l}%)`;
}
