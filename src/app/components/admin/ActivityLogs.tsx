import { useState } from 'react';
import { motion } from 'motion/react';
import { Activity, User, FileText, Trash2, Ban, CheckCircle, Filter } from 'lucide-react';
import { ActivityLog } from '../../types/rbac';

const MOCK_LOGS: ActivityLog[] = [
  {
    id: '1',
    userId: '4',
    userName: 'Елена Соколова',
    action: 'Создала урок',
    resource: 'Распаковка личности',
    timestamp: '2026-02-08T14:30:00',
    details: 'Добавлен видеоурок в модуль "Аутентичность"',
  },
  {
    id: '2',
    userId: '4',
    userName: 'Елена Соколова',
    action: 'Обновила урок',
    resource: 'Мышление предпринимателя',
    timestamp: '2026-02-08T13:15:00',
    details: 'Изменено описание урока',
  },
  {
    id: '3',
    userId: 'admin-1',
    userName: 'Анастасия Сухарева',
    action: 'Заблокировала пользователя',
    resource: 'Игорь Волков',
    timestamp: '2026-02-08T11:45:00',
    details: 'Причина: нарушение правил платформы',
  },
  {
    id: '4',
    userId: '4',
    userName: 'Елена Соколова',
    action: 'Удалила комментарий',
    resource: 'Урок 1.2',
    timestamp: '2026-02-08T10:20:00',
    details: 'Удален спам-комментарий',
  },
  {
    id: '5',
    userId: 'admin-1',
    userName: 'Анастасия Сухарева',
    action: 'Создала нового пользователя',
    resource: 'Анна Кузнецова',
    timestamp: '2026-02-07T16:30:00',
    details: 'Добавлен пользователь с тарифом "Куратор"',
  },
  {
    id: '6',
    userId: '4',
    userName: 'Елена Соколова',
    action: 'Обновила модуль',
    resource: 'Модуль 2: Ниша',
    timestamp: '2026-02-07T14:00:00',
    details: 'Добавлено 3 новых урока',
  },
];

type ActionFilter = 'all' | 'create' | 'update' | 'delete' | 'block';

export function ActivityLogs() {
  const [actionFilter, setActionFilter] = useState<ActionFilter>('all');
  const [dateFilter, setDateFilter] = useState('today');

  const getActionIcon = (action: string) => {
    if (action.includes('Создал')) return <CheckCircle size={16} className="text-green-600" />;
    if (action.includes('Обновил')) return <Activity size={16} className="text-blue-600" />;
    if (action.includes('Удалил')) return <Trash2 size={16} className="text-red-600" />;
    if (action.includes('Заблокировал')) return <Ban size={16} className="text-orange-600" />;
    return <FileText size={16} className="text-slate-600" />;
  };

  const getActionColor = (action: string) => {
    if (action.includes('Создал')) return 'bg-green-50 border-green-200';
    if (action.includes('Обновил')) return 'bg-blue-50 border-blue-200';
    if (action.includes('Удалил')) return 'bg-red-50 border-red-200';
    if (action.includes('Заблокировал')) return 'bg-orange-50 border-orange-200';
    return 'bg-slate-50 border-slate-200';
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffHours < 1) {
      const diffMins = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
      return `${diffMins} мин назад`;
    }
    if (diffHours < 24) return `${diffHours} ч назад`;
    return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
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
              <option value="create">Создание</option>
              <option value="update">Обновление</option>
              <option value="delete">Удаление</option>
              <option value="block">Блокировка</option>
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
              <option value="today">Сегодня</option>
              <option value="week">Неделя</option>
              <option value="month">Месяц</option>
              <option value="all">Всё время</option>
            </select>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2 text-sm text-slate-600">
          <Activity size={16} />
          <span>Всего событий: <strong className="text-violet-600">{MOCK_LOGS.length}</strong></span>
        </div>
      </motion.div>

      {/* Logs Timeline */}
      <motion.div
        className="space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {MOCK_LOGS.map((log, idx) => (
          <motion.div
            key={log.id}
            className={`bg-white rounded-2xl p-6 shadow-lg border-l-4 ${getActionColor(log.action)}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
            whileHover={{ x: 4 }}
          >
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div className={`p-3 rounded-xl ${
                log.action.includes('Создал') ? 'bg-green-100' :
                log.action.includes('Обновил') ? 'bg-blue-100' :
                log.action.includes('Удалил') ? 'bg-red-100' :
                log.action.includes('Заблокировал') ? 'bg-orange-100' :
                'bg-slate-100'
              }`}>
                {getActionIcon(log.action)}
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
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Empty State */}
      {MOCK_LOGS.length === 0 && (
        <div className="bg-white rounded-2xl p-12 shadow-lg text-center">
          <Activity size={48} className="mx-auto text-slate-300 mb-4" />
          <p className="text-slate-500 text-lg">Логи не найдены</p>
        </div>
      )}
    </div>
  );
}
