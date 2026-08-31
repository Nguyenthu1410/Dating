import React, { useState, useEffect } from 'react';

export default function DateInvitation() {
  const [step, setStep] = useState(0);
  const [noButtonStyle, setNoButtonStyle] = useState({});
  const [noText, setNoText] = useState('Không nha 😤');
  const [formData, setFormData] = useState({
    dateType: '',
    dateWhen: '',
    location: '',
    contact: ''
  });

  useEffect(() => {
    if (step === 2) {
      const timer = setTimeout(() => setStep(3), 3000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  // Hàm làm nút Không trượt cực mượt, đi xa nhưng lấy vị trí cũ làm gốc (không bị bốc hơi)
  const handleNoHover = () => {
    const texts = ['Nghĩ lại đi! 😜', 'Chắc chưa? 🤔', 'Không thoát được đâu! 😈', 'Bấm nhầm hả? 🤭', 'Đừng hòng! 😤'];
    const randomText = texts[Math.floor(Math.random() * texts.length)];
    setNoText(randomText);

    const directionX = Math.random() > 0.5 ? 1 : -1;
    const directionY = Math.random() > 0.5 ? 1 : -1;
    
    const moveX = directionX * (Math.floor(Math.random() * 150) + 100);
    const moveY = directionY * (Math.floor(Math.random() * 100) + 80);

    setNoButtonStyle({
      transform: `translate(${moveX}px, ${moveY}px)`,
      transition: 'transform 0.3s cubic-bezier(0.25, 1, 0.5, 1)',
      zIndex: 50,
    });
  };

  const handleSelect = (field, value) => {
    setFormData({ ...formData, [field]: value });
    setStep(step + 1);
  };

  const handleSubmit = async () => {
    setStep(7); 
    
    try {
      await fetch("DÁN_LINK_FORMSPREE_CỦA_BẠN_VÀO_ĐÂY", { 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "Hoạt động": formData.dateType,
          "Thời gian": formData.dateWhen,
          "Địa điểm": formData.location,
          "Liên hệ": formData.contact,
        }),
      });
    } catch (error) {
      console.log("Lỗi gửi dữ liệu:", error);
    }
  };

  return (
    // Nền hồng pastel ngọt ngào
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 via-rose-50 to-pink-200 relative overflow-hidden font-sans p-4 text-gray-800">
      
      {/* Nhúng trực tiếp style animation cho trái tim bay */}
      <style>{`
        @keyframes floatHeartUp {
          0% { transform: translateY(110vh) scale(0.5) rotate(0deg); opacity: 0; }
          20% { opacity: 0.8; }
          100% { transform: translateY(-20vh) scale(1.2) rotate(45deg); opacity: 0; }
        }
        .animate-float-heart {
          position: absolute;
          animation: floatHeartUp linear infinite;
          bottom: -10%;
        }
      `}</style>

      {/* Các trái tim nhỏ bay lơ lửng phía sau khung trắng */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <svg className="animate-float-heart w-6 h-6 text-pink-300" style={{ left: '10%', animationDuration: '6s', animationDelay: '0s' }} fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
        <svg className="animate-float-heart w-8 h-8 text-pink-400" style={{ left: '25%', animationDuration: '8s', animationDelay: '2s' }} fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
        <svg className="animate-float-heart w-5 h-5 text-rose-300" style={{ left: '40%', animationDuration: '5s', animationDelay: '1s' }} fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
        <svg className="animate-float-heart w-7 h-7 text-pink-300" style={{ left: '60%', animationDuration: '7s', animationDelay: '3s' }} fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
        <svg className="animate-float-heart w-9 h-9 text-rose-200" style={{ left: '75%', animationDuration: '9s', animationDelay: '0.5s' }} fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
        <svg className="animate-float-heart w-6 h-6 text-pink-400" style={{ left: '85%', animationDuration: '6s', animationDelay: '4s' }} fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
      </div>

      {/* Khung Card chính: Trong suốt mờ nhẹ, bo góc đều */}
      <div className="bg-white/90 backdrop-blur-md p-8 sm:p-10 rounded-[24px] shadow-[0_15px_40px_rgba(255,180,200,0.4)] max-w-[500px] w-full min-h-[380px] flex flex-col justify-center items-center text-center z-10 transition-all duration-500 relative border border-white">
        
        {/* BƯỚC 0 */}
        {step === 0 && (
          <div className="animate-fade-in w-full">
            <div className="flex justify-center mb-4">
              <svg className="w-12 h-12 text-pink-500 drop-shadow-sm" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">Bé iu của tớ ơi!</h2>
            <p className="text-gray-500 mb-8 text-sm sm:text-base">Tròn 2 năm bên nhau rồi đấy, nay tớ chuẩn bị sẵn kèo đi chơi kỷ niệm nè, bấm xem đi đâu nha 👇</p>
            <button 
              onClick={() => setStep(1)}
              className="bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-white font-semibold py-3 px-8 rounded-full transition-all shadow-md hover:shadow-lg w-max mx-auto flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
            >
              Đi đâu thế ta? ➔
            </button>
          </div>
        )}

        {/* BƯỚC 1: Câu hỏi với nút KHÔNG siêu nhây */}
        {step === 1 && (
          <div className="animate-fade-in w-full">
            <div className="flex justify-center mb-4">
              <svg className="w-12 h-12 text-pink-500 drop-shadow-sm" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">Cuối tuần này đi "hâm nóng tình cảm" với tớ nhé?</h2>
            <p className="text-gray-500 mb-8 text-sm">Đi chơi với người yêu 2 năm thì không được từ chối đâu nha :P</p>
            
            <div className="flex gap-4 justify-center items-center w-full relative min-h-[60px]">
              <button 
                onClick={() => setStep(2)}
                className="bg-[#22c55e] hover:bg-[#16a34a] text-white font-semibold py-3 px-8 rounded-xl transition-all shadow-md flex items-center gap-2 z-20 relative transform hover:scale-105"
              >
                Dạ chớ! 🥰
              </button>
              
              <button 
                onMouseEnter={handleNoHover}
                onClick={handleNoHover}
                style={noButtonStyle}
                className="bg-gray-100 text-gray-600 font-semibold py-3 px-8 rounded-xl shadow-sm whitespace-nowrap cursor-pointer z-10"
              >
                {noText}
              </button>
            </div>
          </div>
        )}

        {/* BƯỚC 2: YAAAAY!!! */}
        {step === 2 && (
          <div className="animate-fade-in w-full">
            <div className="flex justify-center gap-2 mb-4">
              <svg className="w-8 h-8 text-pink-500 animate-bounce" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
              <svg className="w-8 h-8 text-pink-500 animate-bounce" style={{ animationDelay: '0.1s' }} fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
              <svg className="w-8 h-8 text-pink-500 animate-bounce" style={{ animationDelay: '0.2s' }} fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
            </div>
            <h2 className="text-3xl font-bold mb-2 text-gray-800">BIẾT NGAY MÀ!!!</h2>
            <p className="text-gray-600 mb-2">Yêu nhau 2 năm rồi mà còn định bấm nút không à nha! 😎</p>
            <p className="text-pink-500 font-semibold">Giờ thì lên lịch chi tiết thôi nào! 🥂</p>
          </div>
        )}

        {/* BƯỚC 3 */}
        {step === 3 && (
          <div className="animate-fade-in w-full">
            <div className="flex justify-center mb-4">
              <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-pink-500 fill-current" viewBox="0 0 24 24"><path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM5 8V6h14v2H5z"/></svg>
              </div>
            </div>
            <h2 className="text-xl font-bold mb-2 text-gray-800">Kỷ niệm 2 năm mình làm gì nhỉ?</h2>
            <p className="text-gray-500 text-sm mb-6">Cậu cứ chọn hoạt động thích nhất nha!</p>
            
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Cà phê chill chill', icon: '☕' },
                { label: 'Ăn tối lãng mạn', icon: '🍝' },
                { label: 'Đi xem phim', icon: '🍿' },
                { label: 'Bảo tàng/Triển lãm', icon: '🏛️' },
                { label: 'Dạo công viên', icon: '🌳' },
                { label: 'Chơi game chung', icon: '🎮' }
              ].map((item) => (
                <button 
                  key={item.label}
                  onClick={() => handleSelect('dateType', item.label)}
                  className="p-4 border border-pink-100 rounded-xl bg-white hover:bg-pink-50 hover:border-pink-300 hover:shadow-sm transition-all text-gray-700 font-medium text-sm flex flex-col items-center justify-center gap-2"
                >
                  <span className="text-2xl">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* BƯỚC 4 */}
        {step === 4 && (
          <div className="animate-fade-in w-full">
            <div className="flex justify-center mb-4">
              <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-pink-500 fill-current" viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
              </div>
            </div>
            <h2 className="text-xl font-bold mb-2 text-gray-800">Hôm nào thì xuất phát được ta?</h2>
            <p className="text-gray-500 text-sm mb-6">Chọn ngày giờ chính xác để tớ chuẩn bị đón nhé!</p>
            
            <div className="flex flex-col gap-4">
              <input 
                type="datetime-local" 
                value={formData.dateWhen}
                onChange={(e) => setFormData({...formData, dateWhen: e.target.value})}
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 text-gray-700 text-sm"
              />
              <button 
                onClick={() => setStep(5)}
                disabled={!formData.dateWhen}
                className="w-full bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 disabled:opacity-50 text-white font-medium py-3.5 rounded-xl transition-all shadow-md"
              >
                Tiếp tục ➔
              </button>
            </div>
          </div>
        )}

        {/* BƯỚC 5 */}
        {step === 5 && (
          <div className="animate-fade-in w-full">
            <div className="flex justify-center mb-4">
              <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-pink-500 fill-current" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
              </div>
            </div>
            <h2 className="text-xl font-bold mb-2 text-gray-800">Địa điểm hẹn hò ở đâu nè?</h2>
            <p className="text-gray-500 text-sm mb-6">Chọn chỗ nào thật đáng nhớ nhé!</p>
            
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Chỗ cũ kỷ niệm', icon: '🏡' },
                { label: 'Quán mới mở', icon: '✨' },
                { label: 'Tạo bất ngờ cho tớ', icon: '🎁' },
                { label: 'Tới đó rồi tính', icon: '🛵' }
              ].map((item) => (
                <button 
                  key={item.label}
                  onClick={() => handleSelect('location', item.label)}
                  className="p-4 border border-pink-100 rounded-xl bg-white hover:bg-pink-50 hover:border-pink-300 hover:shadow-sm transition-all text-gray-700 font-medium text-sm flex flex-col items-center justify-center gap-2"
                >
                  <span className="text-2xl">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* BƯỚC 6 */}
        {step === 6 && (
          <div className="animate-fade-in w-full">
            <div className="flex justify-center mb-4">
              <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-pink-500 fill-current" viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z"/></svg>
              </div>
            </div>
            <h2 className="text-xl font-bold mb-2 text-gray-800">Xác nhận lại chút thông tin nè!</h2>
            <p className="text-gray-500 text-sm mb-6">Để lại chút nhắn nhủ hoặc SĐT để tớ qua đón nha.</p>
            
            <div className="flex flex-col gap-4">
              <input 
                type="text" 
                placeholder="SĐT, Zalo, hoặc lời nhắn..." 
                value={formData.contact}
                onChange={(e) => setFormData({...formData, contact: e.target.value})}
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 text-gray-700 text-sm"
              />
              <button 
                onClick={handleSubmit}
                disabled={!formData.contact}
                className="w-full bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 disabled:opacity-50 text-white font-medium py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
              >
                Gửi ngay 💌
              </button>
            </div>
          </div>
        )}

        {/* BƯỚC 7: Trang Summary */}
        {step === 7 && (
          <div className="animate-fade-in w-full">
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center shadow-sm">
                <svg className="w-8 h-8 text-green-500 fill-current" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Đã chốt đơn kỷ niệm 2 năm! 🎉</h2>
            
            <div className="bg-gradient-to-br from-pink-50 to-white rounded-2xl p-5 mb-6 text-left border border-pink-100 shadow-sm w-full">
              <div className="flex items-center gap-3 mb-3 text-gray-700 text-sm">
                <span className="text-lg">☕</span> 
                <span className="font-semibold min-w-[80px] text-pink-600">Hoạt động:</span> 
                <span>{formData.dateType}</span>
              </div>
              <div className="flex items-center gap-3 mb-3 text-gray-700 text-sm">
                <span className="text-lg">⏰</span> 
                <span className="font-semibold min-w-[80px] text-pink-600">Thời gian:</span> 
                <span>{formData.dateWhen.replace('T', ' ')}</span>
              </div>
              <div className="flex items-center gap-3 mb-3 text-gray-700 text-sm">
                <span className="text-lg">📍</span> 
                <span className="font-semibold min-w-[80px] text-pink-600">Địa điểm:</span> 
                <span>{formData.location}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700 text-sm">
                <span className="text-lg">💬</span> 
                <span className="font-semibold min-w-[80px] text-pink-600">Liên hệ:</span> 
                <span>{formData.contact}</span>
              </div>
            </div>

            <p className="text-gray-700 font-medium text-sm mb-2">Lịch trình đã được gửi thẳng về email của tớ rồi nhé. 🥰</p>
            <p className="text-gray-500 text-sm mb-6">Cảm ơn vì đã luôn đồng hành cùng tớ suốt 2 năm qua. Yêu cậu rất nhiều ❤️</p>
            
            <button 
              onClick={() => {
                setStep(0);
                setFormData({ dateType: '', dateWhen: '', location: '', contact: '' });
                setNoButtonStyle({});
                setNoText('Không nha 😤'); // Reset lại chữ
              }}
              className="text-pink-500 hover:text-pink-700 text-sm font-semibold transition-colors underline"
            >
              Làm lại từ đầu
            </button>
          </div>
        )}

      </div>
    </div>
  );
}