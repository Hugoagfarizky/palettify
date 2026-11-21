import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { Onboarding } from "../components/Onboarding";
import { ServiceWorkerRegister } from "../components/ServiceWorkerRegister";
import { MobileNav, Sidebar } from "../components/Sidebar";
import { ThemeProvider } from "../components/ThemeProvider";

export const metadata: Metadata = {
  title: "Palettify — Color Palette Generator & Contrast Checker",
  description:
    "Generate accessible color palettes and check WCAG contrast ratios. Powered by culori.",
  keywords: [
    "color palette",
    "WCAG",
    "contrast checker",
    "design tokens",
    "tailwind",
    "accessibility",
  ],
  openGraph: {
    title: "Palettify — Color Palette Generator & Contrast Checker",
    description: "Generate accessible color palettes and check WCAG contrast ratios.",
    type: "website",
    url: "https://hugoagfarizky.github.io/palettify/",
    images: [`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/icon-512.png`],
  },
  twitter: {
    card: "summary",
    title: "Palettify — Color Palette Generator & Contrast Checker",
    description: "Generate accessible color palettes and check WCAG contrast ratios.",
  },
  icons: {
    icon: [
      { url: `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/logo.svg`, type: "image/svg+xml" },
      {
        url: `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/icon-192.png`,
        type: "image/png",
        sizes: "192x192",
      },
    ],
    apple: `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/icon-192.png`,
  },
};

export const viewport = {
  themeColor: "#3b82f6",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className="min-h-screen text-[var(--foreground)] antialiased">
        <ThemeProvider>
          <div className="bg-animated" />
          <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1 px-4 py-4 md:px-8 md:py-6">
              <MobileNav />
              <main className="mx-auto max-w-5xl">{children}</main>
            </div>
          </div>
          <Onboarding />
          <ServiceWorkerRegister />
        </ThemeProvider>
      </body>
    </html>
  );
}
