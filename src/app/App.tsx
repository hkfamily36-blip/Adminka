import React, { useState, ReactNode } from 'react';
import { motion } from 'motion/react';
import { 
  PlayCircle, 
  ChevronLeft, 
  ChevronRight, 
  ChevronDown, 
  ChevronUp, 
  FileText, 
  Link as LinkIcon, 
  Unlock, 
  Menu,
  Star,
  Map,
  LayoutGrid,
  Check,
  Crown,
  Users,
  Shield,
  X,
  Clock,
  AlertCircle,
  Video,        
  Headphones,   
  ClipboardList,
  AlignLeft,
  Circle,
  CheckCircle2 
} from 'lucide-react';
import { TARIFFS, getTariffLabel, checkAccess } from './config/tariffs';
import type { TariffKey } from './config/tariffs';

// Импорт волшебных космических иконок (Финальные - по твоему референсу!)
import {
  LearningIcon,
  AuthenticityIcon,
  AudienceIcon,
  ProductIcon,
  FunnelIcon,
  SalesIcon,
  BlogIcon,
  TeamIcon,
  BonusIcon,
} from './components/MagicCosmicIcons';

// Импорт серых версий иконок для непройденных модулей
import {
  GrayLearningIcon,
  GrayAuthenticityIcon,
  GrayAudienceIcon,
  GrayProductIcon,
  GrayFunnelIcon,
  GraySalesIcon,
  GrayBlogIcon,
  GrayTeamIcon,
  GrayBonusIcon,
} from './components/GrayCosmicIcons';

// Импорт 3D версии иконки для демонстрации
import Book3DIcon from './components/Book3DIcon';

// Импорт showcase концепций 3D иконок
import { Icon3DShowcase } from './components/Icon3DShowcase';

// Импорт футера
import { Footer } from './components/Footer';

// Импорт админ-панели
import { AdminDashboard } from './components/admin/AdminDashboard';

// Импорт AuthProvider и BrowserRouter
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter } from 'react-router';

// Импорт компонента для космических эффектов
import { CosmicIconWrapper } from './components/CosmicIconWrapper';

// --- LOGO COMPONENT ---
export const Logo = () => (
  <div className="w-[340px] h-auto transition-all duration-500 select-none">
    <svg 
      viewBox="-50 -50 1000 250" 
      preserveAspectRatio="xMinYMin meet" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <defs>
        <style>
          {`
            @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700;800;900&display=swap');
            .diamond-breath-anim { animation: diamond-breath 4s infinite ease-in-out; transform-box: fill-box; transform-origin: center 60%; }
            @keyframes diamond-breath { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.03); } }
            .glow-pulse { animation: glow-intensity 4s infinite ease-in-out; transform-box: fill-box; transform-origin: center; }
            @keyframes glow-intensity { 0%, 100% { opacity: 0.4; transform: scale(0.5); } 50% { opacity: 0.8; transform: scale(1.6); } }
            .sparkle-anim { animation: twinkle 3s infinite ease-in-out; transform-box: fill-box; transform-origin: center; }
            .delay-1 { animation-delay: 0s; }
            .delay-2 { animation-delay: 1.5s; }
            .delay-3 { animation-delay: 0.5s; }
            @keyframes twinkle { 0%, 100% { opacity: 0.6; transform: scale(0.8) rotate(0deg); } 50% { opacity: 1; transform: scale(1.2) rotate(15deg); filter: drop-shadow(0px 0px 4px rgba(255, 255, 255, 0.8)); } }
            .pulse-heart { animation: pulse-gold 2s infinite ease-in-out; transform-box: fill-box; transform-origin: center; }
            .pulse-triangle { animation: pulse-purple 2s infinite ease-in-out; transform-box: fill-box; transform-origin: center; }
            @keyframes pulse-gold { 0%, 100% { transform: scale(1); filter: drop-shadow(0px 0px 2px rgba(217, 119, 6, 0.4)); opacity: 1; } 50% { transform: scale(1.05); filter: drop-shadow(0px 0px 8px rgba(217, 119, 6, 0.9)); opacity: 0.6; } }
            @keyframes pulse-purple { 0%, 100% { transform: scale(1); filter: drop-shadow(0px 0px 2px rgba(147, 51, 234, 0.4)); opacity: 1; } 50% { transform: scale(1.05); filter: drop-shadow(0px 0px 8px rgba(147, 51, 234, 0.9)); opacity: 0.6; } }
            .main-text { font-family: 'Montserrat', sans-serif; font-weight: 800; }
            .sub-text { font-family: 'Montserrat', sans-serif; font-weight: 700; }
          `}
        </style>
        <linearGradient id="diamondGradient" x1="50" y1="0" x2="50" y2="100" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#22D3EE" />
            <stop offset="50%" stopColor="#C084FC" />
            <stop offset="100%" stopColor="#E879F9" />
        </linearGradient>
        <linearGradient id="goldStroke" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="30%" stopColor="#FFF7CD" />
            <stop offset="60%" stopColor="#FDE68A" />
            <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
        <radialGradient id="purpleGlowRadial" cx="0.5" cy="0.5" r="0.5" fx="0.5" fy="0.5">
            <stop offset="0%" stopColor="#A855F7" stopOpacity="0.4" />
            <stop offset="60%" stopColor="#C084FC" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#C084FC" stopOpacity="0" />
        </radialGradient>
        <path id="sparkle" d="M10 0 C10 6 14 10 20 10 C14 10 10 14 10 20 C10 14 6 10 0 10 C6 10 10 6 10 0 Z" />
      </defs>
      <g transform="translate(0, 14)">
          <g className="diamond-breath-anim">
              <ellipse cx="50" cy="50" rx="80" ry="80" fill="url(#purpleGlowRadial)" className="glow-pulse" />
              <path d="M36 22 L64 22 L76 36 L50 78 L24 36 L36 22 Z" fill="url(#diamondGradient)" stroke="url(#goldStroke)" strokeWidth="1.5" strokeLinejoin="round" />
              <path d="M24 36 L76 36" stroke="url(#goldStroke)" strokeWidth="1.2" />
              <path d="M36 22 L50 36 L64 22" stroke="url(#goldStroke)" strokeWidth="1.2" fill="none"/>
              <path d="M50 78 L38 36" stroke="url(#goldStroke)" strokeWidth="1" />
              <path d="M50 78 L62 36" stroke="url(#goldStroke)" strokeWidth="1" />
              <path d="M36 22 L50 36 L64 22 Z" fill="white" fillOpacity="0.15" />
              <path d="M50 78 L24 36 L50 36 Z" fill="white" fillOpacity="0.08" />
              <g transform="translate(70, 0) scale(0.6)"> <use href="#sparkle" className="sparkle-anim delay-1" fill="#FFFFFF" /> </g>
              <g transform="translate(10, 65) scale(0.4)"> <use href="#sparkle" className="sparkle-anim delay-2" fill="#F59E0B" /> </g>
              <g transform="translate(5, 25) scale(0.3)"> <use href="#sparkle" className="sparkle-anim delay-3" fill="#FDE68A" /> </g>
          </g>
      </g>
      <g transform="translate(95, 60)">
          <text className="main-text" fontWeight="800" fontSize="34" fill="#1F2937" style={{whiteSpace: 'pre'}}>
            Школа <tspan className="pulse-heart" fill="#D97706" fontSize="22" dy="-2">♥</tspan> аутентичного <tspan className="pulse-triangle" fill="#9333EA" dy="-3" fontSize="18">▼</tspan><tspan dy="3" fill="#1F2937"> маркетинга</tspan>
          </text>
          <text className="sub-text" fontWeight="700" x="2" y="45" fontSize="22" letterSpacing="2" fill="#6D28D9">СУХАРЕВОЙ АНАСТАСИИ</text>
      </g>
    </svg>
  </div>
);

