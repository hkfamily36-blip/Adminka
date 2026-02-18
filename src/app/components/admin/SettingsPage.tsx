import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Users,
  Shield,
  Bell,
  Palette,
  Globe,
  Mail,
  Key,
  Plus,
  Trash2,
  Edit2,
  MoreVertical,
  X,
  XCircle,
  Save,
  CheckCircle,
  Crown,
  UserCog,
  Eye,
  Settings,
  ChevronDown
} from 'lucide-react';

type SettingsTab = 'team' | 'general' | 'notifications' | 'appearance' | 'integrations';

type Role = 'architect' | 'admin' | 'curator';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
  addedAt: string;
  lastActive: string;
}

const MOCK_TEAM_MEMBERS: TeamMember[] = [
  {
    id: '1',
    name: 'Сухарева Анастасия',
    email: 'anastasia@example.com',
    role: 'architect',
    addedAt: '2024-01-01T00:00:00',
    lastActive: '2026-02-17T15:30:00',
  },
  {
    id: '2',
    name: 'Мария Администратор',
    email: 'maria.admin@example.com',
    role: 'admin',
    addedAt: '2024-02-15T00:00:00',
    lastActive: '2026-02-17T14:20:00',
  },
  {
    id: '3',
    name: 'Елена Куратор',
    email: 'elena.curator@example.com',
    role: 'curator',
    addedAt: '2024-03-10T00:00:00',
    lastActive: '2026-02-16T18:45:00',
  },
  {
    id: '4',
    name: 'Дмитрий Куратор',
    email: 'dmitry.curator@example.com',
    role: 'curator',
    addedAt: '2024-05-20T00:00:00',
    lastActive: '2026-02-15T12:10:00',
  },
];

