"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import statementData from "../data/statement.json";

type TxType = "IN" | "OUT";

type Transaction = {
    id: string;
    time: string; // ISO
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
    return n.toLocaleString("vi-VN") + "đ";
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
            // escape quotes
            const detail = `"${r.detail.replaceAll('"', '""')}"`;
            return [time, r.id, detail, amount, r.balanceAfter].join(",");
        })
        .join("\n");
    return `${header}\n${body}`;
}

export default function ReportsPage() {
    // filters
    const [q, setQ] = useState("");
    const [txType, setTxType] = useState<"ALL" | TxType>("ALL");
    const [from, setFrom] = useState<string>("");
    const [to, setTo] = useState<string>("");

    // pagination
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
                return (
                    t.id.toLowerCase().includes(q2) ||
                    t.detail.toLowerCase().includes(q2)
                );
            })
            .filter((t) => {
                const tt = new Date(t.time).getTime();
                if (fromTime !== null && tt < fromTime) return false;
                if (toTime !== null && tt > toTime) return false;
                return true;
            })
            .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
    }, [q, txType, from, to]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));

    const paged = useMemo(() => {
        const safePage = Math.min(page, totalPages);
        const start = (safePage - 1) * pageSize;
        return filtered.slice(start, start + pageSize);
    }, [filtered, page, totalPages]);

    // whenever filters change -> reset page
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

    return (
        <main className="bg-white text-black">
            {/* Top hero */}
            <section className="bg-gradient-to-b from-[#0d2a1a] to-[#0b2115]">
                <div className="mx-auto max-w-6xl px-4 pb-10 pt-6 sm:px-6">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <Link
                            href="/impact"
                            className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/90 hover:bg-white/15"
                        >
                            ← Quay lại <span className="text-[#00BF4D]">● LIVE VIEW</span>
                        </Link>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={exportCSV}
                                className="rounded-md bg-white/90 px-3 py-2 text-xs font-bold text-black hover:bg-white"
                            >
                                Xuất Excel
                            </button>
                            <button
                                onClick={printStatement}
                                className="rounded-md bg-white/10 px-3 py-2 text-xs font-bold text-white hover:bg-white/15"
                            >
                                In sao kê
                            </button>
                        </div>
                    </div>

                    <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                        Sao kê tài khoản trực tuyến
                    </h1>
                    <p className="mt-2 max-w-2xl text-sm text-white/75">
                        Thông tin giao dịch được cập nhật từ hệ thống ngân hàng. Dữ liệu hiển thị ở chế độ xem (View-only) để đảm bảo minh bạch.
                    </p>

                    {/* Summary cards */}
                    <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5">
                            <p className="text-[11px] font-bold text-black/60">SỐ DƯ HIỆN TẠI</p>
                            <p className="mt-2 text-xl font-extrabold text-[#00BF4D]">
                                {formatVND(data.currentBalance)}
                            </p>
                        </div>

                        <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5">
                            <p className="text-[11px] font-bold text-black/60">NGÂN HÀNG THỤ HƯỞNG</p>
                            <p className="mt-2 text-xl font-extrabold">{data.bankName}</p>
                            <p className="mt-1 text-xs text-black/60">{data.accountName}</p>
                        </div>

                        <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5">
                            <p className="text-[11px] font-bold text-black/60">TỔNG THU (Tháng {data.month})</p>
                            <p className="mt-2 text-xl font-extrabold text-[#00BF4D]">
                                +{formatVND(data.monthIn)}
                            </p>
                        </div>

                        <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5">
                            <p className="text-[11px] font-bold text-black/60">TỔNG CHI (Tháng {data.month})</p>
                            <p className="mt-2 text-xl font-extrabold text-red-600">
                                -{formatVND(data.monthOut)}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Table card */}
            <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
                <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 sm:p-5">
                    {/* Filters */}
                    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
                            <div className="relative flex-1">
                                <input
                                    value={q}
                                    onChange={(e) => setQ(e.target.value)}
                                    placeholder="Tìm kiếm theo nội dung, mã giao dịch..."
                                    className="h-10 w-full rounded-xl border border-black/10 bg-white px-3 text-sm outline-none focus:border-[#00BF4D] focus:ring-2 focus:ring-[#00BF4D]/20"
                                />
                            </div>

                            <select
                                value={txType}
                                onChange={(e) => setTxType(e.target.value as any)}
                                className="h-10 rounded-xl border border-black/10 bg-white px-3 text-sm outline-none focus:border-[#00BF4D] focus:ring-2 focus:ring-[#00BF4D]/20"
                            >
                                <option value="ALL">Tất cả giao dịch</option>
                                <option value="IN">Thu vào</option>
                                <option value="OUT">Chi ra</option>
                            </select>

                            <div className="flex items-center gap-2">
                                <input
                                    type="date"
                                    value={from}
                                    onChange={(e) => setFrom(e.target.value)}
                                    className="h-10 rounded-xl border border-black/10 bg-white px-3 text-sm outline-none focus:border-[#00BF4D] focus:ring-2 focus:ring-[#00BF4D]/20"
                                />
                                <span className="text-sm text-black/40">-</span>
                                <input
                                    type="date"
                                    value={to}
                                    onChange={(e) => setTo(e.target.value)}
                                    className="h-10 rounded-xl border border-black/10 bg-white px-3 text-sm outline-none focus:border-[#00BF4D] focus:ring-2 focus:ring-[#00BF4D]/20"
                                />
                            </div>

                            <button
                                onClick={applyFilters}
                                className="h-10 rounded-xl bg-[#00BF4D] px-4 text-sm font-extrabold text-white hover:bg-[#00A640]"
                            >
                                Áp dụng bộ lọc
                            </button>
                        </div>

                        <div className="text-xs text-black/60">
                            Hiển thị <b>{paged.length}</b> / <b>{filtered.length}</b> giao dịch
                        </div>
                    </div>

                    {/* Table */}
                    <div className="mt-4 overflow-hidden rounded-xl border border-black/10">
                        <div className="grid grid-cols-12 bg-black/[0.03] px-3 py-3 text-[11px] font-extrabold text-black/70">
                            <div className="col-span-2">THỜI GIAN</div>
                            <div className="col-span-2">MÃ GIAO DỊCH</div>
                            <div className="col-span-5">NỘI DUNG CHI TIẾT</div>
                            <div className="col-span-2 text-right">SỐ TIỀN</div>
                            <div className="col-span-1 text-right">SỐ DƯ</div>
                        </div>

                        <div className="divide-y divide-black/10">
                            {paged.map((t) => {
                                const isIn = t.type === "IN";
                                return (
                                    <div
                                        key={t.id}
                                        className="grid grid-cols-12 px-3 py-3 text-sm"
                                    >
                                        <div className="col-span-2 whitespace-pre-line text-[12px] text-black/70">
                                            {formatTime(t.time)}
                                        </div>
                                        <div className="col-span-2 text-[12px] font-semibold text-black/80">
                                            {t.id}
                                        </div>
                                        <div className="col-span-5 text-[13px] text-black/80">
                                            {t.detail}
                                        </div>
                                        <div
                                            className={[
                                                "col-span-2 text-right text-[13px] font-extrabold",
                                                isIn ? "text-[#00BF4D]" : "text-red-600",
                                            ].join(" ")}
                                        >
                                            {isIn ? "+" : "-"}
                                            {formatVND(t.amount)}
                                        </div>
                                        <div className="col-span-1 text-right text-[12px] text-black/60">
                                            {formatVND(t.balanceAfter)}
                                        </div>
                                    </div>
                                );
                            })}

                            {paged.length === 0 && (
                                <div className="px-3 py-10 text-center text-sm text-black/60">
                                    Không có giao dịch phù hợp bộ lọc.
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Footer + pagination */}
                    <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-2 text-xs text-black/60">
                            <span className="inline-flex items-center gap-2">
                                <span className="h-2 w-2 rounded-full bg-[#00BF4D]" />
                                Dữ liệu view-only, công khai minh bạch
                            </span>
                            <span className="text-black/30">•</span>
                            <span>* Lưu ý: giao dịch có thể mất 5–10 phút để cập nhật.</span>
                        </div>

                        <div className="flex items-center justify-end gap-2">
                            <button
                                onClick={() => setPage((p) => Math.max(1, p - 1))}
                                className="h-8 rounded-lg border border-black/10 px-3 text-xs font-bold hover:bg-black/[0.03]"
                            >
                                ←
                            </button>
                            <span className="text-xs text-black/60">
                                Trang <b>{Math.min(page, totalPages)}</b> / <b>{totalPages}</b>
                            </span>
                            <button
                                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                                className="h-8 rounded-lg border border-black/10 px-3 text-xs font-bold hover:bg-black/[0.03]"
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

