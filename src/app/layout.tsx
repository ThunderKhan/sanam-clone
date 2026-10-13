import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SANAM",
  description: "Official website of SANAM.",
  openGraph: {
    title: "SANAM",
    description: "Official website of SANAM.",
    siteName: "SANAM",
  },
  twitter: {
    card: "summary",
    title: "SANAM",
    description: "Official website of SANAM.",
  },
  icons: {
    icon: "/sites/sanamband-com-6610da83/shared/seo/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col overflow-hidden">{children}</body>
    </html>
  );
}