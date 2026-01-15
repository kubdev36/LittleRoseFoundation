"use client";

import React, { useState } from "react";
import { MessageSquare, ThumbsUp, CornerDownRight, Star, Lock, Send } from "lucide-react";
// Đã xóa import framer-motion thừa để tránh lỗi build ESLint

// --- TYPES ---
interface Comment {
  id: number;
  user: string;
  avatar?: string;
  role?: string;
  roleColor?: string;
  roleTextColor?: string;
  content: string;
  time: string;
  likes: number;
  isLiked: boolean;
  replies?: Comment[];
  isSpecial?: boolean;
}

// --- DỮ LIỆU GIẢ LẬP BAN ĐẦU ---
const INITIAL_COMMENTS: Comment[] = [
  {
    id: 1,
    user: "Trần Thị Mỹ Linh",
    avatar: "https://i.pravatar.cc/150?u=Linh",
    role: "NHÀ HẢO TÂM VÀNG",
    roleColor: "bg-yellow-100",
    roleTextColor: "text-yellow-700",
    content: "Nhìn các em nhỏ nhận xe đạp mà ấm lòng quá. Mong rằng món quà nhỏ này sẽ giúp đường đến trường của các em bớt chông gai. Cảm ơn Quỹ đã làm cầu nối.",
    time: "2 giờ trước",
    likes: 128,
    isLiked: true,
    isSpecial: true,
  },
  {
    id: 2,
    user: "Nguyễn Văn Tuấn",
    avatar: "https://i.pravatar.cc/150?u=Tuan",
    role: "NHÀ HẢO TÂM BẠC",
    roleColor: "bg-gray-100",
    roleTextColor: "text-gray-600",
    content: "Chương trình rất thiết thực. Mình vừa chuyển khoản ủng hộ thêm 500k, hy vọng sớm đủ kinh phí cho đợt trao xe đạp tiếp theo.",
    time: "2 giờ trước",
    likes: 12,
    isLiked: false,
  },
  {
    id: 3,
    user: "Lê Thu Hằng",
    avatar: "https://i.pravatar.cc/150?u=Hang",
    role: "ĐẠI SỨ HOA HỒNG",
    roleColor: "bg-emerald-100",
    roleTextColor: "text-emerald-700",
    content: "Tuyệt vời quá! Minh sẽ chia sẻ dự án này đến hội phụ huynh của lớp con mình. Cùng chung tay vì các em nhỏ.",
    time: "1 ngày trước",
    likes: 45,
    isLiked: false,
    replies: [
      {
        id: 31,
        user: "Quỹ Hoa Hồng Nhỏ",
        role: "ADMIN",
        roleColor: "bg-emerald-500",
        roleTextColor: "text-white",
        content: "Cảm ơn chị Hằng rất nhiều vì sự lan tỏa yêu thương này ạ! ❤️",
        time: "Vừa xong",
        likes: 5,
        isLiked: false,
      }
    ]
  }
];

