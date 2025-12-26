'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck, ChevronDown, ChevronRight } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white shadow-sm py-4">
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
              <button className="text-gray-700 font-bold hover:text-[#257341] transition flex items-center gap-1">
                Về chúng tôi
                <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute top-full left-0 pt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="bg-white rounded-lg shadow-lg border border-gray-100 py-2">
                  <Link href="/about" className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-[#257341]">
                    Tầm nhìn - Sứ Mệnh - Giá trị cốt lõi
                  </Link>
                  <div className="relative group/team">
                    <Link href="/about/team" className="flex items-center justify-between px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-[#257341]">
                      Đội ngũ sáng lập
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                    <div className="absolute left-full top-0 w-56 opacity-0 invisible group-hover/team:opacity-100 group-hover/team:visible transition-all duration-200 z-50">
                      <div className="bg-white rounded-lg shadow-lg border border-gray-100 py-2 ml-1">
                        <Link href="/about/team" className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-[#257341]">
                          Hội đồng quản lý
                        </Link>
                        <Link href="/about/supervisory-board" className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-[#257341]">
                          Ban kiểm soát
                        </Link>
                        <Link href="/about/advisory-board" className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-[#257341]">
                          Ban cố vấn
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative group">
              <button className="text-gray-700 font-bold hover:text-[#257341] transition flex items-center gap-1">
                Dự án
                <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute top-full left-0 pt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="bg-white rounded-lg shadow-lg border border-gray-100 py-2">
                  <Link href="/du-an/ho-tro-phat-trien-giao-duc" className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-[#257341]">
                    Hỗ trợ phát triển giáo dục
                  </Link>
                  <Link href="/du-an/ho-tro-y-te-va-suc-khoe" className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-[#257341]">
                    Hỗ trợ y tế và sức khoẻ
                  </Link>
                  <Link href="/du-an/bac-ai-xa-hoi" className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-[#257341]">
                    Bác ái xã hội
                  </Link>
                  <Link href="/project" className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-[#257341]">
                    Gây quỹ
                  </Link>
                </div>
              </div>
            </div>
            <Link href="#" className="text-gray-700 font-bold hover:text-[#257341] transition flex items-center gap-1">
              Minh bạch
              <ShieldCheck className="w-4 h-4 text-[#257341]" />
            </Link>
            <div className="relative group">
              <button className="text-gray-700 font-bold hover:text-[#257341] transition flex items-center gap-1">
                Tin tức & Tài liệu
                <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute top-full left-0 pt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="bg-white rounded-lg shadow-lg border border-gray-100 py-2">
                  <Link href="/news" className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-[#257341]">
                    Tin tức
                  </Link>
                  <Link href="/impact" className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-[#257341]">
                    Câu chuyện tác động
                  </Link>
                  <Link href="/reports" className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-[#257341]">
                    Báo cáo
                  </Link>
                </div>
              </div>
            </div>
            <div className="relative group">
              <button className="text-gray-700 font-bold hover:text-[#257341] transition flex items-center gap-1">
                Hướng dẫn
                <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute top-full left-0 pt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="bg-white rounded-lg shadow-lg border border-gray-100 py-2">
                  <Link href="/guide" className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-[#257341]">
                    Hướng dẫn tra cứu
                  </Link>
                  <Link href="/donation-guide" className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-[#257341]">
                    Hướng dẫn quyên góp
                  </Link>
                </div>
              </div>
            </div>
          </nav>

          <Link
            href="/donate"
            className="bg-[linear-gradient(to_right,#05e652_0%,#05e652_100%)] text-black px-8 py-3 rounded-full font-bold hover:bg-none hover:bg-[#1a522e] hover:text-white transition shadow-md"
          >
            Quyên góp ngay
          </Link>
        </div>
      </div>
    </header>
  );
}