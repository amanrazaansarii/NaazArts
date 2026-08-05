import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { B2BPage } from './pages/B2BPage';
import { AboutPage } from './pages/AboutPage';

import { QuickViewModal } from './components/QuickViewModal';
import { CartDrawer } from './components/CartDrawer';
import { B2BInquiryModal } from './components/B2BInquiryModal';
import { SearchModal } from './components/SearchModal';

export function App() {
  const [activePage, setActivePage] = useState<'home' | 'shop' | 'b2b' | 'about'>('home');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activePage]);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header Navigation */}
      <Header onNavigate={setActivePage} activePage={activePage} />

      {/* Main Content View */}
      <main style={{ flexGrow: 1 }}>
        {activePage === 'home' && <HomePage onNavigate={setActivePage} />}
        {activePage === 'shop' && <ShopPage />}
        {activePage === 'b2b' && <B2BPage />}
        {activePage === 'about' && <AboutPage />}
      </main>

      {/* Footer */}
      <Footer onNavigate={setActivePage} />

      {/* Modals & Overlays */}
      <QuickViewModal />
      <CartDrawer />
      <B2BInquiryModal />
      <SearchModal />
    </div>
  );
}

export default App;
