import { motion } from "motion/react";
import eyeImage from 'figma:asset/ea64c47598b85cf6fd1e83ce49d98f9a65b5dad2.png';
import bookImage from "figma:asset/18f2ea4ee7928176c0ae5b9d2287a11511085513.png";
import rainbowImage from 'figma:asset/b9036d18ab4e5e8ec25e4c039803ebeca15eec78.png';
import treasureImage from "figma:asset/4a71424f0e630cabf62cf95ab710a75a9236809e.png";
import scalesImage from "figma:asset/02aeb3195ab0bcd3d204ed239de56cc227eedcca.png";
import featherImage from "figma:asset/3348e0e9b353ff340e5a03462996bcbc933273c5.png";
import giftImage from "figma:asset/d588091c9c2323d4d39714814a6797311b9937d4.png";
import teamImage from 'figma:asset/9949951b3af652cc456e998677edf543f4307a69.png';
import heartImage from 'figma:asset/b6d293409bc27281cdcd8fcabb95b9c6425d3fc4.png';
import sacredImage from 'figma:asset/2f0a8f8c46085bd197587f5abc471d01a488ec1e.png';

interface IconProps {
  size?: number;
  className?: string;
}

// ============================================
// СЕРЫЕ ВЕРСИИ ИКОНОК ДЛЯ НЕПРОЙДЕННЫХ МОДУЛЕЙ
// ============================================

// 0. ОБУЧЕНИЕ — Серая книга
export const GrayLearningIcon = ({ size = 120, className = "" }: IconProps) => {
  const s = size * 1.35;
  return (
    <img 
      src={bookImage} 
      alt="Learning Book"
      width={s}
      height={s}
      className={className}
      style={{ 
        width: s, 
        height: s,
        objectFit: 'contain',
        filter: 'grayscale(100%) brightness(0.7)',
        opacity: 0.7
      }}
    />
  );
};

// 1. АУТЕНТИЧНОСТЬ — Серый глаз
export const GrayAuthenticityIcon = ({ size = 24, className = "" }: IconProps) => (
  <div
    className={className}
    style={{
      width: size,
      height: size,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <img 
      src={eyeImage} 
      alt="Vision Eye" 
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'contain',
        filter: 'grayscale(100%) brightness(0.7)',
        opacity: 0.7
      }}
    />
  </div>
);

// 2. ЛЮБОВЬ К ЛЮДЯМ — Серое сердце
export const GrayLoveIcon = ({ size = 24, className = "" }: IconProps) => (
  <img 
    src={heartImage} 
    alt="Heart"
    width={size}
    height={size}
    className={className}
    style={{ 
      width: size, 
      height: size,
      objectFit: 'contain',
      filter: 'grayscale(100%) brightness(0.7)',
      opacity: 0.7
    }}
  />
);

// 3. ПРОДУКТ — Серая сакральная геометрия
export const GrayProductIcon = ({ size = 24, className = "" }: IconProps) => (
  <img 
    src={sacredImage} 
    alt="Sacred Geometry"
    width={size}
    height={size}
    className={className}
    style={{ 
      width: size, 
      height: size,
      objectFit: 'contain',
      filter: 'grayscale(100%) brightness(0.7)',
      opacity: 0.7
    }}
  />
);

// 4. ВОРОНКА ПРОДАЖ — Серые песочные часы
export const GraySalesFunnelIcon = ({ size = 24, className = "" }: IconProps) => {
  const s = size * 1.15;
  return (
    <img 
      src={rainbowImage} 
      alt="Hourglass Funnel"
      width={s}
      height={s}
      className={className}
      style={{ 
        width: s, 
        height: s,
        objectFit: 'contain',
        filter: 'grayscale(100%) brightness(0.7)',
        opacity: 0.7
      }}
    />
  );
};

// 5. ТЕХНОЛОГИЯ ПРОДАЖ — Серые весы (3D изображение)
export const GraySalesTechIcon = ({ size = 24, className = "" }: IconProps) => {
  const s = size * 1.15;
  return (
    <img 
      src={scalesImage} 
      alt="Scales"
      width={s}
      height={s}
      className={className}
      style={{ 
        width: s, 
        height: s,
        objectFit: 'contain',
        filter: 'grayscale(100%) brightness(0.7)',
        opacity: 0.7
      }}
    />
  );
};

// 6. БЛОГ — Серое перо (3D изображение)
export const GrayBlogIcon = ({ size = 24, className = "" }: IconProps) => (
  <img 
    src={featherImage} 
    alt="Feather Quill"
    width={size}
    height={size}
    className={className}
    style={{ 
      width: size, 
      height: size,
      objectFit: 'contain',
      filter: 'grayscale(100%) brightness(0.7)',
      opacity: 0.7
    }}
  />
);

