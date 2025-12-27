'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

const slides = [
  {
    id: 1,
    src: '/images/banner1.jpg', // Ảnh đen trắng bàn tay nắm nhau (adult & child)
    alt: 'Bàn tay nắm chặt - biểu tượng của sự hỗ trợ và yêu thương',
  },
  {
    id: 2,
    src: '/images/banner2.jpg', // Ảnh khác tương tự hoặc màu nếu muốn đa dạng
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

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  // Auto-play mỗi 3 giây
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <section className="relative w-full h-[600px] lg:h-[700px]">
      {/* Slider Images */}
      <div className="relative w-full h-full overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              className="object-cover"
              priority={index === 0}
            />
            {/* Overlay tối mạnh hơn cho ảnh đen trắng */}
            <div className="absolute inset-0 bg-black/60" />
          </div>
        ))}
      </div>

      {/* Nội dung overlay - giống 100% với ảnh bạn gửi */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-20 mt-20">
        {/* Badges nhỏ ở trên */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 mb-6">
          <span className="bg-white/80 backdrop-blur-sm text-[#1a522e] px-5 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
            <span className="w-2 h-2 bg-[#1a522e] rounded-full"></span>
            Hành Trình Nhân Ái
          </span>
          <span className="bg-white/80 backdrop-blur-sm text-gray-700 px-5 py-2 rounded-full text-sm font-semibold">
            Tổ chức uy tín
          </span>
        </div>

        {/* Tiêu đề chính */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
          Gieo mầm yêu
          <br />
          thương
          <br />
          gặt hái nụ cười
        </h1>

        {/* Mô tả */}
        <p className="text-white/90 text-base md:text-lg max-w-2xl mb-8 leading-relaxed">
          Chung tay cùng Quỹ Bông Hồng Nhỏ mang lại tương lai tươi sáng hơn cho trẻ em và cộng đồng khó khăn thông qua giáo dục và y tế vùng.
        </p>

        {/* Nút Quyên góp */}
        <a
          href="/donate"
          className="bg-[#1a522e] hover:bg-[#1a522e]/90 text-white font-bold px-12 py-5 rounded-full text-xl shadow-2xl transition transform hover:scale-105 mb-35"
        >
          Quyên góp ngay hôm nay
        </a>

        {/* Thống kê dưới cùng */}
        <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md rounded-3xl px-10 py-6 shadow-2xl z-30">
          <div className="flex flex-col md:flex-row gap-10 lg:gap-16 text-center">
            <div>
              <p className="text-4xl font-bold text-gray-900">10 Tỷ+</p>
              <p className="text-gray-600 text-sm mt-1">Đã quyên góp & sử dụng minh bạch</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-gray-900">50+</p>
              <p className="text-gray-600 text-sm mt-1">Dự án hoàn thành đúng tiến độ</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-gray-900">10.000+</p>
              <p className="text-gray-600 text-sm mt-1">Cuộc đời được thay đổi tích cực</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}