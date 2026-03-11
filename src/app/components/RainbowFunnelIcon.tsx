import hourglassImage from '@/assets/b9036d18ab4e5e8ec25e4c039803ebeca15eec78.png';

interface IconProps {
  size?: number;
  className?: string;
}

// ============================================
// ВОРОНКА — 3D Песочные часы с аметистами
// ============================================
export const FunnelIcon = ({ size = 24, className = "" }: IconProps) => {
  const s = size * 1.15;
  return (
    <img 
      src={hourglassImage} 
      alt="Hourglass Funnel"
      width={s}
      height={s}
      className={className}
      style={{ 
        width: s, 
        height: s,
        objectFit: 'contain',
      }}
    />
  );
};