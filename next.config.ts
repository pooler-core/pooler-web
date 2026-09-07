import type { NextConfig } from "next";

// Where this site is mounted depends on how Pages is configured, and guessing
// wrong 404s every asset. So it is not guessed: the deploy workflow passes
// `actions/configure-pages` outputs in, which report the real base path and
// origin — "" and https://pooler.ai on a custom domain, "/pooler-web" and
// https://pooler-core.github.io/pooler-web on a project page.
//
// The default is the custom-domain case, so a local or unconfigured build
// produces root-relative URLs rather than a wrong prefix.
function normalizeBasePath(value: string | undefined): string {
  if (!value) return "";
  const trimmed = value.replace(/\/+$/, "");
  // configure-pages reports "/" for a root deployment; Next rejects that.
  return trimmed === "" || trimmed === "/" ? "" : trimmed;
}

const basePath = normalizeBasePath(process.env.BASE_PATH);
const siteUrl = (process.env.SITE_URL ?? "https://pooler.ai").replace(/\/+$/, "");

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
    NEXT_PUBLIC_SITE_URL: siteUrl,
  },
};

export default nextConfig;
