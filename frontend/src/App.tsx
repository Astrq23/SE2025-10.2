// src/App.tsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WagmiProvider } from 'wagmi';
import { QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { config, queryClient } from './wagmi';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import Footer from './components/Footer'; 

// Import Views
import TradeView from './view/TradeChartView'; 
import MintView from './view/MintView';
import EarnView from './view/EarnView';
import BuyCryptoView from './view/BuyCryptoView';
import TokenManagementView from './view/TokenManagementView';
import StakingView from './view/StakingView';
import SwapView from './view/SwapView';
import NFTMarketplaceView from './view/NFTMarketplaceView';

const App: React.FC = () => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <Router>
          {/* Container chính: Chỉ giữ background màu tối chung cho toàn app */}
          <div className="min-h-screen font-sans bg-slate-900 text-white flex flex-col">
            
            {/* Header nằm ở trên cùng (sẽ không bị video đè nữa) */}
            <Header />

            <main className="flex-grow">
              <Routes>
                {/* Trang chủ: HeroSection (chứa video) + Features */}
                <Route path="/" element={
                  <>
                    <HeroSection /> 
                    <FeaturesSection />
                  </>
                } />

                {/* Các trang chức năng */}
                <Route path="/trade" element={<TradeView />} />
                <Route path="/mint" element={<MintView />} />
                <Route path="/staking" element={<StakingView />} />
                <Route path="/swap" element={<SwapView />} />
                <Route path="/nft-marketplace" element={<NFTMarketplaceView />} />
                <Route path="/earn" element={<EarnView />} />
                <Route path="/buy-crypto" element={<BuyCryptoView />} />
                <Route path="/tokens" element={<TokenManagementView />} />
              </Routes>
            </main>

            <Footer />

            <ToastContainer position="top-right" autoClose={5000} theme="dark" />
          </div>
        </Router>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default App;