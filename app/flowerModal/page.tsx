'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Sparkles, X, Trophy, Eye, Share2, Heart, Calendar, Users, 
  QrCode, CheckCircle2, AlertCircle, Award, Mail, Download, Crown, ChevronRight, Loader2, Leaf
} from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

// --- DỮ LIỆU MẪU ---
const defaultProject = {
  id: '1',
  title: "Xây trường học vùng cao cho trẻ em nghèo",
  description: "Dự án nhằm xây dựng 3 phòng học kiên cố, 1 công trình vệ sinh và hệ thống nước sạch cho 150 học sinh. Mỗi đóng góp của bạn sẽ trở thành một viên gạch nhỏ, cùng nhau chúng ta sẽ xây dựng ước mơ cho các em.",
  raised: 45000000,
  goal: 120000000,
  donors: 320,
  daysLeft: 15,
  imageSrc: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1000&auto=format&fit=crop",
};

// SVG Chibi
const roseGirlSVGs = [
  `<svg viewBox="0 0 200 300" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 280 Q100 240 100 200" stroke="#4ade80" stroke-width="18" stroke-linecap="round"/><circle cx="100" cy="170" r="28" fill="#22c55e"/><circle cx="92" cy="162" r="8" fill="#ffffff"/><circle cx="108" cy="162" r="8" fill="#ffffff"/><circle cx="95" cy="175" r="4" fill="#000000"/><circle cx="105" cy="175" r="4" fill="#000000"/><path d="M92 182 Q100 190 108 182" stroke="#000000" stroke-width="3" fill="none"/></svg>`,
  `<svg viewBox="0 0 200 300" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="90" y="180" width="20" height="100" fill="#14532d" rx="10"/><ellipse cx="70" cy="210" rx="25" ry="12" fill="#16a34a" transform="rotate(-30 70 210)"/><ellipse cx="130" cy="210" rx="25" ry="12" fill="#16a34a" transform="rotate(30 130 210)"/><ellipse cx="100" cy="140" rx="40" ry="55" fill="#e11d48"/><ellipse cx="100" cy="135" rx="35" ry="45" fill="#f43f5e"/><circle cx="88" cy="130" r="10" fill="#ffffff"/><circle cx="112" cy="130" r="10" fill="#ffffff"/><circle cx="90" cy="132" r="5" fill="#000000"/><circle cx="114" cy="132" r="5" fill="#000000"/><path d="M90 145 Q100 155 110 145" stroke="#000000" stroke-width="4" fill="none"/></svg>`,
  `<svg viewBox="0 0 200 300" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="85" y="170" width="30" height="110" fill="#15803d" rx="15"/><ellipse cx="100" cy="240" rx="60" ry="30" fill="#22c55e" opacity="0.8"/><ellipse cx="60" cy="200" rx="30" ry="15" fill="#16a34a" transform="rotate(-45 60 200)"/><ellipse cx="140" cy="200" rx="30" ry="15" fill="#16a34a" transform="rotate(45 140 200)"/><g transform="translate(100,120)"><ellipse cx="0" cy="0" rx="50" ry="65" fill="#dc2626"/><ellipse cx="-20" cy="-15" rx="35" ry="50" fill="#f87171" transform="rotate(-20)"/><ellipse cx="20" cy="-15" rx="35" ry="50" fill="#f87171" transform="rotate(20)"/><circle cx="-15" cy="-10" r="12" fill="#ffffff"/><circle cx="15" cy="-10" r="12" fill="#ffffff"/><circle cx="-13" cy="-8" r="6" fill="#000000"/><circle cx="17" cy="-8" r="6" fill="#000000"/><path d="M-10 5 Q0 12 10 5" stroke="#000000" stroke-width="5" fill="none"/></g></svg>`,
  `<svg viewBox="0 0 200 300" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="80" y="160" width="40" height="120" fill="#14532d" rx="20"/><ellipse cx="100" cy="250" rx="80" ry="40" fill="#22c55e"/><ellipse cx="100" cy="230" rx="70" ry="50" fill="#f43f5e" opacity="0.7"/><ellipse cx="55" cy="190" rx="35" ry="18" fill="#16a34a" transform="rotate(-50 55 190)"/><ellipse cx="145" cy="190" rx="35" ry="18" fill="#16a34a" transform="rotate(50 145 190)"/><g transform="translate(100,110)"><circle cx="0" cy="0" r="65" fill="#be123c"/><ellipse cx="-35" cy="-20" rx="45" ry="60" fill="#e11d48" transform="rotate(-25)"/><ellipse cx="35" cy="-20" rx="45" ry="60" fill="#e11d48" transform="rotate(25)"/><ellipse cx="0" cy="-45" rx="50" ry="70" fill="#f43f5e"/><circle cx="-20" cy="-15" r="14" fill="#ffffff"/><circle cx="20" cy="-15" r="14" fill="#ffffff"/><circle cx="-18" cy="-13" r="7" fill="#000000"/><circle cx="22" cy="-13" r="7" fill="#000000"/><path d="M-12 8 Q0 18 12 8" stroke="#000000" stroke-width="6" fill="none"/><circle cx="0" cy="0" r="10" fill="#fbb6ce" opacity="0.4"/></g></svg>`,
  `<svg viewBox="0 0 200 300" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="glow"><stop offset="0%" stop-color="#fbb6ce"/><stop offset="100%" stop-color="#ec4899" stop-opacity="0"/></radialGradient></defs><circle cx="100" cy="150" r="130" fill="url(#glow)" opacity="0.5"/><rect x="75" y="150" width="50" height="130" fill="#14532d" rx="25"/><ellipse cx="100" cy="260" rx="95" ry="50" fill="#be185d"/><ellipse cx="100" cy="230" rx="85" ry="60" fill="#e11d48"/><ellipse cx="100" cy="200" rx="75" ry="70" fill="#f43f5e"/><ellipse cx="40" cy="180" rx="45" ry="25" fill="#f472b6" transform="rotate(-60 40 180)"/><ellipse cx="160" cy="180" rx="45" ry="25" fill="#f472b6" transform="rotate(60 160 180)"/><g transform="translate(100,90)"><circle cx="0" cy="0" r="80" fill="#9d174d"/><ellipse cx="-50" cy="-30" rx="55" ry="80" fill="#ec4899" transform="rotate(-30)"/><ellipse cx="50" cy="-30" rx="55" ry="80" fill="#ec4899" transform="rotate(30)"/><ellipse cx="0" cy="-70" rx="65" ry="90" fill="#f43f5e"/><ellipse cx="0" cy="-110" rx="50" ry="70" fill="#fbb6ce"/><circle cx="-25" cy="-30" r="18" fill="#ffffff"/><circle cx="25" cy="-30" r="18" fill="#ffffff"/><circle cx="-22" cy="-27" r="9" fill="#000000"/><circle cx="28" cy="-27" r="9" fill="#000000"/><path d="M-15 10 Q0 25 15 10" stroke="#000000" stroke-width="8" fill="none"/><circle cx="-8" cy="0" r="8" fill="#000000" opacity="0.3"/><circle cx="8" cy="0" r="8" fill="#000000" opacity="0.3"/></g><text x="100" y="280" font-size="50" text-anchor="middle" fill="#881337" opacity="0.9">✨🌸✨</text></svg>`
];

