import HeroBanner from "./components/banner";
import FeaturedProjects from "./components/FeaturedProjects";
import MissionSection from "./components/MissionSection";
import PartnersSection from "./components/PartnersSection";
import TestimonialsSection from "./components/TestimonialsSection";
import VolunteerCTASection from "./components/JoinCommunitySection";
import CharityTransparencySection from "./components/transparent";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start w-full font-sans text-slate-800">
      <div style={{ zoom: 0.8, width: '100%' }}>
        {/* 1. Hero Banner: Thường là full màn hình hoặc có ảnh nền riêng */}
        <div className="w-full">
          <HeroBanner />
        </div>

        {/* 2. Dự án nổi bật: NỀN TRẮNG */}
        <section className="w-full bg-white">
          <FeaturedProjects />
        </section>

        {/* 3. Minh bạch tài chính: NỀN XANH NHẠT (Tạo sự tin tưởng nhẹ nhàng) */}
        <section className="w-full bg-green-50/60">
          <CharityTransparencySection />
        </section>

        {/* 4. Sứ mệnh: NỀN TRẮNG */}
        <section className="w-full bg-white">
          <MissionSection />
        </section>

        {/* 5. Đối tác: NỀN XANH NHẠT (Nổi bật logo trên nền màu nhẹ) */}
        <section className="w-full bg-emerald-50/60">
          <PartnersSection />
        </section>

        {/* 6. Cảm nhận: NỀN TRẮNG */}
        <section className="w-full bg-white">
          <TestimonialsSection />
        </section>

        {/* 7. Kêu gọi tình nguyện: NỀN ĐẶC BIỆT (Thường là màu chủ đạo hoặc gradient để chốt hạ) */}
        <section className="w-full">
          <VolunteerCTASection />
        </section>
      </div>
    </main>
  );
}
