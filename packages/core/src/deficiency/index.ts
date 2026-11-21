import { filterDeficiencyDeuter, filterDeficiencyProt, filterDeficiencyTrit } from "culori";
import { parse, toHex } from "../color";

export type DeficiencyType = "protanopia" | "deuteranopia" | "tritanopia";

export function simulate(color: string, type: DeficiencyType): string {
  const c = parse(color);
  const fn =
    type === "protanopia"
      ? filterDeficiencyProt
      : type === "deuteranopia"
        ? filterDeficiencyDeuter
        : filterDeficiencyTrit;
  return toHex(fn(c));
}

export function simulatePalette(colors: string[], type: DeficiencyType): string[] {
  return colors.map((c) => simulate(c, type));
}
