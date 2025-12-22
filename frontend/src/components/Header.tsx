import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom'; // Thêm useLocation

import WalletLogin from './WalletLogin';
import TradeDropdown from './TradeDropdown';
import './Header.css';

// List of networks
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

// Navigation links
// ĐÃ XÓA: isHighlight cứng (Để code tự xử lý)
const navLinks = [
  { name: 'Trade', href: '/trade' },
  { name: 'MintNFT', href: '/mint' },
  { name: 'Tokens', href: '/tokens' },
  { name: 'Swap', href: '/swap' },
  { name: 'Marketplace', href: '/nft-marketplace' }
];

const Header: React.FC = () => {
  const [currentNetwork, setCurrentNetwork] = useState('BNB Chain');
  const [isNetworkOpen, setIsNetworkOpen] = useState(false);
  const [isTradeDropdownOpen, setIsTradeDropdownOpen] = useState(false);
  
  // Hook lấy đường dẫn hiện tại (Ví dụ: '/mint', '/trade'...)
  const location = useLocation();

  // Refs to handle closing dropdown when clicking outside
  const tradeRef = React.useRef<HTMLDivElement>(null);
  const networkRef = React.useRef<HTMLDivElement>(null);

  // Handle Click (Toggle) for Trade button
  const handleTradeClick = (e: React.MouseEvent) => {
    // Nếu muốn bấm Trade vẫn chuyển trang thì bỏ e.preventDefault()
    // Hoặc giữ lại nếu Trade chỉ để mở menu
    // e.preventDefault(); 
    setIsTradeDropdownOpen((prev) => !prev);
    setIsNetworkOpen(false);
  };

  // Handle Click (Toggle) for Network button
  const handleNetworkClick = () => {
    setIsNetworkOpen((prev) => !prev);
    setIsTradeDropdownOpen(false);
  };

  // Logic to close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (tradeRef.current && !tradeRef.current.contains(event.target as Node)) {
        setIsTradeDropdownOpen(false);
      }
      if (networkRef.current && !networkRef.current.contains(event.target as Node)) {
        setIsNetworkOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle click for disabled links
  const handleDisabledLinkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log(`Feature ${e.currentTarget.textContent} is under development.`);
  };

  // Styles for Network Dropdown
  const networkDropdownStyle: React.CSSProperties = {
    position: 'absolute',
    top: '100%',
    right: 0,
    marginTop: '8px',
    backgroundColor: '#1e293b',
    border: '1px solid #334155',
    borderRadius: '12px',
    padding: '8px 0',
    minWidth: '180px',
    zIndex: 100,
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
  };

  const networkItemStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 15px',
    fontSize: '0.95rem',
    color: '#b8c0cc',
    cursor: 'pointer',
  };

  return (
    <header className="defi-header" style={{ width: '100%', borderBottom: '1px solid #334155' }}>
      <div 
        className="header-inner" 
        style={{ 
          width: '100%',          
          maxWidth: '100%',       
          margin: '0',
          padding: '0 30px',      
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          height: '70px',
          boxSizing: 'border-box'
        }}
      >
        {/* 1. Logo & Name (Left) */}
        <Link to="/" style={{ textDecoration: 'none' }}>
          <div className="header-logo-container" style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <span role="img" aria-label="DeFi Logo" style={{ fontSize: '32px', marginRight: '8px', color: '#facc15' }}>🥞</span>
            <span style={{ fontSize: '20px', fontWeight: 800, color: 'white' }}>DeFi DEX</span>
          </div>
        </Link>

        {/* 2. Navigation (Center) */}
        <nav className="nav-link-container" style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
          {navLinks.map((link) => {
            const isTradeButton = link.name === 'Trade';
            // Logic Active: Nếu đường dẫn hiện tại trùng với link.href
            const isActive = location.pathname === link.href;
            
            // Logic Disabled: (Hiện tại đang tắt)
            const isDisabledLink = false;

            // Class Highlight động
            const activeClass = isActive ? 'nav-link-highlight' : '';

            if (isTradeButton) {
              return (
                <div key={link.name} ref={tradeRef} style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
                  <Link 
                    to={link.href} 
                    onClick={handleTradeClick} 
                    className={`nav-link ${activeClass}`} // Thêm class active động
                  >
                    {link.name}
                  </Link>
                  {isTradeDropdownOpen && <TradeDropdown />}
                </div>
              );
            }

            if (isDisabledLink) {
              return (
                <a key={link.name} href="#" onClick={handleDisabledLinkClick} className={`nav-link ${activeClass} nav-link-disabled`} style={{ cursor: 'not-allowed', opacity: 0.6 }}>
                  {link.name}
                </a>
              );
            }

            return (
              <Link key={link.name} to={link.href} className={`nav-link ${activeClass}`}>
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* 3. Wallet & Network (Right) */}
        <div className="header-wallet-controls" style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div ref={networkRef} style={{ position: 'relative' }}>
            <button
              onClick={handleNetworkClick}
              style={{
                display: 'flex',
                alignItems: 'center',
                fontSize: '14px',
                fontWeight: 600,
                padding: '8px 12px',
                borderRadius: '12px',
                backgroundColor: '#303953',
                color: 'white',
                cursor: 'pointer',
                border: isNetworkOpen ? '1px solid #7a6eec' : 'none',
                gap: '6px'
              }}
            >
              ⚙️ {currentNetwork}
            </button>

            {isNetworkOpen && (
              <div style={networkDropdownStyle}>
                {NETWORKS.map((net) => (
                  <div key={net.name} style={networkItemStyle} onClick={() => { setCurrentNetwork(net.name); setIsNetworkOpen(false); }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#334155'; e.currentTarget.style.color = 'white'; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#1e293b'; e.currentTarget.style.color = '#b8c0cc'; }}>
                    <span style={{ color: net.color }}>{net.icon}</span>
                    {net.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          <WalletLogin />
        </div>
      </div>
    </header>
  );
};

export default Header;