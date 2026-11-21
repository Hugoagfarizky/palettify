"use client";

import { Download, Palette, Share2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
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
import { Suspense, useEffect, useMemo, useState } from "react";
import { ColorWheelPicker } from "../../components/ColorWheelPicker";
import { ComponentPreview } from "../../components/ComponentPreview";
import { PaletteBoard } from "../../components/PaletteBoard";

const MODES: PaletteMode[] = ["complementary", "analogous", "triadic", "tetradic", "monochromatic"];

export default function GeneratorPage() {
  return (
    <Suspense fallback={<div className="text-[var(--muted)]">Loading…</div>}>
      <GeneratorInner />
    </Suspense>
  );
}

function GeneratorInner() {
  const [base, setBase] = useState("#3b82f6");
  const [mode, setMode] = useState<PaletteMode>("triadic");
  const [steps, setSteps] = useState(5);
  const [deficiency, setDeficiency] = useState<DeficiencyType | "none">("none");
  const [colors, setColors] = useState<string[]>(() => genPalette("#3b82f6", "triadic"));
  const [copied, setCopied] = useState<string | null>(null);
  const searchParams = useSearchParams();

  // Load shared palette from URL
  useEffect(() => {
    const p = searchParams.get("p");
    if (p) {
      const cols = p
        .split(",")
        .map((c) => c.trim())
        .filter(Boolean);
      if (cols.length) setColors(cols);
    }
  }, [searchParams]);

  useEffect(() => {
    try {
      setColors(genPalette(base, mode, { steps }));
    } catch {
      /* ignore */
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

  function regenerate() {
    try {
      setColors(genPalette(base, mode, { steps }));
    } catch {
      /* ignore */
    }
  }

  // keep colors in sync when base/mode/steps change
  // (useEffect would be cleaner, but keep simple)
  void regenerate;

  function copy(text: string, key: string) {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 1200);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="soft-card flex h-12 w-12 items-center justify-center text-blue-500">
          <Palette size={22} />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Palette Generator</h1>
          <p className="text-sm text-[var(--muted)]">Pick, harmonize, and export your palette.</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        {/* Left: color wheel + controls */}
        <div className="space-y-4">
          <ColorWheelPicker color={base} onChange={setBase} />

          <div className="soft-card space-y-3 p-4">
            <label className="flex flex-col gap-1 text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
              Harmony mode
              <select
                value={mode}
                onChange={(e) => setMode(e.target.value as PaletteMode)}
                className="soft-inset mt-1 px-3 py-2 text-sm font-medium outline-none"
              >
                {MODES.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </label>

            {mode === "monochromatic" && (
              <label className="flex flex-col gap-1 text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
                Steps
                <input
                  type="number"
                  min={2}
                  max={12}
                  value={steps}
                  onChange={(e) => setSteps(Number(e.target.value))}
                  className="soft-inset mt-1 px-3 py-2 text-sm font-medium outline-none"
                />
              </label>
            )}

            <label className="flex flex-col gap-1 text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
              Color-blind preview
              <select
                value={deficiency}
                onChange={(e) => setDeficiency(e.target.value as DeficiencyType | "none")}
                className="soft-inset mt-1 px-3 py-2 text-sm font-medium outline-none"
              >
                <option value="none">None</option>
                <option value="protanopia">Protanopia</option>
                <option value="deuteranopia">Deuteranopia</option>
                <option value="tritanopia">Tritanopia</option>
              </select>
            </label>

            <button
              type="button"
              onClick={regenerate}
              className="soft-btn w-full px-3 py-2 text-sm font-semibold text-blue-600"
            >
              Regenerate
            </button>
          </div>
        </div>

        {/* Right: palette + preview + export */}
        <div className="space-y-4">
          <div className="soft-card p-5">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-semibold">Palette (drag to reorder)</h2>
              <span className="text-xs text-[var(--muted)]">{colors.length} colors</span>
            </div>
            <PaletteBoard colors={colors} onChange={setColors} />
          </div>

          {simulated && (
            <div className="soft-card p-5">
              <h2 className="mb-3 font-semibold">Color-blind preview ({deficiency})</h2>
              <div className="flex gap-2">
                {simulated.map((c) => (
                  <div key={c} className="h-14 flex-1 rounded-xl" style={{ backgroundColor: c }} />
                ))}
              </div>
            </div>
          )}

          <ComponentPreview colors={colors} />

          <div className="soft-card space-y-3 p-5">
            <div className="flex items-center gap-2">
              <Download size={16} className="text-[var(--muted)]" />
              <h2 className="font-semibold">Export</h2>
            </div>
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
                  className="soft-btn px-3 py-1.5 text-sm font-medium"
                >
                  {copied === e.label ? "Copied!" : e.label}
                </button>
              ))}
              <button
                type="button"
                onClick={() => {
                  const url = `${window.location.origin}${window.location.pathname}?p=${colors.map((c) => encodeURIComponent(c)).join(",")}`;
                  copy(url, "share");
                }}
                className="soft-btn flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-blue-600"
              >
                <Share2 size={14} /> {copied === "share" ? "Link copied!" : "Share link"}
              </button>
            </div>
            <pre className="soft-inset max-h-48 overflow-auto p-3 font-mono text-xs">
              {exportCss(colors)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
