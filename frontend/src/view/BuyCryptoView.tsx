import React from 'react';
// import AppPagination from '../components/AppPagination'; // <--- REMOVE THIS IMPORT
// import FeaturesSection from '../components/FeaturesSection'; // <--- REMOVE THIS IMPORT
import BuyCryptoBox from '../components/BuyCryptoBox'; 

const BuyCryptoView: React.FC = () => {
    return (
        <div className="min-h-screen bg-defi-bg text-white">
            <div 
                style={{
                    maxWidth: '100%',
                    margin: '0 auto',
                    padding: '20px 20px 80px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center', // Center BuyCryptoBox
                }}
            >
                
                <BuyCryptoBox />
                
            </div>
        </div>
    );
};

export default BuyCryptoView;