'use client';

import React from 'react';
import { FileText, ShieldCheck, Download } from 'lucide-react';
import ExternalLinkIcon from './ExternalLinkIcon';

const CharityTransparencySection = () => {
  return (
    // Background màu #c9d6ce (Xám xanh lá nhạt)
    <section className="py-5 md:py-5 font-sans text-slate-800 overflow-hidden relative" style={{ backgroundColor: '#c9d6ce' }}>
      
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
         <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/20 rounded-full mix-blend-overlay filter blur-[100px] animate-blob"></div>
         <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-100/20 rounded-full mix-blend-overlay filter blur-[100px] animate-blob animation-delay-2000"></div>
      </div>

      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center relative z-10">
        
        {/* --- CỘT TRÁI: NỘI DUNG (Giữ nguyên) --- */}
        <div className="space-y-6 animate-fade-in-up">
          <div className="inline-flex items-center px-4 py-1.5 bg-white border border-green-100 text-green-800 font-bold rounded-full text-xs uppercase tracking-wider shadow-sm">
            <span className="w-2 h-2 rounded-full bg-green-600 mr-2 animate-pulse"></span>
            Cam kết Minh bạch 100%
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold leading-tight tracking-tight text-green-950">
            Niềm tin của bạn là <br />
            <span className="text-green-800 drop-shadow-sm">
              tài sản lớn nhất
            </span> <br />
            của chúng tôi
          </h2>

          <p className="text-green-900/80 text-lg leading-relaxed max-w-lg font-medium">
            Quỹ Bông Hồng Nhỏ áp dụng mô hình "100% Impact". Mọi chi phí vận hành được tài trợ riêng, đảm bảo <span className="font-bold text-green-900 border-b-2 border-green-500/30">100% tiền quyên góp</span> đến tay người cần giúp đỡ.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="group flex items-start space-x-4 p-5 rounded-2xl bg-white/90 backdrop-blur-sm border border-white/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="p-3 bg-blue-50 rounded-xl group-hover:bg-blue-100 transition-colors shrink-0">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg group-hover:text-blue-600 transition-colors">Sao kê 24/7</h3>
                <p className="text-sm text-gray-600 mt-1 leading-snug">
                  Công khai biến động số dư theo thời gian thực.
                </p>
              </div>
            </div>

            <div className="group flex items-start space-x-4 p-5 rounded-2xl bg-white/90 backdrop-blur-sm border border-white/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="p-3 bg-green-50 rounded-xl group-hover:bg-green-100 transition-colors shrink-0">
                <ShieldCheck className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg group-hover:text-green-600 transition-colors">Kiểm toán độc lập</h3>
                <p className="text-sm text-gray-600 mt-1 leading-snug">
                  Báo cáo tài chính được kiểm tra bởi Big4.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button className="px-8 py-3.5 bg-green-800 text-white font-bold rounded-xl hover:bg-green-700 hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 shadow-md">
              <Download className="w-5 h-5" />
              Tải báo cáo 2024
            </button>
            <button className="px-8 py-3.5 bg-white border border-white/50 text-green-900 font-bold rounded-xl hover:bg-green-50 transition-all flex items-center justify-center gap-2 shadow-sm">
              Xem sao kê online
              <ExternalLinkIcon className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* --- CỘT PHẢI: CARD BIỂU ĐỒ (ĐÃ THU NHỎ & TINH CHỈNH) --- */}
        <div className="relative flex justify-center lg:justify-end">
            {/* 1. Kích thước Card: max-w-sm (nhỏ gọn hơn md) */}
            {/* 2. Padding: p-6 md:p-8 (giảm bớt khoảng trống thừa) */}
            <div className="bg-white rounded-[2rem] shadow-xl p-6 md:p-8 border border-white/50 relative z-10 w-full max-w-sm mx-auto">
              
              <h3 className="text-lg font-bold mb-6 text-center text-gray-900 border-b border-gray-100 pb-3">
                Cơ cấu sử dụng vốn
              </h3>

              <div className="flex flex-col items-center">
                
                {/* 3. Kích thước Biểu đồ: w-44/48 (nhỏ nhắn xinh xắn) */}
                <div className="relative w-44 h-44 md:w-48 md:h-48 rounded-full mb-6 shadow-inner"
                    style={{
                      background: `conic-gradient(
                        #16a34a 0deg 288deg,   /* Green */
                        #60a5fa 288deg 342deg, /* Blue */
                        #fbbf24 342deg 360deg  /* Amber */
                      )`
                    }}
                >
                  {/* Lớp trắng bên trong */}
                  <div className="absolute inset-6 bg-white rounded-full flex flex-col items-center justify-center shadow-lg">
                    <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-0.5">Trực tiếp</span>
                    
                    {/* 4. Cỡ chữ số: text-4xl (vừa vặn với vòng tròn nhỏ) */}
                    <span className="text-3xl md:text-4xl font-black text-gray-900 tracking-tighter">100%</span>
                    
                    <div className="px-2 py-0.5 bg-green-50 text-green-700 text-[9px] font-bold rounded-full mt-1 uppercase tracking-wide border border-green-100">
                      Cam kết
                    </div>
                  </div>
                </div>

                {/* Legend (Gọn hơn) */}
                <div className="w-full space-y-2">
                  <div className="flex justify-between items-center p-2 rounded hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-2.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-green-600 shadow-sm"></span>
                      <span className="font-medium text-gray-600 text-sm">Giáo dục & Xây dựng</span>
                    </div>
                    <span className="font-bold text-green-600 text-base">80%</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-2 rounded hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-2.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-400 shadow-sm"></span>
                      <span className="font-medium text-gray-600 text-sm">Y tế & Dinh dưỡng</span>
                    </div>
                    <span className="font-bold text-blue-400 text-base">15%</span>
                  </div>

                  <div className="flex justify-between items-center p-2 rounded hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-2.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-sm"></span>
                      <span className="font-medium text-gray-600 text-sm">Cứu hộ khẩn cấp</span>
                    </div>
                    <span className="font-bold text-amber-400 text-base">5%</span>
                  </div>
                </div>

                <p className="text-[10px] text-gray-400 mt-4 text-center italic border-t border-gray-100 pt-3 w-full">
                  * Vận hành được tài trợ 100% riêng biệt.
                </p>
              </div>
            </div>
        </div>

      </div>
    </section>
  );
};

export default CharityTransparencySection;