// 7. КОМАНДА — Серые кристаллы
export const GrayTeamIcon = ({ size = 24, className = "" }: IconProps) => (
  <img 
    src={teamImage} 
    alt="Team Crystals"
    width={size}
    height={size}
    className={className}
    style={{ 
      width: size, 
      height: size,
      objectFit: 'contain',
      filter: 'grayscale(100%) brightness(0.7)',
      opacity: 0.7
    }}
  />
);

// 8. AI-АГЕНТЫ — Серая нейросеть
export const GrayAIAgentsIcon = ({ size = 24, className = "" }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <defs>
      <radialGradient id="neuron-gray">
        <stop offset="0%" stopColor="#94a3b8" />
        <stop offset="50%" stopColor="#64748b" />
        <stop offset="100%" stopColor="#475569" />
      </radialGradient>
    </defs>
    
    {/* Нейроны */}
    {[
      { x: 12, y: 6, size: 1.2 },
      { x: 6, y: 10, size: 1 },
      { x: 18, y: 10, size: 1 },
      { x: 4, y: 16, size: 0.9 },
      { x: 12, y: 18, size: 1.1 },
      { x: 20, y: 16, size: 0.9 },
      { x: 12, y: 12, size: 1.3 },
      { x: 9, y: 8, size: 0.8 },
      { x: 15, y: 8, size: 0.8 },
      { x: 8, y: 14, size: 0.85 },
      { x: 16, y: 14, size: 0.85 },
    ].map((neuron, i) => (
      <g key={`neuron${i}`}>
        <circle
          cx={neuron.x}
          cy={neuron.y}
          r={neuron.size}
          fill="url(#neuron-gray)"
          stroke="#94a3b8"
          strokeWidth="0.3"
          opacity="0.7"
        />
        <circle
          cx={neuron.x}
          cy={neuron.y}
          r={neuron.size * 0.4}
          fill="#cbd5e1"
          opacity="0.6"
        />
      </g>
    ))}
    
    {/* Связи */}
    <g opacity="0.4">
      <line x1="12" y1="12" x2="12" y2="6" stroke="#64748b" strokeWidth="0.5" />
      <line x1="12" y1="12" x2="6" y2="10" stroke="#64748b" strokeWidth="0.5" />
      <line x1="12" y1="12" x2="18" y2="10" stroke="#64748b" strokeWidth="0.5" />
      <line x1="12" y1="12" x2="4" y2="16" stroke="#64748b" strokeWidth="0.5" />
      <line x1="12" y1="12" x2="12" y2="18" stroke="#64748b" strokeWidth="0.5" />
      <line x1="12" y1="12" x2="20" y2="16" stroke="#64748b" strokeWidth="0.5" />
      <line x1="12" y1="6" x2="9" y2="8" stroke="#64748b" strokeWidth="0.4" />
      <line x1="12" y1="6" x2="15" y2="8" stroke="#64748b" strokeWidth="0.4" />
      <line x1="6" y1="10" x2="9" y2="8" stroke="#64748b" strokeWidth="0.4" />
      <line x1="18" y1="10" x2="15" y2="8" stroke="#64748b" strokeWidth="0.4" />
      <line x1="4" y1="16" x2="8" y2="14" stroke="#64748b" strokeWidth="0.4" />
      <line x1="20" y1="16" x2="16" y2="14" stroke="#64748b" strokeWidth="0.4" />
      <line x1="12" y1="18" x2="8" y2="14" stroke="#64748b" strokeWidth="0.4" />
      <line x1="12" y1="18" x2="16" y2="14" stroke="#64748b" strokeWidth="0.4" />
    </g>
  </svg>
);

// 9. ПОДАРОК/БОНУС — Серый подарок (3D изображение, 1.15× для визуального баланса)
export const GrayBonusIcon = ({ size = 24, className = "" }: IconProps) => {
  const s = size * 1.35;
  return (
    <img 
      src={giftImage} 
      alt="Gift Box"
      width={s}
      height={s}
      className={className}
      style={{ 
        width: s, 
        height: s,
        objectFit: 'contain',
        filter: 'grayscale(100%) brightness(0.7)',
        opacity: 0.7
      }}
    />
  );
};

// Экспорт алиасов
export const GrayAudienceIcon = GrayLoveIcon;
export const GraySalesIcon = GraySalesTechIcon;
export const GrayFunnelIcon = GraySalesFunnelIcon;