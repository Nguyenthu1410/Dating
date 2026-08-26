import React, { useState, useEffect } from 'react';

export default function DateInvitation() {
  const [step, setStep] = useState(0);
  const [noButtonStyle, setNoButtonStyle] = useState({});
  const [formData, setFormData] = useState({
    dateType: '',
    location: '',
    contact: ''
  });

  // Tự động chuyển từ bước "YAAAY" sang Form chọn lịch sau 3 giây
  useEffect(() => {
    if (step === 2) {
      const timer = setTimeout(() => setStep(3), 3000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  // Hàm làm nút Không chạy trốn
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

  // Hàm gửi dữ liệu về Formspree
  const handleSubmit = async () => {
    // Chuyển sang màn hình thành công (bước 6) ngay lập tức
    setStep(6); 
    
    // Đẩy dữ liệu về email của bạn
    try {
      await fetch("https://formspree.io/f/mqpkzzzg", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "Hoạt động": formData.dateType,
          "Địa điểm": formData.location,
          "Liên hệ": formData.contact,
        }),
      });
    } catch (error) {
      console.log("Lỗi gửi dữ liệu:", error);
    }
  };

  return (
    // Nền dải màu hồng pastel siêu ngọt ngào
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 to-rose-100 relative overflow-hidden font-sans p-4">
      
      {/* Khung Card trắng bo góc */}
      <div className="bg-white p-8 rounded-[2rem] shadow-xl max-w-lg w-full text-center z-10 transition-all duration-500">
        
        {/* BƯỚC 0: Lời chào */}
        {step === 0 && (
          <div className="animate-fade-in">
            <div className="text-4xl mb-4">🌸</div>
            <h2 className="text-2xl font-bold text-pink-600 mb-2">Chào đằng ấy nha!</h2>
            <p className="text-gray-500 mb-8">Tớ có chuyện này muốn nói với cậu lâu rồi... nhưng mà hơi ngại ngùng một chút 👉👈</p>
            <button 
              onClick={() => setStep(1)}
              className="bg-pink-500 hover:bg-pink-600 text-white font-medium py-3 px-8 rounded-full transition-colors transform hover:scale-105"
            >
              Chuyện gì dạ? ➔
            </button>
          </div>
        )}

        {/* BƯỚC 1: Câu hỏi chính */}
        {step === 1 && (
          <div className="animate-fade-in">
            <div className="text-4xl mb-4 text-pink-500">💖</div>
            <h2 className="text-2xl font-bold text-pink-600 mb-2">Cuối tuần này đi chơi với tớ nhé?</h2>
            <p className="text-gray-500 mb-8">Tớ hứa sẽ mua đồ ăn ngon cho cậu :)</p>
            
            <div className="flex gap-4 justify-center items-center">
              <button 
                onClick={() => setStep(2)}
                className="bg-pink-500 hover:bg-pink-600 text-white font-medium py-3 px-8 rounded-xl transition-all hover:scale-110 shadow-md"
              >
                Có chớ! 🥰
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
            <h2 className="text-3xl font-bold text-pink-500 mb-2">YAAAAY!!!</h2>
            <p className="text-gray-600">Cậu vừa làm tớ trở thành người hạnh phúc nhất trần đời đó!</p>
            <p className="text-pink-500 font-bold mt-2">Chốt đơn nha! 🥂</p>
          </div>
        )}

        {/* BƯỚC 3: Chọn kiểu hẹn hò */}
        {step === 3 && (
          <div className="animate-fade-in">
            <div className="text-4xl mb-4">🗓️</div>
            <h2 className="text-2xl font-bold text-pink-600 mb-2">Mình đi đâu chơi nhỉ?</h2>
            <p className="text-gray-500 mb-6">Cậu cứ chọn hoạt động mà cậu thích nha!</p>
            
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

        {/* BƯỚC 4: Chọn địa điểm */}
        {step === 4 && (
          <div className="animate-fade-in">
            <div className="text-4xl mb-4 text-pink-500">📍</div>
            <h2 className="text-2xl font-bold text-pink-600 mb-2">Cậu muốn hẹn ở đâu?</h2>
            <p className="text-gray-500 mb-6">Chọn một địa điểm thật ưng ý nhé!</p>
            
            <div className="grid grid-cols-2 gap-3">
              {['Chỗ cậu hay đi', 'Chỗ tớ hay đi', 'Tạo bất ngờ cho tớ đi!', "Tới đó rồi tính tiếp 🛵"].map((item) => (
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

        {/* BƯỚC 5: Liên lạc */}
        {step === 5 && (
          <div className="animate-fade-in">
            <div className="text-4xl mb-4">💭</div>
            <h2 className="text-2xl font-bold text-pink-600 mb-2">Tớ liên lạc với cậu qua đâu nè?</h2>
            <p className="text-gray-500 mb-6">Để lại thông tin để tớ qua đón nha!</p>
            
            <div className="flex flex-col gap-4">
              <input 
                type="text" 
                placeholder="SĐT, Zalo, Instagram..." 
                value={formData.contact}
                onChange={(e) => setFormData({...formData, contact: e.target.value})}
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 text-gray-700"
              />
              <button 
                onClick={handleSubmit}
                disabled={!formData.contact}
                className="bg-pink-500 hover:bg-pink-600 disabled:bg-pink-300 text-white font-medium py-4 rounded-xl transition-colors w-full flex items-center justify-center gap-2"
              >
                Gửi ngay 💌
              </button>
            </div>
          </div>
        )}

        {/* BƯỚC 6: Tổng kết */}
        {step === 6 && (
          <div className="animate-fade-in">
            <div className="text-4xl mb-4">✨</div>
            <h2 className="text-2xl font-bold text-pink-500 mb-6">Tuyệt vời! 🎉</h2>
            
            <div className="bg-pink-50 p-6 rounded-2xl text-left mb-8 border border-pink-100">
              <div className="mb-3">
                <span className="text-pink-400 text-sm block">Hoạt động</span>
                <span className="text-gray-800 font-medium">{formData.dateType}</span>
              </div>
              <div className="mb-3">
                <span className="text-pink-400 text-sm block">Địa điểm</span>
                <span className="text-gray-800 font-medium">{formData.location}</span>
              </div>
              <div>
                <span className="text-pink-400 text-sm block">Liên lạc</span>
                <span className="text-gray-800 font-medium">{formData.contact}</span>
              </div>
            </div>

            <p className="text-gray-800 font-medium mb-1">Tớ sẽ chủ động nhắn cho cậu sớm nha! ❤️</p>
            <p className="text-gray-500 text-sm mb-6">Mong chờ tới ngày được đi chơi quá đi 🥰</p>
            
            <button 
              onClick={() => {
                setStep(0);
                setFormData({ dateType: '', location: '', contact: '' });
              }}
              className="text-gray-400 hover:text-pink-400 text-sm font-medium underline transition-colors"
            >
              Thử làm lại từ đầu
            </button>
          </div>
        )}

      </div>
    </div>
  );
}