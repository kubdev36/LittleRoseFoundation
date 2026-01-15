"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Share2, Droplets, Heart, QrCode, CreditCard, Wallet, Crown, ArrowRight, Facebook, Link as LinkIcon, X, CheckCircle2 } from "lucide-react";

import DonateModal from "../project/DonateModal";
import ThankYouModal from "../components/ThankYouModal";
// --- DỮ LIỆU CÁC GIAI ĐOẠN PHÁT TRIỂN ---
const ROSE_STAGES = [
  {
    id: 1,
    name: "Hạt Mầm Hy Vọng",
    threshold: 0,
    // Đã thêm style overflow:visible để tránh bị cắt hình
    svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="overflow: visible"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#8B4513" fill-opacity="0.1"/><path d="M12 17C13.6569 17 15 15.6569 15 14C15 12.3431 13.6569 10 12 10C10.3431 10 9 12.3431 9 14C9 15.6569 10.3431 17 12 17Z" fill="#5D2906"/><path d="M11 10L11 7" stroke="#4ADE80" stroke-width="1.5" stroke-linecap="round"/><path d="M13 11L13 8" stroke="#4ADE80" stroke-width="1.5" stroke-linecap="round"/></svg>`,
    quote: "Hạt giống nhỏ mang trong mình cả một khu vườn tương lai."
  },
  {
    id: 2,
    name: "Mầm Nụ Trí Tuệ",
    threshold: 100,
    svg: `<svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style="overflow: visible"><path d="M50 90 L50 60" stroke="#059669" stroke-linecap="round" stroke-width="5"></path><path d="M50 60 C70 45, 80 60, 50 80" fill="#10B981" fill-opacity="0.9"></path><path d="M50 65 C30 50, 20 65, 50 85" fill="#059669" fill-opacity="0.8"></path><circle cx="50" cy="55" fill="#E11D48" r="8"></circle></svg>`,
    quote: "Sức mạnh của trí tuệ bắt đầu từ những khát khao nhỏ nhất."
  },
  {
    id: 3,
    name: "Nụ Hoa Nhân Ái",
    threshold: 300,
    svg: `<svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style="overflow: visible"><path d="M50 90 L50 50" stroke="#059669" stroke-linecap="round" stroke-width="5"></path><path d="M50 50 C30 30, 70 30, 50 50" fill="#FB7185" stroke="#E11D48" stroke-width="2"></path><path d="M50 50 C40 35, 60 35, 50 50" fill="#E11D48"></path><path d="M30 70 C40 60, 50 70, 50 80" fill="#059669"></path></svg>`,
    quote: "Lòng nhân ái chớm nở, lan tỏa hương thơm dịu dàng."
  },
  {
    id: 4,
    name: "Cành Hoa Nâng Đỡ",
    threshold: 600,
    svg: `<svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style="overflow: visible"><path d="M50 90 L50 40" stroke="#059669" stroke-linecap="round" stroke-width="6"></path><path d="M50 40 C20 10, 80 10, 50 40" fill="#FB7185" stroke="#E11D48" stroke-width="2"></path><path d="M50 40 C35 25, 65 25, 50 40" fill="#E11D48"></path><path d="M50 60 L75 45" stroke="#059669" stroke-linecap="round" stroke-width="3"></path><path d="M75 45 C85 35, 90 45, 75 55" fill="#10B981"></path></svg>`,
    quote: "Vẻ đẹp kiên cường vươn lên giữa muôn vàn thử thách."
  },
  {
    id: 5,
    name: "Đóa Hồng Ước Mơ",
    threshold: 1000,
    svg: `<svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style="overflow: visible"><path d="M50 95 L50 50" stroke="#059669" stroke-linecap="round" stroke-width="7"></path><circle cx="50" cy="40" fill="#E11D48" r="25"></circle><circle cx="50" cy="40" fill="#FB7185" opacity="0.6" r="30"></circle><circle cx="50" cy="40" fill="#FFF1F2" opacity="0.3" r="35"></circle><path d="M35 70 C20 60, 20 80, 50 85" fill="#059669"></path><path d="M65 70 C80 60, 80 80, 50 85" fill="#059669"></path></svg>`,
    quote: "Ước mơ nở rộ, tỏa sáng rực rỡ và trọn vẹn nhất."
  }
];

