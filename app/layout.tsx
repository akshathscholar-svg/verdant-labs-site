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

export const metadata: Metadata = {
  metadataBase: new URL("https://verdantlabs.app"),
  title: "Verdant Labs - Botanical Intelligence",
  description: "Verdant Labs builds Canopy AI, a botanical intelligence system for predictive plant care.",
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-64.png", sizes: "64x64", type: "image/png" },
    ],
    shortcut: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Verdant Labs - Botanical Intelligence",
    description:
      "Canopy AI helps plant owners detect environmental stress early and act with confidence.",
    siteName: "Verdant Labs",
    type: "website",
    images: [
      {
        url: "/logo-icon-512.png",
        width: 512,
        height: 512,
        alt: "Verdant Labs",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Verdant Labs - Botanical Intelligence",
    description:
      "Canopy AI helps plant owners detect environmental stress early and act with confidence.",
    images: ["/logo-icon-512.png"],
  },
};

import ThemeProvider from './components/ThemeProvider';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Verdant Labs',
    url: 'https://verdantlabs.app',
    logo: 'https://verdantlabs.app/logo-icon-512.png',
    description:
      'Verdant Labs builds Canopy AI, a botanical intelligence system for predictive plant care.',
    founder: {
      '@type': 'Person',
      name: 'Akshath Saravanan',
    },
    sameAs: [],
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
