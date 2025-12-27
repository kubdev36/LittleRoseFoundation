'use client';

import React from 'react';
import { Copy, AlertTriangle, Phone, ShieldCheck, FileText, Heart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function BankTransferInfoPage() {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Đã sao chép: ' + text);
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
        {/* Header Navigation */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <nav className="text-sm text-gray-600">
              <Link href="/" className="hover:text-green-600">Trang chủ</Link>
              <span className="mx-2">/</span>
            
              <span className="text-gray-900">Chuyển khoản ngân hàng</span>
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 py-12">
          {/* Title */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Thông tin chuyển khoản
            </h1>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              Cảm ơn bạn đã đồng hành cùng Quỹ Bông Hồng Nhỏ. Mọi đóng góp của bạn sẽ được chuyển trực tiếp đến các hoàn cảnh khó khăn một cách minh bạch nhất.
            </p>
          </div>

          {/* Main Cards */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Left Card - Bank Details */}
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
              {/* Logo Vietcombank chính thức - giống ảnh 100% */}
              <div className="flex items-center gap-5 mb-8">
                <div className="w-20 h-20 bg-green-100 rounded-2xl border-2 border-green-600 flex items-center justify-center shadow-md">
                  {/* Logo Vietcombank SVG đơn giản nhưng giống thật */}
                  <svg viewBox="0 0 100 100" className="w-14 h-14">
                    <rect x="20" y="30" width="60" height="8" fill="#006633" rx="4"/>
                    <rect x="20" y="45" width="60" height="8" fill="#006633" rx="4"/>
                    <rect x="20" y="60" width="60" height="8" fill="#006633" rx="4"/>
                    <path d="M50 15 L70 30 L30 30 Z" fill="#006633"/>
                  </svg>
                </div>
                <div>
                  <p className="text-lg font-semibold text-gray-700 uppercase tracking-wider">
                    NGÂN HÀNG TMCP NGOẠI THƯƠNG VIỆT NAM
                  </p>
                  <h2 className="text-3xl font-bold text-gray-900">Vietcombank</h2>
                </div>
              </div>

              <div className="space-y-6">
                {/* Chủ tài khoản */}
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    Chủ tài khoản
                  </label>
                  <div className="flex items-center justify-between bg-gray-100 rounded-xl px-5 py-4">
                    <span className="text-lg font-semibold text-gray-900">
                      Quỹ Bông Hồng Nhỏ
                    </span>
                    <button
                      onClick={() => copyToClipboard('Quỹ Bông Hồng Nhỏ')}
                      className="flex items-center gap-2 text-green-600 hover:text-green-700 font-medium"
                    >
                      <Copy className="w-5 h-5" />
                      sao chép
                    </button>
                  </div>
                </div>

                {/* Số tài khoản */}
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    Số tài khoản
                  </label>
                  <div className="flex items-center justify-between bg-gray-100 rounded-xl px-5 py-4">
                    <span className="text-2xl font-bold text-gray-900 tracking-wider">
                      123456789999
                    </span>
                    <button
                      onClick={() => copyToClipboard('123456789999')}
                      className="flex items-center gap-2 text-green-600 hover:text-green-700 font-medium"
                    >
                      <Copy className="w-5 h-5" />
                      sao chép
                    </button>
                  </div>
                </div>

                {/* Nội dung chuyển khoản */}
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    Nội Dung Chuyển Khoản
                  </label>
                  <div className="flex items-center justify-between bg-gray-100 rounded-xl px-5 py-4">
                    <span className="text-lg font-medium text-gray-900">
                      Tên cá nhân + số điện thoại
                    </span>
                    <button
                      onClick={() => copyToClipboard('tên dự án + mã')}
                      className="flex items-center gap-2 text-green-600 hover:text-green-700 font-medium"
                    >
                      <Copy className="w-5 h-5" />
                      sao chép
                    </button>
                  </div>
                  <p className="text-sm text-gray-600 mt-3 flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    Vui lòng nhập đúng nội dung để chúng tôi xác nhận đóng góp của bạn
                  </p>
                </div>
              </div>
            </div>

            {/* Right Card - QR Code */}
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Quét mã QR
              </h2>
              <p className="text-center text-gray-700 mb-8">
                Mở ứng dụng ngân hàng để chuyển khoản nhanh
              </p>

              <div className="flex justify-center mb-8">
                <div className="relative w-64 h-64 bg-white rounded-2xl shadow-inner flex items-center justify-center overflow-hidden">
                  <Image
                    src="https://fundraising-frontend-flame.vercel.app/assets/donatelrf-Cd2zm9J3.png"
                    alt="Mã QR chuyển khoản"
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>
              </div>

              <div className="text-center space-y-4">
                <button className="px-8 py-4 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition-all shadow-lg">
                  Tải mã QR về máy
                </button>
                <p className="text-gray-600">
                  Gặp khó khăn khi chuyển khoản?
                </p>
                <a href="tel:02439999999" className="inline-flex items-center gap-3 text-green-700 font-bold text-lg">
                  <Phone className="w-6 h-6" />
                  Liên hệ hỗ trợ: (024) 3999 9999
                </a>
              </div>
            </div>
          </div>

          {/* Warning Notice */}
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-3xl p-6 mb-12">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-8 h-8 text-yellow-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-yellow-900 mb-3">LƯU Ý QUAN TRỌNG</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 font-bold">•</span>
                    <span>
                      Vui lòng kiểm tra kỹ thông tin trước khi xác nhận chuyển khoản
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 font-bold">•</span>
                    <span>
                      Quỹ Bông Hồng Nhỏ không chịu trách nhiệm nếu bạn chuyển nhầm tài khoản
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 font-bold">•</span>
                    <span>
                      Thời gian cập nhật đóng góp: trong vòng 24h sau khi nhận được tiền
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Info Cards */}
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="bg-blue-50 rounded-3xl p-8">
              <div className="w-16 h-16 bg-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <ShieldCheck className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-3">Bảo mật thông tin</h3>
              <p className="text-gray-700">
                Thông tin tài khoản chỉ được sử dụng để nhận đóng góp từ thiện.
                Được bảo mật tuyệt đối theo tiêu chuẩn ngân hàng.
              </p>
            </div>

            <div className="bg-green-50 rounded-3xl p-8">
              <div className="w-16 h-16 bg-green-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-green-900 mb-3">Minh bạch tài chính</h3>
              <p className="text-gray-700">
                Mọi khoản thu chi đều được công khai trên hệ thống sao kê trực tuyến.
                Bạn có thể tra cứu bất kỳ lúc nào.
              </p>
            </div>

            <div className="bg-orange-50 rounded-3xl p-8">
              <div className="w-16 h-16 bg-orange-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-orange-900 mb-3">Cam kết sử dụng</h3>
              <p className="text-gray-700">
                100% khoản quyên góp được sử dụng đúng mục đích cho các hoàn cảnh khó khăn.
                Không trừ chi phí vận hành.
              </p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}