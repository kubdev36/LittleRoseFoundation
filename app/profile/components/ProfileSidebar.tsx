import React from "react";
import { LayoutDashboard, User, ShieldCheck, Settings, LogOut, Crown } from "lucide-react";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
}

export default function ProfileSidebar({ activeTab, setActiveTab, onLogout }: SidebarProps) {
  const menuItems = [
    { id: "dashboard", label: "Bảng điều khiển", icon: LayoutDashboard },
    { id: "loyalty", label: "Quyền lợi thành viên", icon: Crown, highlight: true }, // Mới thêm
    { id: "info", label: "Thông tin cá nhân", icon: User },
    { id: "security", label: "Bảo mật", icon: ShieldCheck },
   
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sticky top-24">
      <div className="flex items-center gap-3 mb-8 px-2 mt-2">
        <div className="w-8 h-8 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center font-bold">
          Q
        </div>
        <span className="font-bold text-[#1A4D2E] text-sm uppercase tracking-wide">Quỹ Hoa Hồng Nhỏ</span>
      </div>

      <nav className="space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
              ${activeTab === item.id 
                ? (item.highlight ? "bg-emerald-600 text-white shadow-md shadow-emerald-200" : "bg-emerald-50 text-emerald-700 font-bold")
                : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              }
            `}
          >
            <item.icon size={18} className={activeTab === item.id ? "text-current" : "text-gray-400"} />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="mt-8 pt-6 border-t border-gray-100 px-2">
        <button 
          onClick={onLogout}
          className="flex items-center gap-3 text-red-500 text-sm font-medium hover:text-red-600 transition-colors w-full"
        >
          <LogOut size={18} /> Đăng xuất
        </button>
      </div>

      {/* Banner nhỏ ở dưới sidebar */}
      <div className="mt-8 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-4 border border-emerald-100 relative overflow-hidden">
         <div className="relative z-10">
            <h4 className="text-emerald-800 font-bold text-xs flex items-center gap-1 mb-1">
               <Crown size={12} className="fill-emerald-600 text-emerald-600"/> Tài khoản VIP
            </h4>
            <p className="text-[10px] text-emerald-600/80 leading-relaxed">
               Cảm ơn bạn đã đồng hành. Hạng thành viên của bạn đang được ưu tiên hỗ trợ 24/7.
            </p>
         </div>
         <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-emerald-200/20 rounded-full blur-xl"></div>
      </div>
    </div>
  );
}