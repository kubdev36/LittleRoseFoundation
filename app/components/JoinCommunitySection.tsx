'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Users, Heart } from 'lucide-react';

export default function VolunteerCTASection() {
  return (
    // Sử dụng chiều cao cố định (600-700px) để tạo cảm giác Cinematic, không dùng h-screen tránh bị loãng
    <section className="relative w-full h-[600px] md:h-[700px] flex items-center justify-center overflow-hidden">
      
      {/* --- 1. BACKGROUND IMAGE --- */}
      <div className="absolute inset-0">
        <Image
          src="/images/banner4.jpg" // Đảm bảo ảnh này chất lượng cao, tối màu một chút thì càng đẹp
          alt="Lan tỏa yêu thương cùng Quỹ Bông Hồng Nhỏ"
          fill
          className="object-cover transition-transform duration-[20s] hover:scale-110" // Hiệu ứng zoom cực chậm tạo cảm giác sống động
          priority
        />
        {/* Lớp phủ Gradient xịn hơn: Đậm ở dưới, nhạt dần lên trên */}
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-900/70 to-black/40" />
      </div>

      {/* --- 2. NỘI DUNG CHÍNH --- */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Tag nhỏ nổi bật */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-emerald-300 px-5 py-2 rounded-full text-xs md:text-sm font-bold tracking-widest uppercase mb-8 animate-fade-in-up">
          <Users className="w-4 h-4" />
          Join Our Community
        </div>

        {/* Tiêu đề chính */}
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-8 leading-tight drop-shadow-2xl tracking-tight">
          Không chỉ là tài chính,
          <br />
          hãy góp <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-300">sức mình</span> cùng chúng tôi
        </h2>

        {/* Mô tả */}
        <p className="text-emerald-50 text-lg md:text-xl max-w-3xl mx-auto mb-12 leading-relaxed font-light opacity-90">
          Chúng tôi luôn chào đón những trái tim nhiệt huyết sẵn sàng cống hiến thời gian và công sức. 
          Hãy trở thành tình nguyện viên ngay hôm nay để lan tỏa yêu thương.
        </p>

        {/* Các nút CTA */}
        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center w-full sm:w-auto">
          
          {/* Nút chính - Đăng ký tình nguyện */}
          <Link
            href="/voluteer"
            className="group relative bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-lg px-8 py-4 rounded-full shadow-[0_0_40px_-10px_rgba(16,185,129,0.5)] transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 flex items-center gap-3 w-full sm:w-auto justify-center"
          >
            <Heart className="w-5 h-5 fill-current animate-pulse" />
            <span>Đăng ký Tình nguyện</span>
            <div className="absolute inset-0 rounded-full bg-white/20 group-hover:animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </Link>

          {/* Nút phụ - Tìm hiểu quy trình (Glassmorphism) */}
          <Link
            href="/quyTrinh"
            className="group bg-white/5 backdrop-blur-sm border border-white/30 text-white hover:bg-white hover:text-emerald-900 font-semibold text-lg px-8 py-4 rounded-full transition-all duration-300 flex items-center gap-2 w-full sm:w-auto justify-center"
          >
            Liên hệ chung
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>

        </div>
      </div>

      {/* Trang trí thêm (Optional): Các hạt bụi sáng bay bay nếu muốn cầu kỳ hơn, nhưng giữ simple thì bỏ qua */}
    </section>
  );
}