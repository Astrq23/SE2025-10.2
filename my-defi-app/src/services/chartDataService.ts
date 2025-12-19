/**
 * Service để lấy dữ liệu biểu đồ từ CoinGecko API
 */

export interface ChartData {
  timestamp: number;
  price: number;
  date: string;
}

export interface CoinChartResponse {
  prices: [number, number][]; // [timestamp, price]
  market_caps: [number, number][];
  volumes: [number, number][];
}

const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3';

/**
 * Lấy dữ liệu giá lịch sử của coin
 * @param coinId - ID coin (ví dụ: 'bitcoin')
 * @param days - Số ngày quay lại (1, 7, 30, 90, 180, 365, max)
 * @param vsCurrency - Đơn vị tiền tệ (mặc định 'usd')
 * @returns Dữ liệu biểu đồ đã được xử lý
 */
export const getChartData = async (
  coinId: string,
  days: string | number = 7,
  vsCurrency: string = 'usd'
): Promise<ChartData[]> => {
  try {
    const response = await fetch(
      `${COINGECKO_API_URL}/coins/${coinId}/market_chart?vs_currency=${vsCurrency}&days=${days}&interval=daily`
    );

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    const data: CoinChartResponse = await response.json();
    
    // Chuyển đổi dữ liệu thành định dạng dễ sử dụng
    return data.prices.map(([timestamp, price]) => ({
      timestamp,
      price,
      date: new Date(timestamp).toLocaleDateString('vi-VN', {
        month: 'short',
        day: 'numeric',
      }),
    }));
  } catch (error) {
    console.error(`Error fetching chart data for ${coinId}:`, error);
    throw error;
  }
};

/**
 * Lấy dữ liệu giá trong khoảng thời gian ngắn (cho real-time)
 * @param coinId - ID coin
 * @param hours - Số giờ (1, 3, 6, 12, 24)
 * @returns Dữ liệu biểu đồ
 */
export const getRealtimeChartData = async (
  coinId: string,
  hours: number = 24
): Promise<ChartData[]> => {
  // CoinGecko không có endpoint real-time, nên ta sẽ dùng 7 ngày
  // nhưng chỉ lấy dữ liệu từ X giờ trở lại
  const chartData = await getChartData(coinId, 7, 'usd');
  
  const now = Date.now();
  const hoursInMs = hours * 60 * 60 * 1000;
  const cutoffTime = now - hoursInMs;
  
  return chartData.filter(data => data.timestamp >= cutoffTime);
};

/**
 * Lấy dữ liệu cho nhiều coin cùng lúc (để so sánh)
 * @param coinIds - Danh sách ID coin
 * @param days - Số ngày
 * @returns Object với coinId làm key và dữ liệu biểu đồ làm value
 */
export const getMultipleCoinsChartData = async (
  coinIds: string[],
  days: string | number = 7
): Promise<{ [key: string]: ChartData[] }> => {
  try {
    const results: { [key: string]: ChartData[] } = {};
    
    // Gọi API song song cho tất cả coins
    const promises = coinIds.map(coinId => 
      getChartData(coinId, days, 'usd')
        .then(data => {
          results[coinId] = data;
        })
        .catch(err => {
          console.error(`Failed to get chart data for ${coinId}:`, err);
          results[coinId] = [];
        })
    );
    
    await Promise.all(promises);
    return results;
  } catch (error) {
    console.error('Error fetching multiple coins chart data:', error);
    throw error;
  }
};

/**
 * Tính toán số liệu thống kê từ dữ liệu biểu đồ
 */
export const calculateChartStats = (data: ChartData[]) => {
  if (data.length === 0) {
    return { min: 0, max: 0, avg: 0, current: 0, change: 0, changePercent: 0 };
  }

  const prices = data.map(d => d.price);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const avg = prices.reduce((a, b) => a + b, 0) / prices.length;
  const current = prices[prices.length - 1];
  const previous = prices[0];
  const change = current - previous;
  const changePercent = (change / previous) * 100;

  return { min, max, avg, current, change, changePercent };
};
