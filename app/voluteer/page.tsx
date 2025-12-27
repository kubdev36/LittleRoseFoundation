'use client';

import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Briefcase, 
  CheckCircle,
  ChevronRight
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function VolunteerRegistrationPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    birthDate: '',
    occupation: '',
    skills: '',
    motivation: '',
    availability: 'fulltime', // fulltime, parttime, occasional
    preferredArea: 'education' // education, health, social, fundraising
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ở đây sẽ gọi API thực tế
    console.log('Đăng ký tình nguyện:', formData);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#1a522e]/5 to-white">
        {/* Hero Section */}
        <div className="relative h-96 w-full">
          <div className="absolute inset-0 bg-[#1a522e]/90" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
            <CheckCircle className="w-24 h-24 mb-6 text-white" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Đăng ký thành công!</h1>
            <p className="text-xl max-w-2xl">
              Cảm ơn bạn đã đăng ký trở thành tình nguyện viên của Quỹ Từ Thiện Bông Hồng Nhỏ.
              <br />Chúng tôi sẽ liên hệ với bạn trong vòng 48 giờ tới.
            </p>
            <Link 
              href="/" 
              className="mt-8 inline-flex items-center gap-2 bg-white text-[#1a522e] px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition"
              scroll={false}
            >
              Quay về Trang chủ <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-[#1a522e]/5 to-white">
        {/* Hero Section */}
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

        {/* Main Form */}
        <div className="max-w-4xl mx-auto px-4 pb-20 mt-20">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="bg-[#1a522e] text-white p-8 text-center">
              <h2 className="text-3xl font-bold mb-4">Đăng ký làm Tình nguyện viên</h2>
              <p className="text-white/90 text-lg">
                Hãy để lại thông tin, chúng tôi sẽ liên hệ với bạn sớm nhất!
              </p>
            </div>

            <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-8">
              {/* Thông tin cá nhân */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                  <User className="w-8 h-8 text-[#1a522e]" />
                  Thông tin cá nhân
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Họ và tên <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#1a522e]/20 focus:border-[#1a522e] transition"
                      placeholder="Nguyễn Văn A"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#1a522e]/20 focus:border-[#1a522e] transition"
                        placeholder="example@gmail.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Số điện thoại <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#1a522e]/20 focus:border-[#1a522e] transition"
                        placeholder="0901234567"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ngày sinh
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="date"
                        name="birthDate"
                        value={formData.birthDate}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#1a522e]/20 focus:border-[#1a522e] transition"
                      />
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Địa chỉ hiện tại
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#1a522e]/20 focus:border-[#1a522e] transition"
                        placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Kỹ năng & Sở thích */}
              <div className="space-y-6 pt-8 border-t border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                  <Briefcase className="w-8 h-8 text-[#1a522e]" />
                  Kỹ năng & Sở thích
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nghề nghiệp hiện tại
                    </label>
                    <input
                      type="text"
                      name="occupation"
                      value={formData.occupation}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#1a522e]/20 focus:border-[#1a522e] transition"
                      placeholder="Sinh viên, Giáo viên, Nhân viên văn phòng..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Lĩnh vực bạn quan tâm
                    </label>
                    <select
                      name="preferredArea"
                      value={formData.preferredArea}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#1a522e]/20 focus:border-[#1a522e] transition"
                    >
                      <option value="education">Hỗ trợ giáo dục</option>
                      <option value="health">Hỗ trợ y tế & sức khỏe</option>
                      <option value="social">Bác ái xã hội</option>
                      <option value="fundraising">Gây quỹ & truyền thông</option>
                      <option value="all">Tất cả các lĩnh vực</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Kỹ năng / Kinh nghiệm nổi bật (nếu có)
                    </label>
                    <textarea
                      name="skills"
                      value={formData.skills}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#1a522e]/20 focus:border-[#1a522e] transition resize-none"
                      placeholder="Ví dụ: Tổ chức sự kiện, thiết kế đồ họa, dạy học, chăm sóc y tế, truyền thông..."
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Lý do bạn muốn tham gia tình nguyện? <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="motivation"
                      value={formData.motivation}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#1a522e]/20 focus:border-[#1a522e] transition resize-none"
                      placeholder="Chia sẻ câu chuyện, động lực khiến bạn muốn đồng hành cùng Quỹ Bông Hồng Nhỏ..."
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-8 text-center">
                <button
                  type="submit"
                  className="inline-flex items-center gap-3 bg-[#1a522e] text-white px-12 py-5 rounded-full text-xl font-bold hover:bg-[#133f24] transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
                >
                  Gửi đăng ký tình nguyện
                  <ChevronRight className="w-6 h-6" />
                </button>
                <p className="mt-4 text-sm text-gray-600">
                  Chúng tôi cam kết bảo mật thông tin cá nhân của bạn theo chính sách bảo vệ dữ liệu.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}