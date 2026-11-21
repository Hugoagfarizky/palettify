"use client";

import { useState } from "react";

interface Props {
  colors: string[];
  onChange: (colors: string[]) => void;
}

export function PaletteBoard({ colors, onChange }: Props) {
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  function onDragStart(i: number) {
    setDragIndex(i);
  }

  function onDragOver(e: React.DragEvent, i: number) {
    e.preventDefault();
    if (dragIndex === null || dragIndex === i) return;
    const next = [...colors];
    const moved = next.splice(dragIndex, 1)[0];
    if (moved !== undefined) next.splice(i, 0, moved);
    onChange(next);
    setDragIndex(i);
  }

  function onDragEnd() {
    setDragIndex(null);
  }

  return (
    <div className="flex flex-wrap gap-3">
      {colors.map((c, i) => (
        <div
          // biome-ignore lint/suspicious/noArrayIndexKey: drag reorder requires index keys
          key={`${c}-${i}`}
          draggable
          onDragStart={() => onDragStart(i)}
          onDragOver={(e) => onDragOver(e, i)}
          onDragEnd={onDragEnd}
          className={`group relative flex cursor-grab flex-col items-center gap-1 rounded-2xl p-2 transition ${
            dragIndex === i ? "scale-105 opacity-70" : ""
          }`}
        >
          <div
            className="h-20 w-20 rounded-2xl shadow-lg ring-2 ring-white/40"
            style={{ backgroundColor: c }}
          />
          <span className="font-mono text-xs text-[var(--muted)]">{c}</span>
          <span className="absolute -right-1 -top-1 hidden rounded-full bg-white/80 px-1 text-[10px] text-gray-500 shadow group-hover:block">
            ⋮⋮
          </span>
        </div>
      ))}
    </div>
  );
}
