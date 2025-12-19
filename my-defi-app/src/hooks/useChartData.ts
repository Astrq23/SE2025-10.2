/**
 * Custom Hook để lấy và quản lý dữ liệu biểu đồ
 */

import { useState, useEffect } from 'react';
import { getChartData, getRealtimeChartData, ChartData, calculateChartStats } from '../services/chartDataService';

export interface UseChartResult {
  data: ChartData[];
  loading: boolean;
  error: string | null;
  stats: {
    min: number;
    max: number;
    avg: number;
    current: number;
    change: number;
    changePercent: number;
  };
  timeframe: string;
  setTimeframe: (timeframe: string) => void;
  refetch: () => void;
}

/**
 * Hook để lấy dữ liệu biểu đồ của một coin
 */
export const useChartData = (coinId: string, defaultDays: string | number = 7): UseChartResult => {
  const [data, setData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeframe, setTimeframe] = useState<string>(String(defaultDays));

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const chartData = await getChartData(coinId, timeframe, 'usd');
      setData(chartData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch chart data');
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [coinId, timeframe]);

  const stats = calculateChartStats(data);

  return { data, loading, error, stats, timeframe, setTimeframe, refetch: fetchData };
};

/**
 * Hook cho dữ liệu real-time (cập nhật mỗi vài phút)
 */
export const useRealtimeChartData = (
  coinId: string,
  updateInterval: number = 60000 // 1 phút
): UseChartResult => {
  const [data, setData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeframe, setTimeframe] = useState<string>('1');

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const hours = parseInt(timeframe) || 24;
      const chartData = await getRealtimeChartData(coinId, hours);
      setData(chartData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch realtime data');
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    
    // Auto-refresh data
    const interval = setInterval(fetchData, updateInterval);
    return () => clearInterval(interval);
  }, [coinId, updateInterval, timeframe]);

  const stats = calculateChartStats(data);

  return { data, loading, error, stats, timeframe, setTimeframe, refetch: fetchData };
};
