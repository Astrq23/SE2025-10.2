// D:\cnpm\my-defi-app/src/view/TradeView.tsx

import React from 'react';
import AppPagination from '../components/AppPagination';
import FeaturesSection from '../components/FeaturesSection';

import TradingChart from '../components/TradingChart';
import TradeForm from '../components/TradeForm';
import OrderBook from '../components/OrderBook';

const TradeView: React.FC = () => {
  return (
    // Container chính: Full Width 100%, đè box-sizing để padding không làm vỡ
    <div className="min-h-screen bg-defi-bg text-white" style={{ width: '100%', boxSizing: 'border-box' }}>
      <div
        style={{
          width: '100%',          // Ép chiều rộng luôn là 100%
          maxWidth: '100%',       // Gỡ bỏ mọi giới hạn
          margin: '0',            // Xóa margin auto
          // --- SỬA TẠI ĐÂY ---
          padding: '30px 8%',     // Dùng % để căn lề (6% chiều rộng màn hình)
          // -------------------
          boxSizing: 'border-box'
        }}
      >
        {/* Header Title */}
        <div style={{ marginBottom: '30px' }}>
            <h1 style={{ color: '#4ade80', fontSize: '2.5rem', marginBottom: '10px', fontWeight: 'bold' }}>
              Sàn Giao Dịch DeFi Nâng Cao
            </h1>
            <p style={{ color: '#b8c0cc', fontSize: '1.25rem' }}>
              Giao dịch token tốc độ cao, phí thấp và trượt giá tối thiểu.
            </p>
        </div>

        {/* Layout chính: Sử dụng Grid để tự động chia không gian */}
        <div style={{ 
            display: 'grid', 
            // Màn to: Chart chiếm 60%, Cột lệnh chiếm 40% (hoặc tự động xuống dòng)
            gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', 
            gap: '30px', 
            width: '100%' 
        }}>
          
          {/* CỘT 1: BIỂU ĐỒ (Ưu tiên hiển thị to) */}
          <div style={{
            gridColumn: 'span 1', 
            backgroundColor: '#1e293b',
            borderRadius: '16px',
            border: '1px solid #334155',
            padding: '20px',
            minHeight: '600px',
            display: 'flex',
            flexDirection: 'column'
          }}>
             <h3 style={{marginBottom: '15px', color: '#facc15'}}>Biểu đồ giá</h3>
             <div style={{flex: 1, width: '100%'}}>
                <TradingChart />
             </div>
          </div>

          {/* CỘT 2: CONTROLS (Form + OrderBook) */}
          <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '30px' 
          }}>
            {/* Form đặt lệnh */}
            <div style={{
              backgroundColor: '#1e293b',
              borderRadius: '16px',
              border: '1px solid #334155',
              padding: '25px',
              flex: 1
            }}>
              <TradeForm />
            </div>

            {/* Sổ lệnh */}
            <div style={{
              backgroundColor: '#1e293b',
              borderRadius: '16px',
              border: '1px solid #334155',
              padding: '25px',
              flex: 1
            }}>
              <OrderBook />
            </div>
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