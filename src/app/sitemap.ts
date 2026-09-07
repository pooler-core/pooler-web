import type { MetadataRoute } from "next";
import { SITE_URL, PAGES } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["/", ...PAGES.map((page) => page.href)];
  const lastModified = new Date();

  return routes.map((route) => ({
    url: `${SITE_URL}${route === "/" ? "/" : `${route}/`}`,
    lastModified,
    changeFrequency: "monthly",
    priority: route === "/" ? 1 : 0.7,
  }));
}
