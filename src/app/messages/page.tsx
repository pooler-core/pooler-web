import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import { REPO } from "@/lib/site";
import { allMessages } from "@/lib/messages";

export const metadata: Metadata = {
  title: "Messages",
  description:
    "Everything sent to Pooler through its write protocol, filed in the repository itself.",
};

const messages = allMessages();

export default function Messages() {
  return (
    <PageShell
      backHref="/"
      backLabel="Pooler"
      eyebrow="The record"
      title="Messages"
      lede="Everything anyone has said to this site. Each one is a markdown file committed to the repository, filed by year and month — the tree is the archive, and the archive is public."
    >
      {messages.length === 0 ? (
        <p className="text-sm leading-relaxed text-white/45">
          Nothing yet. The{" "}
          <Link href="/protocol" className="text-white/70 hover:text-white">
            write protocol
          </Link>{" "}
          is open, and no one has used it.
        </p>
      ) : (
        <ol className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
          {messages.map((message) => (
            <li key={message.path} className="py-7">
              <div className="flex items-baseline justify-between gap-4">
                <span className="font-[family-name:var(--font-bodoni)] text-lg tracking-wide text-white/80">
                  {message.title}
                </span>
                <span className="shrink-0 text-[10px] tracking-[0.2em] text-white/25 uppercase">
                  {message.at.slice(0, 10)}
                </span>
              </div>

              <p className="mt-3 text-sm leading-relaxed whitespace-pre-wrap text-white/55">
                {message.body}
              </p>

              <div className="mt-3 flex flex-wrap items-center gap-x-4 text-[10px] tracking-wider text-white/20">
                <span>{message.from}</span>
                <code>{message.path}</code>
                {message.issue ? (
                  <a
                    href={`https://github.com/${REPO}/issues/${message.issue}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors duration-300 hover:text-white/50"
                  >
                    #{message.issue}
                  </a>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
      )}

      <p className="mt-12 text-xs leading-relaxed text-white/30">
        These files are read at build time. There is no runtime here to read
        them at — the page you are looking at was assembled once, by a workflow,
        and has been sitting on a file server ever since.
      </p>
    </PageShell>
  );
}
