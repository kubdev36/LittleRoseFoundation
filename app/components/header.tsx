'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown, Menu, X, LogIn, User, LogOut, Heart, Trophy } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Sub-component cho Link trong Mobile Menu
const NavLink = ({ href, children, onClick }: { href: string; children: React.ReactNode; onClick: () => void }) => (
  <Link href={href} onClick={onClick} className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-[#1a522e]">
    {children}
  </Link>
);

// Sub-component Accordion cho Mobile Menu
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
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // --- STATE QUẢN LÝ USER ---
  const [user, setUser] = useState<any>(null); // Lưu thông tin user đã đăng nhập
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false); // Trạng thái đóng/mở menu user

  const closeMenu = () => setIsMenuOpen(false);

  // --- [PHẦN QUAN TRỌNG ĐÃ SỬA] ---
  useEffect(() => {
    // Hàm này sẽ chạy mỗi khi cần kiểm tra lại user
    const checkLoginStatus = () => {
      if (typeof window !== 'undefined') {
        const storedUser = localStorage.getItem('current_user');
        if (storedUser) {
          try {
            setUser(JSON.parse(storedUser));
          } catch (error) {
            console.error("Lỗi parse user data:", error);
            localStorage.removeItem('current_user');
            setUser(null);
          }
        } else {
          setUser(null);
        }
      }
    };

    // 1. Chạy ngay lần đầu tải trang
    checkLoginStatus();

    // 2. Lắng nghe sự kiện "user-login" từ trang Auth bắn sang
    window.addEventListener("user-login", checkLoginStatus);
    
    // 3. Lắng nghe sự kiện storage (để đồng bộ nếu mở nhiều tab)
    window.addEventListener("storage", checkLoginStatus);

    // Cleanup: Gỡ bỏ sự kiện khi component bị hủy
    return () => {
      window.removeEventListener("user-login", checkLoginStatus);
      window.removeEventListener("storage", checkLoginStatus);
    };
  }, []);

  // --- [PHẦN ĐÃ SỬA] Xử lý đăng xuất ---
  const handleLogout = () => {
    localStorage.removeItem('current_user'); // Xóa session
    setUser(null); // Reset state
    setIsUserMenuOpen(false); // Đóng menu
    
    // Bắn sự kiện để cập nhật lại Header (trong trường hợp logout từ nơi khác)
    if (typeof window !== 'undefined') {
       window.dispatchEvent(new Event("user-login"));
    }

    router.push('/auth'); // Chuyển hướng về trang đăng nhập
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm py-3">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* 1. LOGO */}
          <div className="flex items-center flex-shrink-0">
            <Link href="/" className="relative w-32 h-14 block">
              <Image
                src="/images/logo.png"
                alt="Little Roses Foundation"
                fill
                className="object-contain"
                priority
              />
            </Link>
          </div>

          {/* 2. DESKTOP NAVIGATION */}
          <nav className="hidden xl:flex items-center space-x-12">
            
             <div className="relative group h-full flex items-center">
              <button className="text-gray-700 font-bold hover:text-[#1a522e] transition flex items-center gap-1 py-2">
                Về chúng tôi <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute top-full left-0 pt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50">
                <div className="bg-white rounded-lg shadow-xl border border-gray-100 py-2 overflow-hidden">
                  <Link href="/about" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-green-50 hover:text-[#1a522e]">Tầm nhìn - Sứ Mệnh</Link>
                  <Link href="/about/team" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-green-50 hover:text-[#1a522e]">Đội ngũ sáng lập</Link>
                </div>
              </div>
            </div>
            
            <div className="relative group h-full flex items-center">
              <button className="text-gray-700 font-bold hover:text-[#1a522e] transition flex items-center gap-1 py-2">
                Dự án <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute top-full left-0 pt-2 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50">
                <div className="bg-white rounded-lg shadow-xl border border-gray-100 py-2 overflow-hidden">
                  <Link href="/du-an/ho-tro-phat-trien-giao-duc" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-green-50 hover:text-[#1a522e]">Hỗ trợ giáo dục</Link>
                  <Link href="/du-an/ho-tro-y-te-va-suc-khoe" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-green-50 hover:text-[#1a522e]">Hỗ trợ y tế</Link>
                  <Link href="/du-an/bac-ai-xa-hoi" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-green-50 hover:text-[#1a522e]">Bác ái xã hội</Link>
                  <Link href="/project" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-green-50 hover:text-[#1a522e] font-medium text-emerald-600">Gây quỹ cộng đồng</Link>
                </div>
              </div>
            </div>

            <div className="relative group h-full flex items-center">
              <button className="text-gray-700 font-bold hover:text-[#1a522e] transition flex items-center gap-1 py-2">
                Tin tức & Tài liệu <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute top-full left-0 pt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50">
                <div className="bg-white rounded-lg shadow-xl border border-gray-100 py-2 overflow-hidden">
                  <Link href="/news" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-green-50 hover:text-[#1a522e]">Tin tức</Link>
                  <Link href="/impact" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-green-50 hover:text-[#1a522e]">Câu chuyện tác động</Link>
                  <Link href="/reports" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-green-50 hover:text-[#1a522e]">Báo cáo</Link>
                </div>
              </div>
            </div>

            <div className="relative group h-full flex items-center">
              <button className="text-gray-700 font-bold hover:text-[#1a522e] transition flex items-center gap-1 py-2">
                Hướng dẫn <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute top-full left-0 pt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50">
                <div className="bg-white rounded-lg shadow-xl border border-gray-100 py-2 overflow-hidden">
                  <Link href="/guide" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-green-50 hover:text-[#1a522e]">Tra cứu thông tin</Link>
                  <Link href="/donation-guide" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-green-50 hover:text-[#1a522e]">Hướng dẫn quyên góp</Link>
                </div>
              </div>
            </div>

            <div className="relative group h-full flex items-center">
              <button className="text-gray-700 font-bold hover:text-[#1a522e] transition flex items-center gap-1 py-2">
                Liên hệ <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute top-full left-0 pt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50">
                <div className="bg-white rounded-lg shadow-xl border border-gray-100 py-2 overflow-hidden">
                  <Link href="/quyTrinh" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-green-50 hover:text-[#1a522e]">Liên hệ chung</Link>
                  <Link href="/voluteer" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-green-50 hover:text-[#1a522e]">Đăng kí tình nguyện viên</Link>
                </div>
              </div>
            </div>
          </nav>

          {/* 3. RIGHT ACTIONS */}
          <div className="flex items-center gap-6">
            
            {/* ICON CÚP */}
            <Link 
              href="/hall-of-fame"
              className="hidden lg:flex items-center justify-center w-10 h-10 rounded-full text-gray-500 hover:text-yellow-600 hover:bg-yellow-50 transition-all"
              title="Bảng vinh danh"
            >
              <Trophy size={22} strokeWidth={2} />
            </Link>

            <Link
              href="/donate"
              className="hidden sm:block bg-[#1a522e] text-white px-8 py-3 rounded-full text-sm font-bold hover:bg-[#133f24] hover:shadow-lg transition shadow-md active:scale-95"
            >
              Quyên góp ngay
            </Link>

            {/* --- LOGIC HIỂN THỊ USER HOẶC NÚT ĐĂNG NHẬP --- */}
            {user ? (
              <div className="relative hidden lg:block">
                <button 
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center justify-center p-1 rounded-full hover:bg-gray-100 transition border border-transparent hover:border-gray-200"
                  title={user.fullName}
                >
                  {/* Avatar: Chữ cái đầu */}
                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-[#1a522e] flex items-center justify-center font-bold text-lg border-2 border-white shadow-sm ring-1 ring-gray-100">
                    {user.fullName ? user.fullName.charAt(0).toUpperCase() : 'U'}
                  </div>
                  
                  {/* Mũi tên nhỏ */}
                  <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm border border-gray-200">
                     <ChevronDown className={`w-3 h-3 text-gray-500 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                  </div>
                </button>

                {/* Dropdown Menu User */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 top-full mt-3 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-2 animate-in fade-in slide-in-from-top-2 duration-200 overflow-hidden z-[60]">
                    {/* Header menu user */}
                    <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/50">
                      <p className="text-sm font-bold text-gray-800 truncate">{user.fullName}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                    
                    {/* Các mục menu */}
                    <Link href="/profile" onClick={() => setIsUserMenuOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-green-50 hover:text-[#1a522e]">
                      <User size={16} /> Hồ sơ cá nhân
                    </Link>
                    
                    <div className="h-px bg-gray-100 my-1"></div>
                    
                    {/* Nút Đăng xuất */}
                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 font-medium text-left"
                    >
                      <LogOut size={16} /> Đăng xuất
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Nếu chưa đăng nhập: Hiện nút Đăng ký/Đăng nhập */
              <Link 
                href="/auth" 
                className="hidden lg:flex items-center gap-2 group text-gray-500 hover:text-[#1a522e] transition-colors"
              >
                <LogIn className="w-5 h-5 text-red-500 group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
                <span className="text-sm font-medium">Đăng ký / Đăng nhập</span>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <div className="xl:hidden ml-2">
              <button 
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="text-gray-700 hover:text-[#1a522e] p-2"
              >
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 4. MOBILE MENU DRAWER */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 xl:hidden backdrop-blur-sm transition-opacity" onClick={closeMenu}></div>
      )}
      <div
        className={`fixed top-0 right-0 h-full w-[85%] max-w-sm bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out xl:hidden ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
                <span className="font-bold text-lg text-[#1a522e]">Menu</span>
                <button onClick={closeMenu} className="p-2 text-gray-500 hover:text-red-500 transition-colors">
                    <X size={24} />
                </button>
            </div>

            <nav className="flex-1 overflow-y-auto py-4">
                {/* Mobile User Menu */}
                {user && (
                  <Accordion title={`Xin chào, ${user.fullName}`}>
                     <NavLink href="/profile" onClick={closeMenu}>Hồ sơ cá nhân</NavLink>
                     
                     <button onClick={() => { handleLogout(); closeMenu(); }} className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50">Đăng xuất</button>
                  </Accordion>
                )}

                <Link 
                  href="/hall-of-fame" 
                  onClick={closeMenu}
                  className="flex items-center gap-2 px-4 py-3 border-b border-gray-100 text-gray-700 font-bold hover:text-[#1a522e] hover:bg-green-50"
                >
                   <Trophy size={20} className="text-yellow-600" /> Bảng vinh danh
                </Link>

                <Accordion title="Về chúng tôi">
                    <NavLink href="/about" onClick={closeMenu}>Tầm nhìn - Sứ Mệnh</NavLink>
                    <NavLink href="/about/team" onClick={closeMenu}>Đội ngũ sáng lập</NavLink>
                </Accordion>
                {/* ... Các accordion khác ... */}
                <Accordion title="Dự án">
                    <NavLink href="/du-an/ho-tro-phat-trien-giao-duc" onClick={closeMenu}>Hỗ trợ giáo dục</NavLink>
                    <NavLink href="/du-an/ho-tro-y-te-va-suc-khoe" onClick={closeMenu}>Hỗ trợ y tế</NavLink>
                    <NavLink href="/du-an/bac-ai-xa-hoi" onClick={closeMenu}>Bác ái xã hội</NavLink>
                    <NavLink href="/project" onClick={closeMenu}>Gây quỹ cộng đồng</NavLink>
                </Accordion>
                
                <Accordion title="Tin tức & Tài liệu">
                    <NavLink href="/news" onClick={closeMenu}>Tin tức</NavLink>
                    <NavLink href="/impact" onClick={closeMenu}>Câu chuyện tác động</NavLink>
                    <NavLink href="/reports" onClick={closeMenu}>Báo cáo</NavLink>
                </Accordion>
                
                <Accordion title="Hướng dẫn">
                    <NavLink href="/guide" onClick={closeMenu}>Tra cứu thông tin</NavLink>
                    <NavLink href="/donation-guide" onClick={closeMenu}>Hướng dẫn quyên góp</NavLink>
                </Accordion>
                
                <Accordion title="Liên hệ">
                    <NavLink href="/quyTrinh" onClick={closeMenu}>Liên hệ chung</NavLink>
                    <NavLink href="/voluteer" onClick={closeMenu}>Đăng kí tình nguyện viên</NavLink>
                </Accordion>
            </nav>

            <div className="p-6 border-t border-gray-100 bg-gray-50 space-y-4">
                <Link
                    href="/donate"
                    onClick={closeMenu}
                    className="block w-full text-center bg-[#1a522e] text-white px-4 py-3 rounded-xl font-bold hover:bg-[#133f24] transition shadow-md active:scale-95"
                >
                    Quyên góp ngay
                </Link>

                {!user && (
                  <Link 
                    href="/auth"
                    onClick={closeMenu}
                    className="flex items-center justify-center gap-2 w-full text-center text-gray-600 font-medium hover:text-[#1a522e] transition py-2"
                  >
                    <LogIn className="w-5 h-5 text-red-500" strokeWidth={2.5} />
                    Đăng ký / Đăng nhập
                  </Link>
                )}
            </div>
        </div>
      </div>
    </header>
  );
}