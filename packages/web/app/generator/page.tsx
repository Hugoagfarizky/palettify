"use client";

import {
  type DeficiencyType,
  type PaletteMode,
  contrast,
  exportCss,
  exportJson,
  exportTailwind,
  exportTokens,
  palette as genPalette,
  simulatePalette,
} from "palettify";
import { useMemo, useState } from "react";

const MODES: PaletteMode[] = ["complementary", "analogous", "triadic", "tetradic", "monochromatic"];

export default function GeneratorPage() {
  const [base, setBase] = useState("#3b82f6");
  const [mode, setMode] = useState<PaletteMode>("triadic");
  const [steps, setSteps] = useState(5);
  const [deficiency, setDeficiency] = useState<DeficiencyType | "none">("none");

  const colors = useMemo(() => {
    try {
      return genPalette(base, mode, { steps });
    } catch {
      return [];
    }
  }, [base, mode, steps]);

  const simulated = useMemo(() => {
    if (deficiency === "none") return null;
    try {
      return simulatePalette(colors, deficiency);
    } catch {
      return null;
    }
  }, [colors, deficiency]);

  const [copied, setCopied] = useState<string | null>(null);
  function copy(text: string, key: string) {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 1200);
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Palette Generator</h1>

      <div className="flex flex-wrap items-end gap-4">
        <label className="flex flex-col gap-1 text-sm">
          Base color
          <input
            type="color"
            value={base}
            onChange={(e) => setBase(e.target.value)}
            className="h-10 w-16 cursor-pointer rounded border border-neutral-300"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Mode
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value as PaletteMode)}
            className="rounded border border-neutral-300 px-2 py-2"
          >
            {MODES.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </label>
        {mode === "monochromatic" && (
          <label className="flex flex-col gap-1 text-sm">
            Steps
            <input
              type="number"
              min={2}
              max={12}
              value={steps}
              onChange={(e) => setSteps(Number(e.target.value))}
              className="w-20 rounded border border-neutral-300 px-2 py-2"
            />
          </label>
        )}
        <label className="flex flex-col gap-1 text-sm">
          Color-blind preview
          <select
            value={deficiency}
            onChange={(e) => setDeficiency(e.target.value as DeficiencyType | "none")}
            className="rounded border border-neutral-300 px-2 py-2"
          >
            <option value="none">None</option>
            <option value="protanopia">Protanopia</option>
            <option value="deuteranopia">Deuteranopia</option>
            <option value="tritanopia">Tritanopia</option>
          </select>
        </label>
        <input
          type="text"
          value={base}
          onChange={(e) => setBase(e.target.value)}
          className="rounded border border-neutral-300 px-2 py-2 font-mono text-sm"
        />
      </div>

      <div className="flex flex-wrap gap-3">
        {colors.map((c) => (
          <div key={c} className="flex flex-col items-center gap-1">
            <div
              className="h-24 w-24 rounded-lg border border-neutral-200 shadow-sm"
              style={{ backgroundColor: c }}
            />
            <button
              type="button"
              onClick={() => copy(c, c)}
              className="font-mono text-xs text-neutral-600 hover:text-blue-600"
            >
              {copied === c ? "copied!" : c}
            </button>
          </div>
        ))}
      </div>

      {colors.length > 1 && (
        <div className="rounded-lg border border-neutral-200 bg-white p-4">
          <h2 className="mb-2 font-semibold">Preview</h2>
          <div className="flex gap-2">
            {colors.map((c) => (
              <div
                key={c}
                className="flex h-16 flex-1 items-center justify-center rounded text-sm font-medium"
                style={{
                  backgroundColor: c,
                  color: contrast("#ffffff", c).aa ? "#ffffff" : "#000000",
                }}
              >
                Text
              </div>
            ))}
          </div>
        </div>
      )}

      {simulated && (
        <div className="rounded-lg border border-neutral-200 bg-white p-4">
          <h2 className="mb-2 font-semibold">Color-blind preview ({deficiency})</h2>
          <div className="flex gap-2">
            {simulated.map((c) => (
              <div key={c} className="h-16 flex-1 rounded" style={{ backgroundColor: c }} />
            ))}
          </div>
        </div>
      )}
      <div className="space-y-3">
        <h2 className="font-semibold">Export</h2>
        <div className="flex flex-wrap gap-2">
          {[
            { label: "CSS vars", value: exportCss(colors) },
            { label: "Tailwind", value: exportTailwind(colors) },
            { label: "JSON", value: exportJson(colors) },
            { label: "Tokens", value: exportTokens(colors) },
          ].map((e) => (
            <button
              key={e.label}
              type="button"
              onClick={() => copy(e.value, e.label)}
              className="rounded border border-neutral-300 px-3 py-1.5 text-sm hover:bg-neutral-100"
            >
              {copied === e.label ? "Copied!" : `Copy ${e.label}`}
            </button>
          ))}
        </div>
        <pre className="max-h-60 overflow-auto rounded bg-neutral-900 p-3 text-xs text-neutral-100">
          {exportCss(colors)}
        </pre>
      </div>
    </div>
  );
}
