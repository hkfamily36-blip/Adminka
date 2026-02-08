import React from 'react';

// 1. АУТЕНТИЧНОСТЬ — Кристалл с внутренним светом
export const AuthenticityIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <defs>
      <linearGradient id="crystal-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="currentColor" stopOpacity="0.3" />
        <stop offset="50%" stopColor="currentColor" stopOpacity="0.6" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="1" />
      </linearGradient>
      <radialGradient id="crystal-glow">
        <stop offset="0%" stopColor="currentColor" stopOpacity="0.8" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
      </radialGradient>
    </defs>
    
    {/* Внутреннее свечение */}
    <circle cx="12" cy="12" r="8" fill="url(#crystal-glow)" opacity="0.3" />
    
    {/* Основной кристалл */}
    <path 
      d="M12 2 L17 7 L20 12 L17 17 L12 22 L7 17 L4 12 L7 7 Z" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      fill="url(#crystal-gradient)"
      strokeLinejoin="round"
    />
    
    {/* Внутренние грани */}
    <path d="M7 7 L12 12 L17 7" stroke="currentColor" strokeWidth="1" opacity="0.5" />
    <path d="M17 17 L12 12 L7 17" stroke="currentColor" strokeWidth="1" opacity="0.5" />
    <path d="M7 7 L12 12 L7 17" stroke="currentColor" strokeWidth="1" opacity="0.5" />
    <path d="M17 7 L12 12 L17 17" stroke="currentColor" strokeWidth="1" opacity="0.5" />
    
    {/* Центральная точка света */}
    <circle cx="12" cy="12" r="2" fill="currentColor" opacity="0.9" />
    <circle cx="12" cy="12" r="1" fill="white" opacity="0.8" />
    
    {/* Световые лучи */}
    <path d="M12 2 L12 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    <path d="M12 19 L12 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    <path d="M2 12 L5 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    <path d="M19 12 L22 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
  </svg>
);

// 2. СВОЯ ЦА — Сердце с энергетическими волнами
export const AudienceIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <defs>
      <linearGradient id="heart-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="currentColor" stopOpacity="0.3" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="1" />
      </linearGradient>
    </defs>
    
    {/* Энергетические кольца вокруг */}
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="0.5" opacity="0.2" fill="none" />
    <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="0.5" opacity="0.3" fill="none" />
    
    {/* Сердце */}
    <path 
      d="M12 21 C12 21 4 15 4 9.5 C4 6.5 6.5 4 9 4 C10.5 4 11.5 5 12 6 C12.5 5 13.5 4 15 4 C17.5 4 20 6.5 20 9.5 C20 15 12 21 12 21 Z" 
      fill="url(#heart-gradient)"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    
    {/* Внутренний блик */}
    <path 
      d="M9 7 C9.5 6.5 10 6.5 10.5 7 C11 7.5 10.5 8.5 9.5 9" 
      stroke="white" 
      strokeWidth="1.5" 
      strokeLinecap="round"
      opacity="0.5"
    />
    
    {/* Три человека (упрощенно) */}
    <circle cx="12" cy="10" r="1.5" fill="white" opacity="0.8" />
    <circle cx="9" cy="11" r="1" fill="white" opacity="0.6" />
    <circle cx="15" cy="11" r="1" fill="white" opacity="0.6" />
    
    {/* Энергетические частицы */}
    <circle cx="6" cy="10" r="0.5" fill="currentColor" opacity="0.5" />
    <circle cx="18" cy="10" r="0.5" fill="currentColor" opacity="0.5" />
    <circle cx="12" cy="5" r="0.5" fill="currentColor" opacity="0.5" />
  </svg>
);

