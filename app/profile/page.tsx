"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// --- QUAN TRỌNG: KIỂM TRA LẠI ĐƯỜNG DẪN IMPORT ---
// Giả sử tất cả các file Tab nằm cùng cấp với file page này
// Và ProfileSidebar nằm trong thư mục components con hoặc cùng cấp.
// Hãy sửa lại đường dẫn "./..." cho đúng với cấu trúc thực tế của bạn.

import ProfileSidebar from "./components/ProfileSidebar"; 
import DashboardTab from "./DashboardTab";
import PersonalInfoTab from "./PersonalInfoTab";
import SecurityTab from "./SecurityTab";
import LoyaltyTab from "./LoyaltyTab";

// Định nghĩa kiểu dữ liệu User cho đồng bộ với các Tab con
interface UserData {
  fullName: string;
  email: string;
  phone?: string;
  dob?: string;
  address?: string;
  // Thêm các trường khác nếu có trong localStorage
  [key: string]: any; 
}

export default function UserProfilePage() {
  const router = useRouter();
  
  // Fix: Thay <any> bằng <UserData | null> để chặt chẽ hơn
  const [user, setUser] = useState<UserData | null>(null);
  const [activeTab, setActiveTab] = useState("dashboard"); 

  useEffect(() => {
    // 1. Kiểm tra đăng nhập từ localStorage
    if (typeof window !== "undefined") {
        const storedUser = localStorage.getItem("current_user");
        if (!storedUser) {
            router.push("/auth");
        } else {
            try {
                setUser(JSON.parse(storedUser));
            } catch (error) {
                // Phòng trường hợp JSON lỗi
                console.error("Lỗi đọc dữ liệu user", error);
                localStorage.removeItem("current_user");
                router.push("/auth");
            }
        }
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("current_user");
    router.push("/auth");
  };

  // Loading state đơn giản để tránh flash nội dung
  if (!user) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
        </div>
      );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] py-8 px-4 font-sans text-gray-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* SIDEBAR (Cột trái) */}
        <div className="lg:col-span-3">
          {/* Đảm bảo ProfileSidebar nhận đúng các props này */}
          <ProfileSidebar 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
            onLogout={handleLogout} 
          />
        </div>

        {/* MAIN CONTENT (Cột phải) */}
        <div className="lg:col-span-9">
          {activeTab === "dashboard" && <DashboardTab user={user} />}
          {activeTab === "info" && <PersonalInfoTab user={user} />}
          {activeTab === "security" && <SecurityTab />}
          {activeTab === "loyalty" && <LoyaltyTab user={user} />}
        </div>

      </div>
    </div>
  );
}