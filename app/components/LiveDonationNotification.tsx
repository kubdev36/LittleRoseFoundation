"use client";

import React, { useState, useEffect } from "react";
import { Heart, X } from "lucide-react";
import Image from "next/image";

// --- DỮ LIỆU GIẢ LẬP ---
const NAMES = [
  "Nguyễn Văn An", "Trần Thị Bích", "Lê Hoàng Nam", "Phạm Minh Tâm",
  "Nhà hảo tâm ẩn danh", "Vũ Thu Hà", "Đặng Tuấn Kiệt", "Hoàng Thùy Linh",
  "Gia đình bác Ba", "Nhóm thiện nguyện Tín Nghĩa"
];

const ACTIONS = [
  "vừa ủng hộ", "đã quyên góp", "vừa gửi tặng", "đã đóng góp"
];

const AMOUNTS = [
  "50.000đ", "100.000đ", "200.000đ", "500.000đ", "1.000.000đ", "2.000.000đ", "5.000.000đ"
];

const AVATARS = [
  "https://i.pravatar.cc/150?u=a",
  "https://i.pravatar.cc/150?u=b",
  "https://i.pravatar.cc/150?u=c",
  "https://i.pravatar.cc/150?u=d",
  "https://i.pravatar.cc/150?u=e",
];

export default function LiveDonationNotification() {
  const [isVisible, setIsVisible] = useState(false);
  const [data, setData] = useState({ name: "", action: "", amount: "", avatar: "", time: "" });

  // Hàm random dữ liệu
  const getRandomData = () => {
    return {
      name: NAMES[Math.floor(Math.random() * NAMES.length)],
      action: ACTIONS[Math.floor(Math.random() * ACTIONS.length)],
      amount: AMOUNTS[Math.floor(Math.random() * AMOUNTS.length)],
      avatar: AVATARS[Math.floor(Math.random() * AVATARS.length)],
      time: "Vừa xong", // Hoặc random "1 phút trước"
    };
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const scheduleNextNotification = () => {
      // 1. Random thời gian chờ trước khi hiện thông báo tiếp theo (từ 10s đến 25s)
      const nextAppearanceTime = 10000 + Math.random() * 15000;

      timeoutId = setTimeout(() => {
        // 2. Cập nhật dữ liệu mới và hiện thông báo
        setData(getRandomData());
        setIsVisible(true);

        // 3. Sau 5s thì tự động ẩn
        setTimeout(() => {
          setIsVisible(false);
          // 4. Gọi đệ quy để lên lịch cho lần tiếp theo
          scheduleNextNotification();
        }, 5000); 

      }, nextAppearanceTime);
    };

    // Bắt đầu chu trình đầu tiên sau 3s khi vào trang
    const initialTimeout = setTimeout(() => {
        setData(getRandomData());
        setIsVisible(true);
        setTimeout(() => {
            setIsVisible(false);
            scheduleNextNotification();
        }, 5000);
    }, 3000);

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(initialTimeout);
    };
  }, []);

  if (!data.name) return null;

  return (
    <div
      className={`fixed top-24 right-4 z-50 max-w-sm w-full md:w-auto transition-all duration-700 ease-in-out transform ${
        isVisible ? "translate-x-0 opacity-100" : "translate-x-20 opacity-0 pointer-events-none"
      }`}
    >
      <div className="bg-white border border-emerald-100 shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-xl p-4 flex items-center gap-4 relative pr-10">
        
        {/* Nút tắt thủ công */}
        <button 
            onClick={() => setIsVisible(false)}
            className="absolute top-2 right-2 text-gray-300 hover:text-gray-500 transition-colors"
        >
            <X size={14} />
        </button>

        {/* Avatar */}
        <div className="relative flex-shrink-0">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-emerald-50">
                <img 
                    src={data.avatar} 
                    alt="Donor" 
                    width={48} 
                    height={48} 
                    className="object-cover"
                />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm">
                <div className="bg-red-500 rounded-full p-1">
                    <Heart size={8} className="text-white fill-current" />
                </div>
            </div>
        </div>

        {/* Nội dung text */}
        <div>
          <p className="text-sm text-gray-800">
            <span className="font-bold text-[#1A4D2E]">{data.name}</span> {data.action}
          </p>
          <p className="text-emerald-600 font-bold text-base font-serif">
            {data.amount}
          </p>
          <p className="text-[10px] text-gray-400 mt-0.5 flex items-center gap-1">
              {data.time}
          </p>
        </div>
      </div>
    </div>
  );
}