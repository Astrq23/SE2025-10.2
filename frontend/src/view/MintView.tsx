// D:\cnpm\my-defi-app/src/view/MintView.tsx

import React from 'react';
import MintingBox from '../components/MintingBox';
import AppPagination from '../components/AppPagination';
import FeaturesSection from '../components/FeaturesSection';

const MintView: React.FC = () => {
    return (
        // Container chính: Full width 100%
        <div className="min-h-screen bg-defi-bg text-white" style={{ width: '100%', boxSizing: 'border-box' }}>
            <div
                style={{
                    width: '100%',          // Bắt buộc 100%
                    maxWidth: '100%',       // Xóa giới hạn cũ
                    margin: '0',
                    // --- SỬA TẠI ĐÂY: Dùng % thay vì px cố định ---
                    padding: '40px 8%',     // Trái/Phải 8% tạo khoảng thở rộng rãi
                    // ---------------------------------------------
                    boxSizing: 'border-box',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'    // Căn giữa nội dung bên trong
                }}
            >
                {/* Tiêu đề */}
                <div style={{ textAlign: 'center', marginBottom: '50px', maxWidth: '800px' }}>
                    <h1 style={{ color: '#facc15', fontSize: '3rem', marginBottom: '20px', fontWeight: 'bold' }}>
                        NFT Minting Station
                    </h1>
                    <p style={{ color: '#b8c0cc', fontSize: '1.3rem' }}>
                        Tạo và sở hữu các NFT độc đáo trên blockchain. Mint NFT của bạn một cách nhanh chóng và an toàn.
                    </p>
                </div>

                {/* Khu vực Mint Box */}
                <div style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    marginBottom: '80px'
                }}>
                    <MintingBox />
                </div>

                {/* Phần thông tin chi tiết: Grid Layout Full Width */}
                <div
                    style={{
                        padding: '40px',
                        backgroundColor: '#1e293b',
                        borderRadius: '20px',
                        border: '1px solid #334155',
                        width: '100%',       // Chiếm hết chiều ngang container cha
                        boxSizing: 'border-box'
                    }}
                >
                    <h2 style={{ color: '#facc15', fontSize: '2rem', marginBottom: '40px', textAlign: 'center' }}>
                        Về NFT Minting
                    </h2>

                    <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', // Tự động chia cột linh hoạt
                        gap: '40px' 
                    }}>
                        {/* Item 1 */}
                        <div>
                            <h3 style={{ color: '#4ade80', marginBottom: '15px', fontSize: '1.2rem', fontWeight: 'bold' }}>
                                🎨 Tạo NFT Độc Đáo
                            </h3>
                            <p style={{ color: '#b8c0cc', lineHeight: '1.6' }}>
                                Mint các NFT với thiết kế và metadata tùy chỉnh. Mỗi NFT là duy nhất và có thể đại diện cho nghệ thuật, collectible, hoặc tài sản số.
                            </p>
                        </div>

                        {/* Item 2 */}
                        <div>
                            <h3 style={{ color: '#4ade80', marginBottom: '15px', fontSize: '1.2rem', fontWeight: 'bold' }}>
                                ⚡ Mint Nhanh Chóng
                            </h3>
                            <p style={{ color: '#b8c0cc', lineHeight: '1.6' }}>
                                Giao dịch mint được xử lý nhanh chóng trên blockchain với phí gas tối ưu và xác nhận tức thời.
                            </p>
                        </div>

                        {/* Item 3 */}
                        <div>
                            <h3 style={{ color: '#4ade80', marginBottom: '15px', fontSize: '1.2rem', fontWeight: 'bold' }}>
                                🔒 Sở Hữu Vĩnh Viễn
                            </h3>
                            <p style={{ color: '#b8c0cc', lineHeight: '1.6' }}>
                                NFT của bạn được lưu trữ an toàn trên blockchain, không thể bị thay đổi hoặc xóa bởi bất kỳ ai.
                            </p>
                        </div>

                        {/* Item 4 */}
                        <div>
                            <h3 style={{ color: '#4ade80', marginBottom: '15px', fontSize: '1.2rem', fontWeight: 'bold' }}>
                                🌐 Đa Blockchain
                            </h3>
                            <p style={{ color: '#b8c0cc', lineHeight: '1.6' }}>
                                Mint NFT trên nhiều blockchain khác nhau như BNB Chain, Ethereum, và các mạng layer 2.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Pagination */}
            <div
                style={{
                    width: '100%',
                    padding: '0 0 60px',
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <AppPagination />
            </div>

             {/* Footer Features: Cũng cập nhật padding 8% cho đồng bộ */}
             <div style={{ width: '100%', padding: '0 8%', boxSizing: 'border-box' }}>
                <FeaturesSection />
            </div>
        </div>
    );
};

export default MintView;