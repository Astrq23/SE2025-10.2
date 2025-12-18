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
    <>
      <section style={{ padding: '20px 0 110px' }}>
        <div
          className="hero-section-layout"
          style={{
            margin: '0 auto',
            padding: '0 24px',
            maxWidth: '1200px',
            display: 'grid',
            gridTemplateColumns: '1.2fr 0.8fr', // Cột trái rộng hơn chút để khoe chữ
            gap: '50px',
            alignItems: 'center',
          }}
        >
          {/* CỘT TRÁI - Quảng cáo */}
          <div className="hero-section-content" style={{ textAlign: 'left' }}>
            <h2
              style={{
                fontSize: '4.5rem', // Chữ rất to
                fontWeight: '900',  // Rất dày
                lineHeight: '1.1',
                marginBottom: '40px',
                fontFamily: '"Exo 2", "Inter", sans-serif', // Font style công nghệ/game
                letterSpacing: '-2px',
                background: 'linear-gradient(90deg, #facc15 0%, #f97316 100%)', // Gradient từ vàng sang cam
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0px 10px 20px rgba(250, 204, 21, 0.2)', // Đổ bóng nhẹ cho chữ
              }}
            >
              Các lựa chọn hàng đầu
            </h2>

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
                    padding: '12px 18px',
                    backgroundColor: 'rgba(30, 41, 59, 0.7)',
                    backdropFilter: 'blur(10px)', // Hiệu ứng mờ đục hiện đại
                    border: '1px solid rgba(51, 65, 85, 0.5)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    color: '#ffffff',
                    fontWeight: 700,
                    fontSize: '1rem',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <div
                    style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      backgroundColor: net.color,
                      boxShadow: `0 0 10px ${net.color}80`, // Hiệu ứng phát sáng nhẹ theo màu coin
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
              justifyContent: 'center',
              position: 'relative',
            }}
          >
            {/* Thêm một lớp nền phát sáng phía sau SwapBox cho đẹp */}
            <div style={{
              position: 'absolute',
              width: '300px',
              height: '300px',
              background: 'rgba(250, 204, 21, 0.1)',
              filter: 'blur(100px)',
              zIndex: 0
            }}></div>
            <div style={{ zIndex: 1 }}>
              <SwapBox />
            </div>
          </div>
        </div>
      </section>

      {/* Pagination */}
      <div
        style={{
          margin: '0 auto',
          padding: '0 24px 60px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <AppPagination />
      </div>
    </>
  );
};

export default HeroSection;