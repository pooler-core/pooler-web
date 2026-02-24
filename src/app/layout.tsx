import type { Metadata } from "next";
import { Geist, Bodoni_Moda } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "Pooler",
  description:
    "Your voice. Your device. Your data. An AI assistant that never phones home.",
  openGraph: {
    title: "Pooler",
    description:
      "An on-device AI assistant with open weights. Private by design.",
    url: "https://pooler-core.github.io/pooler-core",
    siteName: "Pooler",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Pooler",
    description:
      "An on-device AI assistant with open weights. Private by design.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geist.variable} ${bodoni.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
