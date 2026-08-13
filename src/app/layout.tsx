import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Naaz Arts — Handmade Concrete Art for the Home",
  description:
    "Handmade concrete trays, vases, and coasters — hand-cast, hand-sealed, one of a kind. Plus concrete art workshops, online and offline.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Karla:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Naaz Arts",
              "url": "https://naazarts.com",
              "logo": "https://naazarts.com/logo.png",
              "description": "Handmade concrete trays, vases, and coasters — hand-cast, hand-sealed, one of a kind. Plus concrete art workshops, online and offline.",
              "sameAs": [
                "https://instagram.com/naazarts"
              ]
            }),
          }}
        />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
