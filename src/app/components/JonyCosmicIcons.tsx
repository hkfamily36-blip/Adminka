import React from 'react';
import { motion } from 'motion/react';

interface IconProps {
  size?: number;
  className?: string;
}

// ============================================
// ДЖОНИ АЙВ v2.0 — КРУПНЫЕ ФОРМЫ + ЗВЕЗДНАЯ ПЫЛЬ
// Философия: БОЛЬШАЯ узнаваемая форма + МАГИЯ вокруг
// ============================================

// Компонент звездочки (sparkle)
const Sparkle = ({ x, y, delay = 0, size = 1 }: { x: number; y: number; delay?: number; size?: number }) => (
  <motion.g
    animate={{
      opacity: [0, 1, 0],
      scale: [0, size, 0],
      rotate: [0, 180, 360],
    }}
    transition={{
      duration: 2,
      repeat: Infinity,
      delay,
      ease: "easeInOut",
    }}
    style={{ originX: `${x}px`, originY: `${y}px` }}
  >
    <path
      d={`M${x} ${y - 2 * size} L${x + 0.8 * size} ${y - 0.6 * size} L${x + 2 * size} ${y} L${x + 0.8 * size} ${y + 0.6 * size} L${x} ${y + 2 * size} L${x - 0.8 * size} ${y + 0.6 * size} L${x - 2 * size} ${y} L${x - 0.8 * size} ${y - 0.6 * size} Z`}
      fill="currentColor"
      opacity="0.9"
    />
  </motion.g>
);

// ============================================
// 0. ОБУЧЕНИЕ — КРУПНАЯ книга + Золотая звезда
// ============================================
export const LearningIcon = ({ size = 24, className = "" }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <defs>
      <linearGradient id="book-grad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#A78BFA" />
        <stop offset="100%" stopColor="#7C3AED" />
      </linearGradient>
      <linearGradient id="star-gold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FDE68A" />
        <stop offset="50%" stopColor="#FCD34D" />
        <stop offset="100%" stopColor="#F59E0B" />
      </linearGradient>
      <radialGradient id="book-glow">
        <stop offset="0%" stopColor="#C4B5FD" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#C4B5FD" stopOpacity="0" />
      </radialGradient>
    </defs>
    
    {/* Свечение */}
    <motion.circle
      cx="12" cy="12" r="11"
      fill="url(#book-glow)"
      animate={{
        scale: [1, 1.15, 1],
        opacity: [0.3, 0.5, 0.3],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
      }}
    />
    
    {/* КРУПНАЯ книга */}
    <motion.g
      animate={{
        scale: [1, 1.05, 1],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
      }}
      style={{ originX: "12px", originY: "14px" }}
    >
      {/* Левая страница */}
      <rect
        x="3" y="10" width="8" height="10" rx="1.5"
        fill="url(#book-grad)"
        stroke="#DDD6FE"
        strokeWidth="0.8"
      />
      {/* Правая страница */}
      <rect
        x="13" y="10" width="8" height="10" rx="1.5"
        fill="url(#book-grad)"
        stroke="#FFFFFF"
        strokeWidth="0.8"
        opacity="0.95"
      />
      {/* Блик на правой */}
      <rect
        x="15" y="11" width="4" height="6" rx="0.5"
        fill="white"
        opacity="0.35"
      />
      {/* Закладка */}
      <rect
        x="10.5" y="7" width="3" height="5" rx="0.8"
        fill="#F59E0B"
      />
    </motion.g>
    
    {/* КРУПНАЯ золотая звезда НАД книгой */}
    <motion.g
      animate={{
        scale: [1, 1.25, 1],
        rotate: [0, 180, 360],
      }}
      transition={{
        scale: { duration: 2, repeat: Infinity },
        rotate: { duration: 4, repeat: Infinity, ease: "linear" },
      }}
      style={{ originX: "12px", originY: "4.5px" }}
    >
      <path
        d="M12 2 L13.5 5 L17 5.5 L14.5 7.5 L15 11 L12 9 L9 11 L9.5 7.5 L7 5.5 L10.5 5 Z"
        fill="url(#star-gold)"
        stroke="#FEF3C7"
        strokeWidth="0.6"
      />
      {/* Свечение звезды */}
      <circle cx="12" cy="6.5" r="5" fill="#FCD34D" opacity="0.25" />
    </motion.g>
    
    {/* Sparkles вокруг */}
    {[...Array(8)].map((_, i) => {
      const angle = (i * 45 * Math.PI) / 180;
      const distance = 10;
      return (
        <Sparkle
          key={i}
          x={12 + Math.cos(angle) * distance}
          y={12 + Math.sin(angle) * distance}
          delay={i * 0.25}
          size={1}
        />
      );
    })}
    
    {/* Звездная пыль (летит вверх) */}
    {[...Array(12)].map((_, i) => {
      const spread = (Math.random() - 0.5) * 14;
      return (
        <motion.circle
          key={`dust${i}`}
          cx={12 + spread}
          cy={20}
          r="0.6"
          fill="currentColor"
          animate={{
            y: [0, -14],
            opacity: [0, 0.8, 0],
            scale: [0, 1.2, 0.5],
          }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            delay: i * 0.18,
            ease: "easeOut",
          }}
        />
      );
    })}
  </svg>
);

