// D:\cnpm\my-defi-app/src/components/Header.tsx (ĐÃ FIX LỖI CẬP NHẬT MẠNG LƯỚI)

import React, { useState } from 'react';
import WalletLogin from './WalletLogin'; 
import './Header.css'; // Import file CSS riêng

// Danh sách các mạng lưới
const NETWORKS = [
  { name: 'BNB Chain', icon: '💰', color: '#f0b90b' },
  { name: 'Ethereum', icon: '💎', color: '#627EEA' },
  { name: 'Solana', icon: '☀️', color: '#9945FF' },
  { name: 'Aptos', icon: '⚛️', color: '#6398AA' },
  { name: 'Base', icon: '🟦', color: '#0052FF' },
  { name: 'Monad', icon: '💫', color: '#ff69b4' },
  { name: 'Arbitrum One', icon: '⭕', color: '#2C3548' },
  { name: 'ZKSync Era', icon: '⏳', color: '#F0F0F0' },
];

interface NetworkSelectorProps {
    onClose: () => void;
    currentNetwork: string; // Mạng lưới đang được chọn (để highlight)
    onNetworkSelect: (name: string) => void; // Hàm để cập nhật mạng lưới
}

// Component popup chọn mạng lưới
const NetworkSelector: React.FC<NetworkSelectorProps> = ({ onClose, currentNetwork, onNetworkSelect }) => {
  
  const handleSelect = (name: string) => {
    onNetworkSelect(name); // Cập nhật mạng lưới ở component cha
    onClose();
  };

  return (
    <div style={{
      position: 'absolute',
      top: 'calc(100% + 10px)', 
      right: '10px',
      backgroundColor: '#1f2937', 
      borderRadius: '12px',
      padding: '10px 0',
      width: '240px',
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.4)',
      zIndex: 50
    }}>
      <div style={{ padding: '0 15px 10px 15px', color: '#b8c0cc', fontSize: '0.9rem', fontWeight: 'bold', borderBottom: '1px solid #334155' }}>
        Select a Network
      </div>
      
      {NETWORKS.map(network => (
        <div 
          key={network.name}
          onClick={() => handleSelect(network.name)}
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '10px 15px',
            cursor: 'pointer',
            // Sử dụng currentNetwork để xác định highlight
            backgroundColor: currentNetwork === network.name ? '#374151' : 'transparent', 
            transition: 'background-color 0.15s'
          }}
          onMouseOver={e => e.currentTarget.style.backgroundColor = currentNetwork === network.name ? '#374151' : '#2b3445'}
          onMouseOut={e => e.currentTarget.style.backgroundColor = currentNetwork === network.name ? '#374151' : 'transparent'}
        >
          <span style={{ fontSize: '1.2rem', marginRight: '10px' }}>{network.icon}</span>
          <span style={{ color: currentNetwork === network.name ? 'white' : '#b8c0cc' }}>{network.name}</span>
        </div>
      ))}
    </div>
  );
};

// Component Header chính
const navLinks = [
  { name: 'Trade', href: '#trade', isHighlight: true },
  { name: 'Perps', href: '#perps', isHighlight: false },
  { name: 'Earn', href: '#earn', isHighlight: false },
  { name: 'CAKEPAD', href: '#cakepad', isHighlight: false },
  { name: 'Play', href: '#play', isHighlight: false },
];

const Header: React.FC = () => {
  // ⚠️ KHAI BÁO TRẠNG THÁI MẠNG LƯỚI
  const [currentNetwork, setCurrentNetwork] = useState('BNB Chain');
  const [isNetworkOpen, setIsNetworkOpen] = useState(false);

  return (
    <header className="defi-header">
      <div className="header-inner">
        
        {/* 1. Logo và Tên Project */}
        <div className="header-logo-container" style={{ display: 'flex', alignItems: 'center' }}>
          <span role="img" aria-label="DeFi Logo" style={{ fontSize: '32px', marginRight: '8px', color: '#facc15' }}>🥞</span>
          <span style={{ fontSize: '20px', fontWeight: '800', color: 'white' }}>DeFi DEX</span>
        </div>

        {/* 2. Các chức năng điều hướng */}
        <nav className="nav-link-container"> 
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`nav-link ${link.isHighlight ? 'nav-link-highlight' : ''}`}
            >
              {link.name}
            </a>
          ))}
          <button className="nav-link" style={{ padding: '8px' }}>
            •••
          </button>
        </nav>

        {/* 3. Chỉ số và Nút Kết nối Ví */}
        <div className="header-wallet-controls" style={{ position: 'relative' }}>
          
          {/* Giá token (Mô phỏng) */}
          <div style={{ display: 'flex', alignItems: 'center', fontSize: '14px', fontWeight: '600', padding: '8px', borderRadius: '9999px', backgroundColor: '#1a2035' }}>
              <span style={{ color: '#06b6d4', marginRight: '8px' }}>CAKE</span>
              <span style={{ color: '#10b981' }}>$2.211</span>
          </div>
          
          {/* Nút Chọn Chain (Kích hoạt popup) */}
          <button 
            onClick={() => setIsNetworkOpen(!isNetworkOpen)}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              fontSize: '14px', 
              fontWeight: '600', 
              padding: '8px 12px', 
              borderRadius: '12px', 
              backgroundColor: '#303953', 
              color: 'white', 
              cursor: 'pointer',
              border: isNetworkOpen ? '1px solid #7a6eec' : 'none', 
            }}
          >
              <span role="img" aria-label="Chain" style={{ marginRight: '8px' }}>⚙️</span>
              {/* ⚠️ HIỂN THỊ TRẠNG THÁI HIỆN TẠI */}
              {currentNetwork} ⌄
          </button>
          
          {/* Component Popup Network Selector */}
          {isNetworkOpen && (
            <NetworkSelector 
              onClose={() => setIsNetworkOpen(false)} 
              currentNetwork={currentNetwork}
              onNetworkSelect={setCurrentNetwork} // TRUYỀN HÀM CẬP NHẬT
            />
          )}

          {/* Nút Kết nối Ví (WalletLogin Component) */}
          <WalletLogin />
        </div>

      </div>
    </header>
  );
};

export default Header;