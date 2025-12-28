'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Facebook, 
  Youtube, 
  MessageCircle,
  ArrowRight,
  User,
  Send,
  Building2
} from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a522e]/5 via-white to-gray-50">
      {/* Hero Section - ĐÚNG 100% giống AboutPage */}
      <div className="relative h-96 w-full">
        <Image
          src="/images/banner4.jpg"
          alt="Liên hệ với Quỹ Từ Thiện Bông Hồng Nhỏ"
          fill
          className="object-cover brightness-50"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h1 className="text-5xl font-bold mb-4">Liên hệ với chúng tôi</h1>
          <p className="text-lg">
            <Link href="/" className="hover:text-[#1a522e] transition-colors">
              Trang chủ
            </Link>{' '}
            / <span className="text-[#1a522e]">Liên hệ</span>
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        {/* Intro */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 bg-[#1a522e]/10 text-[#1a522e] px-8 py-4 rounded-full text-base font-bold mb-8 shadow-lg">
            <Building2 className="w-7 h-7" />
            KẾT NỐI VÌ TƯƠNG LAI TỐT ĐẸP HƠN
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">
            Mọi câu hỏi của bạn đều quan trọng với chúng tôi
          </h2>
          <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Dù bạn muốn tìm hiểu về dự án, cần hỗ trợ hoàn cảnh khó khăn, mong muốn hợp tác hay trở thành tình nguyện viên – 
            đội ngũ Quỹ Bông Hồng Nhỏ luôn sẵn sàng lắng nghe và phản hồi trong vòng <strong>24 giờ</strong>.
          </p>
        </div>

        {/* 2 Cột: Thông tin + Form */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Thông tin liên hệ */}
          <div className="bg-white rounded-3xl shadow-2xl p-10 border border-gray-100 hover:shadow-3xl transition-all duration-500">
            <div className="text-center mb-10">
              <div className="w-20 h-20 bg-[#1a522e] rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                <MessageCircle className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900">Thông tin liên hệ</h3>
            </div>

            <div className="space-y-8">
              <div className="group flex items-start gap-5 p-4 rounded-2xl hover:bg-[#1a522e]/5 transition">
                <div className="p-4 bg-[#1a522e]/10 rounded-xl group-hover:bg-[#1a522e]/20 transition">
                  <MapPin className="w-8 h-8 text-[#1a522e]" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 mb-1">Địa chỉ văn phòng</p>
                  <p className="text-gray-700 leading-relaxed">
                    Little Roses Foundation<br />
                    Tầng 5, Tòa nhà ABC, Quận 1<br />
                    TP. Hồ Chí Minh, Việt Nam
                  </p>
                </div>
              </div>

              <div className="group flex items-start gap-5 p-4 rounded-2xl hover:bg-[#1a522e]/5 transition">
                <div className="p-4 bg-[#1a522e]/10 rounded-xl group-hover:bg-[#1a522e]/20 transition">
                  <Phone className="w-8 h-8 text-[#1a522e]" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 mb-1">Điện thoại</p>
                  <p className="text-gray-700">+84 28 1234 5678 (Văn phòng)</p>
                  <p className="text-gray-700 font-semibold text-[#1a522e]">+84 90 123 4567 (Hotline 24/7)</p>
                </div>
              </div>

              <div className="group flex items-start gap-5 p-4 rounded-2xl hover:bg-[#1a522e]/5 transition">
                <div className="p-4 bg-[#1a522e]/10 rounded-xl group-hover:bg-[#1a522e]/20 transition">
                  <Mail className="w-8 h-8 text-[#1a522e]" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 mb-1">Email</p>
                  <a href="mailto:info@littlerosesfoundation.org" className="text-[#1a522e] hover:underline">
                    info@littlerosesfoundation.org
                  </a>
                  <br />
                  <a href="mailto:hoptac@littlerosesfoundation.org" className="text-[#1a522e] hover:underline">
                    hoptac@littlerosesfoundation.org (Doanh nghiệp)
                  </a>
                </div>
              </div>

              <div className="group flex items-start gap-5 p-4 rounded-2xl hover:bg-[#1a522e]/5 transition">
                <div className="p-4 bg-[#1a522e]/10 rounded-xl group-hover:bg-[#1a522e]/20 transition">
                  <Clock className="w-8 h-8 text-[#1a522e]" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 mb-1">Giờ làm việc</p>
                  <p className="text-gray-700">
                    Thứ 2 – Thứ 6: 8:30 – 17:30<br />
                    Thứ 7: 8:30 – 12:00<br />
                    Chủ nhật & Lễ: Nghỉ
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-8 border-t-2 border-dashed border-gray-200">
              <p className="font-bold text-gray-900 mb-6 text-center">Theo dõi chúng tôi</p>
              <div className="flex justify-center gap-6">
                <a href="#" className="p-5 bg-[#1a522e]/10 rounded-2xl hover:bg-[#1a522e]/20 hover:scale-110 transition transform">
                  <Facebook className="w-8 h-8 text-[#1a522e]" />
                </a>
                <a href="#" className="p-5 bg-[#1a522e]/10 rounded-2xl hover:bg-[#1a522e]/20 hover:scale-110 transition transform">
                  <Youtube className="w-8 h-8 text-[#1a522e]" />
                </a>
                <a href="#" className="p-5 bg-[#1a522e]/10 rounded-2xl hover:bg-[#1a522e]/20 hover:scale-110 transition transform">
                  <MessageCircle className="w-8 h-8 text-[#1a522e]" />
                </a>
              </div>
            </div>
          </div>

          {/* Form liên hệ */}
          <div className="bg-gradient-to-br from-[#1a522e] to-[#133f24] rounded-3xl shadow-3xl p-10 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-white/5 backdrop-blur-sm" />
            <div className="relative z-10">
              <div className="text-center mb-10">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                  <Send className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl md:text-3xl font-extrabold mb-4">Gửi tin nhắn ngay</h3>
                <p className="text-white/80 text-base md:text-lg">Chúng tôi sẽ phản hồi trong vòng 24 giờ</p>
              </div>

              {isSubmitted ? (
                <div className="text-center py-20">
                  <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
                    <Send className="w-16 h-16 text-white" />
                  </div>
                  <h4 className="text-2xl md:text-3xl font-extrabold mb-4">Gửi thành công!</h4>
                  <p className="text-lg md:text-xl text-white/90 max-w-md mx-auto">
                    Cảm ơn bạn đã liên hệ. Đội ngũ sẽ sớm phản hồi qua email hoặc điện thoại.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold mb-2">Họ và tên *</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-white/60" />
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full pl-14 pr-6 py-5 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-4 focus:ring-white/30 transition"
                          placeholder="Nguyễn Văn A"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold mb-2">Email *</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-white/60" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full pl-14 pr-6 py-5 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-4 focus:ring-white/30 transition"
                          placeholder="example@gmail.com"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-2">Số điện thoại</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-white/60" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full pl-14 pr-6 py-5 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-4 focus:ring-white/30 transition"
                        placeholder="0901234567"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-2">Chủ đề liên hệ</label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-6 py-5 rounded-2xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-4 focus:ring-white/30 transition"
                    >
                      <option value="" className="text-gray-700">Chọn chủ đề...</option>
                      <option value="tinh-nguyen" className="text-gray-700">Đăng ký tình nguyện</option>
                      <option value="hoptac" className="text-gray-700">Hợp tác doanh nghiệp / CSR</option>
                      <option value="quyen-gop" className="text-gray-700">Hỗ trợ quyên góp</option>
                      <option value="ho-tro" className="text-gray-700">Cần hỗ trợ hoàn cảnh</option>
                      <option value="khac" className="text-gray-700">Khác</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-2">Nội dung tin nhắn *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-6 py-5 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-4 focus:ring-white/30 transition resize-none"
                      placeholder="Hãy chia sẻ câu hỏi, ý kiến hoặc câu chuyện của bạn..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-white text-[#1a522e] py-5 rounded-2xl font-bold text-lg hover:bg-gray-100 transition shadow-2xl flex items-center justify-center gap-3 disabled:opacity-70"
                  >
                    {isLoading ? (
                      "Đang gửi tin nhắn..."
                    ) : (
                      <>
                        Gửi tin nhắn ngay
                        <Send className="w-6 h-6" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* CTA Final */}
        <div className="text-center bg-gradient-to-r from-[#1a522e] to-[#133f24] text-white rounded-3xl p-16 shadow-3xl relative overflow-hidden">
          <div className="absolute inset-0 bg-white/5 backdrop-blur-sm" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-6">
              Bắt đầu hành trình thiện nguyện cùng chúng tôi
            </h2>
            <p className="text-lg md:text-xl text-white/90 mb-12 max-w-4xl mx-auto">
              Mọi đóng góp, dù nhỏ bé, đều có thể thay đổi cuộc đời một ai đó.
            </p>
            <div className="flex flex-col md:flex-row gap-8 justify-center">
              <Link
                href="/donate"
                className="group inline-flex items-center justify-center gap-4 bg-white text-[#1a522e] px-16 py-6 rounded-full text-xl font-extrabold hover:bg-gray-100 transition shadow-2xl transform hover:scale-105"
              >
                Quyên góp ngay hôm nay
                <ArrowRight className="w-7 h-7 group-hover:translate-x-2 transition" />
              </Link>
              <Link
                href="/volunteer"
                className="group inline-flex items-center justify-center gap-4 border-4 border-white text-white px-16 py-6 rounded-full text-xl font-extrabold hover:bg-white/10 transition backdrop-blur-sm transform hover:scale-105"
              >
                Trở thành tình nguyện viên
                <ArrowRight className="w-7 h-7 group-hover:translate-x-2 transition" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}