export interface ExportOptions {
  prefix?: string;
  name?: string;
}

export function exportCss(colors: string[], options: ExportOptions = {}): string {
  const prefix = options.prefix ?? "--cp";
  const lines = colors.map((c, i) => `  ${prefix}-${i}: ${c};`);
  return `:root {\n${lines.join("\n")}\n}`;
}

export function exportScss(colors: string[], options: ExportOptions = {}): string {
  const prefix = options.prefix ?? "cp";
  const lines = colors.map((c, i) => `$${prefix}-${i}: ${c};`);
  return lines.join("\n");
}

export function exportTailwindV4(colors: string[], options: ExportOptions = {}): string {
  const prefix = options.prefix ?? "cp";
  const lines = colors.map((c, i) => `  --color-${prefix}-${i}: ${c};`);
  return `@theme {\n${lines.join("\n")}\n}`;
}

export function exportTailwind(colors: string[], options: ExportOptions = {}): string {
  const name = options.name ?? "palette";
  const entries = colors.map((c, i) => `    ${i}: "${c}",`).join("\n");
  return `// tailwind.config.js\nmodule.exports = {\n  theme: {\n    extend: {\n      colors: {\n        ${name}: {\n${entries}\n        },\n      },\n    },\n  },\n};`;
}

export function exportJson(colors: string[]): string {
  return JSON.stringify({ colors }, null, 2);
}

export interface DesignToken {
  $type: "color";
  $value: string;
}

export function exportTokens(colors: string[]): string {
  const tokens: Record<string, DesignToken> = {};
  colors.forEach((c, i) => {
    tokens[`color-${i}`] = { $type: "color", $value: c };
  });
  return JSON.stringify({ palette: tokens }, null, 2);
}
