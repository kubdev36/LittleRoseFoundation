'use client';

import React, { useState } from "react";
import { Share2, FileText, Heart, CheckCircle, MapPin, Clock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// In a real app, this would be in a shared types file.
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

const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
};

// --- HELPER COMPONENTS ---

const StatusBadge = ({ label, type = "primary" }: { label: string, type?: "primary" | "secondary" }) => {
  const bg = type === "primary" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700";
  return <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${bg}`}>{label}</span>;
};

const ProgressBar = ({ current, target }: { current: number, target: number }) => {
  const percent = Math.min((current / target) * 100, 100);
  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
      <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${percent}%` }}></div>
    </div>
  );
};

// Make ProjectCard dynamic
const ProjectCard = ({ project }: { project: Project }) => {
    const progress = Math.round((project.raised / project.goal) * 100);
    return (
        <Link href={`/project/${project.id}`} className="block bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition cursor-pointer">
            <div className="h-48 bg-gray-200 relative group">
                <Image
                    src={project.imageSrc}
                    alt={project.title}
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition"></div>
            </div>
            <div className="p-4">
                <h3 className="font-bold text-gray-800 mb-2 text-sm md:text-base line-clamp-2">{project.title}</h3>
                <ProgressBar current={project.raised} target={project.goal} />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>{progress}% Hoàn thành</span>
                    <span className="font-medium text-gray-700">{formatCurrency(project.raised)}</span>
                </div>
            </div>
        </Link>
    );
};


// --- MAIN CLIENT COMPONENT ---

