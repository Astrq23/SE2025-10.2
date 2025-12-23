// src/components/Footer.tsx

import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer style={{
      backgroundColor: '#111827', 
      borderTop: '1px solid #1f2937', 
      padding: '60px 20px 30px',
      color: '#cbd5e1', 
      fontFamily: '"Inter", sans-serif',
      marginTop: 'auto' 
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '40px',
        marginBottom: '40px'
      }}>
        
        {/* COL 1: BRAND INFO */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            {/* Main Logo */}
            <div style={{ 
              width: '32px', height: '32px', 
              background: 'linear-gradient(135deg, #facc15, #f97316)', 
              borderRadius: '8px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 'bold', color: 'black'
            }}>Z</div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white', margin: 0 }}>
              Zenith Portal
            </h2>
          </div>
          <p style={{ color: '#94a3b8', lineHeight: '1.6', fontSize: '0.95rem' }}>
            The leading Decentralized Exchange (DEX). Trade, earn, and own crypto assets with the fastest speeds and lowest fees.
          </p>
        </div>

        {/* COL 2: QUICK LINKS (ĐÃ ĐỒNG BỘ VỚI HEADER) */}
        <div>
          <h3 style={{ color: 'white', fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '20px' }}>
            Discover
          </h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <li>
              <Link to="/trade" style={linkStyle}>Trade</Link>
            </li>
            <li>
              <Link to="/mint" style={linkStyle}>Mint NFT</Link>
            </li>
            <li>
              <Link to="/tokens" style={linkStyle}>Tokens</Link>
            </li>
            <li>
              <Link to="/swap" style={linkStyle}>Swap</Link>
            </li>
            <li>
              <Link to="/nft-marketplace" style={linkStyle}>Marketplace</Link>
            </li>
          </ul>
        </div>

        {/* COL 3: COMMUNITY */}
        <div>
          <h3 style={{ color: 'white', fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '20px' }}>
            Community
          </h3>
          <p style={{ color: '#94a3b8', marginBottom: '20px', fontSize: '0.95rem' }}>
            Join our community for the latest updates.
          </p>
          
          <div style={{ display: 'flex', gap: '15px' }}>
            {/* Twitter / X */}
            <a href="#" style={socialIconWrapper}>
              <img 
                src="https://img.icons8.com/ios-filled/50/ffffff/twitterx--v1.png" 
                alt="Twitter" 
                style={iconImageStyle} 
              />
            </a>
            
            {/* Discord */}
            <a href="#" style={socialIconWrapper}>
               <img 
                src="https://img.icons8.com/ios-filled/50/ffffff/discord-logo.png" 
                alt="Discord" 
                style={iconImageStyle} 
              />
            </a>

            {/* Telegram */}
            <a href="#" style={socialIconWrapper}>
              <img 
                src="https://img.icons8.com/ios-filled/50/ffffff/telegram-app.png" 
                alt="Telegram" 
                style={iconImageStyle} 
              />
            </a>

            {/* Github */}
            <a 
              href="https://github.com/Astrq23/SE2025-10.2/tree/main" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={socialIconWrapper}
            >
              <img 
                src="https://img.icons8.com/ios-filled/50/ffffff/github.png" 
                alt="GitHub" 
                style={iconImageStyle} 
              />
            </a>
          </div>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div style={{
        borderTop: '1px solid #1f2937', 
        paddingTop: '20px',
        textAlign: 'center',
        fontSize: '0.85rem',
        color: '#64748b'
      }}>
        <p>© 2025 Zenith Portal. All rights reserved.</p>
      </div>
    </footer>
  );
};

// --- STYLES ---
const linkStyle: React.CSSProperties = {
  color: '#94a3b8',
  textDecoration: 'none',
  transition: 'color 0.2s',
  fontSize: '0.95rem'
};

const socialIconWrapper: React.CSSProperties = {
  width: '40px',
  height: '40px',
  backgroundColor: '#1f2937', 
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textDecoration: 'none',
  transition: 'all 0.2s',
  border: '1px solid #374151'
};

const iconImageStyle: React.CSSProperties = {
  width: '20px', 
  height: '20px', 
  objectFit: 'contain'
};

export default Footer;