'use client';

import Image from 'next/image';

export default function VolunteerCTASection() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Ảnh nền full màn hình */}
      <Image
        src="/images/banner4.jpg" // Đặt ảnh chất lượng cao vào public/images/banner4.jpg
        alt="Lan tỏa yêu thương cùng Quỹ Bông Hồng Nhỏ"
        fill
        className="object-cover"
        priority
      />

      {/* Overlay xanh lá đậm để chữ trắng nổi bật */}
      <div className="absolute inset-0 bg-[#1a522e]/70" />

      {/* Nội dung chính */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Tag nhỏ */}
       <span className="inline-block bg-white text-[#1a522e] border border-[#1a522e] px-6 py-2 rounded-full text-sm font-medium mb-8 shadow-sm">
           JOIN OUR COMMUNITY
       </span>

        {/* Tiêu đề chính */}
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
          Không chỉ là tài chính,
          <br />
          hãy góp sức cùng chúng tôi
        </h2>

        {/* Mô tả */}
        <p className="text-white/90 text-lg md:text-xl max-w-3xl mx-auto mb-12 leading-relaxed">
          Chúng tôi luôn chào đón những trái tim nhiệt huyết sẵn sàng cống hiến thời gian và công sức. 
          Hãy trở thành tình nguyện viên ngay hôm nay để lan tỏa yêu thương.
        </p>

        {/* Các nút CTA */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          {/* Nút chính - Đăng ký tình nguyện */}
          <a
            href="/voluteer"
           className="bg-white text-[#1a522e] font-bold text-xl px-10 py-5 rounded-full shadow-xl transition transform hover:scale-105 hover:bg-gray-100"
          >
            Đăng ký tình nguyện
          </a>

          {/* Nút phụ - Tìm hiểu quy trình */}
          <a
            href="/quyTrinh"
            className="border-2 border-white text-white font-semibold text-xl px-10 py-5 rounded-full hover:bg-white hover:text-[#1a522e] transition"
          >
            Tìm hiểu quy trình
          </a>
        </div>
      </div>
    </section>
  );
}