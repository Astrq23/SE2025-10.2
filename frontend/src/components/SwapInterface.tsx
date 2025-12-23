import React, { useState, useEffect } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import { toast } from 'react-toastify';
import TokenSwapArtifact from '../abis/TokenSwap.json';
import { CONTRACT_ADDRESSES } from '../constants/addresses';

interface SwapFormData {
  tokenIn: string;
  tokenOut: string;
  amountIn: string;
}

const SwapInterface: React.FC = () => {
  const { isConnected } = useAccount();
  const [swapData, setSwapData] = useState<SwapFormData>({
    tokenIn: 'ZENITH',
    tokenOut: 'USDC',
    amountIn: ''
  });
  const [estimatedOut, setEstimatedOut] = useState('0');
  const [isLoading, setIsLoading] = useState(false);
  const pairId = 0;

  const contractAbi = TokenSwapArtifact.abi;
  const contractAddress = CONTRACT_ADDRESSES.localhost.SWAP as `0x${string}`;
  const { writeContractAsync } = useWriteContract();

  const AVAILABLE_TOKENS = [
    { name: 'ZENITH', address: CONTRACT_ADDRESSES.localhost.TOKEN },
    { name: 'USDC', address: '0x...' },
    { name: 'USDT', address: '0x...' }
  ];


  useEffect(() => {
    if (swapData.amountIn && parseFloat(swapData.amountIn) > 0) {
      const mockRate = 1.5; // Giả sử 1 ZENITH = 1.5 USDC
      setEstimatedOut((parseFloat(swapData.amountIn) * mockRate).toFixed(2));
    } else {
      setEstimatedOut('0');
    }
  }, [swapData.amountIn, swapData.tokenIn, swapData.tokenOut]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Chặn nhập số âm hoặc các ký tự không hợp lệ khi paste
    if (value === '' || parseFloat(value) >= 0) {
      setSwapData(prev => ({ ...prev, amountIn: value }));
    }
  };

  const handleSwapTokens = () => {
    setSwapData(prev => ({
      ...prev,
      tokenIn: prev.tokenOut,
      tokenOut: prev.tokenIn,
      amountIn: ''
    }));
    toast.info(`Switched to ${swapData.tokenOut} → ${swapData.tokenIn}`);
  };

  const handleSwap = async () => {
    if (!isConnected) {
      toast.warn('Please connect your wallet');
      return;
    }
    if (!swapData.amountIn || parseFloat(swapData.amountIn) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    setIsLoading(true);
    try {
      const amount = BigInt(Math.floor(parseFloat(swapData.amountIn) * 10 ** 18));
      const tokenInAddr = AVAILABLE_TOKENS.find(t => t.name === swapData.tokenIn)?.address;

      await writeContractAsync({
        address: contractAddress,
        abi: contractAbi,
        functionName: 'swap',
        args: [pairId, tokenInAddr, amount]
      });

      toast.success('🔥 Swap successful!');
      setSwapData(prev => ({ ...prev, amountIn: '' }));
    } catch (error: any) {
      toast.error(error?.message || 'Swap failed');
    } finally {
      setIsLoading(false);
    }
  };

  // --- STYLES ---
  const inputGroupStyle: React.CSSProperties = {
    backgroundColor: '#0f172a',
    border: '1px solid #334155',
    borderRadius: '16px',
    padding: '16px',
    marginBottom: '8px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  };

  const selectStyle: React.CSSProperties = {
    backgroundColor: '#1e293b',
    border: '1px solid #334155',
    color: 'white',
    padding: '8px 12px',
    borderRadius: '10px',
    fontSize: '1rem',
    fontWeight: 'bold',
    outline: 'none',
    cursor: 'pointer'
  };

  const innerInputStyle: React.CSSProperties = {
    width: '100%',
    backgroundColor: 'transparent',
    border: 'none',
    color: 'white',
    fontSize: '1.5rem',
    textAlign: 'right',
    outline: 'none',
    fontWeight: '600'
  };

  return (
    <div style={{ maxWidth: '480px', margin: '0 auto', padding: '60px 20px' }}>
      {/* CSS xóa mũi tên input number */}
      <style>
        {`
          input::-webkit-outer-spin-button,
          input::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }
          input[type=number] {
            -moz-appearance: textfield;
          }
        `}
      </style>

      <h1 style={{ color: '#4ade80', fontSize: '2.2rem', marginBottom: '30px', textAlign: 'center', fontWeight: 'bold' }}>
        Swap
      </h1>

      <div style={{
        backgroundColor: '#1e293b',
        padding: '24px',
        borderRadius: '24px',
        border: '1px solid #334155',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)'
      }}>
        
        {/* FROM SECTION */}
        <div style={{ marginBottom: '4px' }}>
          <label style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '8px', display: 'block', paddingLeft: '4px' }}>You Pay</label>
          <div style={inputGroupStyle}>
            <select
              value={swapData.tokenIn}
              onChange={(e) => setSwapData(prev => ({ ...prev, tokenIn: e.target.value }))}
              style={selectStyle}
            >
              {AVAILABLE_TOKENS.map(token => <option key={token.name} value={token.name}>{token.name}</option>)}
            </select>
            <input
              type="number"
              placeholder="0.0"
              min="0"
              value={swapData.amountIn}
              onChange={handleInputChange}
              onKeyDown={(e) => (e.key === '-' || e.key === 'e') && e.preventDefault()} // Chặn dấu trừ và ký tự e
              style={innerInputStyle}
            />
          </div>
        </div>

        {/* SWAP ICON BUTTON */}
        <div style={{ display: 'flex', justifyContent: 'center', margin: '-22px 0', position: 'relative', zIndex: 2 }}>
          <button
            onClick={handleSwapTokens}
            style={{
              backgroundColor: '#334155',
              border: '4px solid #1e293b',
              borderRadius: '12px',
              color: '#4ade80',
              padding: '10px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'rotate(180deg)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'rotate(0deg)'}
          >
            ⇅
          </button>
        </div>

        {/* TO SECTION */}
        <div style={{ marginTop: '4px', marginBottom: '20px' }}>
          <label style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '8px', display: 'block', paddingLeft: '4px' }}>You Receive</label>
          <div style={inputGroupStyle}>
            <select
              value={swapData.tokenOut}
              onChange={(e) => setSwapData(prev => ({ ...prev, tokenOut: e.target.value }))}
              style={selectStyle}
            >
              {AVAILABLE_TOKENS.map(token => <option key={token.name} value={token.name}>{token.name}</option>)}
            </select>
            <div style={{ ...innerInputStyle, color: '#4ade80' }}>
              {estimatedOut}
            </div>
          </div>
        </div>

        {/* INFO BOX */}
        <div style={{
          backgroundColor: 'rgba(15, 23, 42, 0.4)',
          padding: '16px',
          borderRadius: '16px',
          marginBottom: '24px',
          fontSize: '0.85rem',
          color: '#94a3b8',
          border: '1px solid #334155'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span>Exchange Rate</span>
            <span>1 {swapData.tokenIn} ≈ 1.5 {swapData.tokenOut}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span>Network Fee (0.3%)</span>
            <span style={{ color: '#facc15' }}>{(parseFloat(swapData.amountIn || '0') * 0.003).toFixed(4)} {swapData.tokenIn}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Slippage</span>
            <span style={{ color: '#facc15' }}>0.5%</span>
          </div>
        </div>

        <button
          onClick={handleSwap}
          disabled={isLoading || !isConnected || !swapData.amountIn}
          style={{
            width: '100%',
            padding: '18px',
            backgroundColor: isLoading || !isConnected || !swapData.amountIn ? '#334155' : '#4ade80',
            border: 'none',
            borderRadius: '16px',
            color: isLoading || !isConnected || !swapData.amountIn ? '#64748b' : '#0f172a',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            cursor: isLoading || !isConnected || !swapData.amountIn ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s'
          }}
        >
          {!isConnected ? 'Connect Wallet' : isLoading ? 'Processing...' : 'Swap Tokens'}
        </button>
      </div>
    </div>
  );
};

export default SwapInterface;