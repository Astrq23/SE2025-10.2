import React, { useState } from 'react';
import { useToken } from '../hooks/useToken';
import { useAccount } from 'wagmi';
import { truncateAddress, isValidAddress } from '../utils/tokenUtils';

interface TokenBalanceProps {
  tokenAddress?: `0x${string}`;
  onTransfer?: (to: string, amount: string) => void;
}

const TokenBalance: React.FC<TokenBalanceProps> = ({ tokenAddress, onTransfer }) => {
  const { address: userAddress, isConnected } = useAccount();
  const { balance, symbol, decimals, name, isApproving, error } = useToken(tokenAddress);
  const [showTransfer, setShowTransfer] = useState(false);
  const [toAddress, setToAddress] = useState('');
  const [transferAmount, setTransferAmount] = useState('');

  if (!isConnected) {
    return (
      <div style={{ color: '#ef4444', textAlign: 'center', padding: '20px' }}>
        Vui lòng kết nối ví
      </div>
    );
  }

  if (!tokenAddress || !isValidAddress(tokenAddress)) {
    return (
      <div style={{ color: '#ef4444', textAlign: 'center', padding: '20px' }}>
        Địa chỉ token không hợp lệ
      </div>
    );
  }

  const handleTransfer = () => {
    // Kiểm tra địa chỉ
    if (!isValidAddress(toAddress)) {
      alert('❌ Địa chỉ không hợp lệ');
      return;
    }

    // Kiểm tra số lượng
    const amount = parseFloat(transferAmount);
    if (!transferAmount || amount <= 0) {
      alert('❌ Số lượng không hợp lệ');
      return;
    }

    // Kiểm tra số dư (RẤT QUAN TRỌNG)
    const currentBalance = parseFloat(balance);
    if (amount > currentBalance) {
      alert(`❌ Không đủ token!\n\nSố dư: ${balance} ${symbol}\nMuốn gửi: ${transferAmount} ${symbol}`);
      return;
    }

    // Kiểm tra địa chỉ không gửi cho chính mình
    if (toAddress.toLowerCase() === userAddress?.toLowerCase()) {
      alert('❌ Không thể gửi cho chính mình!');
      return;
    }

    // Nếu tất cả kiểm tra đều pass
    if (onTransfer) {
      onTransfer(toAddress, transferAmount);
      setToAddress('');
      setTransferAmount('');
      setShowTransfer(false);
    }
  };

  return (
    <div
      style={{
        backgroundColor: '#1e293b',
        borderRadius: '16px',
        border: '1px solid #334155',
        padding: '20px',
        marginTop: '20px',
      }}
    >
      {/* Thông tin Token */}
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ color: '#ffffff', marginBottom: '10px' }}>
          {name || symbol || 'Unknown Token'}
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          <div>
            <div style={{ color: '#b8c0cc', fontSize: '0.85rem', marginBottom: '5px' }}>
              Địa chỉ Token
            </div>
            <div style={{ color: '#4ade80', fontSize: '0.95rem', fontFamily: 'monospace' }}>
              {truncateAddress(tokenAddress)}
            </div>
          </div>

          <div>
            <div style={{ color: '#b8c0cc', fontSize: '0.85rem', marginBottom: '5px' }}>
              Địa chỉ Ví
            </div>
            <div style={{ color: '#06b6d4', fontSize: '0.95rem', fontFamily: 'monospace' }}>
              {truncateAddress(userAddress || '')}
            </div>
          </div>
        </div>
      </div>

      {/* Số dư */}
      <div
        style={{
          backgroundColor: '#0f172a',
          padding: '15px',
          borderRadius: '12px',
          marginBottom: '15px',
          border: '1px solid #334155',
        }}
      >
        <div style={{ color: '#b8c0cc', fontSize: '0.85rem', marginBottom: '8px' }}>
          Số dư
        </div>
        <div
          style={{
            color: '#facc15',
            fontSize: '2rem',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'baseline',
            gap: '10px',
          }}
        >
          {balance}
          <span style={{ fontSize: '1rem', color: '#b8c0cc' }}>{symbol}</span>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div style={{ color: '#ef4444', fontSize: '0.85rem', marginBottom: '15px' }}>
          ⚠️ {error}
        </div>
      )}

      {/* Nút Transfer */}
      <button
        onClick={() => setShowTransfer(!showTransfer)}
        style={{
          width: '100%',
          padding: '12px',
          backgroundColor: '#4ade80',
          color: '#1e293b',
          fontWeight: 'bold',
          borderRadius: '8px',
          border: 'none',
          cursor: 'pointer',
          fontSize: '1rem',
          marginBottom: showTransfer ? '15px' : '0',
        }}
      >
        {showTransfer ? '✕ Hủy' : '📤 Gửi Token'}
      </button>

      {/* Form Transfer */}
      {showTransfer && (
        <div
          style={{
            backgroundColor: '#0f172a',
            padding: '15px',
            borderRadius: '12px',
            border: '1px solid #334155',
          }}
        >
          <div style={{ marginBottom: '15px' }}>
            <label style={{ color: '#b8c0cc', display: 'block', marginBottom: '5px' }}>
              Gửi đến
            </label>
            <input
              type="text"
              value={toAddress}
              onChange={(e) => setToAddress(e.target.value)}
              placeholder="0x..."
              style={{
                width: '100%',
                padding: '10px',
                backgroundColor: '#1e293b',
                border: '1px solid #334155',
                borderRadius: '8px',
                color: 'white',
                fontSize: '0.9rem',
                boxSizing: 'border-box',
              }}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ color: '#b8c0cc', display: 'block', marginBottom: '5px' }}>
              Số lượng (Sẵn có: {balance} {symbol})
            </label>
            <input
              type="number"
              value={transferAmount}
              onChange={(e) => setTransferAmount(e.target.value)}
              placeholder="0.00"
              step="0.01"
              max={balance}
              style={{
                width: '100%',
                padding: '10px',
                backgroundColor: '#1e293b',
                border: parseFloat(transferAmount) > parseFloat(balance) ? '2px solid #ef4444' : '1px solid #334155',
                borderRadius: '8px',
                color: 'white',
                fontSize: '0.9rem',
                boxSizing: 'border-box',
              }}
            />
            {parseFloat(transferAmount) > parseFloat(balance) && (
              <div style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '5px' }}>
                ⚠️ Số lượng vượt quá số dư!
              </div>
            )}
          </div>

          {(() => {
            const amount = parseFloat(transferAmount);
            const currentBalance = parseFloat(balance);
            const isValid = isValidAddress(toAddress) && 
                           amount > 0 && 
                           amount <= currentBalance &&
                           toAddress.toLowerCase() !== userAddress?.toLowerCase();
            const isDisabled = !isValid || isApproving;

            return (
              <button
                onClick={handleTransfer}
                disabled={isDisabled}
                style={{
                  width: '100%',
                  padding: '12px',
                  backgroundColor: isDisabled ? '#4b5563' : '#06b6d4',
                  color: 'white',
                  fontWeight: 'bold',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: isDisabled ? 'not-allowed' : 'pointer',
                  fontSize: '1rem',
                  opacity: isDisabled ? 0.6 : 1,
                }}
                title={
                  !isValidAddress(toAddress) ? 'Địa chỉ không hợp lệ' :
                  amount <= 0 ? 'Số lượng phải > 0' :
                  amount > currentBalance ? `Không đủ token (cần ${amount}, có ${currentBalance})` :
                  toAddress.toLowerCase() === userAddress?.toLowerCase() ? 'Không thể gửi cho chính mình' :
                  'Xác nhận gửi token'
                }
              >
                {isApproving ? '⏳ Đang xử lý...' : '✓ Xác nhận Gửi'}
              </button>
            );
          })()}
        </div>
      )}
    </div>
  );
};

export default TokenBalance;