// 3. ПРОДУКТЫ И МЕТОД — Священная геометрия (цветок жизни упрощенный)
export const ProductIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <defs>
      <linearGradient id="sacred-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="currentColor" stopOpacity="0.2" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="1" />
      </linearGradient>
    </defs>
    
    {/* Центральный круг */}
    <circle cx="12" cy="12" r="4" fill="url(#sacred-gradient)" stroke="currentColor" strokeWidth="1.5" />
    
    {/* Окружающие круги (6 лепестков) */}
    <circle cx="12" cy="7" r="3" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.6" />
    <circle cx="16.5" cy="9.5" r="3" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.6" />
    <circle cx="16.5" cy="14.5" r="3" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.6" />
    <circle cx="12" cy="17" r="3" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.6" />
    <circle cx="7.5" cy="14.5" r="3" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.6" />
    <circle cx="7.5" cy="9.5" r="3" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.6" />
    
    {/* Центральная точка света */}
    <circle cx="12" cy="12" r="1.5" fill="white" opacity="0.9" />
    
    {/* Соединительные линии (энергетические потоки) */}
    <path d="M12 12 L12 7" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
    <path d="M12 12 L16.5 9.5" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
    <path d="M12 12 L16.5 14.5" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
    <path d="M12 12 L12 17" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
    <path d="M12 12 L7.5 14.5" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
    <path d="M12 12 L7.5 9.5" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
  </svg>
);

// 4. ВОРОНКА — Космическая воронка с энергией
export const FunnelIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <defs>
      <linearGradient id="funnel-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="currentColor" stopOpacity="0.2" />
        <stop offset="50%" stopColor="currentColor" stopOpacity="0.5" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="1" />
      </linearGradient>
    </defs>
    
    {/* Воронка */}
    <path 
      d="M3 3 L21 3 L17 10 L17 15 L12 21 L7 15 L7 10 Z" 
      fill="url(#funnel-gradient)"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    
    {/* Горизо��тальные уровни (этапы воронки) */}
    <path d="M5 6 L19 6" stroke="currentColor" strokeWidth="1" opacity="0.4" />
    <path d="M8 9 L16 9" stroke="currentColor" strokeWidth="1" opacity="0.4" />
    <path d="M10 12 L14 12" stroke="currentColor" strokeWidth="1" opacity="0.4" />
    
    {/* Энергетический поток вниз */}
    <path 
      d="M12 4 L12 20" 
      stroke="white" 
      strokeWidth="1.5" 
      strokeLinecap="round"
      opacity="0.6"
      strokeDasharray="2 2"
    />
    
    {/* Частицы, стекающие вниз */}
    <circle cx="12" cy="7" r="0.8" fill="white" opacity="0.7" />
    <circle cx="12" cy="11" r="0.8" fill="white" opacity="0.7" />
    <circle cx="12" cy="15" r="0.8" fill="white" opacity="0.7" />
    
    {/* Световые лучи сверху */}
    <path d="M8 2 L10 4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
    <path d="M12 1 L12 3" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
    <path d="M16 2 L14 4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
    
    {/* Звезда внизу (результат) */}
    <path d="M12 21 L11 20 L12 19 L13 20 Z" fill="white" opacity="0.8" />
  </svg>
);

