import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import WalletLogin from './WalletLogin';
import './Header.css';

// --- IMPORT ẢNH (QUAN TRỌNG: Cần đúng tên file và phần mở rộng) ---
import ricoinLogo from '../assets/Ricoin.png'; 

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

// Navigation links - Đã thêm 'News'
const navLinks = [
  { name: 'Trade', href: '/trade' },
  { name: 'MintNFT', href: '/mint' },
  { name: 'Tokens', href: '/tokens' },
  { name: 'Swap', href: '/swap' },
  { name: 'Marketplace', href: '/nft-marketplace' },
  { name: 'News', href: '/news', isHot: true } // Thêm cờ isHot để hiện badge
];

const Header: React.FC = () => {
  const [currentNetwork, setCurrentNetwork] = useState('BNB Chain');
  const [isNetworkOpen, setIsNetworkOpen] = useState(false);
  
  const location = useLocation();

  // Ref only for Network dropdown
  const networkRef = React.useRef<HTMLDivElement>(null);

  // Handle Click for Network button
  const handleNetworkClick = () => {
    setIsNetworkOpen((prev) => !prev);
  };

  // Logic to close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check click outside Network Dropdown
      if (networkRef.current && !networkRef.current.contains(event.target as Node)) {
        setIsNetworkOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
        style={{ width: '100%', maxWidth: '100%', margin: '0', padding: '0 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '70px', boxSizing: 'border-box' }}
      >
        {/* 1. Logo */}
        <Link to="/" style={{ textDecoration: 'none' }}>
          <div className="header-logo-container" style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            
            {/* Logo Hình - Sử dụng biến đã import */}
            <img 
              src={ricoinLogo} 
              alt="Ricoin" 
              style={{ height: '40px', width: 'auto', marginRight: '10px' }} 
            />

            {/* Logo Chữ */}
            <span style={{ fontSize: '20px', fontWeight: 800, color: 'white' }}>
              RICOIN
            </span>
            
          </div>
        </Link>

        {/* 2. Navigation */}
        <nav className="nav-link-container" style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
          {navLinks.map((link) => {
            const isActive = location.pathname === link.href;
            const activeClass = isActive ? 'nav-link-highlight' : '';

            return (
              <Link 
                key={link.name} 
                to={link.href} 
                className={`nav-link ${activeClass}`}
                style={{ position: 'relative' }} // Thêm position relative để định vị badge
              >
                {link.name}
                
                {/* Badge HOT cho News */}
                {link.isHot && (
                  <span style={{
                    position: 'absolute',
                    top: '-8px',
                    right: '-12px',
                    backgroundColor: '#ef4444',
                    color: 'white',
                    fontSize: '9px',
                    fontWeight: 'bold',
                    padding: '2px 5px',
                    borderRadius: '99px',
                    boxShadow: '0 0 5px rgba(239, 68, 68, 0.5)',
                    animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                  }}>
                    HOT
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* 3. Wallet & Network */}
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
                  <div 
                    key={net.name} 
                    style={networkItemStyle} 
                    onClick={() => { setCurrentNetwork(net.name); setIsNetworkOpen(false); }} 
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#334155'; e.currentTarget.style.color = 'white'; }} 
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#1e293b'; e.currentTarget.style.color = '#b8c0cc'; }}
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
      
      {/* CSS Animation cho badge HOT */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: .8; transform: scale(1.05); }
        }
      `}</style>
    </header>
  );
};

export default Header;