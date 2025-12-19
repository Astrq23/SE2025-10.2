import React, { useState } from 'react';
import { useChartData } from '../hooks/useChartData';
import CanvasChart from './CanvasChart';

const TradingChart: React.FC = () => {
  const [selectedCoin, setSelectedCoin] = useState<string>('bitcoin');
  const { data, loading, error, stats, timeframe, setTimeframe } = useChartData(selectedCoin, '7');

  const getPriceChangeColor = (change: number) => {
    return change >= 0 ? '#4ade80' : '#ef4444';
  };

  const getCoinSymbol = (coinId: string): string => {
    const symbols: { [key: string]: string } = {
      'bitcoin': 'BTC',
      'ethereum': 'ETH',
      'binancecoin': 'BNB',
      'cardano': 'ADA',
      'ripple': 'XRP',
      'solana': 'SOL',
      'pancakeswap': 'CAKE',
      'litecoin': 'LTC',
      'dogecoin': 'DOGE',
      'polkadot': 'DOT',
    };
    return symbols[coinId] || coinId.toUpperCase();
  };

  const timeframes = [
    { value: '1', label: '1D' },
    { value: '7', label: '1W' },
    { value: '30', label: '1M' },
    { value: '90', label: '3M' },
    { value: '365', label: '1Y' },
    { value: 'max', label: 'ALL' },
  ];

  const coins = [
    { id: 'bitcoin', name: 'Bitcoin' },
    { id: 'ethereum', name: 'Ethereum' },
    { id: 'binancecoin', name: 'BNB' },
    { id: 'cardano', name: 'Cardano' },
    { id: 'ripple', name: 'XRP' },
    { id: 'solana', name: 'Solana' },
    { id: 'pancakeswap', name: 'PancakeSwap' },
    { id: 'litecoin', name: 'Litecoin' },
  ];

  return (
    <div
      style={{
        backgroundColor: '#1e293b',
        borderRadius: '16px',
        border: '1px solid #334155',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header với tiêu đề và thống kê */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
          <div>
            <h3 style={{ color: '#facc15', fontSize: '1.5rem', marginBottom: '10px' }}>
              {getCoinSymbol(selectedCoin)}/USDT Biểu đồ
            </h3>
            <p style={{ color: '#b8c0cc', fontSize: '0.9rem' }}>
              Giá thị trường theo thời gian
            </p>
          </div>

          {/* Thống kê giá */}
          {!loading && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <p style={{ color: '#b8c0cc', fontSize: '0.85rem', marginBottom: '5px' }}>Giá hiện tại</p>
                <p style={{ color: '#4ade80', fontSize: '1.5rem', fontWeight: 'bold' }}>
                  ${stats.current.toFixed(2)}
                </p>
              </div>
              <div>
                <p style={{ color: '#b8c0cc', fontSize: '0.85rem', marginBottom: '5px' }}>Thay đổi</p>
                <p
                  style={{
                    color: getPriceChangeColor(stats.change),
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                  }}
                >
                  {stats.changePercent >= 0 ? '+' : ''}{stats.changePercent.toFixed(2)}%
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Chọn Coin */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '15px', flexWrap: 'wrap' }}>
          {coins.map((coin) => (
            <button
              key={coin.id}
              onClick={() => setSelectedCoin(coin.id)}
              style={{
                padding: '8px 12px',
                backgroundColor: selectedCoin === coin.id ? '#4ade80' : '#334155',
                color: selectedCoin === coin.id ? '#000' : '#fff',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '0.9rem',
                transition: 'all 0.3s',
              }}
              onMouseEnter={(e) => {
                if (selectedCoin !== coin.id) {
                  e.currentTarget.style.backgroundColor = '#4a5568';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedCoin !== coin.id) {
                  e.currentTarget.style.backgroundColor = '#334155';
                }
              }}
            >
              {coin.name}
            </button>
          ))}
        </div>

        {/* Chọn Timeframe */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {timeframes.map((tf) => (
            <button
              key={tf.value}
              onClick={() => setTimeframe(tf.value)}
              style={{
                padding: '8px 12px',
                backgroundColor: timeframe === tf.value ? '#06b6d4' : '#334155',
                color: timeframe === tf.value ? '#000' : '#fff',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '0.85rem',
                transition: 'all 0.3s',
              }}
              onMouseEnter={(e) => {
                if (timeframe !== tf.value) {
                  e.currentTarget.style.backgroundColor = '#4a5568';
                }
              }}
              onMouseLeave={(e) => {
                if (timeframe !== tf.value) {
                  e.currentTarget.style.backgroundColor = '#334155';
                }
              }}
            >
              {tf.label}
            </button>
          ))}
        </div>
      </div>

      {/* Biểu đồ Canvas */}
      <div
        style={{
          backgroundColor: '#0f172a',
          borderRadius: '8px',
          padding: '10px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <CanvasChart
          data={data}
          loading={loading}
          width={700}
          height={320}
          color="#4ade80"
          showTooltip={true}
        />
      </div>

      {/* Lỗi */}
      {error && (
        <div style={{ color: '#ef4444', fontSize: '0.9rem', marginTop: '15px', textAlign: 'center' }}>
          ⚠️ Lỗi: {error}
        </div>
      )}

      {/* Thông tin bổ sung */}
      {!loading && data.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '15px', marginTop: '20px' }}>
          <div style={{ backgroundColor: '#0f172a', padding: '12px', borderRadius: '6px' }}>
            <p style={{ color: '#b8c0cc', fontSize: '0.85rem', marginBottom: '5px' }}>Cao nhất</p>
            <p style={{ color: '#06b6d4', fontSize: '1.1rem', fontWeight: 'bold' }}>
              ${stats.max.toFixed(2)}
            </p>
          </div>
          <div style={{ backgroundColor: '#0f172a', padding: '12px', borderRadius: '6px' }}>
            <p style={{ color: '#b8c0cc', fontSize: '0.85rem', marginBottom: '5px' }}>Thấp nhất</p>
            <p style={{ color: '#ef4444', fontSize: '1.1rem', fontWeight: 'bold' }}>
              ${stats.min.toFixed(2)}
            </p>
          </div>
          <div style={{ backgroundColor: '#0f172a', padding: '12px', borderRadius: '6px' }}>
            <p style={{ color: '#b8c0cc', fontSize: '0.85rem', marginBottom: '5px' }}>Trung bình</p>
            <p style={{ color: '#facc15', fontSize: '1.1rem', fontWeight: 'bold' }}>
              ${stats.avg.toFixed(2)}
            </p>
          </div>
          <div style={{ backgroundColor: '#0f172a', padding: '12px', borderRadius: '6px' }}>
            <p style={{ color: '#b8c0cc', fontSize: '0.85rem', marginBottom: '5px' }}>Thay đổi</p>
            <p
              style={{
                color: getPriceChangeColor(stats.change),
                fontSize: '1.1rem',
                fontWeight: 'bold',
              }}
            >
              ${stats.change.toFixed(2)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TradingChart;