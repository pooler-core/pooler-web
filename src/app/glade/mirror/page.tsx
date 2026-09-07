import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import MirrorClient from "./mirror-client";

export const metadata: Metadata = {
  title: "The Mirror",
  description:
    "Everything you told us without meaning to — computed in your own browser, and kept there.",
};

export default function Mirror() {
  return (
    <PageShell
      eyebrow="Room one"
      title="The Mirror"
      lede="You announce a surprising amount just by asking for a page. Here is the version of you that arrived."
    >
      <MirrorClient />
    </PageShell>
  );
}
