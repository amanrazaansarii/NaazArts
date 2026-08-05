import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { QuickViewModal } from '@/components/QuickViewModal';
import { CartDrawer } from '@/components/CartDrawer';
import { B2BInquiryModal } from '@/components/B2BInquiryModal';
import { SearchModal } from '@/components/SearchModal';

export const metadata: Metadata = {
  title: 'NaazArts | Artisanal Small-Batch Concrete Decor & Candle Jars',
  description: 'NaazArts pours small-batch handmade concrete trays, jars, candle holders, vases, and DIY kits. B2C retail and B2B wholesale customization available for candle makers.',
  keywords: ['concrete decor', 'candle jars', 'handmade trays', 'small batch concrete', 'candle vessels B2B', 'DIY concrete kit']
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Josefin+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />

        <main style={{ flexGrow: 1 }}>
          {children}
        </main>

        <Footer />

        {/* Global Client Overlay Modals */}
        <QuickViewModal />
        <CartDrawer />
        <B2BInquiryModal />
        <SearchModal />
      </body>
    </html>
  );
}
