import React, { useState } from 'react';
import AppPagination from '../components/AppPagination';
import FeaturesSection from '../components/FeaturesSection';

import TradingChart from '../components/TradingChart';
import OrderBook from '../components/OrderBook';

const COINS = ['BTC', 'ETH', 'BNB', 'SOL', 'XRP', 'ADA', 'DOGE', 'BASE', 'ARB'];

const TradeView: React.FC = () => {
  const [selectedCoin, setSelectedCoin] = useState<string>('BTC');

  return (
    // Container chính: Full Width 100%, đè box-sizing để padding không làm vỡ
    <div className="min-h-screen bg-defi-bg text-white" style={{ width: '100%', boxSizing: 'border-box' }}>
      <div
        style={{
          width: '100%',          // Ép chiều rộng luôn là 100%
          maxWidth: '100%',       // Gỡ bỏ mọi giới hạn
          margin: '0',            // Xóa margin auto
          // --- SỬA TẠI ĐÂY ---
          padding: '30px 6%',     // Dùng % để căn lề (6% chiều rộng màn hình)
          // -------------------
          boxSizing: 'border-box'
        }}
      >
        {/* Header Title */}
        <div style={{ marginBottom: '30px' }}>
            <h1 style={{ color: '#4ade80', fontSize: '2.5rem', marginBottom: '10px', fontWeight: 'bold' }}>
              Advanced DeFi Trading Platform
            </h1>
            <p style={{ color: '#b8c0cc', fontSize: '1.25rem' }}>
              High-speed token trading, low fees, and minimal slippage.
            </p>
        </div>

        {/* Coin Selector */}
        <div style={{ marginBottom: '30px' }}>
          <label style={{ color: '#b8c0cc', fontSize: '1rem', marginRight: '15px' }}>
            Select Coin:
          </label>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {COINS.map((coin) => (
              <button
                key={coin}
                onClick={() => setSelectedCoin(coin)}
                style={{
                  padding: '8px 16px',
                  backgroundColor: selectedCoin === coin ? '#4ade80' : '#334155',
                  color: selectedCoin === coin ? '#000000' : '#b8c0cc',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '0.95rem',
                  fontWeight: selectedCoin === coin ? '600' : '400',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  if (selectedCoin !== coin) {
                    e.currentTarget.style.backgroundColor = '#475569';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedCoin !== coin) {
                    e.currentTarget.style.backgroundColor = '#334155';
                  }
                }}
              >
                {coin}
              </button>
            ))}
          </div>
        </div>

        {/* Layout chính: Flexbox để chart + order book cùng hàng */}
        <div style={{ 
            display: 'grid',
            gridTemplateColumns: '2fr 1fr',
            gap: '30px', 
            width: '100%' 
        }}>
          
          {/* CỘT 1: BIỂU ĐỒ */}
          <div style={{
              backgroundColor: '#1e293b',
              borderRadius: '16px',
              border: '1px solid #334155',
              padding: '20px',
              minHeight: '550px',
              display: 'flex',
              flexDirection: 'column'
            }}>
                <div style={{ flex: 1, width: '100%', height: '100%' }}> 
                  <TradingChart selectedCoin={selectedCoin} />
                </div>
            </div>

          {/* CỘT 2: ORDERBOOK */}
          <div style={{ 
              backgroundColor: '#1e293b',
              borderRadius: '16px',
              border: '1px solid #334155',
              padding: '25px',
              minHeight: '450px',
              display: 'flex',
              flexDirection: 'column'
          }}>
            <OrderBook selectedCoin={selectedCoin} />
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div
        style={{
          width: '100%',
          padding: '20px 0 60px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <AppPagination />
      </div>

      {/* Footer Features (Cũng padding theo % cho đồng bộ) */}
      <div style={{ width: '100%', padding: '0 6%', boxSizing: 'border-box' }}>
         <FeaturesSection />
      </div>
    </div>
  );
};

export default TradeView;