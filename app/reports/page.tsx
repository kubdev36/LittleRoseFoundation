'use client';

import React, { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import statementData from "../data/statement.json";
import projects from "../data/projects.json"; 
import { 
  ArrowLeft, 
  Download, 
  Printer, 
  Wallet, 
  Landmark, 
  TrendingUp, 
  TrendingDown, 
  FolderOpen, 
  Filter, 
  Search, 
  Calendar,
  MoveHorizontal 
} from "lucide-react";

// --- TYPES (Giữ nguyên) ---
type TxType = "IN" | "OUT";

type Transaction = {
  id: string;
  time: string;
  detail: string;
  amount: number;
  balanceAfter: number;
  type: TxType;
  projectId?: number;
};

type Statement = {
  accountName: string;
  bankName: string;
  currency: "VND";
  currentBalance: number;
  month: string;
  monthIn: number;
  monthOut: number;
  transactions: Transaction[];
};

const data = statementData as Statement;

// --- UTILS (Giữ nguyên) ---
function formatVND(n: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
  }).format(n);
}

function formatTime(iso: string) {
  const d = new Date(iso);
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  const hh = String(d.getHours()).padStart(2, "0");
  const mi = String(d.getMinutes()).padStart(2, "0");
  return `${dd}/${mm}/${yyyy} ${hh}:${mi}`;
}

function toCSV(rows: Transaction[]) {
  const header = ["THỜI GIAN", "MÃ GIAO DỊCH", "NỘI DUNG CHI TIẾT", "SỐ TIỀN", "SỐ DƯ"].join(",");
  const body = rows
    .map((r) => {
      const time = formatTime(r.time);
      const amount = (r.type === "IN" ? "+" : "-") + r.amount;
      const detail = `"${r.detail.replaceAll('"', '""')}"`;
      return [time, r.id, detail, amount, r.balanceAfter].join(",");
    })
    .join("\n");
  return `${header}\n${body}`;
}

