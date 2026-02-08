import React from 'react';
import { motion } from 'motion/react';

interface IconProps {
  size?: number;
  className?: string;
}

// ============================================
// ЗАХА ХАДИД — ВИЗУАЛЬНО МОЩНЫЕ ИКОНКИ
// Философия: ЦВЕТ + СВЕТ + МАТЕРИАЛ + КОНТРАСТ
// ============================================

// ============================================
// 0. ОБУЧЕНИЕ — Сияющая книга знаний
// ============================================
export const LearningIcon = ({ size = 24, className = "" }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <defs>
      {/* ЯРКИЕ градиенты */}
      <linearGradient id="book-shine" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8B5CF6" />
        <stop offset="50%" stopColor="#A78BFA" />
        <stop offset="100%" stopColor="#C4B5FD" />
      </linearGradient>
      <linearGradient id="book-dark" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#6D28D9" />
        <stop offset="100%" stopColor="#5B21B6" />
      </linearGradient>
      <radialGradient id="book-glow">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
        <stop offset="50%" stopColor="#DDD6FE" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="star-gold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FEF3C7" />
        <stop offset="50%" stopColor="#FCD34D" />
        <stop offset="100%" stopColor="#F59E0B" />
      </linearGradient>
      <filter id="glow-strong">
        <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    
    {/* Фоновое свечение */}
    <motion.circle 
      cx="12" cy="12" r="10" 
      fill="url(#book-glow)"
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.5, 0.3],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
    
    {/* Левая страница */}
    <motion.path
      d="M4 5 Q 3.5 8, 4 11 T 4 17 Q 4.5 19, 5 20 L 11 20 Q 11.5 18, 11 16 T 11 8 Q 10.5 6, 11 5 Z"
      fill="url(#book-dark)"
      stroke="#DDD6FE"
      strokeWidth="0.5"
      opacity="0.9"
      filter="url(#glow-strong)"
      animate={{
        d: [
          "M4 5 Q 3.5 8, 4 11 T 4 17 Q 4.5 19, 5 20 L 11 20 Q 11.5 18, 11 16 T 11 8 Q 10.5 6, 11 5 Z",
          "M4 5 Q 3 8, 3.5 11 T 4 17 Q 4 19, 4.5 20 L 11 20 Q 11 18, 11.5 16 T 11 8 Q 11 6, 10.5 5 Z",
          "M4 5 Q 3.5 8, 4 11 T 4 17 Q 4.5 19, 5 20 L 11 20 Q 11.5 18, 11 16 T 11 8 Q 10.5 6, 11 5 Z",
        ]
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
    
    {/* Правая страница */}
    <motion.path
      d="M13 5 Q 12.5 6, 13 8 T 13 16 Q 13.5 18, 13 20 L 19 20 Q 19.5 19, 20 17 T 20 11 Q 19.5 8, 20 5 Z"
      fill="url(#book-shine)"
      stroke="#FFFFFF"
      strokeWidth="0.5"
      opacity="0.95"
      filter="url(#glow-strong)"
      animate={{
        d: [
          "M13 5 Q 12.5 6, 13 8 T 13 16 Q 13.5 18, 13 20 L 19 20 Q 19.5 19, 20 17 T 20 11 Q 19.5 8, 20 5 Z",
          "M13 5 Q 13 6, 12.5 8 T 13 16 Q 13 18, 13.5 20 L 19 20 Q 19 19, 19.5 17 T 20 11 Q 20 8, 19.5 5 Z",
          "M13 5 Q 12.5 6, 13 8 T 13 16 Q 13.5 18, 13 20 L 19 20 Q 19.5 19, 20 17 T 20 11 Q 19.5 8, 20 5 Z",
        ]
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.5,
      }}
    />
    
    {/* Блики на страницах */}
    <motion.ellipse
      cx="17" cy="10" rx="2" ry="3"
      fill="white"
      opacity="0.4"
      animate={{
        opacity: [0.3, 0.5, 0.3],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
      }}
    />
    
    {/* Золотая звезда */}
    <motion.g
      animate={{
        rotate: 360,
        scale: [1, 1.2, 1],
      }}
      transition={{
        rotate: { duration: 6, repeat: Infinity, ease: "linear" },
        scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
      }}
      style={{ originX: "16px", originY: "5px" }}
    >
      <path
        d="M16 3 L16.5 4.5 L18 5 L16.5 5.5 L16 7 L15.5 5.5 L14 5 L15.5 4.5 Z"
        fill="url(#star-gold)"
        stroke="#FEF3C7"
        strokeWidth="0.3"
        filter="url(#glow-strong)"
      />
    </motion.g>
    
    {/* Сверкающие частицы */}
    {[
      { x: 7, y: 8 },
      { x: 17, y: 15 },
      { x: 6, y: 18 },
    ].map((pos, i) => (
      <motion.circle
        key={i}
        cx={pos.x} cy={pos.y} r="0.8"
        fill="#FCD34D"
        filter="url(#glow-strong)"
        animate={{
          opacity: [0, 1, 0],
          scale: [0, 1.5, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: i * 0.7,
        }}
      />
    ))}
  </svg>
);

// ============================================
// 1. АУТЕНТИЧНОСТЬ — Сияющий кристалл
// ============================================
export const AuthenticityIcon = ({ size = 24, className = "" }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <defs>
      <radialGradient id="crystal-core">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="30%" stopColor="#E0E7FF" />
        <stop offset="70%" stopColor="#A78BFA" />
        <stop offset="100%" stopColor="#7C3AED" />
      </radialGradient>
      <linearGradient id="crystal-edge" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#C4B5FD" />
        <stop offset="50%" stopColor="#8B5CF6" />
        <stop offset="100%" stopColor="#6D28D9" />
      </linearGradient>
      <radialGradient id="crystal-glow">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
        <stop offset="50%" stopColor="#C4B5FD" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
      </radialGradient>
      <filter id="crystal-shine">
        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    
    {/* Внешнее свечение */}
    <motion.ellipse
      cx="12" cy="12" rx="11" ry="10"
      fill="url(#crystal-glow)"
      animate={{
        scale: [1, 1.15, 1],
        opacity: [0.4, 0.6, 0.4],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
      }}
    />
    
    {/* Основной кристалл */}
    <motion.path
      fill="url(#crystal-edge)"
      stroke="#DDD6FE"
      strokeWidth="1"
      filter="url(#crystal-shine)"
      animate={{
        d: [
          "M12 2 Q 18 5, 21 10 Q 22 12, 21 14 Q 18 19, 12 22 Q 6 19, 3 14 Q 2 12, 3 10 Q 6 5, 12 2 Z",
          "M12 2 Q 19 6, 21 11 Q 21 12, 20 14 Q 17 18, 12 22 Q 7 18, 4 14 Q 3 12, 3 11 Q 5 6, 12 2 Z",
          "M12 2 Q 17 6, 20 10 Q 22 12, 20 15 Q 18 18, 12 22 Q 6 18, 4 15 Q 2 12, 4 10 Q 7 6, 12 2 Z",
          "M12 2 Q 18 5, 21 10 Q 22 12, 21 14 Q 18 19, 12 22 Q 6 19, 3 14 Q 2 12, 3 10 Q 6 5, 12 2 Z",
        ]
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
    
    {/* Внутренние грани со светом */}
    <motion.path
      d="M7 8 Q 12 10, 17 8"
      stroke="#E0E7FF"
      strokeWidth="1.5"
      fill="none"
      opacity="0.6"
      animate={{
        d: [
          "M7 8 Q 12 10, 17 8",
          "M7 8 Q 12 6, 17 8",
          "M7 8 Q 12 10, 17 8",
        ],
        opacity: [0.6, 0.8, 0.6],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
      }}
    />
    
    <motion.path
      d="M7 16 Q 12 14, 17 16"
      stroke="#C4B5FD"
      strokeWidth="1.5"
      fill="none"
      opacity="0.6"
      animate={{
        d: [
          "M7 16 Q 12 14, 17 16",
          "M7 16 Q 12 18, 17 16",
          "M7 16 Q 12 14, 17 16",
        ],
        opacity: [0.6, 0.8, 0.6],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        delay: 0.5,
      }}
    />
    
    {/* Яркое ядро */}
    <motion.circle
      cx="12" cy="12" r="3.5"
      fill="url(#crystal-core)"
      filter="url(#crystal-shine)"
      animate={{
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
      }}
    />
    
    {/* Белый блик */}
    <motion.ellipse
      cx="10.5" cy="10.5" rx="2" ry="1.5"
      fill="white"
      opacity="0.9"
      animate={{
        opacity: [0.7, 0.9, 0.7],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
      }}
    />
    
    {/* Световые лучи */}
    {[0, 90, 180, 270].map((angle, i) => {
      const rad = (angle * Math.PI) / 180;
      return (
        <motion.line
          key={i}
          x1="12" y1="12"
          x2={12 + Math.cos(rad) * 8}
          y2={12 + Math.sin(rad) * 8}
          stroke="#DDD6FE"
          strokeWidth="2"
          strokeLinecap="round"
          animate={{
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.3,
          }}
        />
      );
    })}
  </svg>
);

// ============================================
// 2. ЦА — Пульсирующее сердце энергии
// ============================================
export const AudienceIcon = ({ size = 24, className = "" }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <defs>
      <linearGradient id="heart-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FCA5A5" />
        <stop offset="50%" stopColor="#F87171" />
        <stop offset="100%" stopColor="#DC2626" />
      </linearGradient>
      <radialGradient id="heart-glow">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
        <stop offset="50%" stopColor="#FCA5A5" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#F87171" stopOpacity="0" />
      </radialGradient>
      <filter id="heart-shine">
        <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    
    {/* Пульсирующее свечение */}
    <motion.ellipse
      cx="12" cy="12" rx="10" ry="11"
      fill="url(#heart-glow)"
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.5, 0.3],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
      }}
    />
    
    {/* Сердце */}
    <motion.path
      d="M12 21 C12 21 4 15 4 9.5 C4 6.5 6.5 4 9 4 C10.5 4 11.5 5 12 6 C12.5 5 13.5 4 15 4 C17.5 4 20 6.5 20 9.5 C20 15 12 21 12 21 Z"
      fill="url(#heart-gradient)"
      stroke="#FEE2E2"
      strokeWidth="1"
      filter="url(#heart-shine)"
      animate={{
        scale: [1, 1.05, 1],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
      }}
      style={{ originX: "12px", originY: "12px" }}
    />
    
    {/* Блик */}
    <motion.ellipse
      cx="9.5" cy="8" rx="2.5" ry="2"
      fill="white"
      opacity="0.6"
      animate={{
        opacity: [0.5, 0.7, 0.5],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
      }}
    />
    
    {/* Энергетические кольца */}
    {[1, 2].map((ring, i) => (
      <motion.ellipse
        key={i}
        cx="12" cy="12" rx="9" ry="10"
        fill="none"
        stroke="#FCA5A5"
        strokeWidth="0.5"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0, 0.6, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: i * 1,
        }}
        style={{ originX: "12px", originY: "12px" }}
      />
    ))}
    
    {/* Сияющие частицы */}
    {[
      { x: 6, y: 10 },
      { x: 18, y: 10 },
      { x: 12, y: 5 },
    ].map((pos, i) => (
      <motion.circle
        key={i}
        cx={pos.x} cy={pos.y} r="1"
        fill="#FEF2F2"
        filter="url(#heart-shine)"
        animate={{
          opacity: [0, 1, 0],
          scale: [0, 1.5, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: i * 0.7,
        }}
      />
    ))}
  </svg>
);

