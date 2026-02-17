import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface CosmicIconWrapperProps {
  children: ReactNode;
  isCompleted?: boolean;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export function CosmicIconWrapper({ 
  children, 
  isCompleted = false, 
  size = 'medium',
  className = ''
}: CosmicIconWrapperProps) {
  const particleCount = size === 'small' ? 6 : size === 'medium' ? 8 : 10;
  const distance = size === 'small' ? 20 : size === 'medium' ? 24 : 30;
  
  return (
    <div className={`relative ${className}`}>
      {/* Звездная пыль вокруг иконки */}
      {[...Array(particleCount)].map((_, i) => {
        const angle = (i * (360 / particleCount) * Math.PI) / 180;
        const randomDistance = distance + Math.random() * 8;
        const x = Math.cos(angle) * randomDistance;
        const y = Math.sin(angle) * randomDistance;
        const colors = isCompleted 
          ? ['#fbbf24', '#f59e0b', '#fcd34d'] 
          : ['#ec4899', '#f472b6', '#f9a8d4', '#a855f7', '#c084fc'];
        const color = colors[i % colors.length];
        
        return (
          <motion.div
            key={`dust-${i}`}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: `calc(50% + ${x}px)`,
              top: `calc(50% + ${y}px)`,
              width: size === 'small' ? '1px' : size === 'medium' ? '1.5px' : '2px',
              height: size === 'small' ? '1px' : size === 'medium' ? '1.5px' : '2px',
              background: color,
              boxShadow: `0 0 ${size === 'small' ? '3px' : '4px'} ${color}`,
            }}
            animate={{
              opacity: [0, 0.9, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 1.5,
              repeat: Infinity,
              delay: i * 0.1,
              ease: 'easeInOut',
            }}
          />
        );
      })}
      
      {/* Мерцающее свечение */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: size === 'small' ? '30px' : size === 'medium' ? '40px' : '50px',
          height: size === 'small' ? '30px' : size === 'medium' ? '40px' : '50px',
          background: isCompleted
            ? 'radial-gradient(circle, rgba(251, 191, 36, 0.2) 0%, rgba(251, 191, 36, 0) 70%)'
            : 'radial-gradient(circle, rgba(236, 72, 153, 0.15) 0%, rgba(236, 72, 153, 0) 70%)',
          zIndex: -1,
        }}
        animate={{
          scale: [1, 1.6, 1],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      {/* Floating анимация для содержимого */}
      <motion.div
        className="relative z-10"
        animate={{
          y: [0, size === 'small' ? -2 : size === 'medium' ? -4 : -6, 0],
          rotate: [-2, 2, -2],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}