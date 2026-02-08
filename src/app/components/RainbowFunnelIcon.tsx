import rainbowImage from 'figma:asset/ac1c5a427d26fc75f5dda47cd357767f9a63f9f6.png';

interface IconProps {
  size?: number;
  className?: string;
}

// ============================================
// ВОРОНКА — 3D Радуга
// ============================================
export const FunnelIcon = ({ size = 24, className = "" }: IconProps) => (
  <img 
    src={rainbowImage} 
    alt="Rainbow Funnel"
    width={size}
    height={size}
    className={className}
    style={{ 
      width: size, 
      height: size,
      objectFit: 'contain'
    }}
  />
);