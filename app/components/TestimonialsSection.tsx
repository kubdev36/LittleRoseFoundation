'use client';

import Image from 'next/image';

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Đặng Trung Hải',
      role: 'Tình nguyện viên 3 năm gắn bó',
      avatar: '/images/avatar1.jpg',
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
    // Có thể thêm nhiều hơn nếu cần
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
        {/* ĐÃ CHỈNH: bỏ max-w-5xl để toàn bộ section dùng cùng max-w-7xl như PartnersSection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
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

              {/* Icon trích dẫn */}
              <svg className="w-10 h-10 text-green-200 mb-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M14.017 21L14.017 18C14.017 16.896 14.383 15.93 15.117 15.103C15.851 14.275 16.816 13.861 18.013 13.861C18.279 13.861 18.528 13.883 18.76 13.928L18.707 13.567C18.547 12.367 18.033 11.367 17.165 10.567C16.297 9.766 15.232 9.366 13.97 9.366L13.97 6C15.917 6 17.633 6.75 19.117 8.25C20.601 9.75 21.343 11.583 21.343 13.75L21.343 21L14.017 21ZM6.017 21L6.017 18C6.017 16.896 6.383 15.93 7.117 15.103C7.851 14.275 8.816 13.861 10.013 13.861C10.279 13.861 10.528 13.883 10.76 13.928L10.707 13.567C10.547 12.367 10.033 11.367 9.165 10.567C8.297 9.766 7.232 9.366 5.97 9.366L5.97 6C7.917 6 9.633 6.75 11.117 8.25C12.601 9.75 13.343 11.583 13.343 13.75L13.343 21L6.017 21Z" />
              </svg>

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