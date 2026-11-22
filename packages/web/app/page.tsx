"use client";

import {
  ArrowRight,
  Code2,
  Contrast as ContrastIcon,
  Download,
  Eye,
  Palette,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useLanguage } from "../components/LanguageProvider";
import { RandomPalettes } from "../components/RandomPalettes";

const features = [
  {
    icon: Palette,
    title: "Harmonies",
    desc: "Complementary, analogous, triadic, tetradic, monochromatic.",
  },
  { icon: ShieldCheck, title: "WCAG", desc: "AA/AAA validation for normal & large text." },
  { icon: Download, title: "Export", desc: "CSS vars, Tailwind config, JSON, W3C tokens." },
  { icon: Eye, title: "Color-blind", desc: "Simulate protanopia, deuteranopia, tritanopia." },
  { icon: Zap, title: "Drag & drop", desc: "Reorder palette colors intuitively." },
  { icon: Code2, title: "Library", desc: "Use the core as an npm package." },
];

const steps = [
  {
    n: "01",
    title: "Pick a base color",
    desc: "Use the color wheel to choose your starting color.",
  },
  { n: "02", title: "Choose a harmony", desc: "Select complementary, triadic, or any mode." },
  { n: "03", title: "Validate & export", desc: "Check contrast, then copy CSS/Tailwind/JSON." },
];

export default function HomePage() {
  const { t } = useLanguage();
  return (
    <div className="space-y-8">
      {/* Hero */}
      <section className="soft-card space-y-4 p-8">
        <div className="flex items-center gap-2 text-blue-500">
          <Sparkles size={18} />
          <span className="text-xs font-semibold uppercase tracking-wider">Color Studio</span>
        </div>
        <h1 className="text-4xl font-bold tracking-tight">{t("home.title")}</h1>
        <p className="max-w-2xl text-[var(--muted)]">
          {t("home.desc")} Export to CSS variables, Tailwind, JSON, or design tokens. Includes
          color-blindness simulation.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/generator"
            className="soft-btn flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-blue-600"
          >
            <Palette size={16} /> Open generator
          </Link>
          <Link
            href="/contrast"
            className="soft-btn flex items-center gap-2 px-5 py-2.5 text-sm font-semibold"
          >
            <ContrastIcon size={16} /> Contrast checker
          </Link>
        </div>
      </section>

      {/* Features grid */}
      <section>
        <h2 className="mb-3 text-lg font-bold">Features</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.title} className="soft-card flex gap-3 p-5">
                <div className="soft-inset flex h-10 w-10 shrink-0 items-center justify-center text-blue-500">
                  <Icon size={18} />
                </div>
                <div>
                  <h3 className="font-semibold">{f.title}</h3>
                  <p className="mt-1 text-sm text-[var(--muted)]">{f.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* How it works */}
      <section className="soft-card p-6">
        <h2 className="mb-4 text-lg font-bold">How it works</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n} className="space-y-2">
              <div className="text-3xl font-bold text-blue-500/30">{s.n}</div>
              <h3 className="font-semibold">{s.title}</h3>
              <p className="text-sm text-[var(--muted)]">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Quick start code */}
      <section className="soft-card space-y-3 p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">Use as a library</h2>
          <Link
            href="/generator"
            className="flex items-center gap-1 text-sm text-blue-500 hover:underline"
          >
            Try it <ArrowRight size={14} />
          </Link>
        </div>
        <pre className="soft-inset overflow-auto p-4 font-mono text-xs">
          {`npm install palettify

import { palette, contrast, exportCss } from "palettify";

const colors = palette("#3b82f6", "triadic");
const { ratio, aa } = contrast("#ffffff", "#3b82f6");
const css = exportCss(colors);`}
        </pre>
      </section>

      <RandomPalettes />

      {/* CTA */}
      <section className="soft-card flex flex-col items-center gap-3 p-8 text-center">
        <h2 className="text-2xl font-bold">Ready to craft your palette?</h2>
        <p className="max-w-md text-sm text-[var(--muted)]">
          Start generating accessible, beautiful palettes in seconds.
        </p>
        <Link
          href="/generator"
          className="soft-btn px-6 py-2.5 text-sm font-semibold text-blue-600"
        >
          Get started
        </Link>
      </section>
    </div>
  );
}
