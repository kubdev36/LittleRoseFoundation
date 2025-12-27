'use client';


export default function StoriesPage() {
  return (
    <div className="mt-10">
      
     

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Tiêu đề chính */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-[#1a522e] mb-6">
            Câu chuyện của chúng tôi
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
           Đi và sẻ chia: Khám phá những dấu chân thiện nguyện đang miệt mài kết nối yêu thương, mang hy vọng đến với những hoàn cảnh ngặt nghèo khắp mọi miền đất nước.
          </p>
        </div>

        {/* Video chính - Embed YouTube */}
        <div className="relative w-full max-w-4xl mx-auto ">
          <div className="aspect-w-16 aspect-h-9  overflow-hidden shadow-2xl">
            <iframe
              src="https://www.youtube.com/embed/iqRpf7jQhY0?"
              title="TỔNG HỢP HÀNH TRÌNH BÁC ÁI | 16.01.2023 | LITTLE ROSES FOUNDATION"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full min-h-96"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}