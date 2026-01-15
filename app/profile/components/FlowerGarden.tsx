import React from "react";
import { Award, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

// SVG Hoa hồng (Tái sử dụng SVG chuẩn từ trang Rose Gallery để đồng bộ)
const FLOWER_SVG = `<svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="stemGrad" x1="0%" x2="0%" y1="0%" y2="100%"><stop offset="0%" style="stop-color:#34D399;stop-opacity:1"></stop><stop offset="100%" style="stop-color:#065F46;stop-opacity:1"></stop></linearGradient><linearGradient id="leafGrad" x1="0%" x2="100%" y1="0%" y2="100%"><stop offset="0%" style="stop-color:#6EE7B7;stop-opacity:1"></stop><stop offset="100%" style="stop-color:#047857;stop-opacity:1"></stop></linearGradient><radialGradient id="budGrad" cx="50%" cy="50%" r="50%"><stop offset="0%" style="stop-color:#FDA4AF;stop-opacity:1"></stop><stop offset="100%" style="stop-color:#E11D48;stop-opacity:1"></stop></radialGradient></defs><path d="M50 90 Q48 70, 50 50" fill="none" stroke="url(#stemGrad)" stroke-linecap="round" stroke-width="6"></path><path d="M50 75 Q70 65, 85 75 Q70 85, 50 75" fill="url(#leafGrad)"></path><path d="M50 80 Q30 70, 15 80 Q30 90, 50 80" fill="url(#leafGrad)"></path><path d="M50 50 C35 30, 65 30, 50 50" fill="url(#budGrad)" stroke="#BE123C" stroke-width="1.5"></path><path d="M50 50 C42 40, 58 40, 50 50" fill="#9F1239" opacity="0.6"></path></svg>`;

export default function FlowerGarden() {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden relative group">
      
      {/* Header Card */}
      <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white relative z-20">
         <h3 className="font-bold text-[#1A4D2E] flex items-center gap-2 text-lg">
           <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span> Vườn hồng của tôi
         </h3>
         <span className="text-[10px] font-bold bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full border border-emerald-200 uppercase tracking-wide">
            Cấp 4: Hoa nở rộ
         </span>
      </div>
      
      {/* Main Content Area */}
      <div className="p-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-gradient-to-b from-[#f0fdf4] via-white to-white relative">
         
         {/* Left Column: Flower Visualization */}
         <div className="md:col-span-5 flex justify-center relative py-4">
            {/* Vòng tròn sáng nền */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-300/20 rounded-full blur-3xl animate-pulse-slow"></div>
            
            <div className="w-56 h-56 relative z-10 transition-transform duration-700 hover:scale-105">
               <div 
                 dangerouslySetInnerHTML={{ __html: FLOWER_SVG }} 
                 className="w-full h-full drop-shadow-2xl filter saturate-110" 
               />
            </div>

            {/* Nút điều hướng nhỏ 2 bên (Optional decoration) */}
            <button className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center text-gray-400 hover:text-emerald-600 transition md:hidden">
                <ChevronRight size={16} className="rotate-180"/>
            </button>
            <button className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center text-gray-400 hover:text-emerald-600 transition md:hidden">
                <ChevronRight size={16} />
            </button>
         </div>

         {/* Right Column: Info & Progress */}
         <div className="md:col-span-7 space-y-7 relative z-10">
            <div>
               <h2 className="text-3xl text-[#1A4D2E] mb-3 font-medium">
                  Hoa hồng đang <span className="italic text-emerald-600 font-bold">nở rộ!</span>
               </h2>
               <p className="text-gray-500 text-sm leading-relaxed max-w-md">
                 Bạn là nguồn cảm hứng tuyệt vời. Chỉ còn một chút nữa để đạt danh hiệu cao quý nhất <strong className="text-emerald-700">Đại sứ Nhân ái</strong>.
               </p>
            </div>

            {/* Progress Bar Section */}
            <div>
               <div className="flex justify-between text-xs font-bold uppercase mb-2 tracking-wide">
                  <span className="text-gray-400">Tiến trình Đại sứ</span>
                  <span className="text-emerald-600">82%</span>
               </div>
               <div className="w-full bg-gray-100 h-3.5 rounded-full overflow-hidden shadow-inner border border-gray-100 relative">
                  <motion.div 
                    initial={{ width: 0 }} 
                    animate={{ width: "82%" }} 
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 rounded-full relative"
                  >
                     <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                     {/* Hiệu ứng hạt lấp lánh (nếu muốn) */}
                     <div className="absolute right-0 top-0 bottom-0 w-2 bg-white/40 blur-[2px]"></div>
                  </motion.div>
               </div>
               <div className="flex justify-between text-[10px] text-gray-400 mt-2 font-medium">
                  <span>Hiện tại: 12.500.000đ</span>
                  <span>Mục tiêu: 15.000.000đ</span>
               </div>
            </div>

            {/* Next Reward Card */}
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-emerald-100 flex gap-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer group/card">
               <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 shrink-0 group-hover/card:bg-emerald-600 group-hover/card:text-white transition-colors duration-300">
                  <Award size={24} />
               </div>
               <div>
                  <h4 className="text-xs font-bold text-emerald-800 uppercase mb-1 flex items-center gap-2">
                      Quyền lợi sắp đạt 
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"></span>
                  </h4>
                  <p className="text-xs text-gray-500 leading-snug group-hover/card:text-gray-700 transition-colors">
                      Nhận vé mời Gala cuối năm, Chứng nhận PDF cao cấp & Quà tri ân đặc biệt.
                  </p>
               </div>
            </div>
            
            <button className="w-full border border-gray-200 text-gray-500 text-xs font-bold py-3.5 rounded-xl hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 transition-all duration-300 active:scale-[0.98]">
               Xem chi tiết quyền lợi thành viên
            </button>
         </div>
      </div>
    </div>
  );
}