// ============================================
// 1. АУТЕНТИЧНОСТЬ — КРУПНЫЙ бриллиант
// ============================================
export const AuthenticityIcon = ({ size = 24, className = "" }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <defs>
      <linearGradient id="diamond-grad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#E0E7FF" />
        <stop offset="50%" stopColor="#C4B5FD" />
        <stop offset="100%" stopColor="#A78BFA" />
      </linearGradient>
      <radialGradient id="diamond-glow">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.6" />
        <stop offset="50%" stopColor="#C4B5FD" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#A78BFA" stopOpacity="0" />
      </radialGradient>
    </defs>
    
    {/* Свечение */}
    <motion.circle
      cx="12" cy="12" r="11"
      fill="url(#diamond-glow)"
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.4, 0.6, 0.4],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
      }}
    />
    
    {/* КРУПНЫЙ бриллиант */}
    <motion.g
      animate={{
        scale: [1, 1.06, 1],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
      }}
      style={{ originX: "12px", originY: "12px" }}
    >
      {/* Основная форма — БОЛЬШОЙ бриллиант */}
      <path
        d="M7 6 L12 2 L17 6 L20 11 L12 22 L4 11 Z"
        fill="url(#diamond-grad)"
        stroke="#FFFFFF"
        strokeWidth="1.2"
      />
      
      {/* Верхняя грань */}
      <path
        d="M7 6 L12 2 L17 6 L12 11 Z"
        fill="#FFFFFF"
        opacity="0.45"
      />
      
      {/* Боковые грани */}
      <path d="M4 11 L12 11 L12 22 Z" fill="#A78BFA" opacity="0.35" />
      <path d="M20 11 L12 11 L12 22 Z" fill="#C4B5FD" opacity="0.25" />
      
      {/* Центральная линия */}
      <line x1="12" y1="2" x2="12" y2="22" stroke="#DDD6FE" strokeWidth="0.6" />
      <line x1="4" y1="11" x2="20" y2="11" stroke="#DDD6FE" strokeWidth="0.6" />
      
      {/* КРУПНЫЙ блик */}
      <ellipse cx="10.5" cy="6" rx="2.5" ry="1.8" fill="white" opacity="0.7" />
    </motion.g>
    
    {/* ��ветовые лучи от граней */}
    {[0, 60, 120, 180, 240, 300].map((angle, i) => {
      const rad = (angle * Math.PI) / 180;
      return (
        <motion.line
          key={i}
          x1="12" y1="12"
          x2={12 + Math.cos(rad) * 9}
          y2={12 + Math.sin(rad) * 9}
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          animate={{
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      );
    })}
    
    {/* Sparkles по кругу */}
    {[...Array(10)].map((_, i) => {
      const angle = (i * 36 * Math.PI) / 180;
      const distance = 10.5;
      return (
        <Sparkle
          key={i}
          x={12 + Math.cos(angle) * distance}
          y={12 + Math.sin(angle) * distance}
          delay={i * 0.2}
          size={i % 2 === 0 ? 1.1 : 0.8}
        />
      );
    })}
  </svg>
);

// ============================================
// 2. ЦА — КРУПНОЕ сердце
// ============================================
export const AudienceIcon = ({ size = 24, className = "" }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <defs>
      <linearGradient id="heart-grad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FCA5A5" />
        <stop offset="50%" stopColor="#F87171" />
        <stop offset="100%" stopColor="#EF4444" />
      </linearGradient>
      <radialGradient id="heart-glow">
        <stop offset="0%" stopColor="#FCA5A5" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#FCA5A5" stopOpacity="0" />
      </radialGradient>
    </defs>
    
    {/* Свечение */}
    <motion.circle
      cx="12" cy="12" r="11"
      fill="url(#heart-glow)"
      animate={{
        scale: [1, 1.25, 1],
        opacity: [0.3, 0.5, 0.3],
      }}
      transition={{
        duration: 1.2,
        repeat: Infinity,
      }}
    />
    
    {/* Расходящиеся кольца (heartbeat) */}
    {[0, 1].map((i) => (
      <motion.path
        key={i}
        d="M12 21 C12 21 3 15 3 9 C3 5 6 3 8.5 3 C10.5 3 11.5 4.5 12 6 C12.5 4.5 13.5 3 15.5 3 C18 3 21 5 21 9 C21 15 12 21 12 21 Z"
        stroke="#FCA5A5"
        strokeWidth="0.8"
        fill="none"
        animate={{
          scale: [1, 1.3, 1.5],
          opacity: [0.5, 0.25, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          delay: i * 0.75,
        }}
        style={{ originX: "12px", originY: "12px" }}
      />
    ))}
    
    {/* КРУПНОЕ сердце */}
    <motion.path
      d="M12 21 C12 21 3 15 3 9 C3 5 6 3 8.5 3 C10.5 3 11.5 4.5 12 6 C12.5 4.5 13.5 3 15.5 3 C18 3 21 5 21 9 C21 15 12 21 12 21 Z"
      fill="url(#heart-grad)"
      stroke="#FFFFFF"
      strokeWidth="0.8"
      animate={{
        scale: [1, 1.08, 1],
      }}
      transition={{
        duration: 1.2,
        repeat: Infinity,
      }}
      style={{ originX: "12px", originY: "12px" }}
    />
    
    {/* КРУПНЫЙ блик */}
    <ellipse
      cx="8.5" cy="7.5" rx="3" ry="2.5"
      fill="white"
      opacity="0.5"
    />
    
    {/* Sparkles вокруг */}
    {[...Array(8)].map((_, i) => {
      const angle = (i * 45 * Math.PI) / 180;
      const distance = 10.5;
      return (
        <Sparkle
          key={i}
          x={12 + Math.cos(angle) * distance}
          y={12 + Math.sin(angle) * distance}
          delay={i * 0.15}
          size={0.9}
        />
      );
    })}
    
    {/* Звездная пыль поднимается */}
    {[...Array(12)].map((_, i) => {
      const spread = (Math.random() - 0.5) * 12;
      return (
        <motion.circle
          key={i}
          cx={12 + spread}
          cy={20}
          r="0.5"
          fill="currentColor"
          animate={{
            y: [0, -12],
            x: [0, spread * 0.3],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.15,
            ease: "easeOut",
          }}
        />
      );
    })}
  </svg>
);

// ============================================
// 3. ПРОДУКТЫ — КРУПНЫЙ цветок
// ============================================
export const ProductIcon = ({ size = 24, className = "" }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <defs>
      <linearGradient id="petal-grad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#F0ABFC" />
        <stop offset="100%" stopColor="#E879F9" />
      </linearGradient>
      <radialGradient id="flower-glow">
        <stop offset="0%" stopColor="#FAE8FF" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#F0ABFC" stopOpacity="0" />
      </radialGradient>
    </defs>
    
    {/* Свечение */}
    <motion.circle
      cx="12" cy="12" r="11"
      fill="url(#flower-glow)"
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.5, 0.3],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
      }}
    />
    
    {/* 5 КРУПНЫХ лепестков */}
    {[0, 72, 144, 216, 288].map((angle, i) => {
      const rad = (angle * Math.PI) / 180;
      const cx = 12 + Math.cos(rad) * 6;
      const cy = 12 + Math.sin(rad) * 6;
      
      return (
        <motion.ellipse
          key={i}
          cx={cx}
          cy={cy}
          rx="4"
          ry="5.5"
          fill="url(#petal-grad)"
          stroke="#FFFFFF"
          strokeWidth="0.8"
          transform={`rotate(${angle} ${cx} ${cy})`}
          animate={{
            opacity: [0.85, 1, 0.85],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.2,
          }}
          style={{ originX: `${cx}px`, originY: `${cy}px` }}
        />
      );
    })}
    
    {/* КРУПНЫЙ центр */}
    <motion.circle
      cx="12" cy="12" r="4"
      fill="#FCD34D"
      stroke="#FFFFFF"
      strokeWidth="0.8"
      animate={{
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
      }}
    />
    
    {/* Яркое ядро */}
    <circle cx="12" cy="12" r="2" fill="white" opacity="0.8" />
    
    {/* Sparkles на кончиках лепестков */}
    {[0, 72, 144, 216, 288].map((angle, i) => {
      const rad = (angle * Math.PI) / 180;
      return (
        <Sparkle
          key={i}
          x={12 + Math.cos(rad) * 10.5}
          y={12 + Math.sin(rad) * 10.5}
          delay={i * 0.25}
          size={1}
        />
      );
    })}
  </svg>
);