export default function ReportsPage() {
  // --- STATE (Giữ nguyên) ---
  const [q, setQ] = useState("");
  const [txType, setTxType] = useState<"ALL" | TxType>("ALL");
  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");
  const [selectedProject, setSelectedProject] = useState<number | "ALL">("ALL");
  const [summaryRange, setSummaryRange] = useState<"WEEK" | "MONTH" | "YEAR">("MONTH");

  const pageSize = 15;
  const [page, setPage] = useState(1);

  // --- SCROLL STATE ---
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [showFloatingScroll, setShowFloatingScroll] = useState(false);

  // --- LOGIC (Giữ nguyên) ---
  const filtered = useMemo(() => {
    const qLower = q.trim().toLowerCase();
    const selectedProj = projects.find(p => p.id === selectedProject);
    const fromTime = from ? new Date(from + "T00:00:00").getTime() : null;
    const toTime = to ? new Date(to + "T23:59:59").getTime() : null;

    return (data.transactions ?? [])
      .filter((t) => (txType === "ALL" ? true : t.type === txType))
      .filter((t) => {
        if (!qLower) return true;
        return t.id.toLowerCase().includes(qLower) || t.detail.toLowerCase().includes(qLower);
      })
      .filter((t) => {
        if (selectedProject === "ALL") return true;
        if (!selectedProj) return true;
        const keywords = selectedProj.keywords.toLowerCase().split(", ");
        const titleLower = selectedProj.title.toLowerCase();
        const detailLower = t.detail.toLowerCase();
        return keywords.some(k => detailLower.includes(k)) || detailLower.includes(titleLower);
      })
      .filter((t) => {
        const tt = new Date(t.time).getTime();
        if (fromTime !== null && tt < fromTime) return false;
        if (toTime !== null && tt > toTime) return false;
        return true;
      })
      .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
  }, [q, txType, from, to, selectedProject]);

  const summaryTotals = useMemo(() => {
    let inTotal = 0; let outTotal = 0;
    let start = new Date(); let end = new Date();
    start.setHours(0, 0, 0, 0); end.setHours(23, 59, 59, 999);
    if (summaryRange === "WEEK") {
      const day = start.getDay() || 7;
      if (day !== 1) start.setDate(start.getDate() - day + 1);
      end = new Date(start); end.setDate(end.getDate() + 6);
    } else if (summaryRange === "MONTH") {
      start.setDate(1); end = new Date(start.getFullYear(), start.getMonth() + 1, 0);
    } else { start.setMonth(0, 1); end.setMonth(11, 31); }
    const startTime = start.getTime(); const endTime = end.getTime();
    (data.transactions || []).forEach((t) => {
      const tTime = new Date(t.time).getTime();
      if (tTime >= startTime && tTime <= endTime) {
        if (t.type === "IN") inTotal += t.amount;
        if (t.type === "OUT") outTotal += t.amount;
      }
    });
    const label = summaryRange === "WEEK" ? "Tuần này" : summaryRange === "MONTH" ? "Tháng này" : "Năm nay";
    return { inTotal, outTotal, label };
  }, [summaryRange]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paged = useMemo(() => {
    const safePage = Math.min(page, totalPages);
    const start = (safePage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page, totalPages]);

  function applyFilters() { setPage(1); }
  function exportCSV() {
    const csv = toCSV(filtered);
    const projectName = selectedProject === "ALL" ? "tat-ca" : projects.find(p => p.id === selectedProject)?.title.replace(/\s+/g, "-") || "unk";
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `sao-ke-${projectName}-${data.month.replace("/", "-")}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }
  function printStatement() { window.print(); }
  const getRangeLabel = () => { return summaryRange === "WEEK" ? "Tuần này" : summaryRange === "MONTH" ? "Tháng này" : "Năm nay"; };

  // --- SCROLL LOGIC ---
  const handleTableScroll = () => {
    if (tableContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = tableContainerRef.current;
      const maxScroll = scrollWidth - clientWidth;
      if (maxScroll > 0) {
        setScrollPercentage((scrollLeft / maxScroll) * 100);
        setShowFloatingScroll(true);
      } else {
        setShowFloatingScroll(false);
      }
    }
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = Number(e.target.value);
    setScrollPercentage(newVal);
    if (tableContainerRef.current) {
      const { scrollWidth, clientWidth } = tableContainerRef.current;
      const maxScroll = scrollWidth - clientWidth;
      tableContainerRef.current.scrollLeft = (newVal / 100) * maxScroll;
    }
  };

  useEffect(() => {
    handleTableScroll();
    window.addEventListener('resize', handleTableScroll);
    return () => window.removeEventListener('resize', handleTableScroll);
  }, [paged]);

  return (
    // Đã bỏ pb-20 vì không còn thanh cố định ở dưới
    <main className="min-h-screen bg-gradient-to-b from-[#1a522e]/5 via-white to-gray-50">
      
      {/* CSS Slider */}
      <style jsx global>{`
        input[type=range] {
          -webkit-appearance: none; 
          background: transparent; 
        }
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 24px;
          width: 40px;
          border-radius: 20px;
          background: #1a522e;
          cursor: pointer;
          margin-top: -8px; 
          box-shadow: 0 2px 6px rgba(0,0,0,0.3);
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m9 18 6-6-6-6'/%3E%3Cpath d='m15 18 6-6-6-6'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: center;
          background-size: 16px;
        }
        input[type=range]::-webkit-slider-runnable-track {
          width: 100%;
          height: 8px;
          cursor: pointer;
          background: #e2e8f0;
          border-radius: 4px;
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#1a522e] via-[#134429] to-[#0f3820] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-6 mb-10">
            <Link href="/" className="inline-flex items-center gap-3 rounded-full bg-white/10 px-6 py-3 text-white font-medium hover:bg-white/20 transition backdrop-blur-sm">
              <ArrowLeft className="w-5 h-5" /> Quay lại Trang chủ
            </Link>
            <div className="flex flex-wrap gap-4">
              <button onClick={exportCSV} className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-[#1a522e] font-bold hover:bg-gray-100 transition shadow-xl">
                <Download className="w-5 h-5" /> Xuất Excel (.csv)
              </button>
              <button onClick={printStatement} className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-8 py-4 text-white font-bold hover:bg-white/20 transition backdrop-blur-sm">
                <Printer className="w-5 h-5" /> In sao kê
              </button>
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-2xl">
            Báo cáo tài chính & Sao kê minh bạch
          </h1>
          <p className="text-xl text-white/90 max-w-4xl leading-relaxed">
            Toàn bộ giao dịch được công khai trực tuyến, cập nhật tự động từ ngân hàng. Bạn có thể xem tổng quan hoặc chi tiết theo từng dự án.
          </p>
          
          {/* Summary Cards */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
            <h3 className="text-2xl font-bold text-white">Tổng quan tài chính</h3>
            <div className="flex bg-white/10 p-1 rounded-xl backdrop-blur-sm border border-white/20">
              <button onClick={() => setSummaryRange("WEEK")} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${summaryRange === "WEEK" ? "bg-white text-[#1a522e] shadow-lg" : "text-white/70 hover:text-white"}`}>Tuần</button>
              <button onClick={() => setSummaryRange("MONTH")} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${summaryRange === "MONTH" ? "bg-white text-[#1a522e] shadow-lg" : "text-white/70 hover:text-white"}`}>Tháng</button>
              <button onClick={() => setSummaryRange("YEAR")} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${summaryRange === "YEAR" ? "bg-white text-[#1a522e] shadow-lg" : "text-white/70 hover:text-white"}`}>Năm</button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="rounded-3xl bg-white/10 backdrop-blur-md p-8 shadow-2xl border border-white/20">
              <div className="flex items-center justify-between mb-2">
                <p className="text-white/80 uppercase text-sm font-bold tracking-wider">Số dư hiện tại</p>
                <Wallet className="w-6 h-6 text-white/50" />
              </div>
              <p className="mt-4 text-2xl md:text-3xl font-extrabold text-white break-words">{formatVND(data.currentBalance)}</p>
            </div>
            <div className="rounded-3xl bg-white/10 backdrop-blur-md p-8 shadow-2xl border border-white/20">
              <div className="flex items-center justify-between mb-2">
                <p className="text-white/80 uppercase text-sm font-bold tracking-wider">Tài khoản thụ hưởng</p>
                <Landmark className="w-6 h-6 text-white/50" />
              </div>
              <p className="mt-4 text-xl md:text-2xl font-bold text-white break-words">{data.bankName}</p>
              <p className="text-white/80">{data.accountName}</p>
            </div>
            <div className="rounded-3xl bg-white/10 backdrop-blur-md p-8 shadow-2xl border border-white/20">
              <div className="flex items-center justify-between mb-2">
                <p className="text-white/80 uppercase text-sm font-bold tracking-wider">Tổng thu {getRangeLabel()}</p>
                <TrendingUp className="w-6 h-6 text-green-300" />
              </div>
              <p className="mt-4 text-2xl md:text-3xl font-extrabold text-green-300 break-words">+{formatVND(summaryTotals.inTotal)}</p>
            </div>
            <div className="rounded-3xl bg-white/10 backdrop-blur-md p-8 shadow-2xl border border-white/20">
              <div className="flex items-center justify-between mb-2">
                <p className="text-white/80 uppercase text-sm font-bold tracking-wider">Tổng chi {getRangeLabel()}</p>
                <TrendingDown className="w-6 h-6 text-red-300" />
              </div>
              <p className="mt-4 text-2xl md:text-3xl font-extrabold text-red-300 break-words">-{formatVND(summaryTotals.outTotal)}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-white shadow-2xl overflow-hidden border border-gray-100">
          
          {/* Filters Area */}
          <div className="p-8 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                  <FolderOpen className="w-4 h-4" /> Xem theo dự án
                </label>
                <select value={selectedProject} onChange={(e) => setSelectedProject(e.target.value === "ALL" ? "ALL" : Number(e.target.value))} className="w-full h-12 rounded-xl border-2 border-gray-300 bg-white px-5 text-base font-medium focus:border-[#1a522e] focus:ring-4 focus:ring-[#1a522e]/20 transition">
                  <option value="ALL">Tất cả dự án</option>
                  {projects.map((proj) => (
                    <option key={proj.id} value={proj.id}>{proj.title} ({proj.province})</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2"><Filter className="w-4 h-4" /> Loại giao dịch</label>
                <select value={txType} onChange={(e) => setTxType(e.target.value as any)} className="w-full h-12 rounded-xl border-2 border-gray-300 bg-white px-5 text-base focus:border-[#1a522e] focus:ring-4 focus:ring-[#1a522e]/20 transition">
                  <option value="ALL">Tất cả</option>
                  <option value="IN">Chỉ thu vào</option>
                  <option value="OUT">Chỉ chi ra</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2"><Search className="w-4 h-4" /> Tìm kiếm</label>
                <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Mã GD, nội dung..." className="w-full h-12 rounded-xl border-2 border-gray-300 bg-white px-5 text-base focus:border-[#1a522e] focus:ring-4 focus:ring-[#1a522e]/20 transition" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2"><Calendar className="w-4 h-4" /> Từ ngày</label>
                <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} className="w-full h-12 rounded-xl border-2 border-gray-300 bg-white px-5 text-base focus:border-[#1a522e] focus:ring-4 focus:ring-[#1a522e]/20 transition" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2"><Calendar className="w-4 h-4" /> Đến ngày</label>
                <input type="date" value={to} onChange={(e) => setTo(e.target.value)} className="w-full h-12 rounded-xl border-2 border-gray-300 bg-white px-5 text-base focus:border-[#1a522e] focus:ring-4 focus:ring-[#1a522e]/20 transition" />
              </div>
              <div className="flex items-end">
                <button onClick={applyFilters} className="w-full h-12 rounded-xl bg-[#1a522e] text-white font-bold hover:bg-[#133f24] transition shadow-lg">Áp dụng bộ lọc</button>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <p className="text-lg font-medium text-gray-700">
                Đang hiển thị <strong className="text-[#1a522e]">{filtered.length}</strong> giao dịch
                {selectedProject !== "ALL" && (
                  <span className="ml-2 text-[#1a522e]">cho dự án <strong>{projects.find(p => p.id === selectedProject)?.title}</strong></span>
                )}
              </p>
              <span className="inline-flex items-center gap-2 text-sm text-gray-600">
                <span className="h-3 w-3 rounded-full bg-[#1a522e]" /> View-only • Minh bạch tuyệt đối
              </span>
            </div>
          </div>

          {/* Table Container */}
          <div 
            ref={tableContainerRef}
            onScroll={handleTableScroll}
            className="overflow-x-auto w-full"
          >
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr>
                  <th className="px-6 py-5 text-sm font-bold text-gray-700 whitespace-nowrap sticky left-0 bg-gray-50 z-10">Thời gian</th>
                  <th className="px-6 py-5 text-sm font-bold text-gray-700 whitespace-nowrap">Mã giao dịch</th>
                  <th className="px-6 py-5 text-sm font-bold text-gray-700 min-w-[350px]">Nội dung</th>
                  <th className="px-6 py-5 text-sm font-bold text-gray-700 text-right whitespace-nowrap">Số tiền</th>
                  <th className="px-6 py-5 text-sm font-bold text-gray-700 text-right whitespace-nowrap">Số dư</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paged.map((t) => {
                  const isIn = t.type === "IN";
                  return (
                    <tr key={t.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-5 text-sm text-gray-600 whitespace-nowrap sticky left-0 bg-white z-10">{formatTime(t.time)}</td>
                      <td className="px-6 py-5 text-sm font-medium text-gray-900 whitespace-nowrap">{t.id}</td>
                      <td className="px-6 py-5 text-sm text-gray-800 min-w-[350px]"><div className="line-clamp-2 md:line-clamp-none">{t.detail}</div></td>
                      <td className={`px-6 py-5 text-sm font-bold text-right whitespace-nowrap ${isIn ? "text-[#1a522e]" : "text-red-600"}`}>{isIn ? "+" : "-"} {formatVND(t.amount)}</td>
                      <td className="px-6 py-5 text-sm text-gray-600 text-right whitespace-nowrap">{formatVND(t.balanceAfter)}</td>
                    </tr>
                  );
                })}
                {paged.length === 0 && (
                  <tr><td colSpan={5} className="px-6 py-20 text-center text-gray-500 text-lg">Không tìm thấy giao dịch nào phù hợp với bộ lọc hiện tại.</td></tr>
                )}
              </tbody>
            </table>
          </div>

          {/* --- THANH CUỘN (SLIDER) - NẰM NGAY DƯỚI BẢNG --- */}
          {/* Chỉ hiển thị trên thiết bị nhỏ (lg:hidden) và khi bảng cần cuộn */}
          {showFloatingScroll && (
            <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 lg:hidden">
               <div className="flex items-center gap-3">
                <MoveHorizontal className="w-5 h-5 text-[#1a522e] animate-pulse" />
                <div className="flex-1">
                   <input
                    type="range"
                    min="0"
                    max="100"
                    value={scrollPercentage}
                    onChange={handleSliderChange}
                    className="w-full h-8 appearance-none bg-transparent focus:outline-none"
                  />
                </div>
                <span className="text-xs font-bold text-gray-500 w-8 text-right">{Math.round(scrollPercentage)}%</span>
              </div>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="border-t border-gray-200 px-6 py-6 flex items-center justify-between bg-white">
              <p className="text-sm text-gray-600">Trang <strong>{page}</strong> / <strong>{totalPages}</strong></p>
              <div className="flex gap-3">
                <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="px-5 py-3 rounded-xl border border-gray-300 hover:bg-gray-100 disabled:opacity-50 transition font-medium">Trước</button>
                <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="px-5 py-3 rounded-xl border border-gray-300 hover:bg-gray-100 disabled:opacity-50 transition font-medium">Sau</button>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}