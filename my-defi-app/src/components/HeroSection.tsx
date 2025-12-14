// D:\cnpm\my-defi-app/src/components/HeroSection.tsx

import React from 'react';
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
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 24px',
            display: 'grid',
            gridTemplateColumns: '1.1fr 0.9fr', // ⚠️ CÂN LẠI TỶ LỆ
            alignItems: 'center',
            gap: '64px',
          }}
        >
          {/* CỘT TRÁI */}
          <div>
            <h1
              style={{
                color: '#facc15',
                fontSize: '3rem',
                lineHeight: '1.2',
                marginBottom: '24px',
              }}
            >
              Bắt đầu Giao dịch Nhanh chóng và Phí thấp!
            </h1>

            <p
              style={{
                color: '#b8c0cc',
                fontSize: '1.2rem',
                maxWidth: '520px', // ⚠️ KHÓA CHIỀU RỘNG ĐỂ ĐẸP HƠN
                marginBottom: '32px',
              }}
            >
              Nền tảng DeFi đa chuỗi, hỗ trợ nhiều hệ sinh thái hàng đầu với
              thanh khoản sâu và chi phí tối ưu.
            </p>

            {/* Networks */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '12px',
                marginBottom: '36px',
                maxWidth: '560px',
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
                      border: net.color === '#FFFFFF' ? '1px solid #64748b' : 'none',
                    }}
                  />
                  {net.symbol}
                </div>
              ))}
            </div>

            {/* CTA */}
            <button
              style={{
                backgroundColor: '#4ade80',
                color: '#1e293b',
                fontWeight: 'bold',
                padding: '14px 28px',
                borderRadius: '14px',
                fontSize: '1.1rem',
                cursor: 'pointer',
                border: 'none',
                boxShadow: '0 6px 20px rgba(74, 222, 128, 0.35)',
              }}
            >
              Khám phá Sàn Giao dịch
            </button>
          </div>

          {/* CỘT PHẢI */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center', // ⚠️ KHÔNG DÍNH MÉP PHẢI
            }}
          >
            <SwapBox />
          </div>
        </div>
      </section>

      {/* Pagination căn cùng trục layout */}
      <div
        style={{
          maxWidth: '1200px',
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
