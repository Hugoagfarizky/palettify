import { describe, expect, it } from "vitest";
import { parse, toHex, toHsl, toRgb } from "../src/color";
import { contrast, fixContrast, suggestForeground } from "../src/contrast";
import { simulate } from "../src/deficiency";
import { exportCss, exportJson } from "../src/export";
import { palette } from "../src/palette";

describe("color", () => {
  it("parses hex", () => {
    expect(toHex(parse("#3b82f6"))).toBe("#3b82f6");
  });
  it("converts to rgb", () => {
    expect(toRgb("#ff0000")).toEqual({ r: 255, g: 0, b: 0, alpha: undefined });
  });
  it("converts to hsl", () => {
    const h = toHsl("#ff0000");
    expect(h.h).toBe(0);
    expect(h.s).toBe(100);
    expect(h.l).toBe(50);
  });
});

describe("contrast", () => {
  it("white on black is 21", () => {
    const r = contrast("#ffffff", "#000000");
    expect(r.ratio).toBe(21);
    expect(r.aaa).toBe(true);
  });
  it("suggests foreground", () => {
    expect(suggestForeground("#000000")).toBe("#ffffff");
  });

  it("fixContrast passes AA", () => {
    const fixed = fixContrast("#777777", "#ffffff");
    const r = contrast(fixed, "#ffffff");
    expect(r.aa).toBe(true);
  });
});

describe("palette", () => {
  it("triadic returns 3", () => {
    expect(palette("#3b82f6", "triadic")).toHaveLength(3);
  });
  it("monochromatic steps", () => {
    expect(palette("#3b82f6", "monochromatic", { steps: 4 })).toHaveLength(4);
  });
});

describe("export", () => {
  it("css", () => {
    const out = exportCss(["#fff", "#000"]);
    expect(out).toContain("--cp-0: #fff");
  });
  it("json", () => {
    expect(JSON.parse(exportJson(["#fff"]))).toEqual({ colors: ["#fff"] });
  });
});

describe("deficiency", () => {
  it("simulate returns hex", () => {
    const out = simulate("#ff0000", "protanopia");
    expect(out).toMatch(/^#[0-9a-f]{6}$/i);
  });
});
