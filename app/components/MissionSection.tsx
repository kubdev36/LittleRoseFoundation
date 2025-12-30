'use client';

import Link from 'next/link';
import { ChevronRight, Eye, HeartHandshake, Lightbulb, Handshake } from 'lucide-react';

export default function MissionSection() {
  return (
    // Section này giữ nền TRẮNG để tạo sự ngắt quãng với 2 section màu xanh bên cạnh
    <section className="py-16 md:py-24 bg-white font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* --- CỘT TRÁI: NỘI DUNG TEXT --- */}
          <div className="animate-fade-in-up">
            {/* Tag nhỏ: Green-100 / Green-700 */}
            <span className="inline-block bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
              Về chúng tôi
            </span>

            {/* Tiêu đề chính: Green-600 */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
              Sứ mệnh <span className="text-green-700">kết nối</span>,
              <br />
              Lan tỏa <span className="text-green-700">yêu thương</span>
            </h2>

            {/* Mô tả */}
            <p className="text-gray-500 text-lg leading-relaxed mb-8 max-w-lg">
              Quỹ Bông Hồng Nhỏ cam kết kiến tạo những thay đổi bền vững cho cộng đồng. 
              Với giá trị cốt lõi là sự minh bạch và tận tâm, chúng tôi không ngừng nỗ lực 
              để mang lại tương lai tươi sáng hơn cho trẻ em khó khăn trên khắp Việt Nam.
            </p>

            {/* Nút Tìm hiểu thêm: Green-600 */}
            <Link
              href="/about"
              className="inline-flex items-center bg-[#143d23] text-white px-8 py-4 rounded-full font-bold text-base md:text-lg hover:bg-[#0f2e1b] hover:shadow-lg hover:shadow-green-900/20 hover:-translate-y-0.5 transition-all duration-300 group"
            >
              Tìm hiểu thêm
              <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* --- CỘT PHẢI: GRID CÁC GIÁ TRỊ --- */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Card 1: Minh bạch (Blue - Giữ nguyên để phân biệt) */}
            <div className="group bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-blue-200 hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
                <Eye className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">Minh bạch 100%</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Mọi khoản đóng góp và chi tiêu đều được công khai minh bạch, kiểm toán định kỳ.
              </p>
            </div>

            {/* Card 2: Tận tâm (Red - Giữ nguyên) */}
            <div className="group bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-red-200 hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 rounded-xl bg-red-50 flex items-center justify-center mb-4 group-hover:bg-red-100 transition-colors">
                <HeartHandshake className="w-7 h-7 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">Tận tâm phục vụ</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Đội ngũ tình nguyện viên nhiệt huyết, làm việc với tất cả trái tim vì cộng đồng.
              </p>
            </div>

            {/* Card 3: Giải pháp (Amber - Giữ nguyên) */}
            <div className="group bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-amber-200 hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 rounded-xl bg-amber-50 flex items-center justify-center mb-4 group-hover:bg-amber-100 transition-colors">
                <Lightbulb className="w-7 h-7 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors">Giải pháp thông minh</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Áp dụng công nghệ để tối ưu hóa nguồn lực và gia tăng hiệu quả dự án.
              </p>
            </div>

            {/* Card 4: Hợp tác (Chuyển Emerald -> Green-600) */}
            <div className="group bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-green-200 hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 rounded-xl bg-green-50 flex items-center justify-center mb-4 group-hover:bg-green-100 transition-colors">
                <Handshake className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">Hợp tác mở rộng</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Kết nối các tổ chức, doanh nghiệp để cùng tạo ra tác động lớn hơn.
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}