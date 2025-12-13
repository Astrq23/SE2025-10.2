// D:\cnpm\my-defi-app/src/components/WalletLogin.tsx (FIX LỖI SIWE: RÚT GỌN MESSAGE)

import React, { useState, useEffect } from 'react';
import { useAccount, useConnect, useDisconnect, useSignMessage } from 'wagmi';
import { injected } from 'wagmi/connectors'; 
import { SiweMessage } from 'siwe';

// URL của Backend API
const API_URL = 'http://localhost:4000/api';

const WalletLogin: React.FC = () => {
  const { address, isConnected, isConnecting } = useAccount(); 
  const { connect } = useConnect(); 
  const { disconnect } = useDisconnect();
  const { signMessageAsync } = useSignMessage();

  const [isSiweLoading, setIsSiweLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userAddress, setUserAddress] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false); 

  // --- Hàm Đăng nhập Chính (SIWE) ---
  const signIn = async () => {
    if (!address) return;
    try {
      setIsLoading(true);
      const nonceRes = await fetch(`${API_URL}/nonce`);
      if (!nonceRes.ok) throw new Error('Không thể lấy Nonce.');
      const { nonce } = await nonceRes.json();
      
      // ⚠️ FIX LỖI SIWE: Rút ngắn statement và đảm bảo các trường là chính xác
      const message = new SiweMessage({
        domain: window.location.host,
        address: address,
        // RÚT GỌN STATEMENT
        statement: 'Sign in to DeFi App.', 
        uri: window.location.origin,
        version: '1',
        // ⚠️ THAY THẾ CHUỖI '1' BẰNG SỐ 1. ChainID phải là số.
        chainId: 1, 
        nonce: nonce,
      });
      
      const messageToSign = message.prepareMessage();
      
      // ⚠️ KIỂM TRA LỖI TRƯỚC KHI KÝ
      if (messageToSign.length > 250) {
        console.error("SIWE Message too long:", messageToSign);
        throw new Error('Thông báo SIWE quá dài.');
      }
      
      const signature = await signMessageAsync({ message: messageToSign });
      const verifyRes = await fetch(`${API_URL}/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: messageToSign, signature }),
      });

      if (verifyRes.ok) {
        const { address } = await verifyRes.json();
        setIsLoggedIn(true);
        setUserAddress(address);
      } else {
        throw new Error('Xác minh Server thất bại.');
      }
    } catch (error) {
      console.error('Lỗi đăng nhập SIWE:', error);
      alert('Đăng nhập thất bại. Vui lòng kiểm tra console.');
      setIsLoggedIn(false);
    } finally {
      setIsLoading(false);
    }
  };

  // --- (Các hàm signOut, useEffect và Render UI giữ nguyên) ---
  // ...

  // Hàm Đăng xuất
  const signOut = async () => {
    try {
      const logoutRes = await fetch(`${API_URL}/logout`, { method: 'POST' });
      if (logoutRes.ok) {
        setIsLoggedIn(false);
        setUserAddress(undefined);
        disconnect(); 
      } else {
        throw new Error('Lỗi đăng xuất Server.');
      }
    } catch (error) {
      console.error('Lỗi đăng xuất:', error);
      alert('Lỗi đăng xuất. Vui lòng thử lại.');
    }
  };

  // Kiểm tra Trạng thái Đăng nhập khi khởi động
  useEffect(() => {
    const checkStatus = async () => {
      try {
        const statusRes = await fetch(`${API_URL}/status`);
        const { isLoggedIn: serverIsLoggedIn, address: serverAddress } = await statusRes.json();
        if (serverIsLoggedIn) {
          setIsLoggedIn(true);
          setUserAddress(serverAddress);
        }
      } catch (error) {
        console.error('Lỗi kiểm tra trạng thái đăng nhập:', error);
      } finally {
        setIsSiweLoading(false);
      }
    };
    checkStatus();
  }, []);

  // Render UI
  const displayAddress = userAddress ? `${userAddress.slice(0, 6)}...${userAddress.slice(-4)}` : '';

  if (isSiweLoading) {
    return (
      <button style={{ backgroundColor: '#20273a', color: 'white', padding: '10px 20px', borderRadius: '12px' }}>
        Đang tải...
      </button>
    );
  }

  if (isConnected && isLoggedIn) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ backgroundColor: '#10b981', color: 'white', fontSize: '0.8rem', padding: '5px 10px', borderRadius: '9999px' }}>
          {displayAddress}
        </span>
        <button 
          onClick={signOut} 
          style={{ 
            backgroundColor: '#ef4444', color: 'white', fontWeight: 'bold', 
            padding: '10px 20px', borderRadius: '12px', cursor: 'pointer', border: 'none' 
          }}
        >
          Đăng xuất
        </button>
      </div>
    );
  }

  if (isConnected && !isLoggedIn) {
    return (
      <button
        onClick={signIn}
        disabled={isLoading}
        style={{
          backgroundColor: '#facc15', 
          color: '#1e293b', 
          fontWeight: 'bold', 
          padding: '10px 20px', 
          borderRadius: '12px', 
          cursor: 'pointer',
          border: 'none',
          opacity: isLoading ? 0.6 : 1
        }}
      >
        {isLoading ? 'Đang ký...' : '🔑 Đăng nhập'}
      </button>
    );
  }

  return (
    <button
      onClick={() => connect({ connector: injected() })} 
      disabled={isConnecting}
      style={{
        backgroundColor: '#7c3aed', 
        color: 'white', 
        fontWeight: 'bold', 
        padding: '10px 20px', 
        borderRadius: '12px', 
        cursor: 'pointer',
        border: 'none',
        boxShadow: '0 4px 14px rgba(124, 58, 237, 0.4)'
      }}
    >
      🔗 {isConnecting ? 'Đang kết nối...' : 'Kết nối Ví'}
    </button>
  );
}

export default WalletLogin;