'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Search,
  HelpCircle,
  ChevronRight,
  Phone,
  Mail,
  Globe,
  ChevronDown,
  MousePointerClick,
  Layout,
  Hash,
  Calendar,
  ArrowRightLeft,
  Info,
  FileText,
  Clock,
  FileCheck,
  ShieldCheck,
} from 'lucide-react';

export default function FinancialInfoLookupGuide() {
  const [searchValue, setSearchValue] = useState('');

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-[#1a522e]/5 via-white to-gray-50">
        {/* Hero Banner - Responsive height + better mobile text */}
        <div className="relative h-64 sm:h-80 md:h-96 w-full overflow-hidden">
          <Image
            src="/images/banner4.jpg"
            alt="Hướng dẫn tra cứu thông tin tài chính - Quỹ Từ Thiện Bông Hồng Nhỏ"
            fill
            className="object-cover brightness-50"
            priority
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 drop-shadow-2xl">
              Chứng kiến nguồn tiền
            </h1>
            <p className="text-base sm:text-lg drop-shadow-md">
              <Link href="/" className="hover:text-emerald-300 transition-colors">
                Trang chủ
              </Link>{' '}
              / <span className="text-emerald-300">Chứng kiến nguồn tiền</span>
            </p>
          </div>
        </div>

        {/* Main Content - Better padding on mobile */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[#1a522e]/10 text-[#1a522e] text-sm font-medium px-4 py-2 rounded-full mb-6">
            <HelpCircle className="w-4 h-4" />
            <span>HỖ TRỢ TRA CỨU</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
           <span className="block mb-2 sm:mb-3">Hướng dẫn tra cứu</span>
          <span className="block text-[#1a522e]">Nhanh chóng - Minh bạch</span>
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg text-gray-700 max-w-4xl mb-10 md:mb-12 leading-relaxed">
            Chúng tôi cung cấp công cụ minh bạch để bạn có thể dễ dàng theo dõi khoản đóng góp của mình
            và xem chi tiết cách nguồn tiền được sử dụng cho cộng đồng.
          </p>

          {/* Search Bar - Fully responsive */}
          <div className="flex flex-col sm:flex-row gap-4 max-w-3xl mb-12 md:mb-16">
            <div className="relative flex-1">
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Nhập Mã dự án, Tên dự án..."
                className="w-full pl-12 pr-6 py-4 text-base sm:text-lg border border-gray-300 rounded-full focus:outline-none focus:ring-4 focus:ring-[#1a522e]/20 focus:border-[#1a522e] transition-all"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
            </div>

            <button className="px-8 py-4 bg-[#1a522e] text-white font-medium text-base sm:text-lg rounded-full hover:bg-[#134429] transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 whitespace-nowrap">
              Tìm kiếm dự án
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Steps Guide - Mobile: stack vertically, Tablet+: 2 columns */}
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-12 md:mb-16 items-start">
            {/* Left: Steps */}
            <div className="space-y-10 md:space-y-12">
              {/* Step 1 */}
              <div className="flex gap-4 sm:gap-6">
                <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-[#1a522e] text-white rounded-full flex items-center justify-center text-xl sm:text-2xl font-bold">
                  1
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold mb-3">Truy cập trang Sao Kê</h3>
                  <p className="text-gray-700 mb-4 text-sm sm:text-base">
                    Vào website chính thức{' '}
                    <a href="https://saoke.littlerosesfoundation.org" className="text-[#1a522e] font-medium hover:underline">
                      https://saoke.littlerosesfoundation.org
                    </a>
                  </p>
                  <ul className="text-gray-600 text-sm space-y-2">
                    <li className="flex items-start gap-2">
                      <MousePointerClick className="w-4 h-4 text-[#1a522e] mt-0.5 flex-shrink-0" />
                      <span>Truy cập nhanh từ menu <strong>Sao kê</strong> trên trang chủ</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Layout className="w-4 h-4 text-[#1a522e] mt-0.5 flex-shrink-0" />
                      <span>Hoặc click vào banner <strong>Xem sao kê minh bạch</strong></span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Step 2 & 3 tương tự - giữ cấu trúc flex cho mobile */}
              <div className="flex gap-4 sm:gap-6">
                <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-[#1a522e] text-white rounded-full flex items-center justify-center text-xl sm:text-2xl font-bold">
                  2
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold mb-3">Sử dụng bộ lọc tìm kiếm</h3>
                  <p className="text-gray-700 mb-4 text-sm sm:text-base">
                    Tại giao diện Sao Kê, bạn có thể lọc theo nhiều tiêu chí:
                  </p>
                  <ul className="text-gray-700 text-sm space-y-2">
                    <li className="flex items-start gap-3">
                      <Hash className="w-4 h-4 text-[#1a522e] mt-0.5 flex-shrink-0" />
                      <span>Mã dự án hoặc Tên dự án</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Calendar className="w-4 h-4 text-[#1a522e] mt-0.5 flex-shrink-0" />
                      <span>Theo thời gian (từ ngày - đến ngày)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <ArrowRightLeft className="w-4 h-4 text-[#1a522e] mt-0.5 flex-shrink-0" />
                      <span>Loại giao dịch (thu/chi)</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-4 sm:gap-6">
                <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-[#1a522e] text-white rounded-full flex items-center justify-center text-xl sm:text-2xl font-bold">
                  3
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold mb-3">Xác thực & tải chứng từ</h3>
                  <p className="text-gray-700 mb-4 text-sm sm:text-base">
                    Khi tìm thấy giao dịch, hệ thống sẽ hiển thị thông tin chi tiết và chứng từ gốc.
                  </p>
                  <ul className="text-gray-700 text-sm space-y-2">
                    <li className="flex items-start gap-3">
                      <Info className="w-4 h-4 text-[#1a522e] mt-0.5 flex-shrink-0" />
                      <span>Thông tin chuyển khoản đầy đủ</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <FileText className="w-4 h-4 text-[#1a522e] mt-0.5 flex-shrink-0" />
                      <span>Chứng từ gốc (ảnh, biên lai...)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Right: Illustration - Mobile: full width, centered */}
            <div className="flex justify-center mt-8 md:mt-0">
              <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 max-w-md w-full border border-gray-100">
                <div className="bg-gray-50 rounded-2xl p-4 sm:p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <span className="text-gray-500 text-xs sm:text-sm font-medium">saoke.littlerosesfoundation.org</span>
                  </div>
                  <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 space-y-4">
                    <input
                      type="text"
                      placeholder="Tìm kiếm theo mã dự án..."
                      className="w-full px-4 py-3 sm:py-4 border border-gray-300 rounded-xl focus:border-[#1a522e] focus:ring-4 focus:ring-[#1a522e]/20 text-sm sm:text-base"
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input type="date" className="px-4 py-3 sm:py-4 border border-gray-300 rounded-xl text-sm sm:text-base" />
                      <input type="date" className="px-4 py-3 sm:py-4 border border-gray-300 rounded-xl text-sm sm:text-base" />
                    </div>
                    <button className="w-full bg-[#1a522e] text-white py-3 sm:py-4 rounded-xl font-bold hover:bg-[#134429] transition text-sm sm:text-base">
                      Tìm kiếm
                    </button>
                  </div>
                </div>
                <p className="text-center text-xs sm:text-sm text-gray-600 mt-4">
                  Giao diện trang Sao Kê thực tế
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Info Boxes - Stack on mobile */}
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-12 md:mb-16">
            <div className="bg-[#1a522e]/5 rounded-2xl p-6 sm:p-8 border border-[#1a522e]/20">
              <h3 className="text-xl font-bold mb-4 text-gray-900">Lưu ý quan trọng</h3>
              <ul className="space-y-4 text-gray-700 text-sm sm:text-base">
                <li className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#1a522e] mt-0.5 flex-shrink-0" />
                  <span>Cập nhật giao dịch trong vòng 24h</span>
                </li>
                <li className="flex items-start gap-3">
                  <FileCheck className="w-5 h-5 text-[#1a522e] mt-0.5 flex-shrink-0" />
                  <span>Giao dịch trên 5 triệu có chứng từ gốc</span>
                </li>
                <li className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-[#1a522e] mt-0.5 flex-shrink-0" />
                  <span>Cam kết minh bạch 100%</span>
                </li>
              </ul>
            </div>

            <div className="bg-[#1a522e]/5 rounded-2xl p-6 sm:p-8 border border-[#1a522e]/20">
              <h3 className="text-xl font-bold mb-4 text-gray-900">Bạn cần hỗ trợ tra cứu?</h3>
              <p className="text-gray-700 mb-6 text-sm sm:text-base">
                Nếu gặp khó khăn, vui lòng liên hệ với chúng tôi:
              </p>
              <div className="space-y-4 sm:space-y-5">
                <a href="tel:19001234" className="flex items-center gap-4 text-[#1a522e] font-medium hover:underline text-sm sm:text-base">
                  <Phone className="w-6 h-6 flex-shrink-0" />
                  Hotline: 1900 1234
                </a>
                <a href="mailto:hotro@littlerosesfoundation.org" className="flex items-center gap-4 text-[#1a522e] font-medium hover:underline text-sm sm:text-base">
                  <Mail className="w-6 h-6 flex-shrink-0" />
                  Email: hotro@littlerosesfoundation.org
                </a>
                <a href="https://littlerosesfoundation.org" className="flex items-center gap-4 text-[#1a522e] font-medium hover:underline text-sm sm:text-base">
                  <Globe className="w-6 h-6 flex-shrink-0" />
                  Website: www.littlerosesfoundation.org
                </a>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="border-t pt-10 md:pt-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4 text-gray-900">Câu hỏi thường gặp</h2>
            <p className="text-center text-gray-600 mb-8 md:mb-10 max-w-3xl mx-auto text-sm sm:text-base">
              Giải đáp các thắc mắc về quy trình minh bạch của chúng tôi
            </p>
            <div className="space-y-4 sm:space-y-5 max-w-4xl mx-auto">
              {[
                {
                  question: 'Quý vị có phải trả phí vận hành nào 100% tiền quyên góp đi đâu đến đấy?',
                  answer: 'Quỹ Bông Hồng Nhỏ cam kết 100% số tiền quyên góp từ cộng đồng sẽ được chuyển trực tiếp đến các hoàn cảnh khó khăn hoặc dự án. Mọi chi phí vận hành đều được tài trợ riêng bởi các thành viên sáng lập.'
                },
                {
                  question: 'Làm sao tôi biết tiền của mình đã đến đúng người?',
                  answer: 'Chúng tôi thực hiện quy trình minh bạch 3 bước: 1. Công khai danh sách đóng góp. 2. Cập nhật tiến độ và hình ảnh trao tặng thực tế. 3. Cung cấp báo cáo tài chính và chứng từ chi tiêu cho từng dự án.'
                },
                {
                  question: 'Ai là người kiểm toán cho quỹ?',
                  answer: 'Quỹ Bông Hồng Nhỏ được kiểm toán định kỳ hàng năm bởi các đơn vị kiểm toán uy tín được cấp phép tại Việt Nam. Báo cáo kiểm toán được công khai trên website.'
                }
              ].map((item, index) => (
                <details
                  key={index}
                  className="bg-white rounded-2xl shadow-lg cursor-pointer group border border-gray-200 overflow-hidden"
                >
                  <summary className="px-6 sm:px-8 py-5 sm:py-6 flex items-center justify-between font-bold text-gray-900 text-base sm:text-lg list-none [&::-webkit-details-marker]:hidden">
                    {item.question}
                    <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500 group-open:rotate-180 transition-transform flex-shrink-0" />
                  </summary>
                  <div className="px-6 sm:px-8 pb-6 sm:pb-7 text-gray-700 leading-relaxed text-sm sm:text-base">
                    <p>{item.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}