// ============================================
// 3. ПРОДУКТЫ — Светящийся цветок
// ============================================
export const ProductIcon = ({ size = 24, className = "" }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <defs>
      <linearGradient id="flower-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F0ABFC" />
        <stop offset="50%" stopColor="#E879F9" />
        <stop offset="100%" stopColor="#C026D3" />
      </linearGradient>
      <radialGradient id="flower-center">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="50%" stopColor="#FAE8FF" />
        <stop offset="100%" stopColor="#F0ABFC" />
      </radialGradient>
      <radialGradient id="flower-glow">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.6" />
        <stop offset="50%" stopColor="#F0ABFC" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#E879F9" stopOpacity="0" />
      </radialGradient>
      <filter id="flower-shine">
        <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    
    {/* Общее свечение */}
    <motion.ellipse
      cx="12" cy="12" rx="10" ry="11"
      fill="url(#flower-glow)"
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.5, 0.3],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
      }}
    />
    
    {/* 6 лепестков */}
    {[0, 60, 120, 180, 240, 300].map((angle, i) => {
      const rad = (angle * Math.PI) / 180;
      const cx = 12 + Math.cos(rad) * 5;
      const cy = 12 + Math.sin(rad) * 5;
      
      return (
        <motion.ellipse
          key={i}
          cx={cx} cy={cy}
          rx="3" ry="4"
          fill="url(#flower-gradient)"
          stroke="#FAE8FF"
          strokeWidth="0.5"
          opacity="0.8"
          filter="url(#flower-shine)"
          transform={`rotate(${angle} ${cx} ${cy})`}
          animate={{
            opacity: [0.6, 0.9, 0.6],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.3,
          }}
          style={{ originX: `${cx}px`, originY: `${cy}px` }}
        />
      );
    })}
    
    {/* Центр */}
    <motion.circle
      cx="12" cy="12" r="4"
      fill="url(#flower-center)"
      stroke="#FEFCE8"
      strokeWidth="1"
      filter="url(#flower-shine)"
      animate={{
        scale: [1, 1.08, 1],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
      }}
    />
    
    {/* Яркое ядро */}
    <motion.circle
      cx="12" cy="12" r="2"
      fill="white"
      opacity="0.9"
      animate={{
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
      }}
    />
  </svg>
);

