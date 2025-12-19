import React from 'react';

const TradingChart: React.FC = () => {
    return (
        <div 
            style={{
                backgroundColor: '#1e293b',
                borderRadius: '16px',
                border: '1px solid #334155',
                padding: '15px',
                height: '500px', // Đặt chiều cao lớn để chứa biểu đồ
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <h3 style={{ color: '#b8c0cc', fontSize: '1.25rem', marginBottom: '10px' }}>
                BTC/USDT Biểu đồ (Trading View)
            </h3>
            <div 
                style={{ 
                    flexGrow: 1, 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center',
                    backgroundColor: '#0f172a', // Nền tối hơn cho khu vực biểu đồ
                    borderRadius: '8px',
                }}
            >
                <p style={{ color: '#5d677a' }}>[Khu vực tích hợp Biểu đồ TradingView hoặc Biểu đồ tùy chỉnh]</p>
            </div>
        </div>
    );
};

export default TradingChart;