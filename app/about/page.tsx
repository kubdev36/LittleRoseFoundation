'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BookOpen, HeartPulse, Users, CircleDollarSign, CheckCircle, Eye, Target, Heart, ArrowRight } from 'lucide-react';

const AboutPage: React.FC = () => {
  const coreSections = [
    {
      number: 1,
      image: '/images/vission.jpg',
      title: 'Tầm nhìn',
      icon: <Eye className="w-16 h-16 text-[#1a522e] mb-4 mx-auto" />,
      content:
        'Quỹ từ thiện Bông hồng nhỏ là quỹ từ thiện của nền văn minh tình thương và các giá trị nhân bản toàn diện dành cho tất cả những ai đang trong hoàn cảnh nghèo khó cả về vật chất cũng như tinh thần.',
    },
    {
      number: 2,
      image: '/images/mission.jpg',
      title: 'Sứ mệnh',
      icon: <Target className="w-16 h-16 text-[#1a522e] mb-4 mx-auto" />,
      content:
        'Quỹ từ thiện Bông hồng nhỏ giúp những người đang lâm cảnh ngặt nghèo do hoàn cảnh khách quan vượt qua nghịch cảnh, cải thiện đời sống vật chất và tinh thần các nhóm xã hội; tạo cơ hội để mọi người không phân biệt thu nhập hay số lượng tài sản sở hữu đều có thể chia sẻ giá trị bản thân cho sự phát triển cộng đồng.',
    },
    {
      number: 3,
      image: '/images/core-values.jpg',
      title: 'Giá trị cốt lõi',
      icon: <Heart className="w-16 h-16 text-[#1a522e] mb-4 mx-auto" />,
      content:
        'Quỹ từ thiện Bông hồng nhỏ chọn và trung thành trong hoạt động theo các giá trị: Yêu thương – Chính trực – Tôn trọng – Tận tâm.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-64 sm:h-80 md:h-96 w-full overflow-hidden">
        <Image
          src="/images/banner4.jpg"
          alt="Về chúng tôi - Quỹ từ thiện Bông hồng nhỏ"
          fill
          className="object-cover brightness-50"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 drop-shadow-2xl">Về chúng tôi</h1>
          <p className="text-base sm:text-lg drop-shadow-md">
            <Link href="/" className="hover:text-emerald-300 transition-colors">
              Trang chủ
            </Link>{' '}
            / <span className="text-emerald-300">Về chúng tôi</span>
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 text-gray-800">
        {/* Giới thiệu quỹ */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-20 lg:mb-28">
          {/* Ảnh + Badge năm thành lập */}
          <div className="order-1 lg:order-1 relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/congBoThanhLap.jpg"
                alt="Công bố thành lập Quỹ Từ Thiện Bông Hồng Nhỏ năm 2021"
                width={800}
                height={600}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover w-full h-full"
                priority
              />
            </div>

            {/* Badge năm thành lập - ĐÃ SỬA ĐỂ KHÔNG ĐÈ LÊN ẢNH */}
            <div className="absolute -bottom-8 left-4 sm:left-8 lg:-bottom-10 lg:left-10 z-10">
              <div className="bg-white p-3 sm:p-4 rounded-2xl shadow-2xl border border-gray-100">
                <div className="bg-[#1a522e] text-white py-5 px-10 rounded-xl text-center">
                  <p className="text-4xl sm:text-5xl font-black">2021</p>
                  <p className="text-sm sm:text-base font-bold uppercase tracking-wider mt-1">Năm thành lập</p>
                </div>
              </div>
            </div>
          </div>

          {/* Nội dung text */}
          <div className="order-2 lg:order-2 mt-12 lg:mt-0">
            <h3 className="text-3xl sm:text-4xl font-bold mb-6">Quỹ Từ Thiện Bông Hồng Nhỏ</h3>
            <p className="text-base sm:text-lg leading-relaxed mb-6">
              Quỹ từ thiện Bông hồng nhỏ (Little Roses Foundation) là quỹ từ thiện không vì mục tiêu lợi nhuận, hướng đến các hoạt động thiện nguyện đa dạng phục vụ cộng đồng.
            </p>
            <p className="text-base sm:text-lg leading-relaxed mb-6">
              Được thúc đẩy bởi truyền thống gia đình và tấm lòng người Mẹ, NHG là thành viên sáng lập chủ chốt của Quỹ.
            </p>
            <p className="text-base sm:text-lg leading-relaxed mb-8">
              Quỹ phục vụ chủ yếu trên các lĩnh vực sức khỏe – giáo dục, được cấp phép bởi Bộ Nội Vụ để hoạt động trên phạm vi toàn quốc và đón nhận sự trợ giúp quốc tế.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <CheckCircle className="w-7 h-7 sm:w-8 sm:h-8 text-[#1a522e] flex-shrink-0" />
                <p className="text-base sm:text-lg">Được cấp phép bởi Bộ Nội Vụ</p>
              </div>
              <div className="flex items-center gap-4">
                <CheckCircle className="w-7 h-7 sm:w-8 sm:h-8 text-[#1a522e] flex-shrink-0" />
                <p className="text-base sm:text-lg">Hoạt động trên phạm vi toàn quốc</p>
              </div>
              <div className="flex items-center gap-4">
                <CheckCircle className="w-7 h-7 sm:w-8 sm:h-8 text-[#1a522e] flex-shrink-0" />
                <p className="text-base sm:text-lg">Minh bạch và công khai tài chính</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tầm nhìn – Sứ mệnh – Giá trị cốt lõi */}
        <div className="mb-20 lg:mb-28">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Tầm nhìn – Sứ mệnh – Giá trị cốt lõi
            </h2>
            <p className="text-lg md:text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              Những giá trị nền tảng định hình mọi hoạt động của Quỹ Bông Hồng Nhỏ
            </p>
          </div>

          <div className="space-y-12 lg:space-y-16">
            {coreSections.map((section, index) => (
              <div
                key={section.number}
                className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100"
              >
                {/* Ảnh + Tiêu đề */}
                <div className={`relative h-72 md:h-96 lg:h-full min-h-80 flex flex-col items-center justify-center text-white overflow-hidden ${
                  index % 2 === 1 ? 'md:order-last' : ''
                }`}>
                  <Image
                    src={section.image}
                    alt={section.title}
                    fill
                    className="object-cover brightness-75"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-black/40" />
                  <div className="text-8xl md:text-9xl font-extrabold opacity-20 absolute -top-8 -left-8 lg:-top-10 lg:-left-10">
                    {section.number}
                  </div>
                  <div className="relative z-10 text-center px-6">
                    <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold drop-shadow-2xl">
                      {section.title}
                    </h3>
                  </div>
                </div>

                {/* Nội dung text */}
                <div className="p-8 md:p-12 lg:p-16">
                  {section.icon}
                  <p className="text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed">
                    {section.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lĩnh vực hoạt động */}
        <div className="mb-20 lg:mb-28">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10 lg:mb-14">Lĩnh vực hoạt động</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {/* Các card lĩnh vực - giữ nguyên, chỉ điều chỉnh responsive nhẹ */}
            <div className="bg-white p-6 rounded-2xl shadow-lg text-center hover:shadow-2xl transition-shadow duration-300">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-[#1a522e]/10 rounded-full">
                  <BookOpen className="w-10 h-10 text-[#1a522e]" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Hỗ trợ phát triển giáo dục</h3>
              <p className="text-gray-600 text-sm lg:text-base leading-relaxed">
                Trao học bổng, xây dựng trường học, thư viện và hỗ trợ dụng cụ học tập cho trẻ em vùng cao, vùng khó khăn.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg text-center hover:shadow-2xl transition-shadow duration-300">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-[#1a522e]/10 rounded-full">
                  <HeartPulse className="w-10 h-10 text-[#1a522e]" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Hỗ trợ y tế và sức khoẻ</h3>
              <p className="text-gray-600 text-sm lg:text-base leading-relaxed">
                Tài trợ phẫu thuật tim, mắt, hỗ trợ bệnh nhân hiểm nghèo và các dự án nước sạch, vệ sinh môi trường.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg text-center hover:shadow-2xl transition-shadow duration-300">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-[#1a522e]/10 rounded-full">
                  <Users className="w-10 h-10 text-[#1a522e]" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Bác ái xã hội</h3>
              <p className="text-gray-600 text-sm lg:text-base leading-relaxed">
                Xây nhà tình thương, cầu dân sinh, cứu trợ thiên tai và giúp đỡ trẻ mồ côi, người già neo đơn.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg text-center hover:shadow-2xl transition-shadow duration-300">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-[#1a522e]/10 rounded-full">
                  <CircleDollarSign className="w-10 h-10 text-[#1a522e]" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Gây quỹ</h3>
              <p className="text-gray-600 text-sm lg:text-base leading-relaxed">
                Tổ chức các hoạt động gây quỹ và kết nối các nguồn lực xã hội để duy trì và phát triển các dự án thiện nguyện.
              </p>
            </div>
          </div>
        </div>

        {/* Phần Hợp tác */}
        <div className="bg-gray-200 py-12 lg:py-16 px-6 lg:px-8 rounded-3xl">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">Hợp tác với Little Roses Foundation</h2>
            <p className="text-base md:text-lg text-gray-700 mb-6 leading-relaxed">
              Little Roses Foundation cung cấp nền tảng cho các tổ chức có chức năng vận động và tiếp nhận tài trợ thực hiện việc khởi tạo các dự án gây quỹ và kết nối các Doanh nghiệp thực hiện các chương trình Trách nhiệm xã hội (CSR).
            </p>
            <p className="text-base md:text-lg text-gray-700 mb-10 leading-relaxed">
              Nếu bạn đại diện một tổ chức được cấp phép hoạt động, như: Quỹ từ thiện; Quỹ xã hội; Tổ chức xã hội nghề nghiệp;... hay các Doanh nghiệp có mong muốn hợp tác triển khai CSR, ESG, vui lòng liên hệ với chúng tôi để được hỗ trợ.
            </p>
            <a
              href="https://littlerosesfoundation.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-[#1a522e] text-white font-bold py-4 px-8 lg:px-10 rounded-lg hover:bg-[#134429] transition duration-300 shadow-xl text-base lg:text-lg uppercase tracking-wider"
            >
              Liên hệ Little Roses Foundation
              <ArrowRight className="ml-3 w-5 h-5 lg:w-6 lg:h-6" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;