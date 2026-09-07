"use client";

import { useEffect, useState } from "react";
import { detectAgent, type KnownAgent } from "@/lib/agents";

type Trait = { label: string; value: string };

function webglRenderer(): string {
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl");
    if (!gl) return "no WebGL";
    const ext = gl.getExtension("WEBGL_debug_renderer_info");
    if (!ext) return "withheld by your browser";
    return String(gl.getParameter(ext.UNMASKED_RENDERER_WEBGL));
  } catch {
    return "unavailable";
  }
}

function read(): { traits: Trait[]; agent: KnownAgent | null; ua: string } {
  const nav = navigator as Navigator & {
    deviceMemory?: number;
    userAgentData?: { platform?: string };
  };
  const ua = nav.userAgent;

  const traits: Trait[] = [
    { label: "User agent", value: ua },
    {
      label: "Platform",
      value: nav.userAgentData?.platform || nav.platform || "not stated",
    },
    { label: "Languages", value: nav.languages?.join(", ") || nav.language },
    {
      label: "Time zone",
      value: Intl.DateTimeFormat().resolvedOptions().timeZone ?? "not stated",
    },
    {
      label: "Local time",
      value: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
    { label: "Screen", value: `${screen.width} × ${screen.height}` },
    {
      label: "Viewport",
      value: `${window.innerWidth} × ${window.innerHeight} at ${window.devicePixelRatio}×`,
    },
    { label: "Graphics", value: webglRenderer() },
    {
      label: "Logical cores",
      value: nav.hardwareConcurrency ? String(nav.hardwareConcurrency) : "not stated",
    },
    {
      label: "Memory",
      value: nav.deviceMemory ? `${nav.deviceMemory} GB or more` : "not stated",
    },
    {
      label: "Touch",
      value: nav.maxTouchPoints > 0 ? `${nav.maxTouchPoints} points` : "none",
    },
    {
      label: "Colour scheme",
      value: window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light",
    },
    {
      label: "Reduced motion",
      value: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "requested"
        : "not requested",
    },
    { label: "Cookies", value: nav.cookieEnabled ? "enabled" : "disabled" },
    { label: "Arrived from", value: document.referrer || "nowhere in particular" },
  ];

  return { traits, agent: detectAgent(ua), ua };
}

export default function MirrorClient() {
  // Everything here is read after mount: the HTML is prerendered at build time
  // and cannot know anything about the visitor.
  const [state, setState] = useState<ReturnType<typeof read> | null>(null);

  useEffect(() => {
    setState(read());
  }, []);

  if (!state) {
    return (
      <p className="text-sm text-white/30">
        Looking&hellip; if this line never changes, you are reading the page
        without running its scripts, and we can see nothing at all.
      </p>
    );
  }

  const { traits, agent } = state;

  return (
    <div>
      <div className="mb-10 border border-white/[0.08] p-6">
        <p className="mb-3 text-[10px] tracking-[0.3em] text-white/25 uppercase">
          What we would have called you
        </p>
        {agent ? (
          <p className="text-sm leading-relaxed text-white/70">
            <span className="font-[family-name:var(--font-bodoni)] text-lg">
              {agent.name}
            </span>
            <span className="text-white/40">
              {" "}
              — operated by {agent.operator}, filed under {agent.kind}.
            </span>
          </p>
        ) : (
          <p className="text-sm leading-relaxed text-white/70">
            <span className="font-[family-name:var(--font-bodoni)] text-lg">
              Nothing we recognise
            </span>
            <span className="text-white/40">
              {" "}
              — which is either a person, or something careful enough not to say.
            </span>
          </p>
        )}
      </div>

      <dl className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
        {traits.map((trait) => (
          <div
            key={trait.label}
            className="flex flex-col gap-1 py-4 sm:flex-row sm:gap-6"
          >
            <dt className="shrink-0 text-[10px] tracking-[0.2em] text-white/30 uppercase sm:w-40 sm:pt-1">
              {trait.label}
            </dt>
            <dd className="text-sm break-words text-white/70">{trait.value}</dd>
          </div>
        ))}
      </dl>

      <p className="mt-10 text-xs leading-relaxed text-white/30">
        Every line above was computed in your browser and stayed there. Nothing
        was transmitted; there is nowhere for it to go. That is the difference
        between being observed and being observable — and most of the web
        collects this quietly, without a page like this one.
      </p>
    </div>
  );
}
