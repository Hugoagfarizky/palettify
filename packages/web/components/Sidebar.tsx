"use client";

import { Contrast, Home, Moon, Paintbrush, Sun } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "./ThemeProvider";

const items = [
  { href: "/", label: "Home", icon: Home },
  { href: "/generator", label: "Generator", icon: Paintbrush },
  { href: "/contrast", label: "Contrast", icon: Contrast },
];

export function Sidebar() {
  const pathname = usePathname();
  const { theme, toggle } = useTheme();

  return (
    <aside className="hidden w-64 shrink-0 flex-col gap-2 p-4 md:flex">
      <div className="soft-card mb-4 flex items-center gap-3 p-4">
        <img src="/logo.svg" alt="Palettify" className="h-10 w-10 rounded-xl shadow-lg" />
        <div>
          <div className="text-base font-bold">Palettify</div>
          <div className="text-xs text-[var(--muted)]">Color Studio</div>
        </div>
      </div>

      <nav className="flex flex-col gap-1">
        {items.map((it) => {
          const Icon = it.icon;
          const active = pathname === it.href;
          return (
            <Link
              key={it.href}
              href={it.href}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                active
                  ? "bg-blue-500 text-white shadow-md"
                  : "text-[var(--foreground)] hover:bg-white/60 dark:hover:bg-white/5"
              }`}
            >
              <Icon size={18} />
              {it.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto soft-card p-4">
        <div className="mb-2 text-xs font-semibold text-[var(--muted)]">Theme</div>
        <button
          type="button"
          onClick={toggle}
          className="soft-btn flex w-full items-center justify-center gap-2 px-3 py-2 text-sm font-medium"
        >
          {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          {theme === "dark" ? "Light mode" : "Dark mode"}
        </button>
      </div>
    </aside>
  );
}

export function MobileNav() {
  const pathname = usePathname();
  const { theme, toggle } = useTheme();
  return (
    <nav className="soft-card mb-4 flex items-center justify-between gap-2 p-2 md:hidden">
      <div className="flex gap-1">
        {items.map((it) => {
          const Icon = it.icon;
          const active = pathname === it.href;
          return (
            <Link
              key={it.href}
              href={it.href}
              className={`flex items-center gap-1 rounded-lg px-2 py-1.5 text-xs font-medium ${
                active ? "bg-blue-500 text-white" : ""
              }`}
            >
              <Icon size={14} />
              {it.label}
            </Link>
          );
        })}
      </div>
      <button type="button" onClick={toggle} className="soft-btn px-2 py-1.5">
        {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
      </button>
    </nav>
  );
}
