import { motion } from "motion/react";
import giftImage from "@/assets/d588091c9c2323d4d39714814a6797311b9937d4.png";

interface IconProps {
  size?: number;
  className?: string;
}

// ============================================
// БОНУСНЫЙ МОДУЛЬ — 3D Подарок
// Стиль идентичен TreasureChestIcon (весы):
//   контейнер size × size, изображение 0.9×,
//   30 частиц пыли, 8 искр, 2 слоя свечения
// Внутренний множитель 1.15× компенсирует
// визуально меньший PNG подарка.
// ============================================
export const BonusIcon = ({ size = 24, className = "" }: IconProps) => {
  const s = size * 1.45;
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
      {/* Подарок — основное изображение */}
      <motion.img
        src={giftImage}
        alt="Gift box"
        style={{
          width: s * 0.9,
          height: s * 0.9,
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
          y: [0, -2, 0],
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
        const distance = s * (0.35 + Math.random() * 0.15);
        const x = s / 2 + Math.cos(angle) * distance;
        const y = s / 2 + Math.sin(angle) * distance;
        const colors = ['#8C2F5E', '#B54D7D', '#D1C4E9', '#583B8B', '#D1C4E9'];
        const color = colors[i % colors.length];
        
        return (
          <motion.div
            key={`dust${i}`}
            style={{
              position: 'absolute',
              left: x,
              top: y,
              width: s * 0.03,
              height: s * 0.03,
              borderRadius: '50%',
              background: color,
              boxShadow: `0 0 ${s * 0.2}px ${color}`,
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
        const distance = s * 0.45;
        const x = s / 2 + Math.cos(angle) * distance;
        const y = s / 2 + Math.sin(angle) * distance;
        
        return (
          <motion.div
            key={`spark${i}`}
            style={{
              position: 'absolute',
              left: x,
              top: y,
              width: s * 0.1,
              height: s * 0.1,
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
                fill={i % 2 === 0 ? '#D1C4E9' : '#8C2F5E'}
              />
            </svg>
          </motion.div>
        );
      })}
      
      {/* Мерцающее розовое свечение вокруг */}
      <motion.div
        style={{
          position: 'absolute',
          width: s * 0.7,
          height: s * 0.7,
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
      
      {/* Дополнительное фиолетовое свечение */}
      <motion.div
        style={{
          position: 'absolute',
          width: s * 0.8,
          height: s * 0.8,
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