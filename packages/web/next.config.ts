import type { NextConfig } from "next";

const isPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isPages ? "/palettify" : "",
  assetPrefix: isPages ? "/palettify/" : "",
  images: { unoptimized: true },
  transpilePackages: ["palettify"],
};

export default nextConfig;
