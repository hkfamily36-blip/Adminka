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
 * КОСМИЧЕСКИЕ ИКОНКИ - ВИЗУАЛЬНЫЙ ГАЙД
 * 
 * Каждая иконка отражает энергию и суть модуля обучения
 */

export const IconShowcase = () => {
  const icons = [
    {
      Component: LearningIcon,
      title: "Обучение",
      description: "Открытая книга с магической звездой",
      energy: "Знание и подготовка",
      colors: "from-[#2E1065] to-[#5B21B6]"
    },
    {
      Component: AuthenticityIcon,
      title: "Аутентичность",
      description: "Кристалл с внутренним светом и гранями",
      energy: "Уникальность и чистота",
      colors: "from-[#4C1D95] via-[#6D28D9] to-[#7C3AED]"
    },
    {
      Component: AudienceIcon,
      title: "Своя ЦА",
      description: "Сердце с энергетическими кольцами и людьми внутри",
      energy: "Любовь и резонанс",
      colors: "from-[#5B21B6] to-[#3B82F6]"
    },
    {
      Component: ProductIcon,
      title: "Продукты и Метод",
      description: "Священная геометрия - цветок жизни",
      energy: "Гармония и целостность",
      colors: "from-[#701a75] to-[#c026d3]"
    },
    {
      Component: FunnelIcon,
      title: "Воронка",
      description: "Космическая воронка с потоком энергии",
      energy: "Фокус и магнетизм",
      colors: "from-[#4a044e] to-[#db2777]"
    },
    {
      Component: SalesIcon,
      title: "Технология продаж",
      description: "Магнит с силой притяжения",
      energy: "Притяжение и изобилие",
      colors: "from-[#1e1b4b] to-[#4338ca]"
    },
    {
      Component: BlogIcon,
      title: "Блог",
      description: "Созвездие связей - вы в центре",
      energy: "Связь и влияние",
      colors: "from-[#312e81] to-[#6366f1]"
    },
    {
      Component: TeamIcon,
      title: "Команда",
      description: "Синергия энергий - три человека в единстве",
      energy: "Сотворчество и умножение",
      colors: "from-[#0f172a] to-[#581c87]"
    },
  ];

  return (
    <div className="p-12 bg-gradient-to-br from-violet-50 via-white to-fuchsia-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent mb-4">
            Космические Иконки
          </h1>
          <p className="text-xl text-gray-600">
            7 элементов бизнес-системы + вводный модуль
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {icons.map(({ Component, title, description, energy, colors }, idx) => (
            <div 
              key={idx}
              className="bg-white/80 backdrop-blur-xl p-8 rounded-[2rem] border border-white/60 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              {/* Иконка */}
              <div className={`w-20 h-20 mx-auto mb-6 bg-gradient-to-br ${colors} rounded-2xl flex items-center justify-center`}>
                <Component size={40} className="text-white" />
              </div>

              {/* Информация */}
              <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">
                {title}
              </h3>
              
              <p className="text-sm text-gray-600 mb-4 text-center leading-relaxed">
                {description}
              </p>

              <div className="pt-4 border-t border-gray-200">
                <div className="text-xs font-bold text-violet-600 uppercase tracking-wider mb-1 text-center">
                  Энергия
                </div>
                <div className="text-sm text-gray-700 text-center">
                  {energy}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Легенда */}
        <div className="mt-16 bg-white/60 backdrop-blur-xl p-8 rounded-[2rem] border border-white/60">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Дизайн-система иконок</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-gray-800 mb-3 flex items-center">
                <span className="w-2 h-2 bg-violet-600 rounded-full mr-2"></span>
                Визуальные принципы
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Градиенты и внутреннее свечение</li>
                <li>• Органические формы вместо жестких линий</li>
                <li>• Энергетические частицы и потоки</li>
                <li>• Световые акценты и блики</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-gray-800 mb-3 flex items-center">
                <span className="w-2 h-2 bg-fuchsia-600 rounded-full mr-2"></span>
                Символизм
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Кристалл = чистота и многогранность</li>
                <li>• Сердце = любовь и резонанс</li>
                <li>• Священная геометрия = гармония</li>
                <li>• Созвездие = связи и влияние</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IconShowcase;
