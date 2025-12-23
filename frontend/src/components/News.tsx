import React, { useEffect, useState } from 'react';

interface NewsItem {
  title: string;
  pubDate: string;
  link: string;
  guid: string;
  author: string;
  thumbnail: string;
  description: string;
  enclosure?: { link: string; type: string; thumbnail?: string };
}

const News: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  
  // --- STATE CHO PAGINATION ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Chỉ hiển thị 6 tin

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const RSS_URL = 'https://cointelegraph.com/rss';
        const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(RSS_URL)}`);
        const data = await response.json();

        if (data.status === 'ok') {
          setNews(data.items);
          setError(false);
        } else {
          throw new Error('Không lấy được dữ liệu RSS');
        }
      } catch (err) {
        console.error('Lỗi tải tin tức:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  // Logic tính toán phân trang
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = news.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(news.length / itemsPerPage);

  // Hàm chuyển trang
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Các hàm tiện ích cũ (timeAgo, cleanDescription, extractImage...)
  const timeAgo = (dateString: string) => {
    const date = new Date(dateString.replace(/-/g, '/'));
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    let interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " giờ trước";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " phút trước";
    return "Vừa xong";
  };

  const cleanDescription = (html: string) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  };

  const extractImageFromContent = (content: string) => {
    const doc = new DOMParser().parseFromString(content, 'text/html');
    const img = doc.querySelector('img');
    return img ? img.src : null;
  };

  // --- STYLES (Đã tinh chỉnh cho gọn hơn) ---
  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '40px 20px',
      fontFamily: "'Inter', sans-serif",
      minHeight: '60vh'
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      marginBottom: '32px'
    },
    iconBox: {
      width: '48px', // Giảm kích thước icon chút
      height: '48px',
      backgroundColor: '#f97316',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      boxShadow: '0 8px 16px rgba(249, 115, 22, 0.2)'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', // Card nhỏ hơn xíu
      gap: '20px',
      width: '100%',
      marginBottom: '40px'
    },
    card: {
      backgroundColor: '#1e293b',
      border: '1px solid #334155',
      borderRadius: '16px', // Bo góc nhỏ hơn xíu
      overflow: 'hidden',
      textDecoration: 'none',
      color: 'inherit',
      display: 'flex',
      flexDirection: 'column' as const,
      transition: 'all 0.3s ease',
      height: '100%',
      position: 'relative' as const
    },
    imageContainer: {
      height: '160px', // GIẢM chiều cao ảnh từ 200px xuống 160px
      width: '100%',
      overflow: 'hidden',
      position: 'relative' as const,
      backgroundColor: '#0f172a'
    },
    image: {
      width: '100%',
      height: '100%',
      objectFit: 'cover' as const,
      transition: 'transform 0.5s ease'
    },
    sourceTag: {
      position: 'absolute' as const,
      top: '8px',
      left: '8px',
      backgroundColor: '#f97316',
      color: 'white',
      padding: '2px 8px',
      borderRadius: '6px',
      fontSize: '0.7rem',
      fontWeight: 'bold',
    },
    content: {
      padding: '16px', // GIẢM padding từ 24px xuống 16px
      display: 'flex',
      flexDirection: 'column' as const,
      flexGrow: 1
    },
    meta: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      marginBottom: '8px',
      fontSize: '0.75rem', // Font nhỏ hơn
      color: '#94a3b8'
    },
    title: {
      fontSize: '1.1rem', // Giảm font tiêu đề
      fontWeight: '700',
      color: '#f8fafc',
      marginBottom: '8px',
      lineHeight: '1.4',
      display: '-webkit-box',
      WebkitLineClamp: 2,
      WebkitBoxOrient: 'vertical' as const,
      overflow: 'hidden'
    },
    body: {
      fontSize: '0.9rem',
      color: '#cbd5e1',
      lineHeight: '1.5',
      marginBottom: '16px',
      display: '-webkit-box',
      WebkitLineClamp: 2, // GIẢM số dòng mô tả từ 3 xuống 2
      WebkitBoxOrient: 'vertical' as const,
      overflow: 'hidden',
      flexGrow: 1
    },
    footer: {
      marginTop: 'auto',
      borderTop: '1px solid #334155',
      paddingTop: '12px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    readMore: {
      color: '#f97316',
      fontWeight: '600',
      fontSize: '0.85rem',
      display: 'flex',
      alignItems: 'center',
      gap: '4px'
    },
    // Styles cho Pagination
    paginationContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '8px',
      marginTop: '20px'
    },
    pageButton: (isActive: boolean) => ({
      padding: '8px 16px',
      borderRadius: '8px',
      border: 'none',
      backgroundColor: isActive ? '#f97316' : '#334155',
      color: 'white',
      cursor: 'pointer',
      fontSize: '0.9rem',
      fontWeight: 'bold',
      transition: 'background 0.2s'
    })
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.iconBox}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
        </div>
        <div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'white', margin: 0 }}>Crypto News</h2>
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '100px 0', color: '#94a3b8' }}>
          <p>Đang cập nhật tin mới nhất...</p>
        </div>
      ) : error ? (
        <div style={{ textAlign: 'center', color: '#fca5a5' }}>Lỗi tải tin tức.</div>
      ) : (
        <>
          {/* Grid hiển thị 6 tin */}
          <div style={styles.grid}>
            {currentItems.map((item, index) => (
              <a 
                key={index} 
                href={item.link} 
                target="_blank" 
                rel="noopener noreferrer"
                style={styles.card}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)'; // Giảm hiệu ứng bay lên cho gọn
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={styles.imageContainer}>
                  <img 
                    src={
                      item.enclosure?.link || 
                      item.thumbnail || 
                      extractImageFromContent(item.description) || 
                      'https://via.placeholder.com/600x300?text=News'
                    } 
                    alt={item.title} 
                    style={styles.image}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/600x300?text=Crypto+News';
                    }}
                  />
                  <span style={styles.sourceTag}>NEW</span>
                </div>

                <div style={styles.content}>
                  <div style={styles.meta}>
                    <span style={{ color: '#f97316', fontWeight: 'bold' }}>{item.author}</span>
                    <span>• {timeAgo(item.pubDate)}</span>
                  </div>

                  <h3 style={styles.title}>{item.title}</h3>
                  <p style={styles.body}>{cleanDescription(item.description)}</p>

                  <div style={styles.footer}>
                    <span style={{ fontSize: '0.75rem', color: '#64748b' }}>CoinTelegraph</span>
                    <div style={styles.readMore}>
                      Xem ngay
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Pagination Controls */}
          {news.length > itemsPerPage && (
            <div style={styles.paginationContainer}>
              <button 
                onClick={() => paginate(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                style={{...styles.pageButton(false), opacity: currentPage === 1 ? 0.5 : 1}}
              >
                &lt; Trước
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => paginate(i + 1)}
                  style={styles.pageButton(currentPage === i + 1)}
                >
                  {i + 1}
                </button>
              ))}

              <button 
                onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                style={{...styles.pageButton(false), opacity: currentPage === totalPages ? 0.5 : 1}}
              >
                Sau &gt;
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default News;