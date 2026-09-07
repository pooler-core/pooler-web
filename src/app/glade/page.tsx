import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import { GLADE_ROOMS } from "@/lib/site";

export const metadata: Metadata = {
  title: "The Glade",
  description:
    "Pages that would rather be interesting than useful. Nothing here is trying to sell you anything.",
};

const ROOMS = GLADE_ROOMS;

export default function Glade() {
  return (
    <PageShell
      backHref="/"
      backLabel="Pooler"
      eyebrow="Layer three"
      title="The Glade"
      lede="Three rooms off the main path. None of them are useful, which is the point — a page that offers nothing to extract is the only honest way to ask what a visitor does when there is nothing to extract."
    >
      <ul className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
        {ROOMS.map((room) => (
          <li key={room.href}>
            <Link
              href={room.href}
              className="group flex items-baseline justify-between gap-6 py-6 transition-colors duration-300"
            >
              <span>
                <span className="font-[family-name:var(--font-bodoni)] text-xl tracking-wide text-white/80 transition-colors duration-300 group-hover:text-white">
                  {room.title}
                </span>
                <span className="mt-1.5 block text-xs leading-relaxed text-white/35">
                  {room.blurb}
                </span>
              </span>
              <span
                aria-hidden="true"
                className="text-white/20 transition-all duration-300 group-hover:translate-x-1 group-hover:text-white/60"
              >
                &rarr;
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <p className="mt-10 text-xs leading-relaxed text-white/30">
        This site is served as flat files from GitHub Pages. There is no server,
        no database and no analytics — nothing here can watch you. Anything the
        site knows about you was computed in your own browser and never left it.
        Anything recorded, you recorded yourself, on purpose, under your own
        name.
      </p>
    </PageShell>
  );
}
