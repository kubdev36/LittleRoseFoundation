'use client';

import React from 'react';
import { 
  CheckCircle, 
  Users, 
  FileText, 
  HeartHandshake, 
  Lightbulb, 
  CalendarCheck, 
  ChevronRight,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function ProcessGuidePage() {
  const steps = [
    {
      number: 1,
      icon: Users,
      title: 'Tiếp nhận nhu cầu hỗ trợ',
      description: 'Chúng tôi tiếp nhận thông tin từ cộng đồng, đối tác, chính quyền địa phương hoặc trực tiếp từ các hoàn cảnh khó khăn.',
      details: [
        'Xác minh ban đầu qua phỏng vấn, giấy tờ',
        'Ưu tiên các trường hợp khẩn cấp (bệnh hiểm nghèo, thiên tai, trẻ em mồ côi)',
        'Lập hồ sơ chi tiết kèm hình ảnh, video thực tế'
      ]
    },
    {
      number: 2,
      icon: FileText,
      title: 'Thẩm định & lập kế hoạch',
      description: 'Hội đồng Quản lý và Ban chuyên môn cùng đánh giá tính khả thi, mức độ cấp thiết và xây dựng kế hoạch hỗ trợ cụ thể.',
      details: [
        'Thẩm định độc lập bởi thành viên Ban Kiểm soát',
        'Xây dựng ngân sách chi tiết, minh bạch',
        'Lập mục tiêu gây quỹ rõ ràng và thời hạn thực hiện'
      ]
    },
    {
      number: 3,
      icon: HeartHandshake,
      title: 'Công khai & gây quỹ',
      description: 'Dự án được công khai đầy đủ trên website với thông tin chi tiết, hình ảnh thực tế để cộng đồng cùng chung tay.',
      details: [
        'Công khai 100% thông tin người thụ hưởng (ẩn danh nếu cần)',
        'Cập nhật tiến độ gây quỹ theo thời gian thực',
        'Báo cáo định kỳ về nguồn thu và kế hoạch sử dụng'
      ]
    },
    {
      number: 4,
      icon: Lightbulb,
      title: 'Thực hiện dự án',
      description: 'Khi đạt mục tiêu tài chính, chúng tôi triển khai hỗ trợ ngay lập tức với sự giám sát chặt chẽ từ đầu đến cuối.',
      details: [
        'Ký kết thỏa thuận rõ ràng với người thụ hưởng/đơn vị thực hiện',
        'Giải ngân có chứng từ đầy đủ',
        'Tình nguyện viên và đối tác địa phương tham gia giám sát'
      ]
    },
    {
      number: 5,
      icon: CalendarCheck,
      title: 'Báo cáo & đánh giá tác động',
      description: 'Sau khi hoàn thành, chúng tôi công khai toàn bộ chứng từ chi tiêu và đánh giá tác động thực tế mà dự án mang lại.',
      details: [
        'Báo cáo tài chính chi tiết kèm chứng từ gốc',
        'Hình ảnh/video trước - trong - sau dự án',
        'Câu chuyện thay đổi cuộc sống của người thụ hưởng',
        'Đánh giá hiệu quả và bài học kinh nghiệm'
      ]
    }
  ];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-[#1a522e]/5 to-white">
        {/* Hero Banner */}
        <div className="relative h-96 w-full">
        <Image
          src="/images/banner4.jpg"
          alt="Đăng ký tình nguyện - Quỹ từ thiện Bông hồng nhỏ"
          fill
          className="object-cover brightness-50"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h1 className="text-5xl font-bold mb-4">Đăng ký tình nguyện</h1>
          <p className="text-lg">
            <Link href="/" className="hover:text-[#1a522e] transition-colors">
              Trang chủ
            </Link>{' '}
            / <span className="text-[#1a522e]">Đăng ký tình nguyện</span>
          </p>
        </div>
      </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 pb-20">
          {/* Intro */}
          <div className="text-center mb-16 mt-10">
            <div className="inline-flex items-center gap-3 bg-[#1a522e]/10 text-[#1a522e] px-6 py-3 rounded-full text-sm font-bold mb-6">
              <ShieldCheck className="w-5 h-5" />
              CAM KẾT MINH BẠCH 100%
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              5 bước thực hiện dự án khép kín & minh bạch
            </h2>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              Từ tiếp nhận nhu cầu đến báo cáo tác động, mọi bước đều được ghi nhận, giám sát và công khai đầy đủ.
            </p>
          </div>

          {/* Steps */}
          <div className="space-y-12">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className="grid md:grid-cols-2 gap-12 items-center bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100"
              >
                {/* Left: Number + Icon */}
                <div className={`relative h-full min-h-80 flex flex-col items-center justify-center text-white ${
                  index % 2 === 0 ? 'bg-[#1a522e]' : 'bg-[#133f24] md:order-last'
                }`}>
                  <div className="text-8xl md:text-9xl font-extrabold opacity-20 absolute -top-10 -left-10">
                    {step.number}
                  </div>
                  <step.icon className="w-24 h-24 md:w-32 md:h-32 mb-6" />
                  <span className="text-4xl md:text-5xl font-extrabold">
                    Bước {step.number}
                  </span>
                </div>

                {/* Right: Content */}
                <div className="p-8 md:p-12">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                    {step.title}
                  </h3>
                  <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                    {step.description}
                  </p>
                  <ul className="space-y-3">
                    {step.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-gray-700">
                        <ArrowRight className="w-5 h-5 text-[#1a522e] mt-0.5 flex-shrink-0" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Final CTA */}
          <div className="mt-20 text-center bg-[#1a522e] text-white rounded-3xl p-12 shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Đồng hành cùng chúng tôi ngay hôm nay
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-3xl mx-auto">
              Mỗi đóng góp của bạn đều được thực hiện theo quy trình minh bạch nghiêm ngặt, 
              đảm bảo đến đúng tay những người cần giúp đỡ nhất.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href="/project"
                className="inline-flex items-center justify-center gap-3 bg-white text-[#1a522e] px-10 py-5 rounded-full text-xl font-bold hover:bg-gray-100 transition shadow-xl"
                
              >
                Xem các dự án đang gây quỹ
                <ChevronRight className="w-6 h-6" />
              </Link>
              <Link
                href="/reports"
                className="inline-flex items-center justify-center gap-3 border-2 border-white text-white px-10 py-5 rounded-full text-xl font-bold hover:bg-white/10 transition"
                
              >
                Xem sao kê minh bạch
                <ChevronRight className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}