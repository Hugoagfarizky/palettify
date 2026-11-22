"use client";

import { RefreshCw } from "lucide-react";
import { palette as genPalette } from "palettify";
import { useState } from "react";

const MODES = ["complementary", "analogous", "triadic", "tetradic", "monochromatic"] as const;

function randomHex() {
  return `#${Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padStart(6, "0")}`;
}

function makePalettes(n: number) {
  const out: string[][] = [];
  for (let i = 0; i < n; i++) {
    const base = randomHex();
    const mode = MODES[Math.floor(Math.random() * MODES.length)];
    if (!mode) continue;
    try {
      out.push(genPalette(base, mode, { steps: 5 }));
    } catch {
      out.push([base]);
    }
  }
  return out;
}

export function RandomPalettes() {
  const [palettes, setPalettes] = useState<string[][]>(() => makePalettes(4));

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">Inspiration</h2>
        <button
          type="button"
          onClick={() => setPalettes(makePalettes(4))}
          className="soft-btn flex items-center gap-1 px-3 py-1.5 text-sm font-medium"
        >
          <RefreshCw size={14} /> Shuffle
        </button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {palettes.map((p, i) => (
          <div
            // biome-ignore lint/suspicious/noArrayIndexKey: palette list
            key={i}
            className="soft-card overflow-hidden"
          >
            <div className="flex h-16">
              {p.map((c, j) => (
                <div
                  // biome-ignore lint/suspicious/noArrayIndexKey: color swatch
                  key={j}
                  className="flex-1"
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
            <div className="flex gap-1 p-3">
              {p.slice(0, 6).map((c, j) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: color label
                <span key={j} className="font-mono text-[10px] text-[var(--muted)]">
                  {c}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
