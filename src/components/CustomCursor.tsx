import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'motion/react';
import { Sun } from 'lucide-react';

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for the outer ring
  const springConfig = { damping: 25, stiffness: 250 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('button') || 
        target.closest('a') ||
        target.getAttribute('role') === 'button';
      
      setIsHovering(!!isInteractive);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] hidden lg:block">
      {/* Solar Glow Effect */}
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovering ? 3.5 : 1.5,
          opacity: isHovering ? 0.4 : 0.1,
          backgroundColor: '#255dad', // Constant Brand Blue
        }}
        className="w-32 h-32 rounded-full blur-3xl absolute"
      />

      {/* Outer Corona / Ring */}
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovering ? 2 : 1.2,
          borderColor: '#255dad',
          borderStyle: isHovering ? 'dashed' : 'solid',
          rotate: isHovering ? 180 : 0,
          opacity: isHovering ? 0.6 : 0.4,
        }}
        transition={{ 
          type: 'spring', 
          damping: 20, 
          stiffness: 300, 
          mass: 0.5,
          rotate: { duration: 10, repeat: Infinity, ease: "linear" }
        }}
        className="w-12 h-12 border-2 rounded-full absolute"
      />
      
      {/* WSE Solar Icon (Sun) */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          rotate: 360,
          color: '#255dad',
          filter: isHovering ? 'drop-shadow(0 0 8px rgba(37, 93, 173, 0.8))' : 'none',
        }}
        transition={{
          rotate: { duration: 8, repeat: Infinity, ease: "linear" },
          scale: { type: 'spring', stiffness: 400, damping: 10 }
        }}
        className="absolute flex items-center justify-center"
      >
        <Sun size={isHovering ? 32 : 20} strokeWidth={2.5} />
      </motion.div>

      {/* Center Precision Point */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovering ? 0 : 1,
          backgroundColor: '#255dad',
        }}
        className="w-1 h-1 rounded-full absolute"
      />
    </div>
  );
};

export default CustomCursor;
