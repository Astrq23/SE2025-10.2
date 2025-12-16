// D:\cnpm\my-defi-app/src/views/MintView.tsx

import React from 'react';
import MintingBox from '../components/MintingBox';

const MintView: React.FC = () => {
    return (
        <div className="min-h-screen bg-defi-bg text-white pt-10 pb-20">
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-3xl font-extrabold text-white mb-8 text-center">
                    NFT Minting Station
                </h2>
                {/* Đặt component MintingBox vào giữa màn hình */}
                <MintingBox />
            </div>
        </div>
    );
};

export default MintView;