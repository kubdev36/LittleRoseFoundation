'use client';

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { Heart, School, Users, ShieldCheck } from 'lucide-react';

// --- CONFIGURATION ---
const SLIDE_DURATION = 6000; // 6 seconds

const slides = [
  {
    id: 1,
    src: '/images/banner1.jpg',
    alt: 'Bàn tay nắm chặt - biểu tượng của sự hỗ trợ và yêu thương',
  },
  {
    id: 2,
    src: '/images/banner2.jpg',
    alt: 'Hành trình nhân ái cùng trẻ em khó khăn',
  },
  {
    id: 3,
    src: '/images/banner3.jpg',
    alt: 'Gieo mầm yêu thương cho tương lai',
  },
];

export default function HeroBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // --- SLIDER LOGIC ---
  const startProgress = () => {
    setProgress(0);
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          nextSlide();
          return 0;
        }
        return prev + 100 / (SLIDE_DURATION / 100);
      });
    }, 100);
  };

  const nextSlide = () => {
    setCurrentIndex(prev => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    startProgress();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [currentIndex]);

  return (
    <section 
      className="relative w-full min-h-[600px] lg:h-[700px] flex flex-col justify-center font-sans z-20"
    >
      
      {/* --- CSS ANIMATION & PROGRESS BAR --- */}
      <style jsx>{`
        @keyframes ripple-out {
          0% { transform: scale(1); opacity: 0.7; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        .animate-ripple {
          animation: ripple-out 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        .delay-1000 { animation-delay: 1s; }
        .progress-bar {
          transition: width 0.1s linear;
        }
      `}</style>

      {/* --- PROGRESS BAR --- */}
      <div className="absolute top-0 left-0 w-full h-2 bg-transparent z-30">
        <div 
          className="h-full bg-white/50 backdrop-blur-sm progress-bar" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* --- SLIDER BACKGROUND WRAPPER --- */}
      <div className="absolute inset-0 w-full h-full overflow-hidden rounded-b-[0px]">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
        ))}
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 md:px-6 w-full h-full pb-24">
        
        {/* Badges */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6 animate-fade-in-up">
          <span className="bg-[#143d23] backdrop-blur-md border border-white/20 text-white px-4 py-1.5 text-xs font-bold flex items-center justify-center gap-2 shadow-lg uppercase tracking-wider">
            <span className="w-1.5 h-1.5 bg-white animate-pulse"></span>
            Hành Trình Nhân Ái
          </span>
          <span className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-1.5 text-xs font-bold shadow-lg flex items-center gap-2 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-green-300" />
            Uy tín 100%
          </span>
        </div>

        {/* Tiêu đề */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight tracking-tight drop-shadow-2xl max-w-5xl">
          Gieo mầm <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4ade80] to-green-200">yêu thương</span>,
          <br />
          gặt hái nụ <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-200 to-[#4ade80]">cười</span>
        </h1>

        <p className="text-green-50 text-base md:text-lg max-w-2xl mb-10 leading-relaxed font-light drop-shadow-md opacity-95">
          Chung tay cùng Quỹ Bông Hồng Nhỏ mang lại tương lai tươi sáng hơn cho
          trẻ em khó khăn thông qua giáo dục và y tế.
        </p>

        {/* --- NÚT KÊU GỌI HÀNH ĐỘNG --- */}
        <div className="relative inline-flex items-center justify-center group">
          <span className="absolute inset-0 rounded-full bg-[#143d23] animate-ripple"></span>
          <span className="absolute inset-0 rounded-full bg-[#143d23] animate-ripple delay-1000"></span>
          
          <a
             href="/quyen-gop"
                className="relative z-10 flex items-center justify-center bg-[#143d23] text-white font-extrabold text-xl px-12 py-5 rounded-full shadow-[0_6px_15px_rgba(0,0,0,0.3)] hover:bg-[#0f2e1b] hover:shadow-[0_8px_20px_rgba(0,0,0,0.4)] transition-all duration-300 transform hover:-translate-y-0.5"
             >
              Quyên góp ngay
</a>
        </div>
      </div>

      {/* --- STATS BLOCK --- */}
      <div className="absolute left-1/2 -translate-x-1/2 -bottom-16 md:-bottom-20 w-[95%] max-w-5xl z-50 ">
        <div className="bg-white shadow-[0_20px_50px_rgba(0,0,0,0.2)] py-8 px-8 border border-gray-100 relative rounded-2xl">
            
            <div className="absolute top-0 left-0 w-full h-1.5 bg-[#143d23] rounded-2xl"></div>
            
            <div className="flex flex-row justify-between items-center divide-x divide-gray-200">
            {/* Stat 1 */}
            <div className="flex-1 flex flex-col items-center text-center px-2">
              <div className="mb-3 p-3 bg-[#143d23]/5 text-[#143d23]">
                <Heart className="w-8 h-8 fill-current" />
              </div>
              <p className="text-3xl md:text-4xl font-black text-[#143d23] mb-1 leading-none">10 Tỷ+</p>
              <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mt-2">Minh bạch</p>
            </div>
            {/* Stat 2 */}
            <div className="flex-1 flex flex-col items-center text-center px-2">
              <div className="mb-3 p-3 bg-[#143d23]/5 text-[#143d23]">
                <School className="w-8 h-8" />
              </div>
              <p className="text-3xl md:text-4xl font-black text-[#143d23] mb-1 leading-none">50+</p>
              <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mt-2">Dự án</p>
            </div>
            {/* Stat 3 */}
            <div className="flex-1 flex flex-col items-center text-center px-2">
               <div className="mb-3 p-3 bg-[#143d23]/5 text-[#143d23]">
                <Users className="w-8 h-8" />
              </div>
              <p className="text-3xl md:text-4xl font-black text-[#143d23] mb-1 leading-none">10k+</p>
              <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mt-2">Thay đổi</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
