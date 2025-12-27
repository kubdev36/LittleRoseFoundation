'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight, ChevronLeft, ChevronsLeft, ChevronsRight, Share2 } from 'lucide-react';
import { useParams } from 'next/navigation';
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

// Sửa đúng slug cho tất cả danh mục
const categoryMap: Record<string, string> = {
  'bac-ai-xa-hoi': 'Bác ái xã hội',
  'ho-tro-y-te-va-suc-khoe': 'Hỗ trợ y tế và sức khoẻ',
  'ho-tro-phat-trien-giao-duc': 'Hỗ trợ phát triển giáo dục',
};

// Hàm chuẩn hóa category thành slug chính xác
const normalizeCategoryToSlug = (category: string): string => {
  return category
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '');
};

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

// Hàm gán màu category giống FeaturedProjects đã ghi nhớ
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

export default function CategoryProjectsClient() {
  const params = useParams();
  const categorySlug = params.category as string;

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedProvince, setSelectedProvince] = useState('all');

  const categoryName = categoryMap[categorySlug];

  const categoryProjects = useMemo(() => {
    if (!categorySlug || !categoryName) return [];
    return projects.filter(p => normalizeCategoryToSlug(p.category) === categorySlug);
  }, [categorySlug]);

  const provinces = useMemo(() => {
    const allProvinces = categoryProjects.flatMap(p => 
      p.province.split(',').map(s => s.trim())
    );
    return ['all', ...Array.from(new Set(allProvinces))].sort();
  }, [categoryProjects]);

  const filteredProjects = useMemo(() => {
    return categoryProjects.filter((project) => {
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
  }, [categoryProjects, searchTerm, selectedStatus, selectedProvince]);

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
  }, [categorySlug, searchTerm, selectedStatus, selectedProvince]);

  if (!categoryName) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Không tìm thấy danh mục</h1>
        <p className="text-gray-600 mb-8">
          Danh mục bạn đang tìm không tồn tại hoặc đã bị xóa.
        </p>
        <Link href="/du-an" className="text-[#1a522e] hover:underline font-medium">
          ← Quay lại tất cả dự án
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <nav className="text-sm text-gray-600 mb-2">
          <Link href="/" className="hover:text-[#1a522e] transition-colors">
            Trang chủ
          </Link>{' '}
          /{' '}
          <Link href="/du-an" className="hover:text-[#1a522e] transition-colors">
            Tất cả dự án
          </Link>{' '}
          / <span className="text-gray-900">{categoryName}</span>
        </nav>
        <h1 className="text-3xl font-bold mb-4">
          Dự án: {categoryName}
        </h1>
        <p className="text-gray-700">
          Cùng chung tay hỗ trợ các dự án thuộc lĩnh vực {categoryName.toLowerCase()}.
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8 flex flex-wrap items-center gap-4">
        <input
          type="text"
          placeholder="Tìm kiếm dự án..."
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
          <option value="Đang gây quỹ">Đang gây quỹ</option>
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
      <div className="mb-6 text-gray-600">
        Hiển thị <strong>{filteredProjects.length}</strong> dự án
        {searchTerm && ` phù hợp với tìm kiếm "${searchTerm}"`}
      </div>

      {/* Grid dự án - Card giống hệt FeaturedProjects */}
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
                    <img
                      src={project.imageSrc}
                      alt={project.title}
                      className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
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

      {/* Pagination */}
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
  );
}