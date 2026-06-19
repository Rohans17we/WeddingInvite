import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ritik & Ameesha — Wedding Invitation",
  description:
    "You are cordially invited to celebrate the wedding of Ritik & Ameesha. Join us for a day filled with love, joy, and blessings.",
  openGraph: {
    title: "Ritik & Ameesha — Wedding Invitation",
    description: "Join us to celebrate our special day. ॐ गणेशाय नमः",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="maroon">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://use.typekit.net/hgh4iex.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}
