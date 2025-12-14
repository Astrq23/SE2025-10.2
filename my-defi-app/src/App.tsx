// D:\cnpm\my-defi-app/src/App.tsx

import React from 'react';
// ĐẢM BẢO CÁC IMPORTS NÀY ĐÃ ĐƯỢC THÊM:
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 

import Header from './components/Header';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection'; // Cần thiết cho Trang chủ
import TradeView from './views/TradeView'; // Cần thiết cho Trang 2

// Web3 & React Query
import { WagmiProvider } from 'wagmi';
import { QueryClientProvider } from '@tanstack/react-query';
import { config, queryClient } from './wagmi';

const App: React.FC = () => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {/* Đảm bảo Router bao bọc toàn bộ ứng dụng */}
        <Router> 
          <div className="min-h-screen bg-defi-bg text-white">
            <Header /> {/* Header sẽ luôn hiển thị */}

            <main>
              {/* ROUTES MỚI */}
              <Routes>
                {/* Trang 1: Trang chủ (/) - Gồm HeroSection và FeaturesSection */}
                <Route 
                  path="/" 
                  element={
                    <>
                      <HeroSection /> 
                      <FeaturesSection />
                    </>
                  } 
                />

                {/* Trang 2: Trang Giao dịch (/trade) */}
                <Route 
                  path="/trade" 
                  element={<TradeView />} 
                />
              </Routes>
            </main>

            {/* Footer sẽ luôn hiển thị (Giữ nguyên) */}
            <footer className="bg-defi-header border-t border-defi-border py-5 mt-10 text-center">
              {/* ... Nội dung footer ... */}
            </footer>
          </div>
        </Router> 
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default App;