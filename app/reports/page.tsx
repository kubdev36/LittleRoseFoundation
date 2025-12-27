'use client';

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import statementData from "../data/statement.json";

type TxType = "IN" | "OUT";

type Transaction = {
  id: string;
  time: string;
  detail: string;
  amount: number;
  balanceAfter: number;
  type: TxType;
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
  const ss = String(d.getSeconds()).padStart(2, "0");
  return `${dd}/${mm}/${yyyy}\n${hh}:${mi}:${ss}`;
}

function toCSV(rows: Transaction[]) {
  const header = ["THỜI GIAN", "MÃ GIAO DỊCH", "NỘI DUNG CHI TIẾT", "SỐ TIỀN", "SỐ DƯ"].join(",");
  const body = rows
    .map((r) => {
      const time = formatTime(r.time).replace("\n", " ");
      const amount = (r.type === "IN" ? "+" : "-") + r.amount;
      const detail = `"${r.detail.replaceAll('"', '""')}"`;
      return [time, r.id, detail, amount, r.balanceAfter].join(",");
    })
    .join("\n");
  return `${header}\n${body}`;
}

export default function ReportsPage() {
  const [q, setQ] = useState("");
  const [txType, setTxType] = useState<"ALL" | TxType>("ALL");
  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");
  const [summaryRange, setSummaryRange] = useState<"WEEK" | "MONTH" | "YEAR">("MONTH");

  const pageSize = 10;
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q2 = q.trim().toLowerCase();

    const fromTime = from ? new Date(from + "T00:00:00").getTime() : null;
    const toTime = to ? new Date(to + "T23:59:59").getTime() : null;

    return (data.transactions ?? [])
      .filter((t) => (txType === "ALL" ? true : t.type === txType))
      .filter((t) => {
        if (!q2) return true;
        return t.id.toLowerCase().includes(q2) || t.detail.toLowerCase().includes(q2);
      })
      .filter((t) => {
        const tt = new Date(t.time).getTime();
        if (fromTime !== null && tt < fromTime) return false;
        if (toTime !== null && tt > toTime) return false;
        return true;
      })
      .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
  }, [q, txType, from, to]);

  const summaryTotals = useMemo(() => {
    let start = new Date();
    let end = new Date();
    let label = "";

    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);

    if (summaryRange === "WEEK") {
      const day = start.getDay() || 7;
      if (day !== 1) start.setDate(start.getDate() - day + 1);
      end = new Date(start);
      end.setDate(end.getDate() + 6);
      end.setHours(23, 59, 59, 999);
      label = "Tuần này";
    } else if (summaryRange === "MONTH") {
      start.setDate(1);
      end = new Date(start);
      end.setMonth(end.getMonth() + 1);
      end.setDate(0);
      end.setHours(23, 59, 59, 999);
      label = "Tháng này";
    } else {
      start.setMonth(0, 1);
      end.setMonth(11, 31);
      end.setHours(23, 59, 59, 999);
      label = "Năm nay";
    }

    let inTotal = 0;
    let outTotal = 0;
    const startTime = start.getTime();
    const endTime = end.getTime();

    (data.transactions || []).forEach((t) => {
      const tTime = new Date(t.time).getTime();
      if (tTime >= startTime && tTime <= endTime) {
        if (t.type === "IN") inTotal += t.amount;
        if (t.type === "OUT") outTotal += t.amount;
      }
    });

    return { inTotal, outTotal, label };
  }, [summaryRange]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));

  const paged = useMemo(() => {
    const safePage = Math.min(page, totalPages);
    const start = (safePage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page, totalPages]);

  function applyFilters() {
    setPage(1);
  }

  function exportCSV() {
    const csv = toCSV(filtered);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `sao-ke-${data.month.replace("/", "-")}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function printStatement() {
    window.print();
  }

  // Hàm lấy label đẹp cho nút lọc
  const getRangeLabel = () => {
    switch (summaryRange) {
      case "WEEK": return "Tuần này";
      case "MONTH": return "Tháng này";
      case "YEAR": return "Năm nay";
      default: return "Tháng này";
    }
  };

  return (
    <main className="bg-white text-black">
      {/* Top hero */}
      <section className="bg-gradient-to-b from-[#0d2a1a] to-[#0b2115]">
        <div className="mx-auto max-w-6xl px-4 pb-10 pt-6 sm:px-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Link
              href="/tac-dong"
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white/90 hover:bg-white/20 transition"
              scroll={false}
            >
              ← Quay lại <span className="text-[#1a522e]">● LIVE VIEW</span>
            </Link>

            <div className="flex items-center gap-3">
              <button
                onClick={exportCSV}
                className="rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-gray-900 hover:bg-gray-100 transition shadow-md"
              >
                Xuất Excel
              </button>
              <button
                onClick={printStatement}
                className="rounded-xl bg-white/10 px-5 py-2.5 text-sm font-bold text-white hover:bg-white/20 transition backdrop-blur-sm"
              >
                In sao kê
              </button>
            </div>
          </div>

          <h1 className="mt-8 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Sao kê tài khoản trực tuyến
          </h1>
          <p className="mt-3 max-w-3xl text-base text-white/75 leading-relaxed">
            Thông tin giao dịch được cập nhật từ hệ thống ngân hàng. Dữ liệu hiển thị ở chế độ xem (View-only) để đảm bảo minh bạch tuyệt đối.
          </p>

          {/* Summary cards */}
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-200">
              <p className="text-xs font-bold text-gray-600 uppercase tracking-wide">Số dư hiện tại</p>
              <p className="mt-3 text-2xl font-extrabold text-[#1a522e]">
                {formatVND(data.currentBalance)}
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-200">
              <p className="text-xs font-bold text-gray-600 uppercase tracking-wide">Ngân hàng thụ hưởng</p>
              <p className="mt-3 text-xl font-extrabold text-gray-900">{data.bankName}</p>
              <p className="mt-1 text-sm text-gray-600">{data.accountName}</p>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-200">
              <p className="text-xs font-bold text-gray-600 uppercase tracking-wide flex items-center justify-between">
                Tổng thu
                {/* Nút chọn khoảng thời gian đẹp hơn */}
                <div className="flex rounded-xl overflow-hidden border border-gray-300 shadow-sm">
                  <button
                    onClick={() => setSummaryRange("WEEK")}
                    className={`px-4 py-2 text-xs font-bold transition ${
                      summaryRange === "WEEK"
                        ? "bg-[#1a522e] text-white"
                        : "bg-white text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    W
                  </button>
                  <button
                    onClick={() => setSummaryRange("MONTH")}
                    className={`px-4 py-2 text-xs font-bold border-x border-gray-300 transition ${
                      summaryRange === "MONTH"
                        ? "bg-[#1a522e] text-white"
                        : "bg-white text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    M
                  </button>
                  <button
                    onClick={() => setSummaryRange("YEAR")}
                    className={`px-4 py-2 text-xs font-bold transition ${
                      summaryRange === "YEAR"
                        ? "bg-[#1a522e] text-white"
                        : "bg-white text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    Y
                  </button>
                </div>
              </p>
              <p className="mt-3 text-2xl font-extrabold text-[#1a522e]">
                +{formatVND(summaryTotals.inTotal)}
              </p>
              <p className="mt-1 text-sm text-gray-600">{getRangeLabel()}</p>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-200">
              <p className="text-xs font-bold text-gray-600 uppercase tracking-wide">Tổng chi</p>
              <p className="mt-3 text-2xl font-extrabold text-red-600">
                -{formatVND(summaryTotals.outTotal)}
              </p>
              <p className="mt-1 text-sm text-gray-600">{getRangeLabel()}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Table card */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-200">
          {/* Filters */}
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-1 flex-col gap-4 sm:flex-row sm:items-center">
              <div className="relative flex-1">
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Tìm kiếm theo nội dung, mã giao dịch..."
                  className="h-12 w-full rounded-xl border border-gray-300 bg-white px-4 text-sm outline-none focus:border-[#1a522e] focus:ring-4 focus:ring-[#1a522e]/20 transition"
                />
              </div>

              <select
                value={txType}
                onChange={(e) => setTxType(e.target.value as any)}
                className="h-12 rounded-xl border border-gray-300 bg-white px-4 text-sm outline-none focus:border-[#1a522e] focus:ring-4 focus:ring-[#1a522e]/20 transition"
              >
                <option value="ALL">Tất cả giao dịch</option>
                <option value="IN">Thu vào</option>
                <option value="OUT">Chi ra</option>
              </select>

              <div className="flex items-center gap-3">
                <input
                  type="date"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  className="h-12 rounded-xl border border-gray-300 bg-white px-4 text-sm outline-none focus:border-[#1a522e] focus:ring-4 focus:ring-[#1a522e]/20 transition"
                />
                <span className="text-gray-400">→</span>
                <input
                  type="date"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  className="h-12 rounded-xl border border-gray-300 bg-white px-4 text-sm outline-none focus:border-[#1a522e] focus:ring-4 focus:ring-[#1a522e]/20 transition"
                />
              </div>

              <button
                onClick={applyFilters}
                className="h-12 rounded-xl bg-[#1a522e] px-6 text-sm font-bold text-white hover:bg-[#133f24] transition shadow-md"
              >
                Áp dụng bộ lọc
              </button>
            </div>

            <div className="text-sm text-gray-600">
              Hiển thị <strong>{paged.length}</strong> / <strong>{filtered.length}</strong> giao dịch
            </div>
          </div>

          {/* Table */}
          <div className="mt-6 overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full min-w-[800px] text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left font-bold text-gray-700">Thời gian</th>
                  <th className="px-4 py-3 text-left font-bold text-gray-700">Mã giao dịch</th>
                  <th className="px-4 py-3 text-left font-bold text-gray-700">Nội dung chi tiết</th>
                  <th className="px-4 py-3 text-right font-bold text-gray-700">Số tiền</th>
                  <th className="px-4 py-3 text-right font-bold text-gray-700">Số dư</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paged.map((t) => {
                  const isIn = t.type === "IN";
                  return (
                    <tr key={t.id} className="hover:bg-gray-50 transition">
                      <td className="px-4 py-4 text-xs text-gray-600 whitespace-pre-line">
                        {formatTime(t.time)}
                      </td>
                      <td className="px-4 py-4 text-sm font-medium text-gray-900">
                        {t.id}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-800">
                        {t.detail}
                      </td>
                      <td className={`px-4 py-4 text-sm font-bold text-right ${isIn ? "text-[#1a522e]" : "text-red-600"}`}>
                        {isIn ? "+" : "-"}
                        {formatVND(t.amount)}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-600 text-right">
                        {formatVND(t.balanceAfter)}
                      </td>
                    </tr>
                  );
                })}

                {paged.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-4 py-12 text-center text-gray-500">
                      Không có giao dịch phù hợp với bộ lọc.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <span className="inline-flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-[#1a522e]" />
                Dữ liệu view-only, công khai minh bạch
              </span>
              <span className="hidden sm:inline text-gray-400">•</span>
              <span className="text-gray-600">* Giao dịch có thể mất 5–10 phút để cập nhật</span>
            </div>

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="h-10 w-10 rounded-xl border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                ←
              </button>
              <span className="text-sm text-gray-700">
                Trang <strong>{page}</strong> / <strong>{totalPages}</strong>
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="h-10 w-10 rounded-xl border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}