// Appends an approved GitHub issue to content/guest-book.json.
//
// The issue payload arrives as JSON on process.env.ISSUE rather than being
// interpolated into the workflow YAML, so an issue body can never be parsed as
// shell or as workflow syntax.

import { readFileSync, writeFileSync } from "node:fs";

const FILE = new URL("../content/guest-book.json", import.meta.url);
const MAX_LENGTH = 280;

const raw = process.env.ISSUE;
if (!raw) {
  console.error("ISSUE is not set.");
  process.exit(1);
}

const issue = JSON.parse(raw);

/** The entry is the first line of the body that carries actual content. */
function extractSaid(body) {
  const withoutComments = (body ?? "").replace(/<!--[\s\S]*?-->/g, "");
  for (const line of withoutComments.split("\n")) {
    const text = line.trim();
    if (!text) continue;
    if (text === "---") break; // everything past the rule is boilerplate
    return text.replace(/\s+/g, " ").slice(0, MAX_LENGTH);
  }
  return "";
}

const said = extractSaid(issue.body);
if (!said) {
  console.log(`Issue #${issue.number} has no usable entry. Nothing to do.`);
  process.exit(0);
}

const book = JSON.parse(readFileSync(FILE, "utf8"));

if (book.entries.some((entry) => entry.issue === issue.number)) {
  console.log(`Issue #${issue.number} is already in the guest book.`);
  process.exit(0);
}

book.entries.push({
  id: Math.max(0, ...book.entries.map((entry) => entry.id)) + 1,
  who: issue.user?.login ?? "anonymous",
  at: (issue.created_at ?? new Date().toISOString()).slice(0, 10),
  said,
  issue: issue.number,
});

writeFileSync(FILE, `${JSON.stringify(book, null, 2)}\n`);
console.log(`Added issue #${issue.number} to the guest book.`);
