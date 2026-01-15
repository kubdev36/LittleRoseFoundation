import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "./components/header";
import Footer from "./components/Footer";

// 1. Cấu hình font Inter (cho văn bản thường - body text)
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// 2. Cấu hình font Playfair Display (cho tiêu đề - headings)
const playfair = Playfair_Display({
  subsets: ["latin", "vietnamese"], // Quan trọng: Thêm vietnamese để không lỗi dấu
  weight: ["400", "700"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Little Roses Foundation",
  description: "To all we are love",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Thêm cả 2 biến font vào body để Tailwind có thể sử dụng.
        font-sans: Sẽ nhận font Inter làm mặc định.
      */}
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}