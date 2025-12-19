/**
 * Component biểu đồ tuyến tính với Canvas API
 * Vẽ biểu đồ giá coin real-time
 */

import React, { useEffect, useRef } from 'react';
import { ChartData } from '../services/chartDataService';

interface CanvasChartProps {
  data: ChartData[];
  loading: boolean;
  width?: number;
  height?: number;
  color?: string;
  gridColor?: string;
  textColor?: string;
  showGrid?: boolean;
  showTooltip?: boolean;
}

const CanvasChart: React.FC<CanvasChartProps> = ({
  data,
  loading,
  width = 800,
  height = 400,
  color = '#4ade80',
  gridColor = '#334155',
  textColor = '#b8c0cc',
  showGrid = true,
  showTooltip = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);

  useEffect(() => {
    if (!canvasRef.current || loading || data.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Tính toán padding và kích thước vùng vẽ
    const padding = 50;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

    // Xóa canvas
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, width, height);

    // Tìm min/max giá
    const prices = data.map(d => d.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const priceRange = maxPrice - minPrice;

    // Vẽ lưới
    if (showGrid) {
      ctx.strokeStyle = gridColor;
      ctx.lineWidth = 1;

      // Đường ngang (giá)
      for (let i = 0; i <= 5; i++) {
        const y = padding + (chartHeight * i) / 5;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.stroke();

        // Nhãn giá
        const price = maxPrice - (priceRange * i) / 5;
        ctx.fillStyle = textColor;
        ctx.font = '12px Arial';
        ctx.textAlign = 'right';
        ctx.fillText(price.toFixed(0), padding - 10, y + 4);
      }

      // Đường dọc (thời gian)
      const timeSteps = Math.min(10, data.length);
      for (let i = 0; i < timeSteps; i++) {
        const x = padding + (chartWidth * i) / (timeSteps - 1);
        ctx.beginPath();
        ctx.moveTo(x, padding);
        ctx.lineTo(x, height - padding);
        ctx.stroke();
      }
    }

    // Vẽ đường giá
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();

    data.forEach((point, index) => {
      const x = padding + (chartWidth * index) / (data.length - 1);
      const y = height - padding - ((point.price - minPrice) / priceRange) * chartHeight;

      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });

    ctx.stroke();

    // Vẽ điểm dữ liệu
    ctx.fillStyle = color;
    data.forEach((point, index) => {
      const x = padding + (chartWidth * index) / (data.length - 1);
      const y = height - padding - ((point.price - minPrice) / priceRange) * chartHeight;

      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fill();
    });

    // Vẽ điểm khi hover
    if (hoveredIndex !== null && hoveredIndex < data.length) {
      const x = padding + (chartWidth * hoveredIndex) / (data.length - 1);
      const y = height - padding - ((data[hoveredIndex].price - minPrice) / priceRange) * chartHeight;

      // Vòng tròn lớn
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(x, y, 8, 0, Math.PI * 2);
      ctx.stroke();

      // Đường dọc
      ctx.strokeStyle = 'rgba(74, 222, 128, 0.3)';
      ctx.lineWidth = 1;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(x, padding);
      ctx.lineTo(x, height - padding);
      ctx.stroke();
      ctx.setLineDash([]);

      // Tooltip
      if (showTooltip) {
        const tooltipWidth = 120;
        const tooltipHeight = 60;
        let tooltipX = x - tooltipWidth / 2;
        let tooltipY = y - tooltipHeight - 10;

        // Đảm bảo tooltip nằm trong canvas
        if (tooltipX < padding) tooltipX = padding;
        if (tooltipX + tooltipWidth > width - padding) tooltipX = width - padding - tooltipWidth;
        if (tooltipY < padding) tooltipY = y + 10;

        ctx.fillStyle = 'rgba(30, 41, 59, 0.95)';
        ctx.fillRect(tooltipX, tooltipY, tooltipWidth, tooltipHeight);

        ctx.strokeStyle = color;
        ctx.lineWidth = 1;
        ctx.strokeRect(tooltipX, tooltipY, tooltipWidth, tooltipHeight);

        ctx.fillStyle = textColor;
        ctx.font = 'bold 12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(`$${data[hoveredIndex].price.toFixed(2)}`, tooltipX + tooltipWidth / 2, tooltipY + 20);

        ctx.font = '11px Arial';
        ctx.fillText(data[hoveredIndex].date, tooltipX + tooltipWidth / 2, tooltipY + 40);
      }
    }
  }, [data, loading, width, height, color, gridColor, textColor, showGrid, showTooltip, hoveredIndex]);

  // Xử lý mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current || data.length === 0) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;

    const padding = 50;
    const chartWidth = width - padding * 2;

    // Tính toán index dựa vào vị trí mouse
    if (x >= padding && x <= width - padding) {
      const relativeX = x - padding;
      const index = Math.round((relativeX / chartWidth) * (data.length - 1));
      setHoveredIndex(Math.max(0, Math.min(index, data.length - 1)));
    }
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  if (loading) {
    return (
      <div style={{
        width,
        height,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0f172a',
        borderRadius: '8px',
        color: textColor,
      }}>
        ⏳ Đang tải dữ liệu...
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div style={{
        width,
        height,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0f172a',
        borderRadius: '8px',
        color: textColor,
      }}>
        Không có dữ liệu
      </div>
    );
  }

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        borderRadius: '8px',
        cursor: 'crosshair',
        display: 'block',
      }}
    />
  );
};

export default CanvasChart;
