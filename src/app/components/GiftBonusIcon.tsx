import { motion } from "motion/react";
import giftImage from "figma:asset/08dbcace03843f3d60f9be03865be6b5ef368abe.png";

interface IconProps {
  size?: number;
  className?: string;
}

// ============================================
// БОНУСНЫЙ МОДУЛЬ — 3D Подарок
// ============================================
export const BonusIcon = ({ size = 24, className = "" }: IconProps) => {
  return (
    <div 
      className={className}
      style={{
        width: size,
        height: size,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'transparent',
      }}
    >
      {/* Само подарок - основное изображение с прозрачным фоном */}
      <motion.img
        src={giftImage}
        alt="Gift box"
        style={{
          width: size * 0.9,
          height: size * 0.9,
          position: 'relative',
          zIndex: 2,
          filter: 'drop-shadow(0 2px 8px rgba(236, 72, 153, 0.4))',
          objectFit: 'contain',
          background: 'transparent',
        }}
        animate={{
          filter: [
            'drop-shadow(0 2px 8px rgba(236, 72, 153, 0.4))',
            'drop-shadow(0 4px 12px rgba(236, 72, 153, 0.6))',
            'drop-shadow(0 2px 8px rgba(236, 72, 153, 0.4))',
          ],
          y: [0, -3, 0],
          rotate: [-2, 2, -2],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      {/* Звездная пыль вокруг подарка */}
      {[...Array(30)].map((_, i) => {
        const angle = (i * 12 * Math.PI) / 180;
        const distance = size * (0.35 + Math.random() * 0.15);
        const x = size / 2 + Math.cos(angle) * distance;
        const y = size / 2 + Math.sin(angle) * distance;
        const colors = ['#ec4899', '#f472b6', '#f9a8d4', '#a855f7', '#c084fc'];
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
                fill={i % 2 === 0 ? '#f9a8d4' : '#ec4899'}
              />
            </svg>
          </motion.div>
        );
      })}
      
      {/* Мерцающее свечение вокруг */}
      <motion.div
        style={{
          position: 'absolute',
          width: size * 0.7,
          height: size * 0.7,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(236, 72, 153, 0.2) 0%, rgba(236, 72, 153, 0) 70%)',
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
    </div>
  );
};