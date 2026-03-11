import { motion } from "motion/react";
import scalesImage from "figma:asset/02aeb3195ab0bcd3d204ed239de56cc227eedcca.png";

interface IconProps {
  size?: number;
  className?: string;
}

// ============================================
// ТЕХНОЛОГИЯ ПРОДАЖ — Весы с аметистами и шестерёнками
// ============================================
export const SalesIcon = ({ size = 24, className = "" }: IconProps) => {
  const s = size * 1.15;
  return (
    <div 
      className={className}
      style={{
        width: s,
        height: s,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'transparent',
      }}
    >
      {/* Весы - основное изображение */}
      <motion.img
        src={scalesImage}
        alt="Scales with crystals"
        style={{
          width: size * 0.9,
          height: size * 0.9,
          position: 'relative',
          zIndex: 2,
          filter: 'drop-shadow(0 2px 8px rgba(168, 85, 247, 0.4))',
          objectFit: 'contain',
          background: 'transparent',
        }}
        animate={{
          filter: [
            'drop-shadow(0 2px 8px rgba(168, 85, 247, 0.4))',
            'drop-shadow(0 4px 12px rgba(168, 85, 247, 0.6))',
            'drop-shadow(0 2px 8px rgba(168, 85, 247, 0.4))',
          ],
          y: [0, -2, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      {/* Звездная пыль вокруг */}
      {[...Array(30)].map((_, i) => {
        const angle = (i * 12 * Math.PI) / 180;
        const distance = size * (0.35 + Math.random() * 0.15);
        const x = size / 2 + Math.cos(angle) * distance;
        const y = size / 2 + Math.sin(angle) * distance;
        const colors = ['#C9A96E', '#fde68a', '#f59e0b', '#583B8B', '#D1C4E9'];
        const color = colors[i % colors.length];
        
        return (
          <motion.div
            key={`dust${i}`}
            style={{
              position: 'absolute',
              left: x,
              top: y,
              width: size * 0.03,
              height: size * 0.03,
              borderRadius: '50%',
              background: color,
              boxShadow: `0 0 ${size * 0.2}px ${color}`,
            }}
            animate={{
              opacity: [0, 0.9, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 2.5 + Math.random() * 1.5,
              repeat: Infinity,
              delay: i * 0.08,
            }}
          />
        );
      })}
      
      {/* Крупные магические искры */}
      {[...Array(8)].map((_, i) => {
        const angle = (i * 45 * Math.PI) / 180;
        const distance = size * 0.45;
        const x = size / 2 + Math.cos(angle) * distance;
        const y = size / 2 + Math.sin(angle) * distance;
        
        return (
          <motion.div
            key={`spark${i}`}
            style={{
              position: 'absolute',
              left: x,
              top: y,
              width: size * 0.1,
              height: size * 0.1,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.8, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.4,
            }}
          >
            <svg width="100%" height="100%" viewBox="0 0 10 10">
              <path
                d="M5 0 L5.5 4.5 L10 5 L5.5 5.5 L5 10 L4.5 5.5 L0 5 L4.5 4.5 Z"
                fill={i % 2 === 0 ? '#C9A96E' : '#583B8B'}
              />
            </svg>
          </motion.div>
        );
      })}
      
      {/* Мерцающее золотое свечение вокруг */}
      <motion.div
        style={{
          position: 'absolute',
          width: size * 0.7,
          height: size * 0.7,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(251, 191, 36, 0.2) 0%, rgba(251, 191, 36, 0) 70%)',
          zIndex: 1,
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
      />
      
      {/* Дополнительное фиолетовое свечение */}
      <motion.div
        style={{
          position: 'absolute',
          width: size * 0.8,
          height: size * 0.8,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, rgba(168, 85, 247, 0) 70%)',
          zIndex: 0,
        }}
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          delay: 0.5,
        }}
      />
    </div>
  );
};