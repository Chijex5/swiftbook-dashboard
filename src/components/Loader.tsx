import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const loadingMessages = [
  "Organizing your library...",
  "Fetching knowledge...",
  "Preparing your books...",
  "Sharpening the quills...",
  "Arranging chapters...",
  "Fueling the imagination...",
];

const PageLoader = () => {
  const [currentMessage, setCurrentMessage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % loadingMessages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-50 to-white z-50 flex items-center justify-center">
      <div className="relative w-64 h-64">
        {/* Main Logo Animation */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, loop: Infinity, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 375 375"
            className="w-full h-full"
          >
            {/* Purple Base */}
            <g style={{ clipPath: 'url(#ec87442ccf)' }}>
              <motion.path
                fill="#9333ea"
                d="M90.9 302.8L107.5 311.4V103.5L189 58.36l15.76 8.9 62.72 35.16v16.4L254.5 125.7 202.9 153.2l-15.5 8.26-23.05-11.9-11.83-5.47-14.26-7.4v39.56l14.9 7.61 33.45 17.37 15.65-8.36 50.82-26.37 36.88-19.62 11.68-6.22V81.73L204.86 26.95 189.1 18.16 72.36 82.8v210.46l18.44 9.53z"
                animate={{
                  fill: ["#9333ea", "#7e22ce", "#9333ea"],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </g>

            {/* Middle Section */}
            <g style={{ clipPath: 'url(#c619cab79a)' }}>
              <motion.path
                fill="#9333ea"
                d="M302.6 176.93l-14.7 7.83-96.17 51.35-4.4 2.36-18.33-9.43-30.8-15.56v39.56l48.35 24.54 4.4-2.36 110.64-58.97z"
                initial={{ opacity: 0.8 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </g>

            {/* Top Section */}
            <g style={{ clipPath: 'url(#58894668e8)' }}>
              <motion.path
                fill="#9333ea"
                d="M139.25 288.22v39.56l48.35 24.54 115.04-61.33V251.55L187.39 313.09z"
                initial={{ y: 0 }}
                animate={{ y: -5 }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  yoyo: Infinity,
                  ease: "easeInOut",
                }}
              />
            </g>
          </svg>
        </motion.div>

        {/* Pulsing Glow */}
        <motion.div
          className="absolute inset-0 bg-purple-200 rounded-full blur-xl opacity-30"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1.2 }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Dynamic Text */}
        <AnimatePresence mode='wait'>
          <motion.div
            key={currentMessage}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute -bottom-20 w-full text-center text-purple-600 font-medium"
          >
            {loadingMessages[currentMessage]}
          </motion.div>
        </AnimatePresence>

        {/* Subtle Particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-400 rounded-full"
            initial={{
              scale: 0,
              x: Math.cos((i * 45 * Math.PI) / 180) * 40,
              y: Math.sin((i * 45 * Math.PI) / 180) * 40,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              delay: i * 0.1,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
    </div>
  );
};

export default PageLoader;