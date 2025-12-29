'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const TeamPage: React.FC = () => {
  const teamMembers = [
    {
      name: 'Hoàng Nguyễn Thu Thảo',
      position: 'TGĐ Tập đoàn GD Nguyễn Hoàng - Chủ tịch Hội đồng Quản lý Quỹ',
      image: '/images/HoangNguyenThuThao.png',
    },
    {
      name: 'Đỗ Mạnh Cường',
      position: 'Phó TGĐ Tập đoàn GD Nguyễn Hoàng - Phó Chủ tịch Hội đồng Quản lý Quỹ',
      image: '/images/DoManhCuong.png',
    },
    {
      name: 'Nguyễn Đức Thạch Diễm',
      position: 'TGĐ Ngân hàng TMCP Sài Gòn Thương Tín (Sacombank) - Phó Chủ tịch Hội đồng Quản lý Quỹ',
      image: '/images/NguyenDucThanhDiem.png',
    },
    {
      name: 'Hoàng Quốc Anh Vũ',
      position: 'Cổ đông sáng lập - Thành viên Hội đồng Quản lý Quỹ',
      image: '/images/HoangQuocAnhVu.png',
    },
    {
      name: 'Đặng Thế Đức',
      position: 'TGĐ Công ty Luật Indochine Counsel - Thành viên Hội đồng Quản lý Quỹ',
      image: '/images/DangTheDuc.png',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Đồng bộ với các trang khác */}
      <div className="relative h-96 w-full">
        <Image
          src="/images/banner4.jpg"
          alt="Đội ngũ Quỹ từ thiện Bông hồng nhỏ"
          fill
          className="object-cover brightness-50"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h1 className="text-5xl font-bold mb-4">Đội ngũ</h1>
          <p className="text-lg">
            <Link href="/" className="hover:text-[#1a522e] transition-colors">
              Trang chủ
            </Link>{' '}
            / <span className="text-[#1a522e]">Đội ngũ</span>
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-16 px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            Hội đồng quản lý Quỹ từ thiện Bông hồng nhỏ
          </h2>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Những con người tâm huyết, giàu kinh nghiệm và tràn đầy tình yêu thương đã cùng nhau đặt nền móng cho hành trình lan tỏa giá trị nhân ái của Quỹ.
          </p>
        </div>

        {/* Tab navigation - Theo đúng mẫu đã ghi nhớ */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-8">
            <div className="flex flex-wrap justify-start items-center gap-12 py-6 -mb-px">
              {/* Hội đồng quản lý - Active */}
              <Link
                href="/about/team"
                className="text-lg font-semibold text-[#1a522e] border-b-4 border-[#1a522e] pb-2"
                scroll={false}
              >
                Hội đồng quản lý
              </Link>

              {/* Ban kiểm soát */}
              <Link
                href="/about/supervisory-board"
                className="text-lg font-medium text-gray-500 hover:text-[#1a522e] hover:border-b-4 hover:border-[#1a522e] pb-2 transition-all duration-200"
                scroll={false}
              >
                Ban kiểm soát
              </Link>

              {/* Ban cố vấn */}
              <Link
                href="/about/advisory-board"
                className="text-lg font-medium text-gray-500 hover:text-[#1a522e] hover:border-b-4 hover:border-[#1a522e] pb-2 transition-all duration-200"
                scroll={false}
              >
                Ban cố vấn
              </Link>
            </div>
          </div>
        </div>

        {/* Grid hiển thị thành viên */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
            >
              {/* Ảnh thành viên */}
              <div className="relative h-96 w-full">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>

              {/* Thông tin */}
              <div className="p-6 text-center flex-1 flex flex-col justify-center bg-gray-50">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{member.name}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{member.position}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Note về các ban khác */}
        <div className="text-center mt-16">
          <p className="text-lg text-gray-500 italic">
            (Thông tin về Ban kiểm soát và Ban cố vấn sẽ được cập nhật sớm nhất)
          </p>
        </div>
      </div>
    </div>
  );
};

export default TeamPage;