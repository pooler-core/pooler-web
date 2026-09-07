import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import { REPO, traceUrl } from "@/lib/site";
import guestBook from "../../../../content/guest-book.json";

export const metadata: Metadata = {
  title: "The Guest Book",
  description:
    "A public record of who came through, kept in the repository itself.",
};

type Entry = {
  id: number;
  who: string;
  at: string;
  said: string;
  issue: number | null;
};

const entries = [...(guestBook.entries as Entry[])].sort((a, b) => b.id - a.id);

const signHref = traceUrl({
  title: "Guest book: ",
  body: [
    "<!-- Put your entry below. The first line becomes the entry. -->",
    "",
    "",
    "---",
    "Filed against the Pooler guest book. A maintainer labels approved entries,",
    "which appends them to content/guest-book.json and rebuilds the site.",
  ].join("\n"),
  labels: ["guest-book"],
});

export default function GuestBook() {
  return (
    <PageShell
      eyebrow="Room three"
      title="The Guest Book"
      lede="Every entry below is a line in a JSON file in this repository. There is no database — the git history is the database, and its whole contents are on this page."
    >
      <ol className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
        {entries.map((entry) => (
          <li key={entry.id} className="py-6">
            <div className="flex items-baseline justify-between gap-4">
              <span className="font-[family-name:var(--font-bodoni)] text-lg tracking-wide text-white/80">
                {entry.who}
              </span>
              <span className="shrink-0 text-[10px] tracking-[0.2em] text-white/25 uppercase">
                {entry.at}
              </span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-white/55">
              {entry.said}
            </p>
            {entry.issue ? (
              <a
                href={`https://github.com/${REPO}/issues/${entry.issue}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-[10px] tracking-wider text-white/20 transition-colors duration-300 hover:text-white/50"
              >
                #{entry.issue}
              </a>
            ) : null}
          </li>
        ))}
      </ol>

      <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
        <a
          href={signHref}
          target="_blank"
          rel="noopener noreferrer"
          className="border border-white/25 px-5 py-2.5 text-[10px] tracking-[0.25em] text-white/80 uppercase transition-colors duration-300 hover:border-white/60 hover:text-white"
        >
          Sign it
        </a>
        <span className="text-[10px] tracking-wider text-white/25">
          Opens an issue on GitHub, signed by you.
        </span>
      </div>

      <p className="mt-12 text-xs leading-relaxed text-white/30">
        A static site cannot accept writes — it has no server to accept them
        with, and any credential it carried to write on your behalf would be
        readable by everyone who loaded the page. So it does not carry one. You
        sign under your own GitHub account, a maintainer approves the entry, and
        a workflow appends it to the file and rebuilds the site. Slow, public,
        and impossible to do quietly.
      </p>
    </PageShell>
  );
}
