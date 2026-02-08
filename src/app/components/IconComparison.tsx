import React, { useState } from 'react';
import { motion } from 'motion/react';

// Импорты всех трех версий
import * as StaticIcons from './CosmicIcons';
import * as AnimatedIcons from './AnimatedCosmicIcons';
import * as FluidIcons from './FluidCosmicIcons';

/**
 * СРАВНЕНИЕ ТРЕХ ВЕРСИЙ ИКОНОК
 * v1.0 Статика | v2.0 Анимации | v3.0 FLUID
 */
export const IconComparison = () => {
  const [selectedVersion, setSelectedVersion] = useState<'static' | 'animated' | 'fluid'>('fluid');

  const icons = [
    { name: 'Обучение', key: 'LearningIcon' },
    { name: 'Аутентичность', key: 'AuthenticityIcon' },
    { name: 'ЦА', key: 'AudienceIcon' },
    { name: 'Продукты', key: 'ProductIcon' },
    { name: 'Воронка', key: 'FunnelIcon' },
    { name: 'Продажи', key: 'SalesIcon' },
    { name: 'Блог', key: 'BlogIcon' },
    { name: 'Команда', key: 'TeamIcon' },
  ];

  const versions = [
    {
      id: 'static',
      label: 'v1.0 Статика',
      subtitle: 'Красиво, но мертво',
      color: 'from-gray-400 to-gray-600',
      icons: StaticIcons,
      rating: '7/10',
      features: ['Градиенты', 'Символизм', 'Формы'],
      missing: ['Движение', 'Жизнь', 'Поток'],
    },
    {
      id: 'animated',
      label: 'v2.0 Анимации',
      subtitle: 'Живые, но геометричные',
      color: 'from-violet-500 to-fuchsia-500',
      icons: AnimatedIcons,
      rating: '6/10 (Заха)',
      features: ['Анимации', 'Частицы', 'Свечение'],
      missing: ['Органика', 'Морфинг', 'Асимметрия'],
    },
    {
      id: 'fluid',
      label: 'v3.0 FLUID ✨',
      subtitle: 'Истинная органика Захи',
      color: 'from-cyan-400 via-violet-500 to-fuchsia-600',
      icons: FluidIcons,
      rating: '10/10 💎',
      features: ['Морфинг форм', 'Кривые Безье', 'Асимметрия', 'Gooey фильтры'],
      missing: [],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-violet-900 to-fuchsia-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Заголовок */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-6xl font-bold bg-gradient-to-r from-white via-violet-200 to-fuchsia-200 bg-clip-text text-transparent mb-4">
            Эволюция Иконок
          </h1>
          <p className="text-xl text-white/70 mb-2">
            От статики к истинной органике
          </p>
          <p className="text-sm text-white/50">
            Три версии • Три философии • Одна цель: Создать магию
          </p>
        </motion.div>

        {/* Переключатель версий */}
        <div className="flex justify-center gap-4 mb-12">
          {versions.map((version) => (
            <motion.button
              key={version.id}
              onClick={() => setSelectedVersion(version.id as any)}
              className={`
                px-8 py-4 rounded-2xl font-bold transition-all
                ${selectedVersion === version.id 
                  ? 'bg-gradient-to-r ' + version.color + ' text-white shadow-2xl scale-105' 
                  : 'bg-white/10 text-white/50 hover:bg-white/20'
                }
              `}
              whileHover={{ scale: selectedVersion === version.id ? 1.05 : 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="text-sm mb-1">{version.label}</div>
              <div className="text-xs opacity-70">{version.subtitle}</div>
            </motion.button>
          ))}
        </div>

        {/* Детали версии */}
        <motion.div
          key={selectedVersion}
          className="bg-white/10 backdrop-blur-xl rounded-[3rem] p-8 mb-12 border border-white/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {versions.map((version) => {
            if (version.id !== selectedVersion) return null;
            return (
              <div key={version.id} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <div className="text-4xl font-bold text-white mb-2">{version.label}</div>
                  <div className="text-lg text-white/70 mb-6">{version.subtitle}</div>
                  
                  <div className="mb-6">
                    <div className="text-sm text-white/50 uppercase mb-2">Оценка Захи:</div>
                    <div className="text-3xl font-bold text-white">{version.rating}</div>
                  </div>

                  <div className="mb-4">
                    <div className="text-sm text-white/50 uppercase mb-2">Что есть:</div>
                    <div className="flex flex-wrap gap-2">
                      {version.features.map((feature, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-lg text-sm border border-emerald-500/30"
                        >
                          ✓ {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  {version.missing.length > 0 && (
                    <div>
                      <div className="text-sm text-white/50 uppercase mb-2">Чего не хватает:</div>
                      <div className="flex flex-wrap gap-2">
                        {version.missing.map((feature, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-red-500/20 text-red-300 rounded-lg text-sm border border-red-500/30"
                          >
                            ✗ {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-center">
                  <div className={`w-32 h-32 rounded-3xl bg-gradient-to-br ${version.color} flex items-center justify-center shadow-2xl`}>
                    {version.icons && version.icons.AuthenticityIcon && (
                      <version.icons.AuthenticityIcon size={80} className="text-white" />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Сетка сравнения */}
        <div className="grid grid-cols-4 gap-6">
          {icons.map((icon, idx) => {
            const currentVersion = versions.find(v => v.id === selectedVersion);
            const IconComponent = currentVersion?.icons[icon.key as keyof typeof currentVersion.icons];
            
            return (
              <motion.div
                key={icon.key}
                className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
              >
                <div className={`w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${currentVersion?.color} flex items-center justify-center shadow-lg`}>
                  {IconComponent && <IconComponent size={48} className="text-white" />}
                </div>
                <div className="text-center text-white text-sm font-medium">{icon.name}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Техническая таблица */}
        <motion.div
          className="mt-12 bg-white/10 backdrop-blur-xl rounded-[3rem] p-8 border border-white/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-white mb-6">Технические отличия</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-white">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left p-3 text-white/70">Параметр</th>
                  <th className="text-center p-3">v1.0</th>
                  <th className="text-center p-3">v2.0</th>
                  <th className="text-center p-3">v3.0 FLUID</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { param: 'Формы', v1: 'Геометрия', v2: 'Геометрия', v3: '✨ Органика' },
                  { param: 'Линии', v1: 'Прямые (L)', v2: 'Прямые (L)', v3: '✨ Кривые Безье (Q, C)' },
                  { param: 'Симметрия', v1: 'Да', v2: 'Да', v3: '✨ НЕТ' },
                  { param: 'Края', v1: 'Четкие', v2: 'Четкие', v3: '✨ Размытые (gooey)' },
                  { param: 'Анимации', v1: '—', v2: 'Scale, Rotate', v3: '✨ Морфинг форм' },
                  { param: 'Траектории', v1: '—', v2: 'Круговые', v3: '✨ Кривые Безье' },
                  { param: 'Слои', v1: '1-2', v2: '3-4', v3: '✨ 4-7' },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-white/10">
                    <td className="p-3 text-white/70">{row.param}</td>
                    <td className="p-3 text-center text-sm">{row.v1}</td>
                    <td className="p-3 text-center text-sm">{row.v2}</td>
                    <td className="p-3 text-center text-sm font-bold bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent">
                      {row.v3}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Footer */}
        <div className="mt-12 text-center text-white/50 text-sm">
          <p>🌊 FLUID версия — это истинный стиль Захи Хадид</p>
          <p className="mt-2">Никаких прямых линий. Никакой симметрии. Только поток.</p>
        </div>
      </div>
    </div>
  );
};

export default IconComparison;
