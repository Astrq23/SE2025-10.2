import React, { useState, useEffect } from 'react';

interface OrderBookProps {
  selectedCoin?: string;
}

interface OrderData {
  price: number;
  amount: number;
  total: number;
}

// Map coin names to Binance trading pairs
const BINANCE_SYMBOLS: Record<string, string> = {
  'BTC': 'BTCUSDT',
  'ETH': 'ETHUSDT',
  'BNB': 'BNBUSDT',
  'SOL': 'SOLUSDT',
  'XRP': 'XRPUSDT',
  'ADA': 'ADAUSDT',
  'DOGE': 'DOGEUSDT',
  'BASE': 'BASEUSDT',
  'ARB': 'ARBUSDT',
};

const OrderBook: React.FC<OrderBookProps> = ({ selectedCoin = 'BTC' }) => {
  const [asksData, setAsksData] = useState<OrderData[]>([]);
  const [bidsData, setBidsData] = useState<OrderData[]>([]);
  const [currentPrice, setCurrentPrice] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [lastUpdateTime, setLastUpdateTime] = useState<number>(0);

  useEffect(() => {
    const fetchOrderBook = async () => {
      try {
        const symbol = BINANCE_SYMBOLS[selectedCoin] || 'BTCUSDT';

        // Fetch order book depth from Binance
        // limit: 20 = top 20 asks and bids
        const response = await fetch(
          `https://api.binance.com/api/v3/depth?symbol=${symbol}&limit=20`
        );

        if (!response.ok) throw new Error('Failed to fetch order book');

        const data = await response.json();
        const asks = data.asks || [];
        const bids = data.bids || [];

        // Transform asks data (sellers)
        const transformedAsks: OrderData[] = asks
          .slice(0, 5)
          .reverse() // Show highest asks first
          .map((ask: [string, string]) => {
            const price = parseFloat(ask[0]);
            const amount = parseFloat(ask[1]);
            const total = price * amount;
            return { price, amount, total };
          });

        // Transform bids data (buyers)
        const transformedBids: OrderData[] = bids
          .slice(0, 5)
          .map((bid: [string, string]) => {
            const price = parseFloat(bid[0]);
            const amount = parseFloat(bid[1]);
            const total = price * amount;
            return { price, amount, total };
          });

        // Get current market price
        const tickerResponse = await fetch(
          `https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`
        );
        const tickerData = await tickerResponse.json();
        const price = parseFloat(tickerData.price);

        setAsksData(transformedAsks);
        setBidsData(transformedBids);
        setCurrentPrice(price);
        setLastUpdateTime(Date.now());
        setLoading(false);
      } catch (error) {
        console.error('Error fetching order book:', error);
        setLoading(false);
      }
    };

    // Initial fetch
    fetchOrderBook();

    // Update order book every 30 seconds (reduced from 2 seconds)
    const interval = setInterval(fetchOrderBook, 30000);

    return () => clearInterval(interval);
  }, [selectedCoin]);
    
    // Function to display an order row
    const renderOrderRow = (order: OrderData, type: 'ask' | 'bid') => (
        <div 
            key={`${type}-${order.price}`}
            style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                padding: '4px 0', 
                fontSize: '0.9rem',
                backgroundColor: type === 'ask' ? 'rgba(239, 68, 68, 0.08)' : 'rgba(74, 222, 128, 0.08)'
            }}
        >
            <span style={{ color: type === 'ask' ? '#ef4444' : '#4ade80', flex: 1.5 }}>
                {order.price.toFixed(2)}
            </span>
            <span style={{ color: '#b8c0cc', flex: 1, textAlign: 'right' }}>
                {order.amount.toFixed(3)}
            </span>
            <span style={{ color: '#b8c0cc', flex: 1, textAlign: 'right' }}>
                {order.total.toFixed(2)}
            </span>
        </div>
    );

    return (
        <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '16px', border: '1px solid #334155' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <h3 style={{ color: '#ffffff', fontSize: '1.5rem', margin: 0 }}>
                Order Book ({selectedCoin}/USDT)
              </h3>
              <span style={{ color: '#5d677a', fontSize: '0.75rem' }}>
                {lastUpdateTime > 0 ? `Last: ${new Date(lastUpdateTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}` : 'Loading...'}
              </span>
            </div>

            {/* Legend */}
            <div style={{ display: 'flex', gap: '20px', marginBottom: '12px', fontSize: '0.8rem', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '16px', height: '16px', backgroundColor: '#ef4444', borderRadius: '3px', opacity: 0.3 }}></span>
                <span style={{ color: '#ef4444' }}>Ask (Sell)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '16px', height: '16px', backgroundColor: '#4ade80', borderRadius: '3px', opacity: 0.3 }}></span>
                <span style={{ color: '#4ade80' }}>Bid (Buy)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '16px', height: '16px', backgroundColor: '#facc15', borderRadius: '3px' }}></span>
                <span style={{ color: '#facc15' }}>Market Price</span>
              </div>
            </div>
            
            {/* Header for order book */}
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#5d677a', fontSize: '0.85rem', marginBottom: '5px', padding: '0 5px' }}>
                <span style={{ flex: 1.5 }}>Price (USDT)</span>
                <span style={{ flex: 1, textAlign: 'right' }}>Amount</span>
                <span style={{ flex: 1, textAlign: 'right' }}>Total</span>
            </div>

            <div style={{ maxHeight: '350px', overflowY: 'auto' }}>
                {loading && asksData.length === 0 ? (
                  <div style={{ textAlign: 'center', color: '#b8c0cc', padding: '20px' }}>
                    Loading order book...
                  </div>
                ) : (
                  <>
                    {/* Ask Orders (Sell) */}
                    {asksData.map(order => renderOrderRow(order, 'ask'))}

                    {/* Market price */}
                    <div style={{ padding: '8px 0', fontSize: '1.2rem', fontWeight: 'bold', textAlign: 'center', color: '#facc15' }}>
                      {currentPrice.toFixed(2)} USDT
                    </div>

                    {/* Bid Orders (Buy) */}
                    {bidsData.map(order => renderOrderRow(order, 'bid'))}
                  </>
                )}
            </div>
        </div>
    );
};

export default OrderBook;