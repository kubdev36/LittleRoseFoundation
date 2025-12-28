'use client';

import Image from 'next/image';

const partners = [
  
  { name: 'VietHuong', logo: '/images/vietthuong.png' },
  { name: 'Truong Hoang Phat', logo: '/images/truong-hoang-phat.png' },
  { name: 'Microsoft', logo: '/images/Microsoft.png' },
  { name: 'Deloitte', logo: '/images/deloitte.png' },
  { name: 'Sacombank', logo: '/images/sacombank.png' },
  { name: 'PWC', logo: '/images/pwc.png' },
  { name: 'SCB', logo: '/images/scb.png' },
  { name: 'Bravo', logo: '/images/bravo.png' },
  
  
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
          <div className="animate-marquee whitespace-nowrap flex items-center gap-16 pr-16 w-max">
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
          <div className="absolute top-0 animate-marquee2 whitespace-nowrap flex items-center gap-16 pr-16 w-max">
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