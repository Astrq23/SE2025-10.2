import React from 'react';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

const FeaturesSection: React.FC = () => {
  const features: Feature[] = [
    {
      icon: '⚡',
      title: 'Fast Transactions',
      description: 'Execute trades at high speed across leading blockchain networks.',
    },
    {
      icon: '💰',
      title: 'Low Fees',
      description: 'Enjoy the most competitive trading fees in the industry.',
    },
    {
      icon: '🔒',
      title: 'High Security',
      description: 'Your wallet is always protected with industry-leading security standards.',
    },
    {
      icon: '🌐',
      title: 'Multi-Chain',
      description: 'Support for trading on Ethereum, BNB Chain, Solana, Arbitrum, and more.',
    },
    {
      icon: '📊',
      title: 'Professional Tools',
      description: 'Access advanced charts, real-time order books, and in-depth analytics.',
    },
    {
      icon: '🚀',
      title: 'Yield Farming',
      description: 'Earn rewards by providing liquidity and staking tokens.',
    },
  ];

  return (
    <section style={{ 
      backgroundColor: '#0f172a',
      padding: '80px 0',
      borderTop: '1px solid #334155'
    }}>
      <div style={{
        maxWidth: '100%',
        margin: '0 auto',
        padding: '0 24px',
      }}>
        {/* Tiêu đề */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{
            color: '#facc15',
            fontSize: '2.5rem',
            marginBottom: '16px',
            fontWeight: 'bold'
          }}>
            Why Choose DeFi DEX?
          </h2>
          <p style={{
            color: '#b8c0cc',
            fontSize: '1.1rem',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            A comprehensive DeFi trading platform with high performance, excellent security, and outstanding user experience.
          </p>
        </div>

        {/* Lưới các tính năng */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '30px',
          marginBottom: '60px'
        }}>
          {features.map((feature, index) => (
            <div 
              key={index}
              style={{
                backgroundColor: '#1e293b',
                borderRadius: '16px',
                border: '1px solid #334155',
                padding: '30px',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.backgroundColor = '#2d3b52';
                el.style.borderColor = '#4ade80';
                el.style.transform = 'translateY(-4px)';
                el.style.boxShadow = '0 8px 20px rgba(74, 222, 128, 0.1)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.backgroundColor = '#1e293b';
                el.style.borderColor = '#334155';
                el.style.transform = 'translateY(0)';
                el.style.boxShadow = 'none';
              }}
            >
              {/* Icon */}
              <div style={{
                fontSize: '2.5rem',
                marginBottom: '16px',
              }}>
                {feature.icon}
              </div>
              
              {/* Tiêu đề */}
              <h3 style={{
                color: '#ffffff',
                fontSize: '1.3rem',
                marginBottom: '12px',
                fontWeight: 'bold'
              }}>
                {feature.title}
              </h3>
              
              {/* Mô tả */}
              <p style={{
                color: '#b8c0cc',
                fontSize: '0.95rem',
                lineHeight: '1.6'
              }}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Phần thống kê */}
        <div style={{
          backgroundColor: '#1e293b',
          borderRadius: '16px',
          border: '1px solid #334155',
          padding: '40px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '30px',
          textAlign: 'center'
        }}>
          <div>
            <div style={{
              color: '#4ade80',
              fontSize: '2.5rem',
              fontWeight: 'bold',
              marginBottom: '8px'
            }}>
              $500M+
            </div>
            <div style={{ color: '#b8c0cc' }}>
              Total Liquidity
            </div>
          </div>

          <div>
            <div style={{
              color: '#06b6d4',
              fontSize: '2.5rem',
              fontWeight: 'bold',
              marginBottom: '8px'
            }}>
              12+
            </div>
            <div style={{ color: '#b8c0cc' }}>
              Supported Chains
            </div>
          </div>

          <div>
            <div style={{
              color: '#facc15',
              fontSize: '2.5rem',
              fontWeight: 'bold',
              marginBottom: '8px'
            }}>
              1M+
            </div>
            <div style={{ color: '#b8c0cc' }}>
              Active Users
            </div>
          </div>

          <div>
            <div style={{
              color: '#f87171',
              fontSize: '2.5rem',
              fontWeight: 'bold',
              marginBottom: '8px'
            }}>
              0.1%
            </div>
            <div style={{ color: '#b8c0cc' }}>
              Low Trading Fees
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
