import React from "react";
import { Crown, Ticket, FileText, Gift, CheckCircle2, Download, Image as ImageIcon, Camera } from "lucide-react";

// Định nghĩa lại interface (hoặc import từ file types chung)
interface UserProps {
  fullName?: string;
  rank?: string; // Ví dụ: "Gold", "Silver", "New"
  points?: number;
  [key: string]: any;
}

export default function LoyaltyTab({ user }: { user: UserProps }) {
  // Logic giả lập để hiển thị hạng (Thực tế sẽ lấy từ user.rank)
  const currentRank = user.rank || "Đại sứ Nhân ái";

  return (
    <div className="space-y-8">
       
       {/* 1. HERO BANNER */}
       <div className="bg-gradient-to-r from-[#065F46] to-[#10B981] rounded-3xl p-8 md:p-12 text-white relative overflow-hidden shadow-xl">
         {/* Background Decor */}
         <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl"></div>
         <div className="absolute bottom-0 left-0 w-40 h-40 bg-emerald-400/20 rounded-full translate-y-1/2 -translate-x-1/3 blur-2xl"></div>
         
         <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
               <span className="inline-block px-3 py-1 bg-[#FBBF24] text-yellow-900 text-[10px] font-bold rounded-full uppercase mb-4 shadow-sm tracking-wide">
                  Hạng hiện tại
               </span>
               <h2 className="text-3xl md:text-4xl font-serif font-bold mb-3 flex items-center gap-3">
                  <Crown className="fill-[#FBBF24] text-[#FBBF24]" size={36} /> 
                  {currentRank} <span className="text-emerald-200 font-sans text-2xl font-normal">(Hạng Vàng)</span>
               </h2>
               <p className="text-emerald-50 text-sm max-w-xl leading-relaxed">
                  Cảm ơn <strong>{user.fullName || "bạn"}</strong> đã đồng hành cùng Quỹ. Bạn đang sở hữu trọn bộ quyền lợi và đặc quyền cao cấp nhất dành cho nhà hảo tâm.
               </p>
            </div>
            
            {/* Circle Badge */}
            <div className="w-20 h-20 rounded-full border-2 border-white/20 bg-white/5 backdrop-blur-md flex flex-col items-center justify-center text-center shadow-lg">
               <span className="text-xs font-bold text-white uppercase">Top</span>
               <span className="text-[10px] text-emerald-200">Rank</span>
            </div>
         </div>
       </div>

       {/* 2. ĐẶC QUYỀN CỦA BẠN */}
       <div>
         <h3 className="font-bold text-[#1A4D2E] text-lg mb-6 flex items-center gap-2">
            <span className="bg-emerald-100 text-emerald-600 w-6 h-6 rounded-full flex items-center justify-center text-xs">★</span> Đặc quyền của bạn
         </h3>
         
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group cursor-pointer relative overflow-hidden">
               <div className="absolute top-0 right-0 w-16 h-16 bg-purple-50 rounded-bl-full -mr-8 -mt-8 transition-all group-hover:scale-150"></div>
               <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mb-4 relative z-10">
                  <Ticket size={24} />
               </div>
               <h4 className="font-bold text-gray-800 text-sm mb-2">Vé mời Gala Night</h4>
               <p className="text-xs text-gray-500 leading-relaxed mb-4 min-h-[40px]">
                  Tham dự tiệc tri ân cuối năm tại khách sạn 5 sao, gặp gỡ các nhà hảo tâm hàng đầu.
               </p>
               <button className="text-[10px] font-bold text-purple-600 uppercase tracking-wider hover:underline flex items-center gap-1">
                  Xem chi tiết →
               </button>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group cursor-pointer relative overflow-hidden">
               <div className="absolute top-0 right-0 w-16 h-16 bg-teal-50 rounded-bl-full -mr-8 -mt-8 transition-all group-hover:scale-150"></div>
               <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center mb-4 relative z-10">
                  <FileText size={24} />
               </div>
               <h4 className="font-bold text-gray-800 text-sm mb-2">Chứng nhận Cao cấp</h4>
               <p className="text-xs text-gray-500 leading-relaxed mb-4 min-h-[40px]">
                  Bộ chứng nhận bản cứng mạ vàng và bản PDF vĩnh viễn được lưu trữ an toàn.
               </p>
               <button className="text-[10px] font-bold text-teal-600 uppercase tracking-wider hover:underline flex items-center gap-1">
                  Yêu cầu gửi bản cứng →
               </button>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group cursor-pointer relative overflow-hidden">
               <div className="absolute top-0 right-0 w-16 h-16 bg-orange-50 rounded-bl-full -mr-8 -mt-8 transition-all group-hover:scale-150"></div>
               <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center mb-4 relative z-10">
                  <Gift size={24} />
               </div>
               <h4 className="font-bold text-gray-800 text-sm mb-2">Quà tri ân đặc biệt</h4>
               <p className="text-xs text-gray-500 leading-relaxed mb-4 min-h-[40px]">
                  Nhận quà tặng giới hạn (áo, kỷ niệm chương) vào dịp sinh nhật và các ngày lễ lớn.
               </p>
               <button className="text-[10px] font-bold text-orange-600 uppercase tracking-wider hover:underline flex items-center gap-1">
                  Cập nhật địa chỉ →
               </button>
            </div>
         </div>
       </div>

       {/* 3. BỘ NHẬN DIỆN ĐẠI SỨ */}
       <div>
         <div className="flex justify-between items-end mb-4">
            <h3 className="font-bold text-[#1A4D2E] text-lg flex items-center gap-2">
               <span className="bg-blue-100 text-blue-600 w-6 h-6 rounded-full flex items-center justify-center text-xs">⬇</span> Bộ nhận diện Đại sứ
            </h3>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded border border-emerald-100">DÀNH RIÊNG CHO VIP</span>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Avatar Frame */}
            <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl border border-gray-200 flex items-center gap-6 shadow-sm">
               <div className="relative w-20 h-20 rounded-full bg-gray-200 border-4 border-yellow-400 shadow-md flex items-center justify-center shrink-0">
                  <span className="text-xs text-gray-400">Avatar</span>
                  <div className="absolute bottom-0 right-0 bg-emerald-500 w-6 h-6 rounded-full flex items-center justify-center text-white border-2 border-white">
                     <CheckCircle2 size={12} />
                  </div>
               </div>
               <div>
                  <h4 className="font-bold text-gray-800 text-sm">Khung Avatar VIP</h4>
                  <p className="text-xs text-gray-500 mb-3 mt-1">Tự động áp dụng khung cho Facebook/Zalo</p>
                  <button className="bg-gray-800 text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-black transition flex items-center gap-2">
                     <Camera size={14} /> Tạo ảnh ngay
                  </button>
               </div>
            </div>

            {/* Wallpapers */}
            <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl border border-gray-200 flex items-center gap-6 shadow-sm">
               <div className="w-20 h-20 rounded-xl bg-emerald-800 flex items-center justify-center text-white/50 shrink-0 shadow-md">
                  <ImageIcon size={32} />
               </div>
               <div>
                  <h4 className="font-bold text-gray-800 text-sm">Bộ hình nền 4K</h4>
                  <p className="text-xs text-gray-500 mb-3 mt-1">Trọn bộ hình nền cho Desktop & Mobile</p>
                  <button className="bg-white border border-gray-300 text-gray-700 text-xs font-bold px-4 py-2 rounded-lg hover:bg-gray-50 transition flex items-center gap-2">
                     <Download size={14} /> Tải xuống ZIP
                  </button>
               </div>
            </div>
         </div>
       </div>

       {/* 4. BẢNG SO SÁNH (Table) */}
       <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
         <div className="text-center mb-10">
            <h3 className="font-bold text-gray-800 text-lg">Bảng so sánh quyền lợi</h3>
            <p className="text-xs text-gray-400 mt-1">Nâng hạng để mở khóa thêm nhiều đặc quyền</p>
         </div>

         <div className="overflow-x-auto">
            <table className="w-full text-sm">
               <thead>
                  <tr className="border-b border-gray-100">
                     <th className="text-left py-4 px-4 text-xs font-bold text-gray-400 uppercase tracking-wider w-1/3">Quyền lợi thành viên</th>
                     <th className="py-4 px-4 text-center text-gray-400 font-medium text-xs uppercase">Người gieo mầm</th>
                     <th className="py-4 px-4 text-center text-emerald-600 font-bold text-xs uppercase">Nụ hồng xanh</th>
                     <th className="py-4 px-4 text-center align-bottom">
                        <div className="bg-emerald-50 border border-emerald-100 rounded-t-xl py-3 px-4 relative top-[1px] shadow-sm">
                           <span className="text-emerald-800 font-bold text-xs uppercase flex flex-col items-center justify-center gap-1">
                              <Crown size={16} className="fill-[#FBBF24] text-[#FBBF24]"/> 
                              Đại sứ Nhân ái
                              <span className="bg-[#FBBF24] text-yellow-900 text-[8px] px-1.5 rounded font-extrabold">Hạng Vàng</span>
                           </span>
                        </div>
                     </th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-50">
                  {[
                     { name: "Thư cảm ơn & Chứng nhận Digital", r1: true, r2: true, r3: true },
                     { name: "Báo cáo tác động định kỳ", r1: false, r2: true, r3: true },
                     { name: "Vinh danh trên Website", r1: false, r2: true, r3: true },
                     { name: "Vé mời Gala Night thường niên", r1: false, r2: false, r3: true },
                     { name: "Huy hiệu Vàng & Quà tặng sinh nhật", r1: false, r2: false, r3: true },
                  ].map((row, idx) => (
                     <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                        <td className="py-5 px-4 text-gray-600 font-medium">{row.name}</td>
                        <td className="py-5 px-4 text-center text-gray-300">{row.r1 ? <CheckCircle2 size={18} className="mx-auto text-gray-400" /> : "-"}</td>
                        <td className="py-5 px-4 text-center">{row.r2 ? <CheckCircle2 size={18} className="mx-auto text-emerald-500" /> : "-"}</td>
                        <td className="py-5 px-4 text-center bg-emerald-50/30 border-x border-emerald-50">
                           {row.r3 ? <div className="w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto shadow-md shadow-emerald-200"><CheckCircle2 size={14} /></div> : "-"}
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
       </div>
    </div>
  );
}