import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
  return {
    name: "Palettify",
    short_name: "Palettify",
    description: "Color palette generator & WCAG contrast checker",
    start_url: `${base}/`,
    scope: `${base}/`,
    display: "standalone",
    background_color: "#eef2ff",
    theme_color: "#3b82f6",
    icons: [
      { src: `${base}/icon-192.png`, sizes: "192x192", type: "image/png" },
      { src: `${base}/icon-512.png`, sizes: "512x512", type: "image/png" },
    ],
  };
}
