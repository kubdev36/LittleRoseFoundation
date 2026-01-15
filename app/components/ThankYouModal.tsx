"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Share2, Utensils, Heart } from "lucide-react";

interface ThankYouModalProps {
  isOpen: boolean;
  onClose: () => void;
  growthStage?: string; // VD: Giai đoạn 2
  growthPercent?: number; // VD: 45
  impactValue?: string; // VD: 5 bữa sáng cho em
}

export default function ThankYouModal({
  isOpen,
  onClose,
  growthStage = "Giai đoạn 2",
  growthPercent = 45,
  impactValue = "5 bữa sáng cho em",
}: ThankYouModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl p-8 text-center overflow-hidden"
          >
            {/* Background Gradient Decor */}
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-emerald-50/50 to-transparent pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1 transition-colors"
            >
              <X size={20} />
            </button>

            {/* Icon Header */}
            <div className="relative mb-6 flex justify-center">
              <div className="relative">
                 <div className="w-16 h-16 bg-gradient-to-tr from-emerald-400 to-teal-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-200">
                    <Heart className="text-white fill-white" size={32} />
                 </div>
                 {/* Decor leaf */}
                 <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center border-2 border-white">
                    <div className="w-2 h-2 bg-white rounded-full animate-ping" />
                 </div>
              </div>
            </div>

            {/* Title & Description */}
            <h2 className="text-2xl  font-bold text-gray-800 mb-2 leading-tight">
              Cảm ơn bạn đã tưới nước cho <br />
              <span className="text-[#1A4D2E]">Đóa Hồng Nhỏ!</span>
            </h2>
            <p className="text-xs text-gray-500 mb-8 leading-relaxed px-2">
              Hành động tử tế của bạn đã tiếp thêm sức mạnh cho những mầm non vươn lên.
            </p>

            {/* Progress Section */}
            <div className="mb-6">
              <div className="flex justify-between items-center text-[10px] font-bold uppercase mb-2 text-emerald-700 tracking-wide">
                <span>Tiến độ sinh trưởng</span>
                <span>{growthStage} • {growthPercent}%</span>
              </div>
              <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${growthPercent}%` }}
                  transition={{ duration: 1, delay: 0.3 }}
                  className="h-full bg-emerald-500 rounded-full"
                />
              </div>
            </div>

            {/* Impact Card */}
            <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-4 flex items-center gap-4 mb-8 text-left">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-emerald-600 shadow-sm shrink-0">
                <Utensils size={20} />
              </div>
              <div>
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Tác động thực tế</p>
                <p className="text-xs font-bold text-gray-700">
                  Giao dịch này tương đương với <span className="text-emerald-700">{impactValue}</span>
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-4">
              <button className="w-full bg-[#00A651] hover:bg-[#008f45] text-white font-bold py-3.5 rounded-xl shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 text-sm">
                <Share2 size={18} /> Share the Growth
              </button>
              
              <button 
                onClick={onClose}
                className="text-xs font-medium text-gray-400 hover:text-gray-600 transition-colors"
              >
                Tiếp tục xem dự án
              </button>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}