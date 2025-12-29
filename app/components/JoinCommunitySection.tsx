'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Users, Heart } from 'lucide-react';

export default function VolunteerCTASection() {
  return (
    <section className="relative w-full h-[600px] md:h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/banner4.jpg"
          alt="Lan tỏa yêu thương cùng Quỹ Bông Hồng Nhỏ"
          fill
          sizes="100vw"
          className="object-cover transition-transform duration-[30s] hover:scale-110"
          priority
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-900/70 to-black/40" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Tag Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-emerald-300 px-4 py-2 md:px-5 md:py-3 rounded-full text-xs md:text-sm font-bold tracking-widest uppercase mb-8 shadow-lg">
          <Users className="w-4 h-4 md:w-5 md:h-5" />
          Join Our Community
        </div>

        {/* Title */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white mb-6 md:mb-8 leading-tight tracking-tight drop-shadow-2xl px-4">
          Không chỉ là tài chính,
          <br className="hidden sm:block" />
          hãy góp{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-300">
            sức mình
          </span>{' '}
          cùng chúng tôi
        </h2>

        {/* Description */}
        <p className="text-emerald-50 text-base sm:text-lg md:text-xl max-w-3xl mx-auto mb-10 md:mb-12 leading-relaxed font-light opacity-90 px-4">
          Chúng tôi luôn chào đón những trái tim nhiệt huyết sẵn sàng cống hiến thời gian và công sức. 
          Hãy trở thành tình nguyện viên ngay hôm nay để lan tỏa yêu thương.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 md:gap-5 justify-center items-center">
          {/* Primary Button */}
          <Link
            href="/voluteer"
            className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-base sm:text-lg md:text-xl px-8 py-4 md:px-10 md:py-5 rounded-full shadow-2xl hover:shadow-[0_0_50px_-5px_rgba(16,185,129,0.6)] transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
          >
            <Heart className="w-5 h-5 md:w-6 md:h-6 fill-current animate-pulse" />
            <span>Đăng ký Tình nguyện</span>
            <div className="absolute inset-0 rounded-full bg-white/20 group-hover:animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </Link>

          {/* Secondary Button */}
          <Link
            href="/quyTrinh"
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/5 backdrop-blur-sm border border-white/30 text-white hover:bg-white hover:text-emerald-900 font-semibold text-base sm:text-lg md:text-xl px-8 py-4 md:px-10 md:py-5 rounded-full transition-all duration-300"
          >
            Liên hệ chung
            <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-2 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </section>
  );
}