import React from 'react';
import Confetti from 'react-confetti';
import { useDateInvitationLogic } from './useDateInvitationLogic'; 

const PolaroidCard = ({ label, emoji, rotateClass, onClick }) => (
  <div 
    onClick={onClick}
    className={`bg-white p-3 pb-10 shadow-lg ${rotateClass} hover:rotate-0 hover:scale-110 hover:shadow-2xl transition-all duration-300 cursor-pointer border border-gray-200 rounded-sm relative w-40 h-48 md:w-48 md:h-56 flex flex-col`}
  >
    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-red-400 rounded-full shadow-sm border-2 border-red-200 z-10"></div>
    <div className="bg-gray-100 flex-1 flex items-center justify-center text-6xl mb-3 rounded-sm">
      {emoji}
    </div>
    <p className="text-center font-bold text-gray-700 text-sm md:text-base">{label}</p>
  </div>
);

const VirtualTicket = ({ formData }) => (
  <div className="flex w-full max-w-2xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden mt-6 transform hover:scale-105 transition-transform duration-500 text-left">
    <div className="bg-rose-500 w-1/4 p-4 flex flex-col justify-center items-center border-r-4 border-dashed border-white relative">
      <div className="absolute -top-3 -right-3 w-6 h-6 bg-[#fdf2f8] rounded-full"></div>
      <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-[#fdf2f8] rounded-full"></div>
      <p className="text-white font-bold tracking-widest -rotate-90 whitespace-nowrap text-xl md:text-2xl mt-4">
        LOVE TICKET
      </p>
    </div>
    <div className="w-3/4 p-6 flex flex-col gap-4 relative bg-rose-50">
      <h2 className="text-2xl font-extrabold text-rose-600 border-b-2 border-rose-200 pb-2">
        Vé Lên Tàu Hẹn Hò 🚂
      </h2>
      <div className="grid grid-cols-2 gap-4 text-gray-700 mt-2">
        <div>
          <p className="text-xs text-rose-400 uppercase font-semibold">Khách VIP</p>
          <p className="font-bold text-lg text-gray-800">Ngọc Anh Thư</p>
        </div>
        <div>
          <p className="text-xs text-rose-400 uppercase font-semibold">Hạng ghế</p>
          <p className="font-bold text-lg text-gray-800">Trong tim ❤️</p>
        </div>
        <div>
          <p className="text-xs text-rose-400 uppercase font-semibold">Thời gian</p>
          <p className="font-bold text-lg text-gray-800">{formData.time}</p>
        </div>
        <div>
          <p className="text-xs text-rose-400 uppercase font-semibold">Hoạt động</p>
          <p className="font-bold text-lg text-gray-800">{formData.activity}</p>
        </div>
        <div className="col-span-2">
          <p className="text-xs text-rose-400 uppercase font-semibold">Địa điểm & Món ăn</p>
          <p className="font-bold text-lg text-gray-800">{formData.location} - {formData.food}</p>
        </div>
      </div>
    </div>
  </div>
);

export default function DateInvitation() {
  const {
    step,
    isPlaying,
    windowDimensions,
    formData,
    audioRef,
    showDatePicker,       
    setShowDatePicker,    
    customDate,           
    setCustomDate, 
    noCount,
    noButtonStyle,
    handleNoInteraction,
    getNoButtonText,
    handleSelect,
    handleTimeSelect,     
    confirmCustomDate,    
    handleYesClick,
    toggleMusic
  } = useDateInvitationLogic();

  return (
    <div className="min-h-screen bg-[#fdf2f8] flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* BƯỚC 1: LỜI MỜI */}
      {step === 1 && (
        <div className="text-center z-10 flex flex-col items-center w-full">
          
          {/* Giao diện khung ảnh Polaroid có trái tim bay */}
          <div className="relative bg-white p-3 pb-8 md:p-4 md:pb-10 shadow-xl -rotate-3 hover:rotate-0 hover:scale-105 transition-transform duration-300 mb-8 w-56 md:w-64 rounded-sm border border-gray-100 flex flex-col items-center">
            <img 
              src="/cat_date.png" 
              alt="Us" 
              className="w-full h-48 md:h-56 object-cover rounded-sm" 
            />
            <p className="text-center text-rose-500 font-bold mt-3 md:mt-4 text-lg">us ? 🥺</p>
            <div className="absolute -top-5 -right-5 text-4xl animate-bounce drop-shadow-md z-10">💖</div>
            <div className="absolute top-1/2 -left-4 text-2xl animate-pulse drop-shadow-md z-10">💕</div>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-rose-500 mb-8 drop-shadow-sm">
            Kỷ niệm 2 năm rồi, đi date với anh nhé? 💕
          </h1>
          
          {/* Vùng chứa 2 nút Có / Không */}
          <div className="flex flex-wrap items-center justify-center gap-4 relative w-full h-40">
            
            {/* Nút CÓ to dần (giới hạn kích thước) và giữ màu hồng */}
            <button 
              onClick={handleYesClick}
              style={{ 
                // Tăng chậm hơn và giới hạn size chữ tối đa là 60px
                fontSize: `${Math.min(noCount * 8 + 20, 60)}px`,
                // Giới hạn padding tối đa để không bị quá khổ
                padding: `${Math.min(noCount * 6 + 12, 36)}px ${Math.min(noCount * 8 + 32, 64)}px`,
                // Quan trọng: Đảm bảo nút không bao giờ bự hơn 90% chiều rộng màn hình
                maxWidth: '90vw' 
              }}
              className="bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-xl shadow-xl transition-all duration-200 ease-in-out z-20 text-center"
            >
              Dạ đi chớ! 🥰
            </button>

            {/* Nút KHÔNG màu xám, chạy trốn và đổi chữ */}
            <button 
              style={noButtonStyle}
              onMouseEnter={handleNoInteraction} 
              onClick={handleNoInteraction}      
              className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-3 px-8 rounded-xl shadow-lg text-xl transition-all whitespace-nowrap"
            >
              {getNoButtonText()}
            </button>
          </div>
        </div>
      )}

      {/* BƯỚC 2: HOẠT ĐỘNG */}
      {step === 2 && (
        <div className="text-center animate-fade-in">
          <h2 className="text-3xl font-bold text-rose-500 mb-8">Hôm đó chúng mình làm gì nhỉ?</h2>
          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            <PolaroidCard label="Xem phim rạp" emoji="🍿" rotateClass="-rotate-3" onClick={() => handleSelect('activity', 'Xem phim')} />
            <PolaroidCard label="Cà phê chill chill" emoji="☕" rotateClass="rotate-2" onClick={() => handleSelect('activity', 'Cà phê')} />
            <PolaroidCard label="Đạp xe ngắm hoàng hôn" emoji="🚴‍♀️" rotateClass="-rotate-1" onClick={() => handleSelect('activity', 'Đạp xe')} />
          </div>
        </div>
      )}

      {/* BƯỚC 3: ĐỊA ĐIỂM (TỐI TẠI DĨ AN) */}
      {step === 3 && (
        <div className="text-center animate-fade-in">
          <h2 className="text-3xl font-bold text-rose-500 mb-8">Tối đó mình dạo quanh góc nào đây ta?</h2>
          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            <PolaroidCard label="Lượn TTHC Dĩ An" emoji="🌃" rotateClass="rotate-1" onClick={() => handleSelect('location', 'Trung tâm Hành chính Dĩ An')} />
            <PolaroidCard label="Dạo Charm City" emoji="✨" rotateClass="-rotate-2" onClick={() => handleSelect('location', 'Khu Charm City / Vincom')} />
            <PolaroidCard label="Food tour Chợ đêm" emoji="🍢" rotateClass="rotate-3" onClick={() => handleSelect('location', 'Chợ đêm Làng ĐH')} />
          </div>
        </div>
      )}

      {/* BƯỚC 4: ĂN UỐNG */}
      {step === 4 && (
        <div className="text-center animate-fade-in">
          <h2 className="text-3xl font-bold text-rose-500 mb-8">Cái bụng đói muốn ăn gì ta?</h2>
          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            <PolaroidCard label="Sushi / Đồ Nhật" emoji="🍣" rotateClass="-rotate-3" onClick={() => handleSelect('food', 'Sushi')} />
            <PolaroidCard label="Thịt nướng xèo xèo" emoji="🥩" rotateClass="rotate-1" onClick={() => handleSelect('food', 'Thịt nướng')} />
            <PolaroidCard label="Ăn vặt / Ốc" emoji="🐌" rotateClass="-rotate-2" onClick={() => handleSelect('food', 'Ốc')} />
          </div>
        </div>
      )}

      {/* BƯỚC 5: THỜI GIAN */}
      {step === 5 && (
        <div className="text-center animate-fade-in w-full max-w-lg">
          <h2 className="text-3xl font-bold text-rose-500 mb-8">Khi nào thì mình lên đồ?</h2>
          
          {!showDatePicker ? (
            <div className="flex flex-wrap justify-center gap-6 md:gap-8">
              <PolaroidCard label="Thứ 7 tuần này" emoji="📅" rotateClass="rotate-2" onClick={() => handleTimeSelect('Thứ 7')} />
              <PolaroidCard label="Chủ Nhật tuần này" emoji="☀️" rotateClass="-rotate-1" onClick={() => handleTimeSelect('Chủ Nhật')} />
              <PolaroidCard label="Chọn ngày cụ thể" emoji="✍️" rotateClass="rotate-3" onClick={() => handleTimeSelect('custom')} />
            </div>
          ) : (
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-rose-100 flex flex-col items-center gap-6 animate-fade-in mx-4">
              <p className="text-xl text-gray-700 font-bold">Bạn gái muốn đi ngày nào nè? 🥰</p>
              
              <input 
                type="date" 
                value={customDate}
                onChange={(e) => setCustomDate(e.target.value)}
                className="p-3 border-2 border-rose-300 rounded-xl text-gray-700 focus:outline-none focus:border-rose-500 focus:ring-4 focus:ring-rose-200 text-lg w-full max-w-xs transition-all cursor-pointer"
              />
              
              <div className="flex gap-4 mt-2">
                <button 
                  onClick={() => setShowDatePicker(false)}
                  className="px-6 py-2 rounded-full font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 transition"
                >
                  Quay lại
                </button>
                <button 
                  onClick={confirmCustomDate}
                  disabled={!customDate}
                  className="px-6 py-2 rounded-full font-bold text-white bg-rose-500 hover:bg-rose-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Chốt ngày!
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* BƯỚC 6: TỔNG KẾT */}
      {step === 6 && (
        <div className="text-center animate-fade-in w-full max-w-3xl px-4 z-10">
          <h1 className="text-3xl md:text-5xl font-bold text-rose-500 mb-2">Yayyy! Đã chốt kèo! 🎉</h1>
          <p className="text-gray-600 mb-6 font-medium">Hẹn gặp công chúa của anh vào ngày hôm đó nha!</p>
          
          <VirtualTicket formData={formData} />
          
          <p className="mt-8 text-rose-400 italic text-sm">Hãy chụp màn hình chiếc vé này để làm bằng chứng nhé ^^</p>
        </div>
      )}
    </div>
  );
}