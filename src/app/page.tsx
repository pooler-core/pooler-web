export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Hero */}
      <main className="flex flex-col items-center justify-center min-h-[85vh] px-6">
        <div className="text-center max-w-2xl">
          <h1 className="text-6xl sm:text-8xl font-extralight tracking-[0.25em] mb-6 text-zinc-200/90">
            POOLER
          </h1>

          <div className="w-20 h-px bg-gradient-to-r from-transparent via-zinc-500/50 to-transparent mx-auto mb-8" />

          <p className="text-xl sm:text-2xl font-light text-zinc-400/90 mb-4 tracking-wide">
            Your voice. Your device. Your data.
          </p>

          <p className="text-sm sm:text-base text-zinc-500/80 mb-10">
            An AI assistant that never phones home.
          </p>

          <div className="flex gap-4 justify-center">
            <a
              href="https://github.com/pooler-core/pooler-core"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 text-sm tracking-wider text-zinc-300 border border-zinc-700 rounded hover:border-zinc-500 hover:text-zinc-100 transition-colors"
            >
              GitHub
            </a>
            <span className="px-6 py-2.5 text-sm tracking-wider text-zinc-600 border border-zinc-800 rounded cursor-default">
              Coming Soon
            </span>
          </div>
        </div>
      </main>

      {/* Features */}
      <section className="max-w-4xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div className="space-y-2">
            <h3 className="text-sm font-medium tracking-wider text-zinc-300 uppercase">
              On-Device
            </h3>
            <p className="text-sm text-zinc-500 leading-relaxed">
              Runs entirely on Apple Silicon. Nothing leaves your iPhone or Mac.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium tracking-wider text-zinc-300 uppercase">
              Open Weights
            </h3>
            <p className="text-sm text-zinc-500 leading-relaxed">
              Every model is public, auditable, and swappable. No black box.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium tracking-wider text-zinc-300 uppercase">
              Pick Your Models
            </h3>
            <p className="text-sm text-zinc-500 leading-relaxed">
              Choose what runs on your device at first launch. Swap anytime.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium tracking-wider text-zinc-300 uppercase">
              Private by Design
            </h3>
            <p className="text-sm text-zinc-500 leading-relaxed">
              No account. No telemetry. No cloud. The app is the product.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800/50 py-8 px-6">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <span className="text-xs text-zinc-600 tracking-wider">Pooler</span>
          <a
            href="https://github.com/pooler-core/pooler-core"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors"
          >
            Source
          </a>
        </div>
      </footer>
    </div>
  );
}
