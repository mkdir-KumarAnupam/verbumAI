import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Zap } from 'lucide-react';

const cards = [
  { text: 'Hello', translation: 'नमस्ते', language: 'Hindi', color: 'from-purple-500 to-pink-500' },
  { text: 'Bonjour', translation: 'Hello', language: 'French', color: 'from-blue-500 to-purple-500' },
  { text: 'Hola', translation: 'Hello', language: 'Spanish', color: 'from-indigo-500 to-blue-500' },
  { text: '你好', translation: 'Hello', language: 'Chinese', color: 'from-violet-500 to-fuchsia-500' },
  { text: 'こんにちは', translation: 'Hello', language: 'Japanese', color: 'from-pink-500 to-rose-500' },
  { text: 'Ciao', translation: 'Hello', language: 'Italian', color: 'from-fuchsia-500 to-purple-500' },
];

function CardStack() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);
  const [direction, setDirection] = useState(1); // 1 for down, -1 for up

  useEffect(() => {
    if (!autoPlay) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % cards.length);
      setDirection(Math.random() > 0.5 ? 1 : -1);
    }, 3000);

    return () => clearInterval(timer);
  }, [autoPlay]);

  const handleCardClick = () => {
    setAutoPlay(false);
    setCurrentIndex((prev) => (prev + 1) % cards.length);
    setDirection(Math.random() > 0.5 ? 1 : -1);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-8">
      <div className="w-full max-w-4xl mx-auto">
        <div className="relative w-full aspect-[16/9]">
          <div className="absolute inset-0 flex items-center justify-center">
            <div 
              className="w-[90%] aspect-[3/2] relative"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={handleCardClick}
            >
              <AnimatePresence mode="popLayout">
                {cards.map((card, index) => {
                  const isActive = index === currentIndex;
                  const zIndex = cards.length - Math.abs(currentIndex - index);
                  const offset = Math.abs(currentIndex - index);

                  return (
                    <motion.div
                      key={card.text}
                      initial={{ 
                        scale: 0.7,
                        opacity: 0,
                        y: direction * -300,
                        rotateX: direction * 45,
                      }}
                      animate={{
                        scale: isActive ? 1 : 0.85 - (offset * 0.05),
                        opacity: isActive ? 1 : 0,
                        y: isActive ? 0 : direction * 300,
                        rotateX: isActive ? 0 : direction * -45,
                        x: isActive ? 0 : (Math.random() - 0.5) * 50,
                      }}
                      exit={{ 
                        scale: 0.7,
                        opacity: 0,
                        y: direction * 300,
                        rotateX: direction * 45,
                      }}
                      transition={{ 
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                        mass: 1,
                      }}
                      style={{ 
                        zIndex,
                        cursor: 'pointer',
                        perspective: '1200px',
                        transformStyle: 'preserve-3d'
                      }}
                      className="absolute inset-0"
                      whileHover={{ 
                        scale: isActive ? 1.05 : 0.9,
                        rotateX: isActive ? -5 : 0,
                      }}
                    >
                      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${card.color} opacity-10`} />
                      <div className="absolute inset-0 rounded-2xl bg-black shadow-[0_0_50px_rgba(0,0,0,0.7)] border border-white/10">
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                          {isActive && (
                            <>
                              <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0 }}
                                transition={{ delay: 0.2 }}
                                className="absolute top-4 right-4 flex gap-2"
                              >
                                <Sparkles className="w-6 h-6 text-purple-400" />
                                <Zap className="w-6 h-6 text-purple-400" />
                              </motion.div>
                              
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.5 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0"
                              >
                                <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-purple-500/30 rounded-tl-2xl" />
                                <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-purple-500/30 rounded-br-2xl" />
                              </motion.div>
                            </>
                          )}
                          
                          <motion.span 
                            className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-300 to-white mb-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ delay: 0.1 }}
                          >
                            {card.text}
                          </motion.span>
                          
                          <motion.span 
                            className="text-4xl text-purple-400 font-medium"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ delay: 0.2 }}
                          >
                            {card.translation}
                          </motion.span>
                          
                          <motion.span 
                            className="text-sm text-gray-400 mt-4 font-medium tracking-wide"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ delay: 0.3 }}
                          >
                            {card.language}
                          </motion.span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardStack;