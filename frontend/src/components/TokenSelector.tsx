import React, { useState } from 'react';
import { COMMON_TOKENS, truncateAddress, isValidAddress } from '../utils/tokenUtils';
import { useAccount } from 'wagmi';

interface TokenInfo {
  name: string;
  address: `0x${string}`;
  symbol: string;
}

interface TokenSelectorProps {
  onTokenSelect: (tokenAddress: `0x${string}`) => void;
  selectedToken?: `0x${string}`;
}

const TokenSelector: React.FC<TokenSelectorProps> = ({ onTokenSelect, selectedToken }) => {
  const { chain } = useAccount();
  const [customAddress, setCustomAddress] = useState('');
  const [isCustom, setIsCustom] = useState(false);

  // Lấy danh sách token tương ứng với blockchain
  const getTokensForChain = (): TokenInfo[] => {
    const chainName = chain?.name;
    
    // --- SỬA LỖI Ở ĐÂY ---
    // Thay vì đòi `0x${string}`, ta chấp nhận `string` thường từ tokenUtils
    let tokens: Record<string, string> = {}; 

    if (chainName?.includes('BSC') || chainName?.includes('BNB')) {
      tokens = COMMON_TOKENS.BNB_CHAIN;
    } else if (chainName?.includes('Ethereum')) {
      tokens = COMMON_TOKENS.ETHEREUM;
    } else if (chainName?.includes('Arbitrum')) {
      tokens = COMMON_TOKENS.ARBITRUM;
    }

    return Object.entries(tokens).map(([symbol, address]) => ({
      name: symbol,
      symbol: symbol,
      // --- VÀ ÉP KIỂU Ở ĐÂY ---
      // Cam kết với TypeScript rằng address này chuẩn 0x
      address: address as `0x${string}`,
    }));
  };

  const handleCustomTokenAdd = () => {
    // isValidAddress của bạn là Type Guard, nên nó tự hiểu đây là address xịn
    if (!isValidAddress(customAddress)) {
      alert('Địa chỉ không hợp lệ');
      return;
    }
    // Vì isValidAddress đã kiểm tra, ta yên tâm ép kiểu
    onTokenSelect(customAddress as `0x${string}`);
    setCustomAddress('');
    setIsCustom(false);
  };

  const tokens = getTokensForChain();

  return (
    <div
      style={{
        backgroundColor: '#1e293b',
        borderRadius: '16px',
        border: '1px solid #334155',
        padding: '20px',
      }}
    >
      <h3 style={{ color: '#ffffff', marginBottom: '15px' }}>Chọn Token</h3>

      {/* Danh sách token phổ biến */}
      {!isCustom && (
        <>
          <div style={{ marginBottom: '15px' }}>
            <p style={{ color: '#b8c0cc', fontSize: '0.85rem', marginBottom: '10px' }}>
              Token phổ biến trên {chain?.name || 'blockchain'}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
              {tokens.map((token) => (
                <button
                  key={token.address}
                  onClick={() => onTokenSelect(token.address)}
                  style={{
                    padding: '12px',
                    backgroundColor:
                      selectedToken === token.address ? '#4ade80' : '#0f172a',
                    color: selectedToken === token.address ? '#1e293b' : '#b8c0cc',
                    border: '1px solid #334155',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    if (selectedToken !== token.address) {
                      e.currentTarget.style.backgroundColor = '#334155';
                      e.currentTarget.style.color = 'white';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedToken !== token.address) {
                      e.currentTarget.style.backgroundColor = '#0f172a';
                      e.currentTarget.style.color = '#b8c0cc';
                    }
                  }}
                >
                  <div style={{ fontSize: '1.1rem', marginBottom: '5px' }}>
                    {token.symbol}
                  </div>
                  <div style={{ fontSize: '0.75rem', opacity: 0.7 }}>
                    {truncateAddress(token.address)}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Nút thêm token tùy chỉnh */}
          <button
            onClick={() => setIsCustom(true)}
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#3730a3',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '0.9rem',
              marginTop: '10px',
            }}
          >
            + Thêm Token Tùy Chỉnh
          </button>
        </>
      )}

      {/* Form thêm token tùy chỉnh */}
      {isCustom && (
        <div
          style={{
            backgroundColor: '#0f172a',
            padding: '15px',
            borderRadius: '8px',
            border: '1px solid #334155',
          }}
        >
          <label style={{ color: '#b8c0cc', display: 'block', marginBottom: '5px' }}>
            Địa chỉ Token
          </label>
          <input
            type="text"
            value={customAddress}
            onChange={(e) => setCustomAddress(e.target.value)}
            placeholder="0x..."
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#1e293b',
              border: '1px solid #334155',
              borderRadius: '8px',
              color: 'white',
              marginBottom: '10px',
              boxSizing: 'border-box',
            }}
          />

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={handleCustomTokenAdd}
              style={{
                flex: 1,
                padding: '10px',
                backgroundColor: '#4ade80',
                color: '#1e293b',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 'bold',
              }}
            >
              Thêm
            </button>
            <button
              onClick={() => {
                setIsCustom(false);
                setCustomAddress('');
              }}
              style={{
                flex: 1,
                padding: '10px',
                backgroundColor: '#ef4444',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 'bold',
              }}
            >
              Hủy
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TokenSelector;