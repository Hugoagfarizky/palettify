"use client";

import { ChevronRight, Sparkles, X } from "lucide-react";
import { useEffect, useState } from "react";

const steps = [
  {
    title: "Welcome to Palettify 👋",
    body: "Generate accessible color palettes, check WCAG contrast, and export to CSS/Tailwind/JSON.",
  },
  {
    title: "Pick a base color",
    body: "Use the color wheel on the left to choose your starting color.",
  },
  {
    title: "Choose a harmony",
    body: "Complementary, analogous, triadic, tetradic, or monochromatic.",
  },
  {
    title: "Drag to reorder",
    body: "Reorder palette colors by dragging them. Export when ready.",
  },
];

export function Onboarding() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const seen = localStorage.getItem("onboarding_seen");
    if (!seen) setOpen(true);
  }, []);

  function close() {
    localStorage.setItem("onboarding_seen", "1");
    setOpen(false);
  }

  function next() {
    if (step === steps.length - 1) close();
    else setStep(step + 1);
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="soft-card mx-4 w-full max-w-md p-6">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-blue-500">
            <Sparkles size={18} />
            <span className="text-xs font-semibold uppercase tracking-wider">Onboarding</span>
          </div>
          <button
            type="button"
            onClick={close}
            className="text-[var(--muted)] hover:text-[var(--foreground)]"
          >
            <X size={18} />
          </button>
        </div>
        <h2 className="text-xl font-bold">{steps[step]?.title}</h2>
        <p className="mt-2 text-sm text-[var(--muted)]">{steps[step]?.body}</p>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex gap-1">
            {steps.map((_, i) => (
              <span
                // biome-ignore lint/suspicious/noArrayIndexKey: step indicators
                key={i}
                className={`h-1.5 w-6 rounded-full ${i === step ? "bg-blue-500" : "bg-gray-300 dark:bg-gray-600"}`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={next}
            className="soft-btn flex items-center gap-1 px-4 py-2 text-sm font-semibold"
          >
            {step === steps.length - 1 ? "Get started" : "Next"}
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
