import React from 'react';
import Book3DIcon from './Book3DIcon';
import {
  AuthenticityIcon,
  AudienceIcon,
  ProductIcon,
  FunnelIcon,
  SalesIcon,
  BlogIcon,
  TeamIcon,
  BonusIcon,
} from './MagicCosmicIcons';

/**
 * 🎨 SHOWCASE: КОНЦЕПЦИИ 3D ИКОНОК
 * 
 * Визуализация того, как каждая иконка будет выглядеть в 3D стиле
 */

interface Icon3DConceptProps {
  title: string;
  subtitle: string;
  description: string;
  techniques: string[];
  colors: string;
  currentIcon: React.ComponentType<any>;
  isReady?: boolean;
}

const Icon3DConcept: React.FC<Icon3DConceptProps> = ({
  title,
  subtitle,
  description,
  techniques,
  colors,
  currentIcon: CurrentIcon,
  isReady = false
}) => (
  <div className={`relative overflow-hidden bg-white/80 backdrop-blur-xl rounded-[2.5rem] border border-white/60 shadow-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 ${isReady ? 'ring-2 ring-violet-400' : ''}`}>
    {/* Градиентный фон */}
    <div className={`absolute inset-0 bg-gradient-to-br ${colors} opacity-5 pointer-events-none`}></div>
    
    {/* Бейдж статуса */}
    {isReady && (
      <div className="absolute top-4 right-4 z-10">
        <div className="bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-xl shadow-lg flex items-center">
          <span className="w-1.5 h-1.5 bg-white rounded-full mr-2 animate-pulse"></span>
          ГОТОВО
        </div>
      </div>
    )}
    
    {!isReady && (
      <div className="absolute top-4 right-4 z-10">
        <div className="bg-slate-100 text-slate-500 text-[10px] font-bold px-3 py-1.5 rounded-xl flex items-center border border-slate-200">
          КОНЦЕПЦИЯ
        </div>
      </div>
    )}
    
    <div className="relative z-10 p-8">
      {/* Иконка */}
      <div className="mb-6 flex justify-center">
        <div className={`p-8 bg-gradient-to-br ${colors} rounded-3xl shadow-2xl`}>
          <CurrentIcon size={isReady ? 120 : 80} className="text-white" />
        </div>
      </div>
      
      {/* Заголовок */}
      <div className="mb-4 text-center">
        <h3 className="text-xl font-bold text-slate-800 mb-1">{title}</h3>
        <p className="text-sm text-slate-500 font-medium">{subtitle}</p>
      </div>
      
      {/* Описание */}
      <div className="mb-6 p-4 bg-gradient-to-br from-slate-50 to-white rounded-2xl border border-slate-100">
        <p className="text-xs text-slate-600 leading-relaxed">{description}</p>
      </div>
      
      {/* Техники 3D */}
      <div className="space-y-2">
        <h4 className="text-xs font-bold text-slate-700 mb-3 flex items-center">
          <span className="w-1.5 h-1.5 bg-violet-500 rounded-full mr-2"></span>
          3D Техники:
        </h4>
        <div className="space-y-2">
          {techniques.map((technique, idx) => (
            <div key={idx} className="flex items-start text-xs">
              <span className="text-violet-500 mr-2 mt-0.5">✓</span>
              <span className="text-slate-600 flex-1">{technique}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export const Icon3DShowcase: React.FC = () => {
  const concepts = [
    {
      title: "0. Обучение",
      subtitle: "3D Книга",
      description: "Объемная раскрытая книга с видимым торцом страниц, перспективой и реалистичной магической звездой. Создает ощущение глубины и материальности.",
      techniques: [
        "Множественные слои для глубины",
        "Градиенты на боковых гранях",
        "SVG фильтры для теней и бликов",
        "Перспективное искажение страниц",
        "Объемная звезда с 8 лучами"
      ],
      colors: "from-[#2E1065] via-[#583B8B] to-[#583B8B]",
      currentIcon: Book3DIcon,
      isReady: true
    },
    {
      title: "1. Аутентичность",
      subtitle: "3D Космический Глаз",
      description: "Глаз с выпуклой радужкой, объемным зрачком и реалистичной галактикой внутри. Белок с мягкими тенями, ресницы создают глубину. Эффект стеклянной сферы.",
      techniques: [
        "Сферическая радужка с бликами",
        "Вогнутость белка глаза",
        "3D спирали галактики с тенями",
        "Объемный зрачок с глубиной",
        "Реалистичные блики света"
      ],
      colors: "from-[#2E1065] via-[#583B8B] to-[#583B8B]",
      currentIcon: AuthenticityIcon,
      isReady: false
    },
    {
      title: "2. Своя ЦА",
      subtitle: "3D Пульсирующее Сердце",
      description: "Анатомическое сердце с объемными камерами, глянцевой поверхностью и световыми прожилками. Эффект биения - пульсация глубины и теплое свечение изнутри.",
      techniques: [
        "Анатомическая форма с объемом",
        "Градиенты для мышечной текстуры",
        "Свечение энергии изнутри",
        "Динамические тени при пульсации",
        "Стеклянный эффект на аорте"
      ],
      colors: "from-[#5B21B6] to-[#3B82F6]",
      currentIcon: AudienceIcon,
      isReady: false
    },
    {
      title: "3. Продукт",
      subtitle: "3D Семя Жизни + Меркаба",
      description: "Объемная сакральная геометрия: 7 парящих золотых кругов (Семя Жизни) + большие треугольники Меркабы, проходящие сквозь структуру. Каждый круг и треугольник имеет глубину и золотой металлический блеск.",
      techniques: [
        "7 сфер на разных уровнях глубины",
        "Большие треугольники с перспективой",
        "Золотой металлический материал",
        "Мерцающие точки на вершинах",
        "Объемные пересечения геометрии"
      ],
      colors: "from-[#2E1065] to-[#8C2F5E]",
      currentIcon: ProductIcon,
      isReady: false
    },
    {
      title: "4. Воронка",
      subtitle: "3D Спиральный Вихрь",
      description: "Воронка как физический 3D объект с вращающимися спиральными кольцами. Частицы света стекают вниз, создавая эффект гравитации. Стеклянный материал с преломлением.",
      techniques: [
        "Кольца воронки с толщиной",
        "Перспективное сужение вниз",
        "Эффект стекла (преломление)",
        "Частицы с траекториями",
        "Градиенты глубины (темнее в центре)"
      ],
      colors: "from-[#2E1065] to-[#8C2F5E]",
      currentIcon: FunnelIcon,
      isReady: false
    },
    {
      title: "5. Продажи",
      subtitle: "3D Рукопожатие + Монеты",
      description: "Две объемные руки в момент рукопожатия с реалистичными тенями. Золотые монеты с рельефом вылетают искрами. Энергетический поток соединяет руки - эффект доверия.",
      techniques: [
        "Анатомические руки с объемом",
        "Складки кожи через тени",
        "Монеты с рельефным тиснением",
        "Металлический блеск золота",
        "Энергопоток как светящийся туннель"
      ],
      colors: "from-[#1e1b4b] to-[#4338ca]",
      currentIcon: SalesIcon,
      isReady: false
    },
    {
      title: "6. Блог",
      subtitle: "3D Перо + Свиток",
      description: "Объемное перо с детальными бородками, стеклянная чернильница с отражениями. Свиток с завитками на торцах и текстурой бумаги. Чернила стекают каплями с эффектом жидкости.",
      techniques: [
        "Перо с тонкими бородками",
        "Стеклянная чернильница (прозрачность)",
        "Свиток с цилиндрическими торцами",
        "Текстура бумаги (шероховатость)",
        "Капли чернил с отражениями"
      ],
      colors: "from-[#312e81] to-[#6366f1]",
      currentIcon: BlogIcon,
      isReady: false
    },
    {
      title: "7. Команда",
      subtitle: "3D Друза Кристаллов (Фиолетово-Голубая)",
      description: "Группа кристаллов разной высоты (7 шт): фиолетовые, голубые, розовые. Каждый кристалл с острыми гранями, внутренним свечением и белыми бликами на вершинах. Объемное каменное основание.",
      techniques: [
        "7+ кристаллов на разных уровнях",
        "Фиолетовые + голубые градиенты",
        "Белые блики на гранях (стекло)",
        "Искры и свечение от вершин",
        "Каменное основание с глубиной"
      ],
      colors: "from-[#0f172a] to-[#581c87]",
      currentIcon: TeamIcon,
      isReady: true
    },
    {
      title: "8. AI-Агенты",
      subtitle: "3D Нейросеть",
      description: "Объемная нейронная сеть со сферическими узлами, светящимися изнутри. Связи как светящиеся трубки с пульсирующими импульсами. Эффект голографии и квантовой сетки.",
      techniques: [
        "Сферы-нейроны с внутренним светом",
        "Связи как цилиндрические трубки",
        "Импульсы с траекторией движения",
        "Голографический эффект (прозрачность)",
        "Квантовое свечение вокруг узлов"
      ],
      colors: "from-slate-900 to-[#2e1065]",
      currentIcon: BonusIcon,
      isReady: false
    }
  ];

  return (
    <div className="space-y-12">
      {/* Заголовок */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-slate-800 mb-4">
          🎨 Концепции 3D Иконок
        </h2>
        <p className="text-slate-500 text-lg max-w-3xl mx-auto leading-relaxed">
          Как будут выглядеть все 8 элементов системы в объемном 3D стиле с реалистичными материалами, 
          светом и тенями. Каждая иконка — это маленькая скульптура!
        </p>
      </div>

      {/* Сетка концепций */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {concepts.map((concept, idx) => (
          <Icon3DConcept key={idx} {...concept} />
        ))}
      </div>

      {/* Легенда техник */}
      <div className="mt-16 p-10 bg-white/80 backdrop-blur-xl rounded-[3rem] border border-white/60 shadow-xl">
        <h3 className="text-2xl font-bold text-slate-800 mb-6 text-center">
          📐 Основные 3D Техники
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-violet-100 to-violet-50 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
              <span className="text-3xl">🎭</span>
            </div>
            <h4 className="font-bold text-slate-700 mb-2 text-sm">Градиенты</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Множественные градиенты для создания объема и световых переходов
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-amber-50 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
              <span className="text-3xl">💎</span>
            </div>
            <h4 className="font-bold text-slate-700 mb-2 text-sm">Материалы</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Стекло, металл, пластик - реалистичные блики и отражения
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-fuchsia-100 to-fuchsia-50 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
              <span className="text-3xl">🔦</span>
            </div>
            <h4 className="font-bold text-slate-700 mb-2 text-sm">SVG Фильтры</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Тени, размытие, блики через встроенные фильтры SVG
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-sky-100 to-sky-50 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
              <span className="text-3xl">📏</span>
            </div>
            <h4 className="font-bold text-slate-700 mb-2 text-sm">Перспектива</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Искажение форм и масштаб для создания глубины пространства
            </p>
          </div>
        </div>
      </div>

      {/* Призыв к действию */}
      <div className="text-center mt-12 p-8 bg-gradient-to-br from-violet-50 to-fuchsia-50 rounded-[2.5rem] border border-violet-100">
        <p className="text-slate-600 text-lg mb-4">
          💫 Все иконки будут переработаны в едином 3D стиле
        </p>
        <p className="text-sm text-slate-500">
          Ожидайте полный набор объемных космических иконок с потрясающей детализацией!
        </p>
      </div>
    </div>
  );
};

export default Icon3DShowcase;