'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Share2 } from 'lucide-react';
import Link from 'next/link';

import projects from '@/app/data/projects.json';

export default function FeaturedProjects() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Số card hiển thị theo breakpoint
  const getVisibleCount = () => {
    if (typeof window === 'undefined') return 4;
    if (window.innerWidth >= 1024) return 4; // lg
    if (window.innerWidth >= 768) return 2;  // md
    return 1; // mobile
  };

  const visibleCount = getVisibleCount();
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

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  // Tính phần trăm dịch chuyển chính xác theo số card hiển thị
  const translateX = -(currentIndex * (100 / visibleCount));

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 mt-10">
            Các dự án trọng điểm
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto mb-6">
            Mỗi đồng góp dù nhỏ nhất đều tạo nên sự thay đổi to lớn cho cộng đồng. Hãy chọn một dự án bạn quan tâm
          </p>
        </div>

        <div className="relative">
          {/* Nút Prev */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-xl hover:shadow-2xl transition-all hidden md:flex items-center justify-center border border-gray-100"
            aria-label="Dự án trước"
          >
            <ChevronLeft className="w-8 h-8 text-gray-800" />
          </button>

          {/* Nút Next */}
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-xl hover:shadow-2xl transition-all hidden md:flex items-center justify-center border border-gray-100"
            aria-label="Dự án tiếp"
          >
            <ChevronRight className="w-8 h-8 text-gray-800" />
          </button>

          <div className="overflow-hidden">
            <div
              className="flex gap-8 transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(${translateX}%)` }}
            >
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="flex-shrink-0 w-full md:w-1/2 lg:w-1/4"
                >
                  <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
                    {/* Hình ảnh */}
                    <div className="relative h-60 overflow-hidden group">
                      <Image
                        src={project.imageSrc}
                        alt={project.title}
                        fill
                        className="object-cover transition-all duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/10" />
                    </div>

                    {/* Nội dung */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        {project.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed mb-5 line-clamp-5">
                        {truncateDescription(project.description, 20)}
                      </p>

                      {/* Thanh tiến độ */}
                      <div className="mb-5">
                        <div className="flex justify-between text-sm text-gray-600 mb-3">
                          <span className="font-bold text-red-600">
                            Đã góp: {formatCurrency(project.raised)}
                          </span>
                          <span>Mục tiêu: {formatCurrency(project.goal)}</span>
                        </div>

                        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-red-500 to-red-600 h-full rounded-full transition-all duration-1000"
                            style={{
                              width: `${progressPercentage(project.raised, project.goal)}%`,
                            }}
                          />
                        </div>

                        <div className="flex justify-between text-sm text-gray-500 mt-3">
                          <span>{project.donors} nhà tài trợ</span>
                          <span>{Math.round(progressPercentage(project.raised, project.goal))}% hoàn thành</span>
                        </div>
                      </div>

                      {/* Nút hành động */}
                      <div className="flex items-center gap-3">
                        <Link
                          href={`/du-an/${project.id}`}
                          className="flex-1 bg-black text-white py-3 font-bold text-base flex items-center justify-center gap-2 hover:bg-gray-900 transition rounded-lg group"
                        >
                          Quyên góp ngay
                          <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition" />
                        </Link>

                        <button
                          className="w-12 h-12 flex items-center justify-center border-2 border-gray-100 hover:border-black transition rounded-lg"
                          aria-label="Chia sẻ"
                        >
                          <Share2 className="w-5 h-5 text-black" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}