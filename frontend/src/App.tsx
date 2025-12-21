// src/App.tsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WagmiProvider } from 'wagmi';
import { QueryClientProvider } from '@tanstack/react-query';

// --- 1. IMPORT TOASTIFY ---
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import Config
import { config, queryClient } from './wagmi';

// Import Components
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import Footer from './components/Footer'; // <--- IMPORT FOOTER MỚI

// Import Views
import TradeView from './view/TradeChartView'; 
import MintView from './view/MintView';
import EarnView from './view/EarnView';
import BuyCryptoView from './view/BuyCryptoView';
import TokenManagementView from './view/TokenManagementView';

const App: React.FC = () => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <Router>
          {/* Thêm class 'flex flex-col' để bố cục trang trải dài theo chiều dọc,
             giúp Footer luôn bị đẩy xuống đáy.
          */}
          <div className="min-h-screen bg-slate-900 text-white font-sans flex flex-col">
            
            <Header />

            {/* Thêm class 'flex-grow' để phần nội dung chính chiếm hết khoảng trống còn lại */}
            <main className="flex-grow">
              <Routes>
                {/* Trang chủ */}
                <Route path="/" element={<><HeroSection /><FeaturesSection /></>} />

                {/* Trang Chức năng */}
                <Route path="/trade" element={<TradeView />} />
                <Route path="/mint" element={<MintView />} />
                
                {/* Các trang giữ chỗ */}
                <Route path="/earn" element={<EarnView />} />
                <Route path="/buy-crypto" element={<BuyCryptoView />} />
                <Route path="/tokens" element={<TokenManagementView />} />
              </Routes>
            </main>

            {/* --- 2. SỬ DỤNG COMPONENT FOOTER MỚI --- */}
            <Footer />
            {/* --------------------------------------- */}

            {/* --- 3. TOAST CONTAINER --- */}
            <ToastContainer 
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
            />

          </div>
        </Router>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default App;