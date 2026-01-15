import React from "react";
import { Wallet, FolderOpen, Heart, Award, Download, ArrowRight, LucideIcon } from "lucide-react";
import Image from "next/image"; 

// --- CÁC COMPONENT CON (Đảm bảo đường dẫn import đúng) ---
// import FlowerGarden from "./components/FlowerGarden"; 
// Nếu chưa có file riêng, bạn có thể comment dòng import trên và dùng tạm placeholder bên dưới
import FlowerGarden from "./components/FlowerGarden"; // Ví dụ: Lấy từ file ở bước trước

// Component StatCard (Nếu bạn chưa tách file thì dùng cái này)
const StatCard = ({ label, value, unit, icon: Icon, color, bg }: any) => (
  <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${bg} ${color}`}>
      <Icon size={24} />
    </div>
    <div>
      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{label}</p>
      <div className="flex items-baseline gap-1">
        <h4 className="text-xl font-bold text-gray-800">{value}</h4>
        <span className="text-xs font-medium text-gray-500">{unit}</span>
      </div>
    </div>
  </div>
);

export default function DashboardTab({ user }: { user: any }) {
  const stats = [
    { label: "TỔNG ĐÓNG GÓP", value: "12.500.000", unit: "VND", icon: Wallet, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "DỰ ÁN", value: "08", unit: "Chiến dịch", icon: FolderOpen, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "TÁC ĐỘNG", value: "120", unit: "Bữa ăn", icon: Heart, color: "text-pink-600", bg: "bg-pink-50" },
    { label: "HUY HIỆU ĐÃ ĐẠT", value: "Grass Verified", unit: "Stars", icon: Award, color: "text-yellow-600", bg: "bg-yellow-50" },
  ];

  const suggestedProjects = [
    {
      id: 1,
      category: "GIÁO DỤC",
      title: "Tiếp sức đến trường cho trẻ em nghèo",
      progress: 75,
      raised: "150.000.000đ",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=500&auto=format&fit=crop&q=60", 
    },
    {
      id: 2,
      category: "Y TẾ",
      title: "Ánh sáng cho người cao tuổi",
      progress: 40,
      raised: "60.000.000đ",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=500&auto=format&fit=crop&q=60",
    },
  ];

  return (
    <div className="space-y-8">
      
      {/* 1. Header Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <StatCard key={idx} {...stat} />
        ))}
      </div>

      {/* 2. Vườn hồng (Import từ RoseEvolutionGallery ở bước trước) */}
      <div className="overflow-hidden rounded-3xl border border-emerald-100 shadow-sm">
         <FlowerGarden /> 
      </div>

      {/* 3. Lịch sử quyên góp */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
         <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-[#1A4D2E] flex items-center gap-2">
               <span className="text-emerald-500 text-lg">↺</span> Lịch sử quyên góp
            </h3>
            <button className="text-xs font-bold text-emerald-600 hover:underline flex items-center gap-1">
               Xuất sao kê
            </button>
         </div>

         <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
               <thead className="text-[10px] text-gray-400 uppercase font-bold bg-gray-50/50">
                  <tr>
                     <th className="px-4 py-3 rounded-l-lg">Ngày</th>
                     <th className="px-4 py-3">Dự án</th>
                     <th className="px-4 py-3">Số tiền</th>
                     <th className="px-4 py-3 text-right rounded-r-lg">Chứng nhận</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-50">
                  {[
                     { date: "12/10/2024", project: "Học bổng cho em vùng cao", amount: "500.000đ" },
                     { date: "28/09/2024", project: "Suất cơm yêu thương T09", amount: "200.000đ" },
                     { date: "15/09/2024", project: "Xây dựng trạm y tế xã đảo", amount: "2.000.000đ" },
                  ].map((row, idx) => (
                     <tr key={idx} className="hover:bg-gray-50/50 transition-colors group">
                        <td className="px-4 py-4 text-gray-500 text-xs">{row.date}</td>
                        <td className="px-4 py-4 font-bold text-gray-800">{row.project}</td>
                        <td className="px-4 py-4 font-bold text-emerald-600">{row.amount}</td>
                        <td className="px-4 py-4 text-right">
                           <button className="inline-flex items-center gap-1 bg-emerald-600 text-white text-[10px] px-3 py-1.5 rounded hover:bg-emerald-700 transition shadow-sm">
                              <Download size={12} /> Tải PDF
                           </button>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
         <div className="mt-4 text-center">
            <button className="text-xs font-bold text-gray-400 hover:text-emerald-600 transition">Xem tất cả lịch sử</button>
         </div>
      </div>

      {/* 4. DỰ ÁN ĐANG CẦN HỖ TRỢ */}
      <div>
        <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-[#1A4D2E] flex items-center gap-2">
               <span className="text-emerald-500">📢</span> Dự án đang cần hỗ trợ
            </h3>
            <a href="/projects" className="text-xs font-bold text-emerald-600 hover:underline flex items-center gap-1">
               Tất cả <ArrowRight size={12} />
            </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {suggestedProjects.map((project) => (
                <div key={project.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-md transition-all">
                    {/* Image Area - FIX: Dùng next/image */}
                    <div className="h-40 relative overflow-hidden bg-gray-100">
                        <Image 
                            src={project.image} 
                            alt={project.title} 
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-bold text-emerald-600 uppercase border border-emerald-100 shadow-sm z-10">
                            {project.category}
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="p-5">
                        <h4 className="font-bold text-gray-800 mb-3 line-clamp-1 group-hover:text-emerald-700 transition-colors">
                            {project.title}
                        </h4>
                        
                        {/* Progress Bar */}
                        <div className="space-y-2">
                            <div className="flex justify-between text-[10px] text-gray-500 uppercase font-medium">
                                <span>Đã đạt {project.progress}%</span>
                                <span className="text-emerald-600 font-bold">{project.raised}</span>
                            </div>
                            <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                                <div 
                                    className="bg-emerald-500 h-full rounded-full" 
                                    style={{ width: `${project.progress}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>

    </div>
  );
}