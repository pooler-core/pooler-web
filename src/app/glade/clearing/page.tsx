import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import ClearingClient from "./clearing-client";

export const metadata: Metadata = {
  title: "The Clearing",
  description: "One question, and a page that will wait for an answer.",
};

export default function Clearing() {
  return (
    <PageShell
      eyebrow="Room two"
      title="The Clearing"
      lede="A page with one question on it and nothing to extract. What a visitor does here is the only interesting thing about it."
    >
      <ClearingClient />
    </PageShell>
  );
}
