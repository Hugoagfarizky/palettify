"use client";

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
      <h1 className="text-2xl font-bold">Contrast Checker</h1>

      <div className="flex flex-wrap items-end gap-6">
        <label className="flex flex-col gap-1 text-sm">
          Foreground
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={fg}
              onChange={(e) => setFg(e.target.value)}
              className="h-10 w-16 cursor-pointer rounded border border-neutral-300"
            />
            <input
              type="text"
              value={fg}
              onChange={(e) => setFg(e.target.value)}
              className="rounded border border-neutral-300 px-2 py-2 font-mono text-sm"
            />
          </div>
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Background
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={bg}
              onChange={(e) => setBg(e.target.value)}
              className="h-10 w-16 cursor-pointer rounded border border-neutral-300"
            />
            <input
              type="text"
              value={bg}
              onChange={(e) => setBg(e.target.value)}
              className="rounded border border-neutral-300 px-2 py-2 font-mono text-sm"
            />
          </div>
        </label>
      </div>

      <div
        className="flex h-40 items-center justify-center rounded-lg text-2xl font-semibold"
        style={{ backgroundColor: bg, color: fg }}
      >
        Sample Text — The quick brown fox
      </div>

      {result && (
        <div className="space-y-3 rounded-lg border border-neutral-200 bg-white p-4">
          <div className="text-3xl font-bold">{result.ratio}:1</div>
          <div className="grid grid-cols-2 gap-2 text-sm sm:grid-cols-4">
            {[
              { label: "AA (normal)", ok: result.aa },
              { label: "AA (large)", ok: result.aaLarge },
              { label: "AAA (normal)", ok: result.aaa },
              { label: "AAA (large)", ok: result.aaaLarge },
            ].map((b) => (
              <span
                key={b.label}
                className={`rounded px-2 py-1 text-center font-medium ${
                  b.ok ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                }`}
              >
                {b.label}: {b.ok ? "Pass" : "Fail"}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