// --- CONFIG & DATA ---
// TARIFFS импортируются из ./config/tariffs.ts

const USER_DATA = { name: "Алексей Смирнов", avatar: "https://images.unsplash.com/photo-1629507208649-70919ca33793?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMG1hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc3MDE1MTg3N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", tariff: 'curator' as TariffKey };

const getLessonTypeConfig = (type: string) => {
  switch(type) {
    case 'video': return { icon: Video, label: 'Видео' };
    case 'audio': return { icon: Headphones, label: 'Аудио' };
    case 'test': return { icon: ClipboardList, label: 'Тест' };
    case 'text': return { icon: AlignLeft, label: 'Инструкция' };
    default: return { icon: FileText, label: 'Урок' };
  }
};

const MODULES = [
  { id: 0, title: "0. Предобучение", desc: "Настройка оптики предпринимателя.", 
    detailedDesc: `<h3>Глава 0. Настройка правильной оптики</h3>
    <p>Перед тем как начать строить бизнес-систему, важно настроить внутренние установки. Предпринимательское мышление — это не про «продать любой ценой», а про создание ценности.</p>
    <p>В этом модуле мы учимся смотреть на бизнес через призму возможностей, а не ограничений. Осознаём свою уникальность и готовимся к системному подходу.</p>
    <p>Это фундамент, на котором будет стоять всё остальное. Без правильной оптики невозможно построить устойчивую систему.</p>`,
    locked: false, progress: 100, icon: LearningIcon, image: "from-[#2E1065] to-[#5B21B6]", lessons: [
      { id: '0.1', title: 'Организационный урок', duration: '10 мин', type: 'video', completed: true, hasPendingTasks: false, tariff: 'standard' },
      { id: '0.2', title: 'Мышление предпринимателя', duration: '25 мин', type: 'audio', completed: true, hasPendingTasks: true, tariff: 'standard' },
      { id: '0.3', title: 'Проверка готовности', duration: '5 мин', type: 'test', completed: true, hasPendingTasks: false, tariff: 'standard' },
      { id: '0.4', title: 'Постановка целей', duration: '15 мин', type: 'text', completed: true, hasPendingTasks: false, tariff: 'standard' }
    ]},
  { id: 1, title: "1. Аутентичность", desc: "Распаковка уникальности.", 
    detailedDesc: `<h3>Глава 1. Аутентичность — твой главный актив</h3>
    <p>Есть убеждение, что для успеха нужно копировать «успешных». Подражать их стилю, методам, словам. На самом деле аутентичность не имеет с этим ничего общего.</p>
    <p>Аутентичность — это прекрасное явление, которое означает: я понимаю, кто я есть, и использую это как силу. Мой опыт уникален, моя история ценна, мои методы работают именно потому, что они мои.</p>
    <p>История из личного опыта: когда начинала путь в психологии, пыталась говорить «правильными» терминами, быть серьёзной и академичной. Но клиенты приходили именно тогда, когда начала быть собой — с юмором, историями, космическими метафорами. Это и есть аутентичность.</p>
    <p>Работать с собственной уникальностью — это самое приятное и прекрасное, что может быть в бизнесе. И если полюбить этот процесс, поймёте, что конкуренции не существует.</p>`,
    locked: false, progress: 20, icon: AuthenticityIcon, image: "from-[#4C1D95] via-[#6D28D9] to-[#7C3AED]", lessons: [
      { id: '1.1', title: 'Распаковка личности', duration: '45 мин', type: 'video', completed: true, hasPendingTasks: false, tariff: 'standard' },
      { id: '1.2', title: 'Архитектура продукта', duration: '30 мин', type: 'text', completed: true, hasPendingTasks: true, tariff: 'standard' },
      { id: '1.3', title: 'Ценообразование', duration: '20 мин', type: 'video', completed: false, hasPendingTasks: false, tariff: 'standard' },
      { id: '1.4', title: 'Разбор ДЗ куратором', duration: '60 мин', type: 'video', completed: false, hasPendingTasks: false, tariff: 'curator' },
      { id: '1.5', title: 'Групповой созвон: Вопросы', duration: '90 мин', type: 'video', completed: false, hasPendingTasks: false, tariff: 'curator' },
      { id: '1.6', title: 'VIP Стратегия: Личный бренд', duration: '45 мин', type: 'audio', completed: false, hasPendingTasks: false, tariff: 'mentor' },
      { id: '1.7', title: 'Секретные связки продаж', duration: '30 мин', type: 'text', completed: false, hasPendingTasks: false, tariff: 'mentor' }
    ]},
  { id: 2, title: "2. Своя ЦА", desc: "Глубинный анализ тех, с кем вы хотите работать.", 
    detailedDesc: `<h3>Глава 2. Своя ЦА — не все, а те самые</h3>
    <p>Часто думают, что чем шире охват, тем лучше. «Я работаю со всеми!» — звучит амбициозно, но работает плохо. На самом деле целевая аудитория — это не про «всех», а про «своих».</p>
    <p>Своя ЦА — это те люди, с которыми вам легко и приятно работать. Кто понимает вашу ценность. Кто готов платить за результат. С кем у вас общий язык и общие ценности.</p>
    <p>Когда вы чётко знаете свою аудиторию, маркетинг перестаёт быть мучением. Вы говорите с конкретными людьми, решаете их конкретные боли, и они с радостью идут к вам.</p>
    <p>В этом модуле мы научимся находить, изучать и понимать тех, кто станет вашими любимыми клиентами.</p>`,
    locked: false, progress: 0, icon: AudienceIcon, image: "from-[#5B21B6] to-[#3B82F6]", lessons: [
      { id: '2.1', title: 'Сегментация ЦА', duration: '20 мин', type: 'video', completed: false, hasPendingTasks: false, tariff: 'standard' },
      { id: '2.2', title: 'Проведение CustDev', duration: '40 мин', type: 'test', completed: false, hasPendingTasks: false, tariff: 'standard' },
      { id: '2.3', title: 'Мастермайнд: Разбор аватаров', duration: '60 мин', type: 'video', completed: false, hasPendingTasks: false, tariff: 'mentor' },
    ]},
  { id: 3, title: "3. Продукты и Метод", desc: "Визуальная упаковка.", 
    detailedDesc: `<h3>Глава 3. Продукт — это не то, что вы продаёте</h3>
    <p>Продукт — это трансформация, которую получает клиент. Не ваши часы работы, не количество уроков или встреч. А изменение, которое происходит в жизни человека после работы с вами.</p>
    <p>В этом модуле мы упаковываем ваш опыт и экспертизу в понятный, структурированный продукт. Создаём ме��од, который можно тиражировать. И делаем это так, чтобы клиенты сразу понимали ценность.</p>
    <p>Хороший продукт продаёт себя сам. Потому что он решает реальную проблему и делает это лучше, чем альтернативы.</p>`,
    locked: false, progress: 0, icon: ProductIcon, image: "from-[#701a75] to-[#c026d3]", lessons: [] },
  { id: 4, title: "4. Воронка продаж", desc: "Системное привлечение.", 
    detailedDesc: `<h3>Глава 4. Воронка — система, а не случайность</h3>
    <p>Многие надеются на «сарафанное радио» и случайные рекомендации. Но когда хочешь роста, нужна система. Воронка продаж — это именно она.</p>
    <p>Воронка — это путь, который проходит человек от момента «я о вас ничего не знаю» до «я хочу с вами работать и готов платить». И этот путь можно и нужно проектировать.</p>
    <p>В этом модуле учимся выстраивать маршрут клиента: как привлекать внимание, прогревать интерес, демонстрировать экспертность и подводить к решению о покупке. Без навязывания, экологично.</p>`,
    locked: false, progress: 0, icon: FunnelIcon, image: "from-[#4a044e] to-[#db2777]", lessons: [] },
  { id: 5, title: "5. Технология продаж", desc: "Экологичные продажи.", 
    detailedDesc: `<h3>Глава 5. Продажа — это не про «впарить»</h3>
    <p>Есть убеждение, что продажа — это что-то неприятное. Навязать ненужное тому, у кого это уже есть. Обмануть. Впарить. На самом деле продажа не имеет с этим ничего общего.</p>
    <p>Продажа — это прекрасное явление, которое означает: кому-то это очень важно, а у меня это есть. Кто-то хочет решить свою задачу, а я могу это сделать.</p>
    <p>История из личного опыта: в восемнадцать лет была работа продавцом в книжном магазине. Это до сих пор лучшая работа в мире. Заходит человек и говорит: «А у вас есть Гарри Поттер?» — «Да, есть!» Ведёшь его к стенду, показываешь коллекцию, спрашиваешь, кому выбирает. Сыну? Отлично! Хотите всю коллекцию? Человек говорит «да», пробиваешь покупку, получаешь деньги. Вот и вся работа.</p>
    <p>Заниматься продажами — это самое приятное и прекрасное, что может быть в жизни. И если полюбить этот процесс, будете разрываться между вайбкодингом и продажами, выбирая из любимого.</p>`,
    locked: false, progress: 0, icon: SalesIcon, image: "from-[#1e1b4b] to-[#4338ca]", lessons: [] },
  { id: 6, title: "6. Блог и Соцсети", desc: "Выход из операционки.", 
    detailedDesc: `<h3>Глава 6. Блог — ваш долгосрочный актив</h3>
    <p>Соцсети — это не про лайки и подписчиков. Это про создание пространства, где люди вас узнают, доверяют вам и хотят работать с вами.</p>
    <p>Ваш блог — это ваш личный медиа-канал. Место, где вы транслируете экспертность, делитесь ценностью, показываете результаты. И всё это работает на вас 24/7.</p>
    <p>В этом модуле разбираемся, как создавать контент, который привлекает нужных людей. Как выстроить контент-стратегию, чтобы не выгорать. И как делегировать рутину, оставаясь лицом бренда.</p>`,
    locked: false, progress: 0, icon: BlogIcon, image: "from-[#312e81] to-[#6366f1]", lessons: [] },
  { id: 7, title: "7. Команда", desc: "Стратегия роста х10.", 
    detailedDesc: `<h3>Глава 7. Команда — от сольника к оркестру</h3>
    <p>На старте вы делаете всё сами. Это нормально. Но если хотите масштабироваться, придётся научиться делегировать. Команда — это не роскошь, а необходимость для роста.</p>
    <p>Правильная команда умножает ваши результаты. Она освобождает вас от рутины, позволяет сфокусироваться на стратегии. Даёт возможность охватить больше клиентов без потери качества.</p>
    <p>В этом модуле учимся нанимать правильных людей, выстраивать процессы, делегировать задачи и управлять командой так, чтобы всем было хорошо.</p>`,
    locked: false, progress: 0, icon: TeamIcon, image: "from-[#0f172a] to-[#581c87]", lessons: [] },
  { id: 8, title: "Bonus: Секретный Модуль", desc: "Материалы и шаблоны.", 
    detailedDesc: `<h3>Бонус. Секретный арсенал для ускорения</h3>
    <p>Здесь собраны все шаблоны, чек-листы, скрипты и инструменты, которые помогут вам внедрять систему быстрее. Всё, что работает и проверено на практике.</p>
    <p>Используйте эти материалы как ускорители. Не нужно изобретать велосипед — берите готовое, адаптируйте под себя и внедряйте.</p>`,
    locked: false, progress: 0, icon: BonusIcon, image: "from-slate-900 to-[#2e1065]", lessons: [] },
];

