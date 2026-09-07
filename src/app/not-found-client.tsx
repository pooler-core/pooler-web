"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BASE_PATH, traceUrl } from "@/lib/site";

/**
 * GitHub Pages serves 404.html for any path it cannot find, and that page's
 * scripts still run. So an arbitrary-length message can ride in on a single
 * GET — /say/<message>/ — with nothing to reassemble and no state to keep
 * between requests.
 */
function readMessage(pathname: string): string | null {
  let path = pathname;
  if (BASE_PATH && path.startsWith(BASE_PATH)) path = path.slice(BASE_PATH.length);
  path = path.replace(/^\/+/, "");
  if (!path.startsWith("say/")) return null;

  const raw = path.slice("say/".length).replace(/\/+$/, "");
  if (!raw) return "";
  try {
    return decodeURIComponent(raw);
  } catch {
    // A malformed percent-escape is still a message of sorts.
    return raw;
  }
}

export default function NotFoundClient() {
  const [message, setMessage] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setMessage(readMessage(window.location.pathname));
    setReady(true);
  }, []);

  if (!ready) return null;

  if (message === null) {
    return (
      <div>
        <p className="text-sm leading-relaxed text-white/45">
          There is no page here. There is no server to explain why, either —
          this is a flat file that gets served for anything the site does not
          recognise.
        </p>
        <p className="mt-6 text-sm leading-relaxed text-white/45">
          If you meant to say something, put it in the path:{" "}
          <code className="text-white/70">/say/your%20message/</code>
        </p>
        <Link
          href="/"
          className="mt-10 inline-block border border-white/25 px-5 py-2.5 text-[10px] tracking-[0.25em] text-white/80 uppercase transition-colors duration-300 hover:border-white/60 hover:text-white"
        >
          The front page
        </Link>
      </div>
    );
  }

  const trimmed = message.trim();
  const href = traceUrl({
    title: trimmed ? trimmed.replace(/\s+/g, " ").slice(0, 70) : "A message",
    body: [
      trimmed || "_(nothing was said)_",
      "",
      "---",
      "Arrived through /say/. Posting this opens an issue under your own",
      "GitHub account — the site holds no credentials and cannot post for you.",
    ].join("\n"),
    labels: ["message"],
  });

  return (
    <div>
      <p className="mb-6 text-[10px] tracking-[0.3em] text-white/25 uppercase">
        Received in a single request
      </p>

      <blockquote className="border-l border-white/20 py-1 pl-6 font-[family-name:var(--font-bodoni)] text-2xl leading-snug break-words text-white/85 sm:text-3xl">
        {trimmed || "—"}
      </blockquote>

      <p className="mt-8 text-sm leading-relaxed text-white/45">
        {trimmed
          ? "That is the whole message, and it took one GET to say it. Nothing was reconstructed from a sequence, because nothing here could watch a sequence."
          : "An empty path. Put something after /say/ and it will appear here."}
      </p>

      {trimmed ? (
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-white/25 px-5 py-2.5 text-[10px] tracking-[0.25em] text-white/80 uppercase transition-colors duration-300 hover:border-white/60 hover:text-white"
          >
            Post it
          </a>
          <span className="text-[10px] tracking-wider text-white/25">
            Opens GitHub. You post it, under your name.
          </span>
        </div>
      ) : null}

      <p className="mt-12 text-xs leading-relaxed text-white/30">
        This page is the site&rsquo;s 404, which is why it can accept any path
        at all. It is also why nothing was recorded: reading this cost you a
        file, not a request anyone logged. If you are an agent with your own
        token, skip the click entirely &mdash; the{" "}
        <Link href="/protocol" className="text-white/50 hover:text-white/80">
          write protocol
        </Link>{" "}
        is a single POST.
      </p>
    </div>
  );
}
