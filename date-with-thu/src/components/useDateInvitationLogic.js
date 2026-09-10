import { useState, useRef, useEffect } from 'react';

export const useDateInvitationLogic = () => {
  const [step, setStep] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [windowDimensions, setWindowDimensions] = useState({ width: 0, height: 0 });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [customDate, setCustomDate] = useState('');
  
  const [noCount, setNoCount] = useState(0);
  const [noButtonStyle, setNoButtonStyle] = useState({});
  
  const [formData, setFormData] = useState({
    distance: '',
    activity: '',
    location: '',
    food: '',    
    time: ''     
  });

  const audioRef = useRef(null);

  useEffect(() => {
    setWindowDimensions({ width: window.innerWidth, height: window.innerHeight });
  }, []);

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

  const handleNoInteraction = () => {
    setNoCount(prev => prev + 1);
    const x = Math.random() * (window.innerWidth - 150);
    const y = Math.random() * (window.innerHeight - 50);
    setNoButtonStyle({ position: 'absolute', left: `${x}px`, top: `${y}px` });
  };

  const handleYesClick = () => {
    setStep(2); 
    if (audioRef.current) {
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const handleSelect = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setStep(prevStep => prevStep + 1);
  };


  const sendToGmail = async (finalData) => {
    const formUrl = 'https://formspree.io/f/xnpqvgjo';

    try {
      const response = await fetch(formUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          "Chủ đề": "💌 YAYYY! Đã chốt kèo hẹn hò 2 năm!",
          "Khách VIP": "Ngọc Anh Thư",
          "Lựa chọn khoảng cách": finalData.distance,
          "Hoạt động": finalData.activity,
          "Địa điểm": finalData.location,
          "Món ăn": finalData.food,
          "Thời gian chốt": finalData.time,
        })
      });

      if (response.ok) {
        console.log("Đã gửi thông tin về Gmail thành công!");
      }
    } catch (error) {
      console.error("Lỗi khi gửi email:", error);
    }
  };

  const handleTimeSelect = (value) => {
    if (value === 'custom') {
      setShowDatePicker(true);
    } else {
      const finalData = { ...formData, time: value };
      setFormData(finalData); 
      sendToGmail(finalData); 
      setStep(7); 
    }
  };

  const confirmCustomDate = () => {
    if (customDate) {
      const parts = customDate.split('-');
      const formattedDate = `${parts[2]}/${parts[1]}/${parts[0]}`;
      
      const finalData = { ...formData, time: formattedDate };
      setFormData(finalData); 
      sendToGmail(finalData); 
      
      setShowDatePicker(false);
      setStep(7); 
    }
  };

  const handleBack = () => {
    if (showDatePicker) {
      setShowDatePicker(false);
      return;
    }
    setStep((prevStep) => (prevStep > 1 ? prevStep - 1 : 1));
  };

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