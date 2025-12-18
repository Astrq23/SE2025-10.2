import React, { useState } from 'react';
import TokenSelector from '../components/TokenSelector';
import TokenBalance from '../components/TokenBalance';
import AppPagination from '../components/AppPagination';
import FeaturesSection from '../components/FeaturesSection';

const TokenManagementView: React.FC = () => {
  const [selectedToken, setSelectedToken] = useState<`0x${string}` | undefined>();

  const handleTokenSelect = (tokenAddress: `0x${string}`) => {
    setSelectedToken(tokenAddress);
  };

  const handleTransfer = (to: string, amount: string) => {
    console.log(`Transfer ${amount} to ${to}`);
    alert(`Đã gửi ${amount} token đến ${to}`);
  };

  return (
    <div className="min-h-screen bg-defi-bg text-white">
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '20px 20px 80px',
        }}
      >
        {/* Tiêu đề */}
        <h1 style={{ color: '#facc15', fontSize: '2.5rem', marginBottom: '20px' }}>
          Quản lý Token ERC-20
        </h1>
        <p style={{ color: '#b8c0cc', fontSize: '1.25rem', marginBottom: '40px' }}>
          Xem số dư, gửi và quản lý các token ERC-20 của bạn trên các blockchain khác nhau.
        </p>

        {/* Layout chính */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '30px' }}>
          {/* Cột trái: Token Selector */}
          <div>
            <TokenSelector onTokenSelect={handleTokenSelect} selectedToken={selectedToken} />
          </div>

          {/* Cột phải: Token Balance & Transfer */}
          <div>
            {selectedToken ? (
              <TokenBalance
                tokenAddress={selectedToken}
                onTransfer={handleTransfer}
              />
            ) : (
              <div
                style={{
                  backgroundColor: '#1e293b',
                  borderRadius: '16px',
                  border: '1px solid #334155',
                  padding: '40px',
                  textAlign: 'center',
                  minHeight: '300px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div style={{ fontSize: '3rem', marginBottom: '15px' }}>
                  🪙
                </div>
                <h3 style={{ color: '#b8c0cc', marginBottom: '10px' }}>
                  Chọn một token để bắt đầu
                </h3>
                <p style={{ color: '#88909c' }}>
                  Chọn từ danh sách token phổ biến hoặc thêm token tùy chỉnh
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Phần thông tin chi tiết */}
        <div
          style={{
            marginTop: '60px',
            padding: '30px',
            backgroundColor: '#1e293b',
            borderRadius: '16px',
            border: '1px solid #334155',
          }}
        >
          <h2 style={{ color: '#facc15', fontSize: '1.8rem', marginBottom: '20px' }}>
            Về Quản lý Token ERC-20
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
            <div>
              <h3 style={{ color: '#4ade80', marginBottom: '10px', fontSize: '1.1rem' }}>
                ✓ Xem Số Dư
              </h3>
              <p style={{ color: '#b8c0cc', lineHeight: '1.6' }}>
                Kiểm tra số dư token của bạn trên bất kỳ blockchain nào được hỗ trợ, bao gồm
                BNB Chain, Ethereum, Arbitrum và nhiều chuỗi khác.
              </p>
            </div>

            <div>
              <h3 style={{ color: '#4ade80', marginBottom: '10px', fontSize: '1.1rem' }}>
                📤 Gửi Token
              </h3>
              <p style={{ color: '#b8c0cc', lineHeight: '1.6' }}>
                Gửi token của bạn đến bất kỳ địa chỉ Ethereum nào một cách nhanh chóng và
                an toàn với phí giao dịch tối ưu.
              </p>
            </div>

            <div>
              <h3 style={{ color: '#4ade80', marginBottom: '10px', fontSize: '1.1rem' }}>
                🔐 Phê Duyệt Token
              </h3>
              <p style={{ color: '#b8c0cc', lineHeight: '1.6' }}>
                Phê duyệt token cho các hợp đồng thông minh trước khi thực hiện các giao dịch
                như swap, stake hoặc borrow.
              </p>
            </div>

            <div>
              <h3 style={{ color: '#4ade80', marginBottom: '10px', fontSize: '1.1rem' }}>
                🌐 Đa Blockchain
              </h3>
              <p style={{ color: '#b8c0cc', lineHeight: '1.6' }}>
                Quản lý token trên nhiều blockchain chỉ từ một interface, không cần chuyển đổi
                mạng liên tục.
              </p>
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

      {/* Features Section */}
      <FeaturesSection />
    </div>
  );
};

export default TokenManagementView;
