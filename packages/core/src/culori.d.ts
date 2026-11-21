declare module "culori" {
  export type Color = { mode: string; [key: string]: any };

  export function parse(input: string): Color | undefined;
  export function formatHex(color: any): string | undefined;
  export function formatRgb(color: any): string | undefined;
  export function formatHsl(color: any): string | undefined;
  export function converter(mode: string): (color: any) => any;
  export const oklch: (input: any) => any;
  export const wcagContrast: (a: any, b: any) => number;
  export const filterDeficiencyProt: (color: any) => any;
  export const filterDeficiencyDeuter: (color: any) => any;
  export const filterDeficiencyTrit: (color: any) => any;
}
