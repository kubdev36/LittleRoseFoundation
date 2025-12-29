'use client';

import Image from 'next/image';

// Danh sách đối tác
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
  const renderPartnerCard = (partner: any, index: number, prefix: string) => (
    <div
      key={`${prefix}-${index}`}
      // Card
      className="flex-shrink-0 w-[150px] sm:w-[220px] h-[100px] sm:h-[130px] mx-2 sm:mx-4 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center p-4 sm:p-6 transition-all duration-300 hover:shadow-md hover:border-green-500 hover:-translate-y-1 group/card cursor-pointer relative overflow-hidden"
    >
       <div className="absolute inset-0 bg-green-50 opacity-0 group-hover/card:opacity-30 transition-opacity duration-300"></div>

      <div className="relative w-full h-full transition-all duration-300 group-hover/card:scale-105 z-10">
        <Image
          src={partner.logo}
          alt={partner.name}
          fill
          sizes="(max-width: 768px) 180px, 220px"
          className="object-contain"
        />
      </div>
    </div>
  );

  return (
    <section className="py-20 bg-green-50/60 overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight text-center">
          Đơn vị <span className="text-green-700">đồng hành</span>
        </h2>
        <p className="text-center text-gray-500 mt-3 max-w-2xl mx-auto">
          Chúng tôi tự hào được hợp tác với các tổ chức hàng đầu, cùng nhau tạo nên những giá trị bền vững.
        </p>
      </div>

      {/* Slider Container */}
      <div className="relative w-full">
        
        {/* Gradient Fade 2 bên */}
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-32 z-10 bg-gradient-to-r from-green-50 via-green-50/80 to-transparent"></div>
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-32 z-10 bg-gradient-to-l from-green-50 via-green-50/80 to-transparent"></div>

        {/* Track trượt ngang */}
        {/* SỬA LỖI TẠI ĐÂY: Thêm 'py-4' vào thẻ div này để tạo khoảng trống trên dưới cho card nảy lên */}
        <div className="flex w-full overflow-hidden py-4">
          <div className="flex animate-infinite-scroll group hover:[animation-play-state:paused]">
            {partners.map((partner, index) => renderPartnerCard(partner, index, 'original'))}
          </div>
          <div className="flex animate-infinite-scroll group hover:[animation-play-state:paused]" aria-hidden="true">
             {partners.map((partner, index) => renderPartnerCard(partner, index, 'duplicate'))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes infinite-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-100%); }
        }
        .animate-infinite-scroll {
          animation: infinite-scroll 40s linear infinite;
        }
      `}</style>
    </section>
  );
}