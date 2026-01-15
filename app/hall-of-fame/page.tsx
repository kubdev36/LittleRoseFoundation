"use client";

import React, { useState, useEffect } from "react";
import { 
  Trophy, Search, Crown, 
  TrendingUp, Heart, Flower2, ChevronLeft, ChevronRight, LogIn 
} from "lucide-react";
import Link from "next/link"; // Import Link để dẫn tới trang login

// --- MOCK DATA ---
const TOP_GIVERS = [
  { id: 1, name: "Trần Thị B", title: "Nhà Hảo Tâm Kim Cương", amount: "50.000.000đ", rank: 1, avatarColor: "bg-yellow-100 text-yellow-600" },
  { id: 2, name: "Lê Văn C", title: "Đại Sứ Vàng", amount: "35.000.000đ", rank: 2, avatarColor: "bg-gray-100 text-gray-600" },
  { id: 3, name: "Phạm Thị D", title: "Đại Sứ Bạc", amount: "28.000.000đ", rank: 3, avatarColor: "bg-orange-100 text-orange-600" },
];

const LEADERBOARD_DATA = [
  { id: 1, name: "Trần Thị B", title: "Đại Sứ Kim Cương", flowerLevel: "Nở rực rỡ", flowerColor: "text-red-500", badge: "Kim cương", badgeColor: "bg-purple-100 text-purple-600", amount: "50.000.000đ", avatar: "B" },
  { id: 2, name: "Lê Văn C", title: "Đại Sứ Vàng", flowerLevel: "Đang nở", flowerColor: "text-pink-500", badge: "Vàng", badgeColor: "bg-yellow-100 text-yellow-600", amount: "35.000.000đ", avatar: "C" },
  { id: 3, name: "Phạm Thị D", title: "Đại Sứ Bạc", flowerLevel: "Chớm nở", flowerColor: "text-emerald-500", badge: "Bạc", badgeColor: "bg-gray-100 text-gray-600", amount: "28.000.000đ", avatar: "D" },
  { id: 4, name: "Nguyễn Văn E", title: "Thành viên Tích cực", flowerLevel: "Nụ xanh", flowerColor: "text-green-500", badge: "Thân thiết", badgeColor: "bg-green-100 text-green-600", amount: "15.000.000đ", avatar: "E" },
  // Dòng của User hiện tại sẽ được thêm vào nếu đã login và tìm thấy trong list
];

