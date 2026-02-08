import { motion } from "motion/react";

interface IconProps {
  size?: number;
  className?: string;
}

// ============================================
// ВИДЕНИЕ — Глаз с закручивающейся галактикой
// ============================================
export const VisionIcon = ({ size = 24, className = "" }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <defs>
      {/* Градиенты для галактики */}
      <radialGradient id="galaxy-core">
        <stop offset="0%" stopColor="#fae8ff" />
        <stop offset="30%" stopColor="#f0abfc" />
        <stop offset="60%" stopColor="#c084fc" />
        <stop offset="100%" stopColor="#7c3aed" />
      </radialGradient>
      
      <radialGradient id="galaxy-outer">
        <stop offset="0%" stopColor="#67e8f9" stopOpacity="0.8" />
        <stop offset="40%" stopColor="#22d3ee" stopOpacity="0.6" />
        <stop offset="70%" stopColor="#818cf8" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#4c1d95" stopOpacity="0" />
      </radialGradient>
      
      <linearGradient id="iris-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#67e8f9" />
        <stop offset="30%" stopColor="#818cf8" />
        <stop offset="60%" stopColor="#c084fc" />
        <stop offset="100%" stopColor="#7c3aed" />
      </linearGradient>
      
      <linearGradient id="eye-white" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#fae8ff" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#e9d5ff" stopOpacity="0.1" />
      </linearGradient>
      
      {/* Фильтр свечения */}
      <filter id="glow">
        <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
      
      <filter id="soft-glow">
        <feGaussianBlur stdDeviation="0.8" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    
    {/* Магическая аура вокруг глаза */}
    <motion.ellipse
      cx="12" cy="12" rx="14" ry="8"
      fill="url(#galaxy-outer)"
      animate={{
        scale: [1, 1.15, 1],
        opacity: [0.2, 0.4, 0.2],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
    
    {/* Контур глаза (белок) - более узкая миндалевидная форма */}
    <ellipse
      cx="12" cy="12" rx="8" ry="5"
      fill="url(#eye-white)"
      stroke="#e9d5ff"
      strokeWidth="0.3"
      opacity="0.6"
    />
    
    {/* Внешнее кольцо радужки с галактической текстурой */}
    <motion.ellipse
      cx="12" cy="12" rx="7.2" ry="5"
      fill="url(#iris-gradient)"
      opacity="0.85"
      animate={{
        rotate: [0, 360],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "linear",
      }}
      style={{ originX: "12px", originY: "12px" }}
    />
    
    {/* Спиральные рукава галактики (внутри радужки) */}
    {[0, 60, 120, 180, 240, 300].map((angle, i) => {
      const rad = (angle * Math.PI) / 180;
      const startX = 12 + Math.cos(rad) * 0.5;
      const startY = 12 + Math.sin(rad) * 0.5;
      const endX = 12 + Math.cos(rad) * 5;
      const endY = 12 + Math.sin(rad) * 5;
      
      return (
        <motion.path
          key={`arm${i}`}
          d={`M ${startX} ${startY} Q ${12 + Math.cos(rad + 0.5) * 3} ${12 + Math.sin(rad + 0.5) * 3}, ${endX} ${endY}`}
          stroke={i % 2 === 0 ? "#67e8f9" : "#f0abfc"}
          strokeWidth="0.4"
          fill="none"
          opacity="0.5"
          filter="url(#soft-glow)"
          animate={{
            rotate: [0, 360],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
            delay: i * 0.5,
          }}
          style={{ originX: "12px", originY: "12px" }}
        />
      );
    })}
    
    {/* Звездная пыль в галактике (разные слои вращения) */}
    {[...Array(24)].map((_, i) => {
      const angle = (i * 15 * Math.PI) / 180;
      const distance = 1.5 + Math.random() * 3.5;
      const x = 12 + Math.cos(angle) * distance;
      const y = 12 + Math.sin(angle) * distance;
      const colors = ["#67e8f9", "#f0abfc", "#c084fc", "#fae8ff"];
      
      return (
        <motion.circle
          key={`stardust${i}`}
          cx={x}
          cy={y}
          r={0.25 + Math.random() * 0.2}
          fill={colors[i % colors.length]}
          filter="url(#glow)"
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
            x: [0, Math.cos(angle) * 0.5],
            y: [0, Math.sin(angle) * 0.5],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: i * 0.1,
          }}
        />
      );
    })}
    
    {/* Центр галактики (яркое ядро) */}
    <motion.circle
      cx="12" cy="12" r="2"
      fill="url(#galaxy-core)"
      filter="url(#glow)"
      animate={{
        scale: [1, 1.3, 1],
        opacity: [0.8, 1, 0.8],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
    
    {/* Зрачок (черная дыра) */}
    <motion.circle
      cx="12" cy="12" r="1.5"
      fill="#0f0920"
      animate={{
        scale: [1, 0.9, 1],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
    
    {/* Вращающиеся звезды внутри галактики */}
    {[...Array(12)].map((_, i) => {
      const angle = (i * 30 * Math.PI) / 180;
      const distance = 2 + (i % 3);
      
      return (
        <motion.g key={`star${i}`}>
          <motion.circle
            cx={12}
            cy={12}
            r="0.4"
            fill={i % 2 === 0 ? "#67e8f9" : "#fae8ff"}
            filter="url(#glow)"
            animate={{
              x: [Math.cos(angle) * distance, Math.cos(angle + Math.PI * 2) * distance],
              y: [Math.sin(angle) * distance, Math.sin(angle + Math.PI * 2) * distance],
              opacity: [0.5, 1, 0.5],
              scale: [0.8, 1.3, 0.8],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.3,
            }}
          />
        </motion.g>
      );
    })}
    
    {/* Блик на глазу (отражение света) */}
    <motion.ellipse
      cx="10" cy="10" rx="2" ry="2.5"
      fill="#ffffff"
      opacity="0.4"
      animate={{
        opacity: [0.3, 0.5, 0.3],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
      }}
    />
    
    <motion.circle
      cx="9.5" cy="9.5" r="0.8"
      fill="#ffffff"
      opacity="0.8"
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.6, 0.9, 0.6],
      }}
      transition={{
        duration: 2.5,
        repeat: Infinity,
      }}
    />
    
    {/* Искры энергии вокруг глаза */}
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
      const rad = (angle * Math.PI) / 180;
      const x = 12 + Math.cos(rad) * 9;
      const y = 12 + Math.sin(rad) * 6.5;
      
      return (
        <motion.path
          key={`spark${i}`}
          d={`M${x} ${y - 0.8} L${x + 0.3} ${y} L${x} ${y + 0.8} L${x - 0.3} ${y} Z`}
          fill={i % 2 === 0 ? "#67e8f9" : "#f0abfc"}
          filter="url(#glow)"
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
    
    {/* Магические частицы вокруг (звездная пыль атмосферы) */}
    {[...Array(16)].map((_, i) => {
      const angle = (i * 22.5 * Math.PI) / 180;
      const distance = 8 + Math.random() * 3;
      const x = 12 + Math.cos(angle) * distance;
      const y = 12 + Math.sin(angle) * (distance * 0.7);
      
      return (
        <motion.circle
          key={`ambient${i}`}
          cx={x}
          cy={y}
          r="0.3"
          fill={i % 3 === 0 ? "#67e8f9" : i % 3 === 1 ? "#f0abfc" : "#fae8ff"}
          animate={{
            opacity: [0, 0.8, 0],
            scale: [0, 1.2, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 0.15,
          }}
        />
      );
    })}
    
    {/* Пульсирующие волны энергии от центра */}
    {[0, 1, 2].map((index) => (
      <motion.ellipse
        key={`wave${index}`}
        cx="12" cy="12" rx="5" ry="5"
        fill="none"
        stroke="#67e8f9"
        strokeWidth="0.3"
        opacity="0.3"
        animate={{
          scale: [1, 2.5, 1],
          opacity: [0.5, 0, 0.5],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          delay: index * 1.3,
        }}
        style={{ originX: "12px", originY: "12px" }}
      />
    ))}
  </svg>
);