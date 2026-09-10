// import { useState, useRef, useEffect } from 'react';

// export const useDateInvitationLogic = () => {
//   const [step, setStep] = useState(1);
  
//   // --- STATE DÀNH CHO ÂM NHẠC ---
//   const [isPlaying, setIsPlaying] = useState(false);
//   const audioRef = useRef(null);
  
//   // --- STATE GIAO DIỆN & KÍCH THƯỚC ---
//   const [windowDimensions, setWindowDimensions] = useState({ width: 0, height: 0 });
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [customDate, setCustomDate] = useState('');
  
//   // --- STATE NÚT "KHÔNG" CHẠY TRỐN ---
//   const [noCount, setNoCount] = useState(0);
//   const [noButtonStyle, setNoButtonStyle] = useState({});

//   // --- STATE DỮ LIỆU HẸN HÒ ---
//   const [formData, setFormData] = useState({
//     activity: '',
//     location: '',
//     food: '',
//     time: ''
//   });

//   useEffect(() => {
//     setWindowDimensions({ width: window.innerWidth, height: window.innerHeight });
//   }, []);

//   // --- LOGIC: BẤM NÚT "KHÔNG" ---
//   const handleNoInteraction = () => {
//     setNoCount(prev => prev + 1);
    
//     const x = Math.random() * 70 + 10; 
//     const y = Math.random() * 70 + 10;
//     setNoButtonStyle({
//       position: 'fixed',
//       left: `${x}%`,
//       top: `${y}%`,
//       transition: 'all 0.2s cubic-bezier(0.25, 1, 0.5, 1)',
//       zIndex: 50
//     });
//   };

//   const getNoButtonText = () => {
//     const phrases = [
//       "Hông bé ơi 😝",
//       "Chắc chưa? 🤔",
//       "Nghĩ lại đi mà 🥺",
//       "Đừng làm thế 😭",
//       "Thật sự luôn? 💔",
//       "Anh khóc đó 😭",
//       "Cho anh cơ hội đi 🥺",
//       "Không được đâu 😤",
//       "Bấm nút màu hồng kìa 👉"
//     ];
//     return phrases[Math.min(noCount, phrases.length - 1)];
//   };

//   // --- LOGIC: GỬI DỮ LIỆU NGẦM VỀ EMAIL (FORMSPREE) ---
//   const sendDataToFormspree = async (finalData) => {
//     try {
//       await fetch("https://formspree.io/f/xnpqvgjo", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Accept": "application/json"
//         },
//         body: JSON.stringify({
//           "Khách VIP": "Ngọc Anh Thư",
//           "Hoạt động": finalData.activity,
//           "Địa điểm": finalData.location,
//           "Đồ ăn": finalData.food,
//           "Thời gian": finalData.time,
//           "Lời nhắn": "Ting ting! Bé iu đã chốt lịch hẹn 2 năm 💕"
//         })
//       });
//     } catch (error) {
//       console.error("Lỗi gửi dữ liệu:", error);
//     }
//   };

//   // --- LOGIC: CHỌN CÁC BƯỚC ---
//   const handleSelect = (field, value) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
//     setStep(step + 1);
//   };

//   const handleTimeSelect = (type) => {
//     if (type === 'custom') {
//       setShowDatePicker(true);
//     } else {
//       const newData = { ...formData, time: type };
//       setFormData(newData);
//       sendDataToFormspree(newData); 
//       setStep(step + 1);
//     }
//   };

//   const confirmCustomDate = () => {
//     if (customDate) {
//       const [year, month, day] = customDate.split('-');
//       const formattedDate = `${day}/${month}/${year}`;
//       const newData = { ...formData, time: formattedDate };
      
//       setFormData(newData);
//       sendDataToFormspree(newData);
      
//       setShowDatePicker(false);
//       setStep(step + 1);
//     }
//   };

//   // --- LOGIC: ÂM NHẠC ---
//   const handleYesClick = () => {
//     setStep(2);
//     if (audioRef.current) {
//       audioRef.current.play().catch(e => console.log("Trình duyệt chặn autoplay", e));
//       setIsPlaying(true);
//     }
//   };

//   const toggleMusic = () => {
//     if (isPlaying) {
//       audioRef.current.pause();
//     } else {
//       audioRef.current.play();
//     }
//     setIsPlaying(!isPlaying);
//   };

//   return {
//     step,
//     isPlaying,
//     windowDimensions,
//     formData,
//     audioRef,
//     showDatePicker,
//     setShowDatePicker,
//     customDate,
//     setCustomDate,
//     noCount,
//     noButtonStyle,
//     handleNoInteraction,
//     getNoButtonText,
//     handleSelect,
//     handleTimeSelect,
//     confirmCustomDate,
//     handleYesClick,
//     toggleMusic
//   };
// };

import { useState, useRef, useEffect } from 'react';

export const useDateInvitationLogic = () => {
  // Trạng thái của các bước, bắt đầu từ 1
  const [step, setStep] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [windowDimensions, setWindowDimensions] = useState({ width: 0, height: 0 });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [customDate, setCustomDate] = useState('');
  
  // Trạng thái cho nút "Không"
  const [noCount, setNoCount] = useState(0);
  const [noButtonStyle, setNoButtonStyle] = useState({});
  
  // Lưu trữ dữ liệu các lựa chọn
  const [formData, setFormData] = useState({
    distance: '', // Đi gần hay đi xa
    activity: '', // Hoạt động (xem phim, cà phê...)
    location: '', // Địa điểm (Charm city, Gò Vấp...)
    food: '',     // Ăn uống
    time: ''      // Thời gian
  });

  const audioRef = useRef(null);

  // Lấy kích thước màn hình cho hiệu ứng pháo giấy
  useEffect(() => {
    setWindowDimensions({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  // Thay đổi chữ trên nút "Không" mỗi lần bị từ chối
  const getNoButtonText = () => {
    const texts = [
      'Không nha',
      'Nghĩ lại đi anh',
      'Chắc chưa?',
      'Bấm nhầm đúng không?',
      'Cho cơ hội chọn lại đó',
      'Khóc á 😭',
      'Đi màaaaaa',
      'Bấm có đi mờ 🥺'
    ];
    return texts[Math.min(noCount, texts.length - 1)];
  };

  // Nút "Không" chạy lung tung khi rê chuột vào hoặc bấm
  const handleNoInteraction = () => {
    setNoCount(prev => prev + 1);
    const x = Math.random() * (window.innerWidth - 150);
    const y = Math.random() * (window.innerHeight - 50);
    setNoButtonStyle({ position: 'absolute', left: `${x}px`, top: `${y}px` });
  };

  // Xử lý khi nhấn "Có"
  const handleYesClick = () => {
    setStep(2); // Chuyển sang bước 2
    if (audioRef.current) {
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  // Lưu lựa chọn và tự động sang bước tiếp theo
  const handleSelect = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setStep(prevStep => prevStep + 1);
  };

  // Xử lý bước chọn thời gian
  const handleTimeSelect = (value) => {
    if (value === 'custom') {
      setShowDatePicker(true);
    } else {
      setFormData(prev => ({ ...prev, time: value }));
      setStep(7); // Chuyển thẳng đến bước 7 (Tổng kết)
    }
  };

  // Chốt ngày tự chọn
  const confirmCustomDate = () => {
    if (customDate) {
      // Format lại ngày tháng năm cho đẹp (từ yyyy-mm-dd sang dd/mm/yyyy)
      const parts = customDate.split('-');
      const formattedDate = `${parts[2]}/${parts[1]}/${parts[0]}`;
      
      setFormData(prev => ({ ...prev, time: formattedDate }));
      setShowDatePicker(false);
      setStep(7); // Chuyển đến bước 7
    }
  };

  // Hàm xử lý nút Quay Lại
  const handleBack = () => {
    // Nếu đang ở màn hình chọn ngày tuỳ chỉnh thì tắt màn hình đó đi
    if (showDatePicker) {
      setShowDatePicker(false);
      return;
    }
    // Lùi lại 1 bước, nhỏ nhất là về bước 1
    setStep((prevStep) => (prevStep > 1 ? prevStep - 1 : 1));
  };

  // Bật/tắt nhạc nền
  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(() => {});
      }
      setIsPlaying(!isPlaying);
    }
  };

  return {
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
    toggleMusic,
    handleBack
  };
};