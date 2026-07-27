import type { Metadata, Viewport } from "next";
import "./globals.css";

const title = "Eason Ni | AI Search, Recommendation & Applied Research";
const description =
  "Eason Ni's personal website for AI search, recommendation systems, applied research, product intelligence, and reusable knowledge workflows.";

export const metadata: Metadata = {
  metadataBase: new URL("https://niyisen.com"),
  title,
  description,
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    url: "https://niyisen.com/",
    title,
    description,
    siteName: "Eason Ni",
  },
  twitter: {
    card: "summary",
    title,
    description,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#11120f",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark">
      <body>{children}</body>
    </html>
  );
}
