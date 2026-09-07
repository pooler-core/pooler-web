import type { NextConfig } from "next";

// GitHub Pages serves this repo as a *project* page at
// https://pooler-core.github.io/pooler-web/ so every asset and route needs the
// repo name as a prefix. Set BASE_PATH="" when serving from a custom domain or
// a user page, where the site lives at the root.
const basePath = process.env.BASE_PATH ?? "/pooler-web";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  // Static hosts have no image optimizer.
  images: { unoptimized: true },
  // Pages resolves /foo to /foo/index.html, so emit directories rather than
  // bare .html files.
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
