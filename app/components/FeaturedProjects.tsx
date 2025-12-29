'use client';

import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Users } from 'lucide-react'; // Đã bỏ Heart, Share2 vì nút mới không dùng
import Link from 'next/link';
import projects from '@/app/data/projects.json';

export default function FeaturedProjects() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(4);
  const [isMounted, setIsMounted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const handleResize = () => {
      const width = window.innerWidth;
      let newCount = 4;
      if (width < 640) newCount = 1;      
      else if (width < 1024) newCount = 2; 
      else if (width < 1280) newCount = 3; 
      else newCount = 3;                  

      setVisibleCount(newCount);
      setCurrentIndex((prev) => {
        const max = Math.max(projects.length - newCount, 0);
        return prev > max ? max : prev;
      });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(projects.length - visibleCount, 0);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  useEffect(() => {
    if (!isMounted || isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 4000); 
    return () => clearInterval(interval);
  }, [nextSlide, isMounted, isPaused]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const progressPercentage = (raised: number, goal: number) => {
    return Math.min((raised / goal) * 100, 100);
  };

  if (!isMounted) return <div className="h-[500px] w-full bg-transparent"></div>;

  return (
    <section className="py-14 md:py-24 relative overflow-hidden font-sans mt-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
            Các dự án <span className="text-[#001207]">trọng điểm</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
            Mỗi đóng góp của bạn là một viên gạch xây dựng tương lai tươi sáng cho những mảnh đời khó khăn.
          </p>
        </div>

        {/* CAROUSEL CONTAINER */}
        <div 
          className="relative group"
          onMouseEnter={() => setIsPaused(true)} 
          onMouseLeave={() => setIsPaused(false)}
        >
          
          {/* NÚT ĐIỀU HƯỚNG DESKTOP */}
          {projects.length > visibleCount && (
            <>
              <button
                onClick={prevSlide}
                className="hidden lg:flex absolute -left-4 xl:-left-12 top-1/2 -translate-y-1/2 z-30 
                bg-white hover:bg-[#1a522e]/10 rounded-full p-3 shadow-[0_4px_20px_rgba(0,0,0,0.1)] border border-gray-100 
                text-gray-700 hover:text-[#001207] transition-all duration-300 hover:scale-110 opacity-0 group-hover:opacity-100"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={nextSlide}
                className="hidden lg:flex absolute -right-4 xl:-right-12 top-1/2 -translate-y-1/2 z-30 
                bg-white hover:bg-[#001207]/10 rounded-full p-3 shadow-[0_4px_20px_rgba(0,0,0,0.1)] border border-gray-100 
                text-gray-700 hover:text-[#001207] transition-all duration-300 hover:scale-110 opacity-0 group-hover:opacity-100"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* SLIDER TRACK */}
          <div className="overflow-hidden py-10 -my-10 -mx-4 px-4">
            <div
              className="flex transition-transform duration-700 ease-in-out will-change-transform"
              style={{ transform: `translateX(-${currentIndex * (100 / visibleCount)}%)` }}
            >
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="flex-shrink-0 px-3 md:px-4"
                  style={{ width: `${100 / visibleCount}%` }}
                >
                  {/* CARD DESIGN */}
                  <div className="bg-white rounded-2xl shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(26,82,46,0.1)] 
                  transition-all duration-300 h-full flex flex-col overflow-hidden border border-gray-100 group/card hover:-translate-y-1">
                    
                    {/* Hình ảnh & Badge */}
                    <div className="relative h-48 sm:h-56 w-full overflow-hidden">
                      <Image
                        src={project.imageSrc}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover/card:scale-110"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md 
                        text-xs font-bold px-3 py-1.5 rounded-full shadow-sm text-[#1a522e] flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#1a522e] animate-pulse"></span>
                        Đang vận động
                      </div>
                    </div>

                    {/* Nội dung Card */}
                    <div className="p-5 flex flex-col flex-1">
                      
                      <Link href={`/du-an/${project.id}`} className="group-hover/card:text-[#1a522e] transition-colors duration-300">
                        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 leading-snug min-h-[3.5rem]">
                          {project.title}
                        </h3>
                      </Link>
                      
                      {/* Progress Bar Section */}
                      <div className="mt-auto pt-4">
                          <div className="flex justify-between text-sm font-semibold mb-2">
                            <span className="text-[#1a522e]">{formatCurrency(project.raised)}</span>
                            <span className="text-gray-400 font-normal text-xs mt-0.5">Mục tiêu: {formatCurrency(project.goal)}</span>
                          </div>

                          <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden mb-3">
                            <div
                              className="bg-[#1a522e] h-full rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
                              style={{ width: `${progressPercentage(project.raised, project.goal)}%` }}
                            >
                                <div className="absolute top-0 left-0 bottom-0 right-0 bg-gradient-to-r from-transparent via-white/20 to-transparent w-full -translate-x-full animate-shimmer"></div>
                            </div>
                          </div>
                          
                          <div className="flex justify-between items-center text-xs text-gray-500 mb-5">
                              <span className="flex items-center gap-1.5">
                                <Users className="w-3.5 h-3.5" />
                                {project.donors} lượt ủng hộ
                              </span>
                              <span className="font-medium text-[#1a522e]">
                                {Math.round(progressPercentage(project.raised, project.goal))}%
                              </span>
                          </div>

                          {/* Action Buttons - ĐÃ CẬP NHẬT THEO YÊU CẦU */}
                          <div className="mt-auto">
                            <Link
                              href={`/du-an/${project.id}`}
                              className="w-full bg-[#1a522e] text-white py-3 font-bold text-base flex items-center justify-center gap-2 hover:bg-[#1a522e]/100 transition rounded-lg group"
                            >
                              Quyên góp ngay
                              <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition" />
                            </Link>
                          </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* MOBILE & TABLET CONTROLS */}
          <div className="flex lg:hidden flex-col items-center mt-6 gap-4">
            <div className="flex items-center justify-center gap-4 w-full px-4">
              {/* Nút Prev Mobile */}
              <button
                onClick={prevSlide}
                className="p-2 bg-white rounded-full shadow-sm border border-gray-100 text-gray-600 active:bg-[#1a522e]/10 active:text-[#1a522e] transition-colors"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              {/* Pagination Dots */}
              <div className="flex gap-2">
                {Array.from({ length: Math.ceil(projects.length / visibleCount) }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx * visibleCount)}
                    className={`transition-all duration-300 rounded-full h-1.5 ${
                      Math.floor(currentIndex / visibleCount) === idx 
                        ? 'w-6 bg-[#1a522e]' 
                        : 'w-1.5 bg-gray-200'
                    }`}
                    aria-label={`Go to page ${idx + 1}`}
                  />
                ))}
              </div>
              {/* Nút Next Mobile */}
              <button
                onClick={nextSlide}
                className="p-2 bg-white rounded-full shadow-sm border border-gray-100 text-gray-600 active:bg-[#1a522e]/10 active:text-[#1a522e] transition-colors"
                aria-label="Next slide"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}