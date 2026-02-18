import { motion } from "motion/react";
import eyeImage from 'figma:asset/7323af24a6c904a3eb3df57f59983efbebedd7c3.png';

interface IconProps {
  size?: number;
  className?: string;
}

// Импорт новых версий иконок
export { TeamIcon } from "./TeamCrystalIcon";
export { FunnelIcon } from "./RainbowFunnelIcon";
export { BlogIcon } from "./FeatherQuillIcon";
export { BonusIcon } from "./GiftBonusIcon";
export { SalesIcon } from "./TreasureChestIcon";

// ============================================
// 1. АУТЕНТИЧНОСТЬ — Космический глаз с галактикой (3D изображение)
// ============================================
export const AuthenticityIcon = ({ size = 24, className = "" }: IconProps) => (
  <motion.div
    className={className}
    style={{
      width: size,
      height: size,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
    animate={{
      scale: [1, 1.05, 1],
      filter: [
        'drop-shadow(0 0 8px rgba(168, 85, 247, 0.4))',
        'drop-shadow(0 0 16px rgba(168, 85, 247, 0.6))',
        'drop-shadow(0 0 8px rgba(168, 85, 247, 0.4))',
      ],
    }}
    transition={{
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  >
    <img 
      src={eyeImage} 
      alt="Vision Eye" 
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'contain',
      }}
    />
  </motion.div>
);

// ============================================
// 2. ЛЮБОВЬ К ЛЮДЯМ — Сердце с пульсацией
// ============================================
export const LoveIcon = ({ size = 24, className = "" }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <defs>
      {/* Романтический розовый градиент */}
      <linearGradient id="heart-magic" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fda4af" />
        <stop offset="50%" stopColor="#f43f5e" />
        <stop offset="100%" stopColor="#be123c" />
      </linearGradient>
      
      <radialGradient id="heart-glow">
        <stop offset="0%" stopColor="#fecdd3" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#fda4af" stopOpacity="0" />
      </radialGradient>
    </defs>
    
    {/* Свечение сердца */}
    <motion.circle
      cx="12" cy="12" r="10"
      fill="url(#heart-glow)"
      animate={{
        scale: [1, 1.3, 1],
        opacity: [0.4, 0.6, 0.4],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
      }}
    />
    
    {/* Основное сердце */}
    <motion.path
      d="M12 20.5 C12 20.5 4 15 4 9.5 C4 6 6.5 3.5 9 3.5 C10.5 3.5 11.5 4.5 12 6 C12.5 4.5 13.5 3.5 15 3.5 C17.5 3.5 20 6 20 9.5 C20 15 12 20.5 12 20.5 Z"
      fill="url(#heart-magic)"
      stroke="white"
      strokeWidth="1"
      animate={{
        scale: [1, 1.05, 1],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
      }}
      style={{ originX: "12px", originY: "12px" }}
    />
    
    {/* Внутреннее свечение */}
    <path
      d="M12 18.5 C12 18.5 5.5 14 5.5 9.5 C5.5 7.5 7 5.5 9 5.5 C10.3 5.5 11.2 6.3 12 7.5 C12.8 6.3 13.7 5.5 15 5.5 C17 5.5 18.5 7.5 18.5 9.5 C18.5 14 12 18.5 12 18.5 Z"
      fill="#be123c"
      opacity="0.3"
    />
    
    {/* Звезды внутри сердца */}
    {[
      { x: 12, y: 10, delay: 0 },
      { x: 10, y: 12, delay: 0.3 },
      { x: 14, y: 11.5, delay: 0.6 },
      { x: 12, y: 13.5, delay: 0.9 },
      { x: 11, y: 14.5, delay: 1.2 },
      { x: 13, y: 14, delay: 1.5 },
    ].map((star, i) => (
      <motion.g
        key={i}
        animate={{
          opacity: [0.4, 1, 0.4],
          scale: [0.8, 1.2, 0.8],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: star.delay,
        }}
      >
        <circle cx={star.x} cy={star.y} r="0.3" fill="white" />
        <path
          d={`M${star.x} ${star.y - 0.8} L${star.x + 0.3} ${star.y - 0.3} L${star.x + 0.8} ${star.y} L${star.x + 0.3} ${star.y + 0.3} L${star.x} ${star.y + 0.8} L${star.x - 0.3} ${star.y + 0.3} L${star.x - 0.8} ${star.y} L${star.x - 0.3} ${star.y - 0.3} Z`}
          fill="white"
          opacity="0.8"
        />
      </motion.g>
    ))}
    
    {/* Блик */}
    <ellipse
      cx="8.5" cy="7.5" rx="3" ry="2.5"
      fill="white"
      opacity="0.4"
    />
    
    {/* Расходящиеся кольца */}
    {[0, 1].map((i) => (
      <motion.path
        key={`ring${i}`}
        d="M12 21 C12 21 3 15 3 9 C3 5.5 6 3 8.5 3 C10.5 3 11.5 4.5 12 6 C12.5 4.5 13.5 3 15.5 3 C18 3 21 5.5 21 9 C21 15 12 21 12 21 Z"
        fill="none"
        stroke="#fca5a5"
        strokeWidth="0.5"
        animate={{
          scale: [1, 1.2, 1.4],
          opacity: [0.5, 0.3, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: i * 1,
        }}
        style={{ originX: "12px", originY: "12px" }}
      />
    ))}
    
    {/* Звездная пыль вокруг */}
    {[...Array(8)].map((_, i) => {
      const angle = (i * 45 * Math.PI) / 180;
      const distance = 10.5;
      return (
        <motion.circle
          key={`dust${i}`}
          cx={12 + Math.cos(angle) * distance}
          cy={12 + Math.sin(angle) * distance}
          r="0.5"
          fill="#f9a8d4"
          animate={{
            opacity: [0, 0.8, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.25,
          }}
        />
      );
    })}
  </svg>
);

// ============================================
// 3. ПРОДУКТ — Сакральная геометрия
// ============================================
export const ProductIcon = ({ size = 24, className = "" }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <defs>
      {/* Золотой градиент */}
      <linearGradient id="sacred-gold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fde68a" />
        <stop offset="50%" stopColor="#fbbf24" />
        <stop offset="100%" stopColor="#f59e0b" />
      </linearGradient>
      
      {/* Свечение */}
      <radialGradient id="sacred-aura">
        <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#c084fc" stopOpacity="0" />
      </radialGradient>
    </defs>
    
    {/* Космическое сияние */}
    <motion.circle
      cx="12" cy="12" r="11"
      fill="url(#sacred-aura)"
      animate={{
        scale: [1, 1.3, 1],
        opacity: [0.2, 0.5, 0.2],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
      }}
    />
    
    {/* СЕМЯ ЖИЗНИ - 7 кругов */}
    {/* Центральный круг */}
    <motion.circle
      cx="12" cy="12" r="4.5"
      fill="none"
      stroke="url(#sacred-gold)"
      strokeWidth="0.8"
      animate={{
        opacity: [0.7, 1, 0.7],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
      }}
    />
    
    {/* 6 внешних кргов */}
    {[0, 60, 120, 180, 240, 300].map((angle, i) => {
      const rad = (angle * Math.PI) / 180;
      const x = 12 + Math.cos(rad) * 4.5;
      const y = 12 + Math.sin(rad) * 4.5;
      
      return (
        <motion.circle
          key={`seed${i}`}
          cx={x}
          cy={y}
          r="4.5"
          fill="none"
          stroke="url(#sacred-gold)"
          strokeWidth="0.8"
          animate={{
            opacity: [0.6, 0.95, 0.6],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.15,
          }}
        />
      );
    })}
    
    {/* Центральная точка силы */}
    <motion.circle
      cx="12" cy="12" r="1.2"
      fill="url(#sacred-gold)"
      animate={{
        scale: [1, 1.4, 1],
        opacity: [0.7, 1, 0.7],
      }}
      transition={{
        duration: 2.5,
        repeat: Infinity,
      }}
    />
    
    {/* МЕРКАБА - Большой треугольник вверх */}
    <motion.path
      d="M12 3.5 L20.5 18 L3.5 18 Z"
      fill="none"
      stroke="url(#sacred-gold)"
      strokeWidth="1.2"
      opacity="0.9"
      animate={{
        opacity: [0.7, 1, 0.7],
        scale: [0.98, 1.02, 0.98],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
      }}
      style={{ originX: "12px", originY: "12px" }}
    />
    
    {/* МЕРКАБА - Большой треугольник вниз */}
    <motion.path
      d="M12 20.5 L3.5 6 L20.5 6 Z"
      fill="none"
      stroke="url(#sacred-gold)"
      strokeWidth="1.2"
      opacity="0.9"
      animate={{
        opacity: [0.6, 0.95, 0.6],
        scale: [1.02, 0.98, 1.02],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        delay: 2,
      }}
      style={{ originX: "12px", originY: "12px" }}
    />
    
    {/* Горизонтальная линия через центр */}
    <motion.line
      x1="3" y1="12" x2="21" y2="12"
      stroke="url(#sacred-gold)"
      strokeWidth="0.6"
      opacity="0.6"
      animate={{
        opacity: [0.4, 0.7, 0.4],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
      }}
    />
    
    {/* Звездная пыль */}
    {[...Array(18)].map((_, i) => {
      const angle = (i * 20 * Math.PI) / 180;
      const distance = 10;
      
      return (
        <motion.circle
          key={`stardust${i}`}
          cx={12 + Math.cos(angle) * distance}
          cy={12 + Math.sin(angle) * distance}
          r="0.35"
          fill="#fde68a"
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.3, 0],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            delay: i * 0.12,
          }}
        />
      );
    })}
    
    {/* Мерцающие точки на пересечениях */}
    {[
      { x: 12, y: 3.5 },
      { x: 12, y: 20.5 },
      { x: 3.5, y: 6 },
      { x: 20.5, y: 6 },
      { x: 3.5, y: 18 },
      { x: 20.5, y: 18 },
    ].map((point, i) => (
      <motion.circle
        key={`vertex${i}`}
        cx={point.x}
        cy={point.y}
        r="0.8"
        fill="#fbbf24"
        animate={{
          opacity: [0.5, 1, 0.5],
          scale: [0.8, 1.2, 0.8],
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
// 4. ВОРОНКА ПРОДАЖ — Созвездие Большой Медведицы
// ============================================
export const SalesFunnelIcon = ({ size = 24, className = "" }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <defs>
      {/* Градиент звезд */}
      <radialGradient id="star-gradient">
        <stop offset="0%" stopColor="#fde68a" />
        <stop offset="50%" stopColor="#fbbf24" />
        <stop offset="100%" stopColor="#f59e0b" />
      </radialGradient>
      
      {/* Свечение созвездия */}
      <radialGradient id="constellation-glow">
        <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
      </radialGradient>
      
      {/* Радужный градиент для потока */}
      <linearGradient id="rainbow-flow" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#ef4444" />
        <stop offset="16.67%" stopColor="#f97316" />
        <stop offset="33.33%" stopColor="#fbbf24" />
        <stop offset="50%" stopColor="#22c55e" />
        <stop offset="66.67%" stopColor="#06b6d4" />
        <stop offset="83.33%" stopColor="#6366f1" />
        <stop offset="100%" stopColor="#a855f7" />
      </linearGradient>
    </defs>
    
    {/* Космическое свечение */}
    <motion.circle
      cx="12" cy="12" r="11"
      fill="url(#constellation-glow)"
      animate={{
        scale: [1, 1.15, 1],
        opacity: [0.3, 0.5, 0.3],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
      }}
    />
    
    {/* Радужный поток внутри воронки */}
    <motion.g>
      {/* Широкий поток сверху */}
      <motion.path
        d="M 10 7 L 14 7 L 13 11 L 11 11 Z"
        fill="url(#rainbow-flow)"
        opacity="0.6"
        animate={{
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      />
      
      {/* Средний поток */}
      <motion.path
        d="M 11 11 L 13 11 L 12.5 14 L 11.5 14 Z"
        fill="url(#rainbow-flow)"
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
      
      {/* Узкий поток снизу */}
      <motion.path
        d="M 11.5 14 L 12.5 14 L 12 17 L 12 17 Z"
        fill="url(#rainbow-flow)"
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
      
      {/* Радужные частицы, стекающие вниз */}
      {[...Array(8)].map((_, i) => {
        const startY = 6 + (i % 3) * 0.5;
        const endY = 18;
        const x = 11 + Math.random() * 2;
        const colors = ['#ef4444', '#fbbf24', '#22c55e', '#06b6d4', '#6366f1', '#a855f7'];
        
        return (
          <motion.circle
            key={`rainbow-drop${i}`}
            cx={x}
            cy={startY}
            r="0.4"
            fill={colors[i % colors.length]}
            animate={{
              cy: [startY, endY],
              opacity: [0, 0.9, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.4,
              ease: "easeIn",
            }}
          />
        );
      })}
    </motion.g>
    
    {/* Большая Медведица - звезды */}
    {[
      { x: 8, y: 7, size: 1.2 },      // Дубхе
      { x: 11, y: 6, size: 1 },       // Мерак
      { x: 14, y: 8, size: 0.9 },     // Фекда
      { x: 15.5, y: 11, size: 0.8 },  // Мегрец
      { x: 16, y: 14.5, size: 1.1 },  // Алиот
      { x: 14, y: 16.5, size: 0.9 },  // Мицар
      { x: 11.5, y: 17, size: 0.85 }, // Бенетнаш
    ].map((star, i) => (
      <motion.g key={`star${i}`}>
        {/* Звездное сияние */}
        <motion.circle
          cx={star.x}
          cy={star.y}
          r={star.size * 2}
          fill="url(#star-gradient)"
          opacity="0.2"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 2 + i * 0.2,
            repeat: Infinity,
            delay: i * 0.3,
          }}
        />
        
        {/* Звезда */}
        <motion.circle
          cx={star.x}
          cy={star.y}
          r={star.size}
          fill="url(#star-gradient)"
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
        
        {/* Крестик звезды */}
        <motion.g
          animate={{
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        >
          <line
            x1={star.x}
            y1={star.y - star.size * 1.5}
            x2={star.x}
            y2={star.y + star.size * 1.5}
            stroke="#fde68a"
            strokeWidth="0.3"
            opacity="0.8"
          />
          <line
            x1={star.x - star.size * 1.5}
            y1={star.y}
            x2={star.x + star.size * 1.5}
            y2={star.y}
            stroke="#fde68a"
            strokeWidth="0.3"
            opacity="0.8"
          />
        </motion.g>
      </motion.g>
    ))}
    
    {/* Соединительные линии созвездия */}
    <motion.g
      animate={{
        opacity: [0.4, 0.7, 0.4],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
      }}
    >
      <line x1="8" y1="7" x2="11" y2="6" stroke="#c084fc" strokeWidth="0.5" opacity="0.6" />
      <line x1="11" y1="6" x2="14" y2="8" stroke="#c084fc" strokeWidth="0.5" opacity="0.6" />
      <line x1="14" y1="8" x2="15.5" y2="11" stroke="#c084fc" strokeWidth="0.5" opacity="0.6" />
      <line x1="15.5" y1="11" x2="16" y2="14.5" stroke="#c084fc" strokeWidth="0.5" opacity="0.6" />
      <line x1="16" y1="14.5" x2="14" y2="16.5" stroke="#c084fc" strokeWidth="0.5" opacity="0.6" />
      <line x1="14" y1="16.5" x2="11.5" y2="17" stroke="#c084fc" strokeWidth="0.5" opacity="0.6" />
      <line x1="8" y1="7" x2="14" y2="8" stroke="#c084fc" strokeWidth="0.5" opacity="0.6" />
    </motion.g>
    
    {/* Звездная пыль */}
    {[...Array(15)].map((_, i) => {
      const x = 4 + Math.random() * 16;
      const y = 4 + Math.random() * 16;
      
      return (
        <motion.circle
          key={`dust${i}`}
          cx={x}
          cy={y}
          r="0.3"
          fill="#ddd6fe"
          animate={{
            opacity: [0, 0.8, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      );
    })}
  </svg>
);

// ============================================
// 5. ТЕХНОЛОГИЯ ПРОДАЖ — Сундук с сокровищами
// ============================================
export const SalesTechIcon = ({ size = 24, className = "" }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <defs>
      {/* Золотой градиент */}
      <linearGradient id="chest-gold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fde68a" />
        <stop offset="50%" stopColor="#fbbf24" />
        <stop offset="100%" stopColor="#d97706" />
      </linearGradient>
      
      {/* Деревянный градиент */}
      <linearGradient id="chest-wood" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#92400e" />
        <stop offset="50%" stopColor="#78350f" />
        <stop offset="100%" stopColor="#451a03" />
      </linearGradient>
      
      {/* Свечение сокровищ */}
      <radialGradient id="treasure-glow">
        <stop offset="0%" stopColor="#fde68a" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
      </radialGradient>
    </defs>
    
    {/* Магическое свечение */}
    <motion.ellipse
      cx="12" cy="14" rx="10" ry="8"
      fill="url(#treasure-glow)"
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.6, 0.3],
      }}
      transition={{
        duration: 2.5,
        repeat: Infinity,
      }}
    />
    
    {/* Крышка сундука (открытая) */}
    <motion.path
      d="M5 10 L5 8 Q5 6 7 6 L17 6 Q19 6 19 8 L19 10 L5 10 Z"
      fill="url(#chest-wood)"
      stroke="#d97706"
      strokeWidth="0.5"
      animate={{
        d: [
          "M5 10 L5 8 Q5 6 7 6 L17 6 Q19 6 19 8 L19 10 L5 10 Z",
          "M5 10 L4 5 Q4 3 6 3 L18 3 Q20 3 20 5 L19 10 L5 10 Z",
          "M5 10 L5 8 Q5 6 7 6 L17 6 Q19 6 19 8 L19 10 L5 10 Z",
        ],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
    
    {/* Основание сундука */}
    <path
      d="M5 10 L5 18 Q5 20 7 20 L17 20 Q19 20 19 18 L19 10 L5 10 Z"
      fill="url(#chest-wood)"
      stroke="#d97706"
      strokeWidth="0.5"
    />
    
    {/* Замок */}
    <rect
      x="10.5" y="13" width="3" height="3"
      fill="url(#chest-gold)"
      rx="0.5"
    />
    <circle cx="12" cy="14.5" r="0.7" fill="#78350f" />
    
    {/* Полоски на сундуке */}
    <line x1="5" y1="12" x2="19" y2="12" stroke="#d97706" strokeWidth="0.4" />
    <line x1="5" y1="16" x2="19" y2="16" stroke="#d97706" strokeWidth="0.4" />
    
    {/* Летящие золотые монеты */}
    {[
      { x: 8, y: 8, delay: 0 },
      { x: 12, y: 7, delay: 0.3 },
      { x: 16, y: 8.5, delay: 0.6 },
      { x: 10, y: 6.5, delay: 0.9 },
      { x: 14, y: 6, delay: 1.2 },
    ].map((coin, i) => (
      <motion.g key={`coin${i}`}>
        <motion.ellipse
          cx={coin.x}
          cy={coin.y}
          rx="1.2"
          ry="1"
          fill="url(#chest-gold)"
          stroke="#d97706"
          strokeWidth="0.3"
          animate={{
            y: [0, -3, -6],
            opacity: [0, 1, 0],
            scale: [0.8, 1.2, 0.8],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            delay: coin.delay,
            ease: "easeOut",
          }}
        />
      </motion.g>
    ))}
    
    {/* Блестки и искры */}
    {[...Array(12)].map((_, i) => {
      const angle = (i * 30 * Math.PI) / 180;
      const distance = 9;
      const x = 12 + Math.cos(angle) * distance;
      const y = 14 + Math.sin(angle) * distance * 0.7;
      
      return (
        <motion.path
          key={`sparkle${i}`}
          d={`M${x} ${y - 0.6} L${x + 0.25} ${y} L${x} ${y + 0.6} L${x - 0.25} ${y} Z`}
          fill="#fde68a"
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.15,
          }}
        />
      );
    })}
    
    {/* Звездная пыль */}
    {[...Array(8)].map((_, i) => {
      const x = 6 + Math.random() * 12;
      const y = 8 + Math.random() * 4;
      
      return (
        <motion.circle
          key={`dust${i}`}
          cx={x}
          cy={y}
          r="0.3"
          fill="#fbbf24"
          animate={{
            y: [0, -4, -8],
            opacity: [0, 0.9, 0],
            scale: [0, 1.2, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeOut",
          }}
        />
      );
    })}
  </svg>
);

// ============================================
// 6. БЛОГ — 3D Перо (см. FeatherQuillIcon.tsx)
// ============================================
// BlogIcon импортируется из FeatherQuillIcon.tsx выше

// ============================================
// 7. КОМАНДА — Друза кристаллов (см. TeamCrystalIcon.tsx)
// ============================================
// TeamIcon импортируется из TeamCrystalIcon.tsx выше

// ============================================
// 8. AI-АГЕНТЫ — Нейронная сеть из звезд
// ============================================
export const AIAgentsIcon = ({ size = 24, className = "" }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <defs>
      {/* Градиент нейронов */}
      <radialGradient id="neuron-gradient">
        <stop offset="0%" stopColor="#fde68a" />
        <stop offset="50%" stopColor="#fbbf24" />
        <stop offset="100%" stopColor="#f59e0b" />
      </radialGradient>
      
      {/* Градиент связей */}
      <linearGradient id="connection-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#c084fc" stopOpacity="0.3" />
        <stop offset="50%" stopColor="#a855f7" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#c084fc" stopOpacity="0.3" />
      </linearGradient>
      
      {/* Свечение */}
      <radialGradient id="ai-glow">
        <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
      </radialGradient>
    </defs>
    
    {/* Космическое свечение */}
    <motion.circle
      cx="12" cy="12" r="11"
      fill="url(#ai-glow)"
      animate={{
        scale: [1, 1.15, 1],
        opacity: [0.3, 0.6, 0.3],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
      }}
    />
    
    {/* Нейроны (узлы сети) */}
    {[
      { x: 12, y: 6, size: 1.2 },   // Верхний центр
      { x: 6, y: 10, size: 1 },     // Левый верх
      { x: 18, y: 10, size: 1 },    // Правый верх
      { x: 4, y: 16, size: 0.9 },   // Левый низ
      { x: 12, y: 18, size: 1.1 },  // Центр низ
      { x: 20, y: 16, size: 0.9 },  // Правый низ
      { x: 12, y: 12, size: 1.3 },  // Центральный (главный)
      { x: 9, y: 8, size: 0.8 },    // Промежуточный 1
      { x: 15, y: 8, size: 0.8 },   // Промежуточный 2
      { x: 8, y: 14, size: 0.85 },  // Промежуточный 3
      { x: 16, y: 14, size: 0.85 }, // Промежуточный 4
    ].map((neuron, i) => (
      <motion.g key={`neuron${i}`}>
        {/* Пульсация */}
        <motion.circle
          cx={neuron.x}
          cy={neuron.y}
          r={neuron.size * 2}
          fill="url(#neuron-gradient)"
          opacity="0.2"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.15,
          }}
        />
        
        {/* Нейрон */}
        <motion.circle
          cx={neuron.x}
          cy={neuron.y}
          r={neuron.size}
          fill="url(#neuron-gradient)"
          stroke="#fde68a"
          strokeWidth="0.3"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.9, 1, 0.9],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.15,
          }}
        />
        
        {/* Ядро */}
        <circle
          cx={neuron.x}
          cy={neuron.y}
          r={neuron.size * 0.4}
          fill="#fef3c7"
        />
      </motion.g>
    ))}
    
    {/* Связи между нейронами */}
    <motion.g
      animate={{
        opacity: [0.4, 0.8, 0.4],
      }}
      transition={{
        duration: 2.5,
        repeat: Infinity,
      }}
    >
      {/* Связи от центрального нейрона */}
      <line x1="12" y1="12" x2="12" y2="6" stroke="url(#connection-gradient)" strokeWidth="0.5" />
      <line x1="12" y1="12" x2="6" y2="10" stroke="url(#connection-gradient)" strokeWidth="0.5" />
      <line x1="12" y1="12" x2="18" y2="10" stroke="url(#connection-gradient)" strokeWidth="0.5" />
      <line x1="12" y1="12" x2="4" y2="16" stroke="url(#connection-gradient)" strokeWidth="0.5" />
      <line x1="12" y1="12" x2="12" y2="18" stroke="url(#connection-gradient)" strokeWidth="0.5" />
      <line x1="12" y1="12" x2="20" y2="16" stroke="url(#connection-gradient)" strokeWidth="0.5" />
      
      {/* Связи промежуточных узлов */}
      <line x1="12" y1="6" x2="9" y2="8" stroke="url(#connection-gradient)" strokeWidth="0.4" />
      <line x1="12" y1="6" x2="15" y2="8" stroke="url(#connection-gradient)" strokeWidth="0.4" />
      <line x1="6" y1="10" x2="9" y2="8" stroke="url(#connection-gradient)" strokeWidth="0.4" />
      <line x1="18" y1="10" x2="15" y2="8" stroke="url(#connection-gradient)" strokeWidth="0.4" />
      <line x1="4" y1="16" x2="8" y2="14" stroke="url(#connection-gradient)" strokeWidth="0.4" />
      <line x1="20" y1="16" x2="16" y2="14" stroke="url(#connection-gradient)" strokeWidth="0.4" />
      <line x1="12" y1="18" x2="8" y2="14" stroke="url(#connection-gradient)" strokeWidth="0.4" />
      <line x1="12" y1="18" x2="16" y2="14" stroke="url(#connection-gradient)" strokeWidth="0.4" />
      <line x1="9" y1="8" x2="8" y2="14" stroke="url(#connection-gradient)" strokeWidth="0.3" />
      <line x1="15" y1="8" x2="16" y2="14" stroke="url(#connection-gradient)" strokeWidth="0.3" />
    </motion.g>
    
    {/* Импульсы по связям */}
    {[
      { x1: 12, y1: 12, x2: 12, y2: 6, delay: 0 },
      { x1: 12, y1: 12, x2: 6, y2: 10, delay: 0.3 },
      { x1: 12, y1: 12, x2: 18, y2: 10, delay: 0.6 },
      { x1: 12, y1: 12, x2: 12, y2: 18, delay: 0.9 },
    ].map((pulse, i) => {
      const dx = pulse.x2 - pulse.x1;
      const dy = pulse.y2 - pulse.y1;
      
      return (
        <motion.circle
          key={`pulse${i}`}
          r="0.8"
          fill="#fbbf24"
          animate={{
            cx: [pulse.x1, pulse.x1 + dx * 0.5, pulse.x2],
            cy: [pulse.y1, pulse.y1 + dy * 0.5, pulse.y2],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: pulse.delay,
            ease: "linear",
          }}
        />
      );
    })}
    
    {/* Звездная пыль */}
    {[...Array(12)].map((_, i) => {
      const angle = (i * 30 * Math.PI) / 180;
      const distance = 10.5;
      
      return (
        <motion.circle
          key={`dust${i}`}
          cx={12 + Math.cos(angle) * distance}
          cy={12 + Math.sin(angle) * distance}
          r="0.3"
          fill="#ddd6fe"
          animate={{
            opacity: [0, 0.8, 0],
            scale: [0, 1.2, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      );
    })}
  </svg>
);

// ============================================
// ЭКСПОРТ АЛИАСОВ ДЛЯ СОВМЕСТИМОСТИ
// ============================================

// Импортируем 3D версию книги
import Book3DIcon from './Book3DIcon';

// Используем 3D версию для LearningIcon
export const LearningIcon = Book3DIcon;        // 0. Обучение = 3D книга

export const AudienceIcon = LoveIcon;          // 2. Своя ЦА = Любовь к людям
// SalesIcon импортируется из TreasureChestIcon.tsx выше
// BonusIcon импортируется из GiftBonusIcon.tsx выше