// ============================================
// 4. ВОРОНКА — КРУПНЫЙ треугольник
// ============================================
export const FunnelIcon = ({ size = 24, className = "" }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <defs>
      <linearGradient id="funnel-grad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#F472B6" />
        <stop offset="50%" stopColor="#EC4899" />
        <stop offset="100%" stopColor="#DB2777" />
      </linearGradient>
      <radialGradient id="funnel-glow">
        <stop offset="0%" stopColor="#FBCFE8" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#F472B6" stopOpacity="0" />
      </radialGradient>
    </defs>
    
    {/* Свечение сверху */}
    <motion.ellipse
      cx="12" cy="6" rx="11" ry="9"
      fill="url(#funnel-glow)"
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.5, 0.3],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
      }}
    />
    
    {/* КРУПНАЯ воронка */}
    <path
      d="M2 4 L22 4 L18 11 L17 17 L12 22 L7 17 L6 11 Z"
      fill="url(#funnel-grad)"
      stroke="#FFFFFF"
      strokeWidth="1.2"
    />
    
    {/* 3 уровня */}
    <motion.line
      x1="5" y1="7.5" x2="19" y2="7.5"
      stroke="#FFFFFF"
      strokeWidth="0.8"
      opacity="0.6"
      animate={{
        opacity: [0.4, 0.7, 0.4],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        delay: 0,
      }}
    />
    <motion.line
      x1="7" y1="11" x2="17" y2="11"
      stroke="#FFFFFF"
      strokeWidth="0.8"
      opacity="0.6"
      animate={{
        opacity: [0.4, 0.7, 0.4],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        delay: 0.3,
      }}
    />
    <motion.line
      x1="9.5" y1="15" x2="14.5" y2="15"
      stroke="#FFFFFF"
      strokeWidth="0.8"
      opacity="0.6"
      animate={{
        opacity: [0.4, 0.7, 0.4],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        delay: 0.6,
      }}
    />
    
    {/* Блик */}
    <ellipse cx="12" cy="5" rx="6" ry="1.5" fill="white" opacity="0.35" />
    
    {/* Падающая звездная пыль */}
    {[...Array(10)].map((_, i) => {
      const spread = (Math.random() - 0.5) * 10;
      return (
        <motion.circle
          key={i}
          cx={12 + spread}
          cy={4}
          r="0.6"
          fill="white"
          animate={{
            y: [0, 18],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeIn",
          }}
        />
      );
    })}
    
    {/* КРУПНАЯ звезда-результат внизу */}
    <motion.g
      animate={{
        scale: [1, 1.35, 1],
        rotate: [0, 90, 180],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
      }}
      style={{ originX: "12px", originY: "22px" }}
    >
      <path
        d="M12 19 L13.5 21 L16 21.5 L13.5 22 L12 24 L10.5 22 L8 21.5 L10.5 21 Z"
        fill="#FCD34D"
        stroke="#FFFFFF"
        strokeWidth="0.5"
      />
    </motion.g>
    
    {/* Sparkles по бокам */}
    {[...Array(6)].map((_, i) => {
      const side = i < 3 ? -1 : 1;
      const y = 7 + (i % 3) * 4;
      return (
        <Sparkle
          key={i}
          x={12 + side * 10}
          y={y}
          delay={i * 0.2}
          size={0.8}
        />
      );
    })}
  </svg>
);

