import React, { useState } from 'react';

const TradeForm: React.FC = () => {
    // State to track order type (Buy/Sell)
    const [orderType, setOrderType] = useState<'buy' | 'sell'>('buy');
    
    // Order inputs: Price and Amount
    const [price, setPrice] = useState('0.00');
    const [amount, setAmount] = useState('0.00');

    const isBuy = orderType === 'buy';

    return (
        <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '16px', border: '1px solid #334155' }}>
            <h3 style={{ color: '#ffffff', fontSize: '1.5rem', marginBottom: '15px' }}>
                Place {isBuy ? 'Buy' : 'Sell'} Order
            </h3>
            
            {/* 1. Buy/Sell Toggle Buttons */}
            <div style={{ display: 'flex', marginBottom: '20px' }}>
                <button 
                    onClick={() => setOrderType('buy')}
                    style={{ 
                        flex: 1, 
                        padding: '10px', 
                        backgroundColor: isBuy ? '#16a34a' : '#2d3748', // Dark green when selected
                        color: 'white', 
                        fontWeight: 'bold', 
                        border: 'none', 
                        borderRadius: '8px 0 0 8px',
                        cursor: 'pointer'
                    }}
                >
                    Buy
                </button>
                <button 
                    onClick={() => setOrderType('sell')}
                    style={{ 
                        flex: 1, 
                        padding: '10px', 
                        backgroundColor: isBuy ? '#2d3748' : '#dc2626', // Dark red when selected
                        color: 'white', 
                        fontWeight: 'bold', 
                        border: 'none', 
                        borderRadius: '0 8px 8px 0',
                        cursor: 'pointer'
                    }}
                >
                    Sell
                </button>
            </div>

            {/* 2. Price Input (Limit Order) */}
            <label style={{ color: '#b8c0cc', display: 'block', marginBottom: '5px' }}>BTC Price (Limit)</label>
            <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0.00 USDT"
                style={inputStyle}
            />
            
            {/* 3. Amount Input */}
            <label style={{ color: '#b8c0cc', display: 'block', marginBottom: '5px', marginTop: '15px' }}>BTC Amount</label>
            <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00 BTC"
                style={inputStyle}
            />

            {/* 4. Total */}
            <div style={{ color: '#b8c0cc', marginTop: '20px', fontSize: '1.1rem', paddingBottom: '20px', borderBottom: '1px solid #334155' }}>
                Total: **{(parseFloat(price) * parseFloat(amount)).toFixed(2)}** USDT
            </div>

            {/* 5. Confirm Button */}
            <button
                style={{
                    width: '100%',
                    padding: '12px',
                    marginTop: '20px',
                    backgroundColor: isBuy ? '#4ade80' : '#ef4444',
                    color: isBuy ? '#1e293b' : 'white',
                    fontWeight: 'bold',
                    borderRadius: '8px',
                    border: 'none',
                    fontSize: '1.1rem',
                    cursor: 'pointer'
                }}
            >
                {isBuy ? 'Confirm Buy' : 'Confirm Sell'} BTC
            </button>
        </div>
    );
};

// Shared Input Style
const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 15px',
    backgroundColor: '#0f172a',
    border: '1px solid #334155',
    borderRadius: '8px',
    color: 'white',
    fontSize: '1rem',
    outline: 'none',
};

export default TradeForm;