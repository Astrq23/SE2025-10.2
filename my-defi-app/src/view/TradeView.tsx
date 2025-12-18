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
          padding: '20px 20px 80px',
        }}
      >
        <h1 style={{ color: '#4ade80', fontSize: '2.5rem', marginBottom: '20px' }}>
          Sàn Giao Dịch DeFi Nâng Cao
        </h1>

        <p style={{ color: '#b8c0cc', fontSize: '1.25rem', marginBottom: '40px' }}>
          Khám phá các công cụ giao dịch chuyên nghiệp.
        </p>

        {/* Layout chính cải thiện */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          {/* Biểu đồ chính */}
          <div style={{
            backgroundColor: '#1e293b',
            borderRadius: '16px',
            border: '1px solid #334155',
            padding: '20px',
            height: '500px',
            overflow: 'hidden'
          }}>
            <TradingChart />
          </div>

          {/* Controls bên dưới */}
          <div style={{ display: 'flex', gap: '30px' }}>
            <div style={{
              flex: '1',
              backgroundColor: '#1e293b',
              borderRadius: '16px',
              border: '1px solid #334155',
              padding: '20px'
            }}>
              <TradeForm />
            </div>

            <div style={{
              flex: '1',
              backgroundColor: '#1e293b',
              borderRadius: '16px',
              border: '1px solid #334155',
              padding: '20px'
            }}>
              <OrderBook />
            </div>
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div
        style={{
          margin: '0 auto',
          padding: '0 20px 60px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <AppPagination />
      </div>

      <FeaturesSection />
    </div>
  );
};

export default TradeView;
