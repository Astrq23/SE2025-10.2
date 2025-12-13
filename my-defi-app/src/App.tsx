// D:\cnpm\my-defi-app/src/App.tsx (PHIÊN BẢN ĐÃ FIX ĐỂ HIỂN THỊ GIAO DIỆN DEFI)
import React from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection'; 
import FeaturesSection from './components/FeaturesSection';

// Import cấu hình Web3
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { config } from './wagmi'

const queryClient = new QueryClient()

const App: React.FC = () => {
  return (
    // Bọc ứng dụng với Wagmi và React Query Providers
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        
        <div className="min-h-screen bg-defi-bg text-white">
          <Header />
          
          <main>
            <HeroSection /> 
            <FeaturesSection />
          </main>

          <footer className="bg-defi-header border-t border-defi-border py-5 mt-10 text-center">
            <div className="flex justify-center space-x-6 mb-3">
                <a href="#" className="text-[#b8c0cc] hover:text-defi-primary transition">Cộng đồng</a>
                <a href="#" className="text-[#b8c0cc] hover:text-defi-primary transition">Tài liệu</a>
                <a href="#" className="text-[#b8c0cc] hover:text-defi-primary transition">Hỗ trợ</a>
            </div>
            <p className="text-[#5d677a] text-sm">© 2025 My DeFi Project. All rights reserved.</p>
          </footer>
        </div>

      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default App;