export default function CommentsSection() {
  const [comments, setComments] = useState<Comment[]>(INITIAL_COMMENTS);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- XỬ LÝ: THÊM BÌNH LUẬN ---
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsSubmitting(true);

    // Giả lập delay gửi server
    setTimeout(() => {
      const newCommentObj: Comment = {
        id: Date.now(),
        user: "Bạn (Mới đóng góp)",
        avatar: "",
        role: "NHÀ HẢO TÂM MỚI",
        roleColor: "bg-emerald-50",
        roleTextColor: "text-emerald-600",
        content: newComment,
        time: "Vừa xong",
        likes: 0,
        isLiked: false,
      };

      const specialComment = comments.find(c => c.isSpecial);
      const otherComments = comments.filter(c => !c.isSpecial);
      
      setComments(specialComment ? [specialComment, newCommentObj, ...otherComments] : [newCommentObj, ...comments]);
      
      setNewComment("");
      setIsSubmitting(false);
    }, 800);
  };

  // --- XỬ LÝ: LIKE ---
  const handleLike = (id: number, isReply = false, parentId?: number) => {
    setComments(prev => prev.map(comment => {
      if (comment.id === id && !isReply) {
        return {
          ...comment,
          likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
          isLiked: !comment.isLiked
        };
      }
      
      if (parentId && comment.id === parentId && comment.replies) {
        return {
          ...comment,
          replies: comment.replies.map(reply => {
            if (reply.id === id) {
              return {
                ...reply,
                likes: reply.isLiked ? reply.likes - 1 : reply.likes + 1,
                isLiked: !reply.isLiked
              };
            }
            return reply;
          })
        };
      }
      
      return comment;
    }));
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8 mt-8">
      
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <MessageSquare className="text-emerald-600 fill-current" />
          Bình luận & Thảo luận
        </h2>
        <span className="text-sm font-medium text-gray-400">32 bình luận</span>
      </div>

      {/* --- TOP BÌNH LUẬN Ý NGHĨA (HIGHLIGHT) --- */}
      {comments.filter(c => c.isSpecial).map(comment => (
        <div key={comment.id} className="bg-[#FFF9E6] rounded-2xl p-6 mb-8 border border-yellow-100 relative">
          <div className="flex items-center gap-2 mb-3">
            <Star size={16} className="text-yellow-500 fill-yellow-500" />
            <span className="text-xs font-bold text-yellow-600 uppercase tracking-wider">Top Bình luận ý nghĩa</span>
          </div>
          
          <div className="absolute top-4 right-6 text-yellow-200 opacity-50">
            <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21L14.017 18C14.017 16.896 14.789 15.93 15.795 15.656C16.791 15.385 17.5 14.453 17.5 13.5C17.5 12.672 16.828 12 16 12H14V4H22V12C22 16.971 17.971 21 14.017 21ZM5 21L5 18C5 16.896 5.772 15.93 6.777 15.656C7.773 15.385 8.482 14.453 8.482 13.5C8.482 12.672 7.81 12 6.982 12H5V4H13V12C13 16.971 8.971 21 5 21Z" /></svg>
          </div>

          <p className="text-gray-800 text-lg font-serif italic mb-4 leading-relaxed relative z-10">
            "{comment.content}"
          </p>

          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={comment.avatar} alt={comment.user} className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm" />
            <div>
              <p className="text-sm font-bold text-gray-900">{comment.user}</p>
              <p className="text-[10px] font-bold text-yellow-600 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-500"></span> {comment.role}
              </p>
            </div>
          </div>
        </div>
      ))}

      {/* --- INPUT FORM --- */}
      <div className="flex gap-4 mb-10">
        <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-sm shrink-0">
          A
        </div>
        <div className="flex-1">
          <form onSubmit={handleSubmit} className="relative">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Chia sẻ cảm nghĩ của bạn về dự án này..."
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all min-h-[100px] resize-none"
            />
            
            <div className="flex justify-between items-center mt-2">
               <p className="text-[11px] text-gray-400 flex items-center gap-1.5">
                 <Lock size={12} /> Chỉ nhà hảo tâm đã đóng góp mới được bình luận
               </p>
               <button 
                 type="submit" 
                 disabled={!newComment.trim() || isSubmitting}
                 className="bg-emerald-500 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-emerald-600 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
               >
                 {isSubmitting ? "Đang gửi..." : <>Gửi bình luận <Send size={12} /></>}
               </button>
            </div>
          </form>
        </div>
      </div>

      {/* --- COMMENT LIST --- */}
      <div className="space-y-6">
        {comments.filter(c => !c.isSpecial).map((comment) => (
          <div key={comment.id} className="group">
            <CommentItem 
              comment={comment} 
              onLike={() => handleLike(comment.id)} 
            />

            {comment.replies && comment.replies.length > 0 && (
              <div className="ml-12 mt-4 space-y-4 border-l-2 border-gray-100 pl-4">
                {comment.replies.map(reply => (
                  <CommentItem 
                    key={reply.id} 
                    comment={reply} 
                    isReply 
                    onLike={() => handleLike(reply.id, true, comment.id)} 
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <button className="w-full text-center text-xs text-gray-400 hover:text-emerald-600 mt-8 transition-colors font-medium flex items-center justify-center gap-1">
        Xem thêm bình luận cũ hơn <CornerDownRight size={12} />
      </button>

    </div>
  );
}

// --- SUB COMPONENT ---
function CommentItem({ comment, isReply = false, onLike }: { comment: Comment, isReply?: boolean, onLike: () => void }) {
  return (
    <div className="flex gap-3">
      <div className="shrink-0">
        {comment.role === "ADMIN" ? (
           <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 border border-emerald-200 relative">
             {/* eslint-disable-next-line @next/next/no-img-element */}
             <img src="/logo-icon.png" alt="Admin" className="w-6 h-6 object-contain" onError={(e) => e.currentTarget.style.display = 'none'} />
             <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-[8px] border-2 border-white">Q</div>
           </div>
        ) : (
           // eslint-disable-next-line @next/next/no-img-element
           <img 
             src={comment.avatar || "https://i.pravatar.cc/150"} 
             alt={comment.user} 
             className="w-10 h-10 rounded-full object-cover border border-gray-100" 
           />
        )}
      </div>

      <div className={`flex-1 ${isReply ? 'bg-gray-50/80 p-4 rounded-2xl' : ''}`}>
        <div className="flex items-center gap-2 mb-1">
          <h4 className="text-sm font-bold text-gray-900">{comment.user}</h4>
          {comment.role && (
            <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${comment.roleColor} ${comment.roleTextColor}`}>
              {comment.role}
            </span>
          )}
          <span className="text-[10px] text-gray-400 ml-auto">{comment.time}</span>
        </div>

        <p className="text-sm text-gray-600 leading-relaxed mb-3">
          {comment.content}
        </p>

        <div className="flex items-center gap-4">
          <button 
            onClick={onLike}
            className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${comment.isLiked ? 'text-emerald-600' : 'text-gray-400 hover:text-emerald-600'}`}
          >
            <ThumbsUp size={14} className={comment.isLiked ? "fill-current" : ""} /> 
            Thích {comment.likes > 0 && `(${comment.likes})`}
          </button>
          
          <button className="text-xs font-medium text-gray-400 hover:text-emerald-600 transition-colors">
            Trả lời
          </button>
        </div>
      </div>
    </div>
  );
}