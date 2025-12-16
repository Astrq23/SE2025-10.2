import React from 'react';

const BuyCryptoBox: React.FC = () => {
    
    // Style cho khối chứa input/thông tin
    const infoBlockStyle: React.CSSProperties = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px',
        backgroundColor: '#3730a3', // Màu tím đậm hơn (Input USD)
        borderRadius: '12px',
        marginBottom: '10px',
        fontWeight: 'bold',
        fontSize: '1.5rem',
        color: 'white',
    };
    
    // Style cho thông tin phí/tùy chọn
    const detailStyle: React.CSSProperties = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '20px',
        fontSize: '0.9rem',
        color: '#b8c0cc',
    };

    return (
        <div style={{ 
            width: '400px',
            backgroundColor: '#1f2937', // Nền chính
            padding: '25px',
            borderRadius: '16px',
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.5)',
        }}>
            {/* Tiêu đề */}
            <h2 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '5px' }}>
                Buy Crypto
            </h2>
            <p style={{ color: '#b8c0cc', marginBottom: '20px' }}>
                Buy crypto in just a few clicks
            </p>

            {/* KHỐI INPUT 1: USD */}
            <div style={infoBlockStyle}>
                <span>150</span>
                <span style={{ color: '#facc15' }}>USD</span>
            </div>

            {/* Nút Chuyển đổi */}
            <div style={{ textAlign: 'center', margin: '5px 0' }}>
                <span style={{ 
                    backgroundColor: '#303953', 
                    borderRadius: '50%', 
                    padding: '8px', 
                    display: 'inline-block',
                    cursor: 'pointer'
                }}>
                    <span role="img" aria-label="arrow">⬇️</span>
                </span>
            </div>

            {/* KHỐI INPUT 2: CAKE */}
            <div style={{...infoBlockStyle, backgroundColor: '#4c1d95'}}> {/* Màu tím nhạt hơn (Input CAKE) */}
                <span>69.55238</span>
                <span style={{ color: '#06b6d4' }}>CAKE</span>
                {/* Thêm chú thích "on binance" nếu cần */}
            </div>
            
            {/* Tùy chọn Topper/Best Quote */}
            <div style={{ 
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: '#1f2937', 
                border: '1px solid #334155', 
                borderRadius: '12px',
                padding: '10px 15px',
                fontSize: '1rem',
                marginTop: '15px'
            }}>
                <div style={{display: 'flex', alignItems: 'center', color: 'white'}}>
                    <span style={{marginRight: '10px'}} role="img" aria-label="Topper">🟢</span>
                    Topper
                    <span style={{marginLeft: '10px', fontSize: '0.8rem', color: '#b8c0cc'}}>1 CAKE = $2.08</span>
                </div>
                <div style={{display: 'flex', alignItems: 'center', color: '#4ade80', fontWeight: 'bold'}}>
                    Best quote <span style={{marginLeft: '5px'}} role="img" aria-label="check">✔️</span>
                </div>
            </div>

            {/* Thông tin Chain */}
            <div style={{ textAlign: 'center', marginTop: '15px', color: '#b8c0cc', fontSize: '1rem', fontWeight: 'bold' }}>
                BNB Chain
            </div>
            
            {/* Thông tin phí và chi tiết */}
            <div style={detailStyle}>
                <span>Est total fees: $5.27</span>
                <span style={{ textDecoration: 'underline', cursor: 'pointer', color: '#06b6d4' }}>
                    Show details
                </span>
            </div>

            {/* Link điều khoản */}
            <p style={{ color: '#88909c', fontSize: '0.85rem', textAlign: 'center', marginTop: '20px' }}>
                Click here to enable update notifications
            </p>
            <p style={{ color: '#88909c', fontSize: '0.85rem', textAlign: 'center', marginTop: '5px' }}>
                By continuing you agree to our <span style={{ textDecoration: 'underline', color: '#facc15', cursor: 'pointer' }}>terms of service</span>
            </p>

            {/* Nút chính */}
            <button
                style={{
                    width: '100%',
                    padding: '15px',
                    marginTop: '20px',
                    backgroundColor: '#06b6d4', // Màu xanh lam
                    color: 'white',
                    fontWeight: 'bold',
                    borderRadius: '12px',
                    border: 'none',
                    fontSize: '1.1rem',
                    cursor: 'pointer',
                    boxShadow: '0 4px 10px rgba(6, 182, 212, 0.4)',
                }}
            >
                Buy with Topper
            </button>
        </div>
    );
};

export default BuyCryptoBox;