'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const TeamPage: React.FC = () => {
  const teamMembers = [
    {
      name: 'Hoàng Nguyễn Thu Thảo',
      position: 'TGĐ Tập đoàn GD Nguyễn Hoàng - Chủ tịch, kiêm Giám đốc Quỹ',
      image: '/images/HoangNguyenThuThao.png', // Giữ nguyên nếu bạn có ảnh local, hoặc thay bằng URL thực tế
    },
    {
      name: 'Đỗ Mạnh Cường',
      position: 'Phó TGĐ Tập đoàn GD Nguyễn Hoàng - Phó Chủ tịch Quỹ',
      image: '/images/DoManhCuong.png',
    },
    {
      name: 'Nguyễn Đức Thạch Diễm',
      position: 'TGĐ Ngân hàng TMCP Sài Gòn Thương Tín (Sacombank) - Phó Chủ tịch Quỹ',
      image: '/images/NguyenDucThanhDiem.png',
    },
    {
      name: 'Hoàng Quốc Anh Vũ',
      position: 'Cổ đông sáng lập - Thành viên Quỹ',
      image: '/images/HoangQuocAnhVu.png',
    },
    {
      name: 'Đặng Thế Đức',
      position: 'TGĐ Công ty Luật Indochine Counsel - Thành viên Quỹ',
      image: '/images/DangTheDuc.png',
    },
  ];

 return (
     <div className="min-h-screen bg-gray-50">
       {/* Main Content */}
       <div className="max-w-7xl mx-auto py-16 px-8">
         <div className="text-center mb-16">
           <h2 className="text-4xl font-bold text-gray-800 mb-6">
             Đội ngũ sáng lập Quỹ từ thiện Bông hồng nhỏ
           </h2>
           <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
             Những con người tâm huyết, giàu kinh nghiệm và tràn đầy tình yêu thương đã cùng nhau đặt nền móng cho hành trình lan tỏa giá trị nhân ái của Quỹ.
           </p>
         </div>
 
         {/* Grid hiển thị tất cả thành viên - Không carousel nữa */}
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
           {teamMembers.map((member, index) => (
             <div
               key={index}
               className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
             >
               {/* Ảnh thành viên */}
               <div className="relative h-96 w-full"> {/* Tăng chiều cao để ảnh lớn hơn */}
                 <Image
                   src={member.image}
                   alt={member.name}
                   fill
                   className="object-cover hover:scale-105 transition-transform duration-500"
                   sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                 />
               </div>
 
               {/* Thông tin bên dưới ảnh */}
               <div className="p-6 text-center flex-1 flex flex-col justify-center bg-gray-50">
                 <h3 className="text-xl font-bold text-gray-800 mb-2">{member.name}</h3>
                 <p className="text-gray-600 text-sm leading-relaxed">{member.position}</p>
               </div>
             </div>
           ))}
         </div>
       </div>
     </div>
   );
 };
 
 export default TeamPage;