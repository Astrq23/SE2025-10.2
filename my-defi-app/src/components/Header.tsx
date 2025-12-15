// D:\cnpm\my-defi-app/src/components/Header.tsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import WalletLogin from './WalletLogin';
import TradeDropdown from './TradeDropdown';
import './Header.css';

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

// Navigation links
const navLinks = [
  { name: 'Trade', href: '/trade', isHighlight: true },
  { name: 'Perps', href: '/trade', isHighlight: false },
  { name: 'Earn', href: '/earn', isHighlight: false },
  { name: 'CAKEPAD', href: '#cakepad', isHighlight: false },
  { name: 'Play', href: '#play', isHighlight: false },
];

const Header: React.FC = () => {
  const [currentNetwork, setCurrentNetwork] = useState('BNB Chain');
  const [isNetworkOpen, setIsNetworkOpen] = useState(false);
  const [isTradeDropdownOpen, setIsTradeDropdownOpen] = useState(false);

  // Refs để xử lý đóng dropdown khi click ra ngoài
  const tradeRef = React.useRef<HTMLDivElement>(null);
  const networkRef = React.useRef<HTMLDivElement>(null);

  // Hàm xử lý Click (Toggle) cho nút Trade
  const handleTradeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsTradeDropdownOpen((prev) => !prev);
    setIsNetworkOpen(false);
  };

  // Hàm xử lý Click (Toggle) cho nút Network
  const handleNetworkClick = () => {
    setIsNetworkOpen((prev) => !prev);
    setIsTradeDropdownOpen(false);
  };

  // Logic đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        tradeRef.current &&
        !tradeRef.current.contains(event.target as Node)
      ) {
        setIsTradeDropdownOpen(false);
      }

      if (
        networkRef.current &&
        !networkRef.current.contains(event.target as Node)
      ) {
        setIsNetworkOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Hàm xử lý Click cho các nút vô hiệu hóa
  const handleDisabledLinkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log(
      `Tính năng ${e.currentTarget.textContent} đang được phát triển.`,
    );
  };

  // Styles cho Network Dropdown
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
    <header className="defi-header">
      <div className="header-inner">
        {/* Logo & Tên (ĐÃ THÊM LINK VỀ TRANG CHỦ) */}
        <Link to="/" style={{ textDecoration: 'none' }}>
          <div
            className="header-logo-container"
            style={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
            }}
          >
            <span
              role="img"
              aria-label="DeFi Logo"
              style={{
                fontSize: '32px',
                marginRight: '8px',
                color: '#facc15',
              }}
            >
              🥞
            </span>
            <span
              style={{
                fontSize: '20px',
                fontWeight: 800,
                color: 'white',
              }}
            >
              DeFi DEX
            </span>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="nav-link-container">
          {navLinks.map((link) => {
            const isTradeButton = link.name === 'Trade';
            const isDisabledLink =
              link.name === 'Perps' || link.name === 'Earn';

            if (isTradeButton) {
              return (
                <div
                  key={link.name}
                  ref={tradeRef}
                  style={{
                    position: 'relative',
                    display: 'inline-flex',
                    alignItems: 'center',
                  }}
                >
                  <Link
                    to={link.href}
                    onClick={handleTradeClick}
                    className={`nav-link ${
                      link.isHighlight ? 'nav-link-highlight' : ''
                    }`}
                  >
                    {link.name}
                  </Link>

                  {isTradeDropdownOpen && <TradeDropdown />}
                </div>
              );
            }

            if (isDisabledLink) {
              return (
                <a
                  key={link.name}
                  href="#"
                  onClick={handleDisabledLinkClick}
                  className={`nav-link ${
                    link.isHighlight ? 'nav-link-highlight' : ''
                  } nav-link-disabled`}
                  style={{ cursor: 'not-allowed', opacity: 0.6 }}
                >
                  {link.name}
                </a>
              );
            }

            return (
              <Link
                key={link.name}
                to={link.href}
                className={`nav-link ${
                  link.isHighlight ? 'nav-link-highlight' : ''
                }`}
              >
                {link.name}
              </Link>
            );
          })}

          <button className="nav-link" style={{ padding: '8px' }}>
            •••
          </button>
        </nav>

        {/* Wallet & Network */}
        <div
          className="header-wallet-controls"
          style={{ position: 'relative' }}
        >
          <div
            ref={networkRef}
            style={{
              position: 'relative',
              display: 'inline-block',
              marginRight: '8px',
            }}
          >
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
              }}
            >
              ⚙️ {currentNetwork} ⌄
            </button>

            {isNetworkOpen && (
              <div style={networkDropdownStyle}>
                {NETWORKS.map((net) => (
                  <div
                    key={net.name}
                    style={networkItemStyle}
                    onClick={() => {
                      setCurrentNetwork(net.name);
                      setIsNetworkOpen(false);
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#334155';
                      e.currentTarget.style.color = 'white';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#1e293b';
                      e.currentTarget.style.color = '#b8c0cc';
                    }}
                  >
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
