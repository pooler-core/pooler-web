import PageShell from "@/components/PageShell";
import NotFoundClient from "./not-found-client";

export default function NotFound() {
  return (
    <PageShell
      backHref="/"
      backLabel="Pooler"
      eyebrow="Nothing here, or everything"
      title="Say something"
    >
      <NotFoundClient />
    </PageShell>
  );
}