// ============================================
// 5. ПРОДАЖИ — КРУПНЫЙ магнит
// ============================================
export const SalesIcon = ({ size = 24, className = "" }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <defs>
      <linearGradient id="magnet-blue" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#93C5FD" />
        <stop offset="100%" stopColor="#60A5FA" />
      </linearGradient>
      <linearGradient id="magnet-red" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FCA5A5" />
        <stop offset="100%" stopColor="#F87171" />
      </linearGradient>
      <radialGradient id="magnet-glow">
        <stop offset="0%" stopColor="#93C5FD" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#93C5FD" stopOpacity="0" />
      </radialGradient>
    </defs>
    
    {/* Магнитное поле */}
    <motion.ellipse
      cx="12" cy="11" rx="12" ry="11"
      fill="url(#magnet-glow)"
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.5, 0.3],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
      }}
    />
    
    {/* КРУПНАЯ подкова */}
    <motion.g
      animate={{
        scale: [1, 1.04, 1],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
      }}
      style={{ originX: "12px", originY: "12px" }}
    >
      {/* Левая сторона (синяя - N) */}
      <path
        d="M5 4 L5 12 C5 15 7 18 10 18"
        stroke="url(#magnet-blue)"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Правая сторона (красная - S) */}
      <path
        d="M19 4 L19 12 C19 15 17 18 14 18"
        stroke="url(#magnet-red)"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
      
      {/* Полюса */}
      <rect x="3" y="2" width="4" height="5" rx="1.5" fill="url(#magnet-blue)" />
      <rect x="17" y="2" width="4" height="5" rx="1.5" fill="url(#magnet-red)" />
      
      {/* Буквы */}
      <text x="5" y="6" fill="white" fontSize="4" fontWeight="bold">N</text>
      <text x="19" y="6" fill="white" fontSize="4" fontWeight="bold">S</text>
    </motion.g>
    
    {/* Энергетические волны */}
    {[-1, 1].map((side, i) => (
      <motion.path
        key={i}
        d={`M${12 + side * 6} 10 Q${12 + side * 9} 12 ${12 + side * 8} 15`}
        stroke="currentColor"
        strokeWidth="0.8"
        fill="none"
        animate={{
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: i * 0.5,
        }}
      />
    ))}
    
    {/* Притягиваемые КРУПНЫЕ звезды */}
    {[
      { x: 2, y: 10, targetX: 7 },
      { x: 22, y: 10, targetX: 17 },
      { x: 3, y: 14, targetX: 10 },
      { x: 21, y: 14, targetX: 14 },
    ].map((particle, i) => (
      <motion.path
        key={i}
        d={`M${particle.x} ${particle.y} L${particle.x + 1} ${particle.y - 1} L${particle.x + 2} ${particle.y} L${particle.x + 1} ${particle.y + 1} Z`}
        fill={particle.x < 12 ? "#60A5FA" : "#F87171"}
        animate={{
          x: [0, particle.targetX - particle.x],
          opacity: [1, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: i * 0.5,
        }}
      />
    ))}
    
    {/* КРУПНАЯ золотая монета (результат) */}
    <motion.g
      animate={{
        y: [0, -2, 0],
        rotate: [0, 15, -15, 0],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
      }}
      style={{ originX: "12px", originY: "21px" }}
    >
      <circle cx="12" cy="21" r="2.5" fill="#FCD34D" stroke="#F59E0B" strokeWidth="0.8" />
      <text x="12" y="22.2" textAnchor="middle" fill="#78350F" fontSize="3" fontWeight="bold">$</text>
    </motion.g>
    
    {/* Sparkles вокруг */}
    {[...Array(8)].map((_, i) => {
      const angle = (i * 45 * Math.PI) / 180;
      const distance = 10.5;
      return (
        <Sparkle
          key={i}
          x={12 + Math.cos(angle) * distance}
          y={12 + Math.sin(angle) * distance}
          delay={i * 0.15}
          size={0.8}
        />
      );
    })}
  </svg>
);

