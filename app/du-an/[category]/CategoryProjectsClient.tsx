'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight, ChevronLeft, ChevronsLeft, ChevronsRight } from 'lucide-react';
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
    .replace(/[\u0300-\u036f]/g, '') // bỏ dấu
    .replace(/đ/g, 'd')             // xử lý riêng chữ đ
    .replace(/\s+/g, '-')           // khoảng trắng → gạch ngang
    .replace(/[^\w-]/g, '');        // xóa ký tự đặc biệt
};

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('vi-VN').format(amount) + 'đ';
};

const calculateProgress = (raised: number, goal: number): number => {
  return Math.round((raised / goal) * 100);
};

export default function CategoryProjectsClient() {
  const params = useParams();
  const categorySlug = params.category as string;

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedProvince, setSelectedProvince] = useState('all');

  // Tìm tên danh mục từ slug
  const categoryName = categoryMap[categorySlug];

  // Lọc dự án theo slug (dùng hàm chuẩn hóa để khớp chính xác)
  const categoryProjects = useMemo(() => {
    if (!categorySlug || !categoryName) return [];
    
    return projects.filter(p => 
      normalizeCategoryToSlug(p.category) === categorySlug
    );
  }, [categorySlug, categoryName]);

  // Lấy danh sách tỉnh duy nhất từ danh mục hiện tại
  const provinces = useMemo(() => {
    const allProvinces = categoryProjects.flatMap(p => 
      p.province.split(',').map(s => s.trim())
    );
    const unique = ['all', ...Array.from(new Set(allProvinces))];
    return unique.sort();
  }, [categoryProjects]);

  // Lọc thêm theo tìm kiếm, trạng thái, tỉnh
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

  // Phân trang
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

  // Nếu không tìm thấy danh mục → trang 404 nhẹ
  if (!categoryName) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Không tìm thấy danh mục</h1>
        <p className="text-gray-600 mb-8">
          Danh mục bạn đang tìm không tồn tại hoặc đã bị xóa.
        </p>
        <Link href="/du-an" className="text-green-600 hover:underline font-medium">
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
          <Link href="/" className="hover:text-green-600 transition-colors">
            Trang chủ
          </Link>{' '}
          /{' '}
          <Link href="/du-an" className="hover:text-green-600 transition-colors">
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
          className="px-4 py-2 border border-gray-300 rounded-lg flex-1 min-w-64 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="all">Tất cả trạng thái</option>
          <option value="Đang gây quỹ">Đang gây quỹ</option>
        </select>

        <select
          value={selectedProvince}
          onChange={(e) => setSelectedProvince(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
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

      {/* Grid dự án */}
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
                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-64 overflow-hidden">
                  <Link href={`/project/${project.id}`}>
                    <img
                      src={project.imageSrc}
                      alt={project.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </Link>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-bold mb-3 line-clamp-2">
                    <Link href={`/project/${project.id}`} className="hover:text-green-600 transition-colors">
                      {project.title}
                    </Link>
                  </h3>

                  <p className="text-gray-600 text-sm mb-5 line-clamp-3">
                    {project.description}
                  </p>

                  <div className="mb-5">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-semibold text-green-600">
                        {formatCurrency(project.raised)}
                      </span>
                      <span className="text-gray-500">
                        Mục tiêu: {formatCurrency(project.goal)}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div
                        className="bg-green-500 h-full transition-all duration-700"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  <Link href={`/project/${project.id}`} className="block">
                    <button className="w-full bg-green-500 text-white font-medium py-3 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-2">
                      Quyên góp ngay
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </Link>
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
                  currentPage === page ? 'bg-green-500 text-white' : 'hover:bg-gray-200'
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