import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const description =
  "Queen's Sci'96 30-year reunion — Homecoming weekend in Kingston, October 16–18, 2026.";

export const metadata: Metadata = {
  metadataBase: new URL("https://sci96.ca"),
  title: "Sci'96 — 30 Years Later · Oct 16–18, 2026",
  description,
  openGraph: {
    title: "Sci'96 — 30 Years Later",
    description,
    url: "https://sci96.ca",
    siteName: "Sci'96 Reunion",
    type: "website",
    images: [{ url: "/crest.svg", width: 1466, height: 1910, alt: "Sci'96 crest" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sci'96 — 30 Years Later",
    description,
    images: ["/crest.svg"],
  },
  icons: { icon: "/crest.svg" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
