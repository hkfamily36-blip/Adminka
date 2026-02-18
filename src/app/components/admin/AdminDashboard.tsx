import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLocation, useNavigate } from 'react-router';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Activity,
  DollarSign,
  Mail,
  Settings,
  LogOut,
  Menu,
  X,
  TrendingUp,
  UserCheck,
  Clock,
  AlertCircle,
  MessageCircle,
  GraduationCap,
  Tag,
  ChevronDown
} from 'lucide-react';

// Auth context import
import { useAuth } from '../../contexts/AuthContext';

// Component imports
import { UserTable } from './UserTable';
import { ContentManager } from './ContentManager';
import { TariffConstructor } from './TariffConstructor';
import { ActivityLogs } from './ActivityLogs';
import { FinanceDashboard } from './FinanceDashboard';
import { EmailManagement } from './EmailManagement';
import { Helpdesk } from './Helpdesk';
import { SettingsPage } from './SettingsPage';
import { CreateLessonPage } from '../../pages/CreateLessonPage';
import { EditLessonPage } from '../../pages/EditLessonPage';

type AdminPage = 
  | 'overview' 
  | 'users' 
  | 'learning' 
  | 'tariffs' 
  | 'logs' 
  | 'finance' 
  | 'emails' 
  | 'helpdesk' 
  | 'team';

interface MenuItem {
  id: string;
  label: string;
  icon: any;
  show: boolean;
  children?: MenuItem[];
}

