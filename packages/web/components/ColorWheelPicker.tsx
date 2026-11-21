"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  color: string;
  onChange: (c: string) => void;
}

function hexToHsl(hex: string): { h: number; s: number; l: number } {
  const r = Number.parseInt(hex.slice(1, 3), 16) / 255;
  const g = Number.parseInt(hex.slice(3, 5), 16) / 255;
  const b = Number.parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  const l = (max + min) / 2;
  const d = max - min;
  const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));
  if (d !== 0) {
    switch (max) {
      case r:
        h = ((g - b) / d) % 6;
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      default:
        h = (r - g) / d + 4;
    }
    h *= 60;
    if (h < 0) h += 360;
  }
  return { h, s: s * 100, l: l * 100 };
}

function hslToHex(h: number, s: number, l: number): string {
  const ss = s / 100;
  const ll = l / 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = ss * Math.min(ll, 1 - ll);
  const f = (n: number) => ll - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  const toHex = (x: number) =>
    Math.round(x * 255)
      .toString(16)
      .padStart(2, "0");
  return `#${toHex(f(0))}${toHex(f(8))}${toHex(f(4))}`;
}

export function ColorWheelPicker({ color, onChange }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hsl, setHsl] = useState(() => hexToHsl(color || "#3b82f6"));
  const size = 200;
  const outer = size / 2 - 4;
  const inner = 18;

  // sync from external color
  useEffect(() => {
    setHsl(hexToHsl(color || "#3b82f6"));
  }, [color]);

  // draw wheel
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const img = ctx.createImageData(size, size);
    const cx = size / 2;
    const cy = size / 2;
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const dx = x - cx;
        const dy = y - cy;
        const r = Math.sqrt(dx * dx + dy * dy);
        if (r > outer || r < inner) continue;
        let angle = (Math.atan2(dy, dx) * 180) / Math.PI;
        if (angle < 0) angle += 360;
        const sat = (r / outer) * 100;
        const hex = hslToHex(angle, sat, 50);
        const i = (y * size + x) * 4;
        img.data[i] = Number.parseInt(hex.slice(1, 3), 16);
        img.data[i + 1] = Number.parseInt(hex.slice(3, 5), 16);
        img.data[i + 2] = Number.parseInt(hex.slice(5, 7), 16);
        img.data[i + 3] = 255;
      }
    }
    ctx.clearRect(0, 0, size, size);
    ctx.putImageData(img, 0, 0);
  }, [outer]);

  function pickFromEvent(e: React.PointerEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = size / 2;
    const cy = size / 2;
    const dx = x - cx;
    const dy = y - cy;
    const r = Math.sqrt(dx * dx + dy * dy);
    if (r > outer || r < inner) return;
    let angle = (Math.atan2(dy, dx) * 180) / Math.PI;
    if (angle < 0) angle += 360;
    const sat = (r / outer) * 100;
    const next = { h: angle, s: sat, l: hsl.l };
    setHsl(next);
    onChange(hslToHex(next.h, next.s, next.l));
  }

  function onLightnessChange(l: number) {
    const next = { ...hsl, l };
    setHsl(next);
    onChange(hslToHex(next.h, next.s, next.l));
  }

  return (
    <div className="soft-card flex flex-col items-center gap-3 p-4">
      <canvas
        ref={canvasRef}
        width={size}
        height={size}
        className="cursor-crosshair rounded-full"
        onPointerDown={pickFromEvent}
        onPointerMove={(e) => {
          if (e.buttons === 1) pickFromEvent(e);
        }}
      />
      <div className="flex w-full items-center gap-2">
        <span
          className="h-8 w-8 rounded-full border border-white/50 shadow"
          style={{ backgroundColor: color }}
        />
        <input
          type="text"
          value={color}
          onChange={(e) => {
            const v = e.target.value;
            if (/^#[0-9a-f]{6}$/i.test(v)) {
              onChange(v);
              setHsl(hexToHsl(v));
            }
          }}
          className="soft-inset flex-1 px-2 py-1.5 font-mono text-sm outline-none"
        />
      </div>
      <label className="w-full text-xs text-[var(--muted)]">
        Lightness
        <input
          type="range"
          min={5}
          max={95}
          value={hsl.l}
          onChange={(e) => onLightnessChange(Number(e.target.value))}
          className="w-full"
        />
      </label>
    </div>
  );
}
