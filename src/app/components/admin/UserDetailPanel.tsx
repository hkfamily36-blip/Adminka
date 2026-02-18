import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  MessageCircle,
  LogIn,
  Key,
  Calendar,
  Ban,
  Users,
  Trash2,
  ChevronDown,
  ChevronRight,
  Mail,
  CreditCard,
  Clock,
  Activity,
  FileText,
  DollarSign,
  CheckCircle,
  XCircle,
  UserCog,
  Briefcase,
  Edit2,
  Save,
  BookOpen,
  Lock,
  Unlock,
  Search,
  Eye,
  Send,
  AlertCircle
} from 'lucide-react';
import { getTariffLabel } from '../../config/tariffs';
import type { TariffKey } from '../../config/tariffs';
import { ChatWindow } from './ChatWindow';
import { USER_ACTIVITIES } from '../../data/mockActivityData';
import { toast } from 'sonner';
import { EmailComposerModal, type EmailLogEntry } from './EmailComposerModal';

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'user' | 'manager' | 'super_admin';
  tariff: TariffKey;
  status: 'active' | 'blocked';
  registeredAt: string;
  lastLogin: string;
  revenue: number;
  completedLessons: number;
  phone?: string;
  city?: string;
  accessUntil?: string;
  manager?: string;
  profession?: string;
  telegramNick?: string;
}

interface UserDetailPanelProps {
  user: User | null;
  onClose: () => void;
  onUpdate?: (userId: string, updatedData: Partial<User>) => void;
  onDelete?: (userId: string) => void;
}