export function AdminDashboard({ onExit }: { onExit: () => void }) {
  const { currentUser, isSuperAdmin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState<AdminPage>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    'learning-tariffs': true, // По умолчанию раскрыта
  });

  console.log('=== ADMIN DASHBOARD DEBUG ===');
  console.log('Current location:', location.pathname);
  console.log('Search params:', location.search);

  // Проверяем, если это страница создания/редактирования урока
  const isLessonEditorRoute = location.pathname.startsWith('/admin/lessons');
  
  if (isLessonEditorRoute) {
    console.log('Detected lesson editor route, rendering appropriate page');
  }

  // Если пользователь не на странице редактора урока, но URL начинается с /admin/lessons,
  // это означает, что он случайно попал сюда (например, через историю браузера)
  // В этом случае перенаправляем на главную страницу
  useEffect(() => {
    // Только если мы НЕ в процессе создания или редактирования урока
    // и URL содержит /admin/lessons, очищаем его
    if (!isLessonEditorRoute && location.pathname !== '/' && !location.pathname.startsWith('/admin')) {
      console.log('Clearing invalid lesson editor URL, redirecting to home');
      navigate('/', { replace: true });
    }
  }, []);

  const menuItems: MenuItem[] = [
    { id: 'overview', label: 'Обзор', icon: LayoutDashboard, show: true },
    { id: 'users', label: 'Пользователи', icon: Users, show: true },
    { 
      id: 'learning-tariffs', 
      label: 'Обучение и тарифы', 
      icon: BookOpen, 
      show: true,
      children: [
        { id: 'learning', label: 'Обучение', icon: GraduationCap, show: true },
        { id: 'tariffs', label: 'Тарифы', icon: Tag, show: true },
      ]
    },
    { id: 'logs', label: 'Логи', icon: Activity, show: true },
    { id: 'finance', label: 'Финансы', icon: DollarSign, show: isSuperAdmin },
    { id: 'emails', label: 'Email-шаблоны', icon: Mail, show: isSuperAdmin },
    { id: 'helpdesk', label: 'Поддержка', icon: MessageCircle, show: isSuperAdmin },
    { 
      id: 'settings-category', 
      label: 'Настройки', 
      icon: Settings, 
      show: isSuperAdmin,
      children: [
        { id: 'team', label: 'Команда', icon: Users, show: true },
      ]
    },
  ].filter(item => item.show);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  const handleMenuItemClick = (item: MenuItem) => {
    if (item.children) {
      toggleCategory(item.id);
    } else {
      setActivePage(item.id as AdminPage);
    }
  };

  // Если мы на странице редактора урока, показываем только её
  if (isLessonEditorRoute) {
    console.log('Rendering lesson editor page');
    
    if (location.pathname === '/admin/lessons/create') {
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-violet-50 to-fuchsia-50">
          <CreateLessonPage />
        </div>
      );
    }
    
    if (location.pathname.match(/^\/admin\/lessons\/[^/]+\/edit$/)) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-violet-50 to-fuchsia-50">
          <EditLessonPage />
        </div>
      );
    }
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 via-violet-50 to-fuchsia-50 overflow-hidden">
      {/* Sidebar - скрываем для Helpdesk */}
      {activePage !== 'helpdesk' && (
        <motion.aside
          className={`relative bg-gradient-to-b from-[#2E1065] via-[#4C1D95] to-[#5B21B6] text-white ${
            sidebarOpen ? 'w-64' : 'w-20'
          } transition-all duration-300 shadow-2xl`}
          initial={{ x: -100 }}
          animate={{ x: 0 }}
        >
          {/* Космические эффекты */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-[1px] h-[1px] bg-white rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                }}
              />
            ))}
          </div>

          <div className="relative z-10 flex flex-col h-full">
            {/* Header */}
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center justify-between mb-4">
                {sidebarOpen && (
                  <h2 className="text-xl font-bold bg-gradient-to-r from-pink-200 to-violet-200 bg-clip-text text-transparent">
                    Админ-панель
                  </h2>
                )}
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
              </div>
              {sidebarOpen && (
                <div className="flex items-center gap-3">
                  <img 
                    src={currentUser.avatar} 
                    alt={currentUser.name}
                    className="w-10 h-10 rounded-full border-2 border-pink-300"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm truncate">{currentUser.name}</p>
                    <p className="text-xs text-violet-200">{
                      currentUser.role === 'super_admin' ? 'Super Admin' : 'Менеджер'
                    }</p>
                  </div>
                </div>
              )}
            </div>

            {/* Menu Items */}
            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activePage === item.id;
                const isExpanded = expandedCategories[item.id];
                
                return (
                  <div key={item.id}>
                    {/* Parent Item */}
                    <motion.button
                      onClick={() => handleMenuItemClick(item)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                        isActive && !item.children
                          ? 'bg-white/20 shadow-lg'
                          : 'hover:bg-white/10'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Icon size={20} />
                      {sidebarOpen && (
                        <>
                          <span className="font-medium text-sm flex-1 text-left">{item.label}</span>
                          {item.children && (
                            <motion.div
                              animate={{ rotate: isExpanded ? 180 : 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <ChevronDown size={16} />
                            </motion.div>
                          )}
                        </>
                      )}
                      {isActive && !item.children && (
                        <motion.div
                          className="ml-auto w-2 h-2 bg-pink-300 rounded-full"
                          layoutId="activeIndicator"
                        />
                      )}
                    </motion.button>

                    {/* Children Items */}
                    {item.children && sidebarOpen && (
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="pl-4 mt-2 space-y-1">
                              {item.children.map((child) => {
                                const ChildIcon = child.icon;
                                const isChildActive = activePage === child.id;
                                
                                return (
                                  <motion.button
                                    key={child.id}
                                    onClick={() => setActivePage(child.id as AdminPage)}
                                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all text-sm ${
                                      isChildActive
                                        ? 'bg-white/20 shadow-md'
                                        : 'hover:bg-white/10'
                                    }`}
                                    whileHover={{ scale: 1.02, x: 2 }}
                                    whileTap={{ scale: 0.98 }}
                                  >
                                    <ChildIcon size={18} className="opacity-80" />
                                    <span className="font-medium">{child.label}</span>
                                    {isChildActive && (
                                      <motion.div
                                        className="ml-auto w-1.5 h-1.5 bg-pink-300 rounded-full"
                                        layoutId="activeIndicator"
                                      />
                                    )}
                                  </motion.button>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Exit Button */}
            <div className="p-4 border-t border-white/10">
              <motion.button
                onClick={onExit}
                className="w-full flex items-center gap-3 px-4 py-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <LogOut size={20} />
                {sidebarOpen && <span className="font-medium text-sm">Выйти в ЛК</span>}
              </motion.button>
            </div>
          </div>
        </motion.aside>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {activePage === 'helpdesk' ? (
          <Helpdesk onBack={() => setActivePage('overview')} />
        ) : (
          <div className="max-w-7xl mx-auto p-8">
            {/* Header */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-4xl font-bold bg-gradient-to-r from-[#2E1065] via-[#7C3AED] to-[#EC4899] bg-clip-text text-transparent mb-2">
                {(() => {
                  // Ищем в основном меню
                  const mainItem = menuItems.find(item => item.id === activePage);
                  if (mainItem) return mainItem.label;
                  
                  // Ищем в подкатегориях
                  for (const item of menuItems) {
                    if (item.children) {
                      const childItem = item.children.find(child => child.id === activePage);
                      if (childItem) return childItem.label;
                    }
                  }
                  return '';
                })()}
              </h1>
              <p className="text-slate-600">
                {activePage === 'overview' && 'Основная статистика и аналитика'}
                {activePage === 'users' && 'Управление пользователями платформы'}
                {activePage === 'learning' && 'Управление контентом обучения'}
                {activePage === 'tariffs' && 'Настройка тарифных планов'}
                {activePage === 'logs' && 'История действий пользователей'}
                {activePage === 'finance' && 'Финансовая аналитика и отчёты'}
                {activePage === 'emails' && 'Управление email-шаблонами'}
                {activePage === 'team' && 'Управление командой администраторов'}
              </p>
            </motion.div>

            {/* Page Content */}
            <motion.div
              key={activePage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {activePage === 'overview' && <OverviewPage onNavigate={setActivePage} onOpenAddUser={() => {
                setActivePage('users');
                setShowAddUserModal(true);
              }} />}
              {activePage === 'users' && <UserTable triggerAddUser={showAddUserModal} onAddUserComplete={() => setShowAddUserModal(false)} onOpenAddUser={() => setShowAddUserModal(true)} />}
              {activePage === 'learning' && <ContentManager />}
              {activePage === 'tariffs' && <TariffConstructor />}
              {activePage === 'logs' && <ActivityLogs />}
              {activePage === 'finance' && <FinanceDashboard />}
              {activePage === 'emails' && <EmailManagement />}
              {activePage === 'team' && <SettingsPage />}
            </motion.div>
          </div>
        )}
      </main>
    </div>
  );
}

// Placeholder components
function OverviewPage({ onNavigate, onOpenAddUser }: { onNavigate: (page: AdminPage) => void; onOpenAddUser: () => void }) {
  const { isSuperAdmin } = useAuth();
  
  const stats = [
    { label: 'Всего пользователей', value: '1,234', change: '+12%', icon: Users, color: 'from-violet-500 to-purple-500' },
    { label: 'Активных студентов', value: '892', change: '+8%', icon: Activity, color: 'from-fuchsia-500 to-pink-500' },
    { label: 'Уроков создано', value: '156', change: '+5', icon: BookOpen, color: 'from-cyan-500 to-blue-500' },
    ...(isSuperAdmin ? [{ label: 'Выручка за месяц', value: '₽485,200', change: '+23%', icon: DollarSign, color: 'from-amber-500 to-orange-500' }] : []),
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={idx}
              className="relative bg-white rounded-2xl p-6 shadow-lg overflow-hidden group hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-5 group-hover:opacity-10 transition-opacity`}></div>
              <div className="relative">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} shadow-lg`}>
                    <Icon size={24} className="text-white" />
                  </div>
                  <span className="text-sm font-semibold text-green-600">{stat.change}</span>
                </div>
                <h3 className="text-3xl font-bold text-slate-800 mb-1">{stat.value}</h3>
                <p className="text-sm text-slate-600">{stat.label}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <motion.div
        className="bg-white rounded-2xl p-6 shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-xl font-bold text-slate-800 mb-4">Быстрые действия</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <motion.button 
            className="p-4 bg-gradient-to-br from-violet-50 to-purple-50 hover:from-violet-100 hover:to-purple-100 rounded-xl transition-colors text-left" 
            onClick={() => {
              onNavigate('users');
              onOpenAddUser();
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Users className="mb-2 text-violet-600" size={24} />
            <p className="font-semibold text-sm text-slate-800">Добавить пользователя</p>
          </motion.button>
          <motion.button 
            className="p-4 bg-gradient-to-br from-fuchsia-50 to-pink-50 hover:from-fuchsia-100 hover:to-pink-100 rounded-xl transition-colors text-left"
            onClick={() => onNavigate('learning')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <BookOpen className="mb-2 text-fuchsia-600" size={24} />
            <p className="font-semibold text-sm text-slate-800">Создать урок</p>
          </motion.button>
          <motion.button 
            className="p-4 bg-gradient-to-br from-cyan-50 to-blue-50 hover:from-cyan-100 hover:to-blue-100 rounded-xl transition-colors text-left"
            onClick={() => onNavigate('logs')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Activity className="mb-2 text-cyan-600" size={24} />
            <p className="font-semibold text-sm text-slate-800">Просмотр логов</p>
          </motion.button>
          {isSuperAdmin && (
            <motion.button 
              className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100 rounded-xl transition-colors text-left"
              onClick={() => onNavigate('finance')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <DollarSign className="mb-2 text-amber-600" size={24} />
              <p className="font-semibold text-sm text-slate-800">Финансовый отчёт</p>
            </motion.button>
          )}
        </div>
      </motion.div>
    </div>
  );
}