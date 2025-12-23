// src/components/WalletLogin.tsx

import React from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { injected } from 'wagmi/connectors';

const WalletLogin: React.FC = () => {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();

  const handleLogin = () => {
    connect({ connector: injected() });
  };

  // 1. Trạng thái ĐÃ ĐĂNG NHẬP
  if (isConnected && address) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(30, 41, 59, 0.8)', padding: '8px 16px', borderRadius: '16px', border: '1px solid #334155', backdropFilter: 'blur(8px)' }}>
        <div style={{ width: '10px', height: '10px', background: '#34d399', borderRadius: '50%', boxShadow: '0 0 8px #34d399' }}></div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '14px', fontFamily: 'monospace', fontWeight: 'bold', color: 'white' }}>
             {address.slice(0, 6)}...{address.slice(-4)}
          </span>
        </div>
        <button onClick={() => disconnect()} style={{ marginLeft: '4px', background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '4px' }} title="Disconnect">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
        </button>
      </div>
    );
  }

  // 2. Trạng thái CHƯA ĐĂNG NHẬP (DÙNG STYLE INLINE ĐỂ ÉP MÀU)
  return (
    <button
      onClick={handleLogin}
      style={{
        // STYLE INLINE - ĐỘ ƯU TIÊN CAO NHẤT
        background: 'linear-gradient(90deg, #2563eb 0%, #7c3aed 100%)', // Blue -> Violet
        color: 'white',
        fontWeight: 'bold',
        padding: '10px 24px',
        borderRadius: '16px', // Bo tròn đẹp
        border: 'none',
        outline: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        boxShadow: '0 4px 14px 0 rgba(124, 58, 237, 0.3)', 
        transition: 'transform 0.2s ease',
        fontSize: '15px'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.background = 'linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%)'; // Sáng hơn khi hover
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.background = 'linear-gradient(90deg, #2563eb 0%, #7c3aed 100%)'; // Trả về màu cũ
      }}
    >
      {/* Icon Ví */}
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
        <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
        <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
      </svg>
      
      <span>Connect Wallet</span> 
    </button>
  );
};

export default WalletLogin;