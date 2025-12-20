import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WagmiProvider } from 'wagmi';
import { QueryClientProvider } from '@tanstack/react-query';

// Cần đảm bảo bạn đã copy file wagmi.tsx vào frontend/src
import { config, queryClient } from './wagmi';

// Import Components (Đã copy từ my-defi-app)
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';

// Import Views (Đã copy từ my-defi-app)
import TradeView from './view/TradeChartView';
import MintView from './view/MintView';
// Các view khác nếu có
import EarnView from './view/EarnView';
import BuyCryptoView from './view/BuyCryptoView';
import TokenManagementView from './view/TokenManagementView';

const App: React.FC = () => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <Router>
          {/* Container chính: Màu nền tối */}
          <div className="min-h-screen bg-slate-900 text-white font-sans">
            
            <Header />

            <main>
              <Routes>
                {/* Trang chủ */}
                <Route path="/" element={<><HeroSection /><FeaturesSection /></>} />

                {/* Trang Chức năng */}
                <Route path="/trade" element={<TradeView />} />
                <Route path="/mint" element={<MintView />} />
                
                {/* Các trang giữ chỗ (Placeholder) */}
                <Route path="/earn" element={<EarnView />} />
                <Route path="/buy-crypto" element={<BuyCryptoView />} />
                <Route path="/tokens" element={<TokenManagementView />} />
              </Routes>
            </main>

            <footer className="border-t border-slate-800 py-8 mt-12 text-center text-slate-500">
              <p>© 2025 Zenith Portal. All rights reserved.</p>
            </footer>

          </div>
        </Router>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default App;