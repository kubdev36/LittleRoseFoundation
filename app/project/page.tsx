'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight, ChevronLeft, ChevronsLeft, ChevronsRight, Share2 } from 'lucide-react';
import Image from 'next/image';
import projectsData from '@/app/data/projects.json';

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

const projects: Project[] = projectsData;

const ITEMS_PER_PAGE = 6;

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0,
  }).format(amount);
};

const calculateProgress = (raised: number, goal: number): number => {
  return Math.min(Math.round((raised / goal) * 100), 100);
};

const truncateDescription = (text: string, wordLimit: number = 20): string => {
  const words = text.split(' ');
  if (words.length <= wordLimit) return text;
  return words.slice(0, wordLimit).join(' ') + '...';
};

// Hàm gán màu category giống FeaturedProjects & ProjectDetail đã ghi nhớ
const getCategoryColor = (category: string) => {
  switch (category) {
    case 'Hỗ trợ phát triển giáo dục':
      return 'bg-blue-600';
    case 'Hỗ trợ y tế và sức khoẻ':
      return 'bg-red-600';
    case 'Bác ái xã hội':
      return 'bg-[#1a522e]';
    default:
      return 'bg-gray-600';
  }
};

export default function FundraisingProjectsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedProvince, setSelectedProvince] = useState('all');

  const statuses = useMemo(() => {
    const stats = ['all', ...Array.from(new Set(projects.map(p => p.status)))];
    return stats;
  }, []);

  const provinces = useMemo(() => {
    const allProvinces = projects.flatMap(p => p.province.split(',').map(s => s.trim()));
    return ['all', ...Array.from(new Set(allProvinces))].sort();
  }, []);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        searchTerm === '' ||
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.keywords.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = selectedStatus === 'all' || project.status === selectedStatus;

      const matchesProvince =
        selectedProvince === 'all' ||
        project.province.split(',').some(p => p.trim() === selectedProvince);

      return matchesSearch && matchesStatus && matchesProvince;
    });
  }, [searchTerm, selectedStatus, selectedProvince]);

  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);

  const currentProjects = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredProjects.slice(startIndex, endIndex);
  }, [filteredProjects, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedStatus, selectedProvince]);

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Breadcrumb */}
        <div className="mb-8">
          <nav className="flex items-center text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:text-green-600 hover:underline transition">Trang chủ</Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900 font-medium">Dự án gây quỹ</span>
          </nav>
          <h1 className="text-3xl font-bold text-gray-900">Tất cả dự án</h1>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-wrap items-center gap-4">
          <input
            type="text"
            placeholder="Tìm kiếm dự án (vd: Xây trường, cứu trợ, tim bẩm sinh...)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg flex-1 min-w-64 focus:outline-none focus:ring-2 focus:ring-[#1a522e]"
          />

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a522e]"
          >
            <option value="all">Tất cả trạng thái</option>
            {statuses.filter(stat => stat !== 'all').map((stat) => (
              <option key={stat} value={stat}>{stat}</option>
            ))}
          </select>

          <select
            value={selectedProvince}
            onChange={(e) => setSelectedProvince(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a522e]"
          >
            <option value="all">Tất cả khu vực</option>
            {provinces.filter(prov => prov !== 'all').map((prov) => (
              <option key={prov} value={prov}>{prov}</option>
            ))}
          </select>
        </div>

        {/* Số lượng kết quả */}
        <div className="mb-8 text-gray-600">
          Hiển thị <strong>{filteredProjects.length}</strong> dự án
          {searchTerm && ` phù hợp với tìm kiếm "${searchTerm}"`}
        </div>

        {/* Projects Grid - Card giống hệt FeaturedProjects & ProjectDetail */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentProjects.length === 0 ? (
            <div className="col-span-full text-center py-12 text-gray-500">
              Không tìm thấy dự án nào phù hợp với bộ lọc hiện tại.
            </div>
          ) : (
            currentProjects.map((project) => {
              const progress = calculateProgress(project.raised, project.goal);

              return (
                <div
                  key={project.id}
                  className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 h-full flex flex-col"
                >
                  {/* Ảnh + Category badge */}
                  <div className="relative h-48 overflow-hidden group flex-shrink-0">
                    <Link href={`/project/${project.id}`}>
                      <Image
                        src={project.imageSrc}
                        alt={project.title}
                        fill
                        className="object-cover transition-all duration-500 group-hover:scale-110"
                      />
                    </Link>
                    <div className="absolute inset-0 bg-black/10" />
                  </div>

                  {/* Nội dung */}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="mb-3">
                      <span
                        className={`text-white text-xs font-bold px-3 py-1 rounded-full ${getCategoryColor(
                          project.category
                        )}`}
                      >
                        {project.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                      <Link href={`/project/${project.id}`} className="hover:text-[#1a522e] transition-colors">
                        {project.title}
                      </Link>
                    </h3>

                    <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-5">
                      {truncateDescription(project.description, 20)}
                    </p>

                    {/* Thanh tiến độ */}
                    <div className="mb-4 mt-auto">
                      <div className="flex justify-between text-sm text-gray-600 mb-3">
                        <span className="font-bold text-[#1a522e]">
                          Đã góp: {formatCurrency(project.raised)}
                        </span>
                        <span>Mục tiêu: {formatCurrency(project.goal)}</span>
                      </div>

                      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div
                          className="bg-[#1a522e] h-full rounded-full transition-all duration-1000"
                          style={{ width: `${progress}%` }}
                        />
                      </div>

                      <div className="flex justify-between text-sm text-gray-500 mt-3">
                        <span>{project.donors} nhà tài trợ</span>
                        <span>{progress}% hoàn thành</span>
                      </div>
                    </div>

                    {/* Nút hành động */}
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-3">
                        <Link
                          href={`/project/${project.id}`}
                          className="flex-1 bg-white border-2 border-gray-100 text-gray-700 py-2 font-bold text-sm flex items-center justify-center rounded-lg hover:border-[#1a522e] hover:text-[#1a522e] transition"
                        >
                          Xem chi tiết
                        </Link>
                        <button
                          className="w-10 h-10 flex items-center justify-center border-2 border-gray-100 hover:border-[#1a522e] transition rounded-lg group"
                          aria-label="Chia sẻ"
                        >
                          <Share2 className="w-5 h-5 text-gray-800 group-hover:text-[#1a522e] transition" />
                        </button>
                      </div>

                      <Link
                        href="/donate"
                        className="w-full bg-[#1a522e] text-white py-3 font-bold text-base flex items-center justify-center gap-2 hover:bg-[#1a522e]/90 transition rounded-lg group"
                      >
                        Quyên góp ngay
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Pagination - Đồng bộ màu với ProjectDetail */}
        {totalPages > 1 && (
          <div className="mt-12 flex justify-center items-center gap-3">
            <button onClick={() => handlePageChange(1)} disabled={currentPage === 1} className="p-2 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed">
              <ChevronsLeft className="w-5 h-5" />
            </button>
            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="p-2 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed">
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-4 py-2 rounded transition-colors ${
                    currentPage === page ? 'bg-[#1a522e] text-white' : 'hover:bg-gray-200'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="p-2 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed">
              <ChevronRight className="w-5 h-5" />
            </button>
            <button onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} className="p-2 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed">
              <ChevronsRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </>
  );
}