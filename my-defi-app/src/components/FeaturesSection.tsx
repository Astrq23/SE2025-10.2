import React from 'react';

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <div className="p-6 bg-[#1a2035] rounded-xl border border-[#2d3748] hover:border-defi-primary transition duration-300 transform hover:-translate-y-1 shadow-md">
    <div className="text-3xl mb-3 text-defi-primary">{icon}</div>
    <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
    <p className="text-[#b8c0cc]">{description}</p>
  </div>
);

const FeaturesSection: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto my-16 px-4">
      <h2 className="text-3xl font-bold text-center text-white mb-10">Các Tính năng Chính</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FeatureCard 
          icon="🔄" 
          title="Giao dịch (Swap)" 
          description="Hoán đổi token ngay lập tức và hiệu quả trên mạng lưới của chúng tôi." 
        />
        <FeatureCard 
          icon="💰" 
          title="Kiếm Lợi Nhuận (Farming)" 
          description="Cung cấp thanh khoản và nhận thưởng token với tỷ lệ cao." 
        />
        <FeatureCard 
          icon="🔒" 
          title="Staking" 
          description="Khóa token của bạn và kiếm lãi suất thụ động an toàn." 
        />
      </div>
    </section>
  );
};

export default FeaturesSection;