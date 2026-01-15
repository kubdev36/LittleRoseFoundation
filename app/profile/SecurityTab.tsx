import React from "react";
import { Shield, Smartphone, EyeOff, Laptop, Monitor, LogOut } from "lucide-react";

export default function SecurityTab() {
  return (
    <div className="space-y-10 font-sans">
       {/* Header */}
       <div>
          <h2 className="text-3xl font-bold text-[#1A4D2E]">Bảo mật & Quyền riêng tư</h2>
          <p className="text-gray-500 text-sm mt-2 font-medium">Quản lý mật khẩu, bảo vệ tài khoản và kiểm soát quyền riêng tư dữ liệu của bạn.</p>
       </div>

       {/* Change Password */}
       <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-start gap-5 mb-8">
             <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 shrink-0 border border-emerald-100">
                <Shield size={22} strokeWidth={2.5} />
             </div>
             <div>
                <h3 className="text-lg font-bold text-gray-800 mb-1">Đổi mật khẩu</h3>
                <p className="text-sm text-gray-500 font-medium">Vui lòng sử dụng mật khẩu mạnh bao gồm chữ hoa, chữ thường và số.</p>
             </div>
          </div>

          <form className="space-y-6 max-w-3xl" onSubmit={(e) => e.preventDefault()}>
             <div className="space-y-2">
                {/* FIX LỖI 1: Thêm htmlFor */}
                <label htmlFor="current-pass" className="text-xs font-bold text-gray-400 uppercase tracking-wider">Mật khẩu hiện tại</label>
                <div className="relative group">
                   {/* FIX LỖI 1: Thêm id tương ứng */}
                   <input 
                     id="current-pass"
                     type="password" 
                     placeholder="Nhập mật khẩu hiện tại" 
                     className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-800 focus:outline-none focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 transition-all placeholder:text-gray-400 placeholder:font-normal" 
                   />
                   <EyeOff size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-600 transition-colors" />
                </div>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                   <label htmlFor="new-pass" className="text-xs font-bold text-gray-400 uppercase tracking-wider">Mật khẩu mới</label>
                   <input 
                     id="new-pass"
                     type="password" 
                     placeholder="Nhập mật khẩu mới" 
                     className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-800 focus:outline-none focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 transition-all placeholder:text-gray-400 placeholder:font-normal" 
                   />
                </div>
                <div className="space-y-2">
                   <label htmlFor="confirm-pass" className="text-xs font-bold text-gray-400 uppercase tracking-wider">Xác nhận mật khẩu</label>
                   <input 
                     id="confirm-pass"
                     type="password" 
                     placeholder="Nhập lại mật khẩu mới" 
                     className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-800 focus:outline-none focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 transition-all placeholder:text-gray-400 placeholder:font-normal" 
                   />
                </div>
             </div>

             <div className="flex justify-end pt-4">
                <button type="submit" className="bg-emerald-600 text-white px-8 py-3 rounded-xl font-bold text-sm shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 hover:shadow-emerald-600/30 transition-all flex items-center gap-2 transform active:scale-95">
                   <Shield size={18} /> Cập nhật mật khẩu
                </button>
             </div>
          </form>
       </div>

       {/* 2FA & Privacy Settings */}
       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 2FA */}
          <div className="bg-white p-7 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between hover:border-emerald-200 transition-colors duration-300">
             <div>
                <div className="flex justify-between items-start mb-5">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center border border-blue-100"><Shield size={18} strokeWidth={2.5} /></div>
                       <h4 className="font-bold text-gray-800 text-base">Xác thực 2 yếu tố (2FA)</h4>
                    </div>
                    {/* Toggle Button Inactive */}
                    <div className="w-11 h-6 bg-gray-200 rounded-full relative cursor-pointer hover:bg-gray-300 transition-colors">
                        <div className="w-4 h-4 bg-white rounded-full absolute top-1 left-1 shadow-sm"></div>
                    </div>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed mb-6 font-medium">
                    Tăng cường bảo mật cho tài khoản bằng cách yêu cầu mã xác nhận qua điện thoại khi đăng nhập trên thiết bị lạ.
                </p>
             </div>
             <button className="text-emerald-600 text-sm font-bold hover:text-emerald-700 hover:underline text-left flex items-center gap-1 transition-colors">
                Thiết lập số điện thoại →
             </button>
          </div>

          {/* Card Privacy */}
          <div className="bg-white p-7 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between hover:border-emerald-200 transition-colors duration-300">
             <div>
                <div className="flex justify-between items-start mb-5">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 bg-pink-50 text-pink-600 rounded-full flex items-center justify-center border border-pink-100"><Smartphone size={18} strokeWidth={2.5} /></div>
                       <h4 className="font-bold text-gray-800 text-base">Hiển thị Vườn hồng</h4>
                    </div>
                    {/* Toggle Button Active */}
                    <div className="w-11 h-6 bg-emerald-500 rounded-full relative cursor-pointer hover:bg-emerald-600 transition-colors shadow-inner">
                        <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1 shadow-sm"></div>
                    </div>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed mb-6 font-medium">
                    Cho phép các nhà hảo tâm khác nhìn thấy quá trình nuôi dưỡng hoa hồng và các huy hiệu thành tích của bạn trên bảng vàng.
                </p>
             </div>
             <button className="text-emerald-600 text-sm font-bold hover:text-emerald-700 hover:underline text-left flex items-center gap-1 transition-colors">
                Xem trước trang công khai →
             </button>
          </div>
       </div>

       {/* LỊCH SỬ ĐĂNG NHẬP */}
       <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-8 border-b border-gray-50 pb-4">
             <h3 className="font-bold text-gray-800 flex items-center gap-3 text-lg">
                <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600"><Laptop size={20} strokeWidth={2.5} /></div>
                Lịch sử đăng nhập
             </h3>
             <button className="text-[11px] font-extrabold text-red-500 border border-red-100 bg-red-50 px-4 py-2 rounded-lg hover:bg-red-500 hover:text-white transition-all uppercase tracking-wider">
                Đăng xuất tất cả
             </button>
          </div>

          <div className="space-y-3">
             {/* Current Session */}
             <div className="flex items-center gap-5 p-5 bg-emerald-50/40 rounded-2xl border border-emerald-100 hover:shadow-sm transition-all">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-emerald-600 border border-emerald-100 shadow-sm shrink-0">
                   <Monitor size={22} strokeWidth={2} />
                </div>
                <div className="flex-1">
                   <div className="flex items-center gap-3 mb-1">
                      <p className="text-base font-bold text-gray-800">Windows PC - Chrome</p>
                      <span className="text-[10px] font-extrabold bg-green-100 text-green-700 px-2 py-0.5 rounded border border-green-200 uppercase tracking-wide">Hiện tại</span>
                   </div>
                   <p className="text-xs text-gray-500 font-medium">Hà Nội, Việt Nam • <span className="text-emerald-600">Đang hoạt động</span></p>
                </div>
             </div>

             {/* Other Session 1 */}
             <div className="flex items-center gap-5 p-5 hover:bg-gray-50 rounded-2xl transition-all group border border-transparent hover:border-gray-100">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 shrink-0 group-hover:bg-white group-hover:shadow-sm group-hover:text-gray-700 transition-all">
                   <Smartphone size={22} strokeWidth={2} />
                </div>
                <div className="flex-1">
                   <p className="text-base font-bold text-gray-700 group-hover:text-gray-900 transition-colors">iPhone 14 Pro - Safari</p>
                   <p className="text-xs text-gray-400 mt-1 font-medium group-hover:text-gray-500">TP. Hồ Chí Minh • 2 giờ trước</p>
                </div>
                <button className="p-2.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-all opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0" aria-label="Đăng xuất thiết bị này">
                   <LogOut size={18} strokeWidth={2.5} />
                </button>
             </div>

             {/* Other Session 2 */}
             <div className="flex items-center gap-5 p-5 hover:bg-gray-50 rounded-2xl transition-all group border border-transparent hover:border-gray-100">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 shrink-0 group-hover:bg-white group-hover:shadow-sm group-hover:text-gray-700 transition-all">
                   <Laptop size={22} strokeWidth={2} />
                </div>
                <div className="flex-1">
                   <p className="text-base font-bold text-gray-700 group-hover:text-gray-900 transition-colors">MacBook Pro - Safari</p>
                   <p className="text-xs text-gray-400 mt-1 font-medium group-hover:text-gray-500">Đà Nẵng, Việt Nam • 1 ngày trước</p>
                </div>
                <button className="p-2.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-all opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0" aria-label="Đăng xuất thiết bị này">
                   <LogOut size={18} strokeWidth={2.5} />
                </button>
             </div>
          </div>
       </div>

    </div>
  );
}