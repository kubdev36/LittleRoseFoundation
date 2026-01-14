'use client';

import React, { useState } from "react";
import { Share2, FileText, Heart, CheckCircle, Clock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import RoseProgress from "@/app/components/RoseProgress";

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

const StatusBadge = ({ label, type = "primary" }: { label: string; type?: "primary" | "secondary" }) => {
  const bg = type === "primary" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700";
  return <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${bg}`}>{label}</span>;
};

const ProjectCard = ({ project }: { project: Project }) => {
  const progress = Math.round((project.raised / project.goal) * 100);
  return (
    <Link
      href={`/project/${project.id}`}
      className="block bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition cursor-pointer"
    >
      <div className="h-48 bg-gray-200 relative group">
        <Image src={project.imageSrc} alt={project.title} fill className="object-cover" />
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition" />
      </div>
      <div className="p-4">
        <h3 className="font-bold text-gray-800 mb-2 text-sm md:text-base line-clamp-2">{project.title}</h3>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
          <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${progress}%` }} />
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>{progress}% Hoàn thành</span>
          <span className="font-medium text-gray-700">{formatCurrency(project.raised)}</span>
        </div>
      </div>
    </Link>
  );
};

export default function ProjectDetailClient({ project, allProjects }: { project: Project; allProjects: Project[] }) {
  const [donationAmount, setDonationAmount] = useState<number | string>(100000);
  const progressPercent = Math.round((project.raised / project.goal) * 100);

  const otherProjects = allProjects.filter((p) => p.id !== project.id).slice(0, 3);

  // Tạo URL với đầy đủ thông tin dự án
  const createDonateUrl = () => {
    const params = new URLSearchParams({
      id: project.id.toString(),
      title: project.title,
      description: project.description,
      raised: project.raised.toString(),
      goal: project.goal.toString(),
      donors: project.donors.toString(),
      daysLeft: '15', // Số ngày còn lại
      imageSrc: project.imageSrc,
      amount: donationAmount.toString() // Truyền luôn số tiền đã chọn
    });
    return `/flowerModal?${params.toString()}`;
  };

  return (
    <div className="bg-gray-50 font-sans text-gray-800 pb-16">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 pt-6 mt-10">
        <nav className="flex items-center text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-green-600 hover:underline transition">
            Trang chủ
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <Link href="/project" className="hover:text-green-600 hover:underline transition">
            Dự án
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-900 font-medium truncate">{project.title}</span>
        </nav>
      </div>

      {/* Hero Title */}
      <div className="bg-white pb-10 pt-6 border-b shadow-sm mb-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3 mb-5 items-center text-sm">
            <StatusBadge label={project.status} />
            <StatusBadge label={project.category} type="secondary" />

            <div className="flex items-center text-gray-500 gap-1 ml-auto md:ml-4 font-medium">
              <Clock size={16} className="text-orange-500" /> <span>Còn 15 ngày</span>
            </div>

            <div className="flex gap-2 ml-auto md:ml-0">
              <button className="flex items-center gap-1 border px-3 py-1.5 rounded-full text-sm font-medium hover:bg-gray-50 transition">
                <Share2 size={16} /> Chia sẻ
              </button>
              <button className="flex items-center gap-1 border px-3 py-1.5 rounded-full text-sm font-medium hover:bg-gray-50 transition">
                <FileText size={16} /> Lưu
              </button>
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-5 leading-tight">
            {project.title}
          </h1>
          <p className="text-gray-600 max-w-4xl text-lg leading-relaxed">{project.description}</p>
        </div>
      </div>

      {/* Main Content Grid */}
      <main className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Left - Content */}
          <div className="lg:col-span-8 space-y-10">
            {/* Featured Image */}
            <div className="rounded-2xl overflow-hidden bg-gray-200 h-[300px] md:h-[450px] lg:h-[500px] relative shadow-inner">
              <Image src={project.imageSrc} alt={project.title} fill className="object-cover" />
              <button className="absolute bottom-5 right-5 bg-white/90 hover:bg-white text-gray-800 font-bold px-5 py-3 rounded-xl text-sm shadow-lg backdrop-blur-sm transition">
                Xem tất cả ảnh
              </button>
            </div>

            {/* Tabs */}
            <div className="border-b flex gap-8 text-sm md:text-base font-bold text-gray-500 overflow-x-auto pb-1">
              <button className="pb-4 border-b-4 border-green-600 text-green-700 whitespace-nowrap">Câu chuyện</button>
              <button className="pb-4 hover:text-green-600 transition whitespace-nowrap">Nhà hảo tâm</button>
              <button className="pb-4 hover:text-green-600 transition whitespace-nowrap">Cập nhật dự án</button>
            </div>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Chi tiết dự án</h3>
              <p className="mb-6">{project.description}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-8">
                <div className="bg-gray-200 h-64 rounded-xl flex items-center justify-center text-gray-400">Ảnh minh họa 1</div>
                <div className="bg-gray-200 h-64 rounded-xl flex items-center justify-center text-gray-400">Ảnh minh họa 2</div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-5">Giải pháp và Tác động dự kiến</h3>
              <div className="bg-green-50 p-8 rounded-2xl space-y-5 border border-green-100">
                <div className="flex gap-4 items-start">
                  <CheckCircle className="text-green-600 shrink-0 mt-1" size={24} />
                  <span>
                    <strong>3 phòng học kiên cố</strong> (45m²/phòng) đảm bảo tiêu chuẩn chống rét, chống nóng.
                  </span>
                </div>
                <div className="flex gap-4 items-start">
                  <CheckCircle className="text-green-600 shrink-0 mt-1" size={24} />
                  <span>
                    <strong>1 công trình vệ sinh</strong> khép kín và hệ thống nước sạch cho giáo viên và học sinh.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Sidebar Donate */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 sticky top-24 z-10">
              <h3 className="font-bold text-gray-500 text-xs uppercase tracking-wide mb-5">
                Tiến độ quyên góp
              </h3>

              {/* RoseProgress */}
              <RoseProgress raised={project.raised} goal={project.goal} className="mb-8 mx-auto" />

              {/* Stats */}
              <div className="grid grid-cols-3 text-center text-sm mb-8">
                <div>
                  <div className="font-bold text-gray-900 text-xl">{progressPercent}%</div>
                  <div className="text-gray-500 mt-1 text-xs">Đạt được</div>
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-xl">{project.donors.toLocaleString('vi-VN')}</div>
                  <div className="text-gray-500 mt-1 text-xs">Lượt ủng hộ</div>
                </div>
                <div>
                  <div className="font-bold text-orange-500 text-xl">15</div>
                  <div className="text-gray-500 mt-1 text-xs">Ngày còn lại</div>
                </div>
              </div>

              {/* Donation Form */}
              <div className="space-y-5 pt-6 border-t border-gray-100">
                <label className="font-bold text-sm text-gray-700 block">Chọn mức đóng góp:</label>
                <div className="grid grid-cols-3 gap-3">
                  {[50000, 100000, 500000].map((amt) => (
                    <button
                      key={amt}
                      onClick={() => setDonationAmount(amt)}
                      className={`py-3 px-2 rounded-xl text-sm font-bold border transition-all ${
                        donationAmount === amt
                          ? 'border-green-500 bg-green-50 text-green-700 ring-2 ring-green-300'
                          : 'border-gray-200 text-gray-600 hover:border-green-400 hover:text-green-600'
                      }`}
                    >
                      {amt >= 1000000 ? `${amt / 1000000}Tr` : `${amt / 1000}k`}
                    </button>
                  ))}
                </div>

                <div className="relative">
                  <input
                    type="number"
                    placeholder="Nhập số tiền khác"
                    value={donationAmount}
                    onChange={(e) => setDonationAmount(e.target.value)}
                    className="w-full border border-gray-300 rounded-xl p-4 pr-14 text-center text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                  />
                  <span className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 font-bold">VNĐ</span>
                </div>

                {/* Link tới trang donate với đầy đủ thông tin dự án */}
                <Link
                  href={createDonateUrl()}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-green-200 transition transform active:scale-95 flex items-center justify-center gap-3 text-lg mt-4 block text-center"
                >
                  <Heart size={22} className="fill-white" /> QUYÊN GÓP NGAY
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Related Projects */}
        <section className="mt-20 border-t pt-12">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Các dự án khác</h2>
              <p className="text-gray-600 mt-2">Cùng chung tay vì cộng đồng tốt đẹp hơn</p>
            </div>
            <Link
              href="/project"
              className="text-green-600 font-bold text-sm hover:underline flex items-center gap-2 bg-green-50 px-5 py-3 rounded-lg transition whitespace-nowrap"
            >
              Xem tất cả <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {otherProjects.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}