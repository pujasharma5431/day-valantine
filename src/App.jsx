import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Lock, Gift, Star, Calendar, Music, Coffee, Moon, Sun, Camera } from 'lucide-react';
import confetti from 'canvas-confetti';
import './App.css';

// --- Components ---

const FloatingHearts = () => {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newHeart = {
        id: Date.now(),
        left: Math.random() * 100,
        size: Math.floor(Math.random() * 20) + 10,
        duration: Math.random() * 3 + 3
      };
      setHearts(prev => [...prev.slice(-20), newHeart]);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {hearts.map(heart => (
        <motion.div
          key={heart.id}
          initial={{ y: '100vh', opacity: 0, x: `${heart.left}vw` }}
          animate={{ y: '-10vh', opacity: [0, 0.8, 0], rotate: 360 }}
          transition={{ duration: heart.duration, ease: 'linear' }}
          className="absolute"
        >
          <Heart size={heart.size} fill="#ff4d6d" color="#ff4d6d" />
        </motion.div>
      ))}
    </div>
  );
};

const SuccessPage = () => {
  const navigate = useNavigate();
  const [noButtonStyle, setNoButtonStyle] = useState({});
  const [yesSize, setYesSize] = useState(1);
  const [currentNoMessage, setCurrentNoMessage] = useState("No 😢");

  const noMessages = [
    "Are you sure? 🥺",
    "Think again... 🌹",
    "But I love you so much! ❤️",
    "Don't do this to me... 💔",
    "You're my everything! ✨",
    "I'll give you all my attention! 💖",
    "Please say yes to me! 🥺",
    "Pleaaaase? 🌸",
    "You're breaking my heart 😭",
    "Just say yes! 💖",
    "I'll be yours forever! 💍",
    "My heart belongs to you... 💓"
  ];

  const handleNoClick = () => {
    // Calculate random position but keep it within comfortable viewport area
    // Use 20% margin from edges to keep it visible
    const margin = 20;
    const randomX = Math.floor(Math.random() * (100 - margin * 2)) + margin;
    const randomY = Math.floor(Math.random() * (100 - margin * 2)) + margin;

    setNoButtonStyle({
      position: 'fixed',
      left: `${randomX}%`,
      top: `${randomY}%`,
      transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
      zIndex: 1000,
      transform: 'translate(-50%, -50%)' // Center it on its position
    });

    setYesSize(prev => prev + 0.25);

    // Pick a random message
    const randomMsg = noMessages[Math.floor(Math.random() * noMessages.length)];
    setCurrentNoMessage(randomMsg);
  };

  const handleYesClick = () => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff4d6d', '#ff758f', '#ffccd5']
    });
    setTimeout(() => {
      navigate('/journey');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative z-10">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="glass p-10 text-center max-w-md w-full"
      >
        <img
          src="https://media.tenor.com/tE0_q-1_JmUAAAAi/milk-and-mocha-bear.gif"
          alt="Cute Bear"
          className="w-48 h-48 mx-auto mb-6 rounded-lg"
        />
        <h1 className="text-4xl md:text-5xl mb-6 text-[#ff4d6d]">Will you be my Valentine, Garima?</h1>
        <p className="mb-8 text-lg opacity-80">To my gorgeous love, you make every day feel like Valentine's Day. But I'd love to make this week extra special for you. ❤️</p>

        <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            style={{
              transform: `scale(${yesSize})`,
              transition: 'transform 0.3s ease'
            }}
            onClick={handleYesClick}
            className="btn-primary text-xl z-20"
          >
            Yes! 💖
          </motion.button>

          <button
            style={noButtonStyle}
            onClick={handleNoClick}
            onMouseEnter={handleNoClick}
            className="btn-secondary text-lg whitespace-nowrap"
          >
            {currentNoMessage}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const JourneyPage = () => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [revealGift, setRevealGift] = useState(false);

  const surprises = [
    {
      day: 1,
      name: "Rose Day",
      date: "Feb 7",
      icon: <Star className="text-pink-500" />,
      message: "Garima, among all the roses in the world, you're the only one I want to pick every single day. 🌹",
      quote: "I saw that you were perfect, and so I loved you. Then I saw that you were not perfect and I loved you even more. — Angelita Lim",
      realDate: new Date('2026-02-07')
    },
    {
      day: 2,
      name: "Propose Day",
      date: "Feb 8",
      icon: <Calendar className="text-red-500" />,
      message: "Garima, I don't just want to be your Prince for a day, I want to be your 'forever'. Will you keep choosing me? 💍",
      quote: "In all the world, there is no heart for me like yours. — Maya Angelou",
      realDate: new Date('2026-02-08')
    },
    {
      day: 3,
      name: "Chocolate Day",
      date: "Feb 9",
      icon: <Coffee className="text-amber-700" />,
      message: "Life with you is sweeter than any chocolate, Garima. You're the sweetness in my soul. 🍫",
      quote: "Everything is better with you. Even the simplest chocolate tastes like a dream with you by my side.",
      realDate: new Date('2026-02-09')
    },
    {
      day: 4,
      name: "Teddy Day",
      date: "Feb 10",
      icon: <Gift className="text-orange-400" />,
      message: "Whenever I'm not there to hold you tight, Garima, let this digital hug remind you I'm always here. 🧸",
      quote: "If I had a flower for every time I thought of you... I could walk through my garden forever. — Alfred Tennyson",
      realDate: new Date('2026-02-10')
    },
    {
      day: 5,
      name: "Promise Day",
      date: "Feb 11",
      icon: <Music className="text-blue-500" />,
      message: "I promise to always protect your smile and hold your hand, Garima, through every high and low. 🤝",
      quote: "I love you not only for what you are, but for what I am when I am with you.",
      realDate: new Date('2026-02-11')
    },
    {
      day: 6,
      name: "Hug Day",
      date: "Feb 12",
      icon: <Sun className="text-yellow-500" />,
      message: "Garima, a hug from you is the only place in the world where I truly feel at home. 🤗",
      quote: "Your arms feel more like home than any house ever did.",
      realDate: new Date('2026-02-12')
    },
    {
      day: 7,
      name: "Kiss Day",
      date: "Feb 13",
      icon: <Moon className="text-purple-500" />,
      message: "Every kiss shared between us, Garima, is a beautiful story written in the stars. 💋",
      quote: "You are my heart, my life, my one and only thought. — Arthur Conan Doyle",
      realDate: new Date('2026-02-13')
    },
    {
      day: 8,
      name: "Valentine's Day",
      date: "Feb 14",
      icon: <Heart className="text-red-600" />,
      message: "Garima, you are my dream come true and the best thing that ever happened to me. Happy Valentine's Day! 👑❤️",
      quote: "I love you because the entire universe conspired to help me find you. — Paulo Coelho",
      realDate: new Date('2026-02-14')
    }
  ];

  const today = new Date();
  // For testing, if it's before Feb 7, we might want to unlock everything or show locks.
  // The user says today is Feb 7.

  const isLocked = (date) => {
    // Current time: 2026-02-07 22:57
    // Adjust for testing: if today is Feb 7, day 1 is open.
    return today < date;
  };

  return (
    <div className="min-h-screen py-10 px-4 z-10 relative">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl text-[#ff4d6d] drop-shadow-sm mb-4">Garima & Prince</h1>
          <p className="text-lg opacity-70">A beautiful journey made just for you...</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {surprises.map((s, idx) => {
            const locked = isLocked(s.realDate);
            return (
              <motion.div
                key={s.day}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={!locked ? { scale: 1.05, rotate: 2 } : {}}
                whileTap={!locked ? { scale: 0.95 } : {}}
                onClick={() => !locked && setSelectedDay(s)}
                className={`glass p-6 flex flex-col items-center justify-center cursor-pointer relative overflow-hidden h-48 text-center ${locked ? 'opacity-60 grayscale' : 'hover:border-[#ff4d6d]'}`}
              >
                {locked && <Lock className="absolute top-3 right-3 opacity-30" size={18} />}
                <div className="mb-4 bg-white/50 p-3 rounded-full">
                  {locked ? <Lock size={32} className="text-gray-400" /> : s.icon}
                </div>
                <h3 className="font-bold text-xl mb-1">{s.name}</h3>
                <p className="text-sm opacity-60 font-medium">{s.date}</p>
                {!locked && <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute bottom-2 right-2"><Star size={12} className="text-yellow-400 fill-yellow-400" /></motion.div>}
              </motion.div>
            );
          })}
        </div>

        <AnimatePresence>
          {selectedDay && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
              onClick={() => { setSelectedDay(null); setRevealGift(false); }}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="glass max-w-lg w-full p-8 text-center relative pointer-events-auto shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="absolute top-4 right-4 text-2xl hover:text-[#ff4d6d]"
                  onClick={() => { setSelectedDay(null); setRevealGift(false); }}
                >
                  ✕
                </button>
                <div className="mb-6 inline-block p-4 bg-[#ffccd5] rounded-full">
                  {selectedDay.icon}
                </div>
                <h2 className="text-3xl mb-4 text-[#ff4d6d]">{selectedDay.name}</h2>
                <p className="text-xl italic mb-8 leading-relaxed">"{selectedDay.message}"</p>

                {!revealGift ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setRevealGift(true);
                      confetti({ particleCount: 100, spread: 60, colors: ['#ff4d6d', '#ffccd5'] });
                    }}
                    className="btn-primary w-full flex items-center justify-center gap-2 py-4"
                  >
                    💌 Read a special message
                  </motion.button>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col gap-6"
                  >
                    <div className="p-6 bg-white/40 rounded-xl border border-pink-200">
                      <p className="romantic-font text-3xl text-[#c9184a] leading-relaxed">
                        {selectedDay.quote}
                      </p>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <div className="relative min-h-screen overflow-hidden">
        <FloatingHearts />
        <Routes>
          <Route path="/" element={<SuccessPage />} />
          <Route path="/journey" element={<JourneyPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
