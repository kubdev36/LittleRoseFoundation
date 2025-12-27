'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BookOpen, HeartPulse, Users, CircleDollarSign, CheckCircle, Eye, Target, Diamond } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-96 w-full">
        <Image
          src="/images/banner4.jpg"
          alt="Về chúng tôi - Quỹ từ thiện Bông hồng nhỏ"
          fill
          className="object-cover brightness-50"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h1 className="text-5xl font-bold mb-4">Về chúng tôi</h1>
          <p className="text-lg">
            <Link href="/" className="hover:text-[#1a522e] transition-colors">
              Trang chủ
            </Link>{' '}
            / <span className="text-[#1a522e]">Về chúng tôi</span>
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-16 px-8 text-gray-800">
        {/* Giới thiệu quỹ */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
          {/* Ảnh công bố thành lập */}
          <div className="order-1 lg:order-1 relative">
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/images/congBoThanhLap.jpg"
                alt="Công bố thành lập Quỹ Từ Thiện Bông Hồng Nhỏ năm 2021"
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
            <div className="absolute bottom-10 -left-4 md:-left-8 bg-white p-2 rounded-xl shadow-xl">
              <div className="bg-[#1a522e] text-white py-4 px-8 rounded-lg text-center">
                <p className="text-4xl font-bold">2021</p>
                <p className="text-sm font-medium uppercase">Năm thành lập</p>
              </div>
            </div>
          </div>

          {/* Text giới thiệu */}
          <div className="order-2 lg:order-2">
            
            <h3 className="text-3xl font-bold mb-6">Quỹ Từ Thiện Bông Hồng Nhỏ</h3>
            <p className="text-lg leading-relaxed mb-6">
              Quỹ từ thiện Bông hồng nhỏ (Little Roses Foundation) là quỹ từ thiện không vì mục tiêu lợi nhuận, hướng đến các hoạt động thiện nguyện đa dạng phục vụ cộng đồng.
            </p>
            <p className="text-lg leading-relaxed mb-6">
              Được thúc đẩy bởi truyền thống gia đình và tấm lòng người Mẹ, NHG là thành viên sáng lập chủ chốt của Quỹ.
            </p>
            <p className="text-lg leading-relaxed mb-8">
              Quỹ phục vụ chủ yếu trên các lĩnh vực sức khỏe – giáo dục, được cấp phép bởi Bộ Nội Vụ để hoạt động trên phạm vi toàn quốc và đón nhận sự trợ giúp quốc tế.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <CheckCircle className="w-8 h-8 text-[#1a522e]" />
                <p className="text-lg">Được cấp phép bởi Bộ Nội Vụ</p>
              </div>
              <div className="flex items-center gap-4">
                <CheckCircle className="w-8 h-8 text-[#1a522e]" />
                <p className="text-lg">Hoạt động trên phạm vi toàn quốc</p>
              </div>
              <div className="flex items-center gap-4">
                <CheckCircle className="w-8 h-8 text-[#1a522e]" />
                <p className="text-lg">Minh bạch và công khai tài chính</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tầm nhìn, Sứ mệnh, Giá trị cốt lõi */}
        <div className="max-w-6xl mx-auto mb-24">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Tầm nhìn */}
            <div className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-[#1a522e]/10 rounded-full">
                  <Eye className="w-12 h-12 text-[#1a522e]" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-[#1a522e] mb-4">Tầm nhìn</h2>
              <p className="text-lg leading-relaxed">
                Quỹ từ thiện Bông hồng nhỏ là quỹ từ thiện của nền văn minh tình thương và các giá trị nhân bản toàn diện dành cho tất cả những ai đang trong hoàn cảnh nghèo khó cả về vật chất cũng như tinh thần.
              </p>
            </div>

            {/* Sứ mệnh */}
            <div className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-[#1a522e]/10 rounded-full">
                  <Target className="w-12 h-12 text-[#1a522e]" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-[#1a522e] mb-4">Sứ mệnh</h2>
              <p className="text-lg leading-relaxed">
                Quỹ từ thiện Bông hồng nhỏ giúp những người đang lâm cảnh ngặt nghèo do hoàn cảnh khách quan vượt qua nghịch cảnh, cải thiện đời sống vật chất và tinh thần các nhóm xã hội; tạo cơ hội để mọi người không phân biệt thu nhập hay số lượng tài sản sở hữu đều có thể chia sẻ giá trị bản thân cho sự phát triển cộng đồng.
              </p>
            </div>

            {/* Giá trị cốt lõi */}
            <div className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-[#1a522e]/10 rounded-full">
                  <Diamond className="w-12 h-12 text-[#1a522e]" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-[#1a522e] mb-4">Giá trị cốt lõi</h2>
              <p className="text-lg leading-relaxed">
                Quỹ từ thiện Bông hồng nhỏ chọn và trung thành trong hoạt động theo các giá trị: Yêu thương – Chính trực – Tôn trọng – Tận tâm.
              </p>
            </div>
          </div>
        </div>

        {/* Lĩnh vực hoạt động */}
        <div className="max-w-6xl mx-auto mb-24">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Lĩnh vực hoạt động</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {/* Giáo dục */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-xl transition-shadow duration-300">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-[#1a522e]/10 rounded-full">
                  <BookOpen className="w-10 h-10 text-[#1a522e]" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Hỗ trợ phát triển giáo dục</h3>
              <p className="text-gray-600 leading-relaxed">
                Trao học bổng, xây dựng trường học, thư viện và hỗ trợ dụng cụ học tập cho trẻ em vùng cao, vùng khó khăn.
              </p>
            </div>

            {/* Y tế */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-xl transition-shadow duration-300">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-[#1a522e]/10 rounded-full">
                  <HeartPulse className="w-10 h-10 text-[#1a522e]" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Hỗ trợ y tế và sức khoẻ</h3>
              <p className="text-gray-600 leading-relaxed">
                Tài trợ phẫu thuật tim, mắt, hỗ trợ bệnh nhân hiểm nghèo và các dự án nước sạch, vệ sinh môi trường.
              </p>
            </div>

            {/* Bác ái xã hội */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-xl transition-shadow duration-300">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-[#1a522e]/10 rounded-full">
                  <Users className="w-10 h-10 text-[#1a522e]" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Bác ái xã hội</h3>
              <p className="text-gray-600 leading-relaxed">
                Xây nhà tình thương, cầu dân sinh, cứu trợ thiên tai và giúp đỡ trẻ mồ côi, người già neo đơn.
              </p>
            </div>

            {/* Gây quỹ */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-xl transition-shadow duration-300">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-[#1a522e]/10 rounded-full">
                  <CircleDollarSign className="w-10 h-10 text-[#1a522e]" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Gây quỹ</h3>
              <p className="text-gray-600 leading-relaxed">
                Tổ chức các hoạt động gây quỹ và kết nối các nguồn lực xã hội để duy trì và phát triển các dự án thiện nguyện.
              </p>
            </div>
          </div>
        </div>

        {/* Phần Hợp tác */}
        <div className="bg-gray-200 py-16 px-8 rounded-2xl">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-800 mb-8">Hợp tác với Little Roses Foundation</h2>

            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Little Roses Foundation cung cấp nền tảng cho các tổ chức có chức năng vận động và tiếp nhận tài trợ thực hiện việc khởi tạo các dự án gây quỹ và kết nối các Doanh nghiệp thực hiện các chương trình Trách nhiệm xã hội (CSR).
            </p>

            <p className="text-lg text-gray-700 mb-10 leading-relaxed">
              Nếu bạn đại diện một tổ chức được cấp phép hoạt động, như: Quỹ từ thiện; Quỹ xã hội; Tổ chức xã hội nghề nghiệp;... hay các Doanh nghiệp có mong muốn hợp tác triển khai CSR, ESG, vui lòng liên hệ với chúng tôi để được hỗ trợ.
            </p>

            <a
              href="https://littlerosesfoundation.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#1a522e] text-white font-semibold py-4 px-10 rounded-lg hover:bg-[#133f24] transition duration-300 shadow-lg text-lg uppercase tracking-wider"
            >
              Liên hệ Little Roses Foundation
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;