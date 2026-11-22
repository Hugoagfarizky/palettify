"use client";

import { getPaletteSync } from "colorthief";
import { Image as ImageIcon, Upload } from "lucide-react";
import { useRef, useState } from "react";
import { useLanguage } from "../../components/LanguageProvider";

export default function ExtractPage() {
  const { t } = useLanguage();
  const inputRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [src, setSrc] = useState<string | null>(null);
  const [colors, setColors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setSrc(url);
    setColors([]);
  }

  function extract() {
    const img = imgRef.current;
    if (!img) return;
    if (!img.complete || !img.naturalWidth) {
      console.warn("image not loaded yet");
      return;
    }
    setLoading(true);
    try {
      const palette = getPaletteSync(img, { colorCount: 6 });
      if (palette) {
        setColors(palette.map((c) => c.hex()));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="soft-card flex h-12 w-12 items-center justify-center text-blue-500">
          <ImageIcon size={22} />
        </div>
        <div>
          <h1 className="text-2xl font-bold">{t("extract.title")}</h1>
          <p className="text-sm text-[var(--muted)]">
            Upload an image to extract its dominant colors.
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="soft-card space-y-3 p-5">
          <input ref={inputRef} type="file" accept="image/*" onChange={onFile} className="hidden" />
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="soft-btn flex w-full items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-blue-600"
          >
            <Upload size={16} /> {t("extract.choose")}
          </button>

          {src && (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                ref={imgRef}
                src={src}
                alt="preview"
                className="max-h-64 w-full rounded-xl object-contain"
                onLoad={extract}
                onError={() => console.error("image failed to load")}
              />
              <button
                type="button"
                onClick={extract}
                className="soft-btn w-full px-4 py-2 text-sm font-semibold"
              >
                {loading ? t("extract.extracting") : "Extract colors"}
              </button>
            </>
          )}
        </div>

        <div className="soft-card space-y-4 p-5">
          <h2 className="font-semibold">Extracted palette</h2>
          {colors.length === 0 ? (
            <p className="text-sm text-[var(--muted)]">No colors yet. Upload an image.</p>
          ) : (
            <>
              <div className="flex flex-wrap gap-3">
                {colors.map((c) => (
                  <div key={c} className="flex flex-col items-center gap-1">
                    <div className="h-16 w-16 rounded-xl shadow" style={{ backgroundColor: c }} />
                    <span className="font-mono text-xs text-[var(--muted)]">{c}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                {colors.map((c) => (
                  <div key={c} className="h-10 flex-1 rounded-lg" style={{ backgroundColor: c }} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