const MAIN_FLOWER_SVG = `<svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style="overflow: visible"><defs><linearGradient id="stemGrad" x1="0%" x2="0%" y1="0%" y2="100%"><stop offset="0%" style="stop-color:#34D399;stop-opacity:1"></stop><stop offset="100%" style="stop-color:#065F46;stop-opacity:1"></stop></linearGradient><linearGradient id="leafGrad" x1="0%" x2="100%" y1="0%" y2="100%"><stop offset="0%" style="stop-color:#6EE7B7;stop-opacity:1"></stop><stop offset="100%" style="stop-color:#047857;stop-opacity:1"></stop></linearGradient><radialGradient id="budGrad" cx="50%" cy="50%" r="50%"><stop offset="0%" style="stop-color:#FDA4AF;stop-opacity:1"></stop><stop offset="100%" style="stop-color:#E11D48;stop-opacity:1"></stop></radialGradient></defs><path d="M50 90 Q48 70, 50 50" fill="none" stroke="url(#stemGrad)" stroke-linecap="round" stroke-width="6"></path><path d="M50 75 Q70 65, 85 75 Q70 85, 50 75" fill="url(#leafGrad)"></path><path d="M50 80 Q30 70, 15 80 Q30 90, 50 80" fill="url(#leafGrad)"></path><path d="M50 50 C35 30, 65 30, 50 50" fill="url(#budGrad)" stroke="#BE123C" stroke-width="1.5"></path><path d="M50 50 C42 40, 58 40, 50 50" fill="#9F1239" opacity="0.6"></path></svg>`;

const DONATION_AMOUNTS = [50000, 200000, 500000];