// 5. ТЕХНОЛОГИЯ ПРОДАЖ — Магнит с энергией притяжения
export const SalesIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <defs>
      <linearGradient id="magnet-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
        <stop offset="50%" stopColor="currentColor" stopOpacity="0.5" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="1" />
      </linearGradient>
    </defs>
    
    {/* Магнит (подкова) */}
    <path 
      d="M6 4 L6 12 C6 15.5 8.5 18 12 18 C15.5 18 18 15.5 18 12 L18 4" 
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      fill="none"
    />
    
    {/* Внутренняя линия магнита */}
    <path 
      d="M9 4 L9 12 C9 13.5 10.5 15 12 15 C13.5 15 15 13.5 15 12 L15 4" 
      stroke="url(#magnet-gradient)"
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
      opacity="0.5"
    />
    
    {/* Энергетические линии притяжения */}
    <path d="M4 8 Q 2 10 3 12" stroke="currentColor" strokeWidth="1" opacity="0.4" fill="none" />
    <path d="M20 8 Q 22 10 21 12" stroke="currentColor" strokeWidth="1" opacity="0.4" fill="none" />
    
    {/* Частицы, притягиваемые к магниту */}
    <circle cx="4" cy="10" r="1" fill="currentColor" opacity="0.5" />
    <circle cx="20" cy="10" r="1" fill="currentColor" opacity="0.5" />
    <circle cx="5" cy="14" r="0.8" fill="currentColor" opacity="0.5" />
    <circle cx="19" cy="14" r="0.8" fill="currentColor" opacity="0.5" />
    <circle cx="3" cy="16" r="0.6" fill="currentColor" opacity="0.5" />
    <circle cx="21" cy="16" r="0.6" fill="currentColor" opacity="0.5" />
    
    {/* Деньги внизу (результат) */}
    <circle cx="12" cy="21" r="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <path d="M11 20 L11 22 M13 20 L13 22" stroke="currentColor" strokeWidth="1.5" />
    <path d="M12 19.5 Q 13 20.5 12 21.5 Q 11 20.5 12 19.5" fill="currentColor" />
    
    {/* Полюса магнита */}
    <rect x="5" y="2" width="3" height="4" rx="1" fill="currentColor" opacity="0.7" />
    <rect x="16" y="2" width="3" height="4" rx="1" fill="currentColor" opacity="0.7" />
    <text x="6.5" y="5" fill="white" fontSize="3" fontWeight="bold">N</text>
    <text x="17.5" y="5" fill="white" fontSize="3" fontWeight="bold">S</text>
  </svg>
);

// 6. БЛОГ И СОЦСЕТИ — Созвездие связей
export const BlogIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <defs>
      <radialGradient id="star-glow">
        <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
      </radialGradient>
    </defs>
    
    {/* Центральная звезда (вы) */}
    <circle cx="12" cy="12" r="8" fill="url(#star-glow)" opacity="0.2" />
    <circle cx="12" cy="12" r="2.5" fill="currentColor" />
    <path d="M12 9.5 L12 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M12 17 L12 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M9.5 12 L7 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M17 12 L14.5 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    
    {/* Окружающие точки (аудитория) */}
    <circle cx="12" cy="5" r="1.5" fill="currentColor" opacity="0.8" />
    <circle cx="18" cy="8" r="1.5" fill="currentColor" opacity="0.8" />
    <circle cx="19" cy="14" r="1.5" fill="currentColor" opacity="0.8" />
    <circle cx="14" cy="20" r="1.5" fill="currentColor" opacity="0.8" />
    <circle cx="6" cy="18" r="1.5" fill="currentColor" opacity="0.8" />
    <circle cx="4" cy="11" r="1.5" fill="currentColor" opacity="0.8" />
    <circle cx="7" cy="6" r="1.5" fill="currentColor" opacity="0.8" />
    
    {/* Соединительные линии (связи) */}
    <path d="M12 12 L12 5" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />
    <path d="M12 12 L18 8" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />
    <path d="M12 12 L19 14" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />
    <path d="M12 12 L14 20" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />
    <path d="M12 12 L6 18" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />
    <path d="M12 12 L4 11" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />
    <path d="M12 12 L7 6" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />
    
    {/* Дополнительные связи между точками */}
    <path d="M12 5 L7 6" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
    <path d="M18 8 L19 14" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
    <path d="M14 20 L6 18" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
  </svg>
);

