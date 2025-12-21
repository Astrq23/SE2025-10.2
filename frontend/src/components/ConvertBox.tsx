import React, { useState, useEffect, useCallback } from 'react';

// Supported Tokens List
const TOKENS = [
  { id: 'USDT', name: 'Tether', icon: 'https://cryptologos.cc/logos/tether-usdt-logo.png?v=025' },
  { id: 'BTC', name: 'Bitcoin', icon: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=025' },
  { id: 'ETH', name: 'Ethereum', icon: 'https://cryptologos.cc/logos/ethereum-eth-logo.png?v=025' },
  { id: 'BNB', name: 'BNB', icon: 'https://cryptologos.cc/logos/bnb-bnb-logo.png?v=025' },
  { id: 'SOL', name: 'Solana', icon: 'https://cryptologos.cc/logos/solana-sol-logo.png?v=025' },
  { id: 'XRP', name: 'XRP', icon: 'https://cryptologos.cc/logos/xrp-xrp-logo.png?v=025' },
];

const ConvertBox: React.FC = () => {
  // --- STATES ---
  const [tokenA, setTokenA] = useState(TOKENS[3]); // Default BNB
  const [tokenB, setTokenB] = useState(TOKENS[0]); // Default USDT
  
  const [amountA, setAmountA] = useState<string>(''); // Input
  const [amountB, setAmountB] = useState<string>(''); // Output
  
  const [priceA, setPriceA] = useState<number>(0); 
  const [priceB, setPriceB] = useState<number>(0); 
  
  const [isConverting, setIsConverting] = useState<boolean>(false);

  // --- 1. FETCH PRICES FROM BINANCE ---
  const fetchPrices = useCallback(async () => {
    try {
      const getPrice = async (symbol: string) => {
        if (symbol === 'USDT') return 1;
        const res = await fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${symbol}USDT`);
        const data = await res.json();
        return parseFloat(data.price);
      };

      const [pA, pB] = await Promise.all([
        getPrice(tokenA.id),
        getPrice(tokenB.id)
      ]);

      setPriceA(pA);
      setPriceB(pB);
    } catch (error) {
      console.error("Error updating prices:", error);
    }
  }, [tokenA, tokenB]);

  // Update prices every 10s
  useEffect(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, 10000);
    return () => clearInterval(interval);
  }, [fetchPrices]);

  // --- 2. HANDLE CONVERT BUTTON ---
  const handleConvert = async () => {
    if (!amountA || parseFloat(amountA) <= 0) {
      alert("Please enter a valid amount!");
      return;
    }

    if (!priceA || !priceB) {
      alert("Fetching price data, please wait a moment...");
      await fetchPrices();
      return;
    }

    setIsConverting(true);

    // Simulate calculation delay
    setTimeout(() => {
      const val = parseFloat(amountA);
      const result = (val * priceA) / priceB;
      const formattedResult = result < 1 ? result.toFixed(6) : result.toFixed(4);
      
      setAmountB(formattedResult);
      setIsConverting(false);
    }, 600); 
  };

  // Reset result when input changes
  useEffect(() => {
    setAmountB('');
  }, [amountA, tokenA, tokenB]);

  // --- STYLES ---
  const boxStyle: React.CSSProperties = {
    backgroundColor: '#1e293b',
    borderRadius: '16px',
    padding: '16px',
    marginBottom: '8px',
    border: '1px solid #334155',
    display: 'flex', flexDirection: 'column', gap: '10px'
  };

  const inputStyle: React.CSSProperties = {
    backgroundColor: 'transparent',
    border: 'none',
    color: 'white',
    fontSize: '1.8rem',
    fontWeight: 'bold',
    outline: 'none',
    width: '100%'
  };

  const selectStyle: React.CSSProperties = {
    backgroundColor: '#0f172a', color: 'white', border: '1px solid #334155',
    padding: '6px 12px', borderRadius: '20px', fontWeight: 'bold', cursor: 'pointer', outline: 'none', fontSize: '1rem'
  };

  return (
    <div
      style={{
        backgroundColor: 'rgba(15, 23, 42, 0.95)',
        borderRadius: '24px',
        padding: '24px',
        border: '1px solid #334155',
        boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
        width: '100%',
        maxWidth: '480px',
        backdropFilter: 'blur(12px)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', alignItems: 'center' }}>
        <h3 style={{ margin: 0, fontSize: '1.25rem', color: 'white' }}>Converter</h3>
        <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Binance Rate</span>
      </div>

      {/* Box 1: You Pay */}
      <div style={boxStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8', fontSize: '0.9rem' }}>
          <span>You pay</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <input
            type="number"
            placeholder="0.0"
            value={amountA}
            onChange={(e) => setAmountA(e.target.value)}
            style={inputStyle}
          />
          <select 
            value={tokenA.id}
            onChange={(e) => { const t = TOKENS.find(t => t.id === e.target.value); if(t) setTokenA(t); }}
            style={selectStyle}
          >
            {TOKENS.map(t => <option key={t.id} value={t.id}>{t.id}</option>)}
          </select>
        </div>
      </div>

      {/* Arrow */}
      <div style={{ display: 'flex', justifyContent: 'center', margin: '-18px 0 -18px', position:'relative', zIndex: 10 }}>
        <div style={{ backgroundColor: '#334155', border: '4px solid #0f172a', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#facc15' }}>⬇</div>
      </div>

      {/* Box 2: You Receive */}
      <div style={boxStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8', fontSize: '0.9rem' }}>
          <span>You receive</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <input
            type="text"
            placeholder="..."
            value={amountB} 
            readOnly
            style={{ ...inputStyle, color: amountB ? '#4ade80' : '#64748b' }} 
          />
           <select 
            value={tokenB.id}
            onChange={(e) => { const t = TOKENS.find(t => t.id === e.target.value); if(t) setTokenB(t); }}
            style={selectStyle}
          >
            {TOKENS.map(t => <option key={t.id} value={t.id}>{t.id}</option>)}
          </select>
        </div>
      </div>

      {/* Rate Info */}
      <div style={{ textAlign: 'center', marginTop: '10px', fontSize: '0.9rem', color: '#94a3b8', minHeight: '20px' }}>
          {priceA && priceB ? `1 ${tokenA.id} ≈ ${(priceA/priceB).toFixed(6)} ${tokenB.id}` : 'Fetching rates...'}
      </div>

      {/* Convert Button */}
      <button
        onClick={handleConvert}
        disabled={isConverting}
        style={{
          width: '100%',
          padding: '18px',
          marginTop: '15px',
          background: isConverting ? '#475569' : 'linear-gradient(to right, #2563eb, #9333ea)', 
          color: 'white',
          border: 'none',
          borderRadius: '16px',
          fontSize: '1.2rem',
          fontWeight: 'bold',
          cursor: isConverting ? 'not-allowed' : 'pointer',
          transition: 'transform 0.1s ease',
          boxShadow: isConverting ? 'none' : '0 4px 15px rgba(37, 99, 235, 0.4)'
        }}
        onMouseDown={(e) => !isConverting && (e.currentTarget.style.transform = 'scale(0.98)')}
        onMouseUp={(e) => !isConverting && (e.currentTarget.style.transform = 'scale(1)')}
      >
        {isConverting ? 'Converting...' : 'Convert'}
      </button>
    </div>
  );
};

export default ConvertBox;