export default function RoseEvolutionGallery() {
  const [waterPoints, setWaterPoints] = useState(0); 
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [inputAmount, setInputAmount] = useState("");
  const [isWatering, setIsWatering] = useState(false);
  const [showEvolution, setShowEvolution] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  // -- STATES CHO 2 MODAL MỚI --
  const [showDonateModal, setShowDonateModal] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [lastDonationAmount, setLastDonationAmount] = useState(0);
  
  // -- QUAN TRỌNG: Thêm state check xem đã load dữ liệu xong chưa --
  const [isLoaded, setIsLoaded] = useState(false);

  // 1. Load điểm từ LocalStorage (Chạy 1 lần khi mount)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedPoints = localStorage.getItem("rose_water_points");
      if (savedPoints) {
          setWaterPoints(parseInt(savedPoints));
      }
      setIsLoaded(true); // Đánh dấu là đã load xong
    }
  }, []);

  // 2. Tính toán giai đoạn phát triển + Lưu LocalStorage
  useEffect(() => {
    // Logic tính toán Stage
    let newIndex = 0;
    for (let i = ROSE_STAGES.length - 1; i >= 0; i--) {
      if (waterPoints >= ROSE_STAGES[i].threshold) {
        newIndex = i;
        break;
      }
    }

    if (newIndex > currentStageIndex && isLoaded) { // Chỉ hiện effect nếu đã load
      setShowEvolution(true);
      setTimeout(() => setShowEvolution(false), 3000);
    }
    
    if (isLoaded) {
        setCurrentStageIndex(newIndex);
    }

    // Logic Lưu LocalStorage (Chỉ lưu khi đã Load xong để tránh ghi đè số 0)
    if (typeof window !== "undefined" && isLoaded) {
        localStorage.setItem("rose_water_points", waterPoints.toString());
    }
  }, [waterPoints, isLoaded]); // Bỏ currentStageIndex khỏi dependency để tránh loop

  const currentStage = ROSE_STAGES[currentStageIndex];
  const nextStage = ROSE_STAGES[currentStageIndex + 1];
  
  let progressPercent = 100;
  let pointsNeeded = 0;
  
  if (nextStage) {
    const range = nextStage.threshold - currentStage.threshold;
    const currentProgress = waterPoints - currentStage.threshold;
    progressPercent = Math.min(100, Math.round((currentProgress / range) * 100));
    pointsNeeded = nextStage.threshold - waterPoints;
  }

  // --- HÀM 1: Bấm nút quyên góp -> Mở DonateModal ---
  const handleOpenDonate = (amount: number) => {
    // Cho phép quyên góp kể cả khi max level (tùy chọn)
    if (!amount || amount <= 0) { alert("Vui lòng nhập số tiền hợp lệ."); return; }
    
    setLastDonationAmount(amount); 
    setShowDonateModal(true);      
  };

  // --- HÀM 2: Xử lý khi Donate thành công -> Mở ThankYouModal ---
  const handleDonationSuccess = () => {
    setShowDonateModal(false); 
    
    setIsWatering(true);
    
    // Tính toán lượng điểm cộng thêm (Giả lập)
    const range = nextStage ? (nextStage.threshold - currentStage.threshold) : 100;
    const pointsToAdd = Math.max(1, Math.ceil(range / 5)); // Tăng tốc độ lên 20% mỗi lần donate để test nhanh

    setTimeout(() => {
      setWaterPoints(prev => prev + pointsToAdd);
      setIsWatering(false);
      setShowThankYou(true);
    }, 1000);
  };

  // Hàm chia sẻ
  const addPointsForSharing = () => {
    setIsWatering(true);
    const range = nextStage ? (nextStage.threshold - currentStage.threshold) : 100;
    const pointsToAdd = Math.max(1, Math.ceil(range / 50)); // 2%

    setTimeout(() => {
      setWaterPoints(prev => prev + pointsToAdd);
      setIsWatering(false);
      alert("Cảm ơn bạn đã chia sẻ! Đóa hồng nhận thêm sức sống.");
    }, 800);
  };

  // Nếu chưa load xong dữ liệu từ LocalStorage, có thể hiện Loading hoặc render mặc định
  // Ở đây render mặc định (0 điểm) nhưng chưa cho phép lưu đè
  
  return (
    <div className="min-h-screen bg-[#FDFBF7] font-sans text-gray-800 pb-20">
      
      {/* HEADER */}
      <header className="text-center py-12 px-4">
        <h1 className="text-4xl md:text-5xl font-serif text-[#1A4D2E] mb-3 font-bold">
          Rose Evolution Gallery
        </h1>
        <p className="text-gray-500 max-w-2xl mx-auto text-sm md:text-base font-light">
          Hành trình rực rỡ của những đóa hồng tâm huyết. Mỗi sự đóng góp là một giọt nước 
          nuôi dưỡng mầm xanh nhân ái vươn mình tỏa hương.
        </p>
      </header>

      <div className="max-w-6xl mx-auto px-4">
        
        {/* --- 1. GALLERY STAGES (TOP SECTION) --- */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-10 relative">
          {ROSE_STAGES.map((stage, idx) => {
            const isCurrent = idx === currentStageIndex;

            return (
              <div 
                key={stage.id} 
                className={`
                  flex flex-col items-center p-3 rounded-2xl transition-all duration-500 relative z-10
                  ${isCurrent 
                    ? 'bg-white shadow-xl scale-105 border-2 border-emerald-100' 
                    : 'bg-white/40 hover:bg-white/80 opacity-70 grayscale hover:grayscale-0'
                  }
                `}
              >
                {isCurrent && (
                  <span className="absolute -top-3 bg-[#1A4D2E] text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                    Hiện tại
                  </span>
                )}

                <div className="h-20 w-full flex items-center justify-center mb-2 mt-1">
                    <div 
                      className={`h-full w-auto max-w-[80%] flex items-center justify-center transition-transform duration-700 ${isCurrent ? 'scale-110 drop-shadow-md' : 'scale-90'}`}
                      // Fix: Thêm width/height 100% vào style để SVG co giãn đúng
                      dangerouslySetInnerHTML={{ __html: stage.svg.replace('<svg', '<svg style="width: 100%; height: 100%; overflow: visible;"') }} 
                    />
                </div>

                <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">Giai đoạn {idx + 1}</p>
                <h3 className={`text-xs font-bold text-center mb-1 ${isCurrent ? 'text-[#1A4D2E]' : 'text-gray-600'}`}>
                  {stage.name}
                </h3>
                
                <p className={`text-[10px] font-bold ${isCurrent ? 'text-emerald-600' : 'text-gray-400'}`}>
                  {idx < currentStageIndex ? (
                    <span className="flex items-center gap-1 justify-center"><CheckCircle2 size={10} /> Đạt được</span>
                  ) : isCurrent ? (
                    "Đang phát triển"
                  ) : (
                    `${stage.threshold.toLocaleString('vi-VN')} giọt`
                  )}
                </p>
              </div>
            );
          })}
          <div className="absolute top-[45%] left-0 w-full h-1 bg-gray-200 -z-0 hidden md:block rounded-full opacity-50"></div>
        </div>

        {/* --- 2. MAIN INTERACTION CARD --- */}
        <div className="bg-white rounded-[40px] shadow-2xl overflow-hidden border border-gray-100 relative">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[600px]">
            
            {/* LEFT: VISUALIZATION */}
            <div className="lg:col-span-5 bg-gradient-to-b from-[#f0fdf4] to-white p-6 md:p-10 flex flex-col items-center justify-center relative border-r border-gray-50 overflow-hidden">
                <AnimatePresence>
                  {isWatering && (
                    <motion.div 
                      initial={{ y: -100, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 20, opacity: 0 }}
                      className="absolute top-10 z-20 text-blue-400"
                    >
                      <Droplets size={40} fill="currentColor" />
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="relative w-full h-64 md:h-80 flex items-center justify-center">
                    <motion.div 
                      key={currentStageIndex} 
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 100 }}
                      className="w-full h-full max-w-[240px] max-h-[320px] drop-shadow-xl"
                      // Fix: Đảm bảo SVG scale tốt
                      dangerouslySetInnerHTML={{ __html: (currentStageIndex === 4 ? MAIN_FLOWER_SVG : currentStage.svg).replace('<svg', '<svg style="width: 100%; height: 100%; overflow: visible;"') }}
                    />
                </div>

                <div className="text-center mt-6 z-10">
                  <span className="text-emerald-600 font-bold text-xs bg-emerald-50 px-3 py-1.5 rounded-full mb-2 inline-block border border-emerald-100">
                    Giai đoạn: {currentStage.name}
                  </span>
                  <p className="text-gray-500 italic text-xs md:text-sm max-w-[200px] mx-auto leading-relaxed">
                    "{currentStage.quote}"
                  </p>
                </div>
            </div>

            {/* RIGHT: ACTIONS & PROGRESS */}
            <div className="lg:col-span-7 p-8 md:p-12 flex flex-col justify-center">
              <div className="mb-10">
                <div className="flex justify-between items-end mb-4">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">Tiến trình hiện tại</h2>
                    <p className="text-gray-400 text-sm">
                      {nextStage ? `Cần thêm ${pointsNeeded.toLocaleString('vi-VN')} giọt nước để tiến hóa` : "Bạn đã đạt cấp độ tối đa!"}
                    </p>
                  </div>
                  <span className="text-4xl font-bold text-emerald-500">{progressPercent}%</span>
                </div>
                
                <div className="w-full bg-gray-100 h-4 rounded-full overflow-hidden shadow-inner">
                  <motion.div 
                    initial={{ width: 0 }} 
                    animate={{ width: `${progressPercent}%` }} 
                    transition={{ duration: 1 }}
                    className="h-full bg-gradient-to-r from-emerald-400 to-[#1A4D2E] rounded-full relative"
                  >
                    <div className="absolute top-0 left-0 w-full h-full bg-white/20 animate-pulse"></div>
                  </motion.div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-3xl p-6 md:p-8 mb-8 border border-gray-100">
                <h3 className="font-bold text-[#1A4D2E] flex items-center gap-2 mb-4">
                  <Heart size={20} className="fill-red-500 text-red-500" /> Nuôi Dưỡng Nhanh
                </h3>
                
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {DONATION_AMOUNTS.map((amt) => (
                    <button
                      key={amt}
                      onClick={() => setInputAmount(amt.toString())}
                      className={`py-3 rounded-xl text-sm font-bold border transition-all ${
                        inputAmount === amt.toString() 
                        ? 'border-emerald-500 bg-white text-emerald-700 shadow-md ring-1 ring-emerald-500' 
                        : 'border-gray-200 bg-white text-gray-500 hover:border-emerald-300'
                      }`}
                    >
                      {amt.toLocaleString('vi-VN')}đ
                    </button>
                  ))}
                </div>

                <div className="relative mb-6">
                  <input 
                    type="number" 
                    value={inputAmount}
                    onChange={(e) => setInputAmount(e.target.value)}
                    placeholder="Nhập số tiền tùy ý"
                    className="w-full p-4 rounded-xl border border-gray-200 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 text-lg font-bold text-gray-700 bg-white placeholder:font-normal"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm">VND</span>
                </div>

                <p className="text-[10px] font-bold text-gray-400 uppercase mb-3">Phương thức thanh toán</p>
                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className="flex flex-col items-center justify-center p-3 bg-emerald-100/50 rounded-xl border border-emerald-200 cursor-pointer hover:bg-emerald-100 transition">
                    <QrCode size={20} className="text-[#1A4D2E] mb-1" />
                    <span className="text-[10px] font-bold text-[#1A4D2E]">QR Pay</span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-3 bg-white rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-50 transition">
                    <Wallet size={20} className="text-pink-500 mb-1" />
                    <span className="text-[10px] font-bold text-gray-600">MoMo</span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-3 bg-white rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-50 transition">
                    <CreditCard size={20} className="text-blue-500 mb-1" />
                    <span className="text-[10px] font-bold text-gray-600">Thẻ/Visa</span>
                  </div>
                </div>

                <button 
                  onClick={() => handleOpenDonate(Number(inputAmount) || 0)}
                  disabled={!inputAmount || Number(inputAmount) <= 0}
                  className="w-full bg-[#1A4D2E] hover:bg-[#143d24] disabled:bg-gray-300 text-white font-bold py-4 rounded-xl shadow-lg shadow-emerald-900/20 transition-all flex items-center justify-center gap-2 text-base"
                >
                  Xác nhận Nuôi Dưỡng <ArrowRight size={16} />
                </button>
              </div>

              <p className="text-center text-[10px] text-gray-400 max-w-sm mx-auto">
                Bằng việc xác nhận, bạn đồng ý với các điều khoản đóng góp và chính sách bảo mật của Quỹ Hoa Hồng Nhỏ.
              </p>
            </div>
          </div>
        </div>

        {/* --- 3. BOTTOM FEATURES --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <FeatureCard 
            icon={<Droplets className="text-blue-500" />}
            title="Tưới nước hằng ngày"
            desc="Đăng nhập để nhận điểm sức sống, giúp hoa hồng vươn mình mạnh mẽ hơn mỗi ngày."
          />
          <FeatureCard 
            icon={<Share2 className="text-pink-500" />}
            title="Lan tỏa yêu thương"
            desc="Chia sẻ chiến dịch 'Quỹ Hoa Hồng Nhỏ' để nhận phần bón tăng trưởng đặc biệt."
            action={() => setShowShareModal(true)}
          />
          <FeatureCard 
            icon={<Crown className="text-yellow-500" />}
            title="Hệ thống Huy hiệu"
            desc="Thu thập huy hiệu hoa hồng giới hạn khi dự án đạt các cột mốc quan trọng."
          />
        </div>
      </div>

      {/* --- MODAL SHARE --- */}
      <AnimatePresence>
        {showShareModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
            onClick={() => setShowShareModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-8 max-w-sm w-full text-center relative"
            >
              <button onClick={() => setShowShareModal(false)} className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors">
                <X size={20} className="text-gray-500" />
              </button>
              <Share2 size={32} className="mx-auto text-pink-500 mb-4" />
              <h2 className="text-xl font-bold text-[#1A4D2E] mb-2">Lan Tỏa Yêu Thương</h2>
              <p className="text-gray-500 text-sm mb-6">Mỗi lượt chia sẻ của bạn sẽ giúp đóa hồng nhận thêm sức sống.</p>
              <div className="space-y-3">
                <SocialShareButton platform="Facebook" icon={<Facebook size={20} />} onClick={() => { addPointsForSharing(); setShowShareModal(false); }} className="bg-[#1877F2] text-white" />
                <SocialShareButton platform="Copy Link" icon={<LinkIcon size={20} />} onClick={() => { navigator.clipboard.writeText(window.location.href); addPointsForSharing(); setShowShareModal(false); alert("Đã sao chép liên kết!"); }} className="bg-gray-600 text-white" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- MODAL DONATE (Bước 1) --- */}
      <DonateModal 
        isOpen={showDonateModal}
        onClose={() => setShowDonateModal(false)}
        onSuccess={handleDonationSuccess}
        initialAmount={lastDonationAmount}
        projectTitle="Quỹ Hoa Hồng Nhỏ - Chiến dịch nuôi dưỡng ước mơ"
      />

      {/* --- MODAL THANK YOU (Bước 2) --- */}
      <ThankYouModal 
        isOpen={showThankYou}
        onClose={() => setShowThankYou(false)}
        growthStage={currentStage.name}
        growthPercent={progressPercent}
        // Giả lập tính toán: 20.000đ = 1 bữa ăn
        impactValue={`${Math.max(1, Math.floor(lastDonationAmount / 20000))} bữa sáng cho em`}
      />

      {/* --- MODAL EVOLUTION --- */}
      <AnimatePresence>
        {showEvolution && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
            <motion.div initial={{ scale: 0.5, y: 100 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.5, opacity: 0 }} className="bg-white rounded-3xl p-8 max-w-md w-full text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-400 to-yellow-400"></div>
              <Crown size={48} className="mx-auto text-yellow-500 mb-4 animate-bounce" />
              <h2 className="text-2xl font-bold text-[#1A4D2E] mb-2">Chúc Mừng!</h2>
              <p className="text-gray-600 mb-6">Đóa hoa của bạn đã tiến hóa thành công lên giai đoạn mới:</p>
              <h3 className="text-xl font-bold text-emerald-600 mb-6 bg-emerald-50 py-2 rounded-lg border border-emerald-100">{currentStage.name}</h3>
              <div className="h-40 w-full flex items-center justify-center mb-6">
                 <div className="w-32 h-32" dangerouslySetInnerHTML={{ __html: currentStage.svg.replace('<svg', '<svg style="width: 100%; height: 100%; overflow: visible;"') }} />
              </div>
              <button onClick={() => setShowEvolution(false)} className="bg-[#1A4D2E] text-white w-full py-3 rounded-xl font-bold hover:bg-[#143d24] transition">Tuyệt vời!</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FeatureCard({ icon, title, desc, action }: { icon: React.ReactNode, title: string, desc: string, action?: () => void }) {
  return (
    <div onClick={action} className={`bg-white p-6 rounded-2xl border border-gray-100 flex items-start gap-4 hover:shadow-lg transition-shadow ${action ? 'cursor-pointer group' : ''}`}>
      <div className="bg-gray-50 p-3 rounded-full shrink-0 group-hover:scale-110 transition-transform">{icon}</div>
      <div>
        <h4 className="font-bold text-gray-800 text-sm mb-1 group-hover:text-emerald-600 transition-colors">{title}</h4>
        <p className="text-xs text-gray-500 leading-relaxed font-light">{desc}</p>
      </div>
    </div>
  );
}

function SocialShareButton({ platform, icon, onClick, className }: { platform: string, icon: React.ReactNode, onClick: () => void, className: string }) {
  return (
    <button onClick={onClick} className={`w-full flex items-center justify-center gap-3 py-3 rounded-xl font-bold transition-opacity hover:opacity-90 ${className}`}>
      {icon} Chia sẻ lên {platform}
    </button>
  );
}