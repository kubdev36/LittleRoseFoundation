"use client";

import React from "react";
import Link from "next/link";
import { X, Sprout, Leaf, Heart, Flower2, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function StoryPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center p-4 md:p-8 font-sans">
      
      {/* Container chính (giống Modal cũ nhưng giờ là main content) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative bg-white rounded-3xl overflow-hidden shadow-2xl w-full max-w-5xl flex flex-col md:flex-row min-h-[600px] border border-[#1A4D2E]/5"
      >
        
        {/* Nút Quay lại (Mobile - Góc trên trái) */}
        <Link 
          href="/campaigns" 
          className="absolute top-4 left-4 z-20 p-2 bg-white/80 backdrop-blur-sm rounded-full md:hidden shadow-sm"
        >
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </Link>

        {/* --- CỘT TRÁI: ẢNH MINH HỌA --- */}
        <div className="w-full md:w-5/12 relative h-64 md:h-auto">
          <img
    src="/images/story.jpg"
    alt="Plant growing"
    className="w-full h-full object-contain grayscale-[10%]"
  />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent md:hidden" />
          
          {/* Decorative text trên ảnh (chỉ hiện desktop) */}
          <div className="absolute bottom-8 left-8 hidden md:block text-white/90 drop-shadow-md">
             <p className="text-sm font-light italic">"Gieo hạt giống thiện lành..."</p>
          </div>
        </div>

        {/* --- CỘT PHẢI: NỘI DUNG --- */}
        <div className="w-full md:w-7/12 p-8 md:p-16 flex flex-col justify-center relative bg-white">
          
          {/* Nút Đóng / Quay lại (Desktop - Góc trên phải) */}
          <Link 
            href="/campaigns" 
            className="absolute top-8 right-8 p-2 hover:bg-gray-100 rounded-full transition-colors hidden md:block group"
            title="Quay lại"
          >
            <X className="w-6 h-6 text-gray-400 group-hover:text-[#1A4D2E] transition-colors" />
          </Link>

          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-[#1A4D2E]/60 font-bold mb-3 flex items-center gap-2">
              <span className="w-8 h-[1px] bg-[#1A4D2E]/40"></span>
              Ý NGHĨA ĐÓA HỒNG NHỎ
            </p>
            <h1 className="text-4xl md:text-5xl font-serif text-[#1A4D2E] leading-tight">
              Hành Trình Của Sự <span className="italic text-emerald-600">Tử Tế</span>
            </h1>
          </motion.div>

          {/* Nội dung chính */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="space-y-6 text-gray-600 text-sm md:text-base leading-relaxed font-light"
          >
            <p>
              Mỗi sự đóng góp từ bạn không chỉ là con số, mà là những tia nắng ấm áp tưới tẩm cho những <strong className="text-emerald-700 font-medium">"nụ hồng"</strong> tri thức còn dang dở.
            </p>
            <p>
              Tại Quỹ Hoa Hồng Nhỏ, chúng tôi tin rằng khi cùng nhau vun đắp, chúng ta sẽ tạo nên một vườn hoa rực rỡ cho tương lai của các em.
            </p>

            {/* Quote nổi bật */}
            <div className="relative pl-6 py-4 border-l-4 border-[#1A4D2E]/20 my-8 bg-[#F9F7F2]/50 rounded-r-xl">
              <p className="italic text-[#1A4D2E] font-medium text-base md:text-lg">
                "Như loài hoa hồng kiên cường vươn lên từ đại ngàn, sự hỗ trợ của cộng đồng chính là nguồn sống để những ước mơ bé nhỏ được nở rộ thành hiện thực."
              </p>
            </div>
          </motion.div>

          {/* Các giai đoạn (Icon steps) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex justify-between items-center mt-8 md:mt-12 px-2 md:px-0"
          >
            {[
                { icon: Sprout, label: "Hạt mầm", delay: 0.7 },
                { icon: Leaf, label: "Nảy chồi", delay: 0.8 },
                { icon: Heart, label: "Kết nụ", delay: 0.9 },
                { icon: Flower2, label: "Nở rộ", delay: 1.0 },
            ].map((step, idx) => (
                <React.Fragment key={idx}>
                    <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: step.delay, type: "spring" }}
                        className="flex flex-col items-center gap-3 group cursor-default"
                    >
                        <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#1A4D2E]/5 flex items-center justify-center text-[#1A4D2E] group-hover:bg-[#1A4D2E] group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-md">
                            <step.icon size={20} strokeWidth={1.5} />
                        </div>
                        <span className="text-[10px] font-bold tracking-widest text-gray-400 group-hover:text-[#1A4D2E] uppercase transition-colors">{step.label}</span>
                    </motion.div>
                    {idx < 3 && <div className="h-[2px] flex-1 bg-gray-100 mx-2 md:mx-4 rounded-full" />}
                </React.Fragment>
            ))}
          </motion.div>

          {/* Nút hành động */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-12 flex justify-center md:justify-start"
          >
            <Link 
              href="/campaigns"
              className="bg-[#1A4D2E] text-white px-10 py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#143d24] transition-all shadow-xl shadow-[#1A4D2E]/20 hover:shadow-[#1A4D2E]/30 hover:-translate-y-1 flex items-center gap-2 group"
            >
              Tôi đã hiểu <ArrowLeft className="w-4 h-4 rotate-180 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

        </div>
      </motion.div>
    </div>
  );
}