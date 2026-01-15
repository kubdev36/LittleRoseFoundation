/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // Domain gây lỗi của bạn (Đã thêm vào đây)
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      // Domain cho Avatar (Thường dùng trong code mẫu)
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
      },
      // --- Các domain cũ của bạn ---
      {
        protocol: 'https',
        hostname: 'uxwing.com',
      },
      {
        protocol: 'https',
        hostname: 'static.vecteezy.com',
      },
      {
        protocol: 'https',
        hostname: 'www.shutterstock.com',
      },
      {
        protocol: 'https',
        hostname: 'www.vhv.rs',
      },
      {
        protocol: 'https',
        hostname: 'www.globalhand.org',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
      },
      {
        protocol: 'https',
        hostname: 'inkythuatso.com',
      },
      {
        protocol: 'https',
        hostname: '1000logos.net',
      },
      {
        protocol: 'https',
        hostname: 'www.developmentaid.org',
      },
      {
        protocol: 'https',
        hostname: 'littlerosesfoundation.org',
      },
    ],
  },
};

module.exports = nextConfig;