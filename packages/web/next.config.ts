import type { NextConfig } from "next";

const isPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isPages ? "/palettify" : "",
  assetPrefix: isPages ? "/palettify/" : "",
  images: { unoptimized: true },
  transpilePackages: ["palettify"],
  env: {
    NEXT_PUBLIC_BASE_PATH: isPages ? "/palettify" : "",
  },
};

export default nextConfig;
