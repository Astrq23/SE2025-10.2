import React from 'react';
import MintingBox from '../components/MintingBox';
import AppPagination from '../components/AppPagination';

const MintView: React.FC = () => {
    return (
        // CONTAINER CHÍNH
        <div style={{ position: 'relative', minHeight: '100vh', color: 'white' }}>
            
            {/* 1. BACKGROUND IMAGE (CỐ ĐỊNH) */}
            {/* Dùng thẻ img với position fixed để làm hình nền không bị trôi */}
            <img
                src="/nft.jpg" 
                alt="NFT Background"
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    zIndex: -1, // Đẩy xuống dưới cùng
                }}
            />

            {/* 2. LỚP PHỦ TỐI (OVERLAY) */}
            {/* Giúp làm tối hình nền để nội dung phía trên dễ đọc hơn */}
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(15, 23, 42, 0.85)', // Màu Slate-900 độ mờ 85%
                    zIndex: -1,
                }}
            ></div>

            {/* 3. NỘI DUNG CHÍNH (NỔI LÊN TRÊN) */}
            <div style={{ position: 'relative', zIndex: 10, width: '100%', boxSizing: 'border-box' }}>
                <div
                    style={{
                        maxWidth: '1200px',
                        margin: '0 auto',
                        padding: '60px 20px 80px',
                    }}
                >
                    {/* Title Section */}
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 drop-shadow-sm">
                            NFT Minting Station
                        </h1>
                        <p className="text-slate-300 text-lg max-w-2xl mx-auto leading-relaxed">
                            Create, collect, and own unique digital assets on the blockchain. 
                            Start your NFT journey instantly.
                        </p>
                    </div>

                    {/* Minting Box Area */}
                    <div className="flex justify-center mb-12 relative">
                        {/* Hiệu ứng Glow nhẹ phía sau box */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg h-64 bg-purple-600/30 rounded-full blur-[80px] pointer-events-none"></div>
                        
                        <div className="relative z-10 w-full max-w-xl">
                            <MintingBox />
                        </div>
                    </div>


                </div>
            </div>
        </div>
    );
};

export default MintView;