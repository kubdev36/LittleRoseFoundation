"use client";

/* eslint-disable @next/next/no-img-element */
// ^^^ Dòng này giúp bỏ qua lỗi warning của Next.js khi dùng thẻ img thường

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Heart, Users, Clock, Info, ChevronLeft, ChevronRight, 
  BookOpen, Bike, PenTool, Share2, CheckCircle2, 
  Sparkles, Eye, Leaf 
} from "lucide-react";
import { motion } from "framer-motion";

// Đảm bảo đường dẫn này CHÍNH XÁC với cấu trúc thư mục của bạn
import DonateModal from "../DonateModal"; 
import Comment from "../Comment";

// --- DỮ LIỆU CÁC GIAI ĐOẠN PHÁT TRIỂN (SVG) ---
const ROSE_STAGES = [
  {
    id: 1,
    name: "Hạt Mầm Hy Vọng",
    threshold: 0,
    svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#8B4513" fill-opacity="0.1"/><path d="M12 17C13.6569 17 15 15.6569 15 14C15 12.3431 13.6569 10 12 10C10.3431 10 9 12.3431 9 14C9 15.6569 10.3431 17 12 17Z" fill="#5D2906"/><path d="M11 10L11 7" stroke="#4ADE80" stroke-width="1.5" stroke-linecap="round"/><path d="M13 11L13 8" stroke="#4ADE80" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  },
  {
    id: 2,
    name: "Mầm Nụ Trí Tuệ",
    threshold: 100,
    svg: `<svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M50 90 L50 60" stroke="#059669" stroke-linecap="round" stroke-width="5"></path><path d="M50 60 C70 45, 80 60, 50 80" fill="#10B981" fill-opacity="0.9"></path><path d="M50 65 C30 50, 20 65, 50 85" fill="#059669" fill-opacity="0.8"></path><circle cx="50" cy="55" fill="#E11D48" r="8"></circle></svg>`,
  },
  {
    id: 3,
    name: "Nụ Hoa Nhân Ái",
    threshold: 300,
    svg: `<svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M50 90 L50 50" stroke="#059669" stroke-linecap="round" stroke-width="5"></path><path d="M50 50 C30 30, 70 30, 50 50" fill="#FB7185" stroke="#E11D48" stroke-width="2"></path><path d="M50 50 C40 35, 60 35, 50 50" fill="#E11D48"></path><path d="M30 70 C40 60, 50 70, 50 80" fill="#059669"></path></svg>`,
  },
  {
    id: 4,
    name: "Cành Hoa Nâng Đỡ",
    threshold: 600,
    svg: `<svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M50 90 L50 40" stroke="#059669" stroke-linecap="round" stroke-width="6"></path><path d="M50 40 C20 10, 80 10, 50 40" fill="#FB7185" stroke="#E11D48" stroke-width="2"></path><path d="M50 40 C35 25, 65 25, 50 40" fill="#E11D48"></path><path d="M50 60 L75 45" stroke="#059669" stroke-linecap="round" stroke-width="3"></path><path d="M75 45 C85 35, 90 45, 75 55" fill="#10B981"></path></svg>`,
  },
  {
    id: 5,
    name: "Đóa Hồng Ước Mơ",
    threshold: 1000,
    svg: `<svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M50 95 L50 50" stroke="#059669" stroke-linecap="round" stroke-width="7"></path><circle cx="50" cy="40" fill="#E11D48" r="25"></circle><circle cx="50" cy="40" fill="#FB7185" opacity="0.6" r="30"></circle><circle cx="50" cy="40" fill="#FFF1F2" opacity="0.3" r="35"></circle><path d="M35 70 C20 60, 20 80, 50 85" fill="#059669"></path><path d="M65 70 C80 60, 80 80, 50 85" fill="#059669"></path></svg>`,
  }
];

// Định nghĩa Interface
interface Project {
  id: number;
  title: string;
  description: string;
  raised: number;
  goal: number;
  donors: number;
  likes: number;
  imageSrc: string;
  category: string;
  province: string;
  status: string;
  keywords: string;
}

interface ProjectDetailClientProps {
  project: Project;
  allProjects: Project[];
}

const DONATION_AMOUNTS = [50000, 100000, 200000, 500000];

export default function ProjectDetailClient({ project, allProjects }: ProjectDetailClientProps) {
  const [selectedAmount, setSelectedAmount] = useState<number>(100000);
  const [showDonateModal, setShowDonateModal] = useState(false);
  
  // State để tránh lỗi hydration mismatch cho Date
  const [currentMonth, setCurrentMonth] = useState<number>(1); 

  // --- STATE CHO VƯỜN CHIBI ---
  const [waterPoints, setWaterPoints] = useState(0);
  const [currentStageIndex, setCurrentStageIndex] = useState(0);

  useEffect(() => {
    // Set tháng hiện tại ở client side
    setCurrentMonth(new Date().getMonth() + 1);

    if (typeof window !== "undefined") {
      const savedPoints = localStorage.getItem("rose_water_points");
      if (savedPoints) {
        setWaterPoints(parseInt(savedPoints));
      }
    }
  }, []);

  // Tính toán giai đoạn cây
  useEffect(() => {
    let newIndex = 0;
    for (let i = ROSE_STAGES.length - 1; i >= 0; i--) {
      if (waterPoints >= ROSE_STAGES[i].threshold) {
        newIndex = i;
        break;
      }
    }
    setCurrentStageIndex(newIndex);
  }, [waterPoints]);

  const currentStage = ROSE_STAGES[currentStageIndex];
  const nextStage = ROSE_STAGES[currentStageIndex + 1];

  // Tính % tiến trình cây
  let flowerProgress = 100;
  if (nextStage) {
    const range = nextStage.threshold - currentStage.threshold;
    const currentProgress = waterPoints - currentStage.threshold;
    flowerProgress = Math.min(100, Math.round((currentProgress / range) * 100));
  }

  // --- TÍNH TOÁN DỮ LIỆU DỰ ÁN ---
  const percentage = Math.min(100, Math.round((project.raised / project.goal) * 100));
  const remainingDays = 15; 
  
  const relatedProjects = allProjects
    .filter((p) => p.id !== project.id)
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-[#F9F7F2] py-8 font-sans text-gray-800">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* --- 1. HEADER TITLE --- */}
        <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-2">
              Dự án tại {project.province}
            </p>
            <h1 className="text-3xl md:text-5xl font-serif text-[#1A4D2E] mb-2 leading-tight">
                {project.title}
            </h1>
            <p className="text-gray-500 text-sm md:text-base max-w-2xl mx-auto italic">
                {project.category} - {project.keywords}
            </p>
        </div>

        {/* --- MAIN GRID LAYOUT --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* === LEFT COLUMN (MAIN CONTENT) === */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* 2. HERO IMAGE */}
            <div className="relative rounded-2xl overflow-hidden h-[300px] md:h-[400px] group shadow-sm">
              <img 
                src={project.imageSrc} 
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1000&auto=format&fit=crop";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-6 md:p-8">
                <span className="inline-block bg-emerald-600 text-white text-[10px] font-bold px-2 py-1 rounded w-fit mb-2">
                  {project.status === "active" ? "ĐANG GÂY QUỸ" : "ĐÃ HOÀN THÀNH"}
                </span>
              </div>
            </div>

            {/* 3. STATS BAR */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex flex-col md:flex-row justify-between mb-6 gap-6 md:gap-4">
                    <div className="flex items-center gap-3">
                        <div className="bg-emerald-50 p-2.5 rounded-full text-emerald-600"><Heart size={20} fill="currentColor" /></div>
                        <div>
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Đã gây quỹ</p>
                            <p className="text-xl font-bold text-gray-900 font-serif">
                              {project.raised.toLocaleString('vi-VN')} <span className="text-xs font-normal text-gray-400 font-sans">VND</span>
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="bg-emerald-50 p-2.5 rounded-full text-emerald-600"><Users size={20} /></div>
                        <div>
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Người ủng hộ</p>
                            <p className="text-xl font-bold text-gray-900 font-serif">{project.donors}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="bg-emerald-50 p-2.5 rounded-full text-emerald-600"><Clock size={20} /></div>
                        <div>
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Còn lại</p>
                            <p className="text-xl font-bold text-gray-900 font-serif">{remainingDays} <span className="text-xs font-normal text-gray-400 font-sans">ngày</span></p>
                        </div>
                    </div>
                </div>
                
                {/* Progress Bar */}
                <div className="relative pt-2">
                    <div className="flex justify-between text-xs font-bold mb-2">
                        <span className="text-[#1A4D2E]">Mục tiêu: {project.goal.toLocaleString('vi-VN')} đ</span>
                        <span className="text-emerald-600">{percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-emerald-500 to-[#1A4D2E] h-full rounded-full transition-all duration-1000 ease-out" 
                          style={{ width: `${percentage}%` }}
                        ></div>
                    </div>
                </div>
            </div>

            {/* 4. ABOUT PROJECT */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-[#1A4D2E] flex items-center gap-2 mb-4">
                    <Info size={20} className="fill-emerald-100 text-emerald-600" /> Về dự án này
                </h3>
                <div className="text-gray-600 text-sm leading-relaxed mb-6 text-justify whitespace-pre-line">
                    {project.description}
                </div>

                {/* Hoạt động */}
                <div className="mt-8 border-t border-dashed border-gray-100 pt-6">
                    <div className="flex justify-between items-center mb-4">
                         <h4 className="font-bold text-gray-800 text-sm flex items-center gap-2">
                            <span className="bg-emerald-600 w-4 h-4 rounded text-white flex items-center justify-center text-[10px]"><CheckCircle2 size={10} /></span> 
                            Hoạt động dự kiến
                         </h4>
                         <div className="flex gap-2">
                             <button className="p-1 rounded-full border hover:bg-gray-50"><ChevronLeft size={16} /></button>
                             <button className="p-1 rounded-full border hover:bg-gray-50"><ChevronRight size={16} /></button>
                         </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        {[
                            { img: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=300", title: "Khảo sát địa điểm" },
                            { img: "https://images.unsplash.com/photo-1532330384815-c16480e6592d?w=300", title: "Mua sắm vật tư" },
                            { img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=300", title: "Trao quà tận tay" },
                        ].map((item, idx) => (
                            <div key={idx} className="group cursor-pointer">
                                <div className="rounded-lg overflow-hidden h-20 md:h-24 mb-2 relative">
                                    <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                </div>
                                <p className="text-[10px] font-semibold text-gray-600 line-clamp-2">{item.title}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 5. BUDGET & SHOPPING DETAILS */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-[#1A4D2E] flex items-center gap-2 mb-6">
                    <span className="bg-emerald-100 p-1 rounded text-emerald-600"><Users size={16} /></span> Phân bổ nguồn quỹ
                </h3>
                
                {/* Cards phân bổ */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100">
                        <div className="bg-emerald-100 w-8 h-8 rounded-full flex items-center justify-center text-emerald-600 mb-3"><BookOpen size={16} /></div>
                        <h4 className="font-bold text-gray-800 text-sm mb-1">Học bổng (60%)</h4>
                        <p className="text-xs text-gray-500">120 suất học bổng tiền mặt cho học sinh nghèo.</p>
                    </div>
                    <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                         <div className="bg-blue-100 w-8 h-8 rounded-full flex items-center justify-center text-blue-600 mb-3"><Bike size={16} /></div>
                        <h4 className="font-bold text-gray-800 text-sm mb-1">Xe đạp (30%)</h4>
                        <p className="text-xs text-gray-500">50 chiếc xe đạp mới giúp các em đến trường.</p>
                    </div>
                    <div className="bg-orange-50/50 p-4 rounded-xl border border-orange-100">
                         <div className="bg-orange-100 w-8 h-8 rounded-full flex items-center justify-center text-orange-600 mb-3"><PenTool size={16} /></div>
                        <h4 className="font-bold text-gray-800 text-sm mb-1">Vật dụng (10%)</h4>
                        <p className="text-xs text-gray-500">Bút, sách, vở và đồ dùng học tập thiết yếu.</p>
                    </div>
                </div>

                {/* --- BẢNG CHI TIẾT MUA SẮM --- */}
                <div className="mt-8">
                    <div className="flex justify-between items-end mb-4 border-b border-gray-100 pb-2">
                        <h4 className="font-bold text-sm text-gray-800">Chi tiết mua sắm</h4>
                        <span className="text-[10px] text-gray-400 italic uppercase">Cập nhật: 12/10/2024</span>
                    </div>
                    
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-[10px] text-gray-400 uppercase font-bold bg-gray-50/50">
                                <tr>
                                    <th className="px-4 py-3 rounded-l-lg">Hạng mục</th>
                                    <th className="px-4 py-3">Đơn giá dự kiến</th>
                                    <th className="px-4 py-3 text-right rounded-r-lg">Ghi chú</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                <tr className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-4 py-4 font-medium text-gray-700">Sách giáo khoa</td>
                                    <td className="px-4 py-4 text-gray-600 font-mono text-xs">200.000đ/bộ</td>
                                    <td className="px-4 py-4 text-right text-gray-400 text-xs italic">Theo chuẩn Bộ GD</td>
                                </tr>
                                <tr className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-4 py-4 font-medium text-gray-700">Xe đạp Thống Nhất</td>
                                    <td className="px-4 py-4 text-gray-600 font-mono text-xs">1.500.000đ/chiếc</td>
                                    <td className="px-4 py-4 text-right text-gray-400 text-xs italic">BH 12 tháng</td>
                                </tr>
                                <tr className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-4 py-4 font-medium text-gray-700">Ba lô đi học</td>
                                    <td className="px-4 py-4 text-gray-600 font-mono text-xs">150.000đ/chiếc</td>
                                    <td className="px-4 py-4 text-right text-gray-400 text-xs italic">Chống thấm nước</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* 6. COMMENTS */}
            <Comment/>
            

            {/* 7. OTHER PROJECTS */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                 <h3 className="text-lg font-bold text-[#1A4D2E] mb-6 flex items-center gap-2">
                    <span className="text-emerald-500 font-serif text-2xl">#</span> Các dự án khác
                 </h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {relatedProjects.map((relProject) => {
                       const relPercent = Math.min(100, Math.round((relProject.raised / relProject.goal) * 100));
                       return (
                        <Link href={`/campaign/${relProject.id}`} key={relProject.id} className="block group">
                          <div className="border border-gray-100 rounded-xl overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col">
                              <div className="h-32 relative overflow-hidden">
                                   <img src={relProject.imageSrc} alt={relProject.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                              </div>
                              <div className="p-4 flex flex-col flex-1 justify-between">
                                  <h4 className="font-bold text-gray-800 text-sm mb-2 line-clamp-2 group-hover:text-emerald-700 transition-colors">
                                    {relProject.title}
                                  </h4>
                                  <div>
                                    <div className="flex justify-between text-[10px] text-gray-500 mb-1">
                                        <span>Đã đạt {relPercent}%</span>
                                        <span className="font-bold text-emerald-600">{relProject.raised.toLocaleString('vi-VN')}đ</span>
                                    </div>
                                    <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                                        <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${relPercent}%` }}></div>
                                    </div>
                                  </div>
                              </div>
                          </div>
                        </Link>
                       );
                    })}
                 </div>
                 <Link href="/campaigns" className="block w-full mt-6 text-center text-xs text-emerald-600 font-bold uppercase py-3 border border-dashed border-emerald-200 rounded-lg hover:bg-emerald-50 transition-colors">
                    Xem tất cả chiến dịch
                 </Link>
            </div>

          </div>

          {/* === RIGHT COLUMN (SIDEBAR - Chiếm 4 phần) === */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* A. VƯỜN CHIBI (ĐÃ CẬP NHẬT SVG MỚI) */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden">
                <div className="flex justify-between items-start mb-4">
                      <h4 className="font-bold text-[#1A4D2E] flex items-center gap-2">
                         <Sparkles size={18} className="text-yellow-500 fill-current" /> Vườn Chibi Nhân ái
                      </h4>
                      <Link href="/rose-gallery" className="text-gray-400 hover:text-emerald-600 transition-colors"><Eye size={18} /></Link>
                </div>
                
                {/* Visualization Area */}
                <div className="h-56 bg-gradient-to-b from-[#f0fdf4] to-white rounded-xl flex flex-col items-center justify-center relative mb-4 border border-emerald-50 overflow-hidden group">
                    <span className="absolute top-2 right-2 bg-white/90 px-2 py-0.5 rounded-full text-[10px] font-bold text-emerald-600 shadow-sm border border-emerald-100">
                        Cấp {currentStageIndex + 1}/5
                    </span>
                    
                    {/* SVG Main Plant Animation */}
                    <div className="w-full h-full flex items-center justify-center relative p-4">
                        <motion.div 
                            key={currentStageIndex}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: "spring", stiffness: 100 }}
                            className="w-32 md:w-40 drop-shadow-xl"
                            dangerouslySetInnerHTML={{ __html: currentStage.svg.replace('<svg', '<svg style="overflow: visible; width: 100%; height: 100%;"') }}
                        />
                    </div>
                </div>

                {/* Progress */}
                <div className="mb-4">
                    <div className="flex justify-between text-[10px] font-bold uppercase mb-1">
                        <span className="text-gray-400">Sức sống hoa</span>
                        <span className="text-emerald-600">{flowerProgress}%</span>
                    </div>
                    <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }} 
                          animate={{ width: `${flowerProgress}%` }} 
                          className="bg-gradient-to-r from-emerald-400 to-emerald-600 h-full" 
                        />
                    </div>
                </div>

                <div className="p-3 bg-emerald-50 rounded-xl text-center text-xs text-emerald-800 font-medium border border-emerald-100 flex items-center justify-center gap-2 mb-3">
                   <Leaf size={14} /> Giai đoạn: {currentStage.name}
                </div>

                {/* Link to Gallery Page */}
                <Link href="/rose-gallery" className="block w-full text-center bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-xl shadow-lg shadow-emerald-200 transition-all mb-3">
                    Nuôi dưỡng nụ hồng
                </Link>

                <p className="text-center text-[10px] text-gray-400 underline cursor-pointer">
                  <Link href="/story" className="hover:text-emerald-600 transition-colors">
                    Tại sao là hoa hồng?
                  </Link>
                </p>
            </div>

            {/* B. DONATION WIDGET (Sticky) */}
            <div className="bg-white p-6 rounded-2xl shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] border border-gray-100">
                <h3 className="font-bold text-[#1A4D2E] mb-4 flex items-center gap-2">
                    <Heart size={18} className="text-red-500 fill-current" /> ỦNG HỘ NGAY
                </h3>

                {/* Amount Grid */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                    {DONATION_AMOUNTS.map((amount) => (
                        <button
                            key={amount}
                            onClick={() => setSelectedAmount(amount)}
                            className={`py-2 px-3 rounded-lg text-sm font-bold border transition-all ${
                                selectedAmount === amount 
                                ? 'border-emerald-500 bg-emerald-50 text-emerald-700' 
                                : 'border-gray-100 bg-white text-gray-600 hover:border-emerald-200'
                            }`}
                        >
                            {amount.toLocaleString('vi-VN')}đ
                        </button>
                    ))}
                </div>

                {/* Custom Input */}
                <div className="relative mb-6">
                    <input 
                        type="number" 
                        value={selectedAmount}
                        onChange={(e) => setSelectedAmount(Number(e.target.value))}
                        className="w-full border border-gray-200 rounded-xl py-3 px-4 text-center font-bold text-gray-800 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-400">VND</span>
                </div>

                {/* Main Action */}
                <button 
                  onClick={() => setShowDonateModal(true)}
                  className="w-full bg-gradient-to-r from-emerald-600 to-[#1A4D2E] text-white font-bold py-3.5 rounded-full shadow-xl shadow-emerald-900/20 hover:shadow-emerald-900/30 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 mb-4"
                >
                  <Heart size={18} fill="currentColor" /> Quyên góp ngay
                </button>

                <button className="w-full flex items-center justify-center gap-2 text-xs font-bold text-gray-500 hover:text-gray-800 transition-colors">
                    <Share2 size={14} /> Chia sẻ dự án "{project.title}"
                </button>
            </div>

            {/* C. LEADERBOARD (MOCK) */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                      <h3 className="font-bold text-gray-800 text-sm flex items-center gap-2">
                         <span className="text-yellow-500">🏆</span> Bảng vinh danh
                      </h3>
                      {/* Fix lỗi Hydration Mismatch bằng cách dùng state currentMonth */}
                      <span className="text-[10px] font-bold text-gray-300">T{currentMonth}</span>
                </div>

                <div className="space-y-5">
                    {[
                        { name: "Lê Văn Thành", role: "ĐẠI SỨ", amount: "50.000.000đ", color: "bg-yellow-500" },
                        { name: "Nguyễn Minh Quân", role: "MẠNH THƯỜNG QUÂN", amount: "25.000.000đ", color: "bg-gray-400" },
                        { name: "Trần Mỹ Linh", role: "NHÀ HẢO TÂM", amount: "10.000.000đ", color: "bg-orange-400" },
                    ].map((donor, idx) => (
                        <div key={idx} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-full ${donor.color} text-white flex items-center justify-center text-xs font-bold shadow-sm ring-2 ring-white`}>
                                    {idx + 1}
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-800">{donor.name}</p>
                                    <p className="text-[9px] font-bold text-gray-400 uppercase">{donor.role}</p>
                                </div>
                            </div>
                            <span className="text-xs font-bold text-emerald-700">{donor.amount}</span>
                        </div>
                    ))}
                </div>
            </div>

          </div>
        </div>
      </div>

      <DonateModal
  isOpen={showDonateModal}
  onClose={() => setShowDonateModal(false)}
  // 1. Sửa 'amount' thành 'initialAmount'
  initialAmount={selectedAmount} 
  
  // 2. DonateModal mình cung cấp không có prop 'projectId', hãy xóa hoặc comment dòng này đi
  // projectId={project.id.toString()} 

  projectTitle={project.title}
  
  // 3. Thêm hàm xử lý khi thành công (nếu cần)
  onSuccess={() => {
    setShowDonateModal(false);
    // Có thể thêm logic reload data hoặc hiện thông báo tại đây
  }}
/>
    </div>
  );
}