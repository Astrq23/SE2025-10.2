import React, { useState } from 'react';
import TokenSelector from '../components/TokenSelector';
import TokenBalance from '../components/TokenBalance';

const TokenManagementView: React.FC = () => {
  const [selectedToken, setSelectedToken] = useState<`0x${string}` | undefined>();

  const handleTokenSelect = (tokenAddress: `0x${string}`) => {
    setSelectedToken(tokenAddress);
  };

  const handleTransfer = (to: string, amount: string) => {
    console.log(`Transfer ${amount} to ${to}`);
    alert(`Transferred ${amount} tokens to ${to}`);
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
            maxWidth: '100%',
            margin: '0 auto',
            padding: '20px 20px 80px',
          }}
        >
          {/* Title */}
          <h1 style={{ color: '#facc15', fontSize: '2.5rem', marginBottom: '20px' }}>
            ERC-20 Token Management
          </h1>
          <p style={{ color: '#b8c0cc', fontSize: '1.25rem', marginBottom: '40px' }}>
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
                    borderRadius: '16px',
                    border: '1px solid #334155',
                    padding: '40px',
                    textAlign: 'center',
                    minHeight: '300px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <div style={{ fontSize: '3rem', marginBottom: '15px' }}>
                    🪙
                  </div>
                  <h3 style={{ color: '#b8c0cc', marginBottom: '10px' }}>
                    Select a token to start
                  </h3>
                  <p style={{ color: '#88909c' }}>
                    Select from the list of popular tokens or add a custom token
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