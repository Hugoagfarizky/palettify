import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Palettify — Color Palette Generator & Contrast Checker",
  description:
    "Generate accessible color palettes and check WCAG contrast ratios. Powered by culori.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="min-h-screen bg-neutral-50 text-neutral-900 antialiased">
        <header className="border-b border-neutral-200 bg-white">
          <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
            <Link href="/" className="text-lg font-bold tracking-tight">
              Palettify
            </Link>
            <div className="flex gap-4 text-sm font-medium">
              <Link href="/generator" className="hover:text-blue-600">
                Generator
              </Link>
              <Link href="/contrast" className="hover:text-blue-600">
                Contrast
              </Link>
            </div>
          </nav>
        </header>
        <main className="mx-auto max-w-5xl px-6 py-8">{children}</main>
        <footer className="border-t border-neutral-200 py-6 text-center text-xs text-neutral-500">
          Built with culori · Open source
        </footer>
      </body>
    </html>
  );
}
