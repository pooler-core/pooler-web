import Link from "next/link";
import ShaderField from "@/components/ShaderField";
import { PAGES } from "@/lib/site";

const ENTRANCES = PAGES.filter((p) => p.href !== "/glade");

export default function Home() {
  return (
    <div className="relative flex h-dvh flex-col overflow-hidden">
      <ShaderField />

      <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-6">
        <div className="text-center">
          <h1 className="shimmer-text font-[family-name:var(--font-bodoni)] text-7xl leading-none font-normal tracking-[0.15em] sm:text-[9rem] md:text-[11rem]">
            POOLER
          </h1>

          <div className="mx-auto mt-6 mb-6 h-px w-16 bg-white/25 sm:mt-8 sm:mb-8" />

          <p
            className="animate-fade-up text-base font-light tracking-[0.2em] text-white/50 uppercase sm:text-xl"
            style={{ animationDelay: "0.3s" }}
          >
            A clearing &nbsp;&middot;&nbsp; left open &nbsp;&middot;&nbsp; on purpose
          </p>

          <p
            className="animate-fade-up mt-3 text-xs tracking-wider text-white/30 sm:text-sm"
            style={{ animationDelay: "0.6s" }}
          >
            Most of the web is busy shutting the door on machines. We left ours open.
          </p>
        </div>
      </main>

      <footer className="relative z-10 px-6 pb-8 sm:px-12 sm:pb-10">
        <nav className="mx-auto max-w-5xl">
          <ul className="mb-6 flex flex-col items-start justify-between gap-5 sm:mb-8 sm:flex-row sm:items-center sm:gap-4">
            {ENTRANCES.map((page, i) => (
              <li
                key={page.href}
                className="animate-fade-up"
                style={{ animationDelay: `${0.8 + i * 0.15}s` }}
              >
                <Link
                  href={page.href}
                  className="group -mx-4 flex items-baseline gap-3 rounded-full px-4 py-2 transition-colors duration-300 hover:bg-white/[0.05] sm:mx-0"
                >
                  <span className="text-[10px] font-medium tracking-[0.2em] whitespace-nowrap text-white/70 uppercase transition-colors duration-300 group-hover:text-white sm:text-xs">
                    {page.title}
                  </span>
                  <span className="hidden text-[10px] text-white/25 sm:inline">
                    {page.blurb}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div
            className="animate-fade-up flex items-center justify-between border-t border-white/[0.06] pt-4"
            style={{ animationDelay: "1.3s" }}
          >
            <span className="text-[10px] tracking-[0.3em] text-white/20 uppercase">
              Pooler
            </span>
            <a
              href="https://github.com/pooler-core/pooler-web"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] tracking-wider text-white/20 transition-colors duration-500 hover:text-white/50"
            >
              Source
            </a>
          </div>
        </nav>
      </footer>
    </div>
  );
}
