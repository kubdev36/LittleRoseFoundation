'use client';

import { Facebook, Youtube } from 'lucide-react';
import Link from 'next/link';

// Icon TikTok giữ nguyên
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-16 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* GRID LAYOUT */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 mb-12">
          
          {/* Cột 1: Giới thiệu */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            {/* Đổi tiêu đề sang màu trắng cho dễ đọc trên nền đen, thay vì màu xanh tối */}
            <h3 className="text-white font-bold text-lg mb-4 uppercase tracking-wide border-b-2 border-[#143d23] pb-2 inline-block">
              Về Quỹ
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs sm:max-w-none">
              Tổ chức phi lợi nhuận hoạt động vì trẻ em và cộng đồng khó khăn tại Việt Nam. 
              Cam kết minh bạch tài chính 100% và hiệu quả bền vững.
            </p>
          </div>

          {/* Cột 2: Liên kết nhanh */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <h3 className="text-white font-bold text-lg mb-4 uppercase tracking-wide border-b-2 border-[#143d23] pb-2 inline-block">
              Tổ chức
            </h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li><Link href="#" className="hover:text-white transition-colors duration-200">Sứ mệnh & Tầm nhìn</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors duration-200">Đội ngũ sáng lập</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors duration-200">Báo cáo tài chính</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors duration-200">Đối tác chiến lược</Link></li>
            </ul>
          </div>

          {/* Cột 3: Hoạt động */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <h3 className="text-white font-bold text-lg mb-4 uppercase tracking-wide border-b-2 border-[#143d23] pb-2 inline-block">
              Hoạt động
            </h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li><Link href="#" className="hover:text-white transition-colors duration-200">Dự án giáo dục</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors duration-200">Hỗ trợ y tế</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors duration-200">Cứu hộ khẩn cấp</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors duration-200">Trở thành Tình nguyện viên</Link></li>
            </ul>
          </div>

          {/* Cột 4: Newsletter */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <h3 className="text-white font-bold text-lg mb-4 uppercase tracking-wide border-b-2 border-[#143d23] pb-2 inline-block">
              Đăng ký nhận tin
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              Nhận báo cáo hoạt động và thông tin dự án mới nhất hàng tháng.
            </p>
            <form className="w-full max-w-xs sm:max-w-none flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Email của bạn"
                className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#143d23] transition-all"
              />
              <button
                type="submit"
                // CẬP NHẬT MÀU NÚT: #143d23 (Xanh rêu đậm)
                className="w-full sm:w-auto bg-[#143d23] hover:bg-[#0f2e1b] text-white font-bold px-6 py-3 rounded-lg transition-colors whitespace-nowrap shadow-lg shadow-green-900/20"
              >
                Gửi
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-4">
          
          {/* Left: Copyright & Social */}
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 order-2 md:order-1">
            <span className="text-gray-500 text-xs">© 2025 Quỹ Bông Hồng Nhỏ.</span>
            
            {/* Social Icons - Cập nhật hover bg sang màu #143d23 */}
            <div className="flex gap-4">
              <a href="#" className="bg-gray-800 p-2 rounded-full text-gray-400 hover:text-white hover:bg-[#143d23] transition-all">
                <TikTokIcon className="w-4 h-4" />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-full text-gray-400 hover:text-white hover:bg-[#143d23] transition-all">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-full text-gray-400 hover:text-white hover:bg-[#143d23] transition-all">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right: Links & Address */}
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-xs text-gray-500 order-1 md:order-2 text-center md:text-right">
             <div className="hidden lg:block">
                123 Nguyễn Trãi, Thanh Xuân, Hà Nội
             </div>
             <div className="flex gap-4">
                <Link href="#" className="hover:text-white transition">Điều khoản</Link>
                <Link href="#" className="hover:text-white transition">Bảo mật</Link>
             </div>
          </div>

        </div>
      </div>
    </footer>
  );
}