const ROLE_INFO = {
  architect: {
    label: 'Архитектор',
    description: 'Владелец системы. Полный доступ ко всем модулям, включая управление командой и глобальными настройками.',
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    icon: Crown,
    permissions: [
      'Полный доступ ко всем модулям системы',
      'Добавление и удаление пользователей панели управления',
      'Назначение и изменение ролей (Администратор, Куратор)',
      'Управление глобальными настройками системы',
      'Управление контентом (курсы, уроки, материалы)',
      'Управление учениками и их данными',
      'Доступ к финансовой отчетности',
      'Управление тарифами и подписками'
    ],
  },
  admin: {
    label: 'Администратор',
    description: 'Полный доступ к управлению платформой. Может создавать, редактировать контент и управлять учениками.',
    color: 'text-violet-600',
    bgColor: 'bg-violet-50',
    borderColor: 'border-violet-200',
    icon: Shield,
    permissions: [
      'Создание, редактирование и удаление контента',
      'Управление модулями и уроками',
      'Управление учениками и их прогрессом',
      'Назначение тарифов и курсов ученикам',
      'Просмотр финансовой отчетности',
      'Управление email-рассылками',
      'Доступ к системе поддержки',
      'Просмотр логов активности'
    ],
  },
  curator: {
    label: 'Куратор',
    description: 'Ограниченный доступ (Read-Only). Может просматривать список учеников и отслеживать их успеваемость.',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    icon: Eye,
    permissions: [
      'Просмотр списка учеников',
      'Просмотр карточек пользователей',
      'Отслеживание прогресса учеников',
      'Просмотр назначенных курсов и уроков',
      'Просмотр истории активности учеников',
      '❌ Редактирование данных запрещено',
      '❌ Управление контентом запрещено',
      '❌ Изменение настроек запрещено'
    ],
  },
};

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('team');
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(MOCK_TEAM_MEMBERS);
  const [isAddingMember, setIsAddingMember] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [showRoleInfo, setShowRoleInfo] = useState<Role | null>(null);

  const tabs = [
    { id: 'team' as const, label: 'Команда', icon: Users },
  ];

  const getRoleIcon = (role: Role) => {
    const Icon = ROLE_INFO[role].icon;
    return <Icon size={20} className={ROLE_INFO[role].color} />;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'team' && (
          <motion.div
            key="team"
            className="space-y-4 md:space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {/* Header */}
            <div className="bg-white rounded-xl md:rounded-2xl p-4 sm:p-6 shadow-lg border border-slate-200">
              <div className="flex flex-col sm:flex-row items-start justify-between gap-4 mb-4 md:mb-6">
                <div className="flex-1 w-full sm:w-auto">
                  <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-2">Управление командой</h2>
                </div>
                <button
                  onClick={() => setIsAddingMember(true)}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 md:py-2 bg-violet-600 text-white rounded-xl hover:bg-violet-700 transition-all shadow-lg shadow-violet-200 text-sm md:text-base whitespace-nowrap"
                >
                  <Plus size={20} />
                  Добавить
                </button>
              </div>

              {/* Role Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                {(Object.keys(ROLE_INFO) as Role[]).map((role) => {
                  const info = ROLE_INFO[role];
                  const Icon = info.icon;
                  const count = teamMembers.filter((m) => m.role === role).length;

                  return (
                    <motion.div
                      key={role}
                      className={`p-3 md:p-4 rounded-xl border-2 ${info.borderColor} ${info.bgColor} cursor-pointer hover:shadow-lg transition-all`}
                      onClick={() => setShowRoleInfo(role)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center gap-2 md:gap-3 mb-2">
                        <div className={`p-1.5 md:p-2 rounded-lg bg-white flex-shrink-0`}>
                          <Icon size={20} className={`md:w-6 md:h-6 ${info.color}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className={`font-bold text-sm md:text-base ${info.color} truncate`}>{info.label}</h3>
                          <p className="text-xs text-slate-600">{count} {count === 1 ? 'пользователь' : 'пользователя'}</p>
                        </div>
                      </div>
                      <p className="text-xs md:text-sm text-slate-600 line-clamp-2">{info.description}</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Team Members List */}
            <div className="bg-white rounded-xl md:rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
              <div className="p-4 sm:p-6 border-b border-slate-200">
                <h3 className="text-lg md:text-xl font-bold text-slate-800">Члены команды ({teamMembers.length})</h3>
              </div>
              <div className="divide-y divide-slate-200">
                {teamMembers.map((member, idx) => {
                  const roleInfo = ROLE_INFO[member.role];
                  const Icon = roleInfo.icon;

                  return (
                    <motion.div
                      key={member.id}
                      className="p-4 sm:p-6 hover:bg-slate-50 transition-colors"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 md:gap-4">
                        {/* Avatar */}
                        <div className={`w-12 h-12 md:w-14 md:h-14 rounded-full ${roleInfo.bgColor} flex items-center justify-center flex-shrink-0`}>
                          <span className={`text-lg md:text-xl font-bold ${roleInfo.color}`}>
                            {member.name.charAt(0)}
                          </span>
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0 w-full sm:w-auto">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <h4 className="font-semibold text-sm md:text-base text-slate-800">{member.name}</h4>
                            {member.role === 'architect' && (
                              <span className="flex items-center gap-1 px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">
                                <Crown size={12} />
                                Владелец
                              </span>
                            )}
                          </div>
                          <p className="text-xs md:text-sm text-slate-600 mb-1 break-all">{member.email}</p>
                          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                            <span>Добавлен: {formatDate(member.addedAt)}</span>
                            <span className="hidden sm:inline">•</span>
                            <span>Активность: {formatDateTime(member.lastActive)}</span>
                          </div>
                        </div>

                        {/* Role Badge & Actions - Mobile: column, Desktop: row */}
                        <div className="flex flex-row sm:flex-row items-center gap-2 w-full sm:w-auto">
                          {/* Role Badge */}
                          <div className={`flex-1 sm:flex-none px-3 md:px-4 py-2 rounded-lg ${roleInfo.bgColor} border ${roleInfo.borderColor}`}>
                            <div className="flex items-center justify-center sm:justify-start gap-2">
                              <Icon size={16} className={roleInfo.color} />
                              <span className={`text-xs md:text-sm font-semibold ${roleInfo.color}`}>
                                {roleInfo.label}
                              </span>
                            </div>
                          </div>

                          {/* Actions */}
                          {member.role !== 'architect' && (
                            <div className="flex items-center gap-1 sm:gap-2">
                              <button
                                onClick={() => setSelectedMember(member)}
                                className="p-2 hover:bg-slate-200 rounded-lg transition-colors"
                                title="Редактировать"
                              >
                                <Edit2 size={16} className="md:w-[18px] md:h-[18px] text-slate-600" />
                              </button>
                              <button
                                className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                                title="Удалить"
                              >
                                <Trash2 size={16} className="md:w-[18px] md:h-[18px] text-red-600" />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'general' && (
          <motion.div
            key="general"
            className="bg-white rounded-xl md:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-4 md:mb-6">Основные настройки</h2>
            <p className="text-sm md:text-base text-slate-600">Здесь будут основные настройки платформы...</p>
          </motion.div>
        )}

        {activeTab === 'notifications' && (
          <motion.div
            key="notifications"
            className="bg-white rounded-xl md:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-4 md:mb-6">Уведомления</h2>
            <p className="text-sm md:text-base text-slate-600">Настройки уведомлений...</p>
          </motion.div>
        )}

        {activeTab === 'appearance' && (
          <motion.div
            key="appearance"
            className="bg-white rounded-xl md:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-4 md:mb-6">Оформление</h2>
            <p className="text-sm md:text-base text-slate-600">Настройки внешнего вида...</p>
          </motion.div>
        )}

        {activeTab === 'integrations' && (
          <motion.div
            key="integrations"
            className="bg-white rounded-xl md:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-4 md:mb-6">Интеграции</h2>
            <p className="text-sm md:text-base text-slate-600">Подключение внешних сервисов...</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Role Info Modal */}
      <AnimatePresence>
        {showRoleInfo && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowRoleInfo(null)}
            />
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <div className="bg-white rounded-xl md:rounded-2xl p-4 sm:p-6 md:p-8 max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex items-start justify-between mb-4 md:mb-6">
                  <div className="flex items-start gap-3 md:gap-4 flex-1 min-w-0 pr-2">
                    <div className={`p-2 md:p-3 rounded-xl ${ROLE_INFO[showRoleInfo].bgColor} flex-shrink-0`}>
                      {getRoleIcon(showRoleInfo)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl md:text-2xl font-bold text-slate-800 break-words">
                        {ROLE_INFO[showRoleInfo].label}
                      </h3>
                      <p className="text-sm md:text-base text-slate-600 mt-1">
                        {ROLE_INFO[showRoleInfo].description}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowRoleInfo(null)}
                    className="p-2 hover:bg-slate-100 rounded-lg transition-colors flex-shrink-0"
                  >
                    <X size={20} className="md:w-6 md:h-6 text-slate-600" />
                  </button>
                </div>

                <div className="space-y-2 md:space-y-3">
                  <h4 className="font-semibold text-slate-800 text-base md:text-lg mb-3 md:mb-4">Права доступа:</h4>
                  {ROLE_INFO[showRoleInfo].permissions.map((permission, idx) => (
                    <motion.div
                      key={idx}
                      className="flex items-start gap-2 md:gap-3 p-2 md:p-3 bg-slate-50 rounded-lg"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      {permission.startsWith('❌') ? (
                        <XCircle size={18} className="md:w-5 md:h-5 text-red-500 flex-shrink-0 mt-0.5" />
                      ) : (
                        <CheckCircle size={18} className="md:w-5 md:h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      )}
                      <span className="text-xs md:text-sm text-slate-700 flex-1">{permission.replace('❌ ', '')}</span>
                    </motion.div>
                  ))}
                </div>

                <button
                  onClick={() => setShowRoleInfo(null)}
                  className="mt-4 md:mt-6 w-full px-4 py-2.5 md:py-3 bg-violet-600 text-white rounded-xl hover:bg-violet-700 transition-all text-sm md:text-base"
                >
                  Понятно
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Add Member Modal */}
      <AnimatePresence>
        {isAddingMember && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddingMember(false)}
            />
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <div className="bg-white rounded-xl md:rounded-2xl p-4 sm:p-6 md:p-8 max-w-xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-4 md:mb-6">
                  <h3 className="text-xl md:text-2xl font-bold text-slate-800">Добавить члена команды</h3>
                  <button
                    onClick={() => setIsAddingMember(false)}
                    className="p-2 hover:bg-slate-100 rounded-lg transition-colors flex-shrink-0"
                  >
                    <X size={20} className="md:w-6 md:h-6 text-slate-600" />
                  </button>
                </div>

                <form className="space-y-3 md:space-y-4">
                  <div>
                    <label className="block text-xs md:text-sm font-semibold text-slate-700 mb-2">
                      Имя
                    </label>
                    <input
                      type="text"
                      placeholder="Введите имя"
                      className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 text-sm md:text-base"
                    />
                  </div>

                  <div>
                    <label className="block text-xs md:text-sm font-semibold text-slate-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="email@example.com"
                      className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 text-sm md:text-base"
                    />
                  </div>

                  <div>
                    <label className="block text-xs md:text-sm font-semibold text-slate-700 mb-2">
                      Роль
                    </label>
                    <select className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 text-sm md:text-base">
                      <option value="admin">Администратор</option>
                      <option value="curator">Куратор</option>
                    </select>
                    <p className="text-xs text-slate-500 mt-2">
                      Роль "Архитектор" может быть только одна и назначается владельцем системы.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 md:gap-3 mt-4 md:mt-6">
                    <button
                      type="button"
                      onClick={() => setIsAddingMember(false)}
                      className="flex-1 px-4 py-2.5 md:py-3 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-all text-sm md:text-base"
                    >
                      Отмена
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-4 py-2.5 md:py-3 bg-violet-600 text-white rounded-xl hover:bg-violet-700 transition-all flex items-center justify-center gap-2 text-sm md:text-base"
                    >
                      <Save size={18} className="md:w-5 md:h-5" />
                      Добавить
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Edit Member Modal */}
      <AnimatePresence>
        {selectedMember && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMember(null)}
            />
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <div className="bg-white rounded-xl md:rounded-2xl p-4 sm:p-6 md:p-8 max-w-xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-4 md:mb-6">
                  <h3 className="text-xl md:text-2xl font-bold text-slate-800">Редактировать роль</h3>
                  <button
                    onClick={() => setSelectedMember(null)}
                    className="p-2 hover:bg-slate-100 rounded-lg transition-colors flex-shrink-0"
                  >
                    <X size={20} className="md:w-6 md:h-6 text-slate-600" />
                  </button>
                </div>

                <div className="mb-4 md:mb-6 p-3 md:p-4 bg-slate-50 rounded-xl">
                  <p className="text-xs md:text-sm text-slate-600 mb-1">Пользователь</p>
                  <p className="font-semibold text-sm md:text-base text-slate-800">{selectedMember.name}</p>
                  <p className="text-xs md:text-sm text-slate-600 break-all">{selectedMember.email}</p>
                </div>

                <form className="space-y-3 md:space-y-4">
                  <div>
                    <label className="block text-xs md:text-sm font-semibold text-slate-700 mb-2">
                      Новая роль
                    </label>
                    <select
                      defaultValue={selectedMember.role}
                      className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 text-sm md:text-base"
                    >
                      <option value="admin">Администратор</option>
                      <option value="curator">Куратор</option>
                    </select>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 md:gap-3 mt-4 md:mt-6">
                    <button
                      type="button"
                      onClick={() => setSelectedMember(null)}
                      className="flex-1 px-4 py-2.5 md:py-3 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-all text-sm md:text-base"
                    >
                      Отмена
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-4 py-2.5 md:py-3 bg-violet-600 text-white rounded-xl hover:bg-violet-700 transition-all flex items-center justify-center gap-2 text-sm md:text-base"
                    >
                      <Save size={18} className="md:w-5 md:h-5" />
                      Сохранить
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}