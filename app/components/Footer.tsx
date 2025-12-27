'use client';

import { Facebook, Youtube } from 'lucide-react';

// Icon TikTok tự tạo vì lucide-react chưa hỗ trợ
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
    <footer className="bg-black text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Cột 1: Nội dung */}
          <div>
            <h3 className="text-green-600 font-bold text-lg mb-4">Nội dung</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Tổ chức phi lợi nhuận hoạt động vì trẻ em và cộng đồng khó khăn tại Việt Nam. 
              Chúng tôi cam kết minh bạch tài chính 100% và hiệu quả bền vững trong từng dự án.
            </p>
          </div>

          {/* Cột 2: Về chúng tôi */}
          <div>
            <h3 className="text-green-600 font-bold text-lg mb-4">Về chúng tôi</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li className="hover:text-white transition">Sứ mệnh và tầm nhìn</li>
              <li className="hover:text-white transition">Đội ngũ sáng lập</li>
              <li className="hover:text-white transition">Báo cáo tài chính</li>
              <li className="hover:text-white transition">Đối tác chiến lược</li>
            </ul>
          </div>

          {/* Cột 3: Hoạt động */}
          <div>
            <h3 className="text-green-600 font-bold text-lg mb-4">Hoạt động</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li className="hover:text-white transition">Dự án giáo dục</li>
              <li className="hover:text-white transition">Hỗ trợ y tế</li>
              <li className="hover:text-white transition">Cứu hộ khẩn cấp</li>
              <li className="hover:text-white transition">Tình nguyện viên</li>
            </ul>
          </div>

          {/* Cột 4: Đăng ký nhận tin */}
          <div>
            <h3 className="text-green-600 font-bold text-lg mb-4">Đăng ký nhận tin</h3>
            <p className="text-gray-300 text-sm mb-4">
              Nhận báo cáo hoạt động và thông tin dự án mới nhất hàng tháng.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Email của bạn"
                className="flex-1 px-4 py-3 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600"
              />
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-500 text-white font-semibold px-5 py-3 transition"
              >
                Sign up
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-gray-800 mb-8" />

        {/* Bottom section: Social + Address + Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm">
          {/* Social icons */}
          <div className="flex gap-6">
            <a href="#" aria-label="TikTok" className="text-gray-400 hover:text-white transition">
              <TikTokIcon className="w-6 h-6" />
            </a>
            <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-white transition">
              <Facebook className="w-6 h-6" />
            </a>
            <a href="#" aria-label="YouTube" className="text-gray-400 hover:text-white transition">
              <Youtube className="w-6 h-6" />
            </a>
          </div>

          {/* Address & Contact */}
          <div className="text-center text-gray-400">
            <p>Tầng 5 tòa nhà ABCABC, 123 Nguyễn Trãi, Thanh Xuân, Hà Nội</p>
            <p>(84+) 0123456789</p>
            <p>Contact@bonghongnhohongnho.vn</p>
          </div>

          {/* Copyright & Links */}
          <div className="text-center text-gray-500 text-xs">
            <p>2025 Quỹ Bông Hồng Nhỏ. designedwith for commucommunitycommunity.</p>
            <div className="flex gap-4 justify-center mt-2">
              <a href="#" className="hover:text-white transition">Điều khoản</a>
              <a href="#" className="hover:text-white transition">Bảo mật</a>
              <a href="#" className="hover:text-white transition">Cookie</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}