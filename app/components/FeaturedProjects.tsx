'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Share2 } from 'lucide-react';
import Link from 'next/link';

import projects from '@/app/data/projects.json';

export default function FeaturedProjects() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(1);

  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth >= 1024) {
        setVisibleCount(4);
      } else if (window.innerWidth >= 768) {
        setVisibleCount(2);
      } else {
        setVisibleCount(1);
      }
    };

    updateVisibleCount();
    window.addEventListener('resize', updateVisibleCount);
    return () => window.removeEventListener('resize', updateVisibleCount);
  }, []);

  const maxIndex = Math.max(projects.length - visibleCount, 0);

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

  const truncateDescription = (text: string, limit: number) => {
    const words = text.split(' ');
    if (words.length <= limit) return text;
    return words.slice(0, limit).join(' ') + '...';
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Hỗ trợ phát triển giáo dục':
        return 'bg-blue-600';
      case 'Hỗ trợ y tế và sức khoẻ':
        return 'bg-red-600';
      case 'Bác ái xã hội':
        return 'bg-[#1a522e]';
      default:
        return 'bg-gray-600';
    }
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const translateX = -(currentIndex * (100 / visibleCount));

  return (
    <section className="py-20 md:py-24 lg:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16 lg:mb-20 pt-4 md:pt-6 lg:pt-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
            Các dự án <span className="text-green-700">trọng điểm</span>
          </h2>
          <p className="text-gray-600 text-base sm:text-lg max-w-3xl mx-auto px-4 leading-relaxed">
            Mỗi đồng góp dù nhỏ nhất đều tạo nên sự thay đổi to lớn cho cộng đồng. Hãy chọn một dự án bạn quan tâm
          </p>
        </div>

        <div className="relative">
          <button
            onClick={prevSlide}
            className="absolute left-0 lg:-left-12 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 sm:p-3 shadow-xl hover:shadow-2xl transition-all hidden md:flex items-center justify-center border border-gray-200"
            aria-label="Dự án trước"
          >
            <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8 text-gray-800" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 lg:-right-12 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 sm:p-3 shadow-xl hover:shadow-2xl transition-all hidden md:flex items-center justify-center border border-gray-200"
            aria-label="Dự án tiếp theo"
          >
            <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 text-gray-800" />
          </button>

          <div className="overflow-hidden">
            <div
              className="flex gap-0 md:gap-6 lg:gap-8 transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(${translateX}%)` }}
            >
              {projects.map((project) => (
                <div
                  key={project.id}
                  className={`flex-shrink-0 ${
                    visibleCount === 4
                      ? 'w-full lg:w-1/4'
                      : visibleCount === 2
                      ? 'w-full md:w-1/2'
                      : 'w-full'
                  }`}
                >
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 h-full flex flex-col">
                    <div className="relative h-48 sm:h-56 lg:h-64 overflow-hidden group">
                      <Image
                        src={project.imageSrc}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    </div>

                    <div className="p-5 sm:p-6 flex flex-col flex-1">
                      <div className="mb-3">
                        <span
                          className={`text-white text-xs font-bold px-3 py-1.5 rounded-full ${getCategoryColor(
                            project.category
                          )}`}
                        >
                          {project.category}
                        </span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                        {project.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-1">
                        {truncateDescription(project.description, 20)}
                      </p>

                      {/* PHẦN TIẾN ĐỘ - ĐÃ SỬA ĐỂ KHÔNG BỊ DÍNH CHỮ */}
                      <div className="mb-6 space-y-4">
                        {/* Đã góp - to, đậm, nổi bật */}
                        <div className="text-left">
                          <span className="text-xl md:text-2xl font-extrabold text-[#1a522e]">
                            {formatCurrency(project.raised)}
                          </span>
                          <span className="block text-sm font-medium text-gray-700 mt-1">
                            Đã góp
                          </span>
                        </div>

                        {/* Thanh progress */}
                        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                          <div
                            className="bg-[#1a522e] h-full rounded-full transition-all duration-1000"
                            style={{ width: `${progressPercentage(project.raised, project.goal)}%` }}
                          />
                        </div>

                        {/* Dòng dưới: Mục tiêu + Số nhà tài trợ + Phần trăm */}
                        <div className="flex justify-between items-end text-sm">
                          <div>
                            <span className="text-gray-600">Mục tiêu:</span>{' '}
                            <span className="font-semibold text-gray-800">
                              {formatCurrency(project.goal)}
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="text-gray-600">{project.donors} nhà tài trợ</span>
                            <span className="block font-bold text-[#1a522e]">
                              {Math.round(progressPercentage(project.raised, project.goal))}%
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                        <Link
                          href={`/project/${project.id}`}
                          className="flex-1 bg-white border-2 border-gray-300 text-gray-800 py-3 px-4 font-medium rounded-lg hover:border-[#1a522e] hover:text-[#1a522e] transition text-center"
                        >
                          Xem chi tiết
                        </Link>
                        <button
                          className="w-full sm:w-12 h-12 flex items-center justify-center border-2 border-gray-300 rounded-lg hover:border-[#1a522e] transition group"
                          aria-label="Chia sẻ"
                        >
                          <Share2 className="w-5 h-5 text-gray-700 group-hover:text-[#1a522e]" />
                        </button>
                      </div>
                      <Link
                        href="/donate"
                        className="mt-3 w-full bg-[#1a522e] text-white py-3.5 font-bold rounded-lg hover:bg-[#134429] transition flex items-center justify-center gap-2 group"
                      >
                        Quyên góp ngay
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex md:hidden justify-center gap-6 mt-8">
            <button
              onClick={prevSlide}
              className="bg-white rounded-full p-4 shadow-lg border border-gray-200 active:scale-95 transition-transform text-gray-800 hover:text-[#1a522e] hover:border-[#1a522e]"
              aria-label="Dự án trước"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="bg-white rounded-full p-4 shadow-lg border border-gray-200 active:scale-95 transition-transform text-gray-800 hover:text-[#1a522e] hover:border-[#1a522e]"
              aria-label="Dự án tiếp theo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}