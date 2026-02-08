import { motion } from "motion/react";
import eyeImage from 'figma:asset/7323af24a6c904a3eb3df57f59983efbebedd7c3.png';
import bookImage from "figma:asset/6fdd90e994be276ebad53420f00ef1757e0c6356.png";
import rainbowImage from 'figma:asset/ac1c5a427d26fc75f5dda47cd357767f9a63f9f6.png';
import treasureImage from "figma:asset/4a71424f0e630cabf62cf95ab710a75a9236809e.png";
import featherImage from "figma:asset/6a9a167a920bdef19d786e74fe62f15c110d4d8c.png";
import giftImage from "figma:asset/08dbcace03843f3d60f9be03865be6b5ef368abe.png";
import teamImage from 'figma:asset/3f9bd6f66df2e72e5389dc9e9dd8607f8e5da1ef.png';

interface IconProps {
  size?: number;
  className?: string;
}

// ============================================
// СЕРЫЕ ВЕРСИИ ИКОНОК ДЛЯ НЕПРОЙДЕННЫХ МОДУЛЕЙ
// ============================================

// 0. ОБУЧЕНИЕ — Серая книга
export const GrayLearningIcon = ({ size = 120, className = "" }: IconProps) => (
  <img 
    src={bookImage} 
    alt="Learning Book"
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
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <defs>
      <linearGradient id="heart-gray" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#94a3b8" />
        <stop offset="50%" stopColor="#64748b" />
        <stop offset="100%" stopColor="#475569" />
      </linearGradient>
    </defs>
    
    <path
      d="M12 20.5 C12 20.5 4 15 4 9.5 C4 6 6.5 3.5 9 3.5 C10.5 3.5 11.5 4.5 12 6 C12.5 4.5 13.5 3.5 15 3.5 C17.5 3.5 20 6 20 9.5 C20 15 12 20.5 12 20.5 Z"
      fill="url(#heart-gray)"
      stroke="#cbd5e1"
      strokeWidth="1"
      opacity="0.7"
    />
  </svg>
);

// 3. ПРОДУКТ — Серая сакральная геометрия
export const GrayProductIcon = ({ size = 24, className = "" }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <defs>
      <linearGradient id="sacred-gray" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#94a3b8" />
        <stop offset="50%" stopColor="#64748b" />
        <stop offset="100%" stopColor="#475569" />
      </linearGradient>
    </defs>
    
    {/* Центральный круг */}
    <circle
      cx="12" cy="12" r="4.5"
      fill="none"
      stroke="url(#sacred-gray)"
      strokeWidth="0.8"
      opacity="0.7"
    />
    
    {/* 6 внешних кругов */}
    {[0, 60, 120, 180, 240, 300].map((angle, i) => {
      const rad = (angle * Math.PI) / 180;
      const x = 12 + Math.cos(rad) * 4.5;
      const y = 12 + Math.sin(rad) * 4.5;
      
      return (
        <circle
          key={`seed${i}`}
          cx={x}
          cy={y}
          r="4.5"
          fill="none"
          stroke="url(#sacred-gray)"
          strokeWidth="0.8"
          opacity="0.6"
        />
      );
    })}
    
    {/* Центральная точка */}
    <circle
      cx="12" cy="12" r="1.2"
      fill="url(#sacred-gray)"
      opacity="0.7"
    />
    
    {/* Треугольник вверх */}
    <path
      d="M12 3.5 L20.5 18 L3.5 18 Z"
      fill="none"
      stroke="url(#sacred-gray)"
      strokeWidth="1.2"
      opacity="0.6"
    />
    
    {/* Треугольник вниз */}
    <path
      d="M12 20.5 L3.5 6 L20.5 6 Z"
      fill="none"
      stroke="url(#sacred-gray)"
      strokeWidth="1.2"
      opacity="0.6"
    />
    
    {/* Горизонтальная линия */}
    <line
      x1="3" y1="12" x2="21" y2="12"
      stroke="url(#sacred-gray)"
      strokeWidth="0.6"
      opacity="0.5"
    />
  </svg>
);

// 4. ВОРОНКА ПРОДАЖ — Серая радуга
export const GraySalesFunnelIcon = ({ size = 24, className = "" }: IconProps) => (
  <img 
    src={rainbowImage} 
    alt="Rainbow Funnel"
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

// 5. ТЕХНОЛОГИЯ ПРОДАЖ — Серый сундук (3D изображение)
export const GraySalesTechIcon = ({ size = 24, className = "" }: IconProps) => (
  <img 
    src={treasureImage} 
    alt="Treasure Chest"
    width={size}
    height={size}
    className={className}
    style={{ 
      width: size * 0.9, 
      height: size * 0.9,
      objectFit: 'contain',
      filter: 'grayscale(100%) brightness(0.7)',
      opacity: 0.7
    }}
  />
);

// 6. БЛОГ — Серое перо (3D изображение)
export const GrayBlogIcon = ({ size = 24, className = "" }: IconProps) => (
  <img 
    src={featherImage} 
    alt="Feather Quill"
    width={size}
    height={size}
    className={className}
    style={{ 
      width: size * 0.85, 
      height: size * 0.85,
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

// 9. ПОДАРОК/БОНУС — Серый подарок (3D изображение)
export const GrayBonusIcon = ({ size = 24, className = "" }: IconProps) => (
  <img 
    src={giftImage} 
    alt="Gift Box"
    width={size}
    height={size}
    className={className}
    style={{ 
      width: size * 0.9, 
      height: size * 0.9,
      objectFit: 'contain',
      filter: 'grayscale(100%) brightness(0.7)',
      opacity: 0.7
    }}
  />
);

// Экспорт алиасов
export const GrayAudienceIcon = GrayLoveIcon;
export const GraySalesIcon = GraySalesTechIcon;
export const GrayFunnelIcon = GraySalesFunnelIcon;