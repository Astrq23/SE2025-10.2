import React from 'react';
import { Link, useLocation } from 'react-router-dom';

// Định nghĩa các đường dẫn (paths) của các trang trong ứng dụng
const PAGES = [
  { id: 1, name: 'Trang chủ', path: '/' },
  { id: 2, name: 'Giao dịch', path: '/trade' },
  { id: 3, name: 'Kiếm tiền', path: '/earn' },
  // Bạn có thể thêm { id: 3, name: 'Earn', path: '/earn' }, v.v.
];

const AppPagination: React.FC = () => {
  const location = useLocation(); 

  // Tìm trang hiện tại
  const currentIndex = PAGES.findIndex(p => p.path === location.pathname);
  const currentPageId = currentIndex >= 0 ? PAGES[currentIndex].id : 1;

  const prevPath = PAGES[currentIndex - 1]?.path || '#';
  const nextPath = PAGES[currentIndex + 1]?.path || '#';

  const isFirstPage = currentPageId === 1;
  const isLastPage = currentPageId === PAGES.length;

  return (
    <div 
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '48px 0', // Khoảng cách lớn hơn so với nội dung chính
      }}
    >
      {/* Nút Quay Lại */}
      <Link 
        to={prevPath}
        style={{
          padding: '12px',
          margin: '0 8px',
          borderRadius: '9999px',
          color: 'white',
          backgroundColor: isFirstPage ? '#334155' : '#4ade80',
          opacity: isFirstPage ? 0.6 : 1,
          pointerEvents: isFirstPage ? 'none' : 'auto',
          transition: 'background-color 0.2s',
          display: 'flex',
          alignItems: 'center',
          textDecoration: 'none',
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" style={{ height: '20px', width: '20px' }} viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      </Link>

      {/* Các nút số trang */}
      {PAGES.map((page) => (
        <Link
          key={page.id}
          to={page.path}
          style={{
            padding: '10px 20px',
            margin: '0 4px',
            borderRadius: '9999px',
            fontSize: '1.125rem',
            fontWeight: 'bold',
            transition: 'all 0.2s',
            textDecoration: 'none',
            color: page.path === location.pathname ? '#1e293b' : '#b8c0cc',
            backgroundColor: page.path === location.pathname ? '#facc15' : '#1e293b', // Màu Vàng nổi bật
            boxShadow: page.path === location.pathname ? '0 4px 14px rgba(250, 204, 21, 0.4)' : 'none',
          }}
        >
          {page.id}
        </Link>
      ))}

      {/* Nút Tiếp Theo */}
      <Link 
        to={nextPath}
        style={{
          padding: '12px',
          margin: '0 8px',
          borderRadius: '9999px',
          color: 'white',
          backgroundColor: isLastPage ? '#334155' : '#4ade80',
          opacity: isLastPage ? 0.6 : 1,
          pointerEvents: isLastPage ? 'none' : 'auto',
          transition: 'background-color 0.2s',
          display: 'flex',
          alignItems: 'center',
          textDecoration: 'none',
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" style={{ height: '20px', width: '20px' }} viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>
      </Link>
    </div>
  );
};

export default AppPagination;