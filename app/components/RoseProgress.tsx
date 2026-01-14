'use client';

import React, { useState } from 'react';

interface RoseProgressProps {
  raised: number;
  goal: number;
  className?: string;
  showPreview?: boolean;
}

export default function RoseProgress({
  raised,
  goal,
  className = '',
  showPreview = true,
}: RoseProgressProps) {
  const percentage = Math.min(100, Math.max(0, (raised / goal) * 100));
  const hasStem = percentage >= 33;
  const hasLeaves = percentage >= 66;
  const isBlooming = percentage >= 100;

  const [showPreviewModal, setShowPreviewModal] = useState(false);

  const previewStages = [
    { label: '0%', percent: 0 },
    { label: '40%', percent: 40 },
    { label: '75%', percent: 75 },
    { label: '100%', percent: 100 },
  ];

  // MiniRose đơn giản hóa giống ảnh bạn cung cấp
  const MiniRose = ({ perc, label }: { perc: number; label: string }) => {
    const hasStemMini = perc >= 33;
    const hasLeavesMini = perc >= 66;
    const isBloomMini = perc >= 100;

    return (
      <div className="flex flex-col items-center">
        <svg viewBox="0 0 60 140" className="w-20 h-32">
          {/* Đất */}
          <line x1="0" y1="130" x2="60" y2="130" stroke="#8B4513" strokeWidth="4" />

          {/* Thân */}
          <line
            x1="30"
            y1="130"
            x2="30"
            y2={hasStemMini ? '40' : '110'}
            stroke="#2E7D32"
            strokeWidth="6"
            className="transition-all duration-800"
          />

          {/* Lá - chỉ 2 lá khi đạt 66% */}
          {hasLeavesMini && (
            <>
              <ellipse cx="20" cy="80" rx="12" ry="8" fill="#4CAF50" />
              <ellipse cx="40" cy="60" rx="12" ry="8" fill="#4CAF50" />
            </>
          )}

          {/* Hoa/Nụ */}
          <g transform={`translate(30, ${hasStemMini ? '30' : '105'})`}>
            {isBloomMini ? (
              // Hoa nở đơn giản với tâm vàng
              <>
                <circle cx="0" cy="0" r="18" fill="#F44336" />
                <circle cx="0" cy="0" r="10" fill="#FFEB3B" />
              </>
            ) : (
              // Nụ nhỏ
              <ellipse cx="0" cy="0" rx="10" ry="16" fill="#D32F2F" />
            )}
          </g>
        </svg>
        <span className="text-xs font-medium text-gray-700 mt-1">{label}</span>
      </div>
    );
  };

  return (
    <>
      {/* Phần chính - nhỏ gọn hơn cho sidebar */}
      <div className={`flex flex-col items-center p-4 bg-white rounded-xl shadow-md border border-rose-100 ${className}`}>
        <div className="relative w-48 h-64">
          <svg viewBox="0 0 100 200" className="w-full h-full">
            <line x1="10" y1="180" x2="90" y2="180" stroke="#8B4513" strokeWidth="5" />

            <line
              x1="50"
              y1="180"
              x2="50"
              y2={hasStem ? '60' : '150'}
              stroke="#2E7D32"
              strokeWidth="8"
              className="transition-all duration-1000"
            />

            {hasLeaves && (
              <>
                <ellipse cx="35" cy="110" rx="15" ry="10" fill="#4CAF50" />
                <ellipse cx="65" cy="90" rx="15" ry="10" fill="#4CAF50" />
              </>
            )}

            <g transform={`translate(50, ${hasStem ? '50' : '150'})`}>
              {isBlooming ? (
                <>
                  <circle cx="0" cy="0" r="22" fill="#F44336" />
                  <circle cx="0" cy="0" r="12" fill="#FFEB3B" />
                </>
              ) : (
                <ellipse cx="0" cy="0" rx="12" ry="20" fill="#D32F2F" />
              )}
            </g>
          </svg>

          {isBlooming && (
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-8 left-8 w-2 h-2 bg-yellow-400 rounded-full animate-ping" />
            </div>
          )}
        </div>

        <div className="mt-3 text-center">
          <div className="text-3xl font-bold text-rose-600">{Math.round(percentage)}%</div>
          <div className="text-sm text-gray-600 mt-1">
            {isBlooming ? 'Nở rộ rực rỡ!' : hasLeaves ? 'Đã có lá xanh' : hasStem ? 'Thân đang lớn' : 'Đang ươm mầm'}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(raised)} / {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(goal)}
          </div>
        </div>

        {showPreview && (
          <button
            onClick={() => setShowPreviewModal(true)}
            className="mt-3 text-xs text-rose-600 hover:underline"
          >
            Xem hành trình nở hoa →
          </button>
        )}
      </div>

      {/* Modal preview - giống ảnh bạn gửi */}
      {showPreviewModal && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
          onClick={() => setShowPreviewModal(false)}
        >
          <div
            className="bg-white rounded-2xl p-6 max-w-3xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-rose-700">
                Hành trình nở hoa của cây hồng
              </h3>
              <button
                onClick={() => setShowPreviewModal(false)}
                className="text-3xl text-gray-500 hover:text-gray-800"
              >
                ×
              </button>
            </div>

            <div className="flex justify-between items-end gap-4 px-4">
              {previewStages.map((stage) => (
                <MiniRose key={stage.percent} perc={stage.percent} label={stage.label} />
              ))}
            </div>

            <p className="text-center mt-8 text-gray-600 italic">
              Mỗi đóng góp là một giọt nước giúp cây hồng thêm rực rỡ! 🌹
            </p>
          </div>
        </div>
      )}
    </>
  );
}