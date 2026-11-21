import { Contrast as ContrastIcon, Palette, Sparkles } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-8">
      <section className="soft-card space-y-4 p-8">
        <div className="flex items-center gap-2 text-blue-500">
          <Sparkles size={18} />
          <span className="text-xs font-semibold uppercase tracking-wider">Color Studio</span>
        </div>
        <h1 className="text-4xl font-bold tracking-tight">Generate accessible color palettes</h1>
        <p className="max-w-2xl text-[var(--muted)]">
          Pick a base color, choose a harmony, and get a ready-to-use palette with WCAG contrast
          checks. Export to CSS variables, Tailwind, JSON, or design tokens. Includes
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

      <section className="grid gap-4 sm:grid-cols-3">
        {[
          {
            title: "Harmonies",
            desc: "Complementary, analogous, triadic, tetradic, monochromatic.",
          },
          { title: "WCAG", desc: "AA/AAA validation for normal & large text." },
          { title: "Export", desc: "CSS vars, Tailwind config, JSON, W3C tokens." },
        ].map((f) => (
          <div key={f.title} className="soft-card p-5">
            <h3 className="font-semibold">{f.title}</h3>
            <p className="mt-1 text-sm text-[var(--muted)]">{f.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
