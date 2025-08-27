import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const title = "RootNet";
const description = "Unity in prosperity.";

export const metadata: Metadata = {
  metadataBase: new URL("https://onroot.net"), // Add metadataBase for proper image resolution
  title: "RootNet",
  description: "Prosperity through unity.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
  },
  openGraph: {
    title,
    description,
    images: [
      {
        url: "/landing-share.png", // Fixed path - remove /public/ prefix
        width: 1200,
        height: 630,
        alt: "RootNet",
      },
    ],

    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/landing-share.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.variable}>{children}</body>
    </html>
  );
}
