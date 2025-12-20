import React from 'react';

interface EarnOpportunity {
    title: string;
    apr: string;
    type: string;
    chain: string;
}

interface EarnCardProps {
    opportunity: EarnOpportunity;
}

const EarnCard: React.FC<EarnCardProps> = ({ opportunity }) => {
    
    // Màu cho APR
    const aprColor = opportunity.type.includes('Farming') ? '#ef4444' : '#4ade80';

    return (
        <div 
            style={{
                backgroundColor: '#1e293b',
                borderRadius: '16px',
                border: '1px solid #334155',
                padding: '25px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
            }}
        >
            <div>
                <h3 style={{ color: '#ffffff', fontSize: '1.75rem', marginBottom: '10px', fontWeight: 'bold' }}>
                    {opportunity.title}
                </h3>
                <p style={{ color: '#88909c', marginBottom: '20px' }}>
                    Loại: {opportunity.type} | Mạng: {opportunity.chain}
                </p>
            </div>
            
            <div style={{ borderTop: '1px solid #334155', paddingTop: '15px' }}>
                 <p style={{ color: '#b8c0cc', marginBottom: '5px' }}>Tỷ suất sinh lợi (APR)</p>
                 <span style={{ color: aprColor, fontSize: '2rem', fontWeight: 'extra-bold' }}>
                    Up to {opportunity.apr}
                 </span>
            </div>
            
            <button
                style={{
                    backgroundColor: '#facc15',
                    color: '#1e293b',
                    fontWeight: 'bold',
                    padding: '10px 15px',
                    borderRadius: '8px',
                    marginTop: '20px',
                    border: 'none',
                    cursor: 'pointer'
                }}
            >
                Xem chi tiết
            </button>
        </div>
    );
};

export default EarnCard;