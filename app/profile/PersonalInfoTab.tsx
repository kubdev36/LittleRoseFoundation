import React, { useState } from "react";
import { User, Mail, Phone, MapPin, Camera, Save, Eye, EyeOff, Globe, Shield } from "lucide-react";

// FIX 2: Định nghĩa kiểu dữ liệu rõ ràng thay vì 'any'
interface UserProps {
  fullName?: string;
  email?: string;
  phone?: string;
  dob?: string;
  address?: string;
}

export default function PersonalInfoTab({ user }: { user: UserProps }) {
  const [formData, setFormData] = useState({
    fullName: user.fullName || "",
    email: user.email || "",
    phone: user.phone || "",
    dob: user.dob || "1990-01-01", // Format chuẩn cho input date
    address: user.address || "Số 123, Đường ABC, Quận 1, TP. Hồ Chí Minh"
  });

  const [privacy, setPrivacy] = useState("public");

  return (
    <div className="space-y-8">
      
      {/* 1. Header Card */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-8">
         <div className="relative group">
            <div className="w-24 h-24 bg-emerald-600 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-emerald-200">
               {formData.fullName?.charAt(0).toUpperCase() || "U"}
            </div>
            <button className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md border border-gray-100 text-gray-600 hover:text-emerald-600 transition">
               <Camera size={16} />
            </button>
         </div>
         <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2 justify-center md:justify-start">
               {formData.fullName || "Người dùng"} 
               <span className="text-[10px] bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full border border-blue-200">verified</span>
            </h2>
            <p className="text-sm text-yellow-600 font-bold uppercase tracking-wider mb-1">Crown Đại sứ nhân ái</p>
            <p className="text-xs text-gray-400">Thành viên từ 2023</p>
         </div>
      </div>

      {/* 2. Form Card */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
         <h3 className="font-bold text-[#1A4D2E] flex items-center gap-2 mb-6 pb-4 border-b border-gray-50">
            <User size={18} className="text-emerald-500" /> Thông tin cơ bản
         </h3>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
               {/* FIX 1: Thêm htmlFor */}
               <label htmlFor="fullName" className="text-xs font-bold text-gray-500 uppercase">Họ và tên</label>
               <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200 focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-500 transition">
                  <User size={18} className="text-gray-400" />
                  {/* FIX 1: Thêm id tương ứng */}
                  <input 
                    id="fullName"
                    type="text" 
                    value={formData.fullName} 
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    className="bg-transparent w-full text-sm font-medium text-gray-700 focus:outline-none"
                  />
               </div>
            </div>

            <div className="space-y-2">
               <label htmlFor="dob" className="text-xs font-bold text-gray-500 uppercase">Ngày sinh</label>
               <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200">
                  <input 
                    id="dob"
                    type="date" 
                    value={formData.dob}
                    onChange={(e) => setFormData({...formData, dob: e.target.value})}
                    className="bg-transparent w-full text-sm font-medium text-gray-700 focus:outline-none" 
                  />
               </div>
            </div>

            <div className="space-y-2">
               <label htmlFor="email" className="text-xs font-bold text-gray-500 uppercase">Email</label>
               <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200 bg-gray-100 cursor-not-allowed">
                  <Mail size={18} className="text-gray-400" />
                  <input 
                    id="email"
                    type="email" 
                    value={formData.email} 
                    disabled 
                    className="bg-transparent w-full text-sm font-medium text-gray-500 focus:outline-none cursor-not-allowed" 
                  />
               </div>
            </div>

            <div className="space-y-2">
               <label htmlFor="phone" className="text-xs font-bold text-gray-500 uppercase">Số điện thoại</label>
               <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200 focus-within:border-emerald-500 transition">
                  <Phone size={18} className="text-gray-400" />
                  <input 
                    id="phone"
                    type="tel" 
                    value={formData.phone} 
                    onChange={(e) => setFormData({...formData, phone: e.target.value})} 
                    className="bg-transparent w-full text-sm font-medium text-gray-700 focus:outline-none" 
                  />
               </div>
            </div>
         </div>

         <div className="space-y-2 mb-8">
            <label htmlFor="address" className="text-xs font-bold text-gray-500 uppercase">Địa chỉ liên hệ</label>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200 focus-within:border-emerald-500 transition">
               <MapPin size={18} className="text-gray-400" />
               <input 
                 id="address"
                 type="text" 
                 value={formData.address} 
                 onChange={(e) => setFormData({...formData, address: e.target.value})} 
                 className="bg-transparent w-full text-sm font-medium text-gray-700 focus:outline-none" 
               />
            </div>
            <p className="text-[10px] text-gray-400 italic mt-1">* Địa chỉ này sẽ được sử dụng để gửi thư mời, quà tặng tri ân.</p>
         </div>

         {/* 3. QUYỀN RIÊNG TƯ */}
         <div className="pt-8 border-t border-gray-50">
            <h3 className="font-bold text-[#1A4D2E] flex items-center gap-2 mb-4">
               <Eye size={18} className="text-blue-500" /> Quyền riêng tư quyên góp
            </h3>
            <p className="text-xs text-gray-400 mb-4">Tùy chỉnh cách tên của bạn xuất hiện trên các bảng vàng danh dự.</p>

            <div className="space-y-3">
               <label 
                 className={`flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-all relative overflow-hidden ${
                   privacy === "public" 
                   ? "border-emerald-500 bg-emerald-50/30 ring-1 ring-emerald-500" 
                   : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                 }`}
               >
                  <div className="mt-1">
                     <input 
                       type="radio" 
                       name="privacy" 
                       checked={privacy === "public"} 
                       onChange={() => setPrivacy("public")}
                       className="w-4 h-4 text-emerald-600 focus:ring-emerald-500 accent-emerald-600"
                     />
                  </div>
                  <div className="flex-1">
                     <h4 className={`text-sm font-bold mb-1 ${privacy === "public" ? "text-emerald-700" : "text-gray-700"}`}>Công khai danh tính</h4>
                     <p className="text-xs text-gray-500 leading-relaxed">
                        Tuyệt vời! Tên và hình ảnh đại diện của bạn sẽ xuất hiện trên bảng vàng danh dự.
                     </p>
                  </div>
                  <Globe size={20} className={`absolute right-4 top-4 ${privacy === "public" ? "text-emerald-500" : "text-gray-300"}`} />
               </label>

               <label 
                 className={`flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-all relative overflow-hidden ${
                   privacy === "anonymous" 
                   ? "border-gray-400 bg-gray-50 ring-1 ring-gray-400" 
                   : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                 }`}
               >
                  <div className="mt-1">
                     <input 
                       type="radio" 
                       name="privacy" 
                       checked={privacy === "anonymous"} 
                       onChange={() => setPrivacy("anonymous")}
                       className="w-4 h-4 text-gray-600 focus:ring-gray-500 accent-gray-600"
                     />
                  </div>
                  <div className="flex-1">
                     <h4 className={`text-sm font-bold mb-1 ${privacy === "anonymous" ? "text-gray-800" : "text-gray-700"}`}>Ủng hộ ẩn danh</h4>
                     <p className="text-xs text-gray-500 leading-relaxed">
                        Thông tin cá nhân của bạn sẽ được bảo mật tuyệt đối.
                     </p>
                  </div>
                  <EyeOff size={20} className={`absolute right-4 top-4 ${privacy === "anonymous" ? "text-gray-500" : "text-gray-300"}`} />
               </label>
            </div>
         </div>

         <div className="flex justify-end gap-3 pt-8 mt-4 border-t border-gray-50">
            <button className="text-sm font-bold text-gray-500 px-4 py-2 hover:bg-gray-50 rounded-lg transition">Hủy bỏ</button>
            <button className="bg-emerald-600 text-white px-6 py-2.5 rounded-lg font-bold shadow-md hover:bg-emerald-700 transition flex items-center gap-2">
               <Save size={16} /> Lưu thay đổi
            </button>
         </div>
      </div>
    </div>
  );
}