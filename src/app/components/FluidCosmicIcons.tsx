import React from 'react';
import { motion } from 'motion/react';

interface IconProps {
  size?: number;
  className?: string;
}

// ============================================
// ЗАХА ХАДИД — FLUID COSMIC ICONS 2.0
// Философия: никаких прямых линий, только органика
// ============================================

// ============================================
// 0. ОБУЧЕНИЕ — Развевающиеся страницы
// ============================================
export const LearningIcon = ({ size = 24, className = "" }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <defs>
      <linearGradient id="fluid-book-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="currentColor" stopOpacity="0.2" />
        <stop offset="50%" stopColor="currentColor" stopOpacity="0.5" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0.9" />
      </linearGradient>
      <filter id="gooey-book">
        <feGaussianBlur in="SourceGraphic" stdDeviation="0.8" result="blur" />
        <feColorMatrix in="blur" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 15 -5" result="goo" />
        <feBlend in="SourceGraphic" in2="goo" />
      </filter>
      <radialGradient id="magic-aura">
        <stop offset="0%" stopColor="currentColor" stopOpacity="0.6" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
      </radialGradient>
    </defs>
    
    {/* Слой 1: Пульсирующая аура (асимметричная) */}
    <motion.ellipse
      cx="12" cy="12"
      rx="9" ry="11"
      fill="url(#magic-aura)"
      animate={{
        rx: [9, 11, 8, 10, 9],
        ry: [11, 9, 12, 8, 11],
        rotate: [0, 25, -15, 10, 0],
      }}
      transition={{
        duration: 7,
        repeat: Infinity,
        ease: [0.45, 0.05, 0.55, 0.95],
      }}
    />
    
    {/* Слой 2: Левая страница (волнистая) */}
    <motion.path
      d="M4 5 Q 3.5 8, 4 11 T 4 17 Q 4.5 19, 5 20 L 11 20 Q 11.5 18, 11 16 T 11 8 Q 10.5 6, 11 5 Z"
      fill="url(#fluid-book-gradient)"
      stroke="currentColor"
      strokeWidth="1"
      opacity="0.8"
      filter="url(#gooey-book)"
      animate={{
        d: [
          "M4 5 Q 3.5 8, 4 11 T 4 17 Q 4.5 19, 5 20 L 11 20 Q 11.5 18, 11 16 T 11 8 Q 10.5 6, 11 5 Z",
          "M4 5 Q 3 8, 3.5 11 T 4 17 Q 4 19, 4.5 20 L 11 20 Q 11 18, 11.5 16 T 11 8 Q 11 6, 10.5 5 Z",
          "M4 5 Q 4 8, 4.5 11 T 4 17 Q 5 19, 5.5 20 L 11 20 Q 12 18, 11.5 16 T 11 8 Q 11.5 6, 11.5 5 Z",
          "M4 5 Q 3.5 8, 4 11 T 4 17 Q 4.5 19, 5 20 L 11 20 Q 11.5 18, 11 16 T 11 8 Q 10.5 6, 11 5 Z",
        ]
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
    
    {/* Слой 3: Правая страница (волнистая, в противофазе) */}
    <motion.path
      d="M13 5 Q 12.5 6, 13 8 T 13 16 Q 13.5 18, 13 20 L 19 20 Q 19.5 19, 20 17 T 20 11 Q 19.5 8, 20 5 Z"
      fill="url(#fluid-book-gradient)"
      stroke="currentColor"
      strokeWidth="1"
      opacity="0.8"
      filter="url(#gooey-book)"
      animate={{
        d: [
          "M13 5 Q 12.5 6, 13 8 T 13 16 Q 13.5 18, 13 20 L 19 20 Q 19.5 19, 20 17 T 20 11 Q 19.5 8, 20 5 Z",
          "M13 5 Q 13 6, 12.5 8 T 13 16 Q 13 18, 13.5 20 L 19 20 Q 19 19, 19.5 17 T 20 11 Q 20 8, 19.5 5 Z",
          "M13 5 Q 13.5 6, 13.5 8 T 13 16 Q 14 18, 13 20 L 19 20 Q 20 19, 20.5 17 T 20 11 Q 20.5 8, 20.5 5 Z",
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
    
    {/* Слой 4: Текучие линии текста */}
    {[
      { y: 9, delay: 0 },
      { y: 12, delay: 0.2 },
      { y: 15, delay: 0.4 },
    ].map((line, i) => (
      <motion.path
        key={i}
        d={`M6 ${line.y} Q 8 ${line.y - 0.5}, 10 ${line.y}`}
        stroke="white"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.5"
        animate={{
          d: [
            `M6 ${line.y} Q 8 ${line.y - 0.5}, 10 ${line.y}`,
            `M6 ${line.y} Q 8 ${line.y + 0.5}, 10 ${line.y}`,
            `M6 ${line.y} Q 8 ${line.y - 0.5}, 10 ${line.y}`,
          ],
          opacity: [0.5, 0.7, 0.5],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          delay: line.delay,
        }}
      />
    ))}
    
    {[
      { y: 9, delay: 0.1 },
      { y: 12, delay: 0.3 },
      { y: 15, delay: 0.5 },
    ].map((line, i) => (
      <motion.path
        key={`r${i}`}
        d={`M14 ${line.y} Q 16 ${line.y - 0.5}, 18 ${line.y}`}
        stroke="white"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.5"
        animate={{
          d: [
            `M14 ${line.y} Q 16 ${line.y - 0.5}, 18 ${line.y}`,
            `M14 ${line.y} Q 16 ${line.y + 0.5}, 18 ${line.y}`,
            `M14 ${line.y} Q 16 ${line.y - 0.5}, 18 ${line.y}`,
          ],
          opacity: [0.5, 0.7, 0.5],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          delay: line.delay,
        }}
      />
    ))}
    
    {/* Слой 5: Органическая звезда (НЕ по центру) */}
    <motion.g
      animate={{
        rotate: 360,
        scale: [1, 1.3, 1],
        x: [0, 2, -1, 0],
        y: [0, -1, 2, 0],
      }}
      transition={{
        rotate: { duration: 8, repeat: Infinity, ease: "linear" },
        scale: { duration: 3, repeat: Infinity, ease: [0.65, 0, 0.35, 1] },
        x: { duration: 5, repeat: Infinity, ease: "easeInOut" },
        y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
      }}
      style={{ originX: "16px", originY: "5px" }}
    >
      <path
        d="M16 3 Q 16.5 4, 17.5 4.5 Q 17 5, 16.5 6 Q 16 5.5, 15 5 Q 15.5 4.5, 16 3 Z"
        fill="currentColor"
        opacity="0.9"
        filter="blur(0.5px)"
      />
    </motion.g>
    
    {/* Слой 6: Мерцающие частицы по кривым траекториям */}
    {[
      { start: { x: 7, y: 4 }, path: "Q 9 3, 11 5" },
      { start: { x: 18, y: 18 }, path: "Q 16 19, 14 17" },
      { start: { x: 5, y: 22 }, path: "Q 7 20, 9 22" },
    ].map((particle, i) => (
      <motion.circle
        key={i}
        cx={particle.start.x}
        cy={particle.start.y}
        r="0.7"
        fill="currentColor"
        filter="blur(0.5px)"
        animate={{
          offsetDistance: ['0%', '100%', '0%'],
          opacity: [0, 0.8, 0],
          scale: [0, 1.5, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          delay: i * 0.6,
          ease: [0.45, 0, 0.55, 1],
        }}
        style={{
          offsetPath: `path('M ${particle.start.x} ${particle.start.y} ${particle.path}')`,
        }}
      />
    ))}
  </svg>
);

// ============================================
// 1. АУТЕНТИЧНОСТЬ — Жидкий кристалл
// ============================================
export const AuthenticityIcon = ({ size = 24, className = "" }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <defs>
      <radialGradient id="fluid-core">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
        <stop offset="30%" stopColor="currentColor" stopOpacity="0.8" />
        <stop offset="70%" stopColor="currentColor" stopOpacity="0.3" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
      </radialGradient>
      <filter id="gooey">
        <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="blur" />
        <feColorMatrix in="blur" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
        <feBlend in="SourceGraphic" in2="goo" />
      </filter>
      <linearGradient id="crystal-flow" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="currentColor" stopOpacity="0.2" />
        <stop offset="50%" stopColor="currentColor" stopOpacity="0.6" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="1" />
      </linearGradient>
    </defs>
    
    {/* Слой 1: Пульсирующая аура (асимметричная) */}
    <motion.ellipse
      cx="12" cy="12"
      rx="11" ry="9"
      fill="url(#fluid-core)"
      filter="url(#gooey)"
      animate={{
        rx: [11, 13, 9, 12, 11],
        ry: [9, 11, 13, 10, 9],
        rotate: [0, 60, 120, 180, 240, 300, 360],
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        ease: [0.45, 0.05, 0.55, 0.95],
      }}
    />
    
    {/* Слой 2: Текучий кристалл (органическая форма) */}
    <motion.path
      fill="url(#crystal-flow)"
      stroke="currentColor"
      strokeWidth="1.2"
      opacity="0.7"
      animate={{
        d: [
          // Форма 1
          "M12 2 Q 18 5, 21 10 Q 22 12, 21 14 Q 18 19, 12 22 Q 6 19, 3 14 Q 2 12, 3 10 Q 6 5, 12 2 Z",
          // Форма 2 (деформация)
          "M12 2 Q 19 6, 21 11 Q 21 12, 20 14 Q 17 18, 12 22 Q 7 18, 4 14 Q 3 12, 3 11 Q 5 6, 12 2 Z",
          // Форма 3 (другая деформация)
          "M12 2 Q 17 6, 20 10 Q 22 12, 20 15 Q 18 18, 12 22 Q 6 18, 4 15 Q 2 12, 4 10 Q 7 6, 12 2 Z",
          // Форма 4
          "M12 2 Q 18 7, 21 11 Q 21 12, 21 13 Q 19 19, 12 22 Q 5 19, 3 13 Q 3 12, 3 11 Q 6 7, 12 2 Z",
          // Возврат к форме 1
          "M12 2 Q 18 5, 21 10 Q 22 12, 21 14 Q 18 19, 12 22 Q 6 19, 3 14 Q 2 12, 3 10 Q 6 5, 12 2 Z",
        ]
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
    
    {/* Слой 3: Внутренние текучие линии */}
    <motion.path
      d="M7 8 Q 12 10, 17 8"
      stroke="currentColor"
      strokeWidth="1"
      fill="none"
      opacity="0.4"
      animate={{
        d: [
          "M7 8 Q 12 10, 17 8",
          "M7 8 Q 12 6, 17 8",
          "M7 8 Q 12 10, 17 8",
        ],
        opacity: [0.4, 0.6, 0.4],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
    <motion.path
      d="M7 16 Q 12 14, 17 16"
      stroke="currentColor"
      strokeWidth="1"
      fill="none"
      opacity="0.4"
      animate={{
        d: [
          "M7 16 Q 12 14, 17 16",
          "M7 16 Q 12 18, 17 16",
          "M7 16 Q 12 14, 17 16",
        ],
        opacity: [0.4, 0.6, 0.4],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.5,
      }}
    />
    
    {/* Слой 4: Деформирующееся ядро */}
    <motion.ellipse
      cx="12" cy="12"
      rx="3" ry="3.5"
      fill="currentColor"
      opacity="0.9"
      filter="blur(0.5px)"
      animate={{
        rx: [3, 3.5, 2.5, 3.2, 3],
        ry: [3.5, 3, 4, 2.8, 3.5],
        x: [0, 0.5, -0.5, 0.3, 0],
        y: [0, -0.5, 0.5, -0.3, 0],
        rotate: [0, 45, 90, 135, 180],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: [0.65, 0, 0.35, 1],
      }}
    />
    
    {/* Слой 5: Белый блик (асимметричный) */}
    <motion.ellipse
      cx="11" cy="11"
      rx="1.5" ry="1"
      fill="white"
      opacity="0.9"
      animate={{
        opacity: [0.9, 1, 0.9],
        rotate: [0, 30, 0],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
      }}
    />
    
    {/* Слой 6: Органические частицы по сложным траекториям */}
    {[...Array(6)].map((_, i) => {
      const angle = (i * 60 * Math.PI) / 180;
      const offset = i % 2 === 0 ? 1.2 : 0.8;
      return (
        <motion.ellipse
          key={i}
          cx="12"
          cy="12"
          rx="1.2"
          ry="0.8"
          fill="currentColor"
          opacity="0.5"
          filter="blur(0.8px)"
          animate={{
            x: [
              0,
              Math.cos(angle) * 9 * offset,
              Math.cos(angle + 0.8) * 13 * offset,
              Math.cos(angle + 1.6) * 9 * offset,
              0,
            ],
            y: [
              0,
              Math.sin(angle) * 9 * offset,
              Math.sin(angle + 0.8) * 13 * offset,
              Math.sin(angle + 1.6) * 9 * offset,
              0,
            ],
            rotate: [0, 180, 360],
            opacity: [0, 0.6, 0.8, 0.6, 0],
            rx: [1.2, 1.5, 1, 1.3, 1.2],
            ry: [0.8, 1, 1.5, 0.9, 0.8],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            delay: i * 0.4,
            ease: [0.65, 0, 0.35, 1],
          }}
        />
      );
    })}
    
    {/* Слой 7: Текучие световые потоки */}
    {[
      { angle: 0, delay: 0 },
      { angle: 90, delay: 0.3 },
      { angle: 180, delay: 0.6 },
      { angle: 270, delay: 0.9 },
    ].map((ray, i) => {
      const rad = (ray.angle * Math.PI) / 180;
      return (
        <motion.path
          key={i}
          d={`M12 12 Q ${12 + Math.cos(rad) * 4} ${12 + Math.sin(rad) * 4}, ${12 + Math.cos(rad) * 7} ${12 + Math.sin(rad) * 7}`}
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
          animate={{
            opacity: [0.2, 0.7, 0.2],
            d: [
              `M12 12 Q ${12 + Math.cos(rad) * 4} ${12 + Math.sin(rad) * 4}, ${12 + Math.cos(rad) * 7} ${12 + Math.sin(rad) * 7}`,
              `M12 12 Q ${12 + Math.cos(rad) * 5} ${12 + Math.sin(rad) * 3}, ${12 + Math.cos(rad) * 8} ${12 + Math.sin(rad) * 8}`,
              `M12 12 Q ${12 + Math.cos(rad) * 4} ${12 + Math.sin(rad) * 4}, ${12 + Math.cos(rad) * 7} ${12 + Math.sin(rad) * 7}`,
            ],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            delay: ray.delay,
            ease: "easeInOut",
          }}
        />
      );
    })}
  </svg>
);

// ============================================
// 2. ЦА — Два энергетических центра
// ============================================
export const AudienceIcon = ({ size = 24, className = "" }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <defs>
      <radialGradient id="energy-center">
        <stop offset="0%" stopColor="currentColor" stopOpacity="0.9" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0.2" />
      </radialGradient>
      <filter id="connection-blur">
        <feGaussianBlur in="SourceGraphic" stdDeviation="1" />
      </filter>
    </defs>
    
    {/* Слой 1: Общее энергетическое поле */}
    <motion.ellipse
      cx="12" cy="12"
      rx="10" ry="12"
      fill="url(#energy-center)"
      opacity="0.2"
      animate={{
        rx: [10, 12, 9, 11, 10],
        ry: [12, 10, 13, 9, 12],
        rotate: [0, 30, -20, 15, 0],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: [0.45, 0.05, 0.55, 0.95],
      }}
    />
    
    {/* Слой 2: Левый энергетический центр (ВЫ) */}
    <motion.ellipse
      cx="8" cy="10"
      rx="3.5" ry="4"
      fill="currentColor"
      opacity="0.7"
      filter="url(#connection-blur)"
      animate={{
        rx: [3.5, 4, 3, 3.8, 3.5],
        ry: [4, 3.5, 4.5, 3.3, 4],
        scale: [1, 1.08, 0.95, 1.05, 1],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
    
    {/* Слой 3: Правый энергетический центр (АУДИТОРИЯ) */}
    <motion.ellipse
      cx="16" cy="10"
      rx="3" ry="3.5"
      fill="currentColor"
      opacity="0.7"
      filter="url(#connection-blur)"
      animate={{
        rx: [3, 3.5, 2.8, 3.3, 3],
        ry: [3.5, 3, 4, 2.8, 3.5],
        scale: [1, 1.05, 0.98, 1.03, 1],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.4,
      }}
    />
    
    {/* Слой 4: Жидкая связь между центрами (морфинг) */}
    <motion.path
      fill="currentColor"
      opacity="0.5"
      filter="url(#connection-blur)"
      animate={{
        d: [
          // Форма 1: верхняя волна
          "M8 10 Q 12 6, 16 10 Q 12 13, 8 10 Z",
          // Форма 2: нижняя волна
          "M8 10 Q 12 14, 16 10 Q 12 7, 8 10 Z",
          // Форма 3: S-образная
          "M8 10 Q 10 12, 12 10 Q 14 8, 16 10 Q 14 12, 12 10 Q 10 8, 8 10 Z",
          // Форма 4: широкая
          "M8 10 Q 12 5, 16 10 Q 12 15, 8 10 Z",
          // Возврат к форме 1
          "M8 10 Q 12 6, 16 10 Q 12 13, 8 10 Z",
        ],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
    
    {/* Слой 5: Текучие контуры центров */}
    <motion.ellipse
      cx="8" cy="10"
      rx="3.5" ry="4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      opacity="0.6"
      animate={{
        rx: [3.5, 4, 3, 3.8, 3.5],
        ry: [4, 3.5, 4.5, 3.3, 4],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
    
    <motion.ellipse
      cx="16" cy="10"
      rx="3" ry="3.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      opacity="0.6"
      animate={{
        rx: [3, 3.5, 2.8, 3.3, 3],
        ry: [3.5, 3, 4, 2.8, 3.5],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.4,
      }}
    />
    
    {/* Слой 6: Волны энергии (расходящиеся кольца) */}
    {[1, 2].map((ring, i) => (
      <motion.ellipse
        key={i}
        cx="12" cy="10"
        rx="8" ry="6"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.5"
        animate={{
          rx: [8, 12, 8],
          ry: [6, 9, 6],
          opacity: [0, 0.5, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          delay: i * 1.5,
          ease: "easeOut",
        }}
      />
    ))}
    
    {/* Слой 7: Энергетические частицы между центрами */}
    {[...Array(6)].map((_, i) => (
      <motion.ellipse
        key={i}
        cx="12"
        cy="10"
        rx="0.8"
        ry="0.6"
        fill="currentColor"
        filter="blur(0.5px)"
        animate={{
          x: [0, (i % 2 === 0 ? 4 : -4), 0],
          y: [0, Math.sin(i) * 3, 0],
          opacity: [0, 0.8, 0],
          scale: [0, 1.3, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: i * 0.3,
          ease: [0.65, 0, 0.35, 1],
        }}
      />
    ))}
    
    {/* Слой 8: Символические фигурки (абстрактные) */}
    <motion.circle
      cx="8" cy="10"
      r="1.5"
      fill="white"
      opacity="0.8"
      animate={{
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
      }}
    />
    
    {/* Множественные точки для аудитории */}
    {[
      { x: 15, y: 9 },
      { x: 16, y: 10 },
      { x: 17, y: 11 },
    ].map((pos, i) => (
      <motion.circle
        key={i}
        cx={pos.x}
        cy={pos.y}
        r="0.8"
        fill="white"
        opacity="0.7"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.7, 0.9, 0.7],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          delay: i * 0.2,
        }}
      />
    ))}
    
    {/* Слой 9: Энергетические потоки снизу */}
    <motion.path
      d="M8 14 Q 10 17, 12 20"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      fill="none"
      opacity="0.3"
      animate={{
        d: [
          "M8 14 Q 10 17, 12 20",
          "M8 14 Q 9 16, 12 20",
          "M8 14 Q 11 18, 12 20",
          "M8 14 Q 10 17, 12 20",
        ],
        opacity: [0.3, 0.5, 0.3],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
    
    <motion.path
      d="M16 14 Q 14 17, 12 20"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      fill="none"
      opacity="0.3"
      animate={{
        d: [
          "M16 14 Q 14 17, 12 20",
          "M16 14 Q 15 16, 12 20",
          "M16 14 Q 13 18, 12 20",
          "M16 14 Q 14 17, 12 20",
        ],
        opacity: [0.3, 0.5, 0.3],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.5,
      }}
    />
  </svg>
);

// ============================================
// 3. ПРОДУКТЫ — Органический цветок
// ============================================
export const ProductIcon = ({ size = 24, className = "" }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <defs>
      <radialGradient id="petal-gradient">
        <stop offset="0%" stopColor="currentColor" stopOpacity="0.3" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0.8" />
      </radialGradient>
      <filter id="petal-blur">
        <feGaussianBlur in="SourceGraphic" stdDeviation="0.8" />
      </filter>
    </defs>
    
    {/* Слой 1: Общее свечение */}
    <motion.ellipse
      cx="12" cy="12"
      rx="9" ry="11"
      fill="url(#petal-gradient)"
      opacity="0.15"
      animate={{
        rx: [9, 11, 8, 10, 9],
        ry: [11, 9, 12, 8, 11],
        rotate: [0, 60, 120, 180, 240, 300, 360],
      }}
      transition={{
        duration: 12,
        repeat: Infinity,
        ease: "linear",
      }}
    />
    
    {/* Слой 2: Центральное ядро (деформирующееся) */}
    <motion.ellipse
      cx="12" cy="12"
      rx="4" ry="3.5"
      fill="currentColor"
      opacity="0.8"
      filter="url(#petal-blur)"
      animate={{
        rx: [4, 4.5, 3.5, 4.2, 4],
        ry: [3.5, 4, 4.5, 3.3, 3.5],
        rotate: [0, 45, 90, 135, 180],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: [0.45, 0.05, 0.55, 0.95],
      }}
    />
    
    {/* Слой 3: 6 органических лепестков (НЕ круги!) */}
    {[
      { angle: 0, rx: 3.5, ry: 5 },
      { angle: 60, rx: 3, ry: 4.5 },
      { angle: 120, rx: 3.2, ry: 5.2 },
      { angle: 180, rx: 3.4, ry: 4.8 },
      { angle: 240, rx: 3.1, ry: 5.1 },
      { angle: 300, rx: 3.3, ry: 4.9 },
    ].map((petal, i) => {
      const rad = (petal.angle * Math.PI) / 180;
      const cx = 12 + Math.cos(rad) * 5;
      const cy = 12 + Math.sin(rad) * 5;
      
      return (
        <motion.ellipse
          key={i}
          cx={cx}
          cy={cy}
          rx={petal.rx}
          ry={petal.ry}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          opacity="0.6"
          transform={`rotate(${petal.angle} ${cx} ${cy})`}
          animate={{
            rx: [petal.rx, petal.rx + 0.5, petal.rx - 0.3, petal.rx + 0.4, petal.rx],
            ry: [petal.ry, petal.ry - 0.4, petal.ry + 0.6, petal.ry - 0.2, petal.ry],
            opacity: [0.4, 0.7, 0.5, 0.8, 0.4],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 0.4,
            ease: "easeInOut",
          }}
        />
      );
    })}
    
    {/* Слой 4: Текучие связи от центра к лепесткам */}
    {[0, 60, 120, 180, 240, 300].map((angle, i) => {
      const rad = (angle * Math.PI) / 180;
      const x2 = 12 + Math.cos(rad) * 5;
      const y2 = 12 + Math.sin(rad) * 5;
      const midX = 12 + Math.cos(rad) * 2.5;
      const midY = 12 + Math.sin(rad) * 2.5;
      
      return (
        <motion.path
          key={i}
          d={`M12 12 Q ${midX} ${midY}, ${x2} ${y2}`}
          stroke="currentColor"
          strokeWidth="0.8"
          fill="none"
          animate={{
            opacity: [0.2, 0.5, 0.2],
            d: [
              `M12 12 Q ${midX} ${midY}, ${x2} ${y2}`,
              `M12 12 Q ${midX + 1} ${midY - 1}, ${x2} ${y2}`,
              `M12 12 Q ${midX - 1} ${midY + 1}, ${x2} ${y2}`,
              `M12 12 Q ${midX} ${midY}, ${x2} ${y2}`,
            ],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.4,
            ease: "easeInOut",
          }}
        />
      );
    })}
    
    {/* Слой 5: Яркое пульсирующее ядро */}
    <motion.ellipse
      cx="12" cy="12"
      rx="2" ry="1.8"
      fill="white"
      opacity="0.9"
      animate={{
        scale: [1, 1.25, 1],
        opacity: [0.9, 1, 0.9],
        rotate: [0, 90, 180],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
    
    {/* Слой 6: Волновые частицы */}
    {[...Array(6)].map((_, i) => {
      const angle = (i * 60 * Math.PI) / 180;
      return (
        <motion.ellipse
          key={i}
          cx="12"
          cy="12"
          rx="0.8"
          ry="0.6"
          fill="currentColor"
          filter="blur(0.5px)"
          animate={{
            x: [0, Math.cos(angle) * 8, 0],
            y: [0, Math.sin(angle) * 8, 0],
            opacity: [0, 0.7, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.5,
            ease: [0.65, 0, 0.35, 1],
          }}
        />
      );
    })}
  </svg>
);

// ============================================
// 4. ВОРОНКА — Изгибающийся поток
// ============================================
export const FunnelIcon = ({ size = 24, className = "" }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <defs>
      <linearGradient id="funnel-flow" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="currentColor" stopOpacity="0.2" />
        <stop offset="50%" stopColor="currentColor" stopOpacity="0.6" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="1" />
      </linearGradient>
      <filter id="flow-blur">
        <feGaussianBlur in="SourceGraphic" stdDeviation="0.8" />
      </filter>
    </defs>
    
    {/* Слой 1: Текучая воронка (морфинг) */}
    <motion.path
      fill="url(#funnel-flow)"
      stroke="currentColor"
      strokeWidth="1.2"
      opacity="0.7"
      filter="url(#flow-blur)"
      animate={{
        d: [
          // Форма 1
          "M3 3 Q 4 3.5, 6 3 L 18 3 Q 20 3.5, 21 3 Q 20 7, 19 10 Q 18.5 11, 18 13 Q 17 15, 16 17 L 13 21 Q 12 21.5, 11 21 L 8 17 Q 7 15, 6 13 Q 5.5 11, 5 10 Q 4 7, 3 3 Z",
          // Форма 2 (левый изгиб)
          "M3 3 Q 3.5 3.5, 6 3 L 18 3 Q 20.5 3.5, 21 3 Q 19.5 7, 18.5 10 Q 18 11, 17.5 13 Q 16.5 15, 15.5 17 L 13 21 Q 12 21.8, 11 21 L 8.5 17 Q 7.5 15, 6.5 13 Q 6 11, 5.5 10 Q 4.5 7, 3 3 Z",
          // Форма 3 (правый изгиб)
          "M3 3 Q 4.5 3.5, 6 3 L 18 3 Q 19.5 3.5, 21 3 Q 20.5 7, 19.5 10 Q 19 11, 18.5 13 Q 17.5 15, 16.5 17 L 13 21 Q 12 21.2, 11 21 L 7.5 17 Q 6.5 15, 5.5 13 Q 5 11, 4.5 10 Q 3.5 7, 3 3 Z",
          // Форма 4 (узкая)
          "M3 3 Q 4 3.3, 6 3 L 18 3 Q 20 3.3, 21 3 Q 19 7, 18 10 Q 17 11, 16.5 13 Q 15.5 15, 15 17 L 13 21 Q 12 21.5, 11 21 L 9 17 Q 8.5 15, 7.5 13 Q 7 11, 6 10 Q 5 7, 3 3 Z",
          // Возврат
          "M3 3 Q 4 3.5, 6 3 L 18 3 Q 20 3.5, 21 3 Q 20 7, 19 10 Q 18.5 11, 18 13 Q 17 15, 16 17 L 13 21 Q 12 21.5, 11 21 L 8 17 Q 7 15, 6 13 Q 5.5 11, 5 10 Q 4 7, 3 3 Z",
        ],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
    
    {/* Слой 2: Волнистые уровни */}
    {[
      { y: 6, delay: 0 },
      { y: 10, delay: 0.3 },
      { y: 14, delay: 0.6 },
    ].map((level, i) => (
      <motion.path
        key={i}
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        opacity="0.4"
        animate={{
          d: [
            `M${5 + i} ${level.y} Q 12 ${level.y - 1}, ${19 - i} ${level.y}`,
            `M${5 + i} ${level.y} Q 12 ${level.y + 1}, ${19 - i} ${level.y}`,
            `M${5 + i} ${level.y} Q 12 ${level.y - 1}, ${19 - i} ${level.y}`,
          ],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: level.delay,
          ease: "easeInOut",
        }}
      />
    ))}
    
    {/* Слой 3: Падающие частицы по спиральным траекториям */}
    {[...Array(7)].map((_, i) => (
      <motion.ellipse
        key={i}
        cx={12 + (i % 2 === 0 ? -1 : 1) * (i * 0.5)}
        cy="3"
        rx="0.9"
        ry="0.7"
        fill="white"
        opacity="0.8"
        filter="blur(0.4px)"
        animate={{
          y: [0, 18],
          x: [0, Math.sin(i) * 3, -Math.sin(i) * 2, 0],
          opacity: [0, 1, 0.7, 0],
          scale: [0.5, 1.2, 1, 0.5],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          delay: i * 0.35,
          ease: "easeIn",
        }}
      />
    ))}
    
    {/* Слой 4: Энергетические потоки сверху */}
    {[
      { x: 8, curve: -2 },
      { x: 12, curve: 0 },
      { x: 16, curve: 2 },
    ].map((stream, i) => (
      <motion.path
        key={i}
        d={`M${stream.x} 1 Q ${stream.x + stream.curve} 3, ${stream.x} 5`}
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
        animate={{
          opacity: [0.2, 0.7, 0.2],
          d: [
            `M${stream.x} 1 Q ${stream.x + stream.curve} 3, ${stream.x} 5`,
            `M${stream.x} 1 Q ${stream.x - stream.curve} 3, ${stream.x} 5`,
            `M${stream.x} 1 Q ${stream.x + stream.curve} 3, ${stream.x} 5`,
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: i * 0.3,
          ease: "easeInOut",
        }}
      />
    ))}
    
    {/* Слой 5: Результат (органическая звезда) */}
    <motion.g
      animate={{
        scale: [1, 1.4, 1],
        rotate: [0, 90, 180],
        opacity: [0.7, 1, 0.7],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: [0.65, 0, 0.35, 1],
      }}
      style={{ originX: "12px", originY: "21px" }}
    >
      <path
        d="M12 19 Q 12.5 20, 13.5 20.5 Q 13 21, 12.5 22 Q 12 21.5, 11 21 Q 11.5 20.5, 12 19 Z"
        fill="white"
        filter="blur(0.5px)"
      />
    </motion.g>
    
    {/* Слой 6: Свечение результата */}
    <motion.ellipse
      cx="12" cy="21"
      rx="3" ry="2"
      fill="currentColor"
      opacity="0.2"
      filter="blur(1.5px)"
      animate={{
        scale: [1, 1.5, 1],
        opacity: [0.2, 0.4, 0.2],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
      }}
    />
  </svg>
);

// ============================================
// 5. ПРОДАЖИ — Текучий магнит
// ============================================
export const SalesIcon = ({ size = 24, className = "" }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <defs>
      <linearGradient id="magnet-flow" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
        <stop offset="50%" stopColor="currentColor" stopOpacity="0.5" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="1" />
      </linearGradient>
      <filter id="magnet-blur">
        <feGaussianBlur in="SourceGraphic" stdDeviation="0.6" />
      </filter>
    </defs>
    
    {/* Слой 1: Магнитное поле */}
    <motion.ellipse
      cx="12" cy="11"
      rx="10" ry="12"
      fill="url(#magnet-flow)"
      opacity="0.1"
      animate={{
        rx: [10, 12, 9, 11, 10],
        ry: [12, 10, 13, 9, 12],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: [0.45, 0.05, 0.55, 0.95],
      }}
    />
    
    {/* Слой 2: Изгибающийся магнит */}
    <motion.path
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      fill="none"
      filter="url(#magnet-blur)"
      animate={{
        d: [
          // Форма 1
          "M6 4 Q 5.5 8, 6 12 Q 6.5 15, 8 17 M18 4 Q 18.5 8, 18 12 Q 17.5 15, 16 17",
          // Форма 2 (сжатие)
          "M6 4 Q 5 8, 5.5 12 Q 6 15, 7.5 17 M18 4 Q 19 8, 18.5 12 Q 18 15, 16.5 17",
          // Форма 3 (расширение)
          "M6 4 Q 6 8, 6.5 12 Q 7 15, 8.5 17 M18 4 Q 18 8, 17.5 12 Q 17 15, 15.5 17",
          // Возврат
          "M6 4 Q 5.5 8, 6 12 Q 6.5 15, 8 17 M18 4 Q 18.5 8, 18 12 Q 17.5 15, 16 17",
        ],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
    
    {/* Слой 3: Внутренний контур */}
    <motion.path
      stroke="url(#magnet-flow)"
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
      opacity="0.6"
      animate={{
        d: [
          "M9 4 Q 8.5 8, 9 12 Q 9.5 14, 10 16 M15 4 Q 15.5 8, 15 12 Q 14.5 14, 14 16",
          "M9 4 Q 8 8, 8.5 12 Q 9 14, 9.5 16 M15 4 Q 16 8, 15.5 12 Q 15 14, 14.5 16",
          "M9 4 Q 9 8, 9.5 12 Q 10 14, 10.5 16 M15 4 Q 15 8, 14.5 12 Q 14 14, 13.5 16",
          "M9 4 Q 8.5 8, 9 12 Q 9.5 14, 10 16 M15 4 Q 15.5 8, 15 12 Q 14.5 14, 14 16",
        ],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
    
    {/* Слой 4: Энергетические линии притяжения (кривые) */}
    {[
      { start: { x: 4, y: 9 }, control: { x: 2, y: 11 }, end: { x: 3, y: 13 } },
      { start: { x: 20, y: 9 }, control: { x: 22, y: 11 }, end: { x: 21, y: 13 } },
    ].map((curve, i) => (
      <motion.path
        key={i}
        d={`M${curve.start.x} ${curve.start.y} Q ${curve.control.x} ${curve.control.y}, ${curve.end.x} ${curve.end.y}`}
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        animate={{
          opacity: [0.2, 0.6, 0.2],
          d: [
            `M${curve.start.x} ${curve.start.y} Q ${curve.control.x} ${curve.control.y}, ${curve.end.x} ${curve.end.y}`,
            `M${curve.start.x} ${curve.start.y} Q ${curve.control.x + (i === 0 ? -1 : 1)} ${curve.control.y + 1}, ${curve.end.x} ${curve.end.y}`,
            `M${curve.start.x} ${curve.start.y} Q ${curve.control.x} ${curve.control.y}, ${curve.end.x} ${curve.end.y}`,
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: i * 0.3,
          ease: "easeInOut",
        }}
      />
    ))}
    
    {/* Слой 5: Притягиваемые частицы (спиральные траектории) */}
    {[
      { side: 'left', start: { x: 3, y: 10 }, target: { x: 7, y: 12 } },
      { side: 'right', start: { x: 21, y: 10 }, target: { x: 17, y: 12 } },
      { side: 'left', start: { x: 4, y: 14 }, target: { x: 8, y: 15 } },
      { side: 'right', start: { x: 20, y: 14 }, target: { x: 16, y: 15 } },
      { side: 'left', start: { x: 2, y: 16 }, target: { x: 9, y: 17 } },
      { side: 'right', start: { x: 22, y: 16 }, target: { x: 15, y: 17 } },
    ].map((particle, i) => (
      <motion.ellipse
        key={i}
        cx={particle.start.x}
        cy={particle.start.y}
        rx="1.1"
        ry="0.8"
        fill="currentColor"
        opacity="0.7"
        filter="blur(0.5px)"
        animate={{
          x: [0, particle.target.x - particle.start.x],
          y: [0, particle.target.y - particle.start.y + Math.sin(i) * 2],
          opacity: [1, 0.5, 0],
          scale: [1, 0.7, 0.3],
          rotate: [0, particle.side === 'left' ? 180 : -180],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          delay: i * 0.4,
          ease: [0.65, 0, 0.35, 1],
        }}
      />
    ))}
    
    {/* Слой 6: Полюса магнита */}
    <motion.rect
      x="5" y="2" width="3" height="4" rx="1"
      fill="currentColor"
      opacity="0.8"
      animate={{
        opacity: [0.8, 1, 0.8],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
      }}
    />
    <motion.rect
      x="16" y="2" width="3" height="4" rx="1"
      fill="currentColor"
      opacity="0.8"
      animate={{
        opacity: [0.8, 1, 0.8],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        delay: 0.5,
      }}
    />
    <text x="6.5" y="5" fill="white" fontSize="3" fontWeight="bold">N</text>
    <text x="17.5" y="5" fill="white" fontSize="3" fontWeight="bold">S</text>
    
    {/* Слой 7: Монета-результат (покачивание) */}
    <motion.g
      animate={{
        y: [0, -3, 0],
        rotate: [0, 15, -15, 0],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      style={{ originX: "12px", originY: "21px" }}
    >
      <ellipse
        cx="12" cy="21" rx="2.5" ry="2"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M11 20 L11 22 M13 20 L13 22"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <ellipse
        cx="12" cy="21" rx="1" ry="0.8"
        fill="currentColor"
      />
    </motion.g>
  </svg>
);

// ============================================
// 6. БЛОГ — Асимметричное созвездие
// ============================================
export const BlogIcon = ({ size = 24, className = "" }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <defs>
      <radialGradient id="star-field">
        <stop offset="0%" stopColor="currentColor" stopOpacity="0.8" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
      </radialGradient>
      <filter id="star-blur">
        <feGaussianBlur in="SourceGraphic" stdDeviation="1" />
      </filter>
    </defs>
    
    {/* Слой 1: Центральное свечение (асимметричное) */}
    <motion.ellipse
      cx="12" cy="12"
      rx="9" ry="10"
      fill="url(#star-field)"
      opacity="0.2"
      animate={{
        rx: [9, 11, 8, 10, 9],
        ry: [10, 9, 12, 8, 10],
        rotate: [0, 45, 90, 135, 180],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: [0.45, 0.05, 0.55, 0.95],
      }}
    />
    
    {/* Слой 2: Центральная звезда (вы) — деформирующаяся */}
    <motion.ellipse
      cx="12" cy="12"
      rx="3" ry="2.5"
      fill="currentColor"
      filter="url(#star-blur)"
      animate={{
        rx: [3, 3.5, 2.7, 3.2, 3],
        ry: [2.5, 3, 3.5, 2.3, 2.5],
        rotate: [0, 60, 120, 180, 240, 300, 360],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
    
    {/* Слой 3: Лучи от центра (кривые, не прямые) */}
    {[
      { angle: 0, curve: 2 },
      { angle: 90, curve: -2 },
      { angle: 180, curve: 1.5 },
      { angle: 270, curve: -1.5 },
    ].map((ray, i) => {
      const rad = (ray.angle * Math.PI) / 180;
      const x2 = 12 + Math.cos(rad) * 5;
      const y2 = 12 + Math.sin(rad) * 5;
      const perpRad = rad + Math.PI / 2;
      const curveX = 12 + Math.cos(rad) * 2.5 + Math.cos(perpRad) * ray.curve;
      const curveY = 12 + Math.sin(rad) * 2.5 + Math.sin(perpRad) * ray.curve;
      
      return (
        <motion.path
          key={i}
          d={`M12 12 Q ${curveX} ${curveY}, ${x2} ${y2}`}
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
          animate={{
            opacity: [0.3, 0.8, 0.3],
            d: [
              `M12 12 Q ${curveX} ${curveY}, ${x2} ${y2}`,
              `M12 12 Q ${curveX + ray.curve * 0.5} ${curveY - ray.curve * 0.5}, ${x2} ${y2}`,
              `M12 12 Q ${curveX} ${curveY}, ${x2} ${y2}`,
            ],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeInOut",
          }}
        />
      );
    })}
    
    {/* Слой 4: Точки аудитории (асимметричное расположение) */}
    {[
      { x: 12, y: 4.5, rx: 1.8, ry: 1.5 },
      { x: 19, y: 7, rx: 1.5, ry: 1.3 },
      { x: 20, y: 13, rx: 1.6, ry: 1.4 },
      { x: 15, y: 19, rx: 1.7, ry: 1.5 },
      { x: 7, y: 18, rx: 1.5, ry: 1.4 },
      { x: 3.5, y: 12, rx: 1.6, ry: 1.3 },
      { x: 6, y: 6, rx: 1.4, ry: 1.2 },
    ].map((point, i) => (
      <motion.ellipse
        key={i}
        cx={point.x}
        cy={point.y}
        rx={point.rx}
        ry={point.ry}
        fill="currentColor"
        opacity="0.7"
        animate={{
          rx: [point.rx, point.rx + 0.3, point.rx - 0.2, point.rx + 0.15, point.rx],
          ry: [point.ry, point.ry - 0.2, point.ry + 0.3, point.ry - 0.15, point.ry],
          opacity: [0.6, 0.9, 0.7, 1, 0.6],
          rotate: [0, 45, 90],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          delay: i * 0.35,
          ease: "easeInOut",
        }}
      />
    ))}
    
    {/* Слой 5: Соединительные линии (кривые Безье) */}
    {[
      { from: { x: 12, y: 12 }, to: { x: 12, y: 4.5 }, curve: { x: 13, y: 8 } },
      { from: { x: 12, y: 12 }, to: { x: 19, y: 7 }, curve: { x: 16, y: 9 } },
      { from: { x: 12, y: 12 }, to: { x: 20, y: 13 }, curve: { x: 17, y: 12.5 } },
      { from: { x: 12, y: 12 }, to: { x: 15, y: 19 }, curve: { x: 13.5, y: 16 } },
      { from: { x: 12, y: 12 }, to: { x: 7, y: 18 }, curve: { x: 9, y: 15 } },
      { from: { x: 12, y: 12 }, to: { x: 3.5, y: 12 }, curve: { x: 7, y: 13 } },
      { from: { x: 12, y: 12 }, to: { x: 6, y: 6 }, curve: { x: 8, y: 9 } },
    ].map((line, i) => (
      <motion.path
        key={i}
        d={`M${line.from.x} ${line.from.y} Q ${line.curve.x} ${line.curve.y}, ${line.to.x} ${line.to.y}`}
        stroke="currentColor"
        strokeWidth="0.8"
        fill="none"
        animate={{
          opacity: [0.1, 0.4, 0.1],
          d: [
            `M${line.from.x} ${line.from.y} Q ${line.curve.x} ${line.curve.y}, ${line.to.x} ${line.to.y}`,
            `M${line.from.x} ${line.from.y} Q ${line.curve.x + 1} ${line.curve.y - 1}, ${line.to.x} ${line.to.y}`,
            `M${line.from.x} ${line.from.y} Q ${line.curve.x - 1} ${line.curve.y + 1}, ${line.to.x} ${line.to.y}`,
            `M${line.from.x} ${line.from.y} Q ${line.curve.x} ${line.curve.y}, ${line.to.x} ${line.to.y}`,
          ],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          delay: i * 0.5,
          ease: "easeInOut",
        }}
      />
    ))}
    
    {/* Слой 6: Волновые частицы вдоль связей */}
    {[0, 1, 2, 3, 4, 5, 6].map((i) => {
      const connections = [
        { from: { x: 12, y: 12 }, to: { x: 12, y: 4.5 } },
        { from: { x: 12, y: 12 }, to: { x: 19, y: 7 } },
        { from: { x: 12, y: 12 }, to: { x: 20, y: 13 } },
        { from: { x: 12, y: 12 }, to: { x: 15, y: 19 } },
        { from: { x: 12, y: 12 }, to: { x: 7, y: 18 } },
        { from: { x: 12, y: 12 }, to: { x: 3.5, y: 12 } },
        { from: { x: 12, y: 12 }, to: { x: 6, y: 6 } },
      ];
      const conn = connections[i];
      
      return (
        <motion.ellipse
          key={`p${i}`}
          cx={conn.from.x}
          cy={conn.from.y}
          rx="0.6"
          ry="0.5"
          fill="currentColor"
          filter="blur(0.5px)"
          animate={{
            x: [0, conn.to.x - conn.from.x],
            y: [0, conn.to.y - conn.from.y],
            opacity: [0, 0.8, 0],
            scale: [0.5, 1.2, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.3,
            ease: [0.65, 0, 0.35, 1],
          }}
        />
      );
    })}
  </svg>
);

// ============================================
// 7. КОМАНДА — Органическая синергия
// ============================================
export const TeamIcon = ({ size = 24, className = "" }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <defs>
      <radialGradient id="team-field">
        <stop offset="0%" stopColor="currentColor" stopOpacity="0.3" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
      </radialGradient>
      <filter id="team-blur">
        <feGaussianBlur in="SourceGraphic" stdDeviation="1" />
      </filter>
    </defs>
    
    {/* Слой 1: Общее поле (деформирующееся) */}
    <motion.ellipse
      cx="12" cy="12"
      rx="11" ry="10"
      fill="url(#team-field)"
      filter="url(#team-blur)"
      animate={{
        rx: [11, 13, 10, 12, 11],
        ry: [10, 11, 13, 9, 10],
        rotate: [0, 60, 120, 180, 240, 300, 360],
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        ease: [0.45, 0.05, 0.55, 0.95],
      }}
    />
    
    {/* Слой 2: 3 человека (асимметрично) */}
    {[
      { cx: 12, cy: 6, bodyY: 9 },
      { cx: 6.5, cy: 14, bodyY: 17 },
      { cx: 17.5, cy: 15, bodyY: 18 },
    ].map((person, i) => (
      <motion.g
        key={i}
        animate={{
          scale: [1, 1.06, 1],
          y: [0, -0.5, 0],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          delay: i * 0.4,
          ease: "easeInOut",
        }}
        style={{ originX: `${person.cx}px`, originY: `${person.cy}px` }}
      >
        {/* Голова (эллипс) */}
        <ellipse
          cx={person.cx}
          cy={person.cy}
          rx="2.2"
          ry="2"
          fill="currentColor"
          stroke="white"
          strokeWidth="1"
          opacity="0.9"
        />
        
        {/* Тело (кривая линия) */}
        <motion.path
          d={`M${person.cx - 2.5} ${person.bodyY} Q${person.cx} ${person.bodyY + 0.5} ${person.cx + 2.5} ${person.bodyY}`}
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
          animate={{
            d: [
              `M${person.cx - 2.5} ${person.bodyY} Q${person.cx} ${person.bodyY + 0.5} ${person.cx + 2.5} ${person.bodyY}`,
              `M${person.cx - 2.5} ${person.bodyY} Q${person.cx} ${person.bodyY - 0.3} ${person.cx + 2.5} ${person.bodyY}`,
              `M${person.cx - 2.5} ${person.bodyY} Q${person.cx} ${person.bodyY + 0.5} ${person.cx + 2.5} ${person.bodyY}`,
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.g>
    ))}
    
    {/* Слой 3: Текучие связи между людьми */}
    {[
      { from: { x: 12, y: 8 }, to: { x: 6.5, y: 12 }, curve: { x: 9, y: 10 } },
      { from: { x: 12, y: 8 }, to: { x: 17.5, y: 13 }, curve: { x: 15, y: 10.5 } },
      { from: { x: 8, y: 15 }, to: { x: 16, y: 16 }, curve: { x: 12, y: 17 } },
    ].map((connection, i) => (
      <motion.path
        key={i}
        d={`M${connection.from.x} ${connection.from.y} Q ${connection.curve.x} ${connection.curve.y}, ${connection.to.x} ${connection.to.y}`}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeDasharray="3 2"
        fill="none"
        animate={{
          opacity: [0.2, 0.6, 0.2],
          strokeDashoffset: [0, -10, 0],
          d: [
            `M${connection.from.x} ${connection.from.y} Q ${connection.curve.x} ${connection.curve.y}, ${connection.to.x} ${connection.to.y}`,
            `M${connection.from.x} ${connection.from.y} Q ${connection.curve.x + 1} ${connection.curve.y - 1}, ${connection.to.x} ${connection.to.y}`,
            `M${connection.from.x} ${connection.from.y} Q ${connection.curve.x - 1} ${connection.curve.y + 1}, ${connection.to.x} ${connection.to.y}`,
            `M${connection.from.x} ${connection.from.y} Q ${connection.curve.x} ${connection.curve.y}, ${connection.to.x} ${connection.to.y}`,
          ],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          delay: i * 0.4,
          ease: "easeInOut",
        }}
      />
    ))}
    
    {/* Слой 4: Центральная точка силы (асимметричная) */}
    <motion.ellipse
      cx="12" cy="12"
      rx="2" ry="1.5"
      fill="white"
      opacity="0.9"
      animate={{
        rx: [2, 2.5, 1.8, 2.2, 2],
        ry: [1.5, 2, 2.3, 1.7, 1.5],
        rotate: [0, 90, 180, 270, 360],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
    
    {/* Слой 5: Кольцо вокруг точки */}
    <motion.ellipse
      cx="12" cy="12"
      rx="4" ry="3"
      stroke="white"
      strokeWidth="0.6"
      fill="none"
      animate={{
        rx: [4, 5, 3.5, 4.5, 4],
        ry: [3, 4, 4.5, 2.5, 3],
        opacity: [0.3, 0.6, 0.3],
        rotate: [0, 120, 240, 360],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
    
    {/* Слой 6: Символ бесконечности (текучий) */}
    <motion.path
      d="M9 12 Q 10 10, 12 12 Q 14 14, 15 12"
      stroke="white"
      strokeWidth="1"
      fill="none"
      animate={{
        opacity: [0.4, 0.8, 0.4],
        d: [
          "M9 12 Q 10 10, 12 12 Q 14 14, 15 12",
          "M9 12 Q 10 14, 12 12 Q 14 10, 15 12",
          "M9 12 Q 10 10, 12 12 Q 14 14, 15 12",
        ],
      }}
      transition={{
        duration: 2.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
    
    {/* Слой 7: Частицы вокруг (асимметричные траектории) */}
    {[
      { x: 12, y: 2, path: "Q 14 4, 16 6" },
      { x: 21, y: 11, path: "Q 19 13, 17 15" },
      { x: 4, y: 13, path: "Q 6 15, 8 17" },
      { x: 7, y: 20, path: "Q 9 18, 11 16" },
      { x: 17, y: 21, path: "Q 15 19, 13 17" },
    ].map((particle, i) => (
      <motion.ellipse
        key={i}
        cx={particle.x}
        cy={particle.y}
        rx="0.7"
        ry="0.6"
        fill="currentColor"
        filter="blur(0.5px)"
        animate={{
          opacity: [0, 0.8, 0],
          scale: [0, 1.5, 0],
          x: [0, Math.cos(i) * 3, 0],
          y: [0, Math.sin(i) * 3, 0],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          delay: i * 0.5,
          ease: [0.65, 0, 0.35, 1],
        }}
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
