import React from 'react';
import {
  LearningIcon,
  AuthenticityIcon,
  AudienceIcon,
  ProductIcon,
  FunnelIcon,
  SalesIcon,
  BlogIcon,
  TeamIcon,
} from './CosmicIcons';

/**
 * Быстрый превью всех иконок
 * Можно временно добавить в App.tsx для проверки
 */
export const IconPreview = () => {
  const icons = [
    { Icon: LearningIcon, name: 'Обучение', color: 'from-[#2E1065] to-[#5B21B6]' },
    { Icon: AuthenticityIcon, name: 'Аутентичность', color: 'from-[#2E1065] via-[#583B8B] to-[#583B8B]' },
    { Icon: AudienceIcon, name: 'ЦА', color: 'from-[#5B21B6] to-[#3B82F6]' },
    { Icon: ProductIcon, name: 'Продукты', color: 'from-[#2E1065] to-[#8C2F5E]' },
    { Icon: FunnelIcon, name: 'Воронка', color: 'from-[#2E1065] to-[#8C2F5E]' },
    { Icon: SalesIcon, name: 'Продажи', color: 'from-[#1e1b4b] to-[#4338ca]' },
    { Icon: BlogIcon, name: 'Блог', color: 'from-[#312e81] to-[#6366f1]' },
    { Icon: TeamIcon, name: 'Команда', color: 'from-[#0f172a] to-[#581c87]' },
  ];

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-white/95 backdrop-blur-xl p-4 rounded-2xl border border-gray-200 shadow-2xl">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs font-bold text-gray-900 uppercase tracking-wider">Новые иконки ✨</span>
        <span className="text-[10px] text-gray-500">(удали IconPreview после проверки)</span>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {icons.map(({ Icon, name, color }) => (
          <div key={name} className="flex flex-col items-center gap-1">
            <div className={`w-12 h-12 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center`}>
              <Icon size={24} className="text-white" />
            </div>
            <span className="text-[9px] font-medium text-gray-600 text-center leading-tight">
              {name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};