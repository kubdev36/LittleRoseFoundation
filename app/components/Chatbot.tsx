'use client';

import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { MessageCircle, X, Bot, User } from 'lucide-react';

interface Message {
  sender: 'bot' | 'user';
  text: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'bot', text: 'Xin chào! Tôi là trợ lý ảo của Quỹ Bông Hồng Nhỏ (Little Roses Foundation). Tôi có thể giúp bạn trả lời các câu hỏi về hoạt động, quyên góp, dự án, minh bạch tài chính và nhiều thông tin khác. Bạn cần hỗ trợ gì hôm nay?' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Danh sách FAQ mở rộng - thêm nhiều từ khóa để tăng độ chính xác
  const faqResponses: Record<string, string> = {
    // Chào hỏi
    'xin chào|chào|hi|hello|hey': 'Xin chào! Rất vui được hỗ trợ bạn. Bạn đang quan tâm đến vấn đề gì về quỹ từ thiện ạ?',

    // Quyên góp
    'quyên góp|đóng góp|donate|ủng hộ|chuyển khoản|tài khoản': 'Bạn có thể quyên góp bằng các cách sau:\n\n' +
      '• Chuyển khoản ngân hàng:\n   - Tên tài khoản: Quỹ Bông Hồng Nhỏ\n   - Số tài khoản: 123456789 (Vui lòng cập nhật số thực tế)\n   - Ngân hàng: Vietcombank\n\n' +
      '• Quyên góp trực tuyến: https://littlerosesfoundation.org/donate\n' +
      '• Ví điện tử: Momo, ZaloPay\n\nMọi khoản đóng góp đều được cấp biên lai khấu trừ thuế (nếu cần).',

    'quyên góp được khấu trừ thuế|tặng thuế|biên lai': 'Có ạ! Quỹ Bông Hồng Nhỏ là tổ chức phi lợi nhuận được cấp phép, nên mọi khoản quyên góp đều được khấu trừ thuế thu nhập cá nhân/doanh nghiệp theo quy định pháp luật. Chúng tôi sẽ gửi biên lai điện tử hoặc bản cứng theo yêu cầu.',

    'quyên góp tối thiểu|ít nhất bao nhiêu': 'Không có mức quyên góp tối thiểu. Dù chỉ 10.000đ cũng rất quý giá và sẽ được sử dụng đúng mục đích. Mọi đóng góp đều có ý nghĩa lớn! ❤️',

    // Dự án & hoạt động
    'dự án|chương trình|hoạt động|đang làm gì': 'Hiện tại quỹ đang triển khai các dự án chính:\n\n' +
      '• Xây dựng trường học cho trẻ em vùng cao\n' +
      '• Hỗ trợ trẻ em mồ côi, khuyết tật\n' +
      '• Cứu trợ khẩn cấp thiên tai (lũ lụt, bão)\n' +
      '• Học bổng cho học sinh nghèo vượt khó\n' +
      '• Hỗ trợ y tế cho bệnh nhân nghèo\n\nChi tiết từng dự án: https://littlerosesfoundation.org/projects',

    'trẻ em|trẻ mồ côi|học bổng': 'Chúng tôi đang bảo trợ dài hạn cho hơn 500 trẻ em mồ côi và có hoàn cảnh đặc biệt khó khăn. Ngoài hỗ trợ học phí, quỹ còn cung cấp sách vở, quần áo, bữa ăn và khám sức khỏe định kỳ.',

    'thiên tai|cứu trợ|lũ lụt|bão': 'Khi có thiên tai xảy ra, quỹ sẽ kích hoạt chương trình cứu trợ khẩn cấp: cung cấp lương thực, nước sạch, chăn màn, thuốc men. Bạn có thể theo dõi các đợt cứu trợ mới nhất trên fanpage hoặc website.',

    // Minh bạch & báo cáo
    'minh bạch|báo cáo|kiểm toán|tài chính': 'Quỹ cam kết minh bạch 100%. Mọi khoản thu chi đều được:\n' +
      '• Công khai hàng quý trên website\n' +
      '• Kiểm toán độc lập bởi công ty kiểm toán uy tín\n' +
      '• Báo cáo chi tiết cho nhà tài trợ lớn\n\nXem báo cáo mới nhất: https://littlerosesfoundation.org/reports',

    'tiền quyên góp đi đâu|sử dụng thế nào': '100% khoản quyên góp được sử dụng cho các hoạt động từ thiện. Chi phí vận hành quỹ được tài trợ riêng bởi các nhà tài trợ lớn và doanh nghiệp bảo trợ. Bạn có thể xem phân bổ chi tiết trong báo cáo tài chính công khai.',

    // Tình nguyện & tham gia
    'tình nguyện|tham gia|làm thiện nguyện|đăng ký': 'Rất hoan nghênh bạn tham gia tình nguyện! Các hoạt động thường xuyên:\n' +
      '• Thăm và tặng quà cho trẻ em\n' +
      '• Hỗ trợ cứu trợ thiên tai\n' +
      '• Tổ chức sự kiện gây quỹ\n\nĐăng ký tại: https://littlerosesfoundation.org/volunteer\nHoặc inbox fanpage để được hướng dẫn.',

    // Liên hệ
    'liên hệ|địa chỉ|số điện thoại|email|hotline': 'Thông tin liên hệ:\n' +
      '• Hotline: 0906 22 04 22\n' +
      '• Email: info@littlerosesfoundation.org\n' +
      '• Fanpage: facebook.com/littlerosesfoundation\n' +
      '• Địa chỉ: 123 Nguyễn Trãi, Thanh Xuân, Hà Nội',

    // Khác
    'quỹ có hợp pháp|giấy phép|uy tín': 'Quỹ Bông Hồng Nhỏ được thành lập hợp pháp và hoạt động dưới sự giám sát của các cơ quan nhà nước. Chúng tôi cam kết minh bạch và hiệu quả trong mọi hoạt động.',

    'cảm ơn|thank you|cám ơn': 'Không có gì ạ! Cảm ơn bạn đã quan tâm đến các hoạt động từ thiện. Nếu còn thắc mắc gì, cứ hỏi mình nhé! ❤️',
  };

