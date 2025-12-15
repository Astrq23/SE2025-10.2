// D:\cnpm\my-defi-app/src/components/HeroSection.tsx

import React from 'react';
// KHÔNG CẦN import { Link } từ react-router-dom nữa vì đã xóa các nút Link
import SwapBox from './SwapBox';
import AppPagination from './AppPagination';

// Danh sách chain (viết tắt – ngang cấp)
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
      <section style={{ padding: '80px 0 90px' }}>
        <div
          // Sử dụng lớp CSS để quản lý responsive cho max-width, grid layout và gap
          className="hero-section-layout"
          style={{
            margin: '0 auto',
            padding: '0 24px',
            // Các thuộc tính responsive đã chuyển sang HeroSection.css
            alignItems: 'center',
          }}
        >
          {/* CỘT TRÁI */}
          <div className="hero-section-content">
            <h1
              style={{
                color: '#facc15',
                fontSize: '3rem', // Có thể điều chỉnh bằng media query trong CSS
                lineHeight: '1.2',
                marginBottom: '24px',
              }}
            >
              Bắt đầu Giao dịch Nhanh chóng và Phí thấp!
            </h1>

            <p
              className="hero-section-description"
              style={{
                color: '#b8c0cc',
                fontSize: '1.2rem',
                marginBottom: '32px',
              }}
            >
              Nền tảng DeFi đa chuỗi, hỗ trợ nhiều hệ sinh thái hàng đầu với
              thanh khoản sâu và chi phí tối ưu.
            </p>

            {/* Networks - KHÔNG ĐỔI */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '12px',
                marginBottom: '36px',
                maxWidth: '100%',
              }}
            >
              {SUPPORTED_NETWORKS.map((net) => (
                <div
                  key={net.symbol}
                  style={{
                    padding: '10px 14px',
                    backgroundColor: '#1e293b',
                    border: '1px solid #334155',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: '#ffffff',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                  }}
                >
                  <div
                    style={{
                      width: '16px',
                      height: '16px',
                      borderRadius: '50%',
                      backgroundColor: net.color,
                      border:
                        net.color === '#FFFFFF'
                          ? '1px solid #64748b'
                          : 'none',
                    }}
                  />
                  {net.symbol}
                </div>
              ))}
            </div>

            {/* CTA Buttons - ĐÃ XÓA HOÀN TOÀN CẢ HAI NÚT */}
          </div>

          {/* CỘT PHẢI - KHÔNG ĐỔI */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <SwapBox />
          </div>
        </div>
      </section>

      {/* Pagination - KHÔNG ĐỔI */}
      <div
        className="hero-section-pagination"
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
