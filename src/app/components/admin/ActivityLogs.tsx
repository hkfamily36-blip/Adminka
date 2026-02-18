import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Activity, 
  User, 
  FileText, 
  Trash2, 
  Ban, 
  CheckCircle, 
  Filter,
  DollarSign,
  LogIn,
  TrendingUp,
  Users as UsersIcon,
  PlayCircle,
  Clock,
  Eye,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { ActivityLog } from '../../types/rbac';

// Расширенный тип для логов с поддержкой просмотров уроков
interface ExtendedActivityLog extends ActivityLog {
  type: 'lesson_view' | 'lesson_complete' | 'payment' | 'login' | 'module_start' | 'registration' | 'system';
  duration?: number; // Длительность в секундах
  lessonId?: string;
  moduleId?: string;
}

const MOCK_LOGS: ExtendedActivityLog[] = [
  {
    id: '1',
    userId: 'user-1',
    userName: 'Мария Петрова',
    action: 'Завершила урок',
    resource: 'Основы аутентичного маркетинга',
    timestamp: '2026-02-09T14:30:00',
    details: 'Модуль 1: Аутентичность',
    type: 'lesson_complete',
    duration: 2400, // 40 минут
    lessonId: '1.1',
    moduleId: '1',
  },
  {
    id: '2',
    userId: 'user-1',
    userName: 'Мария Петрова',
    action: 'Просмотрела урок',
    resource: 'Распаковка личности',
    timestamp: '2026-02-09T13:15:00',
    details: 'Модуль 1: Аутентичность',
    type: 'lesson_view',
    duration: 1800, // 30 минут
    lessonId: '1.1',
    moduleId: '1',
  },
  {
    id: '3',
    userId: 'user-1',
    userName: 'Мария Петрова',
    action: 'Оплатила тариф',
    resource: 'С куратором',
    timestamp: '2026-02-05T12:15:00',
    details: 'Сумма: 59 900 ₽',
    type: 'payment',
  },
  {
    id: '4',
    userId: 'user-1',
    userName: 'Мария Петрова',
    action: 'Вход в систему',
    resource: 'Платформа',
    timestamp: '2026-02-08T09:45:00',
    details: 'IP: 192.168.1.1',
    type: 'login',
  },
  {
    id: '5',
    userId: 'user-1',
    userName: 'Мария Петрова',
    action: 'Начала модуль',
    resource: 'AI-агенты в бизнесе',
    timestamp: '2026-02-07T16:20:00',
    details: 'Модуль 2: Своя ЦА',
    type: 'module_start',
    moduleId: '2',
  },
  {
    id: '6',
    userId: 'user-1',
    userName: 'Мария Петрова',
    action: 'Регистрация на платформе',
    resource: 'Новый аккаунт',
    timestamp: '2025-11-15T12:00:00',
    details: 'Email: maria@example.com',
    type: 'registration',
  },
  {
    id: '7',
    userId: 'user-2',
    userName: 'Анна Иванова',
    action: 'Просмотрела урок',
    resource: 'Мышление предпринимателя',
    timestamp: '2026-02-09T11:30:00',
    details: 'Модуль 0: Предобучение',
    type: 'lesson_view',
    duration: 900, // 15 минут
    lessonId: '0.2',
    moduleId: '0',
  },
  {
    id: '8',
    userId: 'user-2',
    userName: 'Анна Иванова',
    action: 'Вход в систему',
    resource: 'Платформа',
    timestamp: '2026-02-09T11:00:00',
    details: 'IP: 192.168.1.5',
    type: 'login',
  },
  {
    id: '9',
    userId: 'user-3',
    userName: 'Екатерина Смирнова',
    action: 'Завершила урок',
    resource: 'Ценообразование',
    timestamp: '2026-02-08T18:45:00',
    details: 'Модуль 1: Аутентичность',
    type: 'lesson_complete',
    duration: 3600, // 60 минут
    lessonId: '1.3',
    moduleId: '1',
  },
  {
    id: '10',
    userId: 'user-4',
    userName: 'Ольга Козлова',
    action: 'Оплатила тариф',
    resource: 'Самостоятельный',
    timestamp: '2026-02-08T15:30:00',
    details: 'Сумма: 29 900 ₽',
    type: 'payment',
  },
];

type ActionFilter = 'all' | 'lesson_view' | 'lesson_complete' | 'payment' | 'login' | 'module_start' | 'registration' | 'system';

