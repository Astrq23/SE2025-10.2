// src/components/WalletLogin.tsx
// PHIÊN BẢN MỚI: Đã loại bỏ backend, chỉ kết nối ví trực tiếp

import React from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { injected } from 'wagmi/connectors';

const WalletLogin: React.FC = () => {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();

  // Xử lý kết nối ví
  const handleLogin = () => {
    connect({ connector: injected() });
  };

  // 1. Trạng thái ĐÃ ĐĂNG NHẬP
  if (isConnected && address) {
    return (
      <div className="flex items-center gap-3 bg-slate-800/80 backdrop-blur px-4 py-2 rounded-xl border border-slate-700 shadow-sm">
        {/* Chấm xanh online */}
        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.6)]"></div>
        
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
            Connected
          </span>
          <span className="text-sm font-mono font-bold text-white tracking-wide">
            {address.slice(0, 6)}...{address.slice(-4)}
          </span>
        </div>

        {/* Nút thoát */}
        <button
          onClick={() => disconnect()}
          className="ml-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 p-2 rounded-lg transition-all"
          title="Ngắt kết nối"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
        </button>
      </div>
    );
  }

  // 2. Trạng thái CHƯA ĐĂNG NHẬP
  return (
    <button
      onClick={handleLogin}
      className="group relative px-6 py-3 font-bold text-white rounded-xl transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-indigo-500/25 overflow-hidden"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 transition-all group-hover:from-indigo-500 group-hover:to-purple-500"></div>
      
      {/* Nội dung nút */}
      <div className="relative flex items-center gap-2">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        <span>Kết nối Ví</span>
      </div>
    </button>
  );
};

export default WalletLogin;