// ============================================
// 4. ВОРОНКА — Энергетический поток
// ============================================
export const FunnelIcon = ({ size = 24, className = "" }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <defs>
      <linearGradient id="funnel-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FCA5A5" />
        <stop offset="50%" stopColor="#F472B6" />
        <stop offset="100%" stopColor="#DB2777" />
      </linearGradient>
      <radialGradient id="funnel-glow">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#F472B6" stopOpacity="0" />
      </radialGradient>
      <filter id="funnel-shine">
        <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    
    {/* Воронка */}
    <motion.path
      d="M3 3 Q 4 3.5, 6 3 L 18 3 Q 20 3.5, 21 3 Q 20 7, 19 10 Q 18.5 11, 18 13 Q 17 15, 16 17 L 13 21 Q 12 21.5, 11 21 L 8 17 Q 7 15, 6 13 Q 5.5 11, 5 10 Q 4 7, 3 3 Z"
      fill="url(#funnel-gradient)"
      stroke="#FEE2E2"
      strokeWidth="1"
      opacity="0.9"
      filter="url(#funnel-shine)"
      animate={{
        d: [
          "M3 3 Q 4 3.5, 6 3 L 18 3 Q 20 3.5, 21 3 Q 20 7, 19 10 Q 18.5 11, 18 13 Q 17 15, 16 17 L 13 21 Q 12 21.5, 11 21 L 8 17 Q 7 15, 6 13 Q 5.5 11, 5 10 Q 4 7, 3 3 Z",
          "M3 3 Q 3.5 3.5, 6 3 L 18 3 Q 20.5 3.5, 21 3 Q 19.5 7, 18.5 10 Q 18 11, 17.5 13 Q 16.5 15, 15.5 17 L 13 21 Q 12 21.8, 11 21 L 8.5 17 Q 7.5 15, 6.5 13 Q 6 11, 5.5 10 Q 4.5 7, 3 3 Z",
          "M3 3 Q 4 3.5, 6 3 L 18 3 Q 20 3.5, 21 3 Q 20 7, 19 10 Q 18.5 11, 18 13 Q 17 15, 16 17 L 13 21 Q 12 21.5, 11 21 L 8 17 Q 7 15, 6 13 Q 5.5 11, 5 10 Q 4 7, 3 3 Z",
        ]
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
    
    {/* Блик сверху */}
    <ellipse cx="12" cy="5" rx="6" ry="1.5" fill="white" opacity="0.4" />
    
    {/* Падающие частицы */}
    {[...Array(5)].map((_, i) => (
      <motion.circle
        key={i}
        cx="12" cy="4" r="1"
        fill="white"
        filter="url(#funnel-shine)"
        animate={{
          y: [0, 17],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: i * 0.4,
          ease: "easeIn",
        }}
      />
    ))}
    
    {/* Световая звезда-результат */}
    <motion.g
      animate={{
        scale: [1, 1.3, 1],
        rotate: [0, 90, 180],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
      }}
      style={{ originX: "12px", originY: "21px" }}
    >
      <path
        d="M12 19 L12.5 20.5 L14 21 L12.5 21.5 L12 23 L11.5 21.5 L10 21 L11.5 20.5 Z"
        fill="white"
        filter="url(#funnel-shine)"
      />
    </motion.g>
  </svg>
);

// ============================================
// 5. ПРОДАЖИ — Магнитная энергия
// ============================================
export const SalesIcon = ({ size = 24, className = "" }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <defs>
      <linearGradient id="magnet-blue" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#60A5FA" />
        <stop offset="100%" stopColor="#3B82F6" />
      </linearGradient>
      <linearGradient id="magnet-red" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#F87171" />
        <stop offset="100%" stopColor="#EF4444" />
      </linearGradient>
      <filter id="magnet-shine">
        <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    
    {/* Левая сторона магнита (синяя - N) */}
    <motion.path
      d="M6 4 Q 5.5 8, 6 12 Q 6.5 15, 8 17"
      stroke="url(#magnet-blue)"
      strokeWidth="4"
      strokeLinecap="round"
      fill="none"
      filter="url(#magnet-shine)"
      animate={{
        d: [
          "M6 4 Q 5.5 8, 6 12 Q 6.5 15, 8 17",
          "M6 4 Q 5 8, 5.5 12 Q 6 15, 7.5 17",
          "M6 4 Q 5.5 8, 6 12 Q 6.5 15, 8 17",
        ]
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
    
    {/* Правая сторона магнита (красная - S) */}
    <motion.path
      d="M18 4 Q 18.5 8, 18 12 Q 17.5 15, 16 17"
      stroke="url(#magnet-red)"
      strokeWidth="4"
      strokeLinecap="round"
      fill="none"
      filter="url(#magnet-shine)"
      animate={{
        d: [
          "M18 4 Q 18.5 8, 18 12 Q 17.5 15, 16 17",
          "M18 4 Q 19 8, 18.5 12 Q 18 15, 16.5 17",
          "M18 4 Q 18.5 8, 18 12 Q 17.5 15, 16 17",
        ]
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.3,
      }}
    />
    
    {/* Полюса */}
    <rect x="5" y="2" width="3" height="4" rx="1" fill="url(#magnet-blue)" filter="url(#magnet-shine)" />
    <rect x="16" y="2" width="3" height="4" rx="1" fill="url(#magnet-red)" filter="url(#magnet-shine)" />
    <text x="6.5" y="5" fill="white" fontSize="3" fontWeight="bold">N</text>
    <text x="17.5" y="5" fill="white" fontSize="3" fontWeight="bold">S</text>
    
    {/* Притягиваемые частицы */}
    {[
      { x: 3, y: 10, color: "#60A5FA" },
      { x: 21, y: 10, color: "#F87171" },
      { x: 4, y: 14, color: "#93C5FD" },
      { x: 20, y: 14, color: "#FCA5A5" },
    ].map((particle, i) => (
      <motion.circle
        key={i}
        cx={particle.x} cy={particle.y} r="1"
        fill={particle.color}
        filter="url(#magnet-shine)"
        animate={{
          x: [0, particle.x > 12 ? -4 : 4],
          opacity: [1, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: i * 0.5,
        }}
      />
    ))}
    
    {/* Золотая монета */}
    <motion.g
      animate={{
        y: [0, -2, 0],
        rotate: [0, 10, -10, 0],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
      }}
      style={{ originX: "12px", originY: "20px" }}
    >
      <circle cx="12" cy="20" r="2.5" fill="#FCD34D" stroke="#FBBF24" strokeWidth="1" filter="url(#magnet-shine)" />
      <text x="12" y="21" textAnchor="middle" fill="#78350F" fontSize="3" fontWeight="bold">$</text>
    </motion.g>
  </svg>
);

// ============================================
// 6. БЛОГ — Сияющее созвездие
// ============================================
export const BlogIcon = ({ size = 24, className = "" }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <defs>
      <radialGradient id="star-gradient">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="50%" stopColor="#FCD34D" />
        <stop offset="100%" stopColor="#F59E0B" />
      </radialGradient>
      <radialGradient id="star-glow">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
        <stop offset="50%" stopColor="#FCD34D" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
      </radialGradient>
      <filter id="star-shine">
        <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    
    {/* Центральное свечение */}
    <motion.circle
      cx="12" cy="12" r="10"
      fill="url(#star-glow)"
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.5, 0.3],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
      }}
    />
    
    {/* Центральная звезда */}
    <motion.circle
      cx="12" cy="12" r="3"
      fill="url(#star-gradient)"
      filter="url(#star-shine)"
      animate={{
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
      }}
    />
    
    {/* Точки созвездия */}
    {[
      { x: 12, y: 5, size: 1.5 },
      { x: 18, y: 8, size: 1.3 },
      { x: 19, y: 14, size: 1.4 },
      { x: 14, y: 19, size: 1.3 },
      { x: 7, y: 18, size: 1.2 },
      { x: 4, y: 12, size: 1.4 },
      { x: 6, y: 7, size: 1.2 },
    ].map((point, i) => (
      <motion.circle
        key={i}
        cx={point.x} cy={point.y} r={point.size}
        fill="url(#star-gradient)"
        filter="url(#star-shine)"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: i * 0.3,
        }}
      />
    ))}
    
    {/* Соединительные линии */}
    {[
      { x2: 12, y2: 5 },
      { x2: 18, y2: 8 },
      { x2: 19, y2: 14 },
      { x2: 14, y2: 19 },
      { x2: 7, y2: 18 },
      { x2: 4, y2: 12 },
      { x2: 6, y2: 7 },
    ].map((line, i) => (
      <motion.line
        key={i}
        x1="12" y1="12"
        x2={line.x2} y2={line.y2}
        stroke="#FDE68A"
        strokeWidth="0.5"
        animate={{
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: i * 0.3,
        }}
      />
    ))}
  </svg>
);

