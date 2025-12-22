// src/components/HeroSection.tsx

import React from 'react';
import ConvertBox from './ConvertBox'; 
import AppPagination from './AppPagination';

// Network list with actual Logo Links
const SUPPORTED_NETWORKS: { symbol: string; logo: string }[] = [
  { symbol: 'ETH', logo: 'https://cryptologos.cc/logos/ethereum-eth-logo.png?v=025' },
  { symbol: 'BNB', logo: 'https://cryptologos.cc/logos/bnb-bnb-logo.png?v=025' },
  // { symbol: 'BASE', logo: 'https://cryptologos.cc/logos/base-base-logo.png?v=025' },
  { symbol: 'ARB', logo: 'https://cryptologos.cc/logos/arbitrum-arb-logo.png?v=025' },
  // { symbol: 'ZKS', logo: 'https://cryptologos.cc/logos/zksync-zks-logo.png?v=025' },
  // { symbol: 'LINEA', logo: 'https://cryptologos.cc/logos/linea-linea-logo.png?v=025' },
  { symbol: 'APT', logo: 'https://cryptologos.cc/logos/aptos-apt-logo.png?v=025' },
  { symbol: 'opBNB', logo: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/opbnb/info/logo.png' },
];

const HeroSection: React.FC = () => {
  return (
    // Outer Container: Thêm relative và overflow-hidden để "nhốt" video lại
    <div style={{ width: '100%', boxSizing: 'border-box', position: 'relative', overflow: 'hidden' }}>
      
      {/* --- 1. VIDEO BACKGROUND --- */}
      {/* Nằm tuyệt đối ở lớp dưới cùng (z-0) */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover', // Đảm bảo video phủ kín khung
          zIndex: 0, 
        }}
      >
        <source src="/bg-video.mp4" type="video/mp4" />
      </video>

      {/* Lớp phủ tối (Overlay) để chữ dễ đọc */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(15, 23, 42, 0.6)', // Màu slate-900 với độ mờ 60%
        zIndex: 0
      }}></div>


      {/* --- 2. NỘI DUNG CHÍNH (CONTENT) --- */}
      {/* Phải bọc trong div relative với z-index > 0 để nổi lên trên video */}
      <div style={{ position: 'relative', zIndex: 10 }}>
          
          <section style={{ padding: '40px 0 80px', width: '100%' }}>
            <div
              className="hero-section-layout"
              style={{
                width: '100%',           
                maxWidth: '100%',       
                margin: '0',
                padding: '0 6%',         // Spacious padding (6%)
                boxSizing: 'border-box',
                display: 'grid',
                // Responsive Grid: 2 columns on large screens, 1 on small
                gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))',
                gap: '60px',
                alignItems: 'center',
              }}
            >
              {/* LEFT COLUMN - Intro Content */}
              <div className="hero-section-content" style={{ textAlign: 'left' }}>
                <h2
                  style={{
                    fontSize: 'clamp(3rem, 5vw, 4.5rem)', // Responsive font size
                    fontWeight: '900',  
                    lineHeight: '1.1',
                    marginBottom: '30px',
                    fontFamily: '"Exo 2", "Inter", sans-serif', 
                    letterSpacing: '-2px',
                    background: 'linear-gradient(90deg, #facc15 0%, #f97316 100%)', 
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textShadow: '0px 10px 20px rgba(250, 204, 21, 0.2)', 
                  }}
                >
                  Top Choices
                </h2>

                <p style={{ fontSize: '1.25rem', color: '#e2e8f0', marginBottom: '40px', maxWidth: '600px', lineHeight: '1.6' }}>
                    {/* Đổi màu chữ sang sáng hơn (#e2e8f0) để nổi trên nền video tối */}
                    Experience optimal decentralized trading with lightning-fast speeds, ultra-low costs, and multi-chain support.
                </p>

                {/* Network List (With Real Logos) */}
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
                        padding: '10px 18px',
                        backgroundColor: 'rgba(30, 41, 59, 0.7)', // Glassmorphism bg
                        backdropFilter: 'blur(10px)', 
                        border: '1px solid rgba(255, 255, 255, 0.1)', // Viền sáng hơn chút cho đẹp
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        color: '#e2e8f0',
                        fontWeight: 700,
                        fontSize: '1rem',
                        transition: 'all 0.3s ease',
                        cursor: 'default',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = '#facc15';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      {/* Logo Image */}
                      <img 
                        src={net.logo} 
                        alt={net.symbol}
                        style={{
                            width: '24px',
                            height: '24px',
                            borderRadius: '50%', // Round logo
                            objectFit: 'contain' 
                        }} 
                        onError={(e) => {
                            // Fallback if image fails
                            e.currentTarget.style.display = 'none';
                        }}
                      />
                      {net.symbol}
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT COLUMN - Convert Box */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  position: 'relative',
                  width: '100%'
                }}
              >
                {/* Glow Effect Background */}
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
                  <ConvertBox />
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
    </div>
  );
};

export default HeroSection;