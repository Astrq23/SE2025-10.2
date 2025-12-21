import React, { useState } from 'react';
import TokenSelector from '../components/TokenSelector';
import TokenBalance from '../components/TokenBalance';
import AppPagination from '../components/AppPagination';
import FeaturesSection from '../components/FeaturesSection';

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
    <div className="min-h-screen bg-defi-bg text-white">
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

        {/* Detailed Information Section */}
        <div
          style={{
            marginTop: '60px',
            padding: '30px',
            backgroundColor: '#1e293b',
            borderRadius: '16px',
            border: '1px solid #334155',
          }}
        >
          <h2 style={{ color: '#facc15', fontSize: '1.8rem', marginBottom: '20px' }}>
            About ERC-20 Token Management
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
            <div>
              <h3 style={{ color: '#4ade80', marginBottom: '10px', fontSize: '1.1rem' }}>
                ✓ View Balance
              </h3>
              <p style={{ color: '#b8c0cc', lineHeight: '1.6' }}>
                Check your token balance on any supported blockchain, including
                BNB Chain, Ethereum, Arbitrum and many other chains.
              </p>
            </div>

            <div>
              <h3 style={{ color: '#4ade80', marginBottom: '10px', fontSize: '1.1rem' }}>
                📤 Send Tokens
              </h3>
              <p style={{ color: '#b8c0cc', lineHeight: '1.6' }}>
                Send your tokens to any Ethereum address quickly and
                securely with optimized transaction fees.
              </p>
            </div>

            <div>
              <h3 style={{ color: '#4ade80', marginBottom: '10px', fontSize: '1.1rem' }}>
                🔐 Approve Tokens
              </h3>
              <p style={{ color: '#b8c0cc', lineHeight: '1.6' }}>
                Approve tokens for smart contracts before performing transactions
                such as swap, stake, or borrow.
              </p>
            </div>

            <div>
              <h3 style={{ color: '#4ade80', marginBottom: '10px', fontSize: '1.1rem' }}>
                🌐 Multi-Blockchain
              </h3>
              <p style={{ color: '#b8c0cc', lineHeight: '1.6' }}>
                Manage tokens across multiple blockchains from a single interface, without needing to
                switch networks constantly.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div
        style={{
          margin: '0 auto',
          padding: '0 20px 60px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <AppPagination />
      </div>

      {/* Features Section */}
      <FeaturesSection />
    </div>
  );
};

export default TokenManagementView;
