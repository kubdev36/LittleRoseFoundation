'use client';

import Image from 'next/image';
import { Quote, Star } from 'lucide-react';

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Đặng Trung Hải',
      role: 'Tình nguyện viên 3 năm',
      avatar: '/images/avatar1.jpg', // Bạn nhớ thay ảnh thật hoặc dùng ảnh placeholder online để test
      content:
        'Tham gia tình nguyện cùng Quỹ Bông Hồng Nhỏ là trải nghiệm ý nghĩa nhất của tôi. Hệ thống minh bạch giúp tôi tự tin rằng công sức nhỏ bé của mình đang được đặt đúng chỗ và tạo ra thay đổi thực sự.',
    },
    {
      name: 'Lê Nguyễn Thái Dũng',
      role: 'Nhà tài trợ thường niên',
      avatar: '/images/avatar2.jpg',
      content:
        'Sự minh bạch tài chính là lý do tôi chọn đồng hành lâu dài. Tôi luôn biết chính xác số tiền mình quyên góp được sử dụng ở đâu và hiệu quả như thế nào thông qua báo cáo kiểm toán hàng quý.',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- HEADER --- */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
            Câu chuyện <span className="text-green-700">tác động</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
            Lắng nghe những chia sẻ chân thật từ những người đang trực tiếp tham gia vào hành trình gieo mầm yêu thương.
          </p>
        </div>

        {/* --- GRID TESTIMONIALS --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="relative bg-white rounded-2xl p-8 md:p-10 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] border border-gray-100 hover:shadow-xl hover:border-emerald-100 hover:-translate-y-1 transition-all duration-300 group"
            >
              {/* Icon Quote trang trí nền */}
              <div className="absolute top-6 right-8 text-emerald-100 group-hover:text-emerald-50 transition-colors">
                <Quote className="w-12 h-12 md:w-16 md:h-16 fill-current opacity-50" />
              </div>

              {/* Header Card: Avatar + Info */}
              <div className="flex items-center gap-5 mb-6 relative z-10">
                <div className="relative w-16 h-16 md:w-18 md:h-18 flex-shrink-0">
                  {/* Avatar wrapper với viền xanh */}
                  <div className="absolute inset-0 rounded-full border-2 border-emerald-500 p-0.5">
                     <Image
                      src={item.avatar}
                      alt={item.name}
                      fill
                      className="rounded-full object-cover"
                      // Thêm ảnh placeholder nếu chưa có ảnh thật để không bị lỗi
                      onError={(e) => {
                         // Fallback logic nếu cần (thường xử lý ở mức data)
                      }}
                    />
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-emerald-600 text-sm font-semibold uppercase tracking-wide mt-1">
                    {item.role}
                  </p>
                  {/* Rating Stars */}
                  <div className="flex gap-1 mt-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-amber-400 fill-current" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Nội dung trích dẫn */}
              <blockquote className="relative z-10">
                <p className="text-gray-600 text-lg leading-relaxed italic">
                  &quot;{item.content}&quot;
                </p>
              </blockquote>

              {/* Decoration line bottom */}
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-emerald-400 to-emerald-600 transition-all duration-500 group-hover:w-full rounded-b-2xl"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}