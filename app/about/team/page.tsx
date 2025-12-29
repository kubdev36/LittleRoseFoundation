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
      {/* Hero Banner - Đã điều chỉnh kích thước cân đối hơn */}
      <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[650px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/banner4.jpg"
            alt="Đội ngũ Quỹ từ thiện Bông hồng nhỏ"
            fill
            sizes="100vw"
            className="object-cover transition-transform duration-[30s] hover:scale-110"
            priority
          />
          {/* Gradient Overlay giống VolunteerCTASection */}
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-900/70 to-black/40" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Breadcrumb */}
          <p className="text-base md:text-lg text-emerald-50 mb-4 opacity-90">
            <Link href="/" className="hover:text-white transition-colors">
              Trang chủ
            </Link>{' '}
            / <span className="text-white font-medium">Đội ngũ</span>
          </p>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight tracking-tight drop-shadow-2xl">
            Đội ngũ
            <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-300">
              {' '}Quản lý Quỹ
            </span>
          </h1>

          {/* Description */}
          <p className="mt-8 text-lg md:text-xl text-emerald-50 max-w-3xl mx-auto leading-relaxed font-light opacity-90">
            Những con người tâm huyết, giàu kinh nghiệm và tràn đầy tình yêu thương đã cùng nhau đặt nền móng và dẫn dắt hành trình lan tỏa giá trị nhân ái của Quỹ.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        {/* Tabs Navigation */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-12 py-6 -mb-px">
              {/* Active Tab */}
              <Link
                href="/about/team"
                className="text-base sm:text-lg font-semibold text-[#1a522e] border-b-4 border-[#1a522e] pb-3 transition-all"
                scroll={false}
              >
                Hội đồng quản lý
              </Link>

              {/* Inactive Tabs */}
              <Link
                href="/about/supervisory-board"
                className="text-base sm:text-lg font-medium text-gray-500 hover:text-[#1a522e] hover:border-b-4 hover:border-[#1a522e] pb-3 transition-all duration-200"
                scroll={false}
              >
                Ban kiểm soát
              </Link>

              <Link
                href="/about/advisory-board"
                className="text-base sm:text-lg font-medium text-gray-500 hover:text-[#1a522e] hover:border-b-4 hover:border-[#1a522e] pb-3 transition-all duration-200"
                scroll={false}
              >
                Ban cố vấn
              </Link>
            </div>
          </div>
        </div>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 mt-12 lg:mt-16">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl lg:rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col"
            >
              {/* Member Image */}
              <div className="relative aspect-[3/4] w-full overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover hover:scale-110 transition-transform duration-700"
                  priority={index < 3}
                />
              </div>

              {/* Member Info */}
              <div className="p-6 sm:p-8 text-center flex flex-col justify-center bg-gradient-to-t from-gray-50 to-white">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                  {member.name}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {member.position}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Note */}
        <div className="text-center mt-16 lg:mt-20">
          <p className="text-base sm:text-lg text-gray-500 italic">
            (Thông tin về Ban kiểm soát và Ban cố vấn sẽ được cập nhật sớm nhất)
          </p>
        </div>
      </div>
    </div>
  );
};

export default TeamPage;