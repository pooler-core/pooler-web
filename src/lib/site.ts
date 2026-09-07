export const SITE_URL = "https://pooler-core.github.io/pooler-web";

export const REPO = "pooler-core/pooler-web";

export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/**
 * Prefix a path that Next's <Link> does not rewrite for us — anything under
 * public/, or a raw <a href> to a static file.
 */
export function asset(path: string): string {
  return `${BASE_PATH}${path}`;
}

/**
 * A GitHub "new issue" URL with the form pre-filled. This is how visitors write
 * to the site without the site holding any credential: they submit the issue
 * under their own GitHub identity, and a later build renders it back in.
 */
export function traceUrl(opts: {
  title: string;
  body: string;
  labels?: string[];
}): string {
  const params = new URLSearchParams({
    title: opts.title,
    body: opts.body,
  });
  if (opts.labels?.length) params.set("labels", opts.labels.join(","));
  return `https://github.com/${REPO}/issues/new?${params.toString()}`;
}

export const PAGES = [
  {
    href: "/glade",
    title: "The Glade",
    blurb: "Pages that would rather be interesting than useful.",
  },
  {
    href: "/glade/mirror",
    title: "The Mirror",
    blurb: "Everything you told us without meaning to.",
  },
  {
    href: "/glade/clearing",
    title: "The Clearing",
    blurb: "One question. No correct answer.",
  },
  {
    href: "/glade/guest-book",
    title: "The Guest Book",
    blurb: "A public record of who came through.",
  },
] as const;
