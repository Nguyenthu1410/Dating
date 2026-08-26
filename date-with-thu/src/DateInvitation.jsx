import React, { useState, useEffect } from 'react';

export default function DateInvitation() {
  const [step, setStep] = useState(0);
  const [noButtonStyle, setNoButtonStyle] = useState({});
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

  // Hàm làm nút Không chạy trốn khi rê chuột vào hoặc click
  const handleNoHover = () => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const maxX = windowWidth - 150;
    const maxY = windowHeight - 60;
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    setNoButtonStyle({
      position: 'fixed',
      left: `${randomX}px`,
      top: `${randomY}px`,
    });
  };

  const handleSelect = (field, value) => {
    setFormData({ ...formData, [field]: value });
    setStep(step + 1);
  };

  const handleSubmit = async () => {
    setStep(6); 
    
    try {
      await fetch("https://formspree.io/f/mqpkzzzg", {
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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 to-rose-100 relative overflow-hidden font-sans p-4">
      
      <div className="bg-white p-8 rounded-[2rem] shadow-xl max-w-lg w-full text-center z-10 transition-all duration-500">
        
        {/* BƯỚC 0: Lời chào kiểu người yêu 2 năm */}
        {step === 0 && (
          <div className="animate-fade-in">
            <div className="text-4xl mb-4">🥰</div>
            <h2 className="text-2xl font-bold text-pink-600 mb-2">Bé iu của anh ơi!</h2>
            <p className="text-gray-500 mb-8">Tròn 2 năm bên nhau rồi đấy, nay anh chuẩn bị sẵn kèo đi chơi kỷ niệm nè, bấm xem đi đâu nha 👇</p>
            <button 
              onClick={() => setStep(1)}
              className="bg-pink-500 hover:bg-pink-600 text-white font-medium py-3 px-8 rounded-full transition-colors transform hover:scale-105"
            >
              Đi đâu thế ta? ➔
            </button>
          </div>
        )}

        {/* BƯỚC 1: Câu hỏi chính */}
        {step === 1 && (
          <div className="animate-fade-in">
            <div className="text-4xl mb-4 text-pink-500">💖</div>
            <h2 className="text-2xl font-bold text-pink-600 mb-2">Mình đi "hâm nóng tình cảm" với nhau nhé?</h2>
            <p className="text-gray-500 mb-8">Đi chơi với người yêu 2 năm thì không được từ chối đâu nha :P</p>
            
            <div className="flex gap-4 justify-center items-center">
              <button 
                onClick={() => setStep(2)}
                className="bg-pink-500 hover:bg-pink-600 text-white font-medium py-3 px-8 rounded-xl transition-all hover:scale-110 shadow-md"
              >
                Dạ chớ! 🥰
              </button>
              
              <button 
                onMouseEnter={handleNoHover}
                onClick={handleNoHover}
                style={noButtonStyle}
                className="bg-gray-200 text-gray-600 font-medium py-3 px-8 rounded-xl transition-all duration-200"
              >
                Không! 😤
              </button>
            </div>
          </div>
        )}

        {/* BƯỚC 2: Ăn mừng */}
        {step === 2 && (
          <div className="animate-fade-in py-8">
            <div className="text-4xl mb-4">✨💕✨</div>
            <h2 className="text-3xl font-bold text-pink-500 mb-2">BIẾT NGAY MÀ!</h2>
            <p className="text-gray-600">Yêu nhau 2 năm rồi mà còn định bấm nút không à nha! 😎</p>
            <p className="text-pink-500 font-bold mt-2">Giờ thì lên lịch chi tiết thôi nào! 🥂</p>
          </div>
        )}

        {/* BƯỚC 3: Chọn kiểu hẹn hò */}
        {step === 3 && (
          <div className="animate-fade-in">
            <div className="text-4xl mb-4">🗓️</div>
            <h2 className="text-2xl font-bold text-pink-600 mb-2">Kỷ niệm 2 năm mình làm gì nhỉ?</h2>
            <p className="text-gray-500 mb-6">Em cứ chọn hoạt động thích nhất nha!</p>
            
            <div className="grid grid-cols-2 gap-3">
              {['☕ Đi cà phê chill chill', '🍝 Ăn tối lãng mạn', '🍿 Đi xem phim', '🏛️ Đi bảo tàng/Triển lãm', '🌳 Dạo công viên', '🎮 Chơi game chung'].map((item) => (
                <button 
                  key={item}
                  onClick={() => handleSelect('dateType', item)}
                  className="p-4 border border-pink-100 rounded-xl hover:bg-pink-50 hover:border-pink-300 transition-all text-gray-700 font-medium text-sm flex items-center justify-center text-center"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* BƯỚC 4: Tự chọn ngày giờ */}
        {step === 4 && (
          <div className="animate-fade-in">
            <div className="text-4xl mb-4 text-pink-500">⏰</div>
            <h2 className="text-2xl font-bold text-pink-600 mb-2">Hôm nào thì xuất phát được ta?</h2>
            <p className="text-gray-500 mb-6">Chọn ngày giờ chính xác để anh chuẩn bị đón nhé!</p>
            
            <div className="flex flex-col gap-4">
              <input 
                type="datetime-local" 
                value={formData.dateWhen}
                onChange={(e) => setFormData({...formData, dateWhen: e.target.value})}
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 text-gray-700 font-medium cursor-pointer"
              />
              <button 
                onClick={() => setStep(5)}
                disabled={!formData.dateWhen}
                className="bg-pink-500 hover:bg-pink-600 disabled:bg-pink-300 text-white font-medium py-4 rounded-xl transition-colors w-full flex items-center justify-center gap-2 shadow-md"
              >
                Tiếp tục ➔
              </button>
            </div>
          </div>
        )}

        {/* BƯỚC 5: Chọn địa điểm */}
        {step === 5 && (
          <div className="animate-fade-in">
            <div className="text-4xl mb-4 text-pink-500">📍</div>
            <h2 className="text-2xl font-bold text-pink-600 mb-2">Địa điểm hẹn hò ở đâu nè?</h2>
            <p className="text-gray-500 mb-6">Chọn chỗ nào thật đáng nhớ nhé!</p>
            
            <div className="grid grid-cols-2 gap-3">
              {['Chỗ cũ kỷ niệm', 'Quán mới mở', 'Tạo bất ngờ cho em đi!', "Tới đó rồi tính tiếp 🛵"].map((item) => (
                <button 
                  key={item}
                  onClick={() => handleSelect('location', item)}
                  className="p-4 border border-pink-100 rounded-xl hover:bg-pink-50 hover:border-pink-300 transition-all text-gray-700 font-medium text-sm"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* BƯỚC 6: Liên lạc (Chuyển thành màn hình xác nhận cuối cùng sau khi bấm Gửi) */}
        {step === 6 && (
          <div className="animate-fade-in py-6">
            <div className="text-5xl mb-4">💖</div>
            <h2 className="text-3xl font-bold text-pink-500 mb-3">Đã chốt đơn kỷ niệm 2 năm!</h2>
            <p className="text-gray-700 font-medium mb-2">Thông tin lịch trình đã gửi về máy tớ rồi nhé.</p>
            <p className="text-gray-500 text-sm mb-8">Cảm ơn vì đã luôn đồng hành cùng tớ suốt 2 năm qua. Yêu em nhiều lắm ❤️</p>
            
            <button 
              onClick={() => {
                setStep(0);
                setFormData({ dateType: '', dateWhen: '', location: '', contact: '' });
                setNoButtonStyle({});
              }}
              className="text-pink-400 hover:text-pink-600 text-sm font-medium underline transition-colors"
            >
              Xem lại từ đầu
            </button>
          </div>
        )}

      </div>
    </div>
  );
}