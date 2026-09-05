import { useState, useRef, useEffect } from 'react';

export const useDateInvitationLogic = () => {
  const [step, setStep] = useState(1);
  
  // --- STATE DÀNH CHO ÂM NHẠC ---
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  
  // --- STATE GIAO DIỆN & KÍCH THƯỚC ---
  const [windowDimensions, setWindowDimensions] = useState({ width: 0, height: 0 });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [customDate, setCustomDate] = useState('');
  
  // --- STATE NÚT "KHÔNG" CHẠY TRỐN ---
  const [noCount, setNoCount] = useState(0);
  const [noButtonStyle, setNoButtonStyle] = useState({});

  // --- STATE DỮ LIỆU HẸN HÒ ---
  const [formData, setFormData] = useState({
    activity: '',
    location: '',
    food: '',
    time: ''
  });

  useEffect(() => {
    setWindowDimensions({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  // --- LOGIC: BẤM NÚT "KHÔNG" ---
  const handleNoInteraction = () => {
    setNoCount(prev => prev + 1);
    
    const x = Math.random() * 70 + 10; 
    const y = Math.random() * 70 + 10;
    setNoButtonStyle({
      position: 'fixed',
      left: `${x}%`,
      top: `${y}%`,
      transition: 'all 0.2s cubic-bezier(0.25, 1, 0.5, 1)',
      zIndex: 50
    });
  };

  const getNoButtonText = () => {
    const phrases = [
      "Hông bé ơi 😝",
      "Chắc chưa? 🤔",
      "Nghĩ lại đi mà 🥺",
      "Đừng làm thế 😭",
      "Thật sự luôn? 💔",
      "Anh khóc đó 😭",
      "Cho anh cơ hội đi 🥺",
      "Không được đâu 😤",
      "Bấm nút màu hồng kìa 👉"
    ];
    return phrases[Math.min(noCount, phrases.length - 1)];
  };

  // --- LOGIC: GỬI DỮ LIỆU NGẦM VỀ EMAIL (FORMSPREE) ---
  const sendDataToFormspree = async (finalData) => {
    try {
      await fetch("https://formspree.io/f/xnpqvgjo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          "Khách VIP": "Ngọc Anh Thư",
          "Hoạt động": finalData.activity,
          "Địa điểm": finalData.location,
          "Đồ ăn": finalData.food,
          "Thời gian": finalData.time,
          "Lời nhắn": "Ting ting! Bé iu đã chốt lịch hẹn 2 năm 💕"
        })
      });
    } catch (error) {
      console.error("Lỗi gửi dữ liệu:", error);
    }
  };

  // --- LOGIC: CHỌN CÁC BƯỚC ---
  const handleSelect = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setStep(step + 1);
  };

  const handleTimeSelect = (type) => {
    if (type === 'custom') {
      setShowDatePicker(true);
    } else {
      const newData = { ...formData, time: type };
      setFormData(newData);
      sendDataToFormspree(newData); 
      setStep(step + 1);
    }
  };

  const confirmCustomDate = () => {
    if (customDate) {
      const [year, month, day] = customDate.split('-');
      const formattedDate = `${day}/${month}/${year}`;
      const newData = { ...formData, time: formattedDate };
      
      setFormData(newData);
      sendDataToFormspree(newData);
      
      setShowDatePicker(false);
      setStep(step + 1);
    }
  };

  // --- LOGIC: ÂM NHẠC ---
  const handleYesClick = () => {
    setStep(2);
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.log("Trình duyệt chặn autoplay", e));
      setIsPlaying(true);
    }
  };

  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
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
    toggleMusic
  };
};