export default function ProjectDetailClient({ project, allProjects }: { project: Project, allProjects: Project[] }) {
  const [donationAmount, setDonationAmount] = useState<number | string>(100000);
  const progressPercent = Math.round((project.raised / project.goal) * 100);

  // Get 3 other projects to display
  const otherProjects = allProjects.filter(p => p.id !== project.id).slice(0, 3);

  return (
    <div className="bg-gray-50 font-sans text-gray-800 pb-12">
        <div className="container mx-auto px-4 pt-6 mt-10">
            <nav className="flex items-center text-sm text-gray-500 mb-4 overflow-hidden">
                <Link href="/" className="hover:text-green-600 hover:underline transition">Trang chủ</Link>
                <span className="mx-2 text-gray-400">/</span>
                <Link href="/project" className="hover:text-green-600 hover:underline transition">Dự án</Link>
                <span className="mx-2 text-gray-400">/</span>
                <span className="text-gray-900 font-medium truncate">{project.title}</span>
            </nav>
        </div>
      
      {/* SECTION 1: HERO TITLE & BREADCRUMBS */}
      <div className="bg-white pb-8 pt-6 border-b shadow-sm mb-6">
        <div className="container mx-auto px-4">
            {/* Tags & Actions */}
            <div className="flex flex-wrap gap-3 mb-4 items-center text-sm">
                <StatusBadge label={project.status} />
                <StatusBadge label={project.category} type="secondary" />
                
                <div className="flex items-center text-gray-500 gap-1 ml-auto md:ml-2 font-medium">
                    <Clock size={16} className="text-orange-500" /> <span>Còn 15 ngày</span>
                </div>
                
                <div className="flex gap-2 ml-auto">
                    <button className="flex items-center gap-1 border px-3 py-1.5 rounded-full text-sm font-medium hover:bg-gray-50 transition">
                        <Share2 size={16}/> Chia sẻ
                    </button>
                    <button className="flex items-center gap-1 border px-3 py-1.5 rounded-full text-sm font-medium hover:bg-gray-50 transition">
                        <FileText size={16}/> Lưu
                    </button>
                </div>
            </div>

            {/* Title */}
            <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
                {project.title}
            </h1>
            <p className="text-gray-600 max-w-4xl text-base md:text-lg leading-relaxed">
                {project.description}
            </p>
        </div>
      </div>

      {/* SECTION 2: MAIN GRID LAYOUT */}
      <main className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* LEFT COLUMN (CONTENT) */}
            <div className="lg:col-span-8 space-y-8">
                
                {/* Featured Image */}
                <div className="rounded-2xl overflow-hidden bg-gray-200 h-[300px] md:h-[450px] relative w-full shadow-inner">
                     <Image
                        src={project.imageSrc}
                        alt={project.title}
                        fill
                        className="object-cover"
                     />
                     <button className="absolute bottom-4 right-4 bg-white/90 hover:bg-white text-gray-800 font-bold px-4 py-2 rounded-lg text-sm shadow-lg backdrop-blur-sm transition">
                        Xem tất cả ảnh
                     </button>
                </div>

                {/* Content Tabs */}
                <div className="border-b flex gap-6 text-sm font-bold text-gray-500 overflow-x-auto no-scrollbar">
                    <button className="pb-3 border-b-2 border-green-600 text-green-700 whitespace-nowrap">Câu chuyện</button>
                    <button className="pb-3 hover:text-green-600 hover:border-b-2 hover:border-gray-300 whitespace-nowrap transition">Nhà hảo tâm</button>
                    <button className="pb-3 hover:text-green-600 hover:border-b-2 hover:border-gray-300 whitespace-nowrap transition">Cập nhật dự án</button>
                </div>

                {/* Detailed Article */}
                <div className="prose prose-lg max-w-none text-gray-700">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Chi tiết dự án</h3>
                    <p className="mb-4">
                        {project.description}
                    </p>
                    
                    {/* These parts are kept static as per instruction */}
                    <div className="grid grid-cols-2 gap-4 my-6">
                        <div className="bg-gray-200 h-48 rounded-xl flex items-center justify-center text-xs text-gray-400">Ảnh minh họa 1</div>
                        <div className="bg-gray-200 h-48 rounded-xl flex items-center justify-center text-xs text-gray-400">Ảnh minh họa 2</div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">Giải pháp và Tác động dự kiến</h3>
                    <div className="bg-green-50 p-6 rounded-2xl space-y-4 border border-green-100">
                        <div className="flex gap-3 items-start">
                            <CheckCircle className="text-green-600 shrink-0 mt-0.5" size={20} />
                            <span><span className="font-bold">3 phòng học kiên cố</span> (45m2/phòng) đảm bảo tiêu chuẩn chống rét, chống nóng.</span>
                        </div>
                        <div className="flex gap-3 items-start">
                            <CheckCircle className="text-green-600 shrink-0 mt-0.5" size={20} />
                            <span><span className="font-bold">1 công trình vệ sinh</span> khép kín và hệ thống nước sạch cho giáo viên và học sinh.</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* RIGHT COLUMN (SIDEBAR) */}
            <div className="lg:col-span-4 space-y-6">
                
                <div className="bg-white p-6 rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 sticky top-24 z-10">
                    <h3 className="font-bold text-gray-500 text-xs mb-2 uppercase tracking-wide">Tiến độ quyên góp</h3>
                    <div className="flex items-end gap-1 mb-2">
                        <span className="text-3xl font-extrabold text-gray-900">{formatCurrency(project.raised)}</span>
                        <span className="text-gray-400 text-sm mb-1.5 font-medium">/ {formatCurrency(project.goal)}</span>
                    </div>
                    
                    <ProgressBar current={project.raised} target={project.goal} />
                    
                    <div className="flex justify-between text-xs font-bold text-gray-500 mb-6 mt-3">
                        <div className="text-center">
                            <span className="text-gray-900 text-sm">{progressPercent}%</span>
                            <br/><span className="font-normal opacity-80">Đạt được</span>
                        </div>
                        <div className="text-center">
                            <span className="text-gray-900 text-sm">{project.donors.toLocaleString('vi-VN')}</span>
                            <br/><span className="font-normal opacity-80">Lượt ủng hộ</span>
                        </div>
                        <div className="text-center">
                            <span className="text-orange-500 text-sm">15</span>
                            <br/><span className="font-normal opacity-80">Ngày còn lại</span>
                        </div>
                    </div>

                    <div className="space-y-3 pt-4 border-t border-gray-100">
                        <label className="font-bold text-sm text-gray-700">Chọn mức đóng góp:</label>
                        <div className="grid grid-cols-3 gap-2">
                            {[50000, 100000, 500000].map((amt) => (
                                <button 
                                    key={amt}
                                    onClick={() => setDonationAmount(amt)}
                                    className={`py-2 px-1 rounded-lg text-sm font-bold border transition-all ${
                                        donationAmount === amt 
                                        ? 'border-green-500 bg-green-50 text-green-700 ring-1 ring-green-500' 
                                        : 'border-gray-200 text-gray-600 hover:border-green-400 hover:text-green-600'
                                    }`}
                                >
                                    {amt >= 1000000 ? (amt/1000000) + 'Tr' : (amt/1000) + 'k'}
                                </button>
                            ))}
                        </div>
                        
                        <div className="relative">
                            <input 
                                placeholder="Nhập số tiền khác"
                                type="number" 
                                value={donationAmount}
                                onChange={(e) => setDonationAmount(e.target.value)}
                                className="w-full border border-gray-300 rounded-xl p-3 pr-12 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                            />
                            <span className="absolute right-4 top-3.5 text-gray-400 text-sm font-bold">VNĐ</span>
                        </div>

                        <Link href="/donate" className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-green-200 transition transform active:scale-[0.98] flex items-center justify-center gap-2 text-base">
                            <Heart size={20} className="fill-white" /> QUYÊN GÓP NGAY
                        </Link>
                    </div>
                </div>
            </div>
        </div>

        {/* SECTION 3: RELATED PROJECTS */}
        <div className="mt-16 border-t pt-10">
            <div className="flex justify-between items-end mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Các dự án khác</h2>
                    <p className="text-gray-500 mt-1">Cùng chung tay vì cộng đồng tốt đẹp hơn</p>
                </div>
                <Link href="/project" className="text-green-600 font-bold text-sm hover:underline flex items-center gap-1 bg-green-50 px-3 py-1.5 rounded-lg transition">
                    Xem tất cả <span aria-hidden="true">&rarr;</span>
                </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {otherProjects.map(p => (
                    <ProjectCard key={p.id} project={p} />
                ))}
            </div>
        </div>
      </main>
    </div>
  );
}