export function UserDetailPanel({ user, onClose, onUpdate, onDelete }: UserDetailPanelProps) {
  const [showActionsMenu, setShowActionsMenu] = useState(false);
  const [showSubscriptions, setShowSubscriptions] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showEmailComposer, setShowEmailComposer] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [emailLogs, setEmailLogs] = useState<EmailLogEntry[]>([]);
  const [isManager, setIsManager] = useState(user?.role === 'manager');
  const [activityTab, setActivityTab] = useState<'log' | 'checklist'>('log');

  // Состояния для редактируемых полей
  const [firstName, setFirstName] = useState(user?.name.split(' ')[0] || '');
  const [lastName, setLastName] = useState(user?.name.split(' ')[1] || '');
  const [email, setEmail] = useState(user?.email || '');
  const [profession, setProfession] = useState(user?.profession || '');
  const [telegramNick, setTelegramNick] = useState(user?.telegramNick || '');
  const [accessUntil, setAccessUntil] = useState(user?.accessUntil || '');
  const [tariff, setTariff] = useState<TariffKey>(user?.tariff || 'standard');
  const [accessType, setAccessType] = useState<'full' | 'lessons'>('full');
  const [selectedLessons, setSelectedLessons] = useState<string[]>([]);
  const [expandedModules, setExpandedModules] = useState<string[]>([]);
  
  // Поисковый запрос
  const [lessonsSearchQuery, setLessonsSearchQuery] = useState('');

  // Иерархическая структура модулей с уроками
  // Каждый урок имеет минимальный тариф доступа
  const modulesData = [
    {
      id: 'module-1',
      title: 'Модуль 1: Основы маркетинга',
      lessons: [
        { id: 'lesson-1-1', title: 'Урок 1.1: Введение в маркетинг', minTariff: 'standard' },
        { id: 'lesson-1-2', title: 'Урок 1.2: Целевая аудитория', minTariff: 'standard' },
        { id: 'lesson-1-3', title: 'Урок 1.3: Позиционирование', minTariff: 'standard' },
        { id: 'lesson-1-4', title: 'Урок 1.4: Практикум с куратором', minTariff: 'curator' },
        { id: 'lesson-1-5', title: 'Урок 1.5: Разбор вашего кейса', minTariff: 'curator' },
        { id: 'lesson-1-6', title: 'Урок 1.6: Индивидуальная стратегия', minTariff: 'mentor' },
        { id: 'lesson-1-7', title: 'Урок 1.7: Личный разбор с наставником', minTariff: 'mentor' },
        { id: 'lesson-1-8', title: 'Урок 1.8: План масштабирования', minTariff: 'mentor' },
      ],
    },
    {
      id: 'module-2',
      title: 'Модуль 2: AI-агенты в практике',
      lessons: [
        { id: 'lesson-2-1', title: 'Урок 2.1: Что такое AI-агенты', minTariff: 'standard' },
        { id: 'lesson-2-2', title: 'Урок 2.2: Практическое применение', minTariff: 'standard' },
        { id: 'lesson-2-3', title: 'Урок 2.3: Кейсы использования', minTariff: 'standard' },
        { id: 'lesson-2-4', title: 'Урок 2.4: Настройка AI для вашего бизнеса', minTariff: 'curator' },
        { id: 'lesson-2-5', title: 'Урок 2.5: Автоматизация с куратором', minTariff: 'curator' },
        { id: 'lesson-2-6', title: 'Урок 2.6: Продвинутые техники AI', minTariff: 'mentor' },
        { id: 'lesson-2-7', title: 'Урок 2.7: Индивидуальная настройка AI-агентов', minTariff: 'mentor' },
        { id: 'lesson-2-8', title: 'Урок 2.8: AI-стратегия для масштабирования', minTariff: 'mentor' },
      ],
    },
    {
      id: 'module-3',
      title: 'Модуль 3: Бизнес-системы',
      lessons: [
        { id: 'lesson-3-1', title: 'Урок 3.1: Структура бизнес-системы', minTariff: 'standard' },
        { id: 'lesson-3-2', title: 'Урок 3.2: Автоматизация процессов', minTariff: 'standard' },
        { id: 'lesson-3-3', title: 'Урок 3.3: Разбор вашей системы с куратором', minTariff: 'curator' },
        { id: 'lesson-3-4', title: 'Урок 3.4: Оптимизация бизнес-процессов', minTariff: 'curator' },
        { id: 'lesson-3-5', title: 'Урок 3.5: Индивидуальная бизнес-система', minTariff: 'mentor' },
        { id: 'lesson-3-6', title: 'Урок 3.6: Стратегия роста с наставником', minTariff: 'mentor' },
      ],
    },
    {
      id: 'module-4',
      title: 'Модуль 4: Продажи и воронки',
      lessons: [
        { id: 'lesson-4-1', title: 'Урок 4.1: Воронка продаж', minTariff: 'standard' },
        { id: 'lesson-4-2', title: 'Урок 4.2: Работа с возражениями', minTariff: 'standard' },
        { id: 'lesson-4-3', title: 'Урок 4.3: Аудит вашей воронки с куратором', minTariff: 'curator' },
        { id: 'lesson-4-4', title: 'Урок 4.4: Индивидуальная воронка продаж', minTariff: 'mentor' },
        { id: 'lesson-4-5', title: 'Урок 4.5: Масштабирование продаж', minTariff: 'mentor' },
      ],
    },
  ];

  // Тарифная иерархия: standard < curator < mentor
  const tariffLevel = {
    'free': 0,
    'standard': 1,
    'curator': 2,
    'mentor': 3,
  };

  // Функция фильтрации уроков по тарифу
  const getAvailableLessonsForTariff = (lessons: typeof modulesData[0]['lessons']) => {
    return lessons.filter(lesson => {
      const lessonTariffLevel = tariffLevel[lesson.minTariff as keyof typeof tariffLevel] || 0;
      const userTariffLevel = tariffLevel[tariff as keyof typeof tariffLevel] || 0;
      return lessonTariffLevel <= userTariffLevel;
    });
  };

  // Состояние редактирования
  const [isEditing, setIsEditing] = useState(false);
  
  // Состояние раскрытия календаря
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  // Ref для отслеживания предыдущего тарифа
  const prevTariffRef = useRef<TariffKey>(tariff);

  // Автоматическое управление доступом при изменении тарифа
  useEffect(() => {
    // Пропускаем первый рендер
    if (prevTariffRef.current === tariff) {
      prevTariffRef.current = tariff;
      return;
    }

    // Получаем все доступные уроки для текущего и предыдущего тарифа
    const getAllAvailableLessons = (tariffKey: TariffKey) => {
      const allLessons: string[] = [];
      modulesData.forEach(module => {
        const availableLessons = module.lessons.filter(lesson => {
          const lessonLevel = tariffLevel[lesson.minTariff as keyof typeof tariffLevel] || 0;
          const userLevel = tariffLevel[tariffKey as keyof typeof tariffLevel] || 0;
          return lessonLevel <= userLevel;
        });
        allLessons.push(...availableLessons.map(l => l.id));
      });
      return allLessons;
    };

    const prevAvailableLessons = getAllAvailableLessons(prevTariffRef.current);
    const currentAvailableLessons = getAllAvailableLessons(tariff);

    const prevLevel = tariffLevel[prevTariffRef.current as keyof typeof tariffLevel] || 0;
    const currentLevel = tariffLevel[tariff as keyof typeof tariffLevel] || 0;

    if (currentLevel > prevLevel) {
      // АПГРЕЙД: Добавляем только НОВЫЕ уроки
      const newLessons = currentAvailableLessons.filter(id => !prevAvailableLessons.includes(id));
      
      if (newLessons.length > 0 && accessType === 'lessons') {
        setSelectedLessons(prev => {
          // Объединяем существующие уроки с новыми (без дубликатов)
          const updated = [...new Set([...prev, ...newLessons])];
          return updated;
        });

        toast.success(`Тариф повышен до "${getTariffLabel(tariff)}"`, {
          description: `Добавлено ${newLessons.length} ${newLessons.length === 1 ? 'новый урок' : newLessons.length <= 4 ? 'новых урока' : 'новых уроков'}`,
          duration: 4000,
        });
      }
    } else if (currentLevel < prevLevel) {
      // ДАУНГРЕЙД: Убираем уроки, которые стали недоступны
      const lessonsToRemove = prevAvailableLessons.filter(id => !currentAvailableLessons.includes(id));
      
      if (lessonsToRemove.length > 0 && accessType === 'lessons') {
        setSelectedLessons(prev => {
          // Убираем уроки, которые стали недоступны
          const updated = prev.filter(id => !lessonsToRemove.includes(id));
          return updated;
        });

        toast.warning(`Тариф понижен до "${getTariffLabel(tariff)}"`, {
          description: `Удалено ${lessonsToRemove.length} ${lessonsToRemove.length === 1 ? 'урок' : lessonsToRemove.length <= 4 ? 'урока' : 'уроков'}`,
          duration: 4000,
        });
      }
    }

    // Обновляем предыдущий тариф
    prevTariffRef.current = tariff;
  }, [tariff, accessType]);

  if (!user) return null;

  const initials = `${firstName[0]}${lastName[0] || ''}`.toUpperCase();

  const handleAction = (action: string) => {
    setShowActionsMenu(false);
  };

  const handleSave = () => {
    const updatedData: Partial<User> = {
      name: `${firstName} ${lastName}`.trim(),
      email,
      profession,
      telegramNick,
      role: isManager ? 'manager' : 'user',
      accessUntil,
      tariff,
      accessType,
      selectedLessons,
    };

    if (onUpdate) {
      onUpdate(user.id, updatedData);
    }

    // Показываем уведомление об успешном сохранении
    toast.success('Изменения сохранены', {
      description: `Профиль пользователя ${firstName} ${lastName} успешно обновлён`,
    });

    setIsEditing(false);

  };

  const handleToggleBlockStatus = () => {
    const newStatus = user.status === 'active' ? 'blocked' : 'active';
    
    if (onUpdate) {
      onUpdate(user.id, { status: newStatus });
    }
    
    setShowActionsMenu(false);
  };

  // История активности - сортируем от новых к старым
  const userActivities = (USER_ACTIVITIES[user?.id as keyof typeof USER_ACTIVITIES] || [])
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'lesson_complete':
        return { Icon: CheckCircle, color: 'text-green-600', bgColor: 'bg-green-50' };
      case 'lesson_view':
        return { Icon: Eye, color: 'text-blue-600', bgColor: 'bg-blue-50' };
      case 'payment':
        return { Icon: DollarSign, color: 'text-purple-600', bgColor: 'bg-purple-50' };
      case 'login':
        return { Icon: LogIn, color: 'text-indigo-600', bgColor: 'bg-indigo-50' };
      case 'module_start':
        return { Icon: Activity, color: 'text-cyan-600', bgColor: 'bg-cyan-50' };
      case 'registration':
        return { Icon: Users, color: 'text-violet-600', bgColor: 'bg-violet-50' };
      default:
        return { Icon: Activity, color: 'text-slate-600', bgColor: 'bg-slate-50' };
    }
  };

  const formatActivityTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString('ru-RU', { 
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit', 
      minute: '2-digit'
    });
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins} мин ${secs} сек`;
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString('ru-RU', { 
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString('ru-RU', { 
      hour: '2-digit', 
      minute: '2-digit'
    });
  };

  // Создание чек-листа прогресса
  const createLessonsChecklist = () => {
    // Получаем все lesson_view активности (когда урок был открыт)
    const viewedLessons = userActivities
      .filter(activity => activity.type === 'lesson_view')
      .map(activity => activity.resource);
    
    // Получаем все lesson_complete активности
    const completedLessons = userActivities
      .filter(activity => activity.type === 'lesson_complete')
      .map(activity => activity.resource);

    // Создаем список всех уроков из модулей
    const allLessons = modulesData.flatMap(module => 
      module.lessons.map(lesson => ({
        moduleTitle: module.title,
        lessonTitle: lesson.title,
        status: completedLessons.includes(lesson.title) ? 'completed' : 
                viewedLessons.includes(lesson.title) ? 'started' : 'not-started'
      }))
    );

    return allLessons;
  };

  const lessonsChecklist = createLessonsChecklist();
  const completedCount = lessonsChecklist.filter(l => l.status === 'completed').length;
  const startedCount = lessonsChecklist.filter(l => l.status === 'started').length;
  const notStartedCount = lessonsChecklist.filter(l => l.status === 'not-started').length;

  return (
    <>
    <AnimatePresence mode="wait">
      {/* Full Page Overlay */}
      <motion.div
        key="user-detail-panel"
        className="fixed inset-0 bg-white z-50 overflow-y-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-200 z-10 shadow-sm">
          {/* Breadcrumbs & Close */}
          <div className="px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button 
                  onClick={onClose}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <button 
                    onClick={onClose}
                    className="hover:text-violet-600 transition-colors"
                  >
                    Все контакты
                  </button>
                  <span>/</span>
                  <span className="text-slate-800 font-semibold">{user.name}</span>
                </div>
              </div>

              {/* Action Buttons in Header */}
              <div className="flex items-center gap-2">
                <div className="relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowActionsMenu(!showActionsMenu);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-semibold transition-colors"
                  >
                    Действия
                    <ChevronDown size={16} />
                  </button>

                  {/* Actions Dropdown */}
                  <AnimatePresence>
                    {showActionsMenu && (
                      <motion.div
                        key="actions-menu"
                        className="absolute top-full right-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border border-slate-200 py-2 z-20"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowChat(true);
                            setShowActionsMenu(false);
                          }}
                          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors text-left"
                        >
                          <MessageCircle size={18} className="text-blue-600" />
                          <span className="text-sm text-slate-700">Отправить сообщение в чат</span>
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowEmailComposer(true);
                            setShowActionsMenu(false);
                          }}
                          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors text-left"
                        >
                          <Mail size={18} className="text-green-600" />
                          <span className="text-sm text-slate-700">Отправить письмо на почту</span>
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAction('Войти в школу как пользователь');
                          }}
                          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors text-left"
                        >
                          <LogIn size={18} className="text-violet-600" />
                          <span className="text-sm text-slate-700">Войти в школу как пользователь</span>
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowPasswordModal(true);
                            setShowActionsMenu(false);
                          }}
                          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors text-left"
                        >
                          <Key size={18} className="text-slate-600" />
                          <span className="text-sm text-slate-700">Изменить пароль</span>
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleBlockStatus();
                          }}
                          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors text-left"
                        >
                          <Ban size={18} className={user.status === 'active' ? 'text-orange-600' : 'text-green-600'} />
                          <span className="text-sm text-slate-700">
                            {user.status === 'active' ? 'Заблокировать контакт' : 'Разблокировать контакт'}
                          </span>
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAction('Объединить с другим контактом');
                          }}
                          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors text-left"
                        >
                          <Users size={18} className="text-slate-600" />
                          <span className="text-sm text-slate-700">Объединить с другим контактом</span>
                        </button>
                        <div className="border-t border-slate-200 my-2"></div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowDeleteConfirm(true);
                            setShowActionsMenu(false);
                          }}
                          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 transition-colors text-left"
                        >
                          <Trash2 size={18} className="text-red-600" />
                          <span className="text-sm text-red-600">Удалить контакт</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowSubscriptions(!showSubscriptions);
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-semibold transition-colors"
                >
                  Подписки
                  <ChevronDown size={16} className={showSubscriptions ? 'rotate-180 transition-transform' : 'transition-transform'} />
                </button>

                {!isEditing ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsEditing(true);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-violet-100 hover:bg-violet-200 text-violet-700 rounded-lg font-semibold transition-colors"
                  >
                    <Edit2 size={16} />
                    Редактировать
                  </button>
                ) : (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSave();
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg font-semibold transition-colors"
                  >
                    <Save size={16} />
                    Сохранить
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Content Container */}
        <div className="max-w-7xl mx-auto px-8 py-8">
          {/* User Header Card */}
          <div className="bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50 rounded-2xl p-8 mb-8 border border-violet-200">
            <div className="flex items-start gap-6">
              {/* Avatar */}
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                  {initials}
                </div>
                {user.tariff === 'free' && isManager && (
                  <div className="absolute -top-2 -left-2 w-8 h-8 rounded-full bg-violet-600 border-3 border-white flex items-center justify-center shadow-md">
                    <span className="text-white text-sm font-bold">М</span>
                  </div>
                )}
                <div className={`absolute -bottom-2 -right-2 w-7 h-7 rounded-full border-3 border-white ${
                  user.status === 'active' ? 'bg-green-500' : 'bg-red-500'
                }`}></div>
              </div>

              {/* User Info */}
              <div className="flex-1">
                <h1 className="text-4xl font-bold text-slate-800 mb-2">{user.name}</h1>
                <p className="text-lg text-slate-600 mb-4">{email}</p>
                
                {/* Subscriptions Panel */}
                <AnimatePresence>
                  {showSubscriptions && (
                    <motion.div
                      key="subscriptions-panel"
                      className="mt-4 p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-violet-200"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <CheckCircle size={16} className="text-green-600" />
                          <span className="text-sm text-slate-700">Email-рассылка активна</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle size={16} className="text-green-600" />
                          <span className="text-sm text-slate-700">Push-уведомленя включены</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <XCircle size={16} className="text-slate-400" />
                          <span className="text-sm text-slate-400">SMS-уведомления выключены</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Info */}
            <div className="lg:col-span-2 space-y-8">
              {/* Stats Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl p-4 border border-slate-200 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-2 mb-2">
                    <CreditCard size={18} className="text-violet-600 flex-shrink-0" />
                    <span className="text-xs text-slate-600">Тариф</span>
                  </div>
                  <p className="text-sm font-bold text-slate-800 leading-tight">{getTariffLabel(user.tariff)}</p>
                </div>
                <div className="bg-white rounded-xl p-4 border border-slate-200 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign size={18} className="text-green-600 flex-shrink-0" />
                    <span className="text-xs text-slate-600">Выручка</span>
                  </div>
                  <p className="text-sm font-bold text-slate-800 leading-tight">₽{(user.revenue || 0).toLocaleString()}</p>
                </div>
                <div className="bg-white rounded-xl p-4 border border-slate-200 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText size={18} className="text-blue-600 flex-shrink-0" />
                    <span className="text-xs text-slate-600">Уроков</span>
                  </div>
                  <p className="text-sm font-bold text-slate-800 leading-tight">{user.completedLessons || 0}</p>
                </div>
                <div className="bg-white rounded-xl p-4 border border-slate-200 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock size={18} className="text-amber-600 flex-shrink-0" />
                    <span className="text-xs text-slate-600 truncate">Последний вход</span>
                  </div>
                  <p className="text-xs font-bold text-slate-800 leading-tight">{new Date(user.lastLogin).toLocaleDateString('ru-RU')}</p>
                </div>
              </div>

              {/* Editable Profile */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-slate-800">Профиль пользователя</h3>
                  {isEditing && (
                    <span className="text-xs text-violet-600 bg-violet-50 px-3 py-1 rounded-full font-semibold">
                      Режим редактирования
                    </span>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Имя */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-2">Имя</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                      />
                    ) : (
                      <p className="text-sm font-semibold text-slate-800 px-4 py-3 bg-slate-50 rounded-xl">{firstName}</p>
                    )}
                  </div>

                  {/* Фамилия */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-2">Фамилия</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                      />
                    ) : (
                      <p className="text-sm font-semibold text-slate-800 px-4 py-3 bg-slate-50 rounded-xl">{lastName}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-slate-500 mb-2 flex items-center gap-2">
                      <Mail size={14} />
                      Email адрес
                    </label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                      />
                    ) : (
                      <p className="text-sm font-semibold text-slate-800 px-4 py-3 bg-slate-50 rounded-xl">{email}</p>
                    )}
                  </div>

                  {/* Профессия - только для НЕ работников */}
                  {user.tariff !== 'free' && (
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-2 flex items-center gap-2">
                        <Briefcase size={14} />
                        Профессия
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={profession}
                          onChange={(e) => setProfession(e.target.value)}
                          placeholder="Психолог, коуч, бизнес-тренер..."
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                        />
                      ) : (
                        <p className="text-sm font-semibold text-slate-800 px-4 py-3 bg-slate-50 rounded-xl">{profession || '—'}</p>
                      )}
                    </div>
                  )}

                  {/* Telegram */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-2 flex items-center gap-2">
                      <MessageCircle size={14} />
                      Ник в Telegram
                    </label>
                    {isEditing ? (
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium">@</span>
                        <input
                          type="text"
                          value={telegramNick}
                          onChange={(e) => setTelegramNick(e.target.value)}
                          placeholder="username"
                          className="w-full pl-9 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                        />
                      </div>
                    ) : (
                      <p className="text-sm font-semibold text-slate-800 px-4 py-3 bg-slate-50 rounded-xl">{telegramNick ? `@${telegramNick}` : '—'}</p>
                    )}
                  </div>
                </div>

                {/* Чекбокс "Менеджер" для тарифа "Работник" */}
                {user.tariff === 'free' && (
                  <div className="flex items-center gap-3 p-4 bg-violet-50 rounded-xl border-2 border-violet-200 mt-6">
                    <input
                      type="checkbox"
                      id="isManager"
                      checked={isManager}
                      onChange={(e) => {
                        const newValue = e.target.checked;
                        setIsManager(newValue);
                        
                        // Автоматически сохраняем изменение
                        if (onUpdate) {
                          onUpdate(user.id, {
                            role: newValue ? 'manager' : 'user',
                          });
                        }
                      }}
                      className="w-5 h-5 text-violet-600 bg-white border-violet-300 rounded focus:ring-2 focus:ring-violet-500 cursor-pointer"
                    />
                    <label htmlFor="isManager" className="text-sm font-semibold text-slate-700 cursor-pointer flex items-center gap-2">
                      <UserCog size={18} className="text-violet-600" />
                      Менеджер
                    </label>
                  </div>
                )}
              </div>

              {/* Управление доступом к контенту - ПЕРЕМЕЩЕНО СЮДА ДЛЯ УДОБСТВА РЕДАКТИРОВАНИЯ */}
              {isEditing && (
                <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <BookOpen size={24} className="text-violet-600" />
                    <h3 className="text-xl font-bold text-slate-800">Доступ к контенту</h3>
                  </div>

                  {/* Тип доступа */}
                  <div className="space-y-3 mb-6">
                    <label className="flex items-center gap-3 p-4 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors border-2 border-transparent has-[:checked]:border-green-500 has-[:checked]:bg-green-50">
                      <input
                        type="radio"
                        name="accessType"
                        value="full"
                        checked={accessType === 'full'}
                        onChange={(e) => setAccessType(e.target.value as 'full')}
                        className="w-5 h-5 text-violet-600 focus:ring-2 focus:ring-violet-500"
                      />
                      <Unlock size={20} className="text-green-600" />
                      <span className="text-base font-semibold text-slate-700">Полный доступ</span>
                    </label>

                    <label className="flex items-center gap-3 p-4 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors border-2 border-transparent has-[:checked]:border-violet-500 has-[:checked]:bg-violet-50">
                      <input
                        type="radio"
                        name="accessType"
                        value="lessons"
                        checked={accessType === 'lessons'}
                        onChange={(e) => setAccessType(e.target.value as 'lessons')}
                        className="w-5 h-5 text-violet-600 focus:ring-2 focus:ring-violet-500"
                      />
                      <Lock size={20} className="text-violet-600" />
                      <span className="text-base font-semibold text-slate-700">Отдельные модули</span>
                    </label>
                  </div>

                  {/* Выбор модулей и уроков - ИЕРАРХИЧЕСКАЯ СТРУКТУРА */}
                  {accessType === 'lessons' && (
                    <div className="bg-violet-50 rounded-xl p-4 md:p-6 space-y-4">
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-sm font-bold text-slate-700">Выберите модули и уроки:</p>
                        <button
                          type="button"
                          onClick={() => {
                            // Функция в разработке
                          }}
                          className="flex items-center gap-2 px-3 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg text-sm font-semibold transition-colors"
                        >
                          <BookOpen size={16} />
                          Добавить модуль
                        </button>
                      </div>
                      
                      {/* Поиск по модулям и урокам */}
                      <div className="relative">
                        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="text"
                          value={lessonsSearchQuery}
                          onChange={(e) => setLessonsSearchQuery(e.target.value)}
                          placeholder="Поиск модулей и уроков..."
                          className="w-full pl-12 pr-4 py-3 text-base bg-white border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                        />
                      </div>
                      
                      {/* Иерархический список модулей с уроками */}
                      <div className="max-h-96 overflow-y-auto space-y-2">
                        {modulesData
                          .filter(module => 
                            module.title.toLowerCase().includes(lessonsSearchQuery.toLowerCase()) ||
                            module.lessons.some(lesson => lesson.title.toLowerCase().includes(lessonsSearchQuery.toLowerCase()))
                          )
                          .map((module) => {
                            const isModuleExpanded = expandedModules.includes(module.id);
                            const isModuleSelected = selectedLessons.includes(module.id);
                            const moduleLessonIds = module.lessons.map(l => l.id);
                            const allModuleLessonsSelected = moduleLessonIds.every(id => selectedLessons.includes(id));
                            const someModuleLessonsSelected = moduleLessonIds.some(id => selectedLessons.includes(id)) && !allModuleLessonsSelected;

                            return (
                              <div key={module.id} className="bg-white rounded-xl border border-amber-200 overflow-hidden">
                                {/* Заголовок модуля */}
                                <div className="flex items-start gap-3 p-4 hover:bg-amber-50 transition-colors">
                                  {/* Чекбокс модуля */}
                                  <input
                                    type="checkbox"
                                    checked={isModuleSelected || allModuleLessonsSelected}
                                    ref={(el) => {
                                      if (el) el.indeterminate = someModuleLessonsSelected;
                                    }}
                                    onChange={(e) => {
                                      if (e.target.checked) {
                                        // Выбираем модуль и все его уроки
                                        const newLessons = [...selectedLessons.filter(l => !moduleLessonIds.includes(l)), module.id, ...moduleLessonIds];
                                        setSelectedLessons(newLessons);
                                        setExpandedModules([...expandedModules, module.id]);
                                      } else {
                                        // Убираем модуль и все его уроки
                                        setSelectedLessons(selectedLessons.filter(l => l !== module.id && !moduleLessonIds.includes(l)));
                                      }
                                    }}
                                    className="w-5 h-5 mt-0.5 text-amber-600 border-amber-300 rounded focus:ring-2 focus:ring-amber-500 cursor-pointer"
                                  />
                                  
                                  {/* Название модуля */}
                                  <div className="flex-1">
                                    <button
                                      onClick={() => {
                                        if (isModuleExpanded) {
                                          setExpandedModules(expandedModules.filter(m => m !== module.id));
                                        } else {
                                          setExpandedModules([...expandedModules, module.id]);
                                        }
                                      }}
                                      className="flex items-center gap-2 w-full text-left"
                                    >
                                      <ChevronRight
                                        size={18}
                                        className={`text-amber-600 transition-transform ${isModuleExpanded ? 'rotate-90' : ''}`}
                                      />
                                      <span className="text-sm text-slate-800 font-bold">{module.title}</span>
                                      <span className="text-xs text-slate-500 ml-auto flex items-center gap-2">
                                        <span className="px-2 py-0.5 bg-violet-100 text-violet-700 rounded-full font-semibold">
                                          {getAvailableLessonsForTariff(module.lessons).length} / {module.lessons.length}
                                        </span>
                                        {getAvailableLessonsForTariff(module.lessons).length === module.lessons.length ? 'все уроки' : 'доступно'}
                                      </span>
                                    </button>
                                  </div>
                                </div>

                                {/* Уроки модуля (раскрывающиеся) */}
                                <AnimatePresence>
                                  {isModuleExpanded && (
                                    <motion.div
                                      key={`module-${module.id}-lessons`}
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: 'auto', opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      transition={{ duration: 0.2 }}
                                      className="border-t border-amber-200 bg-amber-50/50"
                                    >
                                      <div className="p-3 space-y-2">
                                        {getAvailableLessonsForTariff(module.lessons)
                                          .filter(lesson => lesson.title.toLowerCase().includes(lessonsSearchQuery.toLowerCase()))
                                          .map((lesson) => (
                                            <label
                                              key={lesson.id}
                                              className="flex items-start gap-3 p-3 hover:bg-white rounded-lg transition-colors cursor-pointer"
                                            >
                                              <input
                                                type="checkbox"
                                                checked={selectedLessons.includes(lesson.id) || isModuleSelected}
                                                onChange={(e) => {
                                                  if (e.target.checked) {
                                                    setSelectedLessons([...selectedLessons, lesson.id]);
                                                  } else {
                                                    setSelectedLessons(selectedLessons.filter(l => l !== lesson.id && l !== module.id));
                                                  }
                                                }}
                                                disabled={isModuleSelected}
                                                className="w-5 h-5 mt-0.5 text-amber-600 border-amber-300 rounded focus:ring-2 focus:ring-amber-500 disabled:opacity-50"
                                              />
                                              <span className="text-sm text-slate-700 leading-relaxed">{lesson.title}</span>
                                            </label>
                                          ))}
                                        {getAvailableLessonsForTariff(module.lessons).filter(lesson => lesson.title.toLowerCase().includes(lessonsSearchQuery.toLowerCase())).length === 0 && (
                                          <p className="text-xs text-slate-500 text-center py-2">Уроки не найдены</p>
                                        )}
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            );
                          })}
                        
                        {/* Ничего не найдено */}
                        {modulesData.filter(module => 
                          module.title.toLowerCase().includes(lessonsSearchQuery.toLowerCase()) ||
                          module.lessons.some(lesson => lesson.title.toLowerCase().includes(lessonsSearchQuery.toLowerCase()))
                        ).length === 0 && (
                          <p className="text-sm text-slate-500 text-center py-8">Ничего не найдено</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* История активности */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                {/* Tabs */}
                <div className="flex border-b border-slate-200">
                  <button
                    onClick={() => setActivityTab('log')}
                    className={`flex-1 px-6 py-3 font-medium text-sm transition-all ${
                      activityTab === 'log'
                        ? 'text-violet-600 border-b-2 border-violet-600 bg-violet-50/30'
                        : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50'
                    }`}
                  >
                    Лог активности
                  </button>
                  <button
                    onClick={() => setActivityTab('checklist')}
                    className={`flex-1 px-6 py-3 font-medium text-sm transition-all ${
                      activityTab === 'checklist'
                        ? 'text-violet-600 border-b-2 border-violet-600 bg-violet-50/30'
                        : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50'
                    }`}
                  >
                    Чек-лист прогресса
                  </button>
                </div>

                <div className="p-6">
                  {/* Лог активности */}
                  {activityTab === 'log' && (
                    <div className="space-y-2">
                      {userActivities.map((activity, idx) => {
                        const { Icon, color, bgColor } = getActivityIcon(activity.type);
                        return (
                          <motion.div
                            key={activity.id}
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors"
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.02 }}
                          >
                            <div className={`p-2 rounded-lg ${bgColor} flex-shrink-0`}>
                              <Icon size={16} className={color} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-slate-800">
                                {activity.action}
                              </p>
                              <p className="text-xs text-slate-600">
                                {activity.resource}
                                {activity.duration && ` • ${formatDuration(activity.duration)}`}
                              </p>
                            </div>
                            <div className="text-right flex-shrink-0">
                              <p className="text-xs text-slate-500">
                                {formatDate(activity.timestamp)}
                              </p>
                              <p className="text-xs text-slate-600 font-medium">
                                {formatTime(activity.timestamp)}
                              </p>
                            </div>
                          </motion.div>
                        );
                      })}

                      {userActivities.length === 0 && (
                        <div className="text-center py-12">
                          <Activity size={48} className="mx-auto text-slate-300 mb-3" />
                          <p className="text-slate-500">История активности пуста</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Чек-лист прогресса */}
                  {activityTab === 'checklist' && (
                    <div className="space-y-4">
                      {/* Статистика */}
                      <div className="grid grid-cols-3 gap-3 mb-6">
                        <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                          <p className="text-xs text-green-600 mb-1">Завершено</p>
                          <p className="text-2xl font-bold text-green-700">{completedCount}</p>
                        </div>
                        <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                          <p className="text-xs text-blue-600 mb-1">Начато</p>
                          <p className="text-2xl font-bold text-blue-700">{startedCount}</p>
                        </div>
                        <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                          <p className="text-xs text-slate-600 mb-1">Не начато</p>
                          <p className="text-2xl font-bold text-slate-700">{notStartedCount}</p>
                        </div>
                      </div>

                      {/* Список уроков */}
                      <div className="space-y-3">
                        {modulesData.map((module, moduleIdx) => {
                          const moduleLessons = lessonsChecklist.filter(
                            l => l.moduleTitle === module.title
                          );
                          
                          return (
                            <div key={moduleIdx} className="border border-slate-200 rounded-lg overflow-hidden">
                              <div className="bg-slate-50 px-4 py-2 border-b border-slate-200">
                                <h4 className="text-sm font-semibold text-slate-800">{module.title}</h4>
                              </div>
                              <div className="p-3 space-y-2">
                                {moduleLessons.map((lesson, lessonIdx) => (
                                  <div
                                    key={lessonIdx}
                                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors"
                                  >
                                    {lesson.status === 'completed' ? (
                                      <CheckCircle size={18} className="text-green-600 flex-shrink-0" />
                                    ) : lesson.status === 'started' ? (
                                      <div className="w-[18px] h-[18px] rounded-full border-2 border-blue-600 flex items-center justify-center flex-shrink-0">
                                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                      </div>
                                    ) : (
                                      <div className="w-[18px] h-[18px] rounded-full border-2 border-slate-300 flex-shrink-0"></div>
                                    )}
                                    <span className={`text-sm flex-1 ${
                                      lesson.status === 'completed' ? 'text-slate-500 line-through' :
                                      lesson.status === 'started' ? 'text-slate-800 font-medium' :
                                      'text-slate-600'
                                    }`}>
                                      {lesson.lessonTitle}
                                    </span>
                                    {lesson.status === 'completed' && (
                                      <span className="text-xs text-green-600 font-medium">Завершено</span>
                                    )}
                                    {lesson.status === 'started' && (
                                      <span className="text-xs text-blue-600 font-medium">В процессе</span>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* История Email */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-slate-800">История Email</h3>
                  <button
                    onClick={() => setShowEmailComposer(true)}
                    className="flex items-center gap-2 px-3 py-1.5 bg-violet-100 hover:bg-violet-200 text-violet-700 rounded-lg text-sm font-semibold transition-colors"
                  >
                    <Send size={16} />
                    Написать
                  </button>
                </div>
                
                <div className="space-y-3">
                  {emailLogs.map((email, idx) => (
                    <motion.div
                      key={email.id}
                      className="rounded-xl p-4 border border-slate-200 bg-slate-50/30 hover:bg-slate-50 transition-all"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg flex-shrink-0 ${
                          email.status === 'delivered' ? 'bg-green-100' :
                          email.status === 'sent' ? 'bg-blue-100' :
                          email.status === 'queued' ? 'bg-yellow-100' :
                          'bg-red-100'
                        }`}>
                          <Mail size={18} className={
                            email.status === 'delivered' ? 'text-green-600' :
                            email.status === 'sent' ? 'text-blue-600' :
                            email.status === 'queued' ? 'text-yellow-600' :
                            'text-red-600'
                          } />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-sm text-slate-800 truncate">{email.subject}</h4>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0 ${
                              email.status === 'delivered' ? 'bg-green-100 text-green-700' :
                              email.status === 'sent' ? 'bg-blue-100 text-blue-700' :
                              email.status === 'queued' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-red-100 text-red-700'
                            }`}>
                              {email.status === 'delivered' ? 'Доставлено' :
                               email.status === 'sent' ? 'Отправлено' :
                               email.status === 'queued' ? 'В очереди' :
                               'Ошибка'}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 mb-2">
                            Кому: {email.to} • {formatActivityTime(email.sentAt)}
                          </p>
                          <div 
                            className="text-xs text-slate-600 line-clamp-2" 
                            dangerouslySetInnerHTML={{ __html: email.body }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {emailLogs.length === 0 && (
                  <div className="text-center py-12">
                    <Mail size={48} className="mx-auto text-slate-300 mb-3" />
                    <p className="text-slate-500 mb-4">Email-переписка не начата</p>
                    <button
                      onClick={() => setShowEmailComposer(true)}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg text-sm font-semibold transition-colors"
                    >
                      <Send size={16} />
                      Отправить первое письмо
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - System Info */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm sticky top-24">
                <h3 className="text-lg font-bold text-slate-800 mb-6">Системная информация</h3>
                
                <div className="space-y-5">
                  {/* Дата регистрации */}
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-slate-100 rounded-lg">
                      <Calendar size={18} className="text-slate-600" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Дата регистрации</p>
                      <p className="text-sm font-semibold text-slate-800">{new Date(user.registeredAt).toLocaleDateString('ru-RU')}</p>
                    </div>
                  </div>

                  {/* Доступ до - редактируемый */}
                  <div>
                    <div className="flex items-start gap-3 mb-2">
                      <div className="p-2 bg-slate-100 rounded-lg">
                        <Clock size={18} className="text-slate-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-slate-500 mb-2">Доступ до</p>
                        {isEditing ? (
                          <div className="space-y-2">
                            <input
                              type="date"
                              value={accessUntil}
                              onChange={(e) => setAccessUntil(e.target.value)}
                              onFocus={() => setIsCalendarOpen(true)}
                              onBlur={() => setTimeout(() => setIsCalendarOpen(false), 200)}
                              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all"
                            />
                            <AnimatePresence>
                              {isCalendarOpen && (
                                <motion.div
                                  key="calendar-options"
                                  className="grid grid-cols-2 gap-2"
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const newDate = new Date();
                                      newDate.setMonth(newDate.getMonth() + 1);
                                      const formattedDate = newDate.toISOString().split('T')[0];
                                      setAccessUntil(formattedDate);
                                    }}
                                    className="flex items-center justify-center gap-1.5 px-2 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium transition-all"
                                  >
                                    <Calendar size={12} />
                                    Месяц
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const newDate = new Date();
                                      newDate.setMonth(newDate.getMonth() + 3);
                                      const formattedDate = newDate.toISOString().split('T')[0];
                                      setAccessUntil(formattedDate);
                                    }}
                                    className="flex items-center justify-center gap-1.5 px-2 py-1.5 bg-violet-100 hover:bg-violet-200 text-violet-700 rounded-lg text-xs font-medium transition-all"
                                  >
                                    <Calendar size={12} />
                                    3 месяца
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const newDate = new Date();
                                      newDate.setMonth(newDate.getMonth() + 6);
                                      const formattedDate = newDate.toISOString().split('T')[0];
                                      setAccessUntil(formattedDate);
                                    }}
                                    className="flex items-center justify-center gap-1.5 px-2 py-1.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-700 rounded-lg text-xs font-medium transition-all"
                                  >
                                    <Calendar size={12} />
                                    Пол года
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const oneYearFromNow = new Date();
                                      oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
                                      const formattedDate = oneYearFromNow.toISOString().split('T')[0];
                                      setAccessUntil(formattedDate);
                                    }}
                                    className="flex items-center justify-center gap-1.5 px-2 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-700 rounded-lg text-xs font-medium transition-all"
                                  >
                                    <Calendar size={12} />
                                    Год
                                  </button>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ) : (
                          <p className="text-sm font-semibold text-slate-800">
                            {accessUntil ? new Date(accessUntil).toLocaleDateString('ru-RU') : '—'}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Тариф - редактируемый */}
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-slate-100 rounded-lg">
                      <CreditCard size={18} className="text-slate-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-slate-500 mb-2">Тариф</p>
                      {isEditing ? (
                        <select
                          value={tariff}
                          onChange={(e) => setTariff(e.target.value as TariffKey)}
                          className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all"
                        >
                          <option value="free">{getTariffLabel('free')}</option>
                          <option value="standard">{getTariffLabel('standard')}</option>
                          <option value="curator">{getTariffLabel('curator')}</option>
                          <option value="mentor">{getTariffLabel('mentor')}</option>
                        </select>
                      ) : (
                        <p className="text-sm font-semibold text-slate-800">{getTariffLabel(tariff)}</p>
                      )}
                    </div>
                  </div>

                  {/* Статус */}
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-slate-100 rounded-lg">
                      <Activity size={18} className="text-slate-600" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-2">Статус</p>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        user.status === 'active'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {user.status === 'active' ? 'Активен' : 'Заблокирован'}
                      </span>
                    </div>
                  </div>

                  {/* Менеджер - только для НЕ работников */}
                  {user.manager && user.tariff !== 'free' && (
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-slate-100 rounded-lg">
                        <UserCog size={18} className="text-slate-600" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 mb-1">Менеджер</p>
                        <p className="text-sm font-semibold text-slate-800">{user.manager}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

    </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence mode="wait">
        {showDeleteConfirm && (
          <>
            {/* Backdrop */}
            <motion.div
              key="delete-backdrop"
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={(e) => {
                e.stopPropagation();
                setShowDeleteConfirm(false);
              }}
            />

            {/* Modal */}
            <motion.div
              key="delete-modal"
              className="fixed inset-0 flex items-center justify-center z-[60] p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative overflow-hidden"
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Warning Icon */}
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center">
                    <Trash2 size={40} className="text-red-600" />
                  </div>
                </div>

                {/* Content */}
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-slate-800 mb-3">
                    Удалить контакт?
                  </h2>
                  <p className="text-slate-600 mb-2">
                    Вы уверены, что хотите удалить контакт
                  </p>
                  <p className="text-lg font-bold text-slate-800">
                    {user.name}?
                  </p>
                  <p className="text-sm text-red-600 mt-4">
                    Это действие нельзя будет отменить
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowDeleteConfirm(false);
                    }}
                    className="flex-1 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Отмена
                  </motion.button>
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowDeleteConfirm(false);
                      if (onDelete) {
                        onDelete(user.id);
                      }
                      onClose();
                    }}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Да, удалить
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Email Composer Modal */}
      <EmailComposerModal
        isOpen={showEmailComposer}
        onClose={() => setShowEmailComposer(false)}
        recipientEmail={user.email}
        recipientName={user.name}
        userId={user.id}
        onEmailSent={(emailData) => {
          setEmailLogs((prev) => [emailData, ...prev]);
          toast.success('Email отправлен', {
            description: 'Письмо успешно добавлено в очередь отправки',
          });
        }}
      />

      {/* Password Change Modal */}
      <PasswordChangeModal
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
        user={user}
        onPasswordChanged={(newPassword) => {
          toast.success('Пароль изменён', {
            description: `Новый пароль для ${user.name}: ${newPassword}`,
            duration: 5000,
          });
        }}
      />

      {/* Chat Window - Outside main AnimatePresence to avoid conflicts */}
      <AnimatePresence mode="wait">
        {showChat && (
          <ChatWindow
            user={user}
            onClose={() => setShowChat(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

// Password Change Modal Component
interface PasswordChangeModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  onPasswordChanged: (newPassword: string) => void;
}

function PasswordChangeModal({ isOpen, onClose, user, onPasswordChanged }: PasswordChangeModalProps) {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [sendEmail, setSendEmail] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePassword = () => {
    setIsGenerating(true);
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#$%&*';
    let password = '';
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setNewPassword(password);
    setConfirmPassword(password);
    setTimeout(() => setIsGenerating(false), 300);
  };

  const handleSubmit = () => {
    if (!newPassword) {
      toast.error('Введите новый пароль');
      return;
    }
    if (newPassword.length < 6) {
      toast.error('Пароль должен содержать минимум 6 символов');
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error('Пароли не совпадают');
      return;
    }

    onPasswordChanged(newPassword);
    
    if (sendEmail) {
      toast.info('Email с новым паролем отправлен', {
        description: `Письмо отправлено на ${user.email}`,
      });
    }

    setNewPassword('');
    setConfirmPassword('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998] flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-violet-600 px-6 py-4 relative overflow-hidden">
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-2 left-4 w-1 h-1 bg-white rounded-full animate-pulse"></div>
              <div className="absolute top-6 right-8 w-1 h-1 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              <div className="absolute bottom-3 left-12 w-0.5 h-0.5 bg-white rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                  <Key size={20} className="text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">Изменить пароль</h2>
                  <p className="text-sm text-purple-100">{user.name}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X size={20} className="text-white" />
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="p-6 space-y-4">
            {/* User Info */}
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-slate-400" />
                <div>
                  <p className="text-xs text-slate-500">Email пользователя</p>
                  <p className="text-sm font-medium text-slate-700">{user.email}</p>
                </div>
              </div>
            </div>

            {/* New Password */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Новый пароль
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Введите новый пароль"
                  className="w-full px-4 py-3 pr-24 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-400"
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Подтвердите пароль
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Повторите пароль"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
              />
            </div>

            {/* Generate Password Button */}
            <motion.button
              type="button"
              onClick={generatePassword}
              disabled={isGenerating}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors text-sm font-medium text-slate-700"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                animate={isGenerating ? { rotate: 360 } : {}}
                transition={{ duration: 0.5, ease: 'linear' }}
              >
                🎲
              </motion.div>
              {isGenerating ? 'Генерация...' : 'Сгенерировать случайный пароль'}
            </motion.button>

            {/* Send Email Checkbox */}
            <label className="flex items-start gap-3 cursor-pointer group">
              <div className="relative flex items-center justify-center">
                <input
                  type="checkbox"
                  checked={sendEmail}
                  onChange={(e) => setSendEmail(e.target.checked)}
                  className="w-5 h-5 rounded border-2 border-slate-300 checked:bg-purple-600 checked:border-purple-600 cursor-pointer"
                />
                {sendEmail && (
                  <CheckCircle size={14} className="absolute text-white pointer-events-none" />
                )}
              </div>
              <div>
                <p className="text-sm font-medium text-slate-700 group-hover:text-purple-600 transition-colors">
                  Отправить новый пароль на email
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  Пользователь получит письмо с новым паролем на {user.email}
                </p>
              </div>
            </label>

            {/* Warning */}
            {newPassword && newPassword.length < 6 && (
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-3 flex items-start gap-2">
                <AlertCircle size={16} className="text-orange-600 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-orange-700">
                  Пароль должен содержать минимум 6 символов
                </p>
              </div>
            )}

            {newPassword && confirmPassword && newPassword !== confirmPassword && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-3 flex items-start gap-2">
                <X size={16} className="text-red-600 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-red-700">
                  Пароли не совпадают
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors text-sm font-medium text-slate-700"
            >
              Отмена
            </button>
            <motion.button
              onClick={handleSubmit}
              disabled={!newPassword || newPassword !== confirmPassword || newPassword.length < 6}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 disabled:from-slate-300 disabled:to-slate-400 rounded-xl transition-all text-sm font-medium text-white shadow-lg disabled:shadow-none"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Изменить пароль
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}