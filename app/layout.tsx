import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  // =====================================================
  // BASE URL
  // =====================================================

  metadataBase: new URL(
    "https://daniel-dan-erni.vercel.app"
  ),

  // =====================================================
  // BASIC SEO
  // =====================================================

  title: {
    default: "Daniel & Erni | Undangan Pernikahan",
    template: "%s | Daniel & Erni",
  },

  description:
    "Dengan penuh sukacita, kami mengundang Anda untuk hadir dan berbagi kebahagiaan dalam pernikahan Daniel & Erni.",

  keywords: [
    "Daniel & Erni",
    "Undangan Pernikahan",
    "Undangan Digital",
    "Wedding Invitation",
  ],

  authors: [
    {
      name: "Daniel & Erni",
    },
  ],

  creator: "Daniel & Erni",
  publisher: "Daniel & Erni",

  // =====================================================
  // ICON
  // =====================================================

  icons: {
    icon: "/images/favicon.png",
    shortcut: "/images/favicon.png",
    apple: "/images/favicon.png",
  },

  // =====================================================
  // OPEN GRAPH
  // =====================================================

  openGraph: {
    type: "website",

    locale: "id_ID",

    url: "https://daniel-dan-erni.vercel.app",

    siteName: "Daniel & Erni",

    title: "Daniel & Erni | Undangan Pernikahan",

    description:
      "Dengan penuh sukacita, kami mengundang Anda untuk hadir dan berbagi kebahagiaan dalam pernikahan Daniel & Erni.",

    images: [
      {
        url: "/images/og-image.jpg",
        width: 630,
        height: 1200,
        alt: "Daniel & Erni - Undangan Pernikahan",
      },
    ],
  },

  // =====================================================
  // TWITTER / X
  // =====================================================

  twitter: {
    card: "summary_large_image",

    title: "Daniel & Erni | Undangan Pernikahan",

    description:
      "Dengan penuh sukacita, kami mengundang Anda untuk hadir dan berbagi kebahagiaan dalam pernikahan Daniel & Erni.",

    images: [
      {
        url: "/images/og-image.jpg",
        width: 630,
        height: 1200,
        alt: "Daniel & Erni - Undangan Pernikahan",
      },
    ],
  },

  // =====================================================
  // ROBOTS
  // =====================================================

  robots: {
    index: true,
    follow: true,
  },
}

// =====================================================
// ROOT LAYOUT
// =====================================================

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      {children}
    </html>
  )
}