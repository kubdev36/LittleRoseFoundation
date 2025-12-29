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
  ChevronRight,
  Heart,
  Users,
  Sparkles,
  ShieldCheck
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
    availability: 'parttime',
    preferredArea: 'all'
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
    console.log('Đăng ký tình nguyện:', formData);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#1a522e]/5 to-white flex items-center justify-center px-4">
        <div className="relative w-full max-w-4xl text-center">
          <div className="absolute inset-0 bg-[#1a522e]/90 rounded-3xl blur-3xl" />
          <div className="relative bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-10 md:p-16">
            <CheckCircle className="w-20 h-20 md:w-28 md:h-28 mx-auto mb-8 text-[#1a522e] animate-pulse" />
            <h1 className="text-3xl md:text-5xl font-extrabold text-[#1a522e] mb-6">Đăng ký thành công!</h1>
            <p className="text-lg md:text-2xl text-gray-800 mb-10 leading-relaxed">
              Cảm ơn bạn đã đăng ký trở thành tình nguyện viên của <br className="hidden sm:block" />
              <span className="text-[#1a522e] font-bold">Quỹ Từ Thiện Bông Hồng Nhỏ</span>.
              <br />Chúng tôi sẽ liên hệ với bạn trong vòng <strong>48 giờ</strong> tới.
            </p>
            <Link 
              href="/" 
              className="inline-flex items-center gap-3 bg-[#1a522e] text-white px-10 py-5 md:px-12 md:py-6 rounded-full text-lg md:text-xl font-bold hover:bg-[#134429] transition-all shadow-2xl transform hover:scale-105"
            >
              Quay về Trang chủ <ChevronRight className="w-6 h-6 md:w-7 md:h-7" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a522e]/5 via-white to-gray-50">
      {/* Hero Section - Responsive như AboutPage */}
      <div className="relative h-64 sm:h-80 md:h-96 w-full overflow-hidden">
        <Image
          src="/images/banner4.jpg"
          alt="Đăng ký tình nguyện - Quỹ từ thiện Bông hồng nhỏ"
          fill
          className="object-cover brightness-50"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 drop-shadow-2xl">
            Đăng ký tình nguyện
          </h1>
          <p className="text-base sm:text-lg drop-shadow-md">
            <Link href="/" className="hover:text-emerald-300 transition-colors">
              Trang chủ
            </Link>{' '}
            / <span className="text-emerald-300">Đăng ký tình nguyện</span>
          </p>
        </div>
      </div>

      {/* Intro Section */}
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16 text-center">
        <div className="inline-flex items-center gap-3 bg-[#1a522e]/10 text-[#1a522e] px-6 py-3 md:px-8 md:py-4 rounded-full text-sm md:text-base font-bold mb-8 shadow-lg">
          <Heart className="w-6 h-6 md:w-7 md:h-7 animate-pulse" />
          CHUNG TAY VÌ CỘNG ĐỒNG
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 px-4">
          Trở thành một phần của hành trình thay đổi cuộc sống
        </h2>
        <p className="text-base md:text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed px-4">
          Mỗi tình nguyện viên là một bông hồng nhỏ – cùng nhau, chúng ta tạo nên một vườn hoa rực rỡ, lan tỏa yêu thương đến những mảnh đời khó khăn.
        </p>
      </div>

      {/* Main Form - Responsive hoàn chỉnh */}
      <div className="max-w-5xl mx-auto px-4 pb-20 md:pb-32">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
          {/* Header Form */}
          <div className="bg-gradient-to-r from-[#1a522e] to-[#134429] text-white p-8 md:p-12 lg:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-white/5 backdrop-blur-sm" />
            <Sparkles className="absolute top-4 right-4 md:top-8 md:right-8 w-16 h-16 md:w-20 md:h-20 text-white/20" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 relative z-10">
              Đăng ký làm Tình nguyện viên
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-white/90 relative z-10 max-w-3xl mx-auto px-4">
              Hãy để lại thông tin – chúng tôi sẽ liên hệ và cùng bạn viết nên những câu chuyện đẹp!
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 md:p-10 lg:p-16 space-y-10 md:space-y-12">
            {/* Thông tin cá nhân */}
            <div className="space-y-8">
              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 flex items-center gap-3 md:gap-4 border-b-4 border-[#1a522e]/20 pb-4">
                <User className="w-8 h-8 md:w-9 md:h-9 text-[#1a522e]" />
                Thông tin cá nhân
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                <div className="space-y-2">
                  <label className="block text-sm md:text-base font-semibold text-gray-800">
                    Họ và tên <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-3.5 md:py-4 text-base border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#1a522e]/30 focus:border-[#1a522e] transition-all"
                    placeholder="Nguyễn Văn A"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm md:text-base font-semibold text-gray-800">
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
                      className="w-full pl-12 pr-5 py-3.5 md:py-4 text-base border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#1a522e]/30 focus:border-[#1a522e] transition-all"
                      placeholder="example@gmail.com"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm md:text-base font-semibold text-gray-800">
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
                      className="w-full pl-12 pr-5 py-3.5 md:py-4 text-base border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#1a522e]/30 focus:border-[#1a522e] transition-all"
                      placeholder="0901234567"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm md:text-base font-semibold text-gray-800">Ngày sinh</label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="date"
                      name="birthDate"
                      value={formData.birthDate}
                      onChange={handleChange}
                      className="w-full pl-12 pr-5 py-3.5 md:py-4 text-base border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#1a522e]/30 focus:border-[#1a522e] transition-all"
                    />
                  </div>
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="block text-sm md:text-base font-semibold text-gray-800">Địa chỉ hiện tại</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full pl-12 pr-5 py-3.5 md:py-4 text-base border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#1a522e]/30 focus:border-[#1a522e] transition-all"
                      placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành phố"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Kỹ năng & Đam mê */}
            <div className="space-y-8 pt-8 md:pt-12 border-t-4 border-[#1a522e]/10">
              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 flex items-center gap-3 md:gap-4 border-b-4 border-[#1a522e]/20 pb-4">
                <Briefcase className="w-8 h-8 md:w-9 md:h-9 text-[#1a522e]" />
                Kỹ năng & Đam mê của bạn
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                <div className="space-y-2">
                  <label className="block text-sm md:text-base font-semibold text-gray-800">Nghề nghiệp hiện tại</label>
                  <input
                    type="text"
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleChange}
                    className="w-full px-5 py-3.5 md:py-4 text-base border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#1a522e]/30 focus:border-[#1a522e] transition-all"
                    placeholder="Sinh viên, Giáo viên, Nhân viên văn phòng..."
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm md:text-base font-semibold text-gray-800">Thời gian có thể tham gia</label>
                  <select
                    name="availability"
                    value={formData.availability}
                    onChange={handleChange}
                    className="w-full px-5 py-3.5 md:py-4 text-base border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#1a522e]/30 focus:border-[#1a522e] transition-all"
                  >
                    <option value="fulltime">Toàn thời gian</option>
                    <option value="parttime">Bán thời gian (cuối tuần, buổi tối)</option>
                    <option value="occasional">Thỉnh thoảng (sự kiện đặc biệt)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm md:text-base font-semibold text-gray-800">Lĩnh vực bạn quan tâm nhất</label>
                  <select
                    name="preferredArea"
                    value={formData.preferredArea}
                    onChange={handleChange}
                    className="w-full px-5 py-3.5 md:py-4 text-base border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#1a522e]/30 focus:border-[#1a522e] transition-all"
                  >
                    <option value="all">Tất cả các lĩnh vực</option>
                    <option value="education">Hỗ trợ giáo dục</option>
                    <option value="health">Hỗ trợ y tế & sức khỏe</option>
                    <option value="social">Bác ái xã hội</option>
                    <option value="fundraising">Gây quỹ & truyền thông</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm md:text-base font-semibold text-gray-800">Kỹ năng nổi bật (nếu có)</label>
                  <textarea
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-5 py-4 text-base border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#1a522e]/30 focus:border-[#1a522e] transition-all resize-none"
                    placeholder="Tổ chức sự kiện, thiết kế, dạy học, nhiếp ảnh..."
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="block text-sm md:text-base font-semibold text-gray-800">
                    Lý do bạn muốn tham gia tình nguyện? <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="motivation"
                    value={formData.motivation}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-5 py-4 text-base border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#1a522e]/30 focus:border-[#1a522e] transition-all resize-none"
                    placeholder="Hãy chia sẻ câu chuyện, động lực hoặc mong muốn đóng góp của bạn..."
                  />
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="pt-8 md:pt-12 text-center">
              <button
                type="submit"
                className="group inline-flex items-center gap-3 md:gap-4 bg-gradient-to-r from-[#1a522e] to-[#134429] text-white px-10 py-5 md:px-16 md:py-6 rounded-full text-lg md:text-xl font-bold hover:shadow-2xl hover:shadow-[#1a522e]/40 transform hover:scale-105 transition-all duration-300"
              >
                <Users className="w-6 h-6 md:w-7 md:h-7 group-hover:animate-pulse" />
                Gửi đăng ký ngay
                <ChevronRight className="w-6 h-6 md:w-7 md:h-7 group-hover:translate-x-2 transition" />
              </button>
              <p className="mt-6 text-sm md:text-base text-gray-600 max-w-2xl mx-auto px-4">
                <ShieldCheck className="inline w-5 h-5 text-[#1a522e] mr-1" />
                Chúng tôi cam kết bảo mật tuyệt đối thông tin cá nhân của bạn theo chính sách bảo vệ dữ liệu.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}