export default function HallOfFamePage() {
  const [activeTab, setActiveTab] = useState("month");
  const [user, setUser] = useState<any>(null); // State lưu thông tin user

  // Kiểm tra đăng nhập
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("current_user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, []);

  // Giả lập dữ liệu bảng xếp hạng có chứa user (hoặc không)
  // Trong thực tế, bạn sẽ fetch API và trả về list có user nếu user nằm trong top hoặc user đã login
  const displayData = user 
    ? [...LEADERBOARD_DATA, { id: 42, name: `${user.fullName} (Bạn)`, title: "Đại Sứ Nhân Ái", flowerLevel: "Hoa nở rộ", flowerColor: "text-emerald-600", badge: "Verified", badgeColor: "bg-blue-100 text-blue-600", amount: "12.500.000đ", avatar: user.fullName?.charAt(0) || "U", isMe: true }] 
    : LEADERBOARD_DATA;

  return (
    <div className="min-h-screen bg-[#FDFBF7] py-12 px-4 font-sans text-gray-800">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER */}
        <div className="text-center mb-12">
           <h1 className="text-4xl md:text-5xl font-serif text-[#1A4D2E] mb-3 font-bold">Hall of Fame</h1>
           <p className="text-gray-500 text-sm md:text-base max-w-2xl mx-auto">
             Vinh danh những trái tim nhân ái đã lan tỏa yêu thương mạnh mẽ nhất cùng Quỹ Hoa Hồng Nhỏ.
           </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* === LEFT COLUMN (WIDGETS) === */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* 1. TOP GIVERS WIDGET */}
            <div className="bg-[#FFFBEB] border border-yellow-100 p-6 rounded-3xl relative overflow-hidden">
               <div className="flex items-center gap-2 mb-6 relative z-10">
                  <Trophy className="text-yellow-500 fill-yellow-500" size={24} />
                  <div>
                     <h3 className="font-bold text-yellow-800 text-sm uppercase tracking-wider">Top Givers</h3>
                     <p className="text-xs text-yellow-600 font-bold">THÁNG 10</p>
                  </div>
               </div>
               <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-200 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50"></div>
               <div className="space-y-4 relative z-10">
                  {TOP_GIVERS.map((giver) => (
                     <div key={giver.id} className="flex items-center gap-3 bg-white/60 p-3 rounded-xl border border-yellow-100/50 backdrop-blur-sm">
                        <div className="relative">
                           <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${giver.avatarColor}`}>
                              {giver.name.charAt(0)}
                           </div>
                           <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white border-2 border-white
                              ${giver.rank === 1 ? 'bg-yellow-400' : giver.rank === 2 ? 'bg-gray-400' : 'bg-orange-400'}
                           `}>
                              {giver.rank}
                           </div>
                        </div>
                        <div className="flex-1">
                           <h4 className="text-sm font-bold text-gray-800">{giver.name}</h4>
                           <p className="text-[10px] text-gray-500 uppercase">{giver.title}</p>
                        </div>
                        <span className="text-xs font-bold text-[#1A4D2E]">{giver.amount}</span>
                     </div>
                  ))}
               </div>
            </div>

            {/* 2. USER RANK WIDGET (CHỈ HIỆN KHI ĐÃ LOGIN) */}
            {user ? (
                <div className="bg-[#009F6B] text-white p-6 rounded-3xl relative overflow-hidden shadow-lg shadow-emerald-200 animate-in fade-in slide-in-from-bottom-4">
                   <div className="relative z-10">
                      <h3 className="text-xs font-bold text-emerald-100 uppercase mb-4 tracking-wider">Thứ hạng của bạn</h3>
                      
                      <div className="flex items-end gap-2 mb-2">
                         <span className="text-5xl font-serif font-bold">#42</span>
                         <span className="text-sm text-emerald-100 mb-2">/ 1,204 thành viên</span>
                      </div>
                      
                      <p className="text-xs text-emerald-50 mb-6 leading-relaxed">
                         Chào <strong>{user.fullName}</strong>, bạn nằm trong top 5% nhà hảo tâm tích cực nhất tháng này!
                      </p>
    
                      <div className="bg-white/10 rounded-xl p-4 flex items-center justify-between backdrop-blur-md border border-white/10">
                         <div>
                            <p className="text-[10px] text-emerald-200 uppercase font-bold">Điểm cống hiến</p>
                            <p className="text-xl font-bold">1,250 XP</p>
                         </div>
                         <div className="w-10 h-10 bg-white text-[#009F6B] rounded-full flex items-center justify-center">
                            <TrendingUp size={20} />
                         </div>
                      </div>
                   </div>
                   <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
                </div>
            ) : (
                /* HIỆN KHỐI KHUYẾN KHÍCH ĐĂNG NHẬP NẾU CHƯA LOGIN */
                <div className="bg-white border border-dashed border-gray-300 p-6 rounded-3xl text-center relative overflow-hidden">
                    <div className="relative z-10">
                        <div className="w-12 h-12 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-3">
                            <Crown size={24} />
                        </div>
                        <h3 className="font-bold text-gray-700 mb-1">Bạn đang đứng ở đâu?</h3>
                        <p className="text-xs text-gray-500 mb-4 px-2">
                            Đăng nhập để xem thứ hạng và huy hiệu đóng góp của riêng bạn.
                        </p>
                        <Link href="/auth" className="inline-flex items-center justify-center gap-2 w-full bg-white border border-gray-200 text-gray-700 py-2.5 rounded-xl font-bold text-sm hover:bg-gray-50 hover:text-[#1A4D2E] hover:border-emerald-200 transition">
                            <LogIn size={16} /> Đăng nhập ngay
                        </Link>
                    </div>
                </div>
            )}

            {/* 3. CTA WIDGET */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 text-center">
               <div className="w-12 h-12 bg-pink-50 text-pink-500 rounded-full flex items-center justify-center mx-auto mb-3 animate-bounce-slow">
                  <Heart size={24} fill="currentColor" />
               </div>
               <h3 className="font-bold text-gray-800 mb-1">Tiếp tục hành trình</h3>
               <p className="text-xs text-gray-500 mb-4 px-4">
                  Mỗi đóng góp nhỏ đều mang lại tác động lớn. Cùng thăng hạng ngay hôm nay.
               </p>
               <Link href="/donate" className="block w-full bg-[#1A4D2E] text-white py-3 rounded-xl font-bold hover:bg-[#143d24] transition shadow-md shadow-emerald-900/10">
                  Quyên góp ngay
               </Link>
            </div>

          </div>

          {/* === RIGHT COLUMN (LEADERBOARD TABLE) === */}
          <div className="lg:col-span-8 space-y-6">
             
             {/* Toolbar */}
             <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="bg-white p-1 rounded-xl border border-gray-100 flex shadow-sm w-full md:w-auto">
                   {['month', 'year', 'all'].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex-1 md:flex-none
                           ${activeTab === tab ? 'bg-emerald-50 text-[#1A4D2E]' : 'text-gray-400 hover:text-gray-600'}
                        `}
                      >
                         {tab === 'month' ? 'Tháng này' : tab === 'year' ? 'Năm nay' : 'Tất cả'}
                      </button>
                   ))}
                </div>

                <div className="relative w-full md:w-64">
                   <input 
                     type="text" 
                     placeholder="Tìm kiếm thành viên..." 
                     className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-100 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition"
                   />
                   <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
             </div>

             {/* Main Table Card */}
             <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-white to-gray-50/50">
                   <h3 className="font-bold text-[#1A4D2E] flex items-center gap-2">
                      <Crown size={18} className="text-yellow-500 fill-yellow-500" /> Bảng Xếp Hạng Cộng Đồng
                   </h3>
                   <span className="text-[10px] text-gray-400 italic flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Cập nhật: 10 phút trước
                   </span>
                </div>

                <div className="overflow-x-auto">
                   <table className="w-full text-sm">
                      <thead className="bg-gray-50/50 text-[10px] font-bold text-gray-400 uppercase">
                         <tr>
                            <th className="px-6 py-4 text-left">Hạng</th>
                            <th className="px-6 py-4 text-left">Thành viên</th>
                            <th className="px-6 py-4 text-center">Cấp độ hoa</th>
                            <th className="px-6 py-4 text-center">Huy hiệu</th>
                            <th className="px-6 py-4 text-right">Tổng đóng góp</th>
                         </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                         {displayData.map((row, idx) => (
                            <tr 
                              key={row.id} 
                              className={`group transition-colors ${row.isMe ? 'bg-emerald-50/30 border-l-4 border-emerald-500' : 'hover:bg-gray-50'}`}
                            >
                               {/* Rank */}
                               <td className="px-6 py-4">
                                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs
                                     ${idx === 0 ? 'bg-yellow-100 text-yellow-600' : 
                                       idx === 1 ? 'bg-gray-100 text-gray-600' : 
                                       idx === 2 ? 'bg-orange-100 text-orange-600' : 
                                       row.isMe ? 'bg-emerald-100 text-emerald-600' : 'text-gray-400'}
                                  `}>
                                     {row.isMe ? row.id : idx + 1}
                                  </div>
                               </td>

                               {/* Member Info */}
                               <td className="px-6 py-4">
                                  <div className="flex items-center gap-3">
                                     <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-sm
                                        ${row.isMe ? 'bg-[#1A4D2E]' : 'bg-gray-300'}
                                     `}>
                                        {row.avatar}
                                     </div>
                                     <div>
                                        <p className={`font-bold text-sm ${row.isMe ? 'text-[#1A4D2E]' : 'text-gray-800'}`}>
                                           {row.name}
                                        </p>
                                        <p className="text-[10px] text-gray-500 uppercase">{row.title}</p>
                                     </div>
                                  </div>
                               </td>

                               {/* Flower Level */}
                               <td className="px-6 py-4 text-center">
                                  <div className="flex items-center justify-center gap-2">
                                     <Flower2 size={16} className={row.flowerColor} />
                                     <span className={`text-xs font-bold ${row.flowerColor}`}>{row.flowerLevel}</span>
                                  </div>
                               </td>

                               {/* Badge */}
                               <td className="px-6 py-4 text-center">
                                  <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide border border-transparent ${row.badgeColor}`}>
                                     {row.badge}
                                  </span>
                               </td>

                               {/* Amount */}
                               <td className="px-6 py-4 text-right">
                                  <span className="font-bold text-[#1A4D2E]">{row.amount}</span>
                               </td>
                            </tr>
                         ))}
                      </tbody>
                   </table>
                </div>

                <div className="p-4 border-t border-gray-100 flex justify-between items-center">
                   <p className="text-xs text-gray-400">Hiển thị 1-5 trong số 1,204 thành viên</p>
                   <div className="flex gap-2">
                      <button className="w-8 h-8 rounded-lg border border-gray-100 flex items-center justify-center text-gray-400 hover:bg-gray-50 hover:text-[#1A4D2E] transition"><ChevronLeft size={16}/></button>
                      <button className="w-8 h-8 rounded-lg bg-[#1A4D2E] text-white flex items-center justify-center text-xs font-bold shadow-md shadow-emerald-200">1</button>
                      <button className="w-8 h-8 rounded-lg border border-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-50 text-xs font-medium">2</button>
                      <button className="w-8 h-8 rounded-lg border border-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-50 text-xs font-medium">3</button>
                      <button className="w-8 h-8 rounded-lg border border-gray-100 flex items-center justify-center text-gray-400 hover:bg-gray-50 hover:text-[#1A4D2E] transition"><ChevronRight size={16}/></button>
                   </div>
                </div>
             </div>

          </div>
        </div>
      </div>
    </div>
  );
}