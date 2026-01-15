"use client";

import React, { useState } from "react";
import { Facebook, Chrome, Settings } from "lucide-react"; 
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true); // true = Tab Đăng nhập, false = Tab Đăng ký
  const [isLoading, setIsLoading] = useState(false);

  // State lưu dữ liệu form
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
  });

  // Xử lý khi nhập liệu
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- XỬ LÝ ĐĂNG KÝ (Kết nối JSON Server) ---
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // 1. Kiểm tra email đã tồn tại chưa
      const checkRes = await fetch(`http://localhost:3001/users?email=${formData.email}`);
      const checkData = await checkRes.json();

      if (checkData.length > 0) {
        alert("Email này đã được đăng ký! Vui lòng sử dụng email khác.");
        setIsLoading(false);
        return;
      }

      // 2. Gửi dữ liệu để lưu vào file db.json
      const res = await fetch("http://localhost:3001/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: Date.now().toString(), // Tạo ID duy nhất
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          createdAt: new Date().toISOString(),
        }),
      });

      if (res.ok) {
        alert("Đăng ký thành công! Vui lòng đăng nhập.");
        // Chuyển sang tab đăng nhập
        setIsLogin(true);
        // Xóa thông tin mật khẩu để người dùng nhập lại
        setFormData(prev => ({ ...prev, password: "" }));
      } else {
        alert("Đăng ký thất bại. Vui lòng thử lại.");
      }
    } catch (error) {
      console.error(error);
      alert("Lỗi kết nối tới JSON Server. Bạn đã chạy lệnh 'npx json-server' chưa?");
    } finally {
      setIsLoading(false);
    }
  };

  // --- XỬ LÝ ĐĂNG NHẬP (Kết nối JSON Server) ---
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Tìm user có email và password khớp trong db.json
      const res = await fetch(
        `http://localhost:3001/users?email=${formData.email}&password=${formData.password}`
      );
      const data = await res.json();

      if (data.length > 0) {
        const user = data[0]; // Lấy user đầu tiên tìm thấy
        
        // 1. Lưu phiên đăng nhập vào localStorage
        localStorage.setItem("current_user", JSON.stringify(user));
        
        // 2. [FIX] Bắn sự kiện để Header cập nhật ngay lập tức
        window.dispatchEvent(new Event("user-login"));

        alert(`Đăng nhập thành công! Xin chào ${user.fullName}`);
        
        // 3. Chuyển hướng về trang chủ
        router.push("/");
      } else {
        alert("Email hoặc mật khẩu không chính xác!");
      }
    } catch (error) {
      console.error(error);
      alert("Lỗi kết nối server. Hãy kiểm tra JSON Server.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center font-sans py-10 px-4">
      <div className="w-full max-w-[450px] bg-white rounded-3xl shadow-xl p-8 md:p-12 relative overflow-hidden">
        
        {/* Header Logo */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3">
             <Settings className="animate-spin-slow" />
          </div>
          <h1 className="text-xl font-bold text-gray-800 uppercase tracking-wide">Quỹ Hoa Hồng Nhỏ</h1>
          <p className="text-xs text-gray-400 mt-1">Gieo mầm tri thức, gặt hái tương lai</p>
        </div>

        {/* Tabs Switcher */}
        <div className="flex border-b border-gray-100 mb-8">
          <button
            type="button"
            onClick={() => setIsLogin(true)}
            className={`flex-1 pb-3 text-sm font-bold transition-all relative ${
              isLogin ? "text-gray-800" : "text-gray-400 hover:text-gray-600"
            }`}
          >
            Đăng nhập
            {isLogin && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-500 rounded-t-full"></span>}
          </button>
          <button
            type="button"
            onClick={() => setIsLogin(false)}
            className={`flex-1 pb-3 text-sm font-bold transition-all relative ${
              !isLogin ? "text-gray-800" : "text-gray-400 hover:text-gray-600"
            }`}
          >
            Đăng ký
            {!isLogin && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-500 rounded-t-full"></span>}
          </button>
        </div>

        {/* FORM CONTAINER */}
        <form onSubmit={isLogin ? handleLogin : handleRegister} className="space-y-5">
          
          {/* TRƯỜNG: HỌ TÊN (Chỉ hiện khi Đăng ký) */}
          {!isLogin && (
            <div className="space-y-1 animate-in fade-in slide-in-from-top-2 duration-300">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Họ và tên</label>
              <input
                type="text"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Nguyễn Văn An"
                className="w-full border-b border-gray-200 py-2 text-sm text-gray-700 focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-gray-300"
              />
            </div>
          )}

          {/* TRƯỜNG: EMAIL */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Email</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              placeholder="an.nguyen@example.com"
              className="w-full border-b border-gray-200 py-2 text-sm text-gray-700 focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-gray-300"
            />
          </div>

          {/* TRƯỜNG: SỐ ĐIỆN THOẠI (Chỉ hiện khi Đăng ký) */}
          {!isLogin && (
            <div className="space-y-1 animate-in fade-in slide-in-from-top-2 duration-300">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Số điện thoại</label>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="0901234567"
                className="w-full border-b border-gray-200 py-2 text-sm text-gray-700 focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-gray-300"
              />
            </div>
          )}

          {/* TRƯỜNG: MẬT KHẨU */}
          <div className="space-y-1 relative">
            <div className="flex justify-between">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Mật khẩu</label>
                {isLogin && <a href="#" className="text-[10px] text-emerald-500 hover:underline">Quên?</a>}
            </div>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleInputChange}
              placeholder="••••••••"
              className="w-full border-b border-gray-200 py-2 text-sm text-gray-700 focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-gray-300"
            />
          </div>

          {/* CHECKBOX ĐIỀU KHOẢN (Chỉ hiện khi Đăng ký) */}
          {!isLogin && (
            <div className="flex items-center gap-2 pt-2 animate-in fade-in duration-300">
              <input type="checkbox" required className="accent-emerald-500 w-3 h-3 cursor-pointer" />
              <p className="text-[10px] text-gray-400">
                Tôi đồng ý với <a href="#" className="text-emerald-500 hover:underline">Điều khoản</a> và <a href="#" className="text-emerald-500 hover:underline">Chính sách bảo mật</a>
              </p>
            </div>
          )}

          {/* NÚT SUBMIT */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-emerald-500 text-white font-bold py-3 rounded-lg hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20 active:scale-[0.98] text-sm mt-4 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              isLogin ? "Tiếp tục" : "Đăng ký tài khoản"
            )}
          </button>

        </form>

        {/* SOCIAL LOGIN */}
        <div className="mt-8">
          <div className="relative flex justify-center text-xs text-gray-400 mb-5">
            <span className="bg-white px-2 relative z-10">HOẶC {isLogin ? "" : "ĐĂNG KÝ"} VỚI</span>
            <div className="absolute top-1/2 left-0 w-full h-px bg-gray-100 -z-0"></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button type="button" className="flex items-center justify-center gap-2 border border-gray-100 py-2.5 rounded-lg text-xs font-bold text-gray-600 hover:bg-gray-50 transition-colors">
              <Chrome size={16} className="text-blue-500" /> Google
            </button>
            <button type="button" className="flex items-center justify-center gap-2 border border-gray-100 py-2.5 rounded-lg text-xs font-bold text-gray-600 hover:bg-gray-50 transition-colors">
              <Facebook size={16} className="text-[#1877F2]" /> Facebook
            </button>
          </div>
        </div>

        {/* Footer Text */}
        <div className="text-center mt-8">
            <p className="text-[10px] text-gray-300">© 2024 QUỸ HOA HỒNG NHỎ. ALL RIGHTS RESERVED.</p>
        </div>

      </div>
    </div>
  );
}