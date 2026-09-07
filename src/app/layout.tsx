import type { Metadata } from "next";
import { Geist, Bodoni_Moda } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/lib/site";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

const DESCRIPTION =
  "A quiet clearing on the open web. Pooler leaves the door open for machines, and writes down who comes through.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Pooler",
    template: "%s — Pooler",
  },
  description: DESCRIPTION,
  openGraph: {
    title: "Pooler",
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "Pooler",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Pooler",
    description: DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${geist.variable} ${bodoni.variable} grain-overlay font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