const MOCK_LESSON_CONTENT = {
  title: "Урок 1.2: Архитектура продукта",
  videoUrl: "placeholder",
  text: `
    <div class="lesson-content">
      <h2>Дизайн и UI/UX</h2>
      <p>Тренды 2025-2026, работа с референсами и "полишинг".</p>
      
      <h3>Персоны и стили:</h3>
      <ul>
        <li>«Ты Джонни Айв, сделай интерфейс интуитивно понятным, в стиле Apple Human Interface: чистый фон, минимум цвета, акцент — действие.»</li>
        <li>«Ты — Заха Хадид, пройдись по всему моему проекту... сделай все более красивым.»</li>
        <li>«Создай сайт в трендовом дизайне 2025-2026.»</li>
      </ul>
      
      <h3>Работа с референсами:</h3>
      <ul>
        <li>«Сделай дизайн по этому референсу... (приложить картинку).»</li>
        <li>«Переработай мой дизайн в стиле этого сайта. Обрати особое внимание на [цветовую палитру / типографику / формы].»</li>
      </ul>
      
      <h3>Доработка (Полишинг):</h3>
      <ul>
        <li>«Ты — дизайнер №1... пройдись по всему моему проекту, по каждому элементу и странице, и сделай все более красивым, интуитивно понятным.»</li>
        <li>«Заполиши все элементы» (выравнивание отступов и цветов).</li>
        <li>«Проработай этот раздел так, как если бы работу принимал Тим Кук.»</li>
        <li>«Давай сделаем прикольную дофаминовую анимацию для этого раздела.»</li>
      </ul>

      <h2>Mobile First и Структура</h2>
      <p>Разработка приложений с упором на мобильные устройства.</p>
      
      <blockquote>
        <strong>Промпт:</strong><br>
        «Создай для меня прототип [тип приложения] с подходом mobile first. Целевая аудитория: [опишите]. Дизайн должен быть [опишите стиль]. Ключевые идеи для функционала: [Идея 1], [Идея 2]...»
      </blockquote>
    </div>
  `,
  resources: [ { type: "pdf", title: "Рабочая тетрадь: Распаковка", size: "2.4 MB" }, { type: "link", title: "Miro шаблон матрицы", url: "#" } ]
};

// checkAccess импортируется из ./config/tariffs.ts

const UpgradeModal = ({ tariffKey, onClose }: { tariffKey: string | null; onClose: () => void }) => {
  if (!tariffKey) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      <div className="bg-white rounded-[2.5rem] p-8 w-full max-w-md relative z-10 shadow-2xl animate-fade-in border border-white/50">
        <button onClick={onClose} className="absolute top-6 right-6 p-2 rounded-full bg-slate-50 text-slate-400 hover:bg-slate-100 transition-colors"> <X size={20} /> </button>
        <div className="text-center">
           <div className="w-20 h-20 mx-auto bg-gradient-to-br from-amber-100 to-amber-50 rounded-full flex items-center justify-center mb-6 shadow-inner"> <Crown size={40} className="text-amber-500 fill-amber-500/20" /> </div>
           <h3 className="text-2xl font-bold text-slate-800 mb-3">Доступ закрыт</h3>
           <p className="text-slate-500 mb-8 leading-relaxed">Этот урок содержит продвинутые техники и доступен только на тарифе <br/><span className="font-bold text-violet-600 bg-violet-50 px-2 py-0.5 rounded-lg">{getTariffLabel(tariffKey as TariffKey)}</span></p>
           <button className="w-full py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-bold rounded-2xl shadow-xl shadow-fuchsia-200 hover:shadow-2xl hover:-translate-y-1 transition-all">Улучшить тариф</button>
           <button onClick={onClose} className="mt-4 text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors">Понятно, вернусь позже</button>
        </div>
      </div>
    </div>
  );
};

