// D:/cnpm/my-defi-app/src/components/TradeDropdown.tsx

import React from 'react';
import { Link } from 'react-router-dom';

// Không cần định nghĩa props nữa
const TradeDropdown: React.FC = () => {
  
  const dropdownStyle: React.CSSProperties = {
    position: 'absolute',
    top: '100%',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: '#1e293b',
    border: '1px solid #334155',
    borderRadius: '12px',
    padding: '8px 0',
    minWidth: '150px',
    zIndex: 100,
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
  };

  const itemStyle: React.CSSProperties = {
    display: 'block',
    padding: '10px 15px',
    fontSize: '0.95rem',
    color: '#b8c0cc',
    textDecoration: 'none',
    transition: 'background-color 0.2s',
  };

  // Helper function để render các mục Link
  const renderItem = (name: string, path: string) => (
    <Link
      to={path}
      key={name}
      style={itemStyle}
      // Xử lý hiệu ứng hover bằng inline style
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = '#334155';
        e.currentTarget.style.color = 'white';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = '#1e293b';
        e.currentTarget.style.color = '#b8c0cc';
        // Không cần gọi hàm đóng dropdown nữa
      }}
      // Lưu ý: khi click vào Link, nó sẽ chuyển hướng và dropdown sẽ tự đóng
    >
      {name}
    </Link>
  );

  return (
    <div 
        style={dropdownStyle} 
        // Không cần onMouseLeave/onMouseEnter ở đây nữa
    >
      
      {/* 1. Mục Swap */}
      {renderItem('Swap', '/trade')}

      {/* 2. Mục Buy Crypto - ĐÃ CÓ CHỨC NĂNG CHUYỂN TRANG */}
      {renderItem('Buy Crypto', '/buy-crypto')}
      
    </div>
  );
};

export default TradeDropdown;