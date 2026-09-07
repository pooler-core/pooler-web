import Link from "next/link";
import type { ReactNode } from "react";

export default function PageShell({
  eyebrow,
  title,
  lede,
  backHref = "/glade",
  backLabel = "The Glade",
  children,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  backHref?: string;
  backLabel?: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto flex min-h-dvh max-w-2xl flex-col px-6 py-12 sm:px-8 sm:py-20">
      <Link
        href={backHref}
        className="text-[10px] tracking-[0.25em] text-white/30 uppercase transition-colors duration-300 hover:text-white/70"
      >
        &larr;&nbsp; {backLabel}
      </Link>

      <header className="mt-12 sm:mt-16">
        {eyebrow ? (
          <p className="mb-4 text-[10px] tracking-[0.3em] text-white/25 uppercase">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="font-[family-name:var(--font-bodoni)] text-4xl leading-tight font-normal tracking-wide sm:text-5xl">
          {title}
        </h1>
        {lede ? (
          <p className="mt-5 text-sm leading-relaxed text-white/45 sm:text-base">
            {lede}
          </p>
        ) : null}
      </header>

      <main className="mt-12 flex-1 sm:mt-16">{children}</main>

      <footer className="mt-16 flex items-center justify-between border-t border-white/[0.06] pt-5">
        <Link
          href="/"
          className="text-[10px] tracking-[0.3em] text-white/20 uppercase transition-colors duration-300 hover:text-white/50"
        >
          Pooler
        </Link>
        <a
          href="https://github.com/pooler-core/pooler-web"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] tracking-wider text-white/20 transition-colors duration-500 hover:text-white/50"
        >
          Source
        </a>
      </footer>
    </div>
  );
}
