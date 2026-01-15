"use client";

import React from "react";
// Import font từ Google để sửa lỗi hiển thị chữ bị tách dấu
import { Inter, Playfair_Display } from "next/font/google";
import { Heart, GraduationCap, MapPin, Lock } from "lucide-react";
import Link from "next/link";

// --- 1. CẤU HÌNH FONTS (Sửa lỗi hiển thị tiếng Việt) ---
const inter = Inter({ subsets: ["latin"] });
const playfair = Playfair_Display({ 
  subsets: ["latin", "vietnamese"], // Thêm vietnamese để hỗ trợ dấu
  weight: ["400", "700"] 
});

// --- 2. DỮ LIỆU GIẢ LẬP ---
const DONORS = [
  {
    id: 1,
    name: "Bà Huỳnh Mai",
    message: "Ủng hộ: Bữa cơm có thịt 2025",
    amount: "1,200,000 VND",
    time: "11:05 - 25/10/2024",
    hash: "0x3A1B...9C2A",
    avatar: "https://i.pravatar.cc/150?u=1",
  },
  {
    id: 2,
    name: "Nhà hảo tâm ẩn danh",
    message: "Ủng hộ: Quỹ Khuyến học Vùng cao",
    amount: "50,000,000 VND",
    time: "09:45 - 25/10/2024",
    hash: "0xFB23...8F77",
    avatar: "https://i.pravatar.cc/150?u=2",
  },
  {
    id: 3,
    name: "Trần Bích Phương",
    message: "Ủng hộ: Áo ấm cho em",
    amount: "500,000 VND",
    time: "08:15 - 25/10/2024",
    hash: "0xD1EF...52E1",
    avatar: "https://i.pravatar.cc/150?u=3",
  },
  {
    id: 4,
    name: "Ông Đặng Văn Hải",
    message: "Ủng hộ: Xây trường tại Hà Giang",
    amount: "2,500,000 VND",
    time: "14:20 - 24/10/2024",
    hash: "0x75C7...B670",
    avatar: "https://i.pravatar.cc/150?u=4",
  },
  {
    id: 5,
    name: "Nguyễn Thị Lan",
    message: "Ủng hộ: Sách vở cho em",
    amount: "200,000 VND",
    time: "10:10 - 24/10/2024",
    hash: "0xAABB...1122",
    avatar: "https://i.pravatar.cc/150?u=5",
  },
  {
    id: 6,
    name: "Phạm Văn Minh",
    message: "Ủng hộ: Nước sạch học đường",
    amount: "1,000,000 VND",
    time: "09:00 - 24/10/2024",
    hash: "0xCCDD...3344",
    avatar: "https://i.pravatar.cc/150?u=6",
  },
];

