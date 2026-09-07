"use client";

import { useMemo, useState } from "react";
import { traceUrl } from "@/lib/site";

const QUESTION = "Why are you here?";

export default function ClearingClient() {
  const [answer, setAnswer] = useState("");
  const trimmed = answer.trim();

  const href = useMemo(
    () =>
      traceUrl({
        title: `The Clearing — ${new Date().toISOString().slice(0, 10)}`,
        body: [
          `> ${QUESTION}`,
          "",
          trimmed || "_(left blank)_",
          "",
          "---",
          "Left at the Clearing. Submitting this opens an issue under your own",
          "GitHub account — the site holds no credentials and cannot write on",
          "your behalf. Edit or delete anything below before you post it.",
        ].join("\n"),
        labels: ["clearing"],
      }),
    [trimmed]
  );

  return (
    <div>
      <p className="font-[family-name:var(--font-bodoni)] text-3xl leading-snug tracking-wide text-white/85 sm:text-4xl">
        {QUESTION}
      </p>

      <label htmlFor="answer" className="sr-only">
        Your answer
      </label>
      <textarea
        id="answer"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        rows={6}
        placeholder="The page will wait as long as you like."
        className="mt-8 w-full resize-y border border-white/[0.08] bg-white/[0.02] p-4 text-sm leading-relaxed text-white/80 transition-colors duration-300 outline-none placeholder:text-white/20 focus:border-white/25"
      />

      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-disabled={!trimmed}
          onClick={(e) => {
            if (!trimmed) e.preventDefault();
          }}
          className={
            trimmed
              ? "border border-white/25 px-5 py-2.5 text-[10px] tracking-[0.25em] text-white/80 uppercase transition-colors duration-300 hover:border-white/60 hover:text-white"
              : "pointer-events-none border border-white/[0.08] px-5 py-2.5 text-[10px] tracking-[0.25em] text-white/20 uppercase"
          }
        >
          Leave it here
        </a>
        <span className="text-[10px] tracking-wider text-white/25">
          Opens GitHub. You post it, under your name, or you close the tab.
        </span>
      </div>

      <p className="mt-12 text-xs leading-relaxed text-white/30">
        Nothing is sent as you type. There is no server on the other end of this
        page — it is a flat file. The only way anything you write becomes part of
        the site is if you carry it there yourself, which is a strange amount of
        friction for a guest book, and exactly the amount required to keep the
        promise on the front page.
      </p>
    </div>
  );
}
