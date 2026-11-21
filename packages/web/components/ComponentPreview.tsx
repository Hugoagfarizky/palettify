"use client";

interface Props {
  colors: string[];
}

export function ComponentPreview({ colors }: Props) {
  const primary = colors[0] ?? "#3b82f6";
  const secondary = colors[1] ?? "#60a5fa";
  const accent = colors[2] ?? "#93c5fd";

  return (
    <div className="soft-card space-y-4 p-5">
      <h3 className="text-sm font-semibold text-[var(--muted)]">UI Preview</h3>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          className="rounded-xl px-4 py-2 text-sm font-semibold text-white shadow-md"
          style={{ backgroundColor: primary }}
        >
          Primary
        </button>
        <button
          type="button"
          className="rounded-xl px-4 py-2 text-sm font-semibold shadow-md"
          style={{ backgroundColor: secondary, color: "#fff" }}
        >
          Secondary
        </button>
        <button
          type="button"
          className="rounded-xl border px-4 py-2 text-sm font-semibold"
          style={{ borderColor: primary, color: primary }}
        >
          Outline
        </button>
      </div>

      <div className="soft-inset rounded-xl p-3">
        <input
          type="text"
          placeholder="Type something..."
          className="w-full bg-transparent text-sm outline-none"
          style={{ color: "var(--foreground)" }}
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {colors.slice(0, 4).map((c, i) => (
          <span
            // biome-ignore lint/suspicious/noArrayIndexKey: palette may contain duplicate colors
            key={`${c}-${i}`}
            className="rounded-full px-3 py-1 text-xs font-semibold text-white shadow"
            style={{ backgroundColor: c }}
          >
            Badge {i + 1}
          </span>
        ))}
      </div>

      <div
        className="rounded-xl p-4 text-sm text-white shadow-md"
        style={{ background: `linear-gradient(135deg, ${primary}, ${accent})` }}
      >
        <div className="font-semibold">Card title</div>
        <div className="opacity-90">This is a preview card using your palette.</div>
      </div>

      <div className="flex gap-2">
        <div className="h-2 flex-1 rounded-full" style={{ backgroundColor: primary }} />
        <div className="h-2 flex-1 rounded-full" style={{ backgroundColor: secondary }} />
        <div className="h-2 flex-1 rounded-full" style={{ backgroundColor: accent }} />
      </div>
    </div>
  );
}
