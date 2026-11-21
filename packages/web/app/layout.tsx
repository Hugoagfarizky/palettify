import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { Onboarding } from "../components/Onboarding";
import { MobileNav, Sidebar } from "../components/Sidebar";
import { ThemeProvider } from "../components/ThemeProvider";

export const metadata: Metadata = {
  title: "Palettify — Color Palette Generator & Contrast Checker",
  description:
    "Generate accessible color palettes and check WCAG contrast ratios. Powered by culori.",
  icons: {
    icon: "/logo.svg",
    apple: "/icon-192.png",
  },
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
        </ThemeProvider>
      </body>
    </html>
  );
}
