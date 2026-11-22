"use client";

import { type ReactNode, createContext, useContext, useEffect, useState } from "react";

export type Lang = "en" | "id";

const dict = {
  en: {
    "nav.home": "Home",
    "nav.generator": "Generator",
    "nav.contrast": "Contrast",
    "nav.extract": "Extract",
    "nav.gradient": "Gradient",
    "theme.dark": "Dark mode",
    "theme.light": "Light mode",
    "home.title": "Generate accessible color palettes",
    "home.desc":
      "Pick a base color, choose a harmony, and get a ready-to-use palette with WCAG contrast checks.",
    "gen.title": "Palette Generator",
    "contrast.title": "Contrast Checker",
  },
  id: {
    "nav.home": "Beranda",
    "nav.generator": "Generator",
    "nav.contrast": "Kontras",
    "nav.extract": "Ekstrak",
    "nav.gradient": "Gradien",
    "theme.dark": "Mode gelap",
    "theme.light": "Mode terang",
    "home.title": "Buat palet warna yang aksesibel",
    "home.desc":
      "Pilih warna dasar, pilih harmoni, dan dapatkan palet siap pakai dengan pengecekan kontras WCAG.",
    "gen.title": "Generator Palet",
    "contrast.title": "Pengecek Kontras",
  },
} as const;

type DictKey = keyof (typeof dict)["en"];

interface Ctx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (k: DictKey) => string;
}

const LangContext = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  useEffect(() => {
    const stored = (localStorage.getItem("lang") as Lang | null) ?? "en";
    setLangState(stored);
  }, []);
  function setLang(l: Lang) {
    setLangState(l);
    localStorage.setItem("lang", l);
  }
  function t(k: DictKey) {
    return dict[lang][k] ?? k;
  }
  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
