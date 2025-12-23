import React, { useState } from 'react';
import AppPagination from '../components/AppPagination';
import TradingChart from '../components/TradingChart';
import OrderBook from '../components/OrderBook';

const COINS = ['BTC', 'ETH', 'BNB', 'SOL', 'XRP', 'ADA', 'DOGE', 'BASE', 'ARB'];

const TradeView: React.FC = () => {
  const [selectedCoin, setSelectedCoin] = useState<string>('BTC');

  return (
    // CONTAINER CHÍNH
    <div style={{ position: 'relative', minHeight: '100vh', color: 'white' }}>
      
      {/* 1. VIDEO BACKGROUND (CỐ ĐỊNH) */}
      {/* position: fixed giúp video dính chặt vào màn hình, không bị cuộn theo nội dung */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'fixed', // Quan trọng: Fixed để làm hình nền
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: -1, // Đẩy xuống dưới cùng
        }}
      >
        <source src="/bg-video2.mp4" type="video/mp4" />
      </video>

      {/* 2. LỚP PHỦ TỐI (OVERLAY) */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(15, 23, 42, 0.75)', // Màu tối Slate-900 độ mờ 75%
          zIndex: -1, 
        }}
      ></div>

      {/* 3. NỘI DUNG CHÍNH (SCROLLABLE) */}
      {/* position: relative để nội dung trôi lên trên video */}
      <div style={{ position: 'relative', zIndex: 10, width: '100%', boxSizing: 'border-box' }}>
        <div
          style={{
            width: '100%',          
            maxWidth: '100%',       
            margin: '0',           
            padding: '30px 6%',     
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
                    backgroundColor: selectedCoin === coin ? '#4ade80' : 'rgba(51, 65, 85, 0.5)',
                    color: selectedCoin === coin ? '#000000' : '#b8c0cc',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '0.95rem',
                    fontWeight: selectedCoin === coin ? '600' : '400',
                    transition: 'all 0.2s ease',
                    backdropFilter: 'blur(4px)'
                  }}
                  onMouseEnter={(e) => {
                    if (selectedCoin !== coin) {
                      e.currentTarget.style.backgroundColor = 'rgba(71, 85, 105, 0.8)';
                      e.currentTarget.style.color = 'white';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedCoin !== coin) {
                      e.currentTarget.style.backgroundColor = 'rgba(51, 65, 85, 0.5)';
                      e.currentTarget.style.color = '#b8c0cc';
                    }
                  }}
                >
                  {coin}
                </button>
              ))}
            </div>
          </div>

          {/* Layout main: Chart + OrderBook */}
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: '2fr 1fr', 
            gap: '30px', 
            width: '100%' 
          }}>
            
            {/* COLUMN 1: CHART */}
            <div style={{
              backgroundColor: 'rgba(30, 41, 59, 0.6)', 
              borderRadius: '16px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              padding: '20px',
              minHeight: '550px',
              display: 'flex',
              flexDirection: 'column',
              backdropFilter: 'blur(12px)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
            }}>
                <div style={{ flex: 1, width: '100%', height: '100%' }}> 
                  <TradingChart selectedCoin={selectedCoin} />
                </div>
            </div>

            {/* COLUMN 2: ORDERBOOK */}
            <div style={{ 
              backgroundColor: 'rgba(30, 41, 59, 0.6)', 
              borderRadius: '16px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              padding: '25px',
              minHeight: '450px',
              display: 'flex',
              flexDirection: 'column',
              backdropFilter: 'blur(12px)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
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
      </div>
    </div>
  );
};

export default TradeView;