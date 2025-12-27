import HeroBanner from "./components/banner";
import FeaturedProjects from "./components/FeaturedProjects";
import MissionSection from "./components/MissionSection";
import PartnersSection from "./components/PartnersSection";
import TestimonialsSection from "./components/TestimonialsSection";
import VolunteerCTASection from "./components/JoinCommunitySection";
import Video from "./components/Video";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start bg-gray-50 ">
      <HeroBanner />
      <Video />
      <FeaturedProjects />
      <MissionSection />
      
      <PartnersSection/>
       <TestimonialsSection />
       <VolunteerCTASection />
    </main>
  );
}
