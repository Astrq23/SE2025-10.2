import React from 'react';
// import AppPagination from '../components/AppPagination'; // <--- XÓA IMPORT NÀY
// import FeaturesSection from '../components/FeaturesSection'; // <--- XÓA IMPORT NÀY
import BuyCryptoBox from '../components/BuyCryptoBox'; 

const BuyCryptoView: React.FC = () => {
    return (
        <div className="min-h-screen bg-defi-bg text-white">
            <div 
                style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    padding: '20px 20px 80px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center', // Căn giữa BuyCryptoBox
                }}
            >
                
                <BuyCryptoBox />
                
            </div>
        </div>
    );
};

export default BuyCryptoView;