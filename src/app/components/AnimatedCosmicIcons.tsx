import React from 'react';
import { motion } from 'motion/react';

interface IconProps {
  size?: number;
  className?: string;
}

// ============================================
// 0. ОБУЧЕНИЕ — Открытая книга с магией
// ============================================
export const LearningIcon = ({ size = 24, className = "" }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <defs>
      <linearGradient id="book-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="currentColor" stopOpacity="0.4" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="1" />
      </linearGradient>
      <radialGradient id="magic-glow">
        <stop offset="0%" stopColor="currentColor" stopOpacity="0.8" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
      </radialGradient>
    </defs>
    
    {/* Магическое свечение */}
    <motion.circle 
      cx="12" 
      cy="3" 
      r="4" 
      fill="url(#magic-glow)"
      animate={{
        scale: [1, 1.3, 1],
        opacity: [0.3, 0.6, 0.3],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
    
    {/* Книга */}
    <path 
      d="M3 6 L3 18 C3 19 4 20 5 20 L12 20 L19 20 C20 20 21 19 21 18 L21 6 C21 5 20 4 19 4 L12 4 L5 4 C4 4 3 5 3 6 Z" 
      fill="url(#book-gradient)"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    
    {/* Разделитель страниц */}
    <motion.path 
      d="M12 4 L12 20" 
      stroke="currentColor" 
      strokeWidth="1" 
      opacity="0.3"
      animate={{
        opacity: [0.3, 0.5, 0.3],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
      }}
    />
    
    {/* Страницы */}
    <path d="M6 8 L10 8" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
    <path d="M6 11 L10 11" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
    <path d="M6 14 L9 14" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
    <path d="M14 8 L18 8" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
    <path d="M14 11 L18 11" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
    <path d="M15 14 L18 14" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
    
    {/* Вращающаяся звезда */}
    <motion.g
      animate={{
        rotate: 360,
        scale: [1, 1.2, 1],
      }}
      transition={{
        rotate: { duration: 4, repeat: Infinity, ease: "linear" },
        scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
      }}
      style={{ originX: "12px", originY: "3px" }}
    >
      <path 
        d="M12 1 L12.5 2.5 L14 3 L12.5 3.5 L12 5 L11.5 3.5 L10 3 L11.5 2.5 Z" 
        fill="currentColor"
        opacity="0.9"
      />
    </motion.g>
    
    {/* Мерцающие частицы */}
    {[...Array(4)].map((_, i) => (
      <motion.circle 
        key={i}
        cx={[8, 16, 6, 18][i]} 
        cy={[3, 3, 22, 22][i]} 
        r="0.5" 
        fill="currentColor"
        animate={{
          opacity: [0, 1, 0],
          scale: [0, 1, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: i * 0.5,
        }}
      />
    ))}
  </svg>
);

// ============================================
// 1. АУТЕНТИЧНОСТЬ — Живой кристалл
// ============================================
export const AuthenticityIcon = ({ size = 24, className = "" }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <defs>
      <linearGradient id="crystal-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="currentColor" stopOpacity="0.3" />
        <stop offset="50%" stopColor="currentColor" stopOpacity="0.6" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="1" />
      </linearGradient>
      <radialGradient id="crystal-core">
        <stop offset="0%" stopColor="white" stopOpacity="1" />
        <stop offset="50%" stopColor="currentColor" stopOpacity="0.8" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
      </radialGradient>
    </defs>
    
    {/* Пульсирующее свечение */}
    <motion.circle 
      cx="12" 
      cy="12" 
      r="10" 
      fill="url(#crystal-core)"
      animate={{
        scale: [0.8, 1.2, 0.8],
        opacity: [0.2, 0.4, 0.2],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
    
    {/* Основной кристалл */}
    <motion.path 
      d="M12 2 L17 7 L20 12 L17 17 L12 22 L7 17 L4 12 L7 7 Z" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      fill="url(#crystal-gradient)"
      strokeLinejoin="round"
      animate={{
        scale: [1, 1.03, 1],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      style={{ originX: "12px", originY: "12px" }}
    />
    
    {/* Внутренние грани с анимацией */}
    <motion.path 
      d="M7 7 L12 12 L17 7" 
      stroke="currentColor" 
      strokeWidth="1" 
      opacity="0.5"
      animate={{ opacity: [0.3, 0.6, 0.3] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
    <motion.path 
      d="M17 17 L12 12 L7 17" 
      stroke="currentColor" 
      strokeWidth="1" 
      opacity="0.5"
      animate={{ opacity: [0.6, 0.3, 0.6] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
    <path d="M7 7 L12 12 L7 17" stroke="currentColor" strokeWidth="1" opacity="0.5" />
    <path d="M17 7 L12 12 L17 17" stroke="currentColor" strokeWidth="1" opacity="0.5" />
    
    {/* Центральное ядро */}
    <motion.circle 
      cx="12" 
      cy="12" 
      r="2" 
      fill="currentColor" 
      opacity="0.9"
      animate={{
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
    <motion.circle 
      cx="12" 
      cy="12" 
      r="1" 
      fill="white" 
      opacity="0.8"
      animate={{
        opacity: [0.8, 1, 0.8],
      }}
      transition={{
        duration: 1,
        repeat: Infinity,
      }}
    />
    
    {/* Световые лучи */}
    {[
      { d: "M12 2 L12 5", angle: 0 },
      { d: "M12 19 L12 22", angle: 180 },
      { d: "M2 12 L5 12", angle: 270 },
      { d: "M19 12 L22 12", angle: 90 },
    ].map((ray, i) => (
      <motion.path 
        key={i}
        d={ray.d}
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round"
        animate={{
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: i * 0.5,
        }}
      />
    ))}
    
    {/* Орбитальные частицы */}
    {[...Array(3)].map((_, i) => {
      const angle = (i * 120 * Math.PI) / 180;
      return (
        <motion.circle
          key={i}
          cx="12"
          cy="12"
          r="0.8"
          fill="currentColor"
          animate={{
            x: [0, Math.cos(angle) * 8, 0],
            y: [0, Math.sin(angle) * 8, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.7,
            ease: "easeInOut"
          }}
        />
      );
    })}
  </svg>
);

// ============================================
// 2. ЦА — Пульсирующее сердце с кольцами
// ============================================
export const AudienceIcon = ({ size = 24, className = "" }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <defs>
      <linearGradient id="heart-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="currentColor" stopOpacity="0.3" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="1" />
      </linearGradient>
    </defs>
    
    {/* Пульсирующие кольца */}
    {[10, 8].map((r, i) => (
      <motion.circle 
        key={i}
        cx="12" 
        cy="12" 
        r={r} 
        stroke="currentColor" 
        strokeWidth="0.5" 
        fill="none"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: i * 0.3,
        }}
        style={{ originX: "12px", originY: "12px" }}
      />
    ))}
    
    {/* Сердце с дыханием */}
    <motion.path 
      d="M12 21 C12 21 4 15 4 9.5 C4 6.5 6.5 4 9 4 C10.5 4 11.5 5 12 6 C12.5 5 13.5 4 15 4 C17.5 4 20 6.5 20 9.5 C20 15 12 21 12 21 Z" 
      fill="url(#heart-gradient)"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
      animate={{
        scale: [1, 1.05, 1],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      style={{ originX: "12px", originY: "12px" }}
    />
    
    {/* Блик */}
    <motion.path 
      d="M9 7 C9.5 6.5 10 6.5 10.5 7 C11 7.5 10.5 8.5 9.5 9" 
      stroke="white" 
      strokeWidth="1.5" 
      strokeLinecap="round"
      animate={{
        opacity: [0.5, 0.8, 0.5],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
      }}
    />
    
    {/* Люди внутри */}
    <motion.circle 
      cx="12" 
      cy="10" 
      r="1.5" 
      fill="white" 
      opacity="0.8"
      animate={{
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        delay: 0.2,
      }}
    />
    <circle cx="9" cy="11" r="1" fill="white" opacity="0.6" />
    <circle cx="15" cy="11" r="1" fill="white" opacity="0.6" />
    
    {/* Энергетические частицы вокруг */}
    {[
      { cx: 6, cy: 10 },
      { cx: 18, cy: 10 },
      { cx: 12, cy: 5 },
    ].map((pos, i) => (
      <motion.circle 
        key={i}
        cx={pos.cx} 
        cy={pos.cy} 
        r="0.5" 
        fill="currentColor"
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
// 3. ПРОДУКТЫ — Вращающийся цветок жизни
// ============================================
export const ProductIcon = ({ size = 24, className = "" }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <defs>
      <linearGradient id="sacred-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="currentColor" stopOpacity="0.2" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="1" />
      </linearGradient>
    </defs>
    
    {/* Центральный круг с пульсацией */}
    <motion.circle 
      cx="12" 
      cy="12" 
      r="4" 
      fill="url(#sacred-gradient)" 
      stroke="currentColor" 
      strokeWidth="1.5"
      animate={{
        scale: [1, 1.08, 1],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      style={{ originX: "12px", originY: "12px" }}
    />
    
    {/* 6 лепестков с поэтапной анимацией */}
    {[
      { cx: 12, cy: 7 },
      { cx: 16.5, cy: 9.5 },
      { cx: 16.5, cy: 14.5 },
      { cx: 12, cy: 17 },
      { cx: 7.5, cy: 14.5 },
      { cx: 7.5, cy: 9.5 },
    ].map((pos, i) => (
      <motion.circle 
        key={i}
        cx={pos.cx} 
        cy={pos.cy} 
        r="3" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="1.2"
        animate={{
          opacity: [0.4, 0.8, 0.4],
          scale: [0.95, 1.05, 0.95],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          delay: i * 0.3,
          ease: "easeInOut"
        }}
        style={{ originX: `${pos.cx}px`, originY: `${pos.cy}px` }}
      />
    ))}
    
    {/* Центральное свечение */}
    <motion.circle 
      cx="12" 
      cy="12" 
      r="1.5" 
      fill="white" 
      opacity="0.9"
      animate={{
        scale: [1, 1.3, 1],
        opacity: [0.9, 1, 0.9],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
      }}
    />
    
    {/* Энергетические линии */}
    {[
      { x2: 12, y2: 7 },
      { x2: 16.5, y2: 9.5 },
      { x2: 16.5, y2: 14.5 },
      { x2: 12, y2: 17 },
      { x2: 7.5, y2: 14.5 },
      { x2: 7.5, y2: 9.5 },
    ].map((line, i) => (
      <motion.path 
        key={i}
        d={`M12 12 L${line.x2} ${line.y2}`} 
        stroke="currentColor" 
        strokeWidth="0.8"
        animate={{
          opacity: [0.2, 0.6, 0.2],
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
// 4. ВОРОНКА — Энергетический поток
// ============================================
export const FunnelIcon = ({ size = 24, className = "" }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <defs>
      <linearGradient id="funnel-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="currentColor" stopOpacity="0.2" />
        <stop offset="50%" stopColor="currentColor" stopOpacity="0.5" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="1" />
      </linearGradient>
    </defs>
    
    {/* Воронка */}
    <path 
      d="M3 3 L21 3 L17 10 L17 15 L12 21 L7 15 L7 10 Z" 
      fill="url(#funnel-gradient)"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    
    {/* Уровни с мерцанием */}
    {[
      { d: "M5 6 L19 6" },
      { d: "M8 9 L16 9" },
      { d: "M10 12 L14 12" },
    ].map((level, i) => (
      <motion.path 
        key={i}
        d={level.d} 
        stroke="currentColor" 
        strokeWidth="1"
        animate={{
          opacity: [0.2, 0.6, 0.2],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: i * 0.5,
        }}
      />
    ))}
    
    {/* Падающие частицы */}
    {[...Array(5)].map((_, i) => (
      <motion.circle 
        key={i}
        cx="12" 
        cy="4"
        r="0.8" 
        fill="white" 
        opacity="0.7"
        animate={{
          y: [0, 17],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: i * 0.4,
          ease: "easeIn"
        }}
      />
    ))}
    
    {/* Световые лучи сверху */}
    {[
      { d: "M8 2 L10 4" },
      { d: "M12 1 L12 3" },
      { d: "M16 2 L14 4" },
    ].map((ray, i) => (
      <motion.path 
        key={i}
        d={ray.d} 
        stroke="currentColor" 
        strokeWidth="1" 
        strokeLinecap="round"
        animate={{
          opacity: [0.2, 0.6, 0.2],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          delay: i * 0.3,
        }}
      />
    ))}
    
    {/* Звезда-результат */}
    <motion.path 
      d="M12 21 L11 20 L12 19 L13 20 Z" 
      fill="white"
      animate={{
        scale: [1, 1.3, 1],
        opacity: [0.8, 1, 0.8],
      }}
      transition={{
        duration: 1,
        repeat: Infinity,
      }}
      style={{ originX: "12px", originY: "20px" }}
    />
  </svg>
);

// ============================================
// 5. ПРОДАЖИ — Магнит с притяжением
// ============================================
export const SalesIcon = ({ size = 24, className = "" }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <defs>
      <linearGradient id="magnet-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
        <stop offset="50%" stopColor="currentColor" stopOpacity="0.5" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="1" />
      </linearGradient>
    </defs>
    
    {/* Магнит */}
    <motion.path 
      d="M6 4 L6 12 C6 15.5 8.5 18 12 18 C15.5 18 18 15.5 18 12 L18 4" 
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      fill="none"
      animate={{
        scale: [1, 1.02, 1],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
      }}
      style={{ originX: "12px", originY: "11px" }}
    />
    
    <path 
      d="M9 4 L9 12 C9 13.5 10.5 15 12 15 C13.5 15 15 13.5 15 12 L15 4" 
      stroke="url(#magnet-gradient)"
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
      opacity="0.5"
    />
    
    {/* Энергетические линии */}
    {[
      { d: "M4 8 Q 2 10 3 12" },
      { d: "M20 8 Q 22 10 21 12" },
    ].map((line, i) => (
      <motion.path 
        key={i}
        d={line.d} 
        stroke="currentColor" 
        strokeWidth="1" 
        fill="none"
        animate={{
          opacity: [0.2, 0.6, 0.2],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          delay: i * 0.3,
        }}
      />
    ))}
    
    {/* Притягиваемые частицы */}
    {[
      { cx: 4, cy: 10, target: 6 },
      { cx: 20, cy: 10, target: 18 },
      { cx: 5, cy: 14, target: 7 },
      { cx: 19, cy: 14, target: 17 },
      { cx: 3, cy: 16, target: 8 },
      { cx: 21, cy: 16, target: 16 },
    ].map((particle, i) => (
      <motion.circle 
        key={i}
        cx={particle.cx} 
        cy={particle.cy} 
        r="1" 
        fill="currentColor"
        animate={{
          x: [0, particle.target - particle.cx],
          opacity: [1, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: i * 0.3,
          ease: "easeIn"
        }}
      />
    ))}
    
    {/* Монета-результат */}
    <motion.g
      animate={{
        y: [0, -2, 0],
        rotate: [0, 10, 0],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      style={{ originX: "12px", originY: "21px" }}
    >
      <circle cx="12" cy="21" r="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path d="M11 20 L11 22 M13 20 L13 22" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 19.5 Q 13 20.5 12 21.5 Q 11 20.5 12 19.5" fill="currentColor" />
    </motion.g>
    
    {/* Полюса */}
    <rect x="5" y="2" width="3" height="4" rx="1" fill="currentColor" opacity="0.7" />
    <rect x="16" y="2" width="3" height="4" rx="1" fill="currentColor" opacity="0.7" />
    <text x="6.5" y="5" fill="white" fontSize="3" fontWeight="bold">N</text>
    <text x="17.5" y="5" fill="white" fontSize="3" fontWeight="bold">S</text>
  </svg>
);

// ============================================
// 6. БЛОГ — Пульсирующее созвездие
// ============================================
export const BlogIcon = ({ size = 24, className = "" }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <defs>
      <radialGradient id="star-glow">
        <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
      </radialGradient>
    </defs>
    
    {/* Центральное свечение */}
    <motion.circle 
      cx="12" 
      cy="12" 
      r="8" 
      fill="url(#star-glow)" 
      opacity="0.2"
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.2, 0.4, 0.2],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
      }}
    />
    
    {/* Центральная звезда (вы) */}
    <motion.circle 
      cx="12" 
      cy="12" 
      r="2.5" 
      fill="currentColor"
      animate={{
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
      }}
    />
    
    {/* Лучи от центра */}
    {[
      { d: "M12 9.5 L12 7" },
      { d: "M12 17 L12 14.5" },
      { d: "M9.5 12 L7 12" },
      { d: "M17 12 L14.5 12" },
    ].map((ray, i) => (
      <motion.path 
        key={i}
        d={ray.d}
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round"
        animate={{
          opacity: [0.3, 1, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: i * 0.25,
        }}
      />
    ))}
    
    {/* Окружающие точки (аудитория) */}
    {[
      { cx: 12, cy: 5 },
      { cx: 18, cy: 8 },
      { cx: 19, cy: 14 },
      { cx: 14, cy: 20 },
      { cx: 6, cy: 18 },
      { cx: 4, cy: 11 },
      { cx: 7, cy: 6 },
    ].map((pos, i) => (
      <motion.circle 
        key={i}
        cx={pos.cx} 
        cy={pos.cy} 
        r="1.5" 
        fill="currentColor"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.6, 1, 0.6],
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
      { x2: 14, y2: 20 },
      { x2: 6, y2: 18 },
      { x2: 4, y2: 11 },
      { x2: 7, y2: 6 },
    ].map((line, i) => (
      <motion.path 
        key={i}
        d={`M12 12 L${line.x2} ${line.y2}`} 
        stroke="currentColor" 
        strokeWidth="0.8"
        animate={{
          opacity: [0.1, 0.4, 0.1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          delay: i * 0.4,
        }}
      />
    ))}
  </svg>
);

// ============================================
// 7. КОМАНДА — Синергия с энергией
// ============================================
export const TeamIcon = ({ size = 24, className = "" }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <defs>
      <linearGradient id="team-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="currentColor" stopOpacity="0.3" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="1" />
      </linearGradient>
    </defs>
    
    {/* Общее поле */}
    <motion.circle 
      cx="12" 
      cy="12" 
      r="10" 
      fill="url(#team-gradient)" 
      opacity="0.1"
      animate={{
        scale: [1, 1.05, 1],
        opacity: [0.1, 0.2, 0.1],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
      }}
    />
    
    {/* 3 человека */}
    {[
      { cx: 12, cy: 6, bodyY: 9 },
      { cx: 7, cy: 15, bodyY: 18 },
      { cx: 17, cy: 15, bodyY: 18 },
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
          cx={person.cx} 
          cy={person.cy} 
          r="2" 
          fill="currentColor" 
          stroke="white" 
          strokeWidth="1" 
        />
        <path 
          d={`M${person.cx - 2} ${person.bodyY} Q${person.cx} ${person.bodyY + 1} ${person.cx + 2} ${person.bodyY}`} 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          fill="none" 
        />
      </motion.g>
    ))}
    
    {/* Энергетические связи */}
    {[
      { d: "M12 8 L7 13" },
      { d: "M12 8 L17 13" },
      { d: "M9 15 L15 15" },
    ].map((line, i) => (
      <motion.path 
        key={i}
        d={line.d} 
        stroke="currentColor" 
        strokeWidth="1.5"
        strokeDasharray="2 2"
        animate={{
          opacity: [0.2, 0.6, 0.2],
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
      cx="12" 
      cy="12" 
      r="1.5" 
      fill="white" 
      opacity="0.9"
      animate={{
        scale: [1, 1.3, 1],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
      }}
    />
    <motion.circle 
      cx="12" 
      cy="12" 
      r="3" 
      stroke="white" 
      strokeWidth="0.5" 
      fill="none"
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.6, 0.3],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
      }}
    />
    
    {/* Символ бесконечности */}
    <motion.path 
      d="M10 12 Q11 10.5 12 12 Q13 13.5 14 12" 
      stroke="white" 
      strokeWidth="0.8" 
      fill="none"
      animate={{
        opacity: [0.4, 0.8, 0.4],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
      }}
    />
    
    {/* Частицы вокруг */}
    {[
      { cx: 12, cy: 3 },
      { cx: 20, cy: 12 },
      { cx: 4, cy: 12 },
      { cx: 7, cy: 20 },
      { cx: 17, cy: 20 },
    ].map((pos, i) => (
      <motion.circle 
        key={i}
        cx={pos.cx} 
        cy={pos.cy} 
        r="0.5" 
        fill="currentColor"
        animate={{
          opacity: [0, 1, 0],
          scale: [0, 1.5, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: i * 0.4,
        }}
      />
    ))}
  </svg>
);
