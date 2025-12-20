import React from 'react';
import AppPagination from '../components/AppPagination';
import FeaturesSection from '../components/FeaturesSection';

const TradeView: React.FC = () => {
  return (
    <div className="min-h-screen bg-defi-bg text-white">
      <div
        style={{
          maxWidth: '100%',
          margin: '0 auto',
          padding: '20px 20px 80px',
        }}
      >
        <h1 style={{ color: '#4ade80', fontSize: '2.5rem', marginBottom: '20px' }}>
          Kiếm Tiền DeFi Nâng Cao
        </h1>

        <p style={{ color: '#b8c0cc', fontSize: '1.25rem', marginBottom: '40px' }}>
          Kiếm lợi nhuận thụ động với các pool staking, farming và lending cao APY trên nhiều blockchain.
        </p>

        {/* Phần tính năng nổi bật */}
        <div style={{ marginBottom: '40px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            <div style={{
              padding: '24px',
              backgroundColor: '#1e293b',
              borderRadius: '16px',
              border: '1px solid #334155',
              textAlign: 'center',
              transition: 'transform 0.2s ease',
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🌾</div>
              <h3 style={{ color: '#facc15', fontSize: '1.2rem', marginBottom: '8px' }}>Yield Farming</h3>
              <p style={{ color: '#b8c0cc', fontSize: '0.9rem' }}>Stake LP tokens để nhận farming rewards</p>
            </div>
            <div style={{
              padding: '24px',
              backgroundColor: '#1e293b',
              borderRadius: '16px',
              border: '1px solid #334155',
              textAlign: 'center',
              transition: 'transform 0.2s ease',
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🏦</div>
              <h3 style={{ color: '#facc15', fontSize: '1.2rem', marginBottom: '8px' }}>Lending</h3>
              <p style={{ color: '#b8c0cc', fontSize: '0.9rem' }}>Cho vay crypto để nhận lãi suất hấp dẫn</p>
            </div>
            <div style={{
              padding: '24px',
              backgroundColor: '#1e293b',
              borderRadius: '16px',
              border: '1px solid #334155',
              textAlign: 'center',
              transition: 'transform 0.2s ease',
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>💰</div>
              <h3 style={{ color: '#facc15', fontSize: '1.2rem', marginBottom: '8px' }}>Liquid Staking</h3>
              <p style={{ color: '#b8c0cc', fontSize: '0.9rem' }}>Stake tokens và nhận liquid staking derivatives</p>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
          {/* Pool staking cards */}
          <div style={{
            padding: '24px',
            backgroundColor: '#1e293b',
            borderRadius: '16px',
            border: '1px solid #334155'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ fontSize: '2rem', marginRight: '12px' }}>🌾</div>
              <div>
                <h3 style={{ color: '#facc15', fontSize: '1.2rem' }}>CAKE-BNB LP</h3>
                <p style={{ color: '#b8c0cc', fontSize: '0.9rem' }}>PancakeSwap Farm</p>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
              <span style={{ color: '#b8c0cc' }}>APY:</span>
              <span style={{ color: '#4ade80', fontWeight: 'bold' }}>24.5%</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
              <span style={{ color: '#b8c0cc' }}>TVL:</span>
              <span style={{ color: '#facc15' }}>$12.4M</span>
            </div>
            <button style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#4ade80',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}>
              Stake Now
            </button>
          </div>

          <div style={{
            padding: '24px',
            backgroundColor: '#1e293b',
            borderRadius: '16px',
            border: '1px solid #334155'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ fontSize: '2rem', marginRight: '12px' }}>💰</div>
              <div>
                <h3 style={{ color: '#facc15', fontSize: '1.2rem' }}>ETH Liquid Staking</h3>
                <p style={{ color: '#b8c0cc', fontSize: '0.9rem' }}>Lido Finance</p>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
              <span style={{ color: '#b8c0cc' }}>APY:</span>
              <span style={{ color: '#4ade80', fontWeight: 'bold' }}>7.2%</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
              <span style={{ color: '#b8c0cc' }}>TVL:</span>
              <span style={{ color: '#facc15' }}>$8.9M</span>
            </div>
            <button style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#4ade80',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}>
              Stake Now
            </button>
          </div>

          <div style={{
            padding: '24px',
            backgroundColor: '#1e293b',
            borderRadius: '16px',
            border: '1px solid #334155'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ fontSize: '2rem', marginRight: '12px' }}>🏦</div>
              <div>
                <h3 style={{ color: '#facc15', fontSize: '1.2rem' }}>USDC Lending</h3>
                <p style={{ color: '#b8c0cc', fontSize: '0.9rem' }}>Compound Finance</p>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
              <span style={{ color: '#b8c0cc' }}>APY:</span>
              <span style={{ color: '#4ade80', fontWeight: 'bold' }}>5.8%</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
              <span style={{ color: '#b8c0cc' }}>TVL:</span>
              <span style={{ color: '#facc15' }}>$156M</span>
            </div>
            <button style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#4ade80',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}>
              Lend Now
            </button>
          </div>

          <div style={{
            padding: '24px',
            backgroundColor: '#1e293b',
            borderRadius: '16px',
            border: '1px solid #334155'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ fontSize: '2rem', marginRight: '12px' }}>🔥</div>
              <div>
                <h3 style={{ color: '#facc15', fontSize: '1.2rem' }}>CAKE Single Stake</h3>
                <p style={{ color: '#b8c0cc', fontSize: '0.9rem' }}>Auto-compound</p>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
              <span style={{ color: '#b8c0cc' }}>APY:</span>
              <span style={{ color: '#4ade80', fontWeight: 'bold' }}>18.3%</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
              <span style={{ color: '#b8c0cc' }}>TVL:</span>
              <span style={{ color: '#facc15' }}>$45M</span>
            </div>
            <button style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#4ade80',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}>
              Stake Now
            </button>
          </div>
        </div>

        {/* Phần thống kê */}
        <div style={{ marginTop: '40px', marginBottom: '20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
            <div style={{
              padding: '20px',
              backgroundColor: '#1e293b',
              borderRadius: '12px',
              border: '1px solid #334155',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2rem', color: '#4ade80', marginBottom: '8px' }}>💎</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#facc15' }}>Total Staked</div>
              <div style={{ color: '#b8c0cc', fontSize: '1.1rem' }}>$18.7M</div>
            </div>
            <div style={{
              padding: '20px',
              backgroundColor: '#1e293b',
              borderRadius: '12px',
              border: '1px solid #334155',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2rem', color: '#60a5fa', marginBottom: '8px' }}>📊</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#facc15' }}>APY Range</div>
              <div style={{ color: '#b8c0cc', fontSize: '1.1rem' }}>5-25%</div>
            </div>
            <div style={{
              padding: '20px',
              backgroundColor: '#1e293b',
              borderRadius: '12px',
              border: '1px solid #334155',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2rem', color: '#f59e0b', marginBottom: '8px' }}>🏆</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#facc15' }}>Top Pool</div>
              <div style={{ color: '#b8c0cc', fontSize: '1.1rem' }}>CAKE-BNB</div>
            </div>
            <div style={{
              padding: '20px',
              backgroundColor: '#1e293b',
              borderRadius: '12px',
              border: '1px solid #334155',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2rem', color: '#ef4444', marginBottom: '8px' }}>🔥</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#facc15' }}>Hot Pools</div>
              <div style={{ color: '#b8c0cc', fontSize: '1.1rem' }}>12 Active</div>
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