  const getBotResponse = (userText: string) => {
    const lowerText = userText.toLowerCase().trim();

    // Duyệt qua từng key (có thể chứa nhiều từ khóa cách nhau bằng |)
    for (const keywords in faqResponses) {
      const keywordArray = keywords.split('|');
      if (keywordArray.some(kw => lowerText.includes(kw.trim()))) {
        return faqResponses[keywords];
      }
    }

    // Câu trả lời mặc định nếu không khớp
    return 'Xin lỗi, tôi chưa hiểu rõ câu hỏi của bạn. Bạn có thể hỏi về:\n' +
      '• Cách quyên góp\n' +
      '• Các dự án đang thực hiện\n' +
      '• Báo cáo tài chính & minh bạch\n' +
      '• Đăng ký tình nguyện\n' +
      '• Thông tin liên hệ\n' +
      'Hoặc đặt câu hỏi cụ thể hơn để tôi hỗ trợ tốt hơn nhé!';
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessages: Message[] = [...messages, { sender: 'user', text: input }];
    const botReply = getBotResponse(input);
    newMessages.push({ sender: 'bot', text: botReply });

    setMessages(newMessages);
    setInput('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 bg-[#1a522e] text-white p-4 rounded-full shadow-2xl hover:bg-[#143d23] transition-all z-50 hover:scale-110"
        >
          <MessageCircle size={32} />
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-4 right-4 w-[calc(100vw-2rem)] sm:w-96 h-[600px] max-h-[80vh] bg-white shadow-2xl rounded-lg flex flex-col border border-gray-200 overflow-hidden z-50">
          <div className="bg-gradient-to-r from-[#1a522e] to-[#143d23] text-white p-4 font-bold flex justify-between items-center">
            <span>Chatbot Quỹ Bông Hồng Nhỏ</span>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded-full transition-colors">
              <X size={20} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex items-start gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.sender === 'bot' && (
              <div className="w-8 h-8 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center flex-shrink-0 mt-1">
                <Bot size={18} className="text-[#1a522e]" />
              </div>
            )}
            <div
              className={`max-w-[80%] px-4 py-3 rounded-2xl shadow-sm whitespace-pre-wrap break-words ${
                msg.sender === 'user'
                  ? 'bg-[#1a522e] text-white'
                  : 'bg-white text-gray-800 border border-gray-200'
              }`}
            >
              {msg.text}
            </div>
            {msg.sender === 'user' && (
              <div className="w-8 h-8 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center flex-shrink-0 mt-1">
                <User size={18} className="text-gray-600" />
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 border-t border-gray-200 flex gap-2 bg-white">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Nhập câu hỏi của bạn..."
          className="flex-1 border border-gray-300 rounded-full px-5 py-3 focus:outline-none focus:border-[#1a522e]"
        />
        <button
          onClick={handleSend}
          className="bg-[#1a522e] text-white px-6 py-3 rounded-full hover:bg-[#143d23] transition font-medium"
        >
          Gửi
        </button>
      </div>
        </div>
      )}
    </>
  );
}