const leaderboardData = [
  { name: "Phạm Nhật Vượng", donated: 50000000, title: "Đại Sứ Nhân Ái" },
  { name: "Nguyễn Phương Hằng", donated: 25000000, title: "Mạnh Thường Quân" },
  { name: "Lý Nhã Kỳ", donated: 15000000, title: "Nhà Hảo Tâm Vàng" },
  { name: "Trấn Thành", donated: 10000000, title: "Người Gieo Mầm" },
  { name: "Sơn Tùng M-TP", donated: 5000000, title: "Người Bạn Đồng Hành" },
];

export default function DonatePage() {
  const searchParams = useSearchParams();
  const project = {
    id: searchParams.get('id') || defaultProject.id,
    title: searchParams.get('title') || defaultProject.title,
    description: searchParams.get('description') || defaultProject.description,
    raised: Number(searchParams.get('raised')) || defaultProject.raised,
    goal: Number(searchParams.get('goal')) || defaultProject.goal,
    donors: Number(searchParams.get('donors')) || defaultProject.donors,
    daysLeft: Number(searchParams.get('daysLeft')) || defaultProject.daysLeft,
    imageSrc: searchParams.get('imageSrc') || defaultProject.imageSrc,
  };

  const progressPercent = Math.min(Math.round((project.raised / project.goal) * 100), 100);
  const initialAmount = Number(searchParams.get('amount')) || 100000;

  const [amount, setAmount] = useState(initialAmount);
  const [isDonating, setIsDonating] = useState(false);
  
  // Đã bỏ state Inventory
  const [fertilizers, setFertilizers] = useState(0); 
  const [hasShared, setHasShared] = useState(false);
  
  // State quản lý Modal Quyên góp
  const [showDonateForm, setShowDonateForm] = useState(false);
  const [donateStep, setDonateStep] = useState<'info' | 'qr'>('info');
  const [countdown, setCountdown] = useState(5);

  const [showPreview, setShowPreview] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  const [emailSentStatus, setEmailSentStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [activeSlide, setActiveSlide] = useState(0); 
  const modalScrollRef = useRef<HTMLDivElement>(null);

  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [donorMessage, setDonorMessage] = useState('');

  const MAX_FERTILIZERS = 25;
  const currentStage = Math.min(Math.floor((fertilizers / MAX_FERTILIZERS) * 5), 4);
  const fertilizerPercent = Math.min(Math.round((fertilizers / MAX_FERTILIZERS) * 100), 100);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedFertilizers = localStorage.getItem(`rose_fertilizers_${project.id}`);
      if (savedFertilizers) setFertilizers(parseInt(savedFertilizers, 10));
    }
  }, [project.id]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(`rose_fertilizers_${project.id}`, fertilizers.toString());
    }
  }, [fertilizers, project.id]);

  // Logic đếm ngược 5s khi đang ở bước QR
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (donateStep === 'qr' && showDonateForm) {
      setCountdown(5); // Reset countdown
      
      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) return 0;
          return prev - 1;
        });
      }, 1000);

      timer = setTimeout(() => {
        clearInterval(interval);
        handleFinishDonation();
      }, 5000);

      return () => {
        clearTimeout(timer);
        clearInterval(interval);
      };
    }
  }, [donateStep, showDonateForm]);


  const handleScroll = () => {
    if (modalScrollRef.current) {
        const scrollLeft = modalScrollRef.current.scrollLeft;
        const width = modalScrollRef.current.offsetWidth;
        const index = Math.round(scrollLeft / width); 
        setActiveSlide(index);
    }
  };

  const handleDonateClick = () => {
    if (amount <= 0) {
      alert("Vui lòng nhập số tiền hợp lệ!");
      return;
    }
    setDonateStep('info');
    setShowDonateForm(true);
  };

  const handleGenerateQR = () => {
    if (!donorName.trim() || !donorEmail.trim()) {
      alert("Vui lòng điền đầy đủ tên và email!");
      return;
    }
    setDonateStep('qr');
  };

  // Hàm tiện ích: Tăng tiến độ (Tự động)
  const autoFertilize = () => {
    setFertilizers((prev) => {
      // Nếu đã MAX, giữ nguyên, không cộng thêm nhưng vẫn cho phép quyên góp tiếp
      if (prev >= MAX_FERTILIZERS) {
        return prev;
      }
      
      const newValue = prev + 1;
      // Kiểm tra nếu vừa lên max
      if (newValue >= MAX_FERTILIZERS) {
        setTimeout(() => {
          alert("Chúc mừng! Chibi hoa hồng đã nở rộ hoàn toàn! 🌹✨");
        }, 800);
      }
      return newValue;
    });
  };

  // Bước 2: Hoàn tất quyên góp (Tự động kích hoạt sau đếm ngược)
  const handleFinishDonation = () => {
    setShowDonateForm(false);
    setIsDonating(true);
    setEmailSentStatus('sending');

    setTimeout(() => {
      // Tự động bón phân
      autoFertilize();
      
      setEmailSentStatus('sent');
      setTimeout(() => {
        setIsDonating(false);
        setShowCertificate(true);
      }, 500);
    }, 1000);
  };

  const handleCloseCertificate = () => {
    setShowCertificate(false);
    setDonorName('');
    setDonorEmail('');
    setDonorMessage('');
    setEmailSentStatus('idle');
  };

  const handleShare = async () => {
    if (hasShared) {
      alert("Bạn đã chia sẻ rồi!");
      return;
    }
    try {
      await navigator.share({
        title: project.title,
        text: project.description,
        url: window.location.origin + `/project/${project.id}`,
      });
      
      // Tự động bón phân khi share
      autoFertilize();
      setHasShared(true);
      alert("Chia sẻ thành công! Chibi đã được chăm sóc thêm 1 chút 🌱");

    } catch {
      autoFertilize();
      setHasShared(true);
      alert("Đã sao chép liên kết! Chibi đã được chăm sóc thêm 1 chút 🌱");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5fbf7] via-[#eef9f2] to-[#ebf7f0] relative overflow-x-hidden text-[#1a522e] font-sans">
      <div className="container mx-auto max-w-7xl px-4 py-4 md:py-6 relative z-10">
        
        {/* Header Navigation */}
        <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="mb-4 md:mb-6">
          <Link
            href={`/project/${project.id}`}
            className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-md px-3 py-1.5 md:px-4 md:py-2 rounded-full shadow-sm text-gray-700 hover:text-[#1a522e] hover:bg-white transition-all text-xs md:text-sm font-medium border border-transparent hover:border-green-100"
          >
            <ArrowLeft className="w-4 h-4" />
            Trở về dự án
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* CỘT PHẢI (GAME & DONATE) */}
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="lg:col-span-5 order-1 lg:order-2">
            <div className="relative lg:sticky lg:top-6 space-y-6">
              
              {/* Game Card */}
              <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border-2 border-[#1a522e]/20 overflow-hidden">
                <div className="p-3 md:p-4 bg-gradient-to-r from-[#1a522e]/5 to-[#1a522e]/10 border-b border-[#1a522e]/10 flex justify-between items-center">
                   <div>
                      <h2 className="text-base md:text-lg font-bold text-[#1a522e] flex items-center gap-2"><Sparkles className="w-5 h-5 fill-yellow-400 text-yellow-500" /> Vườn Chibi Nhân Ái</h2>
                   </div>
                   <div className="flex items-center gap-2">
                      <button onClick={() => setShowPreview(true)} className="p-2 bg-white rounded-lg shadow-sm text-gray-500 hover:text-[#1a522e] transition border border-gray-100"><Eye className="w-4 h-4" /></button>
                   </div>
                </div>
                <div className="p-4 md:p-6">
                    <div className="relative h-[280px] md:h-[320px] bg-gradient-to-b from-[#eef9f2] to-white rounded-2xl border border-[#1a522e]/10 flex items-center justify-center mb-5 overflow-hidden group">
                        <div className="absolute top-3 right-3 z-10 bg-white/80 backdrop-blur px-2 py-1 rounded text-xs font-semibold text-[#1a522e] shadow-sm flex items-center gap-1"><Sparkles className="w-3 h-3" /> Cấp {currentStage + 1}/5</div>
                        <div className="w-full h-full flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
                           <div className="max-w-[160px] md:max-w-[200px] w-full" dangerouslySetInnerHTML={{ __html: roseGirlSVGs[currentStage] }} />
                        </div>
                        <AnimatePresence>
                          {isDonating && (
                            <motion.div initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 0.9, scale: 1.4 }} exit={{ opacity: 0, scale: 2 }} className="absolute text-5xl md:text-6xl pointer-events-none">✨🌸✨</motion.div>
                          )}
                        </AnimatePresence>
                    </div>
                    
                    <div className="space-y-4">
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                            <span>Sức sống cây</span>
                            <span className={fertilizers >= MAX_FERTILIZERS ? "text-green-600 font-bold" : ""}>
                                {fertilizers >= MAX_FERTILIZERS ? "Đã nở rộ (Max)" : `${fertilizerPercent}%`}
                            </span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden mb-4 shadow-inner">
                           <motion.div initial={{ width: 0 }} animate={{ width: `${fertilizerPercent}%` }} className="h-full bg-gradient-to-r from-[#4ade80] to-[#1a522e]" />
                        </div>
                        
                        {/* Trạng thái cây (Thay cho nút bón phân thủ công) */}
                        <div className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#1a522e]/5 border border-[#1a522e]/10 text-sm font-medium text-[#1a522e]">
                            {fertilizers >= MAX_FERTILIZERS ? (
                                <><Crown className="w-4 h-4 text-yellow-500" /> Cây đã phát triển hoàn hảo!</>
                            ) : (
                                <><Leaf className="w-4 h-4" /> Hãy quyên góp để cây lớn thêm</>
                            )}
                        </div>
                    </div>
                </div>
              </div>

              {/* Donation Actions */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 md:p-6">
                 <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4 flex items-center gap-2"><Heart className="w-4 h-4 text-red-500 fill-red-500" /> Ủng hộ ngay</h3>
                 <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                   {[50000, 100000, 200000, 500000].map((a) => (
                     <button key={a} onClick={() => setAmount(a)} className={`py-2 px-1 rounded-lg border text-xs font-semibold transition-all ${amount === a ? 'bg-[#1a522e]/10 border-[#1a522e] text-[#1a522e] ring-1 ring-[#1a522e]' : 'border-gray-200 hover:bg-gray-50 text-gray-600'}`}>{a >= 1000000 ? `${a / 1000000}tr` : `${a / 1000}k`}</button>
                   ))}
                 </div>
                 <div className="relative mb-4">
                    <input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="w-full p-3 pl-4 pr-12 border border-gray-300 rounded-xl text-lg font-bold text-gray-800 focus:border-[#1a522e] focus:ring-2 focus:ring-[#1a522e]/20 transition text-center" />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-500">VNĐ</span>
                 </div>
                 <div className="flex flex-col gap-3">
                    <button onClick={handleDonateClick} disabled={isDonating} className={`w-full py-3.5 rounded-xl font-bold text-white shadow-lg shadow-[#1a522e]/20 flex items-center justify-center gap-2 transition-all ${isDonating ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-[#1a522e] to-[#2d8a4e] hover:brightness-110 active:scale-[0.98]'}`}>
                        {isDonating ? 'Đang xử lý...' : <><Heart className="w-4 h-4 fill-white" /><span>Quyên góp</span></>}
                    </button>
                    <button onClick={handleShare} disabled={hasShared} className={`w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all ${hasShared ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-[#1a522e] border border-[#1a522e]/30 hover:bg-[#1a522e]/5'}`}><Share2 className="w-4 h-4" />{hasShared ? 'Đã chia sẻ' : 'Chia sẻ'}</button>
                 </div>
              </div>
            </div>
          </motion.div>

          {/* CỘT TRÁI (INFO & LEADERBOARD) */}
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="lg:col-span-7 space-y-6 md:space-y-8 order-2 lg:order-1">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-[#1a522e]/10 overflow-hidden">
              <div className="relative aspect-video w-full">
                 <img src={project.imageSrc} alt={project.title} className="object-cover w-full h-full" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4 md:p-6">
                    <h1 className="text-lg md:text-3xl font-bold text-white shadow-black drop-shadow-md leading-tight">{project.title}</h1>
                 </div>
              </div>
              <div className="p-4 md:p-6">
                <div className="grid grid-cols-3 gap-2 md:gap-4 mb-6">
                    <div className="bg-[#1a522e]/5 p-2 md:p-4 rounded-xl text-center border border-[#1a522e]/10">
                        <Heart className="w-5 h-5 md:w-6 md:h-6 text-[#1a522e] mx-auto mb-1 md:mb-2" />
                        <p className="text-sm md:text-xl font-bold text-gray-800 truncate">{project.raised.toLocaleString('vi-VN')}</p>
                        <p className="text-[9px] md:text-xs text-gray-500 font-medium uppercase tracking-wider">Đã gây quỹ</p>
                    </div>
                    <div className="bg-[#1a522e]/5 p-2 md:p-4 rounded-xl text-center border border-[#1a522e]/10">
                        <Users className="w-5 h-5 md:w-6 md:h-6 text-[#1a522e] mx-auto mb-1 md:mb-2" />
                        <p className="text-sm md:text-xl font-bold text-gray-800">{project.donors}</p>
                        <p className="text-[9px] md:text-xs text-gray-500 font-medium uppercase tracking-wider">Người ủng hộ</p>
                    </div>
                    <div className="bg-[#1a522e]/5 p-2 md:p-4 rounded-xl text-center border border-[#1a522e]/10">
                        <Calendar className="w-5 h-5 md:w-6 md:h-6 text-[#1a522e] mx-auto mb-1 md:mb-2" />
                        <p className="text-sm md:text-xl font-bold text-gray-800">{project.daysLeft}</p>
                        <p className="text-[9px] md:text-xs text-gray-500 font-medium uppercase tracking-wider">Ngày còn lại</p>
                    </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm font-bold text-gray-700"><span>Tiến độ chung</span><span>{progressPercent}%</span></div>
                  <div className="w-full bg-gray-200 rounded-full h-3 md:h-4 overflow-hidden shadow-inner">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${progressPercent}%` }} transition={{ duration: 1.5 }} className="h-full bg-gradient-to-r from-[#1a522e] to-[#4ade80]" />
                  </div>
                  <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-gray-100">
                    <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2 flex items-center gap-2"><AlertCircle className="w-4 h-4 md:w-5 md:h-5 text-[#1a522e]" /> Về dự án này</h3>
                    <p className="text-gray-600 leading-relaxed text-sm md:text-base text-justify">{project.description}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-[#1a522e]/10 p-4 md:p-6">
               <div className="flex items-center justify-between mb-4 md:mb-6">
                 <h3 className="text-lg md:text-xl font-bold text-gray-800 flex items-center gap-2">
                   <Trophy className="w-5 h-5 md:w-6 md:h-6 text-yellow-500 fill-yellow-500" />
                   Vinh danh
                 </h3>
                 <span className="text-[10px] md:text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">Top Tháng</span>
               </div>
               <div className="space-y-3 md:space-y-4">
                 {leaderboardData.map((item, idx) => (
                   <div key={idx} className={`relative flex justify-between items-center p-3 md:p-4 rounded-xl border transition-all hover:scale-[1.01] ${idx === 0 ? 'bg-gradient-to-r from-yellow-50 to-white border-yellow-200 shadow-md' : 'bg-white border-gray-100 shadow-sm'}`}>
                     <div className="flex items-center gap-3 md:gap-4 overflow-hidden">
                        <div className={`flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-bold text-sm md:text-lg relative ${idx === 0 ? 'bg-yellow-400 text-white shadow-yellow-200' : idx === 1 ? 'bg-gray-300 text-white shadow-gray-200' : idx === 2 ? 'bg-orange-400 text-white shadow-orange-200' : 'bg-[#1a522e]/10 text-[#1a522e]'}`}>
                          {idx === 0 && <Crown className="w-5 h-5 md:w-6 md:h-6 absolute -top-3 md:-top-4 text-yellow-500 fill-yellow-500 animate-bounce" />}
                          {idx + 1}
                        </div>
                        <div className="min-w-0">
                           <p className={`font-bold truncate max-w-[120px] sm:max-w-none ${idx === 0 ? 'text-gray-900 text-sm md:text-base' : 'text-gray-700 text-sm'}`}>{item.name}</p>
                           <p className="text-[9px] md:text-[10px] uppercase font-bold tracking-wider text-gray-400 truncate">{item.title}</p>
                        </div>
                     </div>
                     <div className="text-right flex-shrink-0 ml-2">
                        <p className="font-bold text-[#1a522e] text-sm md:text-lg">{item.donated.toLocaleString('vi-VN')} ₫</p>
                     </div>
                   </div>
                 ))}
                 <div className="text-center pt-2">
                    <button className="text-xs md:text-sm text-gray-500 hover:text-[#1a522e] font-medium">Xem tất cả</button>
                 </div>
               </div>
            </div>
          </motion.div>
        </div>

        {/* --- MODALS --- */}

        {/* Modal Quyên góp */}
        <AnimatePresence>
          {showDonateForm && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <motion.div initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 30 }} className="bg-white rounded-2xl w-full max-w-sm md:max-w-md relative shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                <div className="p-4 border-b flex justify-between items-center bg-[#1a522e]/5">
                   <h2 className="text-base md:text-lg font-bold text-[#1a522e] flex items-center gap-2"><Heart className="w-5 h-5 fill-[#1a522e]" /> {donateStep === 'info' ? 'Thông tin ủng hộ' : 'Quét mã QR'}</h2>
                   <button onClick={() => setShowDonateForm(false)} className="text-gray-400 hover:text-[#1a522e] transition p-1 hover:bg-gray-100 rounded-full"><X className="w-5 h-5" /></button>
                </div>
                
                <div className="p-4 md:p-5 overflow-y-auto">
                    {/* BƯỚC 1: ĐIỀN THÔNG TIN */}
                    {donateStep === 'info' && (
                        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                            <div><label className="block text-xs font-medium text-gray-700 mb-1">Họ và tên</label><input type="text" value={donorName} onChange={(e) => setDonorName(e.target.value)} className="w-full p-2.5 border border-gray-300 rounded-lg text-sm focus:border-[#1a522e] focus:ring-2 focus:ring-[#1a522e]/20" placeholder="Nguyễn Văn A" /></div>
                            <div><label className="block text-xs font-medium text-gray-700 mb-1">Email (Để nhận chứng nhận)</label><input type="email" value={donorEmail} onChange={(e) => setDonorEmail(e.target.value)} className="w-full p-2.5 border border-gray-300 rounded-lg text-sm focus:border-[#1a522e] focus:ring-2 focus:ring-[#1a522e]/20" placeholder="email@example.com" /></div>
                            <div className="p-3 md:p-4 bg-gray-50 rounded-lg border border-gray-200">
                                <div className="flex justify-between text-sm mb-1"><span className="text-gray-600">Số tiền:</span><span className="font-bold text-[#1a522e]">{amount.toLocaleString('vi-VN')} VNĐ</span></div>
                                <input type="text" value={donorMessage} onChange={(e) => setDonorMessage(e.target.value)} className="w-full mt-2 p-2 border border-gray-300 rounded text-sm bg-white" placeholder="Lời nhắn gửi..." />
                            </div>
                            <button onClick={handleGenerateQR} className="w-full py-3 bg-[#1a522e] text-white font-bold text-sm rounded-xl shadow hover:bg-[#144023] transition mt-2 flex items-center justify-center gap-2">
                                <QrCode className="w-4 h-4" /> TẠO MÃ QR
                            </button>
                        </motion.div>
                    )}

                    {/* BƯỚC 2: QUÉT QR (Hiện sau khi điền thông tin) */}
                    {donateStep === 'qr' && (
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col items-center text-center space-y-4">
                            <div className="bg-white p-2 rounded-xl shadow-md border border-gray-200 relative">
                                <QrCode className="w-40 h-40 text-gray-800" />
                                <div className="absolute inset-0 flex items-center justify-center bg-white/10 backdrop-blur-[1px]">
                                    {/* Giả lập QR thật */}
                                </div>
                            </div>
                            
                            <div className="space-y-1">
                                <p className="text-sm font-bold text-gray-800">Đang chờ thanh toán...</p>
                                <p className="text-xs text-gray-500">Hệ thống sẽ tự động xác nhận sau:</p>
                                <div className="flex items-center justify-center gap-2 text-[#1a522e] font-bold text-xl mt-1">
                                    <Loader2 className="w-5 h-5 animate-spin" /> {countdown}s
                                </div>
                            </div>

                            <div className="w-full bg-gray-50 p-3 rounded-lg border border-dashed border-gray-300 text-xs text-left text-gray-600 space-y-1">
                                <p className="flex justify-between"><span>Ngân hàng:</span> <span className="font-bold">MB Bank</span></p>
                                <p className="flex justify-between"><span>Số TK:</span> <span className="font-bold font-mono">0987654321</span></p>
                                <p className="flex justify-between"><span>Chủ TK:</span> <span className="font-bold">QUY TU THIEN</span></p>
                                <p className="flex justify-between"><span>Nội dung:</span> <span className="font-bold font-mono text-[#1a522e]">{project.id} {donorName}</span></p>
                            </div>

                            <button onClick={() => setDonateStep('info')} className="text-xs text-gray-400 hover:text-gray-600 underline">
                                Quay lại chỉnh sửa thông tin
                            </button>
                        </motion.div>
                    )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* --- MODAL GIẤY CHỨNG NHẬN (SIZE SIÊU NHỎ GỌN) --- */}
        <AnimatePresence>
          {showCertificate && (
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-[70] p-4">
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }} 
                  animate={{ scale: 1, opacity: 1 }} 
                  exit={{ scale: 0.8, opacity: 0 }} 
                  transition={{ type: "spring", damping: 20 }}
                  className="bg-[#fffdf5] rounded-xl w-full max-w-[340px] md:max-w-sm relative shadow-2xl overflow-hidden border-4 border-double border-[#d4af37]"
                >
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#d4af37] m-2"></div>
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#d4af37] m-2"></div>
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#d4af37] m-2"></div>
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#d4af37] m-2"></div>

                    <div className="p-5 md:p-6 text-center flex flex-col items-center relative z-10">
                        <motion.div 
                          initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 }}
                          className="w-12 h-12 bg-[#d4af37] rounded-full flex items-center justify-center mb-3 shadow-lg"
                        >
                            <Award className="w-6 h-6 text-white" />
                        </motion.div>
                        <h2 className="text-[#1a522e] font-serif font-bold text-[10px] uppercase tracking-widest mb-1">Quỹ hoa hồng nhỏ</h2>
                        <h1 className="text-xl md:text-2xl font-serif font-extrabold text-[#d4af37] mb-3">THƯ CẢM ƠN</h1>
                        <p className="text-gray-500 text-xs italic mb-1">Thân gửi</p>
                        <h3 className="text-lg font-bold text-[#1a522e] mb-3 uppercase break-words px-2">{donorName || "Nhà Hảo Tâm"}</h3>
                        <div className="text-gray-600 mb-4 text-xs leading-relaxed px-1">
                           <p>Xin gửi lời tri ân sâu sắc nhất đến bạn. Đóng góp của bạn đã thắp sáng thêm một ước mơ cho các em nhỏ khó khăn.</p>
                           <p className="mt-2 font-medium text-[#1a522e] italic">"Hạnh phúc là cho đi."</p>
                        </div>
                        <div className="w-16 h-px bg-[#d4af37]/50 my-2 mx-auto"></div>
                        <div className="mt-2 text-[10px] text-gray-500">
                             Ngày: <span className="font-bold text-[#1a522e]">{new Date().toLocaleDateString('vi-VN')}</span>
                        </div>
                        <div className="mt-4 bg-green-50 text-green-800 px-2 py-1.5 rounded-lg text-[10px] font-medium flex items-center justify-center gap-1.5 border border-green-100 w-full">
                            {emailSentStatus === 'sent' ? <CheckCircle2 className="w-3 h-3" /> : <Mail className="w-3 h-3 animate-pulse" />}
                            {emailSentStatus === 'sent' ? `Đã gửi thư về email` : "Đang gửi thư..."}
                        </div>
                        <div className="flex gap-2 mt-4 w-full">
                            <button onClick={() => alert("Đang tải ảnh...")} className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 bg-[#d4af37] text-white rounded-lg text-xs font-bold hover:bg-[#b5952f] transition shadow-sm"><Download className="w-3 h-3" /> Lưu</button>
                            <button onClick={handleCloseCertificate} className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg text-xs font-bold hover:bg-gray-200 transition">Đóng</button>
                        </div>
                    </div>
                </motion.div>
             </motion.div>
          )}
        </AnimatePresence>

       {/* --- MODAL XEM TRƯỚC --- */}
        <AnimatePresence>
            {showPreview && (
            <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }} 
                className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-[60] p-0 md:p-4" 
                onClick={() => setShowPreview(false)}
            >
                <motion.div 
                    initial={{ scale: 0.95, opacity: 0 }} 
                    animate={{ scale: 1, opacity: 1 }} 
                    exit={{ scale: 0.95, opacity: 0 }} 
                    onClick={(e) => e.stopPropagation()} 
                    className="bg-white md:rounded-2xl w-full h-full md:h-auto md:max-w-5xl overflow-hidden relative shadow-2xl flex flex-col md:max-h-[90vh]"
                >
                    {/* Header: Tiêu đề + Nút X */}
                    <div className="px-4 py-3 md:p-4 border-b flex justify-between items-center bg-gray-50 shrink-0 z-50 relative">
                        <div>
                            <h2 className="text-base md:text-lg font-bold text-gray-800 flex items-center gap-2">
                                <Sparkles className="w-5 h-5 text-yellow-500" /> Hành trình Chibi
                            </h2>
                            <p className="text-[10px] md:text-xs text-gray-500 md:hidden">Vuốt ngang để xem các giai đoạn</p>
                        </div>

                        {/* --- NÚT X (CLOSE) --- */}
                        <button 
                            onClick={() => setShowPreview(false)} 
                            className="bg-gray-200/80 p-2 rounded-full text-gray-600 hover:bg-red-100 hover:text-red-600 transition-all active:scale-90 flex items-center justify-center shadow-sm"
                            aria-label="Đóng"
                        >
                            <X size={24} />
                        </button>
                    </div>
                    
                    {/* CONTAINER SLIDE / SCROLL */}
                    <div className="relative flex-1 overflow-hidden bg-gray-50/50 flex flex-col justify-center">
                        
                        {/* Nút Previous (Mũi tên trái - Mobile) */}
                        {activeSlide > 0 && (
                            <button 
                                onClick={() => {
                                    if (modalScrollRef.current) {
                                        const width = modalScrollRef.current.offsetWidth;
                                        modalScrollRef.current.scrollBy({ left: -width, behavior: 'smooth' });
                                    }
                                }}
                                className="absolute left-2 top-1/2 -translate-y-1/2 z-30 bg-white/90 backdrop-blur text-gray-700 p-3 rounded-full shadow-lg border border-gray-100 hover:bg-white md:hidden active:scale-95 transition"
                            >
                                <ArrowLeft className="w-6 h-6" />
                            </button>
                        )}

                        {/* Scroll Area */}
                        <div 
                            ref={modalScrollRef}
                            onScroll={handleScroll}
                            className="flex-1 w-full overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar flex items-center px-0 md:px-8"
                        >
                            <div className="flex md:gap-8 min-w-max px-0 md:px-0 h-full md:h-auto items-center">
                                 {roseGirlSVGs.map((svg, index) => (
                                    <div key={index} className="flex flex-col items-center justify-center gap-4 snap-center w-[100vw] h-full md:w-auto md:h-auto shrink-0 py-4 md:py-8">
                                        
                                        {/* Card Chibi Responsive */}
                                        <div className="
                                            relative bg-white rounded-2xl border-2 border-[#1a522e]/10 shadow-sm transition-all duration-300
                                            flex items-center justify-center
                                            w-[65vw] h-[45vh]          /* Mobile Size */
                                            md:w-56 md:h-80             /* Desktop Size */
                                        ">
                                            <div className="w-full h-full p-8 md:p-6 flex items-center justify-center">
                                                <div className="w-full h-full flex items-center justify-center transform transition-transform duration-300" dangerouslySetInnerHTML={{ __html: svg }} />
                                            </div>

                                            <span className="absolute top-3 left-3 w-7 h-7 flex items-center justify-center bg-[#1a522e] text-white rounded-full shadow text-xs font-bold border-2 border-white">
                                                {index + 1}
                                            </span>
                                        </div>

                                        <div className="text-center px-4">
                                            <span className="block text-lg md:text-lg font-bold text-gray-700">Giai đoạn {index + 1}</span>
                                            <span className="text-xs text-gray-500 bg-white px-3 py-1 rounded-full shadow-sm mt-2 inline-block">
                                                {(index + 1) * 20}% Sức sống
                                            </span>
                                        </div>
                                    </div>
                                 ))}
                            </div>
                        </div>

                        {/* Nút Next (Mũi tên phải - Mobile) */}
                        {activeSlide < roseGirlSVGs.length - 1 && (
                            <button 
                                onClick={() => {
                                    if (modalScrollRef.current) {
                                        const width = modalScrollRef.current.offsetWidth;
                                        modalScrollRef.current.scrollBy({ left: width, behavior: 'smooth' });
                                    }
                                }}
                                className="absolute right-2 top-1/2 -translate-y-1/2 z-30 bg-white/90 backdrop-blur text-gray-700 p-3 rounded-full shadow-lg border border-gray-100 hover:bg-white md:hidden active:scale-95 transition"
                            >
                                <ChevronRight className="w-6 h-6" />
                            </button>
                        )}
                    </div>
                    
                    {/* Indicator Bar (Thanh tiến trình) */}
                    <div className="h-1.5 bg-gray-100 w-full md:hidden shrink-0">
                         <div 
                            className="h-full bg-[#1a522e] transition-all duration-300 ease-out" 
                            style={{ width: `${((activeSlide + 1) / roseGirlSVGs.length) * 100}%` }}
                         />
                    </div>

                </motion.div>
            </motion.div>
            )}
        </AnimatePresence>
      </div>
    </div>
  );
}