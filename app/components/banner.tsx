'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
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
      setProgress((prev) => {
        if (prev >= 100) {
          nextSlide();
          return 0;
        }
        return prev + 100 / (SLIDE_DURATION / 100);
      });
    }, 100);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    startProgress();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [currentIndex]);

  return (
    <section className="relative w-full min-h-[600px] lg:min-h-[700px] flex flex-col justify-center">
      {/* Custom CSS Animations */}
      <style jsx>{`
        @keyframes ripple-out {
          0% {
            transform: scale(1);
            opacity: 0.7;
          }
          100% {
            transform: scale(1.6);
            opacity: 0;
          }
        }
        .animate-ripple {
          animation: ripple-out 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        .delay-1000 {
          animation-delay: 1s;
        }
        .progress-bar {
          transition: width 0.1s linear;
        }
      `}</style>

      {/* Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-1.5 md:h-2 bg-transparent z-30">
        <div
          className="h-full bg-white/60 backdrop-blur-sm progress-bar"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Background Slider */}
      <div className="absolute inset-0 overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-1500 ease-in-out ${
              index === currentIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
            }`}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              sizes="100vw"
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 py-12">
        {/* Badges */}
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-8 md:mb-10">
          <span className="inline-flex items-center gap-2 bg-[#143d23] backdrop-blur-md border border-white/20 text-white px-5 py-2 md:px-6 md:py-3 text-xs md:text-sm font-bold uppercase tracking-widest shadow-lg">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
            Hành Trình Nhân Ái
          </span>
          <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-5 py-2 md:px-6 md:py-3 text-xs md:text-sm font-bold uppercase tracking-widest shadow-lg">
            <ShieldCheck className="w-4 h-4 md:w-5 md:h-5 text-green-300" />
            Uy tín 100%
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 md:mb-8 leading-tight tracking-tight drop-shadow-2xl max-w-5xl px-4">
          Gieo mầm{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4ade80] to-green-200">
            yêu thương
          </span>
          ,
          <br className="hidden sm:block" />
          gặt hái nụ{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-200 to-[#4ade80]">
            cười
          </span>
        </h1>

        {/* Description */}
        <p className="text-base sm:text-lg md:text-xl text-green-50 max-w-3xl mb-10 md:mb-12 leading-relaxed font-light drop-shadow-md opacity-95 px-4">
          Chung tay cùng Quỹ Bông Hồng Nhỏ mang lại tương lai tươi sáng hơn cho trẻ em khó khăn thông qua giáo dục và y tế.
        </p>

        {/* CTA Button with Ripple */}
        <div className="relative inline-flex items-center justify-center group">
          <span className="absolute inset-0 rounded-full bg-[#143d23] animate-ripple" />
          <span className="absolute inset-0 rounded-full bg-[#143d23] animate-ripple delay-1000" />

          <Link
            href="/quyen-gop"
            className="relative z-10 flex items-center justify-center bg-[#143d23] text-white font-extrabold text-lg sm:text-xl px-10 sm:px-12 py-4 sm:py-5 rounded-full shadow-2xl hover:bg-[#0f2e1b] hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1"
          >
            Quyên góp ngay
          </Link>
        </div>
      </div>

      {/* Stats Block - Responsive & không bị cắt */}
      <div className="absolute left-1/2 -translate-x-1/2 -bottom-12 sm:-bottom-14 md:-bottom-16 lg:-bottom-20 w-[92%] sm:w-[85%] max-w-6xl z-50 px-4">
        <div className="bg-white shadow-2xl py-6 sm:py-8 px-6 sm:px-8 rounded-2xl lg:rounded-3xl border border-gray-100 relative">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-[#143d23] rounded-t-2xl lg:rounded-t-3xl" />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            {/* Stat 1 */}
            <div className="flex flex-col items-center text-center">
              <div className="mb-3 p-3 bg-[#143d23]/5 rounded-full">
                <Heart className="w-7 h-7 sm:w-8 sm:h-8 text-[#143d23] fill-current" />
              </div>
              <p className="text-2xl sm:text-3xl md:text-4xl font-black text-[#143d23] leading-none">10 Tỷ+</p>
              <p className="text-gray-500 text-xs sm:text-sm font-bold uppercase tracking-widest mt-2">Minh bạch</p>
            </div>

            {/* Stat 2 */}
            <div className="flex flex-col items-center text-center">
              <div className="mb-3 p-3 bg-[#143d23]/5 rounded-full">
                <School className="w-7 h-7 sm:w-8 sm:h-8 text-[#143d23]" />
              </div>
              <p className="text-2xl sm:text-3xl md:text-4xl font-black text-[#143d23] leading-none">50+</p>
              <p className="text-gray-500 text-xs sm:text-sm font-bold uppercase tracking-widest mt-2">Dự án</p>
            </div>

            {/* Stat 3 */}
            <div className="flex flex-col items-center text-center">
              <div className="mb-3 p-3 bg-[#143d23]/5 rounded-full">
                <Users className="w-7 h-7 sm:w-8 sm:h-8 text-[#143d23]" />
              </div>
              <p className="text-2xl sm:text-3xl md:text-4xl font-black text-[#143d23] leading-none">10k+</p>
              <p className="text-gray-500 text-xs sm:text-sm font-bold uppercase tracking-widest mt-2">Thay đổi</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}