// ============================================
// 6. БЛОГ — КРУПНОЕ созвездие
// ============================================
export const BlogIcon = ({ size = 24, className = "" }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <defs>
      <linearGradient id="star-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FEF3C7" />
        <stop offset="50%" stopColor="#FCD34D" />
        <stop offset="100%" stopColor="#F59E0B" />
      </linearGradient>
      <radialGradient id="constellation-glow">
        <stop offset="0%" stopColor="#FEF3C7" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#FCD34D" stopOpacity="0" />
      </radialGradient>
    </defs>
    
    {/* Свечение */}
    <motion.circle
      cx="12" cy="12" r="11"
      fill="url(#constellation-glow)"
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.5, 0.3],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
      }}
    />
    
    {/* Созвездие (5 КРУПНЫХ точек) */}
    {[
      { x: 12, y: 5, size: 3.5 },   // центр-верх
      { x: 18, y: 10, size: 2.5 },  // право
      { x: 16, y: 17, size: 2 },    // право-низ
      { x: 8, y: 17, size: 2.5 },   // лево-низ
      { x: 6, y: 10, size: 2 },     // лево
    ].map((star, i) => (
      <motion.circle
        key={i}
        cx={star.x}
        cy={star.y}
        r={star.size}
        fill="url(#star-grad)"
        stroke="#FFFFFF"
        strokeWidth="0.5"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: i * 0.2,
        }}
      />
    ))}
    
    {/* Соединительные линии */}
    {[
      { x1: 12, y1: 5, x2: 18, y2: 10 },
      { x1: 18, y1: 10, x2: 16, y2: 17 },
      { x1: 16, y1: 17, x2: 8, y2: 17 },
      { x1: 8, y1: 17, x2: 6, y2: 10 },
      { x1: 6, y1: 10, x2: 12, y2: 5 },
    ].map((line, i) => (
      <motion.line
        key={i}
        x1={line.x1} y1={line.y1}
        x2={line.x2} y2={line.y2}
        stroke="#FDE68A"
        strokeWidth="0.8"
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: i * 0.2,
        }}
      />
    ))}
    
    {/* Sparkles ПОВСЮДУ! */}
    {[...Array(10)].map((_, i) => {
      const angle = (i * 36 * Math.PI) / 180;
      const distance = 10.5;
      return (
        <Sparkle
          key={i}
          x={12 + Math.cos(angle) * distance}
          y={12 + Math.sin(angle) * distance}
          delay={i * 0.18}
          size={i % 3 === 0 ? 1.1 : 0.8}
        />
      );
    })}
  </svg>
);

