'use client';

import Image from 'next/image';

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Đặng Trung Hải',
      role: 'Tình nguyện viên 3 năm gắn bó',
      avatar: '/images/avatar1.jpg', // Đặt ảnh đại diện vào public/images/
      content:
        'Tham gia tình nguyện cùng Quỹ Bông Hồng Nhỏ là trải nghiệm ý nghĩa nhất của tôi trong đời. Hệ thống minh bạch giúp tôi tự tin rằng công sức của mình đang được đặt đúng chỗ.',
    },
    {
      name: 'Lê Nguyễn Thái Dũng',
      role: 'Nhà tài trợ thành niên',
      avatar: '/images/avatar2.jpg',
      content:
        'Sự minh bạch tài chính là lý do tôi chọn đồng hành lâu dài. Tôi luôn biết chính xác số tiền mình quyên góp được sử dụng đầu và hiệu quả như thế nào thông qua báo cáo hàng quý.',
    },
    // Có thể thêm nhiều hơn nếu muốn carousel
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tiêu đề section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#1a522e] mb-4">
            <span>Họ nói gì về chúng tôi ?</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Lắng nghe và chia sẻ từ những người trực tiếp tham gia vào hành trình thay đổi.
          </p>
        </div>

        {/* Danh sách testimonial - 2 card trên desktop, 1 trên mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="bg-white shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300 border border-gray-100"
            >
              {/* Avatar + tên + vai trò */}
              <div className="flex items-center mb-6">
                <div className="relative w-16 h-16 mr-5 flex-shrink-0">
                  <Image
                    src={item.avatar}
                    alt={item.name}
                    fill
                    className="rounded-full object-cover border-4 border-white shadow-md"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>
                  <p className="text-green-600 text-sm font-medium">{item.role}</p>
                </div>
              </div>

              {/* Nội dung trích dẫn */}
              <blockquote className="text-gray-700 text-lg leading-relaxed italic">
                &quot;{item.content}&quot;
              </blockquote>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}