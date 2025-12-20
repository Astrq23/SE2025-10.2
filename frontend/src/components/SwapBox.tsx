// D:\cnpm\my-defi-app/src/components/SwapBox.tsx

import React from 'react';

// Dữ liệu token giả lập
interface Token {
    symbol: string;
    chain: string;
    iconUrl: string; // Tên file icon (ví dụ: 'bnb.svg', 'cake.svg')
}

const BNB_TOKEN: Token = {
    symbol: 'BNB',
    chain: 'BNB Chain',
    iconUrl: 'https://seeklogo.com/images/B/bnb-bnb-logo-CD9B4CC764-seeklogo.com.png' // Icon BNB
};

const CAKE_TOKEN: Token = {
    symbol: 'CAKE',
    chain: 'BNB Chain',
    iconUrl: 'https://seeklogo.com/images/P/pancakeswap-cake-logo-1C9C66B956-seeklogo.com.png' // Icon CAKE
};

// Component con để hiển thị ô nhập token
const TokenInputBox: React.FC<{ label: string, token: Token }> = ({ label, token }) => {
    return (
        <div style={{
            backgroundColor: '#2D274A', // Màu nền ô nhập
            padding: '20px',
            borderRadius: '16px',
            marginBottom: '10px',
        }}>
            <div style={{ color: '#E0E0E0', fontSize: '0.8rem', marginBottom: '8px' }}>
                {label}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                
                {/* Khu vực chọn Token */}
                <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                    <img 
                        src={token.iconUrl} 
                        alt={token.symbol} 
                        style={{ width: '30px', height: '30px', marginRight: '8px' }}
                    />
                    <div>
                        <div style={{ color: 'white', fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                            {token.symbol}
                            <span style={{ marginLeft: '5px' }}>
                                ▼ {/* Ký hiệu mũi tên */}
                            </span>
                        </div>
                        <div style={{ color: '#A0A0A0', fontSize: '0.7rem' }}>
                            {token.chain}
                        </div>
                    </div>
                </div>

                {/* Khu vực nhập số lượng */}
                <input
                    type="number"
                    placeholder="0.00"
                    style={{
                        backgroundColor: 'transparent',
                        border: 'none',
                        color: 'white',
                        fontSize: '1.8rem', // Kích thước chữ lớn
                        fontWeight: 'bold',
                        textAlign: 'right',
                        outline: 'none',
                        maxWidth: '50%',
                    }}
                />
            </div>
        </div>
    );
};


const SwapBox: React.FC = () => {
    return (
        <div style={{
            backgroundColor: '#1C1635', // Màu nền container chính
            padding: '30px',
            borderRadius: '20px',
            maxWidth: '450px',
            margin: '50px auto',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
        }}>
            {/* Header / Label */}
            <div style={{ color: '#E0E0E0', fontSize: '1rem', marginBottom: '15px' }}>
                From
            </div>
            
            {/* Ô nhập Token Gửi (BNB) */}
            <TokenInputBox label="From" token={BNB_TOKEN} />

            {/* Nút chuyển đổi (Mũi tên xuống) */}
            <div style={{ display: 'flex', justifyContent: 'center', margin: '10px 0' }}>
                <div style={{
                    backgroundColor: '#4E3E7E',
                    borderRadius: '50%',
                    width: '35px',
                    height: '35px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
                    border: '3px solid #1C1635' // Viền màu nền container
                }}>
                    <span style={{ color: 'white', fontSize: '1.5rem', lineHeight: '10px' }}>
                        ↓
                    </span>
                </div>
            </div>

            {/* Header / Label */}
            <div style={{ color: '#E0E0E0', fontSize: '1rem', marginBottom: '15px' }}>
                To
            </div>

            {/* Ô nhập Token Nhận (CAKE) */}
            <TokenInputBox label="To" token={CAKE_TOKEN} />

            {/* Nút chính */}
            <button style={{
                width: '100%',
                backgroundColor: '#00D092', // Màu xanh ngọc
                color: '#1C1635',
                fontSize: '1.2rem',
                fontWeight: 'bold',
                padding: '15px',
                borderRadius: '16px',
                border: 'none',
                cursor: 'pointer',
                marginTop: '25px',
                boxShadow: '0 4px 15px rgba(0, 208, 146, 0.4)',
                transition: 'background-color 0.3s'
            }}>
                Get Started
            </button>

        </div>
    );
};

export default SwapBox;