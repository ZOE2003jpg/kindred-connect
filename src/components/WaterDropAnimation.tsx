import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Drop {
  id: number;
  x: number;
  delay: number;
}

interface Ripple {
  id: number;
  x: number;
  y: number;
}

const WaterDropAnimation = () => {
  const [drops, setDrops] = useState<Drop[]>([]);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const dropIdRef = useRef(0);
  const rippleIdRef = useRef(0);

  const createDrop = useCallback(() => {
    dropIdRef.current += 1;
    const id = dropIdRef.current;
    const x = Math.random() * 80 + 10; // 10% to 90% of screen width
    setDrops((prev) => [...prev, { id, x, delay: 0 }]);

    // Remove drop after animation completes
    setTimeout(() => {
      setDrops((prev) => prev.filter((d) => d.id !== id));
    }, 3000);
  }, []);

  const handleDropComplete = useCallback((x: number) => {
    rippleIdRef.current += 1;
    const rippleId = rippleIdRef.current;
    const y = window.innerHeight - 50; // Near bottom of screen
    setRipples((prev) => [...prev, { id: rippleId, x, y }]);

    // Remove ripple after animation
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== rippleId));
    }, 1500);
  }, []);

  useEffect(() => {
    // Create first drop after a short delay
    const initialTimeout = setTimeout(createDrop, 2000);

    // Create drops every 6-10 seconds
    const interval = setInterval(() => {
      createDrop();
    }, Math.random() * 4000 + 6000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [createDrop]);

  return (
    <div 
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 1 }}
      aria-hidden="true"
    >
      <AnimatePresence>
        {drops.map((drop) => (
          <motion.div
            key={drop.id}
            className="absolute"
            style={{ left: `${drop.x}%` }}
            initial={{ top: -20, opacity: 0.6 }}
            animate={{ top: "calc(100vh - 50px)", opacity: 0.4 }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: 2.5, 
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            onAnimationComplete={() => handleDropComplete(drop.x)}
          >
            {/* Water droplet SVG */}
            <svg
              width="12"
              height="18"
              viewBox="0 0 12 18"
              fill="none"
              className="drop-shadow-sm"
            >
              <path
                d="M6 0C6 0 0 7.5 0 11.5C0 14.8 2.7 17.5 6 17.5C9.3 17.5 12 14.8 12 11.5C12 7.5 6 0 6 0Z"
                fill="url(#dropGradient)"
                fillOpacity="0.5"
              />
              <defs>
                <linearGradient id="dropGradient" x1="6" y1="0" x2="6" y2="18" gradientUnits="userSpaceOnUse">
                  <stop stopColor="hsl(200, 80%, 70%)" />
                  <stop offset="1" stopColor="hsl(200, 70%, 50%)" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Ripple effects */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            className="absolute"
            style={{ 
              left: `${ripple.x}%`, 
              top: ripple.y,
              transform: "translate(-50%, -50%)"
            }}
            initial={{ scale: 0, opacity: 0.6 }}
            animate={{ scale: 3, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <div className="relative">
              {/* Outer ripple */}
              <motion.div
                className="absolute w-8 h-8 rounded-full border border-[hsl(200,70%,60%)]/30"
                style={{ transform: "translate(-50%, -50%)" }}
                initial={{ scale: 0, opacity: 0.5 }}
                animate={{ scale: 2.5, opacity: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
              {/* Inner ripple */}
              <motion.div
                className="absolute w-6 h-6 rounded-full border border-[hsl(200,70%,60%)]/40"
                style={{ transform: "translate(-50%, -50%)" }}
                initial={{ scale: 0, opacity: 0.6 }}
                animate={{ scale: 2, opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
              />
              {/* Center splash */}
              <motion.div
                className="absolute w-3 h-3 rounded-full bg-[hsl(200,70%,70%)]/20"
                style={{ transform: "translate(-50%, -50%)" }}
                initial={{ scale: 1, opacity: 0.4 }}
                animate={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default WaterDropAnimation;
