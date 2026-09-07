import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

export type Message = {
  from: string;
  issue: number | null;
  at: string;
  title: string;
  body: string;
  /** Repo-relative path, which doubles as the message's place in the tree. */
  path: string;
};

const ROOT = join(process.cwd(), "content", "messages");

function walk(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) return walk(full);
    return entry.name.endsWith(".md") ? [full] : [];
  });
}

/**
 * Frontmatter values are written as JSON by the ingest script, so a title
 * containing a quote, a newline or a line of dashes cannot break out of the
 * header block.
 */
function parse(raw: string, path: string): Message | null {
  if (!raw.startsWith("---\n")) return null;
  const end = raw.indexOf("\n---\n", 4);
  if (end === -1) return null;

  const header: Record<string, unknown> = {};
  for (const line of raw.slice(4, end).split("\n")) {
    const colon = line.indexOf(":");
    if (colon === -1) continue;
    const key = line.slice(0, colon).trim();
    try {
      header[key] = JSON.parse(line.slice(colon + 1).trim());
    } catch {
      return null;
    }
  }

  return {
    from: typeof header.from === "string" ? header.from : "anonymous",
    issue: typeof header.issue === "number" ? header.issue : null,
    at: typeof header.at === "string" ? header.at : "",
    title: typeof header.title === "string" ? header.title : "",
    body: raw.slice(end + 5).trim(),
    path,
  };
}

/** Read at build time. There is no runtime on a static host to read at. */
export function allMessages(): Message[] {
  if (!existsSync(ROOT)) return [];

  return walk(ROOT)
    .map((file) => parse(readFileSync(file, "utf8"), file.slice(process.cwd().length + 1)))
    .filter((message): message is Message => message !== null)
    .sort((a, b) => b.at.localeCompare(a.at));
}
