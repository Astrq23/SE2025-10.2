import React from 'react';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

const FeaturesSection: React.FC = () => {
  const features: Feature[] = [
    { icon: '⚡', title: 'Fast Transactions', description: 'Execute trades at high speed across leading blockchain networks.' },
    { icon: '💰', title: 'Low Fees', description: 'Enjoy the most competitive trading fees in the industry.' },
    { icon: '🔒', title: 'High Security', description: 'Your wallet is always protected with industry-leading security standards.' },
    { icon: '🌐', title: 'Multi-Chain', description: 'Support for trading on Ethereum, BNB Chain, Solana, Arbitrum, and more.' },
    { icon: '📊', title: 'Professional Tools', description: 'Access advanced charts, real-time order books, and in-depth analytics.' },
    { icon: '🚀', title: 'Yield Farming', description: 'Earn rewards by providing liquidity and staking tokens.' },
  ];

  return (
    // CONTAINER BAO NGOÀI (Chịu trách nhiệm căn lề 6%)
    <div style={{ 
      padding: '0 6%',       // Yêu cầu 1: Cách lề trái phải 6%
      marginTop: '40px',
      marginBottom: '100px', // Yêu cầu 2: Tách xa footer ra (cách đáy 100px)
      position: 'relative',
      zIndex: 10
    }}>
      
      {/* KHỐI CHÍNH (Feature Block) - Được bo góc và có nền mờ */}
      <section style={{ 
        backgroundColor: 'rgba(15, 23, 42, 0.6)', // Nền tối trong suốt (Slate-900 60%)
        backdropFilter: 'blur(12px)',             // Hiệu ứng kính mờ
        borderRadius: '32px',                     // Yêu cầu 3: Bo góc cả khối lớn
        border: '1px solid rgba(255, 255, 255, 0.05)', // Viền mỏng bao quanh khối
        padding: '60px 40px',                     // Padding bên trong khối
        maxWidth: '1400px',                       // Giới hạn chiều rộng tối đa cho đẹp
        margin: '0 auto',                         // Căn giữa khối
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.3)' // Đổ bóng nhẹ cho nổi khối
      }}>
        
        {/* Header của Section */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h2 style={{
            color: '#facc15',
            fontSize: '2.5rem',
            marginBottom: '16px',
            fontWeight: 'bold',
            textShadow: '0 0 30px rgba(250, 204, 21, 0.2)'
          }}>
            Why Choose DeFi DEX?
          </h2>
          <p style={{
            color: '#94a3b8',
            fontSize: '1.05rem',
            maxWidth: '650px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Experience the next level of decentralized trading with our powerful features, 
            designed for both beginners and pro traders.
          </p>
        </div>

        {/* Grid các tính năng */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px',
        }}>
          {features.map((feature, index) => (
            <div 
              key={index}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.03)', // Nền từng thẻ con nhạt hơn nữa
                borderRadius: '20px',
                padding: '24px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '16px',
                transition: 'all 0.3s ease',
                border: '1px solid transparent' // Chuẩn bị sẵn border để hover
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.backgroundColor = 'rgba(255, 255, 255, 0.08)'; // Sáng hơn khi hover
                el.style.transform = 'translateY(-4px)';
                el.style.border = '1px solid rgba(250, 204, 21, 0.3)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.backgroundColor = 'rgba(255, 255, 255, 0.03)';
                el.style.transform = 'translateY(0)';
                el.style.border = '1px solid transparent';
              }}
            >
              {/* Icon */}
              <div style={{
                flexShrink: 0,
                width: '56px',
                height: '56px',
                borderRadius: '14px',
                background: 'linear-gradient(135deg, rgba(250,204,21,0.1), rgba(250,204,21,0.05))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.75rem',
                border: '1px solid rgba(250, 204, 21, 0.15)'
              }}>
                {feature.icon}
              </div>
              
              {/* Nội dung */}
              <div>
                <h3 style={{
                  color: 'white',
                  fontSize: '1.15rem',
                  fontWeight: '700',
                  marginBottom: '8px'
                }}>
                  {feature.title}
                </h3>
                <p style={{
                  color: '#94a3b8',
                  fontSize: '0.95rem',
                  lineHeight: '1.5',
                  margin: 0
                }}>
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default FeaturesSection;