import { User } from 'lucide-react';
import { useState } from 'react';

interface UserAvatarProps {
  src?: string;
  name: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showBadge?: boolean;
  badgeContent?: string;
  className?: string;
}

export function UserAvatar({ 
  src, 
  name, 
  size = 'md', 
  showBadge = false, 
  badgeContent = 'М',
  className = '' 
}: UserAvatarProps) {
  const [imageError, setImageError] = useState(false);
  
  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-16 h-16 text-2xl'
  };

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24,
    xl: 32
  };

  // Генерация цвета на основе имени
  const getColorFromName = (name: string) => {
    const colors = [
      'bg-gradient-to-br from-violet-400 to-purple-500',
      'bg-gradient-to-br from-fuchsia-400 to-pink-500',
      'bg-gradient-to-br from-cyan-400 to-blue-500',
      'bg-gradient-to-br from-amber-400 to-orange-500',
      'bg-gradient-to-br from-emerald-400 to-green-500',
      'bg-gradient-to-br from-rose-400 to-red-500',
      'bg-gradient-to-br from-indigo-400 to-blue-600',
      'bg-gradient-to-br from-purple-400 to-pink-600',
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  // Получение инициалов
  const getInitials = (name: string) => {
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  const shouldShowPlaceholder = !src || imageError;

  return (
    <div className={`relative flex-shrink-0 ${className}`}>
      {shouldShowPlaceholder ? (
        // Плейсхолдер с инициалами
        <div 
          className={`${sizeClasses[size]} ${getColorFromName(name)} rounded-full border-2 border-violet-200 flex items-center justify-center font-bold text-white shadow-lg`}
        >
          {getInitials(name)}
        </div>
      ) : (
        // Реальное изображение
        <img
          src={src}
          alt={name}
          className={`${sizeClasses[size]} rounded-full border-2 border-violet-200 object-cover`}
          onError={() => setImageError(true)}
        />
      )}
      
      {/* Бейдж */}
      {showBadge && (
        <div className="absolute -top-1 -left-1 w-5 h-5 rounded-full bg-violet-600 border-2 border-white flex items-center justify-center shadow-md">
          <span className="text-white text-[10px] font-bold">{badgeContent}</span>
        </div>
      )}
    </div>
  );
}
