// Writes an approved GitHub issue into content/messages/<year>/<month>/ as a
// markdown document.
//
// The issue payload arrives as JSON on process.env.ISSUE rather than being
// interpolated into the workflow YAML, so an issue body can never be parsed as
// shell or as workflow syntax. Frontmatter values are JSON-encoded, so a title
// containing quotes or a line of dashes cannot break out of the header.

import { mkdirSync, existsSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const MAX_BODY = 8000;
const ROOT = new URL("../content/messages/", import.meta.url).pathname;

const raw = process.env.ISSUE;
if (!raw) {
  console.error("ISSUE is not set.");
  process.exit(1);
}

const issue = JSON.parse(raw);

function slugify(text) {
  const slug = text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48)
    .replace(/-+$/, "");
  return slug || "untitled";
}

/** Everything above the trailing `---` rule; the rest is submission boilerplate. */
function extractBody(body) {
  const withoutComments = (body ?? "").replace(/<!--[\s\S]*?-->/g, "");
  const rule = withoutComments.search(/^---\s*$/m);
  const text = rule === -1 ? withoutComments : withoutComments.slice(0, rule);
  return text.trim().slice(0, MAX_BODY);
}

const body = extractBody(issue.body);
const title = (issue.title ?? "").trim();

if (!body && !title) {
  console.log(`Issue #${issue.number} says nothing. Nothing to do.`);
  process.exit(0);
}

const at = issue.created_at ?? new Date().toISOString();
const [year, month] = at.slice(0, 7).split("-");
const file = join(ROOT, year, month, `${issue.number}-${slugify(title || body)}.md`);

if (existsSync(file)) {
  console.log(`Issue #${issue.number} is already filed at ${file}.`);
  process.exit(0);
}

const header = {
  from: issue.user?.login ?? "anonymous",
  issue: issue.number,
  at,
  title: title || "Untitled",
};

const doc = [
  "---",
  ...Object.entries(header).map(([key, value]) => `${key}: ${JSON.stringify(value)}`),
  "---",
  "",
  body || "_(no body)_",
  "",
].join("\n");

mkdirSync(dirname(file), { recursive: true });
writeFileSync(file, doc);
console.log(`Filed issue #${issue.number} at ${file}.`);
