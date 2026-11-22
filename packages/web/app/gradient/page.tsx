"use client";

import { Layers } from "lucide-react";
import { useMemo, useState } from "react";
import { useLanguage } from "../../components/LanguageProvider";

const defaultColors = ["#3b82f6", "#93c5fd", "#1d4ed8"];

export default function GradientPage() {
  const { t } = useLanguage();
  const [colors, setColors] = useState<string[]>(defaultColors);
  const [type, setType] = useState<"linear" | "radial">("linear");
  const [angle, setAngle] = useState(90);
  const [copied, setCopied] = useState(false);

  const css = useMemo(() => {
    const stops = colors.join(", ");
    if (type === "linear") return `linear-gradient(${angle}deg, ${stops})`;
    return `radial-gradient(circle, ${stops})`;
  }, [colors, type, angle]);

  function updateColor(i: number, v: string) {
    setColors((prev) => prev.map((c, idx) => (idx === i ? v : c)));
  }

  function addColor() {
    setColors((prev) => [...prev, "#60a5fa"]);
  }

  function removeColor(i: number) {
    setColors((prev) => prev.filter((_, idx) => idx !== i));
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="soft-card flex h-12 w-12 items-center justify-center text-blue-500">
          <Layers size={22} />
        </div>
        <div>
          <h1 className="text-2xl font-bold">{t("gradient.title")}</h1>
          <p className="text-sm text-[var(--muted)]">Build CSS gradients from your palette.</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="soft-card space-y-4 p-5">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setType("linear")}
              className={`soft-btn px-3 py-1.5 text-sm font-medium ${type === "linear" ? "text-blue-600" : ""}`}
            >
              {t("gradient.linear")}
            </button>
            <button
              type="button"
              onClick={() => setType("radial")}
              className={`soft-btn px-3 py-1.5 text-sm font-medium ${type === "radial" ? "text-blue-600" : ""}`}
            >
              {t("gradient.radial")}
            </button>
          </div>

          {type === "linear" && (
            <label className="flex flex-col gap-1 text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
              Angle: {angle}°
              <input
                type="range"
                min={0}
                max={360}
                value={angle}
                onChange={(e) => setAngle(Number(e.target.value))}
                className="w-full"
              />
            </label>
          )}

          <div className="space-y-2">
            <div className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
              Stops
            </div>
            {colors.map((c, i) => (
              <div
                // biome-ignore lint/suspicious/noArrayIndexKey: gradient stops
                key={i}
                className="flex items-center gap-2"
              >
                <input
                  type="color"
                  value={c}
                  onChange={(e) => updateColor(i, e.target.value)}
                  className="h-8 w-10 cursor-pointer rounded border-0"
                />
                <input
                  type="text"
                  value={c}
                  onChange={(e) => updateColor(i, e.target.value)}
                  className="soft-inset flex-1 px-2 py-1 font-mono text-sm outline-none"
                />
                <button
                  type="button"
                  onClick={() => removeColor(i)}
                  className="text-rose-500 hover:underline"
                >
                  ×
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addColor}
              className="soft-btn w-full px-3 py-1.5 text-sm font-medium"
            >
              + {t("gradient.add")}
            </button>
          </div>

          <button
            type="button"
            onClick={() => {
              navigator.clipboard.writeText(`background: ${css};`);
              setCopied(true);
              setTimeout(() => setCopied(false), 1200);
            }}
            className="soft-btn w-full px-3 py-2 text-sm font-semibold text-blue-600"
          >
            {copied ? "Copied!" : t("gradient.copy")}
          </button>
          <pre className="soft-inset p-3 font-mono text-xs">background: {css};</pre>
        </div>

        <div className="soft-card min-h-[260px] rounded-2xl" style={{ background: css }} />
      </div>
    </div>
  );
}
