'use client';

import Image from 'next/image';

const partners = [
  
  { name: 'Vingroup', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e0/Vingroup_logo_small.svg/1200px-Vingroup_logo_small.svg.png' },
  { name: 'Vietcombank', logo: 'https://inkythuatso.com/uploads/images/2021/09/logo-vietcombank-inkythuatso-10-10-41-18.jpg' },
  { name: 'BIDV', logo: 'https://1000logos.net/wp-content/uploads/2022/09/BIDV-Logo-2009.png' },
  { name: 'Viettel', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Logo_Viettel.svg/250px-Logo_Viettel.svg.png' },
  { name: 'Save the Children Vietnam', logo: 'https://www.developmentaid.org/files/organizationLogos/save-the-children-vietnam-154442.jpg' },
  // Thêm nhiều hơn nếu có (lặp lại để carousel dài)
  
];

export default function PartnersSection() {
  return (
    <section className="py-16 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#1a522e] mb-12">
          Các đối tác & Nhà hảo tâm
        </h2>

        {/* Marquee tự động chạy ngang, vô tận */}
        <div className="relative">
          <div className="animate-marquee whitespace-nowrap flex items-center gap-16">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="flex-shrink-0"
              >
                <Image
                  src={partner.logo}
                  alt={`Logo ${partner.name}`}
                  width={180}
                  height={100}
                  className="object-contain"
                />
              </div>
            ))}
          </div>

          {/* Duplicate cho hiệu ứng vô tận (nếu cần trên màn lớn) */}
          <div className="absolute top-0 animate-marquee2 whitespace-nowrap flex items-center gap-16">
            {partners.map((partner, index) => (
              <div
                key={`dup-${index}`}
                className="flex-shrink-0"
              >
                <Image
                  src={partner.logo}
                  alt={`Logo ${partner.name}`}
                  width={180}
                  height={100}
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        @keyframes marquee2 {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(0%);
          }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee2 {
          animation: marquee2 30s linear infinite;
        }
      `}</style>
    </section>
  );
}