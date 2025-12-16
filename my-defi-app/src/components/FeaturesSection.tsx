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
      title: 'Giao dịch nhanh',
      description: 'Thực hiện giao dịch với tốc độ cao trên nhiều chuỗi blockchain hàng đầu.',
    },
    {
      icon: '💰',
      title: 'Phí thấp',
      description: 'Tận hưởng những khoản phí giao dịch cạnh tranh nhất trong ngành.',
    },
    {
      icon: '🔒',
      title: 'Bảo mật cao',
      description: 'Ví của bạn luôn được bảo vệ với các tiêu chuẩn bảo mật hàng đầu.',
    },
    {
      icon: '🌐',
      title: 'Đa chuỗi',
      description: 'Hỗ trợ giao dịch trên Ethereum, BNB Chain, Solana, Arbitrum, v.v.',
    },
    {
      icon: '📊',
      title: 'Công cụ chuyên nghiệp',
      description: 'Truy cập các biểu đồ nâng cao, sổ lệnh thực tế và phân tích chuyên sâu.',
    },
    {
      icon: '🚀',
      title: 'Yield Farming',
      description: 'Kiếm phần thưởng thông qua cung cấp thanh khoản và staking token.',
    },
  ];

  return (
    <section style={{ 
      backgroundColor: '#0f172a',
      padding: '80px 0',
      borderTop: '1px solid #334155'
    }}>
      <div style={{
        maxWidth: '1200px',
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
            Tại sao chọn DeFi DEX?
          </h2>
          <p style={{
            color: '#b8c0cc',
            fontSize: '1.1rem',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Nền tảng giao dịch DeFi toàn diện với hiệu suất cao, bảo mật tuyệt vời và trải nghiệm người dùng tuyệt vời.
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
              Tổng thanh khoản
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
              Chuỗi được hỗ trợ
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
              Người dùng hoạt động
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
              Phí giao dịch thấp
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
