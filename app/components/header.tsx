'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown, ChevronRight, Menu, X } from 'lucide-react';
import { useState } from 'react';

const NavLink = ({ href, children, onClick }: { href: string; children: React.ReactNode; onClick: () => void }) => (
  <Link href={href} onClick={onClick} className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-[#1a522e]">
    {children}
  </Link>
);

const Accordion = ({ title, children }: { title: string; children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center px-4 py-3 text-left font-bold text-gray-700"
      >
        {title}
        <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
      </button>
      {isOpen && <div className="pl-4 pb-2">{children}</div>}
    </div>
  );
};

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

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

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-10">
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
             <div className="relative group">
              <button className="text-gray-700 font-bold hover:text-[#1a522e] transition flex items-center gap-1">
                Liên hệ
                <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute top-full left-0 pt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="bg-white rounded-lg shadow-lg border border-gray-100 py-2">
                  <Link href="/quyTrinh" className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-[#1a522e]">
                    Liên hệ chung
                  </Link>
                  <Link href="/voluteer" className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-[#1a522e]">
                    Đăng kí tình nguyện viên
                  </Link>
                </div>
              </div>
            </div>
          </nav>

          <div className="flex items-center">
            <Link
              href="/donate"
              className="hidden sm:block bg-[#1a522e] text-white px-8 py-3 rounded-full font-bold hover:bg-[#133f24] hover:shadow-lg transition shadow-md"
            >
              Quyên góp ngay
            </Link>
            {/* Mobile Menu Button */}
            <div className="lg:hidden ml-4">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={closeMenu}></div>
      )}
      <div
        className={`fixed top-0 right-0 h-full w-4/5 max-w-sm bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-4">
          <button onClick={closeMenu} className="float-right">
            <X size={28} />
          </button>
        </div>
        <nav className="mt-8">
          <Accordion title="Về chúng tôi">
            <NavLink href="/about" onClick={closeMenu}>Tầm nhìn - Sứ Mệnh - Giá trị cốt lõi</NavLink>
            <NavLink href="/about/team" onClick={closeMenu}>Đội ngũ sáng lập</NavLink>
          </Accordion>
          <Accordion title="Dự án">
            <NavLink href="/du-an/ho-tro-phat-trien-giao-duc" onClick={closeMenu}>Hỗ trợ phát triển giáo dục</NavLink>
            <NavLink href="/du-an/ho-tro-y-te-va-suc-khoe" onClick={closeMenu}>Hỗ trợ y tế và sức khoẻ</NavLink>
            <NavLink href="/du-an/bac-ai-xa-hoi" onClick={closeMenu}>Bác ái xã hội</NavLink>
            <NavLink href="/project" onClick={closeMenu}>Gây quỹ</NavLink>
          </Accordion>
          <Accordion title="Tin tức & Tài liệu">
            <NavLink href="/news" onClick={closeMenu}>Tin tức</NavLink>
            <NavLink href="/impact" onClick={closeMenu}>Câu chuyện tác động</NavLink>
            <NavLink href="/reports" onClick={closeMenu}>Báo cáo</NavLink>
          </Accordion>
          <Accordion title="Hướng dẫn">
            <NavLink href="/guide" onClick={closeMenu}>Hướng dẫn tra cứu</NavLink>
            <NavLink href="/donation-guide" onClick={closeMenu}>Hướng dẫn quyên góp</NavLink>
          </Accordion>
          <Accordion title="Liên hệ">
            <NavLink href="/quyTrinh" onClick={closeMenu}>Liên hệ chung</NavLink>
            <NavLink href="/voluteer" onClick={closeMenu}>Đăng kí tình nguyện viên</NavLink>
          </Accordion>
          <div className="p-4 mt-4">
            <Link
              href="/donate"
              onClick={closeMenu}
              className="block text-center bg-[#1a522e] text-white px-8 py-3 rounded-full font-bold hover:bg-[#133f24] hover:shadow-lg transition shadow-md"
            >
              Quyên góp ngay
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}