export default function Home() {
  return (
    <div className="grain-overlay h-screen overflow-hidden bg-black relative flex flex-col">
      {/* Ambient glow */}
      <div className="hero-glow" />

      {/* Main hero — centered */}
      <main className="flex-1 flex flex-col items-center justify-center relative z-10 px-6">
        <div className="text-center">
          <h1
            className="shimmer-text font-[family-name:var(--font-bodoni)] text-7xl sm:text-[9rem] md:text-[11rem] font-normal tracking-[0.15em] leading-none"
            style={{ animationDelay: "0s" }}
          >
            POOLER
          </h1>

          <div className="divider-glow w-16 h-px bg-white/30 mx-auto mt-6 mb-6 sm:mt-8 sm:mb-8" />

          <p className="animate-fade-up text-base sm:text-xl font-light text-white/50 tracking-[0.2em] uppercase"
             style={{ animationDelay: "0.3s" }}>
            Your voice &nbsp;&middot;&nbsp; Your device &nbsp;&middot;&nbsp; Your data
          </p>

          <p className="animate-fade-up text-xs sm:text-sm text-white/25 mt-3 tracking-wider"
             style={{ animationDelay: "0.6s" }}>
            An AI assistant that never phones home.
          </p>
        </div>
      </main>

      {/* Features — pinned bottom */}
      <footer className="relative z-10 px-6 sm:px-12 pb-8 sm:pb-10">
        <div className="max-w-5xl mx-auto">
          {/* Feature row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 sm:gap-4 mb-6 sm:mb-8">
            {[
              { label: "On-Device", desc: "Runs entirely on Apple Silicon" },
              { label: "Open Weights", desc: "Public, auditable, swappable" },
              { label: "Private by Design", desc: "No account. No telemetry. No cloud" },
            ].map((f, i) => (
              <div
                key={f.label}
                className="animate-fade-up feature-item group flex items-baseline gap-3 rounded-full px-4 py-2 -mx-4 sm:mx-0 cursor-default"
                style={{ animationDelay: `${0.8 + i * 0.15}s` }}
              >
                <span className="text-[10px] sm:text-xs font-medium tracking-[0.2em] text-white/70 uppercase whitespace-nowrap">
                  {f.label}
                </span>
                <span className="hidden sm:inline text-[10px] text-white/20">
                  {f.desc}
                </span>
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div className="animate-fade-up flex items-center justify-between border-t border-white/[0.06] pt-4"
               style={{ animationDelay: "1.3s" }}>
            <span className="text-[10px] text-white/20 tracking-[0.3em] uppercase">
              Pooler
            </span>
            <a
              href="https://github.com/pooler-core/pooler-core"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] text-white/20 tracking-wider hover:text-white/50 transition-colors duration-500"
            >
              Source
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
