// D:\cnpm\my-defi-app/src/view/MintView.tsx

import React from 'react';
import MintingBox from '../components/MintingBox';
import AppPagination from '../components/AppPagination';
import FeaturesSection from '../components/FeaturesSection';

const MintView: React.FC = () => {
    return (
        <div className="min-h-screen bg-defi-bg text-white">
            <div
                style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    padding: '20px 20px 80px',
                }}
            >
                {/* Tiêu đề */}
                <h1 style={{ color: '#facc15', fontSize: '2.5rem', marginBottom: '20px' }}>
                    NFT Minting Station
                </h1>
                <p style={{ color: '#b8c0cc', fontSize: '1.25rem', marginBottom: '40px' }}>
                    Tạo và sở hữu các NFT độc đáo trên blockchain. Mint NFT của bạn một cách nhanh chóng và an toàn.
                </p>

                {/* Layout chính */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '400px',
                    marginBottom: '60px'
                }}>
                    <MintingBox />
                </div>

                {/* Phần thông tin chi tiết */}
                <div
                    style={{
                        padding: '30px',
                        backgroundColor: '#1e293b',
                        borderRadius: '16px',
                        border: '1px solid #334155',
                    }}
                >
                    <h2 style={{ color: '#facc15', fontSize: '1.8rem', marginBottom: '20px' }}>
                        Về NFT Minting
                    </h2>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
                        <div>
                            <h3 style={{ color: '#4ade80', marginBottom: '10px', fontSize: '1.1rem' }}>
                                🎨 Tạo NFT Độc Đáo
                            </h3>
                            <p style={{ color: '#b8c0cc', lineHeight: '1.6' }}>
                                Mint các NFT với thiết kế và metadata tùy chỉnh. Mỗi NFT là duy nhất và
                                có thể đại diện cho nghệ thuật, collectible, hoặc tài sản số.
                            </p>
                        </div>

                        <div>
                            <h3 style={{ color: '#4ade80', marginBottom: '10px', fontSize: '1.1rem' }}>
                                ⚡ Mint Nhanh Chóng
                            </h3>
                            <p style={{ color: '#b8c0cc', lineHeight: '1.6' }}>
                                Giao dịch mint được xử lý nhanh chóng trên blockchain với phí gas
                                tối ưu và xác nhận tức thời.
                            </p>
                        </div>

                        <div>
                            <h3 style={{ color: '#4ade80', marginBottom: '10px', fontSize: '1.1rem' }}>
                                🔒 Sở Hữu Vĩnh Viễn
                            </h3>
                            <p style={{ color: '#b8c0cc', lineHeight: '1.6' }}>
                                NFT của bạn được lưu trữ an toàn trên blockchain, không thể bị
                                thay đổi hoặc xóa bởi bất kỳ ai.
                            </p>
                        </div>

                        <div>
                            <h3 style={{ color: '#4ade80', marginBottom: '10px', fontSize: '1.1rem' }}>
                                🌐 Đa Blockchain
                            </h3>
                            <p style={{ color: '#b8c0cc', lineHeight: '1.6' }}>
                                Mint NFT trên nhiều blockchain khác nhau như BNB Chain, Ethereum,
                                và các mạng layer 2.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Pagination */}
            <div
                style={{
                    margin: '0 auto',
                    padding: '0 20px 60px',
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <AppPagination />
            </div>

            {/* Features Section */}
            <FeaturesSection />
        </div>
    );
};

export default MintView;