// D:\cnpm\my-defi-app/src/components/HeroSection.tsx

import React from 'react';
import SwapBox from './SwapBox';
import AppPagination from './AppPagination';

const SUPPORTED_NETWORKS: { symbol: string; color: string }[] = [
  { symbol: 'ETH', color: '#627EEA' },
  { symbol: 'BNB', color: '#F3BA2F' },
  { symbol: 'BASE', color: '#0052FF' },
  { symbol: 'ARB', color: '#28A0F0' },
  { symbol: 'ZKS', color: '#8C8DFC' },
  { symbol: 'LINEA', color: '#FFFFFF' },
  { symbol: 'APT', color: '#000000' },
  { symbol: 'opBNB', color: '#FFCC00' },
];

const HeroSection: React.FC = () => {
  return (
    // Container bao ngoài
    <div style={{ width: '100%', boxSizing: 'border-box' }}>
      
      <section style={{ padding: '40px 0 80px', width: '100%' }}>
        <div
          className="hero-section-layout"
          style={{
            width: '100%',           
            maxWidth: '100%',       
            margin: '0',
            // --- CẬP NHẬT PADDING % CHO ĐỒNG BỘ ---
            padding: '0 6%',         // Padding trái phải 6%
            // --------------------------------------
            boxSizing: 'border-box',
            display: 'grid',
            // Grid thông minh: Màn to chia 2 cột, màn nhỏ tự xuống dòng
            gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))',
            gap: '60px',             // Tăng khoảng cách giữa 2 cột
            alignItems: 'center',
          }}
        >
          {/* CỘT TRÁI - Quảng cáo */}
          <div className="hero-section-content" style={{ textAlign: 'left' }}>
            <h2
              style={{
                fontSize: 'clamp(3rem, 5vw, 4.5rem)', // Font chữ tự co giãn theo màn hình
                fontWeight: '900',  
                lineHeight: '1.1',
                marginBottom: '40px',
                fontFamily: '"Exo 2", "Inter", sans-serif', 
                letterSpacing: '-2px',
                background: 'linear-gradient(90deg, #facc15 0%, #f97316 100%)', 
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0px 10px 20px rgba(250, 204, 21, 0.2)', 
              }}
            >
              Các lựa chọn hàng đầu
            </h2>

            <p style={{ fontSize: '1.25rem', color: '#94a3b8', marginBottom: '40px', maxWidth: '600px' }}>
                Trải nghiệm giao dịch phi tập trung tối ưu với tốc độ siêu nhanh và chi phí cực thấp trên đa nền tảng.
            </p>

            {/* Networks */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '12px',
                maxWidth: '100%',
              }}
            >
              {SUPPORTED_NETWORKS.map((net) => (
                <div
                  key={net.symbol}
                  style={{
                    padding: '12px 20px',
                    backgroundColor: 'rgba(30, 41, 59, 0.7)',
                    backdropFilter: 'blur(10px)', 
                    border: '1px solid rgba(51, 65, 85, 0.5)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    color: '#ffffff',
                    fontWeight: 700,
                    fontSize: '1rem',
                    transition: 'all 0.3s ease',
                    cursor: 'default'
                  }}
                >
                  <div
                    style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      backgroundColor: net.color,
                      boxShadow: `0 0 10px ${net.color}80`, 
                    }}
                  />
                  {net.symbol}
                </div>
              ))}
            </div>
          </div>

          {/* CỘT PHẢI - SwapBox */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center', // Căn giữa Swapbox trong cột của nó
              position: 'relative',
              width: '100%'
            }}
          >
            {/* Lớp nền phát sáng */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '80%',
              height: '80%',
              background: 'radial-gradient(circle, rgba(250, 204, 21, 0.15) 0%, rgba(0,0,0,0) 70%)',
              filter: 'blur(60px)',
              zIndex: 0,
              pointerEvents: 'none'
            }}></div>
            
            <div style={{ zIndex: 1, width: '100%', maxWidth: '480px' }}>
              <SwapBox />
            </div>
          </div>
        </div>
      </section>

      {/* Pagination */}
      <div
        style={{
          width: '100%',
          padding: '0 0 80px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <AppPagination />
      </div>
      
    </div>
  );
};

export default HeroSection;