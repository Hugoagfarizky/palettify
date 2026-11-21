"use client";

import { Contrast as ContrastIcon } from "lucide-react";
import { contrast } from "palettify";
import { useMemo, useState } from "react";

export default function ContrastPage() {
  const [fg, setFg] = useState("#ffffff");
  const [bg, setBg] = useState("#3b82f6");

  const result = useMemo(() => {
    try {
      return contrast(fg, bg);
    } catch {
      return null;
    }
  }, [fg, bg]);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="soft-card flex h-12 w-12 items-center justify-center text-blue-500">
          <ContrastIcon size={22} />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Contrast Checker</h1>
          <p className="text-sm text-[var(--muted)]">Validate WCAG AA/AAA for your color pairs.</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="soft-card space-y-4 p-5">
          <label className="flex flex-col gap-1 text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
            Foreground
            <div className="mt-1 flex items-center gap-2">
              <input
                type="color"
                value={fg}
                onChange={(e) => setFg(e.target.value)}
                className="h-10 w-12 cursor-pointer rounded-lg border-0"
              />
              <input
                type="text"
                value={fg}
                onChange={(e) => setFg(e.target.value)}
                className="soft-inset flex-1 px-3 py-2 font-mono text-sm outline-none"
              />
            </div>
          </label>

          <label className="flex flex-col gap-1 text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
            Background
            <div className="mt-1 flex items-center gap-2">
              <input
                type="color"
                value={bg}
                onChange={(e) => setBg(e.target.value)}
                className="h-10 w-12 cursor-pointer rounded-lg border-0"
              />
              <input
                type="text"
                value={bg}
                onChange={(e) => setBg(e.target.value)}
                className="soft-inset flex-1 px-3 py-2 font-mono text-sm outline-none"
              />
            </div>
          </label>

          {result && (
            <div className="space-y-3">
              <div className="soft-inset p-4 text-center">
                <div className="text-4xl font-bold">{result.ratio}:1</div>
                <div className="text-xs text-[var(--muted)]">Contrast ratio</div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: "AA normal", ok: result.aa },
                  { label: "AA large", ok: result.aaLarge },
                  { label: "AAA normal", ok: result.aaa },
                  { label: "AAA large", ok: result.aaaLarge },
                ].map((b) => (
                  <span
                    key={b.label}
                    className={`rounded-xl px-3 py-2 text-center text-xs font-semibold ${
                      b.ok
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
                        : "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300"
                    }`}
                  >
                    {b.label}: {b.ok ? "Pass" : "Fail"}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div
          className="soft-card flex min-h-[260px] flex-col items-center justify-center gap-3 rounded-2xl p-6"
          style={{ backgroundColor: bg, color: fg }}
        >
          <div className="text-3xl font-bold">Sample Heading</div>
          <p className="max-w-md text-center text-sm opacity-90">
            The quick brown fox jumps over the lazy dog. 0123456789
          </p>
          <button
            type="button"
            className="rounded-xl px-4 py-2 text-sm font-semibold shadow-md"
            style={{ backgroundColor: fg, color: bg }}
          >
            Button
          </button>
        </div>
      </div>
    </div>
  );
}
