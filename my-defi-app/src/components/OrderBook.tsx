import React from 'react';

// Dữ liệu giả cho lệnh Bán (Màu Đỏ)
const ASKS_DATA = [
    { price: 29500.50, amount: 0.150, total: 4425.08 },
    { price: 29499.80, amount: 0.250, total: 7374.95 },
    { price: 29498.90, amount: 0.050, total: 1474.95 },
];

// Dữ liệu giả cho lệnh Mua (Màu Xanh lá)
const BIDS_DATA = [
    { price: 29495.20, amount: 0.300, total: 8848.56 },
    { price: 29494.50, amount: 0.100, total: 2949.45 },
    { price: 29493.10, amount: 0.450, total: 13271.90 },
];

const OrderBook: React.FC = () => {
    
    // Hàm hiển thị một dòng lệnh
    const renderOrderRow = (order: typeof ASKS_DATA[0], type: 'ask' | 'bid') => (
        <div 
            key={order.price}
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
            <h3 style={{ color: '#ffffff', fontSize: '1.5rem', marginBottom: '15px' }}>
                Sổ Lệnh (BTC/USDT)
            </h3>
            
            {/* Header Sổ lệnh */}
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#5d677a', fontSize: '0.85rem', marginBottom: '5px', padding: '0 5px' }}>
                <span style={{ flex: 1.5 }}>Giá (USDT)</span>
                <span style={{ flex: 1, textAlign: 'right' }}>Số lượng</span>
                <span style={{ flex: 1, textAlign: 'right' }}>Tổng</span>
            </div>

            <div style={{ maxHeight: '350px', overflowY: 'auto' }}>
                {/* Lệnh Bán (ASKS) */}
                {ASKS_DATA.map(order => renderOrderRow(order, 'ask'))}

                {/* Giá thị trường gần nhất (giữ chỗ) */}
                <div style={{ padding: '8px 0', fontSize: '1.2rem', fontWeight: 'bold', textAlign: 'center', color: '#facc15' }}>
                    29496.00 USDT
                </div>

                {/* Lệnh Mua (BIDS) */}
                {BIDS_DATA.map(order => renderOrderRow(order, 'bid'))}
            </div>
        </div>
    );
};

export default OrderBook;