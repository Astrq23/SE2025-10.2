import React from 'react';
import AppPagination from '../components/AppPagination';
import FeaturesSection from '../components/FeaturesSection';
import EarnCard from '../components/EarnCard'; 

const EarnView: React.FC = () => {
    
    // Dữ liệu mẫu cho 2 Box lớn (Perpetuals và Prediction)
    const perpetualsData = { title: 'Perpetuals', apr: '100x Leverage', type: 'Giao dịch đòn bẩy', chain: 'BTC/ETH' };
    const predictionData = { title: 'Prediction', apr: 'BUSD/BNB', type: 'Dự đoán giá', chain: 'Top Winner' };

    return (
        <div className="min-h-screen bg-defi-bg text-white">
            <div 
                style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    padding: '60px 20px 80px',
                }}
            >
                <h1 
                    style={{
                        color: '#facc15',
                        fontSize: '3rem',
                        marginBottom: '20px',
                    }}
                >
                    Kiếm Tiền từ Tài Sản Kỹ Thuật Số
                </h1>
                <p
                    style={{
                        color: '#b8c0cc',
                        fontSize: '1.25rem',
                        marginBottom: '40px',
                    }}
                >
                    Cung cấp thanh khoản, stake token, và farm để nhận phí giao dịch và phần thưởng.
                </p>

                {/* BỐ CỤC CHÍNH: CHỈ 2 BOX LỚN (NHƯ ẢNH GỐC) */}
                <h2 style={{ fontSize: '2rem', color: '#b8c0cc', marginBottom: '30px', borderBottom: '1px solid #334155', paddingBottom: '10px' }}>
                    Tính năng Nổi bật
                </h2>
                <div style={{ display: 'flex', gap: '30px' }}>
                    
                    {/* BOX 1: Perpetuals */}
                    <div style={{ flex: 1 }}>
                        {/* Box này sẽ giữ nguyên kích thước và hiển thị dữ liệu Perp */}
                        <EarnCard opportunity={perpetualsData} />
                    </div>
                    
                    {/* BOX 2: Prediction */}
                    <div style={{ flex: 1 }}>
                        {/* Box này sẽ giữ nguyên kích thước và hiển thị dữ liệu Prediction */}
                         <EarnCard opportunity={predictionData} />
                    </div>
                </div>
                
                {/* KHU VỰC THỨ CẤP: DÙNG ĐỂ HIỂN THỊ CÁC POOL/FARMING KHÁC */}
                <h2 style={{ fontSize: '1.5rem', color: '#4ade80', marginTop: '60px', marginBottom: '20px' }}>
                    Các Cơ hội Farming & Staking
                </h2>
                <div style={{ 
                    backgroundColor: '#1e293b',
                    borderRadius: '16px',
                    border: '1px solid #334155',
                    padding: '20px',
                    minHeight: '200px', // Giữ minHeight để tạo không gian
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <p style={{ color: '#88909c' }}>[Khu vực này sẽ là nơi hiển thị danh sách các Pool và Farm (ví dụ: USDT/WBNB)]</p>
                </div>


            </div>
            
            {/* ĐẶT PHÂN TRANG VÀ FEATURE SECTION Ở CUỐI TRANG */}
            <FeaturesSection /> 
            <AppPagination /> 
            
        </div>
    );
};

export default EarnView;