// --- 3. COMPONENT CHÍNH ---
export default function CharityPage() {
  return (
    <div className={`min-h-screen py-10 px-4 md:px-8 font-sans text-gray-800 ${inter.className}`} style={{ background: "linear-gradient(to right, #d4ded6 0%, #d4ded6 100%)" }}>
      
      {/* --- CSS STYLE TRỰC TIẾP CHO ANIMATION --- */}
      <style jsx>{`
        /* Định nghĩa chuyển động lên trên */
        @keyframes vertical-scroll {
          from { transform: translateY(0); }
          to { transform: translateY(-50%); }
        }
        
        /* Class chạy animation: 35s cho mượt, lặp vô tận */
        .animate-vertical-scroll {
          animation: vertical-scroll 35s linear infinite;
        }

        /* TÍNH NĂNG: Dừng cuộn khi rê chuột vào khung */
        .scroll-container:hover .animate-vertical-scroll {
          animation-play-state: paused;
        }

        /* Mask gradient: Làm mờ 2 đầu (trên/dưới) để danh sách hiện ra đẹp mắt */
        .mask-gradient-vertical {
          mask-image: linear-gradient(to bottom, transparent, black 15%, black 85%, transparent);
          -webkit-mask-image: linear-gradient(to bottom, transparent, black 15%, black 85%, transparent);
        }
      `}</style>

      <div className="max-w-7xl mx-auto">
        {/* --- HEADER --- */}
        <header className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-2 font-medium">
            Ước lượng cho một năm
          </p>
          {/* Áp dụng font Playfair để chữ không bị lỗi dấu */}
          <h1 className={`text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight${playfair.className}`}>
            Hành trình <span className=" font-bold text-green-700">ươm mầm</span> hy vọng
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto font-light text-sm md:text-base">
            Sứ mệnh minh bạch, kết nối những trái tim nhân ái vì một tương lai bền vững
            <br className="hidden md:block" /> cho trẻ em vùng cao trong năm 2025.
          </p>
        </header>

        {/* --- GRID THỐNG KÊ (Top Section) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
          
          {/* CỘT TRÁI: Các thẻ nhỏ */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            {/* Card 1 */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between h-full hover:shadow-md transition-shadow duration-300">
              <div>
                <Heart className="w-5 h-5 text-[#1A4D2E] fill-current mb-3" />
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                  Trẻ em được hỗ trợ
                </p>
                <p className={`text-3xl text-[#1A4D2E] ${playfair.className}`}>5,280+</p>
              </div>
              <p className="text-[10px] text-gray-400 mt-2 font-light">Số liệu cập nhật thời gian thực từ hiện trường.</p>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between h-full hover:shadow-md transition-shadow duration-300">
              <div>
                <GraduationCap className="w-5 h-5 text-[#1A4D2E] mb-3" />
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                  Dự án hoàn thành
                </p>
                <p className={`text-3xl text-[#1A4D2E] ${playfair.className}`}>124</p>
              </div>
              <p className="text-[10px] text-gray-400 mt-2 font-light">Cơ sở vật chất & trang thiết bị giáo dục.</p>
            </div>

             {/* Card 3 */}
             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow duration-300">
               <div className="bg-gray-50 p-2.5 rounded-full">
                  <MapPin className="w-5 h-5 text-[#1A4D2E]" />
               </div>
               <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">
                    Độ phủ tác động
                  </p>
                  <p className="text-lg font-medium text-[#1A4D2E]">28 Tỉnh thành</p>
               </div>
            </div>
          </div>

          {/* CỘT PHẢI: Thẻ quyên góp lớn */}
          <div className="lg:col-span-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 h-full flex flex-col items-center justify-center text-center relative overflow-hidden group">
              
              {/* Nhãn trên cùng */}
              <div className="absolute top-8 border border-gray-200 px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest text-gray-500 uppercase bg-gray-50/50">
                Ước tính quyên góp năm 2025
              </div>

              {/* Số tiền lớn - Dùng font Playfair để số đẹp hơn */}
              <div className="mt-12 mb-2 flex items-baseline justify-center flex-wrap gap-2">
                <span className="text-5xl md:text-6xl font-bold text-[#1A4D2E] tracking-tight">
                  5,560,875,448
                </span>
                <span className={`text-2xl md:text-3xl text-gray-400 italic ${playfair.className}`}>VND</span>
              </div>
              
              <p className="text-xs text-gray-400 mb-8 font-light italic px-4">
                Năm tỷ năm trăm sáu mươi triệu tám trăm bảy mươi lăm ngàn bốn trăm bốn mươi tám đồng.
              </p>

              {/* Thanh tiến trình (Progress Bar) */}
              <div className="w-full max-w-2xl px-4">
                <div className="flex justify-between text-[10px] font-bold text-gray-500 uppercase mb-2">
                  <span className="text-[#1A4D2E]">Đã đạt: 74%</span>
                  <span>Mục tiêu: 7,500,000,000 VND</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-[#1A4D2E] h-full rounded-full transition-all duration-1000 ease-out" 
                    style={{ width: "74%" }}
                  ></div>
                </div>
              </div>

              {/* Nút bấm và Bảo mật */}
              <div className="mt-10 flex flex-col sm:flex-row items-center gap-5">
                <Link
              href="/donate"
              className="hidden sm:block bg-[#1a522e] text-white px-8 py-3 rounded-full font-bold hover:bg-[#133f24] hover:shadow-lg transition shadow-md"
            >
              Quyên góp ngay
            </Link>
                <div className="flex items-center gap-2 text-[10px] text-gray-400 font-medium uppercase tracking-wider">
                   <Lock className="w-3 h-3" />
                   Bảo mật bởi Blockchain Ledger
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- DANH SÁCH NHÀ HẢO TÂM (AUTO SCROLL) --- */}
        <div className="w-full bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
          <div className="flex justify-between items-end mb-6 border-b border-gray-100 pb-4">
              <h3 className={`text-2xl text-[#1A4D2E] italic ${playfair.className}`}>Danh sách Nhà hảo tâm</h3>
              <button className="text-[10px] font-bold uppercase tracking-wider text-gray-400 hover:text-[#1A4D2E] transition-colors mb-1">
                Xem tất cả
              </button>
          </div>

          {/* Container chứa hiệu ứng cuộn - Có class 'scroll-container' để xử lý hover pause */}
          <div className="relative h-[320px] overflow-hidden mask-gradient-vertical scroll-container">
              
              {/* Wrapper Animation */}
              <div className="animate-vertical-scroll flex flex-col">
                  {/* Render mảng DONORS 2 lần để tạo vòng lặp vô tận liền mạch */}
                  {[...DONORS, ...DONORS].map((donor, index) => (
                      <div 
                        key={`${donor.id}-${index}`} 
                        className="flex items-center justify-between py-4 px-4 rounded-lg hover:bg-[#F9F7F2] transition-colors group cursor-default border-b border-gray-50 last:border-0"
                      >
                          {/* Thông tin trái */}
                          <div className="flex items-center gap-4">
                              <div className="relative">
                                {/* AVATAR GIỮ NGUYÊN MÀU (Đã xóa grayscale) */}
                                <img 
                                    src={donor.avatar} 
                                    alt={donor.name} 
                                    className="w-11 h-11 rounded-full object-cover transition-all border border-gray-100" 
                                />
                              </div>
                              <div>
                                  <p className="text-sm font-bold text-gray-800 group-hover:text-[#1A4D2E] transition-colors">{donor.name}</p>
                                  <p className="text-xs text-gray-500 italic mt-0.5">{donor.message}</p>
                                  <p className="text-[10px] text-gray-400 mt-1 font-mono">{donor.time}</p>
                              </div>
                          </div>
                          {/* Thông tin phải (Số tiền) */}
                          <div className="text-right">
                              <p className="text-sm font-bold text-[#1A4D2E]">{donor.amount}</p>
                              <p className="text-[10px] text-gray-300 font-mono mt-1 group-hover:text-gray-500 transition-colors">{donor.hash}</p>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}