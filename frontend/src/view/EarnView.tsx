import React from 'react';
import AppPagination from '../components/AppPagination';
import StakingDashboard from '../components/StakingDashboard';

const EarnView: React.FC = () => {
  return (
    // CONTAINER CHÍNH: Chứa Video nền
    <div style={{ position: 'relative', minHeight: '100vh', color: 'white' }}>
      
      {/* 1. VIDEO BACKGROUND (CỐ ĐỊNH) */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: -1, 
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
          backgroundColor: 'rgba(15, 23, 42, 0.8)', // Lớp nền tối mờ
          zIndex: -1,
        }}
      ></div>

      {/* 3. NỘI DUNG CHÍNH */}
      <div style={{ position: 'relative', zIndex: 10, width: '100%', paddingBottom: '60px' }}>
        
        {/* Gọi Component StakingDashboard tại đây */}
        <StakingDashboard />

        {/* Pagination nằm dưới cùng */}
        <div className="flex justify-center mt-8">
          <AppPagination />
        </div>
      </div>
    </div>
  );
};

export default EarnView;