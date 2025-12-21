import React, { useState, useEffect } from 'react';
import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import { toast } from 'react-toastify';
import TokenSwapArtifact from '../abis/TokenSwap.json';
import { CONTRACT_ADDRESSES } from '../constants/addresses';

interface SwapFormData {
  tokenIn: string;
  tokenOut: string;
  amountIn: string;
}

const SwapInterface: React.FC = () => {
  const { isConnected, address } = useAccount();
  const [swapData, setSwapData] = useState<SwapFormData>({
    tokenIn: 'ZENITH',
    tokenOut: 'USDC',
    amountIn: ''
  });
  const [estimatedOut, setEstimatedOut] = useState('0');
  const [isLoading, setIsLoading] = useState(false);
  const [pairId, setPairId] = useState(0);

  const contractAbi = TokenSwapArtifact.abi;
  const contractAddress = CONTRACT_ADDRESSES.localhost.SWAP as `0x${string}`;

  const { writeContractAsync } = useWriteContract();

  // Các token có sẵn
  const AVAILABLE_TOKENS = [
    { name: 'ZENITH', address: CONTRACT_ADDRESSES.localhost.TOKEN },
    { name: 'USDC', address: '0x...' },
    { name: 'USDT', address: '0x...' }
  ];

  // Lấy quote khi input thay đổi
  useEffect(() => {
    const fetchQuote = async () => {
      if (!swapData.amountIn || parseFloat(swapData.amountIn) <= 0) {
        setEstimatedOut('0');
        return;
      }

      try {
        // Tạo quote từ contract
        // Thực hiện: getQuote(pairId, tokenIn, amountIn)
        // Đây là ví dụ, thực tế cần call contract
        const amount = BigInt(parseFloat(swapData.amountIn) * 10 ** 18);
        // const result = await readContractAsync(...)
        // setEstimatedOut(...)
      } catch (error) {
        console.error('Quote error:', error);
      }
    };

    fetchQuote();
  }, [swapData.amountIn, swapData.tokenIn, swapData.tokenOut]);

  const handleSwapTokens = () => {
    setSwapData(prev => ({
      ...prev,
      tokenIn: prev.tokenOut,
      tokenOut: prev.tokenIn
    }));
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
      const amount = BigInt(parseFloat(swapData.amountIn) * 10 ** 18);
      const tokenInAddr = AVAILABLE_TOKENS.find(t => t.name === swapData.tokenIn)?.address;

      const tx = await writeContractAsync({
        address: contractAddress,
        abi: contractAbi,
        functionName: 'swap',
        args: [pairId, tokenInAddr, amount]
      });

      toast.success('Swap successful!');
      setSwapData(prev => ({ ...prev, amountIn: '' }));
    } catch (error: any) {
      toast.error(error?.message || 'Swap failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      maxWidth: '600px',
      margin: '0 auto',
      padding: '40px 20px'
    }}>
      <h1 style={{ color: '#4ade80', fontSize: '2rem', marginBottom: '30px', textAlign: 'center' }}>
        Token Swap
      </h1>

      <div style={{
        backgroundColor: '#1e293b',
        padding: '30px',
        borderRadius: '16px',
        border: '1px solid #334155',
        color: 'white'
      }}>
        {/* From Token */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ color: '#b8c0cc', marginBottom: '10px', display: 'block' }}>
            From
          </label>
          
          <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
            <select
              value={swapData.tokenIn}
              onChange={(e) => setSwapData(prev => ({ ...prev, tokenIn: e.target.value }))}
              style={{
                flex: 1,
                padding: '12px',
                backgroundColor: '#0f172a',
                border: '1px solid #334155',
                borderRadius: '8px',
                color: 'white',
                fontSize: '1rem'
              }}
            >
              {AVAILABLE_TOKENS.map(token => (
                <option key={token.name} value={token.name}>
                  {token.name}
                </option>
              ))}
            </select>
          </div>

          <input
            type="number"
            placeholder="0.0"
            value={swapData.amountIn}
            onChange={(e) => setSwapData(prev => ({ ...prev, amountIn: e.target.value }))}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#0f172a',
              border: '1px solid #334155',
              borderRadius: '8px',
              color: 'white',
              fontSize: '1rem'
            }}
          />
        </div>

        {/* Swap Button */}
        <button
          onClick={handleSwapTokens}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#334155',
            border: 'none',
            borderRadius: '8px',
            color: '#b8c0cc',
            cursor: 'pointer',
            marginBottom: '20px',
            fontSize: '0.9rem',
            fontWeight: 'bold'
          }}
        >
          ⇅ SWAP
        </button>

        {/* To Token */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ color: '#b8c0cc', marginBottom: '10px', display: 'block' }}>
            To (Estimate)
          </label>

          <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
            <select
              value={swapData.tokenOut}
              onChange={(e) => setSwapData(prev => ({ ...prev, tokenOut: e.target.value }))}
              style={{
                flex: 1,
                padding: '12px',
                backgroundColor: '#0f172a',
                border: '1px solid #334155',
                borderRadius: '8px',
                color: 'white',
                fontSize: '1rem'
              }}
            >
              {AVAILABLE_TOKENS.map(token => (
                <option key={token.name} value={token.name}>
                  {token.name}
                </option>
              ))}
            </select>
          </div>

          <div style={{
            padding: '12px',
            backgroundColor: '#0f172a',
            border: '1px solid #334155',
            borderRadius: '8px',
            color: '#4ade80',
            fontSize: '1.2rem',
            fontWeight: 'bold'
          }}>
            {estimatedOut}
          </div>
        </div>

        {/* Fee Info */}
        <div style={{
          backgroundColor: '#0f172a',
          padding: '15px',
          borderRadius: '8px',
          marginBottom: '20px',
          color: '#b8c0cc',
          fontSize: '0.9rem'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
            <span>Fee (0.3%)</span>
            <span style={{ color: '#facc15' }}>
              {(parseFloat(swapData.amountIn || '0') * 0.003).toFixed(4)}
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Slippage</span>
            <span style={{ color: '#facc15' }}>0.5%</span>
          </div>
        </div>

        {/* Swap Button */}
        <button
          onClick={handleSwap}
          disabled={isLoading || !isConnected || !swapData.amountIn}
          style={{
            width: '100%',
            padding: '14px',
            backgroundColor: isLoading || !isConnected || !swapData.amountIn ? '#334155' : '#4ade80',
            border: 'none',
            borderRadius: '8px',
            color: isLoading || !isConnected || !swapData.amountIn ? '#888' : 'black',
            fontSize: '1rem',
            fontWeight: 'bold',
            cursor: isLoading || !isConnected || !swapData.amountIn ? 'not-allowed' : 'pointer'
          }}
        >
          {!isConnected ? 'Connect Wallet' : isLoading ? 'Swapping...' : 'Swap'}
        </button>
      </div>

      {/* Info */}
      <div style={{
        marginTop: '30px',
        padding: '20px',
        backgroundColor: '#1e293b',
        borderRadius: '12px',
        border: '1px solid #334155',
        color: '#b8c0cc',
        fontSize: '0.9rem'
      }}>
        <p style={{ marginBottom: '10px' }}>
          💡 <strong>How it works:</strong>
        </p>
        <ul style={{ marginLeft: '20px', lineHeight: '1.6' }}>
          <li>Select the tokens you want to swap</li>
          <li>Enter the amount and see the estimated output</li>
          <li>A 0.3% fee applies to all swaps</li>
          <li>Confirm the transaction in your wallet</li>
        </ul>
      </div>
    </div>
  );
};

export default SwapInterface;