// ============================================
// 7. КОМАНДА — КРУПНЫЕ 3 силуэта
// ============================================
export const TeamIcon = ({ size = 24, className = "" }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <defs>
      <linearGradient id="team-grad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#C4B5FD" />
        <stop offset="100%" stopColor="#A78BFA" />
      </linearGradient>
      <radialGradient id="team-glow">
        <stop offset="0%" stopColor="#DDD6FE" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#C4B5FD" stopOpacity="0" />
      </radialGradient>
    </defs>
    
    {/* Общее свечение */}
    <motion.circle
      cx="12" cy="12" r="11"
      fill="url(#team-glow)"
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.5, 0.3],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
      }}
    />
    
    {/* 3 КРУПНЫХ человека */}
    {[
      { x: 12, y: 6 },   // центр
      { x: 5, y: 14 },   // лево
      { x: 19, y: 14 },  // право
    ].map((person, i) => (
      <motion.g
        key={i}
        animate={{
          scale: [1, 1.06, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: i * 0.3,
        }}
        style={{ originX: `${person.x}px`, originY: `${person.y}px` }}
      >
        {/* Голова */}
        <circle
          cx={person.x}
          cy={person.y}
          r="2.8"
          fill="url(#team-grad)"
          stroke="#FFFFFF"
          strokeWidth="0.7"
        />
        {/* Тело */}
        <ellipse
          cx={person.x}
          cy={person.y + 5}
          rx="3.5"
          ry="3"
          fill="url(#team-grad)"
          stroke="#FFFFFF"
          strokeWidth="0.7"
        />
      </motion.g>
    ))}
    
    {/* Соединяющие линии (руки) */}
    {[
      { x1: 12, y1: 10, x2: 6, y2: 14 },
      { x1: 12, y1: 10, x2: 18, y2: 14 },
      { x1: 8, y1: 17, x2: 16, y2: 17 },
    ].map((line, i) => (
      <motion.line
        key={i}
        x1={line.x1} y1={line.y1}
        x2={line.x2} y2={line.y2}
        stroke="#DDD6FE"
        strokeWidth="2"
        strokeDasharray="1.5 1.5"
        animate={{
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: i * 0.3,
        }}
      />
    ))}
    
    {/* КРУПНАЯ центральная точка силы */}
    <motion.circle
      cx="12" cy="12" r="2"
      fill="white"
      animate={{
        scale: [1, 1.3, 1],
        opacity: [0.8, 1, 0.8],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
      }}
    />
    
    {/* Sparkles над головами */}
    {[
      { x: 12, y: 3 },
      { x: 5, y: 10 },
      { x: 19, y: 10 },
    ].map((pos, i) => (
      <Sparkle
        key={i}
        x={pos.x}
        y={pos.y}
        delay={i * 0.3}
        size={0.9}
      />
    ))}
  </svg>
);

export default {
  LearningIcon,
  AuthenticityIcon,
  AudienceIcon,
  ProductIcon,
  FunnelIcon,
  SalesIcon,
  BlogIcon,
  TeamIcon,
};
