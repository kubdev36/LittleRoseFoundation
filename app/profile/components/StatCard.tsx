import React from "react";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string;
  unit: string;
  icon: LucideIcon;
  color: string; // VD: text-emerald-600
  bg: string;    // VD: bg-emerald-50
}

export default function StatCard({ label, value, unit, icon: Icon, color, bg }: StatCardProps) {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 transition-transform hover:-translate-y-1 duration-300">
      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${bg} ${color}`}>
        <Icon size={24} />
      </div>
      <div>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">{label}</p>
        <p className="text-lg font-bold text-gray-800">
          {value} <span className="text-[10px] text-gray-400 font-normal ml-1">{unit}</span>
        </p>
      </div>
    </div>
  );
}