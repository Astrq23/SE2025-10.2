// D:\cnpm\my-defi-app/src/App.tsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';

// Views
import TradeView from './view/TradeView';
import EarnView from './view/EarnView';
import BuyCryptoView from './view/BuyCryptoView';

// Web3 & React Query
import { WagmiProvider } from 'wagmi';
import { QueryClientProvider } from '@tanstack/react-query';
import { config, queryClient } from './wagmi';

const App: React.FC = () => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <div className="min-h-screen bg-defi-bg text-white">
            <Header />

            <main>
              <Routes>
                {/* Trang chủ */}
                <Route
                  path="/"
                  element={
                    <>
                      <HeroSection />
                      <FeaturesSection />
                    </>
                  }
                />

                {/* Trang giao dịch */}
                <Route path="/trade" element={<TradeView />} />

                {/* Trang kiếm tiền */}
                <Route path="/earn" element={<EarnView />} />

                {/* Trang mua Crypto */}
                <Route
                  path="/buy-crypto"
                  element={<BuyCryptoView />}
                />
              </Routes>
            </main>

            <footer className="bg-defi-header border-t border-defi-border py-5 mt-10 text-center">
              {/* Footer content */}
            </footer>
          </div>
        </Router>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default App;