// ============================================
// 7. КОМАНДА — Энергия синергии
// ============================================
export const TeamIcon = ({ size = 24, className = "" }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <defs>
      <linearGradient id="team-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#A78BFA" />
        <stop offset="50%" stopColor="#8B5CF6" />
        <stop offset="100%" stopColor="#7C3AED" />
      </linearGradient>
      <radialGradient id="team-glow">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.6" />
        <stop offset="50%" stopColor="#C4B5FD" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
      </radialGradient>
      <filter id="team-shine">
        <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    
    {/* Общее поле */}
    <motion.ellipse
      cx="12" cy="12" rx="10" ry="11"
      fill="url(#team-glow)"
      animate={{
        scale: [1, 1.15, 1],
        opacity: [0.3, 0.5, 0.3],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
      }}
    />
    
    {/* 3 человека */}
    {[
      { cx: 12, cy: 7 },
      { cx: 7, cy: 15 },
      { cx: 17, cy: 15 },
    ].map((person, i) => (
      <motion.g
        key={i}
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: i * 0.3,
        }}
        style={{ originX: `${person.cx}px`, originY: `${person.cy}px` }}
      >
        <circle
          cx={person.cx} cy={person.cy} r="2.5"
          fill="url(#team-gradient)"
          stroke="white"
          strokeWidth="1"
          filter="url(#team-shine)"
        />
        <ellipse
          cx={person.cx} cy={person.cy + 4} rx="3" ry="2"
          fill="url(#team-gradient)"
          opacity="0.8"
          filter="url(#team-shine)"
        />
      </motion.g>
    ))}
    
    {/* Энергетические связи */}
    {[
      { x1: 12, y1: 9, x2: 7, y2: 13 },
      { x1: 12, y1: 9, x2: 17, y2: 13 },
      { x1: 9, y1: 15, x2: 15, y2: 15 },
    ].map((line, i) => (
      <motion.line
        key={i}
        x1={line.x1} y1={line.y1}
        x2={line.x2} y2={line.y2}
        stroke="#C4B5FD"
        strokeWidth="2"
        strokeDasharray="2 2"
        animate={{
          opacity: [0.3, 0.7, 0.3],
          strokeDashoffset: [0, -4, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: i * 0.3,
        }}
      />
    ))}
    
    {/* Центральная точка силы */}
    <motion.circle
      cx="12" cy="12" r="2"
      fill="white"
      filter="url(#team-shine)"
      animate={{
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
      }}
    />
    
    {/* Символ бесконечности */}
    <motion.path
      d="M9 12 Q 10 10, 12 12 Q 14 14, 15 12"
      stroke="white"
      strokeWidth="1.5"
      fill="none"
      opacity="0.8"
      animate={{
        opacity: [0.6, 0.9, 0.6],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
      }}
    />
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
