// import { useState, useRef, useEffect } from 'react';

// export const useDateInvitationLogic = () => {
//   const [step, setStep] = useState(1);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [noButtonStyle, setNoButtonStyle] = useState({});
//   const [windowDimensions, setWindowDimensions] = useState({ width: 0, height: 0 });
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [customDate, setCustomDate] = useState('');
  
//   const audioRef = useRef(null);

//   const [formData, setFormData] = useState({
//     activity: '',
//     location: '',
//     food: '',
//     time: ''
//   });

//   useEffect(() => {
//     setWindowDimensions({ width: window.innerWidth, height: window.innerHeight });
//   }, []);

//   const handleNoHover = () => {
//     const x = Math.random() * 70 + 10; 
//     const y = Math.random() * 70 + 10;
//     setNoButtonStyle({
//       position: 'absolute',
//       left: `${x}%`,
//       top: `${y}%`,
//       transition: 'all 0.2s ease'
//     });
//   };

//   const handleSelect = (field, value) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
//     setStep(step + 1);
//   };

//   const handleTimeSelect = (type) => {
//     if (type === 'custom') {
//       setShowDatePicker(true);
//     } else {
//       handleSelect('time', type);
//     }
//   };

//   const confirmCustomDate = () => {
//     if (customDate) {
//       const [year, month, day] = customDate.split('-');
//       handleSelect('time', `${day}/${month}/${year}`);
//       setShowDatePicker(false);
//     }
//   };

//   const handleYesClick = () => {
//     setStep(2);
//     if (audioRef.current) {
//       audioRef.current.play();
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
//     noButtonStyle,
//     windowDimensions,
//     formData,
//     audioRef,
//     showDatePicker,
//     setShowDatePicker,
//     customDate,
//     setCustomDate,
//     handleNoHover,
//     handleSelect,
//     handleTimeSelect,
//     confirmCustomDate,
//     handleYesClick,
//     toggleMusic
//   };
// };

import { useState, useRef, useEffect } from 'react';

export const useDateInvitationLogic = () => {
  const [step, setStep] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [windowDimensions, setWindowDimensions] = useState({ width: 0, height: 0 });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [customDate, setCustomDate] = useState('');
  
  // State đếm số lần bấm/chạm nút "Không"
  const [noCount, setNoCount] = useState(0);
  const [noButtonStyle, setNoButtonStyle] = useState({});
  
  const audioRef = useRef(null);

  const [formData, setFormData] = useState({
    activity: '',
    location: '',
    food: '',
    time: ''
  });

  useEffect(() => {
    setWindowDimensions({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  // Vừa đếm số lần (để nút Có to lên), vừa chạy trốn
  const handleNoInteraction = () => {
    setNoCount(prev => prev + 1);
    
    // Giới hạn chạy ngẫu nhiên trong khoảng 10% đến 80% màn hình
    const x = Math.random() * 70 + 10; 
    const y = Math.random() * 70 + 10;
    setNoButtonStyle({
      position: 'fixed', // Dùng fixed để chạy trốn khắp cả màn hình
      left: `${x}%`,
      top: `${y}%`,
      transition: 'all 0.2s ease',
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
      "Bấm nút kia kìa 👉"
    ];
    return phrases[Math.min(noCount, phrases.length - 1)];
  };

  const handleSelect = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setStep(step + 1);
  };

  const handleTimeSelect = (type) => {
    if (type === 'custom') {
      setShowDatePicker(true);
    } else {
      handleSelect('time', type);
    }
  };

  const confirmCustomDate = () => {
    if (customDate) {
      const [year, month, day] = customDate.split('-');
      handleSelect('time', `${day}/${month}/${year}`);
      setShowDatePicker(false);
    }
  };

  const handleYesClick = () => {
    setStep(2);
    if (audioRef.current) {
      audioRef.current.play();
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