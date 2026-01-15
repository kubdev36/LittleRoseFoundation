"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProfileSidebar from "./components/ProfileSidebar";
import DashboardTab from "./DashboardTab";
import PersonalInfoTab from "./PersonalInfoTab";
import SecurityTab from "./SecurityTab";
import LoyaltyTab from "./LoyaltyTab";

export default function UserProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("dashboard"); // dashboard, info, security, loyalty

  useEffect(() => {
    // 1. Kiểm tra đăng nhập từ localStorage
    const storedUser = localStorage.getItem("current_user");
    if (!storedUser) {
      router.push("/auth");
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("current_user");
    router.push("/auth");
  };

  if (!user) return null; // Hoặc loading spinner

  return (
    <div className="min-h-screen bg-[#FDFBF7] py-8 px-4 font-sans text-gray-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* SIDEBAR (Cột trái) */}
        <div className="lg:col-span-3">
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