export function ActivityLogs() {
  const [actionFilter, setActionFilter] = useState<ActionFilter>('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState<string>('all');
  const [expandedLog, setExpandedLog] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Получаем уникальных пользователей
  const uniqueUsers = Array.from(new Set(MOCK_LOGS.map(log => log.userName)));

  // Фильтрация логов
  const filteredLogs = MOCK_LOGS.filter(log => {
    if (actionFilter !== 'all' && log.type !== actionFilter) return false;
    if (selectedUser !== 'all' && log.userName !== selectedUser) return false;
    if (searchQuery && !log.resource.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !log.userName.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    
    // Фильтр по дате
    if (dateFilter !== 'all') {
      const logDate = new Date(log.timestamp);
      const now = new Date();
      const diffDays = Math.floor((now.getTime() - logDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (dateFilter === 'today' && diffDays > 0) return false;
      if (dateFilter === 'week' && diffDays > 7) return false;
      if (dateFilter === 'month' && diffDays > 30) return false;
    }
    
    return true;
  });

  const getActionIcon = (type: string) => {
    switch (type) {
      case 'lesson_complete':
        return <CheckCircle size={20} className="text-green-600" />;
      case 'lesson_view':
        return <Eye size={20} className="text-blue-600" />;
      case 'payment':
        return <DollarSign size={20} className="text-purple-600" />;
      case 'login':
        return <LogIn size={20} className="text-indigo-600" />;
      case 'module_start':
        return <TrendingUp size={20} className="text-cyan-600" />;
      case 'registration':
        return <UsersIcon size={20} className="text-violet-600" />;
      default:
        return <Activity size={20} className="text-slate-600" />;
    }
  };

  const getActionColor = (type: string) => {
    switch (type) {
      case 'lesson_complete':
        return 'bg-green-50 border-green-200';
      case 'lesson_view':
        return 'bg-blue-50 border-blue-200';
      case 'payment':
        return 'bg-purple-50 border-purple-200';
      case 'login':
        return 'bg-indigo-50 border-indigo-200';
      case 'module_start':
        return 'bg-cyan-50 border-cyan-200';
      case 'registration':
        return 'bg-violet-50 border-violet-200';
      default:
        return 'bg-slate-50 border-slate-200';
    }
  };

  const getIconBgColor = (type: string) => {
    switch (type) {
      case 'lesson_complete':
        return 'bg-green-100';
      case 'lesson_view':
        return 'bg-blue-100';
      case 'payment':
        return 'bg-purple-100';
      case 'login':
        return 'bg-indigo-100';
      case 'module_start':
        return 'bg-cyan-100';
      case 'registration':
        return 'bg-violet-100';
      default:
        return 'bg-slate-100';
    }
  };

  const formatDuration = (seconds?: number) => {
    if (!seconds) return null;
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours} ч ${minutes} мин`;
    }
    if (minutes > 0) {
      return `${minutes} мин ${secs} сек`;
    }
    return `${secs} сек`;
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString('ru-RU', { 
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit', 
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <motion.div
        className="bg-white rounded-2xl p-6 shadow-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Тип действия
            </label>
            <select
              value={actionFilter}
              onChange={(e) => setActionFilter(e.target.value as ActionFilter)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
            >
              <option value="all">Все действия</option>
              <option value="lesson_view">Просмотр урока</option>
              <option value="lesson_complete">Завершение урока</option>
              <option value="payment">Оплата тарифа</option>
              <option value="login">Вход в систему</option>
              <option value="module_start">Начало модуля</option>
              <option value="registration">Регистрация</option>
            </select>
          </div>

          <div className="flex-1">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Период
            </label>
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
            >
              <option value="all">Всё время</option>
              <option value="today">Сегодня</option>
              <option value="week">Неделя</option>
              <option value="month">Месяц</option>
            </select>
          </div>

          <div className="flex-1">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Пользователь
            </label>
            <select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
            >
              <option value="all">Все пользователи</option>
              {uniqueUsers.map(user => (
                <option key={user} value={user}>{user}</option>
              ))}
            </select>
          </div>

          <div className="flex-1">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Поиск
            </label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Поиск по ресурсу или пользователю"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2 text-sm text-slate-600">
          <Activity size={16} />
          <span>Всего событий: <strong className="text-violet-600">{filteredLogs.length}</strong></span>
        </div>
      </motion.div>

      {/* Logs Timeline */}
      <motion.div
        className="space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {filteredLogs.map((log, idx) => (
          <motion.div
            key={log.id}
            className={`bg-white rounded-2xl p-6 shadow-lg border-l-4 ${getActionColor(log.type)}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
            whileHover={{ x: 4 }}
          >
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div className={`p-3 rounded-xl ${getIconBgColor(log.type)}`}>
                {getActionIcon(log.type)}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div>
                    <p className="font-semibold text-slate-800">
                      <span className="text-violet-600">{log.userName}</span>{' '}
                      <span className="text-slate-600 font-normal">{log.action.toLowerCase()}</span>
                    </p>
                    <p className="text-sm text-slate-600 mt-1">
                      Ресурс: <strong>{log.resource}</strong>
                    </p>
                  </div>
                  <span className="text-sm text-slate-500 whitespace-nowrap">
                    {formatTime(log.timestamp)}
                  </span>
                </div>
                {log.details && (
                  <p className="text-sm text-slate-500 bg-slate-50 rounded-lg p-3 mt-2">
                    {log.details}
                  </p>
                )}
                {log.duration && (
                  <p className="text-sm text-slate-500 bg-slate-50 rounded-lg p-3 mt-2">
                    Длительность: {formatDuration(log.duration)}
                  </p>
                )}
                {log.type === 'lesson_complete' && (
                  <button
                    className="text-sm text-slate-500 underline mt-2 hover:text-slate-700 transition-colors"
                    onClick={() => setExpandedLog(expandedLog === log.id ? null : log.id)}
                  >
                    {expandedLog === log.id ? 'Скрыть' : 'Показать подробности'}
                  </button>
                )}
                {expandedLog === log.id && log.type === 'lesson_complete' && (
                  <div className="mt-2">
                    <p className="text-sm text-slate-500 bg-slate-50 rounded-lg p-3">
                      Урок завершен: {formatTime(log.timestamp)}
                    </p>
                    <p className="text-sm text-slate-500 bg-slate-50 rounded-lg p-3">
                      Длительность: {formatDuration(log.duration)}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Empty State */}
      {filteredLogs.length === 0 && (
        <div className="bg-white rounded-2xl p-12 shadow-lg text-center">
          <Activity size={48} className="mx-auto text-slate-300 mb-4" />
          <p className="text-slate-500 text-lg">Логи не найдены</p>
        </div>
      )}
    </div>
  );
}