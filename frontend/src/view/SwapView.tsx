import React from 'react';
import SwapInterface from '../components/SwapInterface';

const SwapView: React.FC = () => {
  return (
    <div style={{ position: 'relative', minHeight: '80vh' }}>
      
      {/* === FULL PAGE OVERLAY === */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 50,
        backgroundColor: 'rgba(15, 23, 42, 0.4)', // Tăng độ tối nền lên xíu cho chữ dễ đọc
        backdropFilter: 'blur(4px)', 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
         {/* Hộp thông báo */}
         <div style={{
            backgroundColor: 'rgba(30, 41, 59, 0.95)', // Nền hộp đậm hơn
            border: '1px solid #475569', // Đổi viền sang màu xám xanh trung tính
            padding: '40px 60px',
            borderRadius: '24px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)', // Bóng đổ sâu hơn cho nổi
            textAlign: 'center',
            maxWidth: '500px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
         }}>
             {/* ICON CỜ LÊ MÀU XÁM (Gray Icon) */}
             <div style={{ marginBottom: '20px', color: '#cbd5e1' }}> {/* Mã màu xám sáng */}
               <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                 <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.9 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
               </svg>
             </div>

             {/* Tiêu đề đổi sang màu trắng cho nổi */}
             <h1 style={{ margin: '0 0 8px 0', color: '#f8fafc', fontSize: '2rem' }}>Coming Soon</h1>
             
             <p style={{ margin: 0, color: '#94a3b8', fontSize: '1.1rem', lineHeight: '1.6' }}>
                This feature is currently under development.<br/>
                Please check back later!
             </p>
         </div>
      </div>

      {/* === NỘI DUNG CHÍNH === */}
      <div style={{ pointerEvents: 'none', opacity: 0.5 }}>
        <SwapInterface />
      </div>

    </div>
  );
};

export default SwapView;