const SystemPanorama = ({ onModuleSelect }: { onModuleSelect: (module: any) => void }) => (
  <div className="mb-16 p-10 bg-white/60 backdrop-blur-xl rounded-[2.5rem] border border-white/60 relative overflow-hidden shadow-sm">
     <div className="absolute inset-0 bg-gradient-to-r from-violet-50/50 via-white to-fuchsia-50/50 pointer-events-none"></div>
     <div className="relative z-10">
        <div className="flex justify-between items-end mb-12 px-2">
            <h3 className="text-xl font-bold text-slate-700 tracking-tight flex items-center"> <Map size={20} className="mr-3 text-violet-500" /> Панорама Системы </h3>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Твой Путь</span>
        </div>
        <div className="relative px-4">
            {/* Линия пути */}
            <div className="absolute left-6 right-6 top-[64px] h-1 bg-slate-200/60 rounded-full z-0"></div>
            <div className="absolute left-6 top-[64px] h-1 bg-gradient-to-r from-violet-600 via-fuchsia-500 to-transparent w-[20%] rounded-full z-0 shadow-[0_0_10px_rgba(167,139,250,0.5)]"></div>
            
            {/* Модули с номерами и названиями */}
            <div className="flex justify-between w-full relative z-10">
                {MODULES.map((m, idx) => {
                  const Icon = m.icon;
                  const isNotStarted = m.progress === 0;
                  const isActive = m.progress > 0 && m.progress < 100;
                  const isCompleted = m.progress === 100;
                  
                  // Выбор серой или цветной иконки
                  const GrayIcon = isNotStarted 
                    ? (m.id === 0 ? GrayLearningIcon 
                      : m.id === 1 ? GrayAuthenticityIcon
                      : m.id === 2 ? GrayAudienceIcon
                      : m.id === 3 ? GrayProductIcon
                      : m.id === 4 ? GrayFunnelIcon
                      : m.id === 5 ? GraySalesIcon
                      : m.id === 6 ? GrayBlogIcon
                      : m.id === 7 ? GrayTeamIcon
                      : GrayBonusIcon)
                    : null;
                  
                  return (
                  <div key={m.id} onClick={() => !m.locked && onModuleSelect(m)} className={`relative group flex flex-col items-center ${!m.locked ? 'cursor-pointer' : 'cursor-not-allowed'}`}>
                      {/* Иконка с космическими эффектами */}
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center border-4 border-white transition-all duration-500 relative ${
                        m.locked 
                          ? 'bg-slate-200 text-slate-400 scale-90 shadow-lg' 
                          : isNotStarted
                            ? 'bg-transparent text-slate-600 scale-100 hover:scale-110 shadow-lg'
                            : isCompleted
                              ? 'bg-transparent text-white scale-110 hover:scale-125 shadow-[0_0_25px_rgba(251,191,36,1),0_0_50px_rgba(251,191,36,0.7),0_0_75px_rgba(251,191,36,0.4)]'
                              : 'bg-transparent text-white scale-110 shadow-lg hover:scale-125'
                      } ${isActive ? 'ring-4 ring-violet-200' : ''} ${isCompleted ? 'ring-4 ring-amber-400/60' : ''}`}>
                          {m.locked ? (
                            <Unlock size={20} className="rotate-45 opacity-50" />
                          ) : (
                            <CosmicIconWrapper isCompleted={isCompleted} size="medium">
                              {isNotStarted && GrayIcon ? <GrayIcon size={48} /> : <Icon size={48} />}
                            </CosmicIconWrapper>
                          )}
                          {isActive && (<div className="absolute inset-0 bg-violet-400 rounded-full animate-ping opacity-30"></div>)}
                      </div>
                      
                      {/* Номер элемента */}
                      <div className={`mt-3 w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold transition-all duration-300 ${
                        m.locked 
                          ? 'bg-slate-100 text-slate-400' 
                          : isNotStarted
                            ? 'bg-slate-300 text-slate-600 group-hover:scale-110'
                            : 'bg-gradient-to-br ' + m.image + ' text-white shadow-md group-hover:scale-110'
                      }`}>
                        {m.id}
                      </div>
                      
                      {/* Название модуля */}
                      <div className={`mt-2 text-center transition-all duration-300 ${!m.locked ? 'group-hover:-translate-y-0.5' : ''}`}>
                        <div className={`text-[10px] font-bold uppercase tracking-wider leading-tight max-w-[80px] ${
                          m.locked 
                            ? 'text-slate-400' 
                            : isNotStarted
                              ? 'text-slate-500 group-hover:text-slate-700'
                              : 'text-slate-600 group-hover:text-[#2E1065]'
                        }`}>
                          {m.title.replace(/^\d+\.\s*/, '')}
                        </div>
                      </div>
                  </div>
                )})}
            </div>
        </div>
     </div>
  </div>
);

const ModuleCard = ({ module, onClick }: { module: any; onClick: (module: any) => void }) => {
  const Icon = module.icon;
  return (
  <div onClick={() => !module.locked && onClick(module)} className={`group relative overflow-hidden bg-white/60 backdrop-blur-xl p-8 transition-all duration-700 border border-white/60 ${module.locked ? 'cursor-not-allowed rounded-[2.5rem]' : 'cursor-pointer hover:shadow-[0_20px_50px_-12px_rgba(109,40,217,0.3)] hover:-translate-y-2 rounded-[2.5rem] hover:rounded-[2rem]'}`}>
    {module.locked && (
        <div className="absolute inset-0 z-20 backdrop-blur-[3px] bg-white/20 flex items-center justify-center">
            <div className="bg-white/80 backdrop-blur-md px-4 py-2 rounded-xl shadow-sm text-slate-500 text-xs font-bold uppercase tracking-widest">Скоро</div>
        </div>
    )}
    <div className={`absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br ${module.image} rounded-full blur-3xl opacity-10 transition-transform duration-1000 group-hover:scale-150 group-hover:opacity-20`}></div>
    <div className={`flex justify-between items-start mb-8 relative z-10 ${module.locked ? 'opacity-50 blur-[1px]' : ''}`}>
      <div className={`w-14 h-14 rounded-[1.2rem] flex items-center justify-center text-white shadow-xl shadow-indigo-500/20 bg-transparent transform group-hover:rotate-6 transition-all duration-500 text-lg font-bold`}>
        {module.locked ? (
          <Unlock size={28} className="rotate-45 opacity-70" />
        ) : (
          <CosmicIconWrapper isCompleted={module.progress === 100} size="small">
            <Icon size={40} />
          </CosmicIconWrapper>
        )}
      </div>
      {module.progress > 0 && (
        <div className="flex flex-col items-end">
          <span className="text-2xl font-bold text-slate-800">{module.progress}%</span>
          <span className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">Прогресс</span>
        </div>
      )}
    </div>
    <h3 className={`text-2xl font-bold text-slate-800 mb-3 leading-tight transition-all relative z-10 ${module.locked ? 'opacity-50 blur-[1px]' : 'group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#2E1065] group-hover:to-[#4C1D95]'}`}> {module.title} </h3>
    <p className={`text-sm text-slate-500 mb-8 font-medium leading-relaxed relative z-10 ${module.locked ? 'opacity-50 blur-[1px]' : 'opacity-80'}`}> {module.desc} </p>
    {!module.locked && (
      <div className="relative h-1.5 w-full bg-slate-100/50 rounded-full overflow-hidden">
        <div className={`absolute h-full bg-gradient-to-r ${module.image} shadow-[0_0_15px_rgba(139,92,246,0.6)]`} style={{ width: `${module.progress}%` }}></div>
      </div>
    )}
  </div>
)};

const ModuleDetailView = ({ module, onLessonSelect, onBack }: { module: any; onLessonSelect: (lesson: any, module: any) => void; onBack: () => void }) => (
  <div className="animate-fade-in max-w-5xl mx-auto pb-20 pt-6">
    {module.detailedDesc && (
      <div className="mb-10 bg-white/60 backdrop-blur-xl rounded-[2.5rem] p-12 border border-white/60 shadow-sm relative overflow-hidden">
        <div className={`absolute top-0 left-0 w-96 h-96 bg-gradient-to-br ${module.image} opacity-5 rounded-full blur-3xl -ml-20 -mt-20`}></div>
        <div className="relative z-10 module-description" dangerouslySetInnerHTML={{ __html: module.detailedDesc }} />
      </div>
    )}
    <div className="bg-white/60 backdrop-blur-xl rounded-[2.5rem] p-10 mb-12 border border-white/60 shadow-sm relative overflow-hidden">
       <div className={`absolute top-0 right-0 w-96 h-96 bg-gradient-to-br ${module.image} opacity-10 rounded-full blur-3xl -mr-20 -mt-20`}></div>
       <div className="relative z-10 flex items-center justify-between">
          <div>
            <div className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">Прогресс модуля</div>
            <div className="text-4xl font-bold text-slate-800">{module.progress}%</div>
          </div>
          <div className="w-1/2">
             <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden">
                <div className={`h-full bg-gradient-to-r ${module.image}`} style={{ width: `${module.progress}%` }}></div>
             </div>
             <div className="flex justify-between mt-2 text-xs font-medium text-slate-400"> <span>0%</span> <span>100%</span> </div>
          </div>
       </div>
    </div>
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
        <div className="w-2 h-2 bg-[#2E1065] rounded-full mr-3 animate-pulse shadow-[0_0_15px_rgba(46,16,101,0.5)]"></div>
        Уроки модуля
      </h2>
    </div>
    <div className="space-y-4">
       {module.lessons.map((lesson: any, idx: number) => {
         const isAccessible = checkAccess(USER_DATA.tariff, lesson.tariff);
         const typeConfig = getLessonTypeConfig(lesson.type);
         const TypeIcon = typeConfig.icon;
         let statusIcon, statusClass;
         if (!isAccessible) { statusIcon = null; statusClass = ""; } 
         else if (lesson.completed) {
             if (lesson.hasPendingTasks) { statusIcon = <AlertCircle size={20} strokeWidth={2.5} />; statusClass = "bg-orange-100 text-orange-500 shadow-sm"; } 
             else { statusIcon = <Check size={20} strokeWidth={3} />; statusClass = "bg-emerald-100 text-emerald-600 shadow-sm"; }
         } else { statusIcon = <Circle size={20} strokeWidth={2} />; statusClass = "bg-white border-2 border-slate-100 text-slate-300 group-hover:border-violet-200 group-hover:text-violet-500"; }
         return (
           <div key={lesson.id} onClick={() => onLessonSelect(lesson, module)} className={`group flex items-center justify-between p-5 rounded-[2rem] border transition-all duration-500 relative overflow-hidden ${isAccessible ? 'bg-white/80 border-white/50 hover:bg-white hover:shadow-lg hover:shadow-violet-100/50 hover:-translate-y-1 cursor-pointer' : 'bg-white/30 border-white/20 cursor-pointer hover:bg-white/40'}`}>
              {!isAccessible && (
                <div className="absolute inset-0 backdrop-blur-[2px] bg-white/10 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                   <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl shadow-lg flex items-center space-x-2"> <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Доступно в тарифе</span> {lesson.tariff === 'mentor' && <Crown size={14} className="text-amber-500" />} {lesson.tariff === 'curator' && <Users size={14} className="text-indigo-500" />} </div>
                </div>
              )}
              <div className={`flex items-center flex-1 relative z-10 ${!isAccessible ? 'opacity-50 blur-[0.5px] group-hover:blur-sm transition-all duration-500' : ''}`}>
                 {isAccessible && (<div className={`w-12 h-12 rounded-2xl flex items-center justify-center mr-6 shrink-0 transition-colors ${statusClass}`}>{statusIcon}</div>)}
                 {!isAccessible && <div className="w-12 h-12 mr-6 shrink-0"></div>}
                 <div className="flex-1">
                    <div className="flex items-center mb-1">
                       <span className={`text-lg font-bold mr-3 text-slate-800`}>{lesson.title}</span>
                       {lesson.tariff === 'mentor' && (<span className="bg-amber-100 text-amber-700 text-[10px] font-bold px-2 py-0.5 rounded-lg flex items-center"><Crown size={10} className="mr-1" /> Наставник</span>)}
                       {lesson.tariff === 'curator' && (<span className="bg-indigo-100 text-indigo-700 text-[10px] font-bold px-2 py-0.5 rounded-lg flex items-center"><Users size={10} className="mr-1" /> Группа</span>)}
                    </div>
                    <div className="flex items-center text-sm text-slate-400 font-medium space-x-4 flex-wrap gap-y-2">
                       <span className={`flex items-center px-2 py-0.5 rounded-md text-xs border bg-slate-50 border-slate-200 text-slate-500`}> <TypeIcon size={12} className="mr-1.5" /> {typeConfig.label} </span>
                       <span className="flex items-center"> <Clock size={14} className="mr-1.5" /> {lesson.duration} </span>
                       {lesson.hasPendingTasks && lesson.completed && isAccessible && (<span className="flex items-center text-orange-500 bg-orange-50 px-2 py-0.5 rounded-md text-xs"><AlertCircle size={12} className="mr-1.5" />Есть задания</span>)}
                       {!lesson.hasPendingTasks && lesson.completed && (<span className="text-emerald-500 text-xs">Выполнено</span>)}
                       {!lesson.completed && isAccessible && (<span className="text-slate-400 text-xs font-bold bg-slate-100 px-2 py-0.5 rounded-md group-hover:bg-violet-100 group-hover:text-violet-600 transition-colors">Начать</span>)}
                    </div>
                 </div>
              </div>
              {isAccessible && (<div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all bg-slate-50 text-slate-300 group-hover:bg-violet-100 group-hover:text-violet-600`}> <ChevronRight size={20} /> </div>)}
           </div>
         );
       })}
    </div>
  </div>
);

const LessonPlayer = ({ lesson, module, onBack, onModuleClick }: { lesson: any; module?: any; onBack: () => void; onModuleClick?: (module: any) => void }) => {
  const [checklist, setChecklist] = useState([
    { id: 1, text: "Прописать 3 ключевых смысла продукта", completed: false },
    { id: 2, text: "Определить флагманский продукт в линейке", completed: false },
    { id: 3, text: "Составить черновик продуктовой матрицы", completed: false }
  ]);
  const toggleCheck = (id: number) => {
    setChecklist(prev => prev.map(item => item.id === id ? { ...item, completed: !item.completed } : item));
  };
  const typeConfig = getLessonTypeConfig(lesson.type);
  return (
    <div className="animate-fade-in max-w-5xl mx-auto pb-20 pt-6">
      {/* Информация о длительности урока */}
      <div className="flex items-center justify-between mb-6 mt-4 p-4 bg-white/60 backdrop-blur-xl rounded-2xl border border-white/60 shadow-sm">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-gradient-to-br from-violet-100 to-fuchsia-100 rounded-xl flex items-center justify-center">
            <Clock size={20} className="text-violet-600" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Время изучения</div>
            <div className="text-lg font-bold text-slate-800">{lesson.duration}</div>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <div className="flex items-center px-3 py-1.5 rounded-lg bg-slate-50">
            {React.createElement(typeConfig.icon, { size: 14, className: "mr-1.5 text-slate-500" })}
            <span className="text-slate-600 font-medium">{typeConfig.label}</span>
          </div>
        </div>
      </div>
      
      <div className="space-y-12"> 
        {lesson.type === 'video' && (
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            <div className="aspect-video bg-slate-900 rounded-[2.5rem] shadow-2xl shadow-indigo-900/20 relative overflow-hidden z-10">
              <iframe 
                className="w-full h-full rounded-[2.5rem]"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0&modestbranding=1"
                title="Lesson Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}
        {lesson.type === 'audio' && (
          <div className="bg-white rounded-[2.5rem] p-10 shadow-lg border border-slate-100 flex items-center space-x-8"> 
             <div className="w-16 h-16 bg-violet-100 rounded-full flex items-center justify-center text-violet-600"> <Headphones size={32} /> </div>
             <div className="flex-1">
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden mb-2"> <div className="h-full w-1/3 bg-violet-500 rounded-full"></div> </div>
                <div className="flex justify-between text-xs text-slate-400 font-bold uppercase tracking-widest"> <span>05:00</span> <span>{lesson.duration}</span> </div>
             </div>
             <button className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center text-white hover:scale-105 transition-transform"> <PlayCircle size={24} /> </button>
          </div>
        )}
        <div className="bg-white/80 backdrop-blur-2xl rounded-[2.5rem] p-14 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-white/60 relative overflow-hidden mt-6"> 
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-fuchsia-100/40 rounded-full blur-[100px] -mr-40 -mt-40 pointer-events-none"></div>
          <div className="mb-14 relative z-10"> 
            <h3 className="font-bold text-slate-800 mb-8 px-1 text-xs uppercase tracking-widest flex items-center opacity-70"> <div className="w-1.5 h-1.5 bg-violet-500 rounded-full mr-3 shadow-[0_0_5px_rgba(139,92,246,0.8)]"></div> Материалы к уроку </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> 
              {MOCK_LESSON_CONTENT.resources.map((res, idx) => (
                <a key={idx} href={res.url} className="flex items-center p-5 rounded-[1.8rem] bg-white/40 border border-white/50 hover:bg-white transition-all duration-300 cursor-pointer group hover:shadow-lg hover:shadow-indigo-100/50 hover:-translate-y-1">
                  <div className="w-12 h-12 bg-[#f5f3ff] text-indigo-400 rounded-2xl flex items-center justify-center mr-4 group-hover:bg-gradient-to-br group-hover:from-violet-600 group-hover:to-fuchsia-600 group-hover:text-white transition-all"> {res.type === 'pdf' ? <FileText size={20} /> : <LinkIcon size={20} />} </div>
                  <div> <div className="text-sm font-bold text-slate-700 group-hover:text-violet-700 transition-colors">{res.title}</div> {res.size && <div className="text-xs text-slate-400 font-medium mt-1">{res.size}</div>} </div>
                </a>
              ))}
            </div>
          </div>
          <div className="relative z-10 mb-12" dangerouslySetInnerHTML={{ __html: MOCK_LESSON_CONTENT.text }} />
          <div className="bg-gradient-to-br from-[#fdf4ff] to-[#f5f3ff] p-12 rounded-[2.5rem] border border-white shadow-inner relative"> 
            <h3 className="font-bold text-slate-800 mb-6 flex items-center text-lg"> <div className="w-2 h-2 bg-[#2E1065] rounded-full mr-3 animate-pulse shadow-[0_0_15px_rgba(46,16,101,0.5)]"></div> Чек-лист внедрения </h3>
            <p className="text-slate-600/80 mb-8 leading-relaxed"> Выполните эти шаги, чтобы закрепить материал урока и начать внедрение системы. </p>
            <div className="space-y-3 relative z-10"> 
              {checklist.map(item => (
                <button key={item.id} onClick={() => toggleCheck(item.id)} className={`w-full flex items-start p-5 rounded-2xl transition-all duration-500 text-left group ${item.completed ? 'bg-white/60 backdrop-blur-sm border border-[#2E1065]/30' : 'bg-white/40 backdrop-blur-sm border border-slate-200 hover:border-[#2E1065]/40 hover:-translate-y-0.5'}`}>
                  <div className={`mt-0.5 w-6 h-6 rounded-md border-2 flex items-center justify-center mr-4 transition-all duration-500 shrink-0 ${item.completed ? 'bg-gradient-to-br from-[#2E1065] to-[#4C1D95] border-[#2E1065] text-white' : 'border-[#2E1065]/60 bg-white'}`}> {item.completed && <Check size={14} strokeWidth={3} />} </div>
                  <span className={`text-base transition-colors duration-500 leading-relaxed ${item.completed ? 'text-slate-400 line-through decoration-slate-300' : 'text-slate-700 group-hover:text-[#2E1065]'}`}> {item.text} </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function AppContent() {
  const [collapsed, setCollapsed] = useState(false);
  const [activeModule, setActiveModule] = useState<any>(null); 
  const [activeLesson, setActiveLesson] = useState<any>(null);
  const [activeLessonModule, setActiveLessonModule] = useState<any>(null);
  const [expandedModuleId, setExpandedModuleId] = useState<number | null>(null);
  const [upgradeModalData, setUpgradeModalData] = useState<{ tariff: string } | null>(null);
  const [isAdminMode, setIsAdminMode] = useState(false);

  const handleLessonClick = (lesson: any, module?: any) => {
    if (!checkAccess(USER_DATA.tariff, lesson.tariff)) { setUpgradeModalData({ tariff: lesson.tariff }); return; }
    setActiveLesson(lesson);
    setActiveLessonModule(module || null);
  };
  const handleModuleClick = (module: any) => { setActiveModule(module); setExpandedModuleId(module.id); setActiveLesson(null); };
  const toggleModule = (id: number) => { if (expandedModuleId === id) setExpandedModuleId(null); else setExpandedModuleId(id); };
  const goHome = () => { setActiveLesson(null); setActiveModule(null); setActiveLessonModule(null); setExpandedModuleId(null); };

  const renderContent = () => {
    if (activeLesson) { return <LessonPlayer lesson={{ ...MOCK_LESSON_CONTENT, ...activeLesson }} module={activeLessonModule} onBack={() => { setActiveLesson(null); setActiveLessonModule(null); }} onModuleClick={handleModuleClick} />; } 
    if (activeModule) { return <ModuleDetailView module={activeModule} onLessonSelect={handleLessonClick} onBack={goHome} />; }
    return (
      <div className="animate-fade-in max-w-[1600px] mx-auto pt-6">
          <div className="mb-16">
            <p className="text-slate-500 max-w-2xl text-xl font-light leading-relaxed mb-8">Стройте последовательно. Каждый модуль — это несущая конструкция вашего будущего.</p>
            <SystemPanorama onModuleSelect={handleModuleClick} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 pb-20">
            {MODULES.map(m => ( <ModuleCard key={m.id} module={m} onClick={handleModuleClick} /> ))}
          </div>
      </div>
    );
  };

  // Render admin dashboard if in admin mode
  // Admin dashboard is wrapped with AuthProvider for authentication context
  if (isAdminMode) {
    return (
      <AuthProvider>
        <AdminDashboard onExit={() => setIsAdminMode(false)} />
      </AuthProvider>
    );
  }

  // Regular user interface
  return (
    <div className="flex h-screen bg-[#F3F4F7] font-sans selection:bg-fuchsia-200 overflow-hidden flex-col">
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; margin-block: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #e2e8f0; border-radius: 20px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background-color: #94a3b8; }
        .custom-scrollbar { scrollbar-width: thin; scrollbar-color: #e2e8f0 transparent; }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
      <UpgradeModal tariffKey={upgradeModalData?.tariff || null} onClose={() => setUpgradeModalData(null)} />
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] right-[-10%] w-[90vw] h-[90vw] bg-gradient-to-br from-violet-200/40 to-fuchsia-100/40 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-[70vw] h-[70vw] bg-gradient-to-tr from-blue-100/40 to-indigo-200/30 rounded-full blur-[120px]"></div>
        <div className="absolute top-[20%] left-[20%] w-[40vw] h-[40vw] bg-white/40 rounded-full blur-[100px] opacity-60"></div>
      </div>
      <div className="flex-1 flex min-h-0 relative">
        <aside className={`relative z-30 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] flex flex-col mb-4 ml-4 mt-4 bg-white/60 backdrop-blur-2xl border border-white/60 shadow-[0_8px_40px_rgba(0,0,0,0.04)] ${collapsed ? 'w-28 rounded-[2.5rem]' : 'w-80 rounded-[2.5rem]'}`}>
          <button onClick={() => setCollapsed(!collapsed)} className="absolute -right-3 top-9 z-50 w-6 h-6 bg-white rounded-full shadow-sm border border-slate-100 flex items-center justify-center text-slate-400 hover:text-violet-600 transition-colors hover:scale-110"> {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />} </button>
          <div className={`px-5 pt-6 pb-2 shrink-0 ${collapsed ? 'flex flex-col items-center' : ''}`}>
             <div onClick={goHome} className={`w-full flex items-center py-2.5 px-4 transition-all duration-300 text-left group cursor-pointer rounded-2xl text-slate-600 hover:text-[#2E1065] hover:-translate-y-0.5 ${collapsed ? 'justify-center px-0' : ''}`}>
                 <div className={`w-14 h-14 rounded-[1.5rem] shrink-0 flex items-center justify-center transition-all duration-700 text-slate-700 group-hover:text-violet-600 ${collapsed ? 'w-10 h-10 rounded-[1rem]' : ''}`}> <LayoutGrid size={collapsed ? 20 : 24} /> </div>
                 {!collapsed && ( <div className="flex-1 overflow-hidden ml-4 font-bold"> <span className="block text-sm font-bold truncate transition-colors text-slate-800 group-hover:text-[#2E1065]">Карта Системы</span> <span className="text-[10px] font-medium uppercase tracking-wider text-slate-400 group-hover:text-violet-400">Главная</span> </div> )}
              </div>
              <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent opacity-50 mt-4 mb-2"></div>
          </div>
          <div className="flex-1 overflow-y-auto px-5 py-2 custom-scrollbar space-y-4 min-h-0">
            {!collapsed ? (
              <div className="space-y-4 pb-4">
                {MODULES.map(module => {
                  const Icon = module.icon;
                  return (
                  <div key={module.id} className={`rounded-[2rem] transition-all duration-500`}>
                    <button onClick={() => !module.locked && toggleModule(module.id)} disabled={module.locked} className={`w-full flex items-center py-2.5 px-3 transition-all duration-300 text-left group ${
                      module.locked 
                        ? 'opacity-40 cursor-not-allowed' 
                        : 'cursor-pointer rounded-2xl hover:bg-white/30'
                    }`}>
                      <div className={`w-10 h-10 rounded-[1rem] shrink-0 flex items-center justify-center mr-3.5 transition-all duration-700 relative ${
                        expandedModuleId === module.id 
                          ? 'scale-110' 
                          : 'text-slate-700 group-hover:text-violet-600'
                      }`}> 
                        {/* Микро-блестки ТОЛЬКО у активного раскрытого модуля */}
                        {!module.locked && expandedModuleId === module.id && [...Array(30)].map((_, i) => {
                          const angle = (i * 12 * Math.PI) / 180;
                          const distance = 14 + Math.random() * 6;
                          const x = Math.cos(angle) * distance;
                          const y = Math.sin(angle) * distance;
                          const colors = ['#ec4899', '#f472b6', '#f9a8d4', '#a855f7', '#c084fc'];
                          const color = colors[i % colors.length];
                          
                          return (
                            <motion.div
                              key={`dust${i}`}
                              className="absolute rounded-full"
                              style={{
                                left: `calc(50% + ${x}px)`,
                                top: `calc(50% + ${y}px)`,
                                width: '1.2px',
                                height: '1.2px',
                                background: color,
                                boxShadow: `0 0 4px ${color}`,
                              }}
                              animate={{
                                opacity: [0, 0.9, 0],
                                scale: [0, 1.5, 0],
                              }}
                              transition={{
                                duration: 2.5 + Math.random() * 1.5,
                                repeat: Infinity,
                                delay: i * 0.08,
                              }}
                            />
                          );
                        })}
                        
                        {/* Мерцающее свечение ТОЛЬКО у активного раскрытого модуля */}
                        {!module.locked && expandedModuleId === module.id && (
                          <motion.div
                            className="absolute w-7 h-7 rounded-full"
                            style={{
                              left: '50%',
                              top: '50%',
                              transform: 'translate(-50%, -50%)',
                              background: 'radial-gradient(circle, rgba(236, 72, 153, 0.15) 0%, rgba(236, 72, 153, 0) 70%)',
                              zIndex: -1,
                            }}
                            animate={{
                              scale: [1, 1.4, 1],
                              opacity: [0.3, 0.6, 0.3],
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                            }}
                          />
                        )}
                        
                        {/* Облачко ТОЛЬКО у активного раскрытого модуля */}
                        {expandedModuleId === module.id && (
                          <>
                            {/* Облачко под иконкой */}
                            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-12 bg-gradient-to-br from-pink-200/90 via-violet-200/90 to-fuchsia-200/90 rounded-[2rem] blur-xl animate-pulse z-[-1]"></div>
                            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-14 bg-gradient-to-br from-amber-200/50 via-yellow-200/50 to-amber-300/50 rounded-[2.5rem] blur-2xl z-[-2]"></div>
                          </>
                        )}
                        
                        {/* Floating анимация ТОЛЬКО у активного раскрытого модуля */}
                        <motion.div
                          className="relative z-10"
                          animate={!module.locked && expandedModuleId === module.id ? {
                            y: [0, -3, 0],
                            rotate: [-1, 1, -1],
                          } : {}}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }}
                        >
                          {module.locked ? <Unlock size={18} className="rotate-45 opacity-70" /> : <Icon size={40} />}
                        </motion.div>
                      </div>
                      <div className="flex-1 overflow-hidden"> <span className={`block text-base font-bold truncate transition-colors ${expandedModuleId === module.id ? 'text-[#2E1065]' : 'text-slate-700 group-hover:text-[#2E1065]'}`}>{module.title}</span> </div>
                      {!module.locked && (<div className={`text-slate-300 transition-transform duration-500 ${expandedModuleId === module.id ? 'rotate-180 text-violet-500' : 'group-hover:text-slate-400'}`}> <ChevronDown size={18} /> </div>)}
                    </button>
                    <div className={`overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${expandedModuleId === module.id ? 'max-h-[600px] opacity-100 pt-3 pb-2' : 'max-h-0 opacity-0'}`}>
                      <div className="pl-8 border-l-2 border-slate-100 ml-[35px] pr-2 space-y-2 relative">
                        {module.lessons && module.lessons.length > 0 ? (
                          module.lessons.map((lesson: any) => {
                            const isAccessible = checkAccess(USER_DATA.tariff, lesson.tariff);
                            return (
                              <button key={lesson.id} onClick={() => handleLessonClick(lesson, module)} className={`w-full flex items-center py-2 text-sm transition-all text-left relative z-10 ${!isAccessible ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:text-[#2E1065]/70'} ${activeLesson?.id === lesson.id ? 'text-[#2E1065]' : 'text-slate-500'}`}>
                                <div className={`-ml-[41px] w-4 h-4 rounded-sm flex items-center justify-center mr-3 shrink-0 transition-all ${lesson.completed ? 'bg-emerald-500 border-emerald-500' : 'bg-white border-2 border-slate-200'}`}> 
                                  {lesson.completed && (
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                  )}
                                </div>
                                <span className="truncate flex-1">{lesson.title}</span>
                              </button>
                            );
                          })
                        ) : ( <div className="pl-6 p-3 text-[10px] text-slate-300 uppercase tracking-wider">Скоро</div> )}
                      </div>
                    </div>
                  </div>
                )})}
              </div>
            ) : (
              <div className="flex flex-col items-center space-y-6 pt-2">
                {MODULES.map(module => {
                  const Icon = module.icon;
                  return (
                  <button key={module.id} onClick={() => { setCollapsed(false); if (!module.locked) toggleModule(module.id); }} className={`w-10 h-10 rounded-[1rem] flex items-center justify-center text-white shadow-lg transition-all duration-500 hover:scale-110 hover:shadow-xl hover:rotate-3 ${module.locked ? 'bg-slate-100 text-slate-400 shadow-none' : 'bg-white border border-slate-200 text-slate-500 shadow-sm hover:border-violet-400 hover:text-violet-600 hover:shadow-md hover:shadow-violet-200'} ${activeLesson?.moduleId === module.id ? 'border-violet-400 text-violet-700 shadow-md shadow-violet-200' : ''}`}> {module.locked ? <Unlock size={16} className="rotate-45 opacity-50" /> : <Icon size={32} />} </button>
                )})}
              </div>
            )}
          </div>
          <div className="p-6 shrink-0 space-y-3">
            {/* Admin Mode Toggle Button (Only for Admins) */}
            <motion.button
              onClick={() => setIsAdminMode(!isAdminMode)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all ${
                isAdminMode
                  ? 'bg-gradient-to-r from-violet-500 to-purple-500 text-white shadow-lg'
                  : 'bg-white/40 hover:bg-white/60 text-slate-700'
              } ${collapsed ? 'justify-center' : ''}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              title="Админ-панель"
            >
              <Shield size={20} />
              {!collapsed && <span className="text-sm">{isAdminMode ? 'Выйти из админки' : 'Админ-панель'}</span>}
            </motion.button>
            
            <div className={`flex items-center p-2 rounded-[2rem] bg-white/40 backdrop-blur-md border border-white/40 shadow-sm ${collapsed ? 'justify-center w-14 h-14 p-0 mx-auto' : ''}`}>
              <img src={USER_DATA.avatar} className="w-10 h-10 rounded-full bg-indigo-100 object-cover border-2 border-white" alt="User" />
              {!collapsed && ( <div className="ml-3 overflow-hidden"> <div className="text-sm font-bold text-slate-800 truncate">{USER_DATA.name}</div> <div className="text-[10px] font-bold text-violet-600 uppercase tracking-wider">Архитектор</div> </div> )}
            </div>
          </div>
        </aside>
        <main className="flex-1 overflow-hidden flex flex-col relative z-20">
          <header className="h-24 px-12 flex items-center justify-between shrink-0 z-30 pt-4">
            <div className="flex flex-col justify-center">
              <h1 className="text-3xl md:text-4xl font-bold text-slate-800 tracking-tight line-clamp-1"> {activeLesson ? activeLesson.title : (activeModule ? activeModule.title : 'Твоя Бизнес-Система')} </h1>
              <div className="h-[3px] w-24 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full mt-2 mb-1 shadow-sm"></div>
              {activeLesson && activeModule ? (
                <nav className="flex items-center space-x-2 mt-1 text-sm">
                  <button onClick={() => setActiveLesson(null)} className="text-slate-400 hover:text-violet-700 transition-colors font-medium">
                    Все модули
                  </button>
                  <ChevronLeft size={14} className="text-slate-300 rotate-180" />
                  <button onClick={() => { setActiveLesson(null); setActiveModule(activeModule); }} className="text-slate-400 hover:text-violet-700 transition-colors font-medium">
                    {activeModule.title}
                  </button>
                  <ChevronLeft size={14} className="text-slate-300 rotate-180" />
                  <span className="text-slate-600 font-semibold">{activeLesson.title}</span>
                  <span className="mx-2 text-slate-300">•</span>
                  <button onClick={() => setActiveLesson(null)} className="group flex items-center text-xs font-bold tracking-widest text-slate-400 hover:text-violet-700 transition-all">
                    <ChevronLeft size={14} className="mr-1 group-hover:-translate-x-0.5 transition-transform" />
                    Назад
                  </button>
                </nav>
              ) : activeModule ? (
                <nav className="flex items-center space-x-2 mt-1 text-sm">
                  <button onClick={() => setActiveModule(null)} className="text-slate-400 hover:text-violet-700 transition-colors font-medium">
                    Все модули
                  </button>
                  <ChevronLeft size={14} className="text-slate-300 rotate-180" />
                  <span className="text-slate-600 font-semibold">{activeModule.title}</span>
                  <span className="mx-2 text-slate-300">•</span>
                  <button onClick={() => setActiveModule(null)} className="group flex items-center text-sm font-medium text-slate-400 hover:text-violet-700 transition-colors">
                    <ChevronLeft size={14} className="mr-1 group-hover:-translate-x-0.5 transition-transform" />
                    Назад
                  </button>
                </nav>
              ) : (
                <div className="flex items-center text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
                  <span>Карта обучения</span>
                </div>
              )}
            </div>
            <div className="hidden md:flex items-center">
              <div className="text-right mr-8"> <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Прогресс системы</span> <span className="text-2xl font-bold text-slate-800">35%</span> </div>
              <div className="relative w-16 h-16 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90"> <circle cx="32" cy="32" r="28" stroke="#e2e8f0" strokeWidth="2" fill="transparent" /> <circle cx="32" cy="32" r="28" stroke="url(#gradient)" strokeWidth="4" fill="transparent" strokeDasharray="175" strokeDashoffset="110" strokeLinecap="round" /> <defs> <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%"> <stop offset="0%" stopColor="#7c3aed" /> <stop offset="100%" stopColor="#db2777" /> </linearGradient> </defs> </svg> <Star size={16} className="absolute text-violet-500 fill-violet-500" />
              </div>
            </div>
          </header>
          <div className="flex-1 overflow-y-auto px-6 md:px-12 pb-0 scroll-smooth custom-scrollbar"> 
            {renderContent()} 
            <Footer />
          </div>
        </main>
      </div>
    </div>
  );
}

// Export AppContent for use within RouterProvider (e.g., HomePage)
export { AppContent };

// Wrapper with AuthProvider and BrowserRouter for cases where App is rendered outside RouterProvider (preview mode)
export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}