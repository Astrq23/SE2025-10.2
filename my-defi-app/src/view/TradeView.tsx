import React from 'react';
import AppPagination from '../components/AppPagination';
import FeaturesSection from '../components/FeaturesSection';

import TradingChart from '../components/TradingChart';
import TradeForm from '../components/TradeForm';
import OrderBook from '../components/OrderBook';

const TradeView: React.FC = () => {
  return (
    <div className="min-h-screen bg-defi-bg text-white">
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '60px 20px 80px',
        }}
      >
        <h1 style={{ color: '#4ade80', fontSize: '2.5rem', marginBottom: '20px' }}>
          Sàn Giao Dịch DeFi Nâng Cao
        </h1>

        <p style={{ color: '#b8c0cc', fontSize: '1.25rem', marginBottom: '40px' }}>
          Khám phá các công cụ giao dịch chuyên nghiệp.
        </p>

        <div style={{ display: 'flex', gap: '30px' }}>
          <div style={{ flex: 3 }}>
            <TradingChart />
          </div>

          <div style={{ flex: 1.5, display: 'flex', flexDirection: 'column', gap: '30px' }}>
            <TradeForm />
            <OrderBook />
          </div>
        </div>

        <div
          style={{
            marginTop: '40px',
            padding: '20px',
            backgroundColor: '#1e293b',
            borderRadius: '12px',
            border: '1px solid #334155',
          }}
        >
          <h2 style={{ fontSize: '1.5rem', color: '#facc15' }}>Lịch sử Lệnh</h2>
          <p style={{ color: '#88909c', marginTop: '10px' }}>
            [Khu vực hiển thị các lệnh]
          </p>
        </div>
      </div>

      <FeaturesSection />
      <AppPagination />
    </div>
  );
};

export default TradeView;
