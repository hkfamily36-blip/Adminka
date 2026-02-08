import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  LearningIcon,
  AuthenticityIcon,
  AudienceIcon,
  ProductIcon,
  FunnelIcon,
  SalesIcon,
  BlogIcon,
  TeamIcon,
} from './AnimatedCosmicIcons';

/**
 * ПРЕВЬЮ АНИМИРОВАННЫХ ИКОНОК
 * Можно добавить в App.tsx временно для демонстрации
 */
export const AnimatedIconsPreview = () => {
  const [selectedIcon, setSelectedIcon] = useState<number | null>(null);

  const icons = [
    {
      Icon: LearningIcon,
      name: 'Обучение',
      gradient: 'from-[#2E1065] to-[#5B21B6]',
      description: 'Открытая книга с вращающейся магической звездой',
      features: ['Пульсирующее свечение', 'Вращающаяся звезда', 'Мерцающие частицы'],
    },
    {
      Icon: AuthenticityIcon,
      name: 'Аутентичность',
      gradient: 'from-[#4C1D95] via-[#6D28D9] to-[#7C3AED]',
      description: 'Живой кристалл с энергетическим ядром',
      features: ['Дыхание кристалла', 'Пульсация ядра', 'Орбитальные частицы', 'Световые лучи'],
    },
    {
      Icon: AudienceIcon,
      name: 'Своя ЦА',
      gradient: 'from-[#5B21B6] to-[#3B82F6]',
      description: 'Пульсирующее сердце с энергетическими кольцами',
      features: ['Дыхание сердца', 'Расходящиеся кольца', 'Мерцающие частицы'],
    },
    {
      Icon: ProductIcon,
      name: 'Продукты',
      gradient: 'from-[#701a75] to-[#c026d3]',
      description: 'Вращающийся цветок жизни',
      features: ['Пульсация центра', 'Волна по лепесткам', 'Световые потоки'],
    },
    {
      Icon: FunnelIcon,
      name: 'Воронка',
      gradient: 'from-[#4a044e] to-[#db2777]',
      description: 'Энергетический поток вниз',
      features: ['Падающие частицы', 'Мерцающие уровни', 'Пульсирующая звезда-результат'],
    },
    {
      Icon: SalesIcon,
      name: 'Продажи',
      gradient: 'from-[#1e1b4b] to-[#4338ca]',
      description: 'Магнит с притяжением',
      features: ['Дыхание магнита', 'Притягиваемые частицы', 'Парящая монета'],
    },
    {
      Icon: BlogIcon,
      name: 'Блог',
      gradient: 'from-[#312e81] to-[#6366f1]',
      description: 'Пульсирующее созвездие',
      features: ['Центральное свечение', 'Волна по точкам', 'Мерцающие связи'],
    },
    {
      Icon: TeamIcon,
      name: 'Команда',
      gradient: 'from-[#0f172a] to-[#581c87]',
      description: 'Синергия трех энергий',
      features: ['Дыхание людей', 'Пульсирующие связи', 'Символ бесконечности', 'Частицы вокруг'],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-fuchsia-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Заголовок */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-6xl font-bold bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-500 bg-clip-text text-transparent mb-4">
            ✨ Живые Космические Иконки
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Каждая иконка дышит и живет своей жизнью
          </p>
          <p className="text-sm text-gray-500">
            Нажми на любую иконку, чтобы увидеть детали анимации
          </p>
        </motion.div>

        {/* Сетка иконок */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {icons.map((icon, idx) => (
            <motion.div
              key={idx}
              className="relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
            >
              <motion.div
                onClick={() => setSelectedIcon(selectedIcon === idx ? null : idx)}
                className={`
                  relative overflow-hidden p-8 rounded-[2rem] cursor-pointer
                  transition-all duration-500
                  ${selectedIcon === idx 
                    ? 'bg-white shadow-2xl shadow-violet-300 scale-105 z-10' 
                    : 'bg-white/80 backdrop-blur-xl shadow-lg hover:shadow-xl hover:-translate-y-2'
                  }
                `}
                whileHover={{ scale: selectedIcon === idx ? 1.05 : 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Фоновое свечение */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${icon.gradient} opacity-0`}
                  animate={{
                    opacity: selectedIcon === idx ? 0.1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                />

                {/* Иконка */}
                <div className={`w-24 h-24 mx-auto mb-4 bg-gradient-to-br ${icon.gradient} rounded-2xl flex items-center justify-center relative overflow-hidden`}>
                  {/* Пульсирующее свечение внутри */}
                  <motion.div
                    className="absolute inset-0 bg-white"
                    animate={{
                      opacity: [0, 0.3, 0],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  />
                  <icon.Icon size={48} className="text-white relative z-10" />
                </div>

                {/* Название */}
                <h3 className="text-lg font-bold text-gray-900 text-center mb-2">
                  {icon.name}
                </h3>

                {/* Описание при выборе */}
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: selectedIcon === idx ? 'auto' : 0,
                    opacity: selectedIcon === idx ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="text-sm text-gray-600 mb-3 text-center">
                    {icon.description}
                  </p>
                  <div className="border-t border-gray-200 pt-3 mt-3">
                    <div className="text-xs font-bold text-violet-600 uppercase mb-2 text-center">
                      Анимации:
                    </div>
                    <ul className="space-y-1">
                      {icon.features.map((feature, i) => (
                        <li key={i} className="text-xs text-gray-600 flex items-center">
                          <span className="w-1.5 h-1.5 bg-violet-400 rounded-full mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>

                {/* Индикатор выбора */}
                <motion.div
                  className="absolute top-4 right-4 w-6 h-6 rounded-full bg-violet-600 flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: selectedIcon === idx ? 1 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Демо в контексте */}
        <motion.div
          className="bg-white/80 backdrop-blur-xl rounded-[3rem] p-12 mb-12 border border-white/60 shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            В контексте интерфейса
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Пример 1: Карточка модуля */}
            <div className="bg-gradient-to-br from-violet-50 to-white p-8 rounded-[2rem] relative overflow-hidden">
              <motion.div
                className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-violet-400 to-fuchsia-400 rounded-full blur-3xl opacity-20"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.3, 0.2],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
              />
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-2xl flex items-center justify-center shadow-xl">
                    <AuthenticityIcon size={32} className="text-white" />
                  </div>
                  <span className="text-2xl font-bold text-violet-600">42%</span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  1. Аутентичность
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Распаковка уникальности и глубинных смыслов
                </p>

                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-violet-600 to-fuchsia-600"
                    initial={{ width: 0 }}
                    animate={{ width: '42%' }}
                    transition={{ duration: 1.5, delay: 1 }}
                  />
                </div>
              </div>
            </div>

            {/* Пример 2: Панорама */}
            <div className="bg-gradient-to-br from-fuchsia-50 to-white p-8 rounded-[2rem]">
              <h4 className="text-sm font-bold text-gray-600 uppercase mb-6 text-center">
                Панорама системы
              </h4>
              
              <div className="relative flex items-center justify-between">
                <div className="absolute inset-0 flex items-center">
                  <div className="h-1 w-full bg-gradient-to-r from-violet-200 via-fuchsia-200 to-transparent rounded-full" />
                </div>

                {icons.slice(0, 7).map((icon, i) => (
                  <motion.div
                    key={i}
                    className="relative z-10"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1.5 + i * 0.1, duration: 0.4 }}
                  >
                    <div className={`w-12 h-12 bg-gradient-to-br ${icon.gradient} rounded-full flex items-center justify-center border-4 border-white shadow-lg`}>
                      <icon.Icon size={16} className="text-white" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Технические детали */}
        <motion.div
          className="bg-gray-900 text-white rounded-[3rem] p-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
            💫 Технологии анимации
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-violet-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="white" strokeWidth="2" fill="none" />
                  <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" fill="none" />
                  <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" fill="none" />
                </svg>
              </div>
              <h3 className="font-bold mb-2">Motion React</h3>
              <p className="text-sm text-gray-400">
                Плавные transitions и keyframe анимации
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-fuchsia-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2" fill="none" />
                  <path d="M12 6V12L16 14" stroke="white" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <h3 className="font-bold mb-2">Infinite Loops</h3>
              <p className="text-sm text-gray-400">
                Бесконечные циклы для живого эффекта
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <rect x="4" y="4" width="16" height="16" rx="2" stroke="white" strokeWidth="2" fill="none" />
                  <path d="M4 10H20M10 4V20" stroke="white" strokeWidth="2" />
                </svg>
              </div>
              <h3 className="font-bold mb-2">SVG + Gradients</h3>
              <p className="text-sm text-gray-400">
                Векторная графика с живыми градиентами
              </p>
            </div>
          </div>
        </motion.div>

        {/* Инструкция по использованию */}
        <motion.div
          className="mt-12 bg-violet-100 rounded-[2rem] p-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          <p className="text-gray-700 font-medium mb-2">
            🎨 Этот компонент можно удалить после просмотра
          </p>
          <p className="text-sm text-gray-600">
            Просто удалите <code className="bg-white px-2 py-1 rounded text-violet-600">&lt;AnimatedIconsPreview /&gt;</code> из App.tsx
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default AnimatedIconsPreview;
