// src/views/TokenManagementView.tsx

import React, { useState } from 'react';
import TokenSelector from '../components/TokenSelector';
import TokenBalance from '../components/TokenBalance';
import { toast } from 'react-toastify';

const TokenManagementView: React.FC = () => {
  const [selectedToken, setSelectedToken] = useState<`0x${string}` | undefined>();

  const handleTokenSelect = (tokenAddress: `0x${string}`) => {
    setSelectedToken(tokenAddress);
    // Thông báo khi người dùng chọn token
    toast.info("Token selected. Fetching balance...", {
        position: "top-right",
        autoClose: 2000,
    });
  };

  const handleTransfer = (to: string, amount: string) => {
    console.log(`Transfer ${amount} to ${to}`);
    
    // Hiển thị thông báo thành công ở góc trên bên phải
    toast.success(`✓ Transferred ${amount} tokens to ${to}`, {
      position: "top-right", // Đảm bảo vị trí hiển thị
      autoClose: 5000,       // Tự động đóng sau 5 giây
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  return (
    // CONTAINER CHÍNH
    <div className="min-h-screen text-white" style={{ position: 'relative', overflow: 'hidden' }}>
      
      {/* 1. BACKGROUND IMAGE (CỐ ĐỊNH) */}
      <img
        src="/token.avif" 
        alt="Token Background"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: -1, 
        }}
      />

      {/* 2. LỚP PHỦ TỐI (OVERLAY) */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(15, 23, 42, 0.85)', 
          zIndex: -1,
        }}
      ></div>

      {/* 3. NỘI DUNG CHÍNH */}
      <div style={{ position: 'relative', zIndex: 10 }}>
        <div
          style={{
            maxWidth: '1200px', // Chỉnh lại cho rộng rãi hơn thay vì 100%
            margin: '0 auto',
            padding: '40px 20px 80px',
          }}
        >
          {/* Title */}
          <h1 style={{ color: '#facc15', fontSize: '2.5rem', marginBottom: '10px', fontWeight: 'bold' }}>
            ERC-20 Token Management
          </h1>
          <p style={{ color: '#b8c0cc', fontSize: '1.1rem', marginBottom: '40px' }}>
            View balance, send, and manage your ERC-20 tokens across different blockchains.
          </p>

          {/* Main Layout */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '30px' }}>
            {/* Left Column: Token Selector */}
            <div>
              <TokenSelector onTokenSelect={handleTokenSelect} selectedToken={selectedToken} />
            </div>

            {/* Right Column: Token Balance & Transfer */}
            <div>
              {selectedToken ? (
                <TokenBalance
                  tokenAddress={selectedToken}
                  onTransfer={handleTransfer}
                />
              ) : (
                <div
                  style={{
                    backgroundColor: '#1e293b',
                    borderRadius: '24px', // Bo góc nhiều hơn cho hiện đại
                    border: '1px solid #334155',
                    padding: '60px 40px',
                    textAlign: 'center',
                    minHeight: '400px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 10px 25px -5px rgba(0,0,0,0.3)'
                  }}
                >
                  <div style={{ fontSize: '4rem', marginBottom: '20px', filter: 'drop-shadow(0 0 10px rgba(250, 204, 21, 0.4))' }}>
                    🪙
                  </div>
                  <h3 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '10px', fontWeight: '600' }}>
                    Select a token to start
                  </h3>
                  <p style={{ color: '#88909c', maxWidth: '300px', lineHeight: '1.6' }}>
                    Select from the list of popular tokens or add a custom token to manage your assets.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenManagementView;