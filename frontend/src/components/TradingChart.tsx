import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ChartDataPoint {
  time: string;
  price: number;
}

interface TradingChartProps {
  selectedCoin?: string;
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

const TradingChart: React.FC<TradingChartProps> = ({ selectedCoin = 'BTC' }) => {
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [currentPrice, setCurrentPrice] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [timeframe, setTimeframe] = useState<string>('7d'); // Default to 7 days

  const timeframeOptions = [
    { label: '1 Day', value: '1d', days: 1 },
    { label: '7 Days', value: '7d', days: 7 },
    { label: '1 Month', value: '1m', days: 30 },
    { label: '1 Year', value: '1y', days: 365 },
    { label: 'All', value: 'all', days: 'max' },
  ];

  useEffect(() => {
    const fetchPriceData = async () => {
      try {
        setLoading(true);
        const symbol = BINANCE_SYMBOLS[selectedCoin] || 'BTCUSDT';
        
        // Determine interval based on timeframe
        let interval = '1h'; // default
        let limit = 24;
        
        if (timeframe === '1d') {
          interval = '1m'; // 1 minute candles
          limit = 1440; // 24 hours * 60 minutes
        } else if (timeframe === '7d') {
          interval = '1h'; // 1 hour candles
          limit = 168; // 7 days * 24 hours
        } else if (timeframe === '1m') {
          interval = '4h'; // 4 hour candles
          limit = 180; // 30 days * 6 periods per day
        } else if (timeframe === '1y') {
          interval = '1d'; // 1 day candles
          limit = 365; // 365 days
        } else if (timeframe === 'all') {
          interval = '1w'; // 1 week candles
          limit = 365; // ~7 years of data
        }
        
        // Fetch klines (candlestick) data from Binance
        // API: https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1h&limit=500
        const response = await fetch(
          `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`
        );
        
        if (!response.ok) throw new Error('Failed to fetch Binance data');
        
        const klines = await response.json();
        
        // Extract closing prices from klines
        // klines format: [openTime, open, high, low, close, volume, ...]
        const prices: [number, number][] = klines.map((kline: any[]) => [
          kline[0], // open time (timestamp)
          parseFloat(kline[4]) // close price
        ]);
        
        // Fetch current price separately
        const tickerResponse = await fetch(
          `https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`
        );
        const tickerData = await tickerResponse.json();
        const realTimePrice = parseFloat(tickerData.price);
        
        // Transform data for chart
        const chartDataPoints: ChartDataPoint[] = prices.map(([timestamp, price]) => {
          const date = new Date(timestamp);
          let timeLabel = '';
          
          if (timeframe === '1d') {
            const hours = date.getHours();
            const minutes = date.getMinutes();
            timeLabel = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
          } else if (timeframe === '7d') {
            const month = date.toLocaleString('en-US', { month: 'short' });
            const day = date.getDate();
            const hours = date.getHours();
            timeLabel = `${month} ${day} ${hours}:00`;
          } else {
            const month = date.toLocaleString('en-US', { month: 'short' });
            const day = date.getDate();
            timeLabel = `${month} ${day}`;
          }
          
          return {
            time: timeLabel,
            price: parseFloat(price.toFixed(2))
          };
        });
        
        setChartData(chartDataPoints);
        setCurrentPrice(realTimePrice);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Binance price data:', error);
        setLoading(false);
        generateMockData(selectedCoin);
      }
    };
    
    fetchPriceData();
    
    // Update price every 60 seconds
    const interval = setInterval(fetchPriceData, 60000);
    
    return () => clearInterval(interval);
  }, [selectedCoin, timeframe]);

  const generateMockData = (coin: string) => {
    const coinPrices: Record<string, number> = {
      'BTC': 45000,
      'ETH': 2500,
      'BNB': 600,
      'SOL': 180,
      'XRP': 2.5,
      'ADA': 0.98,
      'DOGE': 0.35,
      'BASE': 1.2,
      'ARB': 1.8,
    };

    const basePrice = coinPrices[coin] || 1000;
    let price = basePrice;
    const now = new Date();
    
    const initialData: ChartDataPoint[] = Array.from({ length: 20 }, (_, i) => {
      const variation = (Math.random() - 0.5) * (basePrice * 0.02);
      price = Math.max(price + variation, basePrice * 0.95);
      
      // Calculate time going backwards from now
      const timeOffset = new Date(now.getTime() - (19 - i) * 60 * 60 * 1000); // Each step is 1 hour back
      const hours = timeOffset.getHours();
      const minutes = timeOffset.getMinutes();
      const month = timeOffset.toLocaleString('en-US', { month: 'short' });
      const day = timeOffset.getDate();
      
      return {
        time: `${month} ${day} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`,
        price: parseFloat(price.toFixed(2))
      };
    });
    
    setChartData(initialData);
    if (initialData.length > 0) {
      setCurrentPrice(initialData[initialData.length - 1].price);
    }
  };

  const priceChange = chartData.length > 0 
    ? currentPrice - chartData[0].price 
    : 0;
  const priceChangePercent = chartData.length > 0 && chartData[0].price > 0
    ? ((priceChange / chartData[0].price) * 100).toFixed(2)
    : '0.00';

  return (
    <div 
      style={{
        backgroundColor: '#0f172a',
        borderRadius: '16px',
        border: '1px solid #334155',
        padding: '20px',
        height: '90%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header with price info and timeframe selector */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
          <h3 style={{ color: '#facc15', fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>
            {selectedCoin}/USDT
          </h3>
          <span style={{ color: '#b8c0cc', fontSize: '0.9rem' }}>
            {loading ? 'Loading...' : 'Real-time Chart'}
          </span>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '15px', marginBottom: '15px' }}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ffffff' }}>
            ${currentPrice.toFixed(2)}
          </div>
          <div style={{
            fontSize: '1.1rem',
            fontWeight: '600',
            color: priceChange >= 0 ? '#4ade80' : '#f87171',
            display: 'flex',
            alignItems: 'center',
            gap: '5px'
          }}>
            {priceChange >= 0 ? '↑' : '↓'} {Math.abs(parseFloat(priceChangePercent))}%
          </div>
          <div style={{ color: '#b8c0cc', fontSize: '0.9rem' }}>
            {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)} {timeframe}
          </div>
        </div>

        {/* Timeframe selector */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {timeframeOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setTimeframe(option.value)}
              style={{
                padding: '6px 12px',
                backgroundColor: timeframe === option.value ? '#facc15' : 'transparent',
                color: timeframe === option.value ? '#0f172a' : '#b8c0cc',
                border: timeframe === option.value ? 'none' : '1px solid #334155',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '0.85rem',
                fontWeight: timeframe === option.value ? '600' : '400',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                if (timeframe !== option.value) {
                  e.currentTarget.style.borderColor = '#4ade80';
                }
              }}
              onMouseLeave={(e) => {
                if (timeframe !== option.value) {
                  e.currentTarget.style.borderColor = '#334155';
                }
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div style={{ flex: 1, width: '100%', minHeight: '250px' }}>
        {!loading && chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis 
                dataKey="time" 
                stroke="#b8c0cc"
                style={{ fontSize: '0.85rem' }}
              />
              <YAxis 
                stroke="#b8c0cc"
                style={{ fontSize: '0.85rem' }}
                domain={['dataMin - 1', 'dataMax + 1']}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  color: '#ffffff'
                }}
                formatter={(value) => `$${parseFloat(value as string).toFixed(2)}`}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="price" 
                stroke={priceChange >= 0 ? '#facc15' : '#f87171'} 
                strokeWidth={2.5}
                dot={false}
                animationDuration={300}
                name={`${selectedCoin} Price`}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            color: '#b8c0cc',
            minHeight: '500px'
          }}>
            {loading ? 'Loading chart data...' : 'No data available'}
          </div>
        )}
      </div>
    </div>
  );
};

export default TradingChart;