// 7. КОМАНДА — Синергия энергий
export const TeamIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <defs>
      <linearGradient id="team-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="currentColor" stopOpacity="0.3" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="1" />
      </linearGradient>
    </defs>
    
    {/* Общее энергетическое поле */}
    <circle cx="12" cy="12" r="10" fill="url(#team-gradient)" opacity="0.1" />
    
    {/* 3 человека в круге */}
    {/* Человек 1 (верх) */}
    <circle cx="12" cy="6" r="2" fill="currentColor" stroke="white" strokeWidth="1" />
    <path d="M9 9 Q12 10 15 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
    
    {/* Человек 2 (низ-лево) */}
    <circle cx="7" cy="15" r="2" fill="currentColor" stroke="white" strokeWidth="1" />
    <path d="M5 18 Q7 19 9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
    
    {/* Человек 3 (низ-право) */}
    <circle cx="17" cy="15" r="2" fill="currentColor" stroke="white" strokeWidth="1" />
    <path d="M15 18 Q17 19 19 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
    
    {/* Энергетические связи между людьми */}
    <path 
      d="M12 8 L7 13" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      opacity="0.4"
      strokeDasharray="2 2"
    />
    <path 
      d="M12 8 L17 13" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      opacity="0.4"
      strokeDasharray="2 2"
    />
    <path 
      d="M9 15 L15 15" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      opacity="0.4"
      strokeDasharray="2 2"
    />
    
    {/* Центральная точка силы */}
    <circle cx="12" cy="12" r="1.5" fill="white" opacity="0.9" />
    <circle cx="12" cy="12" r="3" stroke="white" strokeWidth="0.5" opacity="0.3" fill="none" />
    
    {/* Энергетические частицы вокруг */}
    <circle cx="12" cy="3" r="0.5" fill="currentColor" opacity="0.5" />
    <circle cx="20" cy="12" r="0.5" fill="currentColor" opacity="0.5" />
    <circle cx="4" cy="12" r="0.5" fill="currentColor" opacity="0.5" />
    <circle cx="7" cy="20" r="0.5" fill="currentColor" opacity="0.5" />
    <circle cx="17" cy="20" r="0.5" fill="currentColor" opacity="0.5" />
    
    {/* Символ бесконечности в центре (синергия) */}
    <path 
      d="M10 12 Q11 10.5 12 12 Q13 13.5 14 12" 
      stroke="white" 
      strokeWidth="0.8" 
      fill="none"
      opacity="0.6"
    />
  </svg>
);

// БОНУС: Иконка для вводного модуля "Обучение"
export const LearningIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <defs>
      <linearGradient id="book-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="currentColor" stopOpacity="0.5" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="1" />
      </linearGradient>
    </defs>
    
    {/* Открытая книга */}
    <path 
      d="M3 6 L3 18 C3 19 4 20 5 20 L12 20 L19 20 C20 20 21 19 21 18 L21 6 C21 5 20 4 19 4 L12 4 L5 4 C4 4 3 5 3 6 Z" 
      fill="url(#book-gradient)"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    
    {/* Разделитель страниц */}
    <path d="M12 4 L12 20" stroke="currentColor" strokeWidth="1" opacity="0.3" />
    
    {/* Страницы (левая сторона) */}
    <path d="M6 8 L10 8" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
    <path d="M6 11 L10 11" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
    <path d="M6 14 L9 14" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
    
    {/* Страницы (правая сторона) */}
    <path d="M14 8 L18 8" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
    <path d="M14 11 L18 11" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
    <path d="M15 14 L18 14" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
    
    {/* Магическая звезда над книгой */}
    <path 
      d="M12 2 L12.5 3.5 L14 4 L12.5 4.5 L12 6 L11.5 4.5 L10 4 L11.5 3.5 Z" 
      fill="currentColor"
      opacity="0.8"
    />
    
    {/* Энергетические частицы */}
    <circle cx="8" cy="3" r="0.5" fill="currentColor" opacity="0.5" />
    <circle cx="16" cy="3" r="0.5" fill="currentColor" opacity="0.5" />
    <circle cx="6" cy="22" r="0.5" fill="currentColor" opacity="0.5" />
    <circle cx="18" cy="22" r="0.5" fill="currentColor" opacity="0.5" />
  </svg>
);
