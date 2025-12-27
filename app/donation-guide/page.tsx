'use client';

import React, { useState } from 'react';
import { 
  Search, 
  HelpCircle, 
  ChevronRight, 
  CreditCard, 
  Banknote, 
  Smartphone, 
  ShieldCheck, 
  Download, 
  Phone, 
  Mail, 
  Clock, 
  CheckCircle,
  Globe,
  Filter,
  FileText,
  Heart,
  Edit,
  Receipt,
  BarChart,
  Bell,
  Share2,
  ArrowRight,
  MessageCircle
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function DonationGuidePage() {
  const [activeStep, setActiveStep] = useState(1);
  const [searchValue, setSearchValue] = useState('');

  const steps = [
    {
      number: 1,
      title: 'Chọn dự án yêu thích',
      description: 'Duyệt qua danh sách các dự án đang cần sự hỗ trợ và chọn dự án bạn muốn đóng góp.',
      icon: Search,
      details: [
        { text: 'Truy cập trang "Dự án đang gây quỹ"', icon: Globe },
        { text: 'Sử dụng bộ lọc theo danh mục, khu vực, trạng thái', icon: Filter },
        { text: 'Xem chi tiết dự án (tiến độ, mục tiêu, báo cáo)', icon: FileText },
        { text: 'Nhấn "Quyên góp ngay"', icon: Heart }
      ]
    },
    {
      number: 2,
      title: 'Nhập thông tin quyên góp',
      description: 'Chọn số tiền và phương thức thanh toán phù hợp nhất với bạn.',
      icon: CreditCard,
      details: [
        { text: 'Số tiền: 10.000đ - 100.000.000đ', icon: Banknote },
        { text: 'Phương thức: Chuyển khoản ngân hàng, Momo, ZaloPay, ViettelPay', icon: Smartphone },
        { text: 'Thêm ghi chú (tùy chọn): "Ủng hộ bé An - tim bẩm sinh"', icon: Edit },
        { text: 'Kiểm tra thông tin trước khi xác nhận', icon: ShieldCheck }
      ]
    },
    {
      number: 3,
      title: 'Xác nhận & nhận biên nhận',
      description: 'Hệ thống xử lý giao dịch an toàn và gửi biên nhận ngay lập tức.',
      icon: CheckCircle,
      details: [
        { text: 'Nhận mã giao dịch và biên nhận PDF qua email/SMS', icon: Receipt },
        { text: 'Kiểm tra sao kê minh bạch tại saoke.bonghongnho.org.vn', icon: BarChart },
        { text: 'Nhận thông báo cập nhật tiến độ dự án', icon: Bell },
        { text: 'Chia sẻ đóng góp lên mạng xã hội (tùy chọn)', icon: Share2 }
      ]
    }
  ];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-[#1a522e]/5 to-white">
        {/* Header Navigation */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <nav className="text-sm text-gray-600">
              <Link href="/" className="hover:text-[#1a522e] transition-colors" scroll={false}>
                Trang chủ
              </Link>
              <span className="mx-2">/</span>
              <Link href="/huong-dan" className="hover:text-[#1a522e] transition-colors" scroll={false}>
                Hướng dẫn
              </Link>
              <span className="mx-2">/</span>
              <span className="text-gray-900">Quyên góp</span>
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 py-12">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[#1a522e]/10 text-[#1a522e] text-sm font-medium px-4 py-2 rounded-full mb-6">
            <HelpCircle className="w-4 h-4" />
            <span>HƯỚNG DẪN QUYÊN GÓP</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Hướng dẫn Quyên góp
            <br className="hidden md:block" />
            <span className="text-[#1a522e]">Nhanh chóng - An toàn</span>
          </h1>

          {/* Description */}
          <p className="text-xl text-gray-700 max-w-3xl mb-12 leading-relaxed">
            Quyên góp chỉ mất 30 giây với hệ thống thanh toán hiện đại nhất. 
            Mọi giao dịch đều minh bạch 100% và có biên nhận điện tử ngay lập tức.
          </p>

          {/* Quick Search */}
          <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mb-16">
            <div className="relative flex-1">
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Tìm dự án: tim bẩm sinh, nước sạch, học bổng..."
                className="w-full pl-12 pr-6 py-4 text-lg border border-gray-300 rounded-full focus:outline-none focus:ring-4 focus:ring-[#1a522e]/20 focus:border-[#1a522e] transition-all"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
            </div>
            <button className="px-8 py-4 bg-[#1a522e] text-white font-semibold text-lg rounded-full hover:bg-[#133f24] transition-all shadow-lg hover:shadow-xl flex items-center gap-2 whitespace-nowrap">
              Tìm dự án ngay
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* 3 Steps Guide */}
          <div className="grid lg:grid-cols-2 gap-12 mb-20">
            <div className="space-y-8">
              {steps.map((step) => (
                <div
                  key={step.number}
                  className={`flex gap-6 p-6 rounded-2xl transition-all duration-300 cursor-pointer ${
                    activeStep === step.number
                      ? 'bg-white shadow-2xl ring-4 ring-[#1a522e]/10 border-2 border-[#1a522e]/30'
                      : 'bg-white shadow-lg hover:shadow-xl hover:-translate-y-1'
                  }`}
                  onMouseEnter={() => setActiveStep(step.number)}
                >
                  <div className="flex-shrink-0 w-16 h-16 bg-[#1a522e] text-white rounded-2xl flex items-center justify-center text-2xl font-bold shadow-lg">
                    {step.number}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <step.icon className="w-6 h-6 text-[#1a522e]" />
                      <h3 className="text-2xl font-bold text-gray-900">{step.title}</h3>
                    </div>
                    <p className="text-gray-700 mb-4 leading-relaxed">{step.description}</p>
                    <ul className="space-y-2 text-sm text-gray-600">
                      {step.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <detail.icon className="w-4 h-4 text-[#1a522e] mt-0.5 flex-shrink-0" />
                          <span>{detail.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            {/* Payment Methods Illustration */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <h3 className="text-2xl font-bold mb-6 text-center">Phương thức thanh toán</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-4 bg-[#1a522e]/5 rounded-xl border-2 border-dashed border-[#1a522e]/30">
                    <div className="w-12 h-12 bg-[#1a522e] rounded-xl flex items-center justify-center">
                      <Banknote className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Chuyển khoản NH</h4>
                      <p className="text-sm text-gray-600">Vietcombank, BIDV, Vietinbank</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-[#1a522e]/5 rounded-xl border-2 border-dashed border-[#1a522e]/30">
                    <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl flex items-center justify-center">
                      <Smartphone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Ví điện tử</h4>
                      <p className="text-sm text-gray-600">Momo, ZaloPay, VNPay</p>
                    </div>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-[#1a522e]/10 rounded-xl border border-[#1a522e]/30">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-6 h-6 text-[#1a522e]" />
                    <div>
                      <p className="font-semibold text-[#1a522e]">Bảo mật SSL 256-bit</p>
                      <p className="text-sm text-gray-700">Mọi giao dịch được mã hóa an toàn</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* QR Code Mockup */}
              <div className="bg-white rounded-2xl shadow-xl p-6 text-center">
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <Image
                    src="https://fundraising-frontend-flame.vercel.app/assets/donatelrf-Cd2zm9J3.png"
                    alt="QR Code quyên góp"
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>
                <p className="text-gray-600 mb-2">Quét mã QR để quyên góp nhanh</p>
                <button className="text-[#1a522e] hover:text-[#133f24] font-medium flex items-center justify-center gap-1 text-sm mx-auto">
                  <Download className="w-4 h-4" />
                  Tải hướng dẫn QR
                </button>
              </div>
            </div>
          </div>

          {/* Info Boxes */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Cam kết minh bạch */}
            <div className="bg-[#1a522e]/5 rounded-3xl p-8 shadow-xl border border-[#1a522e]/20">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-white rounded-2xl p-2 shadow-md">
                  <ShieldCheck className="w-8 h-8 text-[#1a522e]" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Cam kết minh bạch</h3>
                  <p className="text-gray-700">100% khoản quyên góp đến đúng người nhận</p>
                </div>
              </div>
              <ul className="space-y-3 text-gray-700 text-sm">
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-[#1a522e] flex-shrink-0" />
                  Báo cáo chi tiết 7 ngày/lần
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-[#1a522e] flex-shrink-0" />
                  Sao kê công khai 24/7
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-[#1a522e] flex-shrink-0" />
                  Kiểm toán độc lập hàng quý
                </li>
              </ul>
            </div>

            {/* Hỗ trợ */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-200">
              <h3 className="text-2xl font-bold mb-6">Cần hỗ trợ?</h3>
              <div className="space-y-4">
                <a href="tel:19001234" className="flex items-center gap-3 p-4 bg-[#1a522e]/5 rounded-xl hover:bg-[#1a522e]/10 transition-all group">
                  <div className="w-12 h-12 bg-[#1a522e] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Hotline miễn phí</p>
                    <p className="text-2xl font-bold text-[#1a522e]">1900 1234</p>
                  </div>
                </a>
                <a href="mailto:hotro@bonghongnho.org.vn" className="flex items-center gap-3 p-4 bg-[#1a522e]/5 rounded-xl hover:bg-[#1a522e]/10 transition-all">
                  <Mail className="w-6 h-6 text-[#1a522e]" />
                  <span className="text-[#1a522e] font-medium">hotro@bonghongnho.org.vn</span>
                </a>
              </div>
              <p className="text-xs text-gray-500 mt-4">Hỗ trợ 24/7 • Phản hồi trong 30 phút</p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center py-16 bg-white rounded-3xl shadow-2xl border border-gray-100">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Bắt đầu quyên góp ngay hôm nay
            </h2>
            <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
              Mỗi 10.000đ của bạn có thể thay đổi cuộc đời một em bé. Hãy cùng chúng tôi lan tỏa yêu thương!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-2xl mx-auto">
              <Link 
                href="/du-an" 
                className="px-10 py-5 bg-[#1a522e] text-white text-xl font-bold rounded-full hover:bg-[#133f24] transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center gap-2"
                scroll={false}
              >
                Xem tất cả dự án
                <ArrowRight className="w-6 h-6" />
              </Link>
              <Link 
                href="/lien-he" 
                className="px-10 py-5 border-2 border-[#1a522e] text-[#1a522e] text-xl font-bold rounded-full hover:bg-[#1a522e] hover:text-white transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
                scroll={false}
              >
                Liên hệ tư vấn
                <MessageCircle className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}