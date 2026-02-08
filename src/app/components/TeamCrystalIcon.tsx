import { motion } from "motion/react";

interface IconProps {
  size?: number;
  className?: string;
}

// ============================================
// КОМАНДА — Триквестр (три переплетённых лепестка с треугольником в центре)
// ============================================
export const TeamIcon = ({ size = 24, className = "" }: IconProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <defs>
        {/* Градиенты для дуг */}
        <linearGradient id="arc-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="50%" stopColor="#67e8f9" />
          <stop offset="100%" stopColor="#c084fc" />
        </linearGradient>
        
        <linearGradient id="arc-grad-2" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#a855f7" />
          <stop offset="50%" stopColor="#e879f9" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
        
        <linearGradient id="arc-grad-3" x1="50%" y1="100%" x2="50%" y2="0%">
          <stop offset="0%" stopColor="#0891b2" />
          <stop offset="50%" stopColor="#c084fc" />
          <stop offset="100%" stopColor="#f0abfc" />
        </linearGradient>
        
        {/* Свечение */}
        <radialGradient id="trinity-glow">
          <stop offset="0%" stopColor="#67e8f9" stopOpacity="0.6" />
          <stop offset="50%" stopColor="#c084fc" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
        </radialGradient>
        
        {/* Градиент для треугольника */}
        <radialGradient id="triangle-grad" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#67e8f9" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#c084fc" stopOpacity="0.4" />
        </radialGradient>
      </defs>
      
      {/* Космическое свечение */}
      <motion.circle
        cx="12" cy="12" r="11"
        fill="url(#trinity-glow)"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
      />
      
      {/* Пульсирующие кольца */}
      {[0, 1, 2].map((i) => (
        <motion.circle
          key={`glow-ring${i}`}
          cx="12" cy="12" r="8"
          fill="none"
          stroke="#67e8f9"
          strokeWidth="0.3"
          opacity="0.2"
          animate={{
            scale: [1, 1.5, 1.8],
            opacity: [0.4, 0.2, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 1,
          }}
        />
      ))}
      
      {/* ТРИКВЕСТР */}
      <motion.g
        animate={{
          scale: [1, 1.03, 1],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ originX: "12px", originY: "12px" }}
      >
        {/* ЛЕПЕСТОК 1 - Верхний */}
        <g>
          {/* Левая дуга лепестка */}
          <motion.path
            d="M 12 12 C 9 12 8 9 12 5"
            fill="none"
            stroke="url(#arc-grad-1)"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.95"
            animate={{
              opacity: [0.9, 1, 0.9],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
          />
          {/* Правая дуга лепестка */}
          <motion.path
            d="M 12 5 C 16 9 15 12 12 12"
            fill="none"
            stroke="url(#arc-grad-1)"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.95"
            animate={{
              opacity: [0.9, 1, 0.9],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
          />
          {/* Блик */}
          <motion.path
            d="M 11 10 C 10 9 10.5 7.5 12 6"
            fill="none"
            stroke="#ffffff"
            strokeWidth="0.7"
            strokeLinecap="round"
            opacity="0.5"
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
            }}
          />
        </g>
        
        {/* ЛЕПЕСТОК 2 - Левый нижний (повёрнут на 120°) */}
        <g transform="rotate(120 12 12)">
          {/* Левая дуга лепестка */}
          <motion.path
            d="M 12 12 C 9 12 8 9 12 5"
            fill="none"
            stroke="url(#arc-grad-2)"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.95"
            animate={{
              opacity: [0.9, 1, 0.9],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: 0.4,
            }}
          />
          {/* Правая дуга лепестка */}
          <motion.path
            d="M 12 5 C 16 9 15 12 12 12"
            fill="none"
            stroke="url(#arc-grad-2)"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.95"
            animate={{
              opacity: [0.9, 1, 0.9],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: 0.4,
            }}
          />
          {/* Блик */}
          <motion.path
            d="M 11 10 C 10 9 10.5 7.5 12 6"
            fill="none"
            stroke="#ffffff"
            strokeWidth="0.7"
            strokeLinecap="round"
            opacity="0.5"
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              delay: 0.4,
            }}
          />
        </g>
        
        {/* ЛЕПЕСТОК 3 - Правый нижний (повёрнут на 240°) */}
        <g transform="rotate(240 12 12)">
          {/* Левая дуга лепестка */}
          <motion.path
            d="M 12 12 C 9 12 8 9 12 5"
            fill="none"
            stroke="url(#arc-grad-3)"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.95"
            animate={{
              opacity: [0.9, 1, 0.9],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: 0.8,
            }}
          />
          {/* Правая дуга лепестка */}
          <motion.path
            d="M 12 5 C 16 9 15 12 12 12"
            fill="none"
            stroke="url(#arc-grad-3)"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.95"
            animate={{
              opacity: [0.9, 1, 0.9],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: 0.8,
            }}
          />
          {/* Блик */}
          <motion.path
            d="M 11 10 C 10 9 10.5 7.5 12 6"
            fill="none"
            stroke="#ffffff"
            strokeWidth="0.7"
            strokeLinecap="round"
            opacity="0.5"
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              delay: 0.8,
            }}
          />
        </g>
        
        {/* ЦЕНТРАЛЬНЫЙ ТРЕУГОЛЬНИК - образуется пересечением */}
        <motion.path
          d="M 12 10.5 L 10.7 12.5 L 13.3 12.5 Z"
          fill="url(#triangle-grad)"
          stroke="#67e8f9"
          strokeWidth="0.3"
          animate={{
            opacity: [0.6, 0.9, 0.6],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        />
        
        {/* Свечение в центре треугольника */}
        <motion.circle
          cx="12" cy="11.8" r="0.6"
          fill="#ffffff"
          animate={{
            opacity: [0.7, 1, 0.7],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        />
      </motion.g>
      
      {/* Искры на вершинах лепестков */}
      {[
        { x: 12, y: 5, delay: 0 },
        { x: 6, y: 16.06, delay: 0.4 },
        { x: 18, y: 16.06, delay: 0.8 },
      ].map((spark, i) => (
        <motion.g key={`spark${i}`}>
          <motion.circle
            cx={spark.x}
            cy={spark.y}
            r="1.8"
            fill="#ffffff"
            opacity="0.15"
            animate={{
              scale: [0, 1.5, 0],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              delay: spark.delay,
            }}
          />
          <motion.circle
            cx={spark.x}
            cy={spark.y}
            r="0.6"
            fill="#67e8f9"
            animate={{
              opacity: [0.4, 1, 0.4],
              scale: [0.7, 1.3, 0.7],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              delay: spark.delay,
            }}
          />
        </motion.g>
      ))}
      
      {/* Звездная пыль вокруг */}
      {[...Array(18)].map((_, i) => {
        const angle = (i * 20 * Math.PI) / 180;
        const distance = 9.5 + Math.random() * 1.5;
        const x = 12 + Math.cos(angle) * distance;
        const y = 12 + Math.sin(angle) * distance;
        
        return (
          <motion.circle
            key={`dust${i}`}
            cx={x}
            cy={y}
            r="0.35"
            fill={i % 3 === 0 ? "#67e8f9" : i % 3 === 1 ? "#f0abfc" : "#a78bfa"}
            animate={{
              opacity: [0, 0.9, 0],
              scale: [0, 1.3, 0],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              delay: i * 0.15,
            }}
          />
        );
      })}
      
      {/* Блестки в форме звездочек */}
      {[0, 60, 120, 180, 240, 300].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const x = 12 + Math.cos(rad) * 10.5;
        const y = 12 + Math.sin(rad) * 10.5;
        
        return (
          <motion.path
            key={`sparkle${i}`}
            d={`M${x} ${y - 0.8} L${x + 0.35} ${y} L${x} ${y + 0.8} L${x - 0.35} ${y} Z`}
            fill={i % 2 === 0 ? "#67e8f9" : "#f0abfc"}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.3,
            }}
            style={{ originX: `${x}px`, originY: `${y}px` }}
          />
        );
      })}
      
      {/* Золотые частицы по орбите */}
      {[0, 1, 2].map((i) => (
        <motion.circle
          key={`orbit${i}`}
          r="0.5"
          fill="#fde68a"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 0.5,
          }}
        >
          <animateMotion
            dur="4s"
            repeatCount="indefinite"
            begin={`${i * 0.5}s`}
            path="M 12,5 A 7,7 0 1,1 11.99,5"
          />
        </motion.circle>
      ))}
    </svg>
  );
};
