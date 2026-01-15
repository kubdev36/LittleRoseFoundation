'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Heart, QrCode, Loader2, ArrowRight // Đã xóa các icon thừa để fix lỗi deploy
} from 'lucide-react';

interface DonateModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialAmount?: number;
  projectTitle?: string;
  onSuccess?: () => void;
}

export default function DonateModal({
  isOpen,
  onClose,
  initialAmount = 0,
  projectTitle = "Chung tay vì cộng đồng",
  onSuccess,
}: DonateModalProps) {
  const [step, setStep] = useState<'info' | 'qr'>('info');
  const [countdown, setCountdown] = useState(5);
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [donorMessage, setDonorMessage] = useState('');
  
  const [amount, setAmount] = useState<number>(initialAmount || 0);

  useEffect(() => {
    setAmount(initialAmount || 0);
  }, [initialAmount]);

  useEffect(() => {
    if (!isOpen) {
      setStep('info');
      setDonorName('');
      setDonorEmail('');
      setDonorMessage('');
      setCountdown(5);
    }
  }, [isOpen]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (step === 'qr' && isOpen) {
      setCountdown(5);

      const interval = setInterval(() => {
        setCountdown((prev) => Math.max(0, prev - 1));
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, isOpen]); 
  // Lưu ý: Đã thêm disable lint cho dependency array vì handleFinishDonation thường không đổi, 
  // nhưng nếu strict mode bắt bẻ thì bạn có thể bọc handleFinishDonation vào useCallback.

  const handleGenerateQR = () => {
    if (!donorName.trim() || !donorEmail.trim()) {
      alert('Vui lòng điền đầy đủ họ tên và email!');
      return;
    }
    setStep('qr');
  };

  const handleFinishDonation = () => {
    onSuccess?.();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/65 backdrop-blur-sm flex items-center justify-center z-[60] p-4 font-sans"
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            className="bg-white rounded-3xl w-full max-w-md relative shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="p-5 border-b bg-[#1A4D2E] text-white flex justify-between items-center relative">
              <div>
                <h2 className="text-lg font-bold font-serif flex items-center gap-2">
                  <Heart className="w-5 h-5 fill-red-500 text-red-500 animate-pulse" />
                  {step === 'info' ? 'Thông tin ủng hộ' : 'Quét mã QR'}
                </h2>
                {/* Fix: Sử dụng projectTitle ở đây để tránh lỗi unused var */}
                <p className="text-xs text-white/80 mt-1 truncate max-w-[200px]">
                   Dự án: {projectTitle}
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-white/70 hover:text-white hover:bg-white/10 p-2 rounded-full transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto">
              
              {/* --- STEP 1: INFO FORM --- */}
              {step === 'info' && (
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="space-y-5"
                >
                  {/* Amount Display */}
                  <div className="text-center mb-6">
                    <p className="text-xs font-bold text-gray-400 uppercase mb-1">Số tiền quyên góp</p>
                    <p className="text-3xl font-bold text-[#1A4D2E]">
                      {(amount || 0).toLocaleString('vi-VN')} ₫
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">
                      Họ và tên <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      className="w-full p-3.5 border border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition text-sm font-medium"
                      placeholder="Nhập họ tên của bạn"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={donorEmail}
                      onChange={(e) => setDonorEmail(e.target.value)}
                      className="w-full p-3.5 border border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition text-sm font-medium"
                      placeholder="email@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">
                      Lời nhắn (Tùy chọn)
                    </label>
                    <textarea
                      value={donorMessage}
                      onChange={(e) => setDonorMessage(e.target.value)}
                      className="w-full p-3.5 border border-gray-200 rounded-xl text-sm font-medium resize-none h-24 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition"
                      placeholder="Gửi những lời chúc tốt đẹp..."
                    />
                  </div>

                  <button
                    onClick={handleGenerateQR}
                    className="w-full py-4 bg-[#1A4D2E] hover:bg-[#143d24] text-white font-bold rounded-xl shadow-lg shadow-emerald-900/10 transition-all flex items-center justify-center gap-2 mt-4"
                  >
                    Tiếp tục thanh toán <ArrowRight size={18} />
                  </button>
                </motion.div>
              )}

              {/* --- STEP 2: QR CODE --- */}
              {step === 'qr' && (
                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="flex flex-col items-center text-center space-y-6"
                >
                  <div className="bg-white p-4 rounded-2xl shadow-lg border border-gray-100">
                    {/* Placeholder QR Code */}
                    <QrCode className="w-48 h-48 text-gray-800" strokeWidth={1} />
                  </div>

                  <div>
                    <p className="font-bold text-lg text-gray-800 mb-1">
                      Đang chờ thanh toán...
                    </p>
                    <div className="flex items-center justify-center gap-2 text-emerald-600 bg-emerald-50 px-4 py-2 rounded-full inline-flex mt-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span className="font-bold text-sm">Tự động xác nhận sau {countdown}s</span>
                    </div>
                  </div>

                  <div className="w-full bg-gray-50 p-5 rounded-xl border border-dashed border-gray-300 text-left space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Ngân hàng</span>
                      <span className="font-bold text-gray-800">MB Bank</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Số tài khoản</span>
                      <span className="font-mono font-bold text-gray-800 tracking-wider">0987 654 321</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Chủ tài khoản</span>
                      <span className="font-bold text-gray-800 uppercase">QUY HOA HONG NHO</span>
                    </div>
                    <div className="border-t border-dashed border-gray-200 my-2"></div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Nội dung</span>
                      <span className="font-mono font-bold text-emerald-700">
                        DONATE {donorName.split(' ').pop()?.toUpperCase() || 'HOTRO'}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Số tiền</span>
                      <span className="font-bold text-emerald-700 text-lg">
                        {(amount || 0).toLocaleString('vi-VN')} ₫
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => setStep('info')}
                    className="text-xs font-bold text-gray-400 hover:text-emerald-600 transition uppercase tracking-wide"
                  >
                    ← Quay lại chỉnh sửa
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}