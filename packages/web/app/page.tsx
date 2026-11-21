import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <h1 className="text-4xl font-bold tracking-tight">Generate accessible color palettes</h1>
        <p className="max-w-2xl text-neutral-600">
          Pick a base color, choose a harmony mode, and get a ready-to-use palette with WCAG
          contrast checks. Export to CSS variables, Tailwind, JSON, or design tokens.
        </p>
        <div className="flex gap-3">
          <Link
            href="/generator"
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Open generator
          </Link>
          <Link
            href="/contrast"
            className="rounded-md border border-neutral-300 px-4 py-2 text-sm font-medium hover:bg-neutral-100"
          >
            Contrast checker
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
          <div key={f.title} className="rounded-lg border border-neutral-200 bg-white p-4">
            <h3 className="font-semibold">{f.title}</h3>
            <p className="mt-1 text-sm text-neutral-600">{f.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
