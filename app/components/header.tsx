'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown, ChevronRight } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="relative w-32 h-16">
              <Image
                src="/images/logo.png"
                alt="Little Roses Foundation"
                fill
                className="object-contain"
              />
            </Link>
            
          </div>

          <nav className="hidden md:flex items-center space-x-10">
            <div className="relative group">
              <button className="text-gray-700 font-bold hover:text-[#1a522e] transition flex items-center gap-1">
                Về chúng tôi
                <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute top-full left-0 pt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="bg-white rounded-lg shadow-lg border border-gray-100 py-2">
                  <Link href="/about" className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-[#1a522e]">
                    Tầm nhìn - Sứ Mệnh - Giá trị cốt lõi
                  </Link>
                  <div className="relative group/team">
                    <Link href="/about/team" className="flex items-center justify-between px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-[#1a522e]">
                      Đội ngũ sáng lập
                     
                    </Link>
                   
                  </div>
                </div>
              </div>
            </div>
            <div className="relative group">
              <button className="text-gray-700 font-bold hover:text-[#1a522e] transition flex items-center gap-1">
                Dự án
                <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute top-full left-0 pt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="bg-white rounded-lg shadow-lg border border-gray-100 py-2">
                  <Link href="/du-an/ho-tro-phat-trien-giao-duc" className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-[#1a522e]">
                    Hỗ trợ phát triển giáo dục
                  </Link>
                  <Link href="/du-an/ho-tro-y-te-va-suc-khoe" className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-[#1a522e]">
                    Hỗ trợ y tế và sức khoẻ
                  </Link>
                  <Link href="/du-an/bac-ai-xa-hoi" className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-[#1a522e]">
                    Bác ái xã hội
                  </Link>
                  <Link href="/project" className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-[#1a522e]">
                    Gây quỹ
                  </Link>
                </div>
              </div>
            </div>
           
            <div className="relative group">
              <button className="text-gray-700 font-bold hover:text-[#1a522e] transition flex items-center gap-1">
                Tin tức & Tài liệu
                <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute top-full left-0 pt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="bg-white rounded-lg shadow-lg border border-gray-100 py-2">
                  <Link href="/news" className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-[#1a522e]">
                    Tin tức
                  </Link>
                  <Link href="/impact" className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-[#1a522e]">
                    Câu chuyện tác động
                  </Link>
                  <Link href="/reports" className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-[#1a522e]">
                    Báo cáo
                  </Link>
                </div>
              </div>
            </div>
            <div className="relative group">
              <button className="text-gray-700 font-bold hover:text-[#1a522e] transition flex items-center gap-1">
                Hướng dẫn
                <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute top-full left-0 pt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="bg-white rounded-lg shadow-lg border border-gray-100 py-2">
                  <Link href="/guide" className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-[#1a522e]">
                    Hướng dẫn tra cứu
                  </Link>
                  <Link href="/donation-guide" className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-[#1a522e]">
                    Hướng dẫn quyên góp
                  </Link>
                </div>
              </div>
            </div>
          </nav>

          <Link
            href="/donate"
           className="bg-[#1a522e] text-white px-8 py-3 rounded-full font-bold hover:bg-[#133f24] hover:shadow-lg transition shadow-md"
>
                Quyên góp ngay
          </Link>
        </div>
      </div>
    </header>
  );
}