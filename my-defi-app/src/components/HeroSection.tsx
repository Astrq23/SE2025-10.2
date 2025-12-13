// D:\cnpm\my-defi-app/src/components/HeroSection.tsx (CĂN GIỮA ĐÃ SỬA)
import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <section style={{ padding: '60px 0 80px 0' }}>
      
      {/* ÁP DỤNG LỚP CĂN GIỮA MỚI */}
      <div className="section-center-content">
        
        {/* Tiêu đề chính */}
        <h1 className="main-heading" style={{ color: '#facc15' }}>
          Bắt đầu Giao dịch Nhanh chóng và Phí thấp!
        </h1>
        
        {/* Mô tả */}
        <p style={{ color: '#b8c0cc', fontSize: '1.25rem', marginBottom: '30px' }}>
          Nền tảng DeFi an toàn và hiệu quả, tối ưu hóa cho mọi hoạt động trên chuỗi.
          Bắt đầu Giao dịch Ngay
        </p>

        {/* Nút chính */}
        <button style={{ 
          backgroundColor: '#4ade80', // Màu xanh nổi bật
          color: '#1e293b', 
          fontWeight: 'bold', 
          padding: '12px 24px', 
          borderRadius: '12px', 
          fontSize: '1.125rem',
          cursor: 'pointer',
          border: 'none',
          boxShadow: '0 4px 14px rgba(74, 222, 128, 0.4)',
          transition: 'background-color 0.2s'
        }}
        onMouseOver={e => e.currentTarget.style.backgroundColor = '#22c55e'}
        onMouseOut={e => e.currentTarget.style.backgroundColor = '#4ade80'}
        >
          Khám phá Sàn Giao dịch
        </button>
      </div>
    </section>
  );
};

export default HeroSection;