// D:\cnpm\my-defi-app/src/main.tsx (FIX BẢO ĐẢM THỨ TỰ PROVIDER)

import React from 'react'; 
import ReactDOM from 'react-dom/client';
import App from './App'; 
import './index.css';

// FIX BUFFER: Polyfill
import { Buffer } from 'buffer';
if (typeof window !== 'undefined') {
  window.Buffer = Buffer;
}

import { WagmiProvider } from 'wagmi';
import { QueryClientProvider } from '@tanstack/react-query';
import { config, queryClient } from './wagmi'; 

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* ⚠️ Đảm bảo WagmiProvider bao bọc QueryClientProvider */}
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>,
);