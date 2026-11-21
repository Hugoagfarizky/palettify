import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://hugoagfarizky.github.io/palettify";
  return [
    { url: `${base}/`, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    {
      url: `${base}/generator`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    { url: `${base}/contrast`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
  ];
}
