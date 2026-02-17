import { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Ban, 
  CheckCircle, 
  Eye, 
  Trash2, 
  Plus,
  X,
  Save,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  UserPlus,
  Calendar,
  Mail,
  MessageCircle,
  UserCog,
  Briefcase,
  Download,
  Upload,
  FileSpreadsheet
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { UserDetailPanel } from './UserDetailPanel';
import { UserAvatar } from './UserAvatar';
import type { User } from '../../types/rbac';
import { getTariffLabel } from '../../config/tariffs';
import type { TariffKey } from '../../config/tariffs';
import * as XLSX from 'xlsx';

// Mock data
const INITIAL_USERS: User[] = [
  {
    id: '1',
    name: 'Алексей Смирнов',
    email: 'alexey@example.com',
    avatar: 'https://images.unsplash.com/photo-1629507208649-70919ca33793?w=150',
    role: 'user',
    tariff: 'curator',
    status: 'active',
    registeredAt: '2025-11-15',
    lastLogin: '2026-02-07',
    revenue: 45000,
    completedLessons: 12,
    phone: '+7 (999) 123-45-67',
    city: 'Москва',
    accessUntil: '2026-11-15',
    manager: 'Елена Соколова',
    profession: 'Психолог',
    telegramNick: 'alexey_psy',
  },
  {
    id: '2',
    name: 'Мария Петрова',
    email: 'maria@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    role: 'user',
    tariff: 'standard',
    status: 'active',
    registeredAt: '2025-12-01',
    lastLogin: '2026-02-08',
    revenue: 25000,
    completedLessons: 8,
    phone: '+7 (999) 234-56-78',
    city: 'Санкт-Петербург',
    accessUntil: '2026-12-01',
    manager: 'Анастасия Сухарева',
    profession: 'Бизнес-коуч',
    telegramNick: 'maria_coach',
  },
  {
    id: '3',
    name: 'Дмитрий Иванов',
    email: 'dmitry@example.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    role: 'user',
    tariff: 'mentor',
    status: 'active',
    registeredAt: '2025-10-20',
    lastLogin: '2026-02-06',
    revenue: 85000,
    completedLessons: 24,
    phone: '+7 (999) 345-67-89',
    city: 'Казань',
    accessUntil: '2026-10-20',
    manager: 'Мария Иванова',
    profession: 'Бизнес-тренер',
    telegramNick: 'dmitry_trainer',
  },
  {
    id: '4',
    name: 'Елена Соколова',
    email: 'elena@example.com',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    role: 'manager',
    tariff: 'free',
    status: 'active',
    registeredAt: '2025-09-10',
    lastLogin: '2026-02-08',
    completedLessons: 0,
    phone: '+7 (999) 456-78-90',
    city: 'Новосибирск',
    profession: 'Менеджер по работе с клиентами',
    telegramNick: 'elena_manager',
  },
  {
    id: '5',
    name: 'Игорь Волков',
    email: 'igor@example.com',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    role: 'user',
    tariff: 'free',
    status: 'blocked',
    registeredAt: '2025-11-25',
    lastLogin: '2026-01-15',
    revenue: 0,
    completedLessons: 2,
    city: 'Екатеринбург',
    accessUntil: '2026-02-25',
    manager: 'Елена Соколова',
    profession: 'Психолог-консультант',
  },
  {
    id: '6',
    name: 'Анна Кузнецова',
    email: 'anna@example.com',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150',
    role: 'user',
    tariff: 'curator',
    status: 'active',
    registeredAt: '2025-12-10',
    lastLogin: '2026-02-07',
    revenue: 45000,
    completedLessons: 15,
    phone: '+7 (999) 567-89-01',
    city: 'Краснодар',
    accessUntil: '2026-12-10',
    manager: 'Анастасия Сухарева',
    profession: 'Консультант по развитию карьеры',
    telegramNick: 'anna_career',
  },
  {
    id: '7',
    name: 'Анастасия Сухарева',
    email: 'anastasia@example.com',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150',
    role: 'manager',
    tariff: 'free',
    status: 'active',
    registeredAt: '2025-08-20',
    lastLogin: '2026-02-09',
    completedLessons: 0,
    phone: '+7 (999) 678-90-12',
    city: 'Санкт-Петербург',
    profession: 'Старший менеджер',
    telegramNick: 'anastasia_mgr',
  },
  {
    id: '8',
    name: 'Мария Иванова',
    email: 'maria.ivanova@example.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    role: 'manager',
    tariff: 'free',
    status: 'active',
    registeredAt: '2025-09-05',
    lastLogin: '2026-02-09',
    completedLessons: 0,
    phone: '+7 (999) 789-01-23',
    city: 'Казань',
    profession: 'Менеджер по развитию',
    telegramNick: 'maria_iv_mgr',
  },
];

type TariffFilter = 'all' | 'free' | 'standard' | 'curator' | 'mentor';
type StatusFilter = 'all' | 'active' | 'blocked';
type SortField = 'name' | 'email' | 'tariff' | 'status' | 'registeredAt' | 'revenue' | 'completedLessons';
type SortDirection = 'asc' | 'desc' | null;

interface NewUserForm {
  firstName: string;
  lastName: string;
  email: string;
  tariff: string;
  accessUntil: string;
  manager: string;
  profession: string;
  telegramNick: string;
  isManager: boolean;
}

export function UserTable({ triggerAddUser, onAddUserComplete, onOpenAddUser }: { 
  triggerAddUser?: boolean; 
  onAddUserComplete?: () => void;
  onOpenAddUser?: () => void;
}) {
  const { isSuperAdmin } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [tariffFilter, setTariffFilter] = useState<TariffFilter>('all');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  
  const [newUser, setNewUser] = useState<NewUserForm>({
    firstName: '',
    lastName: '',
    email: '',
    tariff: 'standard',
    accessUntil: '',
    manager: '',
    profession: '',
    telegramNick: '',
    isManager: false,
  });

  // Список менеджеров формируется автоматически из пользователей с ролью 'manager'
  const managers = useMemo(() => {
    return users
      .filter(user => user.role === 'manager')
      .map(user => user.name);
  }, [users]);

  // Функция сортировки
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      // Переключаем направление: asc -> desc -> null
      if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else if (sortDirection === 'desc') {
        setSortDirection(null);
        setSortField(null);
      }
    } else {
      // Новое поле - начинаем с asc
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Иконка сортировки
  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) {
      return <ArrowUpDown size={16} className="text-slate-400" />;
    }
    if (sortDirection === 'asc') {
      return <ArrowUp size={16} className="text-violet-500" />;
    }
    if (sortDirection === 'desc') {
      return <ArrowDown size={16} className="text-violet-500" />;
    }
    return <ArrowUpDown size={16} className="text-slate-400" />;
  };

  // Фильтрация и сортировка пользователей
  const filteredUsers = useMemo(() => {
    let result = users.filter((user) => {
      // Поиск по имени и email
      const searchLower = searchQuery.toLowerCase().trim();
      const matchesSearch =
        user.name.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower);

      // Фильтр по тарифу
      const matchesTariff =
        tariffFilter === 'all' ||
        (tariffFilter === 'free' && user.tariff === 'free') ||
        (tariffFilter === 'standard' && user.tariff === 'standard') ||
        (tariffFilter === 'curator' && user.tariff === 'curator') ||
        (tariffFilter === 'mentor' && user.tariff === 'mentor');

      // Фильтр по статусу
      const matchesStatus = statusFilter === 'all' || user.status === statusFilter;

      return matchesSearch && matchesTariff && matchesStatus;
    });

    // Применяем сортировку
    if (sortField && sortDirection) {
      result.sort((a, b) => {
        let aValue: any = a[sortField];
        let bValue: any = b[sortField];

        // Специальная обработка для разных типов данных
        if (sortField === 'name' || sortField === 'email') {
          aValue = aValue.toLowerCase();
          bValue = bValue.toLowerCase();
        } else if (sortField === 'registeredAt') {
          aValue = new Date(aValue).getTime();
          bValue = new Date(bValue).getTime();
        } else if (sortField === 'revenue' || sortField === 'completedLessons') {
          aValue = aValue || 0;
          bValue = bValue || 0;
        }

        if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [users, searchQuery, tariffFilter, statusFilter, sortField, sortDirection]);

  // Блокировка/разблокировка пользователя
  const toggleUserStatus = (userId: string) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'active' ? 'blocked' : 'active' as const }
        : user
    ));
  };

  // Удаление пользователя (только для Super Admin)
  const deleteUser = (userId: string) => {
    if (confirm('Вы уверены, что хотите удалить этого пользователя?')) {
      setUsers(users.filter(user => user.id !== userId));
    }
  };

  // Добавление нового пользователя
  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    
    const fullName = `${newUser.firstName} ${newUser.lastName}`;
    const newUserData: User = {
      id: `user-${Date.now()}`,
      name: fullName,
      email: newUser.email,
      avatar: `https://images.unsplash.com/photo-${Math.random() > 0.5 ? '1494790108377-be9c29b29330' : '1507003211169-0a1dd7228f2d'}?w=150`,
      role: newUser.isManager ? 'manager' : 'user',
      tariff: newUser.tariff as any,
      status: 'active',
      registeredAt: new Date().toISOString().split('T')[0],
      lastLogin: new Date().toISOString().split('T')[0],
      revenue: newUser.tariff === 'free' ? 0 : newUser.tariff === 'standard' ? 25000 : newUser.tariff === 'curator' ? 45000 : 85000,
      completedLessons: 0,
    };

    setUsers([newUserData, ...users]);
    setNewUser({
      firstName: '',
      lastName: '',
      email: '',
      tariff: 'standard',
      accessUntil: '',
      manager: '',
      profession: '',
      telegramNick: '',
      isManager: false,
    });

    // Вызываем колбэк для закрытия модального окна
    if (onAddUserComplete) {
      onAddUserComplete();
    }
  };

  // Отправка приглашения пользователю
  const handleSendInvitation = () => {
    if (!newUser.email) {
      alert('Пожалуйста, введите email пользователя');
      return;
    }
    // Mock отправка приглашения
    alert(`Приглашение отправлено на ${newUser.email}`);
  };

  const getTariffBadge = (tariff: string) => {
    const styles = {
      free: 'bg-slate-100 text-slate-700',
      standard: 'bg-blue-100 text-blue-700',
      curator: 'bg-purple-100 text-purple-700',
      mentor: 'bg-pink-100 text-pink-700',
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[tariff as keyof typeof styles]}`}>
        {getTariffLabel(tariff as TariffKey)}
      </span>
    );
  };

  const getRoleBadge = (role: string) => {
    if (role === 'super_admin') return <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-violet-500 to-purple-500 text-white">Super Admin</span>;
    return null;
  };

  // Экспорт пользователей в Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(users.map(u => ({
      'Имя': u.name,
      'Email': u.email,
      'Тариф': getTariffLabel(u.tariff),
      'Статус': u.status === 'active' ? 'Активен' : 'Заблокирован',
      'Роль': u.isManager ? 'Менеджер' : 'Пользователь',
      'Дата регистрации': u.registeredAt,
      'Последняя активность': u.lastActive,
    })));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Пользователи');
    XLSX.writeFile(workbook, 'Пользователи.xlsx');
  };

  // Импорт пользователей из Excel
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showImportExportMenu, setShowImportExportMenu] = useState(false);
  
  const importUsersFromExcel = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[][];

        // Пропускаем заголовки
        const rows = jsonData.slice(1);
        
        const newUsers: User[] = rows
          .filter(row => row[1] && row[2]) // Проверяем наличие имени и email
          .map((row, index) => ({
            id: row[0] || `import-${Date.now()}-${index}`,
            name: row[1] || '',
            email: row[2] || '',
            avatar: row[3] || `https://images.unsplash.com/photo-${Math.random() > 0.5 ? '1494790108377-be9c29b29330' : '1507003211169-0a1dd7228f2d'}?w=150`,
            role: row[4] || 'user',
            tariff: row[5] || 'free',
            status: row[6] || 'active',
            registeredAt: row[7] || new Date().toISOString().split('T')[0],
            lastLogin: row[8] || new Date().toISOString().split('T')[0],
            revenue: row[9] || 0,
            completedLessons: row[10] || 0,
            phone: row[11] || undefined,
            city: row[12] || undefined,
            accessUntil: row[13] || undefined,
            manager: row[14] || undefined,
            profession: row[15] || undefined,
            telegramNick: row[16] || undefined,
          }));

        setUsers([...users, ...newUsers]);
      } catch (error) {
        console.error('Ошибка при импорте:', error);
      }
    };
    reader.readAsBinaryString(file);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      importUsersFromExcel(file);
      // Сбрасываем значение input, чтобы можно было загрузить тот же файл повторно
      e.target.value = '';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Add Button and Import/Export */}
      <motion.div
        className="flex items-center justify-between gap-4 flex-wrap"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <span>Всего пользователей: <strong className="text-violet-600">{users.length}</strong></span>
        </div>
        
        <div className="flex items-center gap-3 flex-wrap">
          {/* Import/Export dropdown menu */}
          <div className="relative">
            <input
              ref={fileInputRef}
              type="file"
              accept=".xlsx,.xls"
              onChange={handleFileUpload}
              className="hidden"
            />
            
            <motion.button
              onClick={() => setShowImportExportMenu(!showImportExportMenu)}
              className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-pink-50 to-purple-50 border-2 border-violet-200 hover:border-violet-300 text-violet-700 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FileSpreadsheet size={18} className="text-violet-600" />
              <span className="hidden sm:inline">Excel</span>
              <motion.div
                animate={{ rotate: showImportExportMenu ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-violet-600">
                  <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.div>
            </motion.button>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {showImportExportMenu && (
                <>
                  {/* Backdrop для закрытия меню */}
                  <div 
                    className="fixed inset-0 z-10" 
                    onClick={() => setShowImportExportMenu(false)}
                  />
                  
                  <motion.div
                    className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-xl border-2 border-violet-100 overflow-hidden z-20"
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.button
                      onClick={() => {
                        fileInputRef.current?.click();
                        setShowImportExportMenu(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gradient-to-r hover:from-pink-50 hover:to-purple-50 transition-colors"
                      whileHover={{ x: 4 }}
                    >
                      <div className="p-2 bg-gradient-to-br from-emerald-100 to-green-100 rounded-lg">
                        <Upload size={16} className="text-emerald-600" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-800">Импорт</p>
                        <p className="text-xs text-slate-500">Загрузить из Excel</p>
                      </div>
                    </motion.button>

                    <div className="h-px bg-gradient-to-r from-transparent via-violet-200 to-transparent" />

                    <motion.button
                      onClick={() => {
                        exportToExcel();
                        setShowImportExportMenu(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gradient-to-r hover:from-pink-50 hover:to-purple-50 transition-colors"
                      whileHover={{ x: 4 }}
                    >
                      <div className="p-2 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-lg">
                        <Download size={16} className="text-cyan-600" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-800">Экспорт</p>
                        <p className="text-xs text-slate-500">Скачать в Excel</p>
                      </div>
                    </motion.button>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          <motion.button
            onClick={() => onOpenAddUser && onOpenAddUser()}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-500 to-purple-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <UserPlus size={20} />
            <span className="hidden sm:inline">Добавить пользователя</span>
            <span className="sm:hidden">Добавить</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Filters and Search */}
      <motion.div
        className="bg-white rounded-2xl p-6 shadow-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Поиск по имени или email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-3">
            <select
              value={tariffFilter}
              onChange={(e) => setTariffFilter(e.target.value as TariffFilter)}
              className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all min-w-[180px]"
            >
              <option value="all">Все тарифы</option>
              <option value="free">{getTariffLabel('free')}</option>
              <option value="standard">{getTariffLabel('standard')}</option>
              <option value="curator">{getTariffLabel('curator')}</option>
              <option value="mentor">{getTariffLabel('mentor')}</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
              className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all min-w-[180px]"
            >
              <option value="all">Все статусы</option>
              <option value="active">Активные</option>
              <option value="blocked">Заблокированные</option>
            </select>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-6 flex gap-6 text-sm">
          <div>
            <span className="text-slate-600">Найдено:</span>
            <span className="ml-2 font-bold text-violet-600">{filteredUsers.length}</span>
          </div>
          <div>
            <span className="text-slate-600">Активных:</span>
            <span className="ml-2 font-bold text-green-600">
              {filteredUsers.filter(u => u.status === 'active').length}
            </span>
          </div>
          <div>
            <span className="text-slate-600">Заблокированных:</span>
            <span className="ml-2 font-bold text-red-600">
              {filteredUsers.filter(u => u.status === 'blocked').length}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Table - Desktop */}
      <motion.div
        className="hidden lg:block bg-white rounded-2xl shadow-lg overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-[#2E1065] to-[#5B21B6] text-white">
              <tr>
                <th className="px-6 py-4 text-left">
                  <button
                    onClick={() => handleSort('name')}
                    className="flex items-center gap-2 hover:text-pink-200 transition-colors"
                  >
                    <span className="text-sm font-semibold">Пользователь</span>
                    <SortIcon field="name" />
                  </button>
                </th>
                <th className="px-6 py-4 text-left">
                  <button
                    onClick={() => handleSort('tariff')}
                    className="flex items-center gap-2 hover:text-pink-200 transition-colors"
                  >
                    <span className="text-sm font-semibold">Тариф</span>
                    <SortIcon field="tariff" />
                  </button>
                </th>
                <th className="px-6 py-4 text-left">
                  <button
                    onClick={() => handleSort('status')}
                    className="flex items-center gap-2 hover:text-pink-200 transition-colors"
                  >
                    <span className="text-sm font-semibold">Статус</span>
                    <SortIcon field="status" />
                  </button>
                </th>
                <th className="px-6 py-4 text-left">
                  <button
                    onClick={() => handleSort('completedLessons')}
                    className="flex items-center gap-2 hover:text-pink-200 transition-colors"
                  >
                    <span className="text-sm font-semibold">Прогресс</span>
                    <SortIcon field="completedLessons" />
                  </button>
                </th>
                {isSuperAdmin && (
                  <th className="px-6 py-4 text-left">
                    <button
                      onClick={() => handleSort('revenue')}
                      className="flex items-center gap-2 hover:text-pink-200 transition-colors"
                    >
                      <span className="text-sm font-semibold">Выручка</span>
                      <SortIcon field="revenue" />
                    </button>
                  </th>
                )}
                <th className="px-6 py-4 text-left">
                  <button
                    onClick={() => handleSort('registeredAt')}
                    className="flex items-center gap-2 hover:text-pink-200 transition-colors"
                  >
                    <span className="text-sm font-semibold">Регистрация</span>
                    <SortIcon field="registeredAt" />
                  </button>
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <AnimatePresence mode="popLayout">
                {filteredUsers.map((user, idx) => (
                  <motion.tr
                    key={user.id}
                    onClick={() => setSelectedUser(user)}
                    className="hover:bg-violet-50 transition-colors cursor-pointer"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: idx * 0.03 }}
                    layout
                  >
                    {/* User Info */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <UserAvatar
                          src={user.avatar}
                          name={user.name}
                          size="md"
                          showBadge={user.role === 'manager'}
                          badgeContent="М"
                        />
                        <div>
                          <p className="font-semibold text-slate-800 flex items-center gap-2">
                            {user.name}
                            {getRoleBadge(user.role)}
                          </p>
                          <p className="text-sm text-slate-500">{user.email}</p>
                        </div>
                      </div>
                    </td>

                    {/* Tariff */}
                    <td className="px-6 py-4">
                      {getTariffBadge(user.tariff)}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      {user.status === 'active' ? (
                        <span className="flex items-center gap-2 text-green-600">
                          <CheckCircle size={16} />
                          <span className="text-sm font-semibold">Активен</span>
                        </span>
                      ) : (
                        <span className="flex items-center gap-2 text-red-600">
                          <Ban size={16} />
                          <span className="text-sm font-semibold">Заблокирован</span>
                        </span>
                      )}
                    </td>

                    {/* Progress */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-slate-200 rounded-full h-2 max-w-[100px]">
                          <div
                            className="bg-gradient-to-r from-violet-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${Math.min(100, (user.completedLessons || 0) * 5)}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-slate-600">{user.completedLessons || 0}</span>
                      </div>
                    </td>

                    {/* Revenue (Super Admin only) */}
                    {isSuperAdmin && (
                      <td className="px-6 py-4">
                        <span className="font-semibold text-slate-800">
                          {user.revenue ? `₽${user.revenue.toLocaleString()}` : '—'}
                        </span>
                      </td>
                    )}

                    {/* Registration */}
                    <td className="px-6 py-4">
                      <p className="text-sm text-slate-600">{new Date(user.registeredAt).toLocaleDateString('ru-RU')}</p>
                      <p className="text-xs text-slate-400">
                        Вход: {new Date(user.lastLogin).toLocaleDateString('ru-RU')}
                      </p>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                        <motion.button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleUserStatus(user.id);
                          }}
                          className={`p-2 rounded-lg transition-colors ${
                            user.status === 'active'
                              ? 'hover:bg-red-50 text-red-600'
                              : 'hover:bg-green-50 text-green-600'
                          }`}
                          title={user.status === 'active' ? 'Заблокировать' : 'Разблокировать'}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          {user.status === 'active' ? <Ban size={18} /> : <CheckCircle size={18} />}
                        </motion.button>
                        
                        {isSuperAdmin && user.role !== 'super_admin' && (
                          <motion.button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteUser(user.id);
                            }}
                            className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                            title="Удалить"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Trash2 size={18} />
                          </motion.button>
                        )}

                        <motion.button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedUser(user);
                          }}
                          className="p-2 hover:bg-slate-50 text-slate-600 rounded-lg transition-colors"
                          title="Подробнее"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Eye size={18} />
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-500 text-lg">Пользователи не найдены</p>
            <p className="text-sm text-slate-400 mt-2">Попробуйте изменить параметр поиска</p>
          </div>
        )}
      </motion.div>

      {/* Cards - Mobile & Tablet */}
      <motion.div
        className="lg:hidden space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <AnimatePresence mode="popLayout">
          {filteredUsers.map((user, idx) => (
            <motion.div
              key={user.id}
              className="bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => setSelectedUser(user)}
              layout
            >
              {/* Cosmic effect */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 rounded-full blur-2xl"></div>

              <div className="relative">
                {/* Header */}
                <div className="flex items-start gap-3 mb-3">
                  <UserAvatar
                    src={user.avatar}
                    name={user.name}
                    size="lg"
                    showBadge={user.role === 'manager'}
                    badgeContent="М"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-slate-800 text-sm sm:text-base line-clamp-1">{user.name}</h3>
                      {getRoleBadge(user.role)}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-500 line-clamp-1">{user.email}</p>
                  </div>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-2 gap-3 mb-3">
                  {/* Tariff */}
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Тариф:</p>
                    {getTariffBadge(user.tariff)}
                  </div>

                  {/* Status */}
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Статус:</p>
                    {user.status === 'active' ? (
                      <span className="flex items-center gap-1.5 text-green-600">
                        <CheckCircle size={14} />
                        <span className="text-xs sm:text-sm font-semibold">Активен</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 text-red-600">
                        <Ban size={14} />
                        <span className="text-xs sm:text-sm font-semibold">Заблокирован</span>
                      </span>
                    )}
                  </div>

                  {/* Progress */}
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Прогресс:</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-slate-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-violet-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${Math.min(100, (user.completedLessons || 0) * 5)}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-semibold text-slate-600">{user.completedLessons || 0}</span>
                    </div>
                  </div>

                  {/* Registration */}
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Регистрация:</p>
                    <p className="text-xs sm:text-sm text-slate-700 font-semibold">
                      {new Date(user.registeredAt).toLocaleDateString('ru-RU')}
                    </p>
                  </div>

                  {/* Revenue (Super Admin only) */}
                  {isSuperAdmin && (
                    <div className="col-span-2">
                      <p className="text-xs text-slate-500 mb-1">Выручка:</p>
                      <p className="text-sm font-bold text-slate-800">
                        {user.revenue ? `₽${user.revenue.toLocaleString()}` : '—'}
                      </p>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-3 border-t border-slate-100" onClick={(e) => e.stopPropagation()}>
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleUserStatus(user.id);
                    }}
                    className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors ${
                      user.status === 'active'
                        ? 'bg-red-50 text-red-600 hover:bg-red-100'
                        : 'bg-green-50 text-green-600 hover:bg-green-100'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {user.status === 'active' ? (
                      <>
                        <Ban size={14} />
                        <span className="hidden xs:inline">Заблокировать</span>
                        <span className="xs:hidden">Блок.</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle size={14} />
                        <span className="hidden xs:inline">Разблокировать</span>
                        <span className="xs:hidden">Разбл.</span>
                      </>
                    )}
                  </motion.button>

                  {isSuperAdmin && user.role !== 'super_admin' && (
                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteUser(user.id);
                      }}
                      className="px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      title="Удалить"
                    >
                      <Trash2 size={16} />
                    </motion.button>
                  )}

                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedUser(user);
                    }}
                    className="px-3 py-2 bg-violet-50 text-violet-600 rounded-lg hover:bg-violet-100 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    title="Подробнее"
                  >
                    <Eye size={16} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Empty State - Mobile */}
        {filteredUsers.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl">
            <p className="text-slate-500 text-lg">Пользователи не найдены</p>
            <p className="text-sm text-slate-400 mt-2">Попробуйте изменить параметр поиска</p>
          </div>
        )}
      </motion.div>

      {/* Add User Modal */}
      <AnimatePresence>
        {triggerAddUser && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => onAddUserComplete && onAddUserComplete()}
            />

            {/* Modal */}
            <motion.div
              className="fixed inset-0 flex items-center justify-center z-50 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white rounded-3xl max-w-md w-full max-h-[90vh] shadow-2xl relative overflow-hidden flex flex-col"
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Космические эффекты */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-pink-500/20 to-purple-500/20 rounded-full blur-2xl pointer-events-none"></div>

                {/* Close Button */}
                <button
                  onClick={() => onAddUserComplete && onAddUserComplete()}
                  className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-lg transition-colors z-10"
                >
                  <X size={20} />
                </button>

                {/* Scrollable Content */}
                <div className="relative overflow-y-auto p-4 sm:p-8">
                  {/* Header */}
                  <div className="relative mb-6">
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                      Добавить пользователя
                    </h2>
                    <p className="text-slate-600 mt-1">Заполните данные нового пользователя</p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleAddUser} className="relative space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Имя *
                      </label>
                      <input
                        type="text"
                        required
                        value={newUser.firstName}
                        onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
                        placeholder="Александр"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Фамилия *
                      </label>
                      <input
                        type="text"
                        required
                        value={newUser.lastName}
                        onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
                        placeholder="Иванов"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={newUser.email}
                        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                        placeholder="alexander@example.com"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Тариф *
                      </label>
                      <select
                        value={newUser.tariff}
                        onChange={(e) => setNewUser({ ...newUser, tariff: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                      >
                        <option value="free">{getTariffLabel('free')}</option>
                        <option value="standard">{getTariffLabel('standard')}</option>
                        <option value="curator">{getTariffLabel('curator')}</option>
                        <option value="mentor">{getTariffLabel('mentor')}</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Доступ до *
                      </label>
                      <input
                        type="date"
                        required
                        value={newUser.accessUntil}
                        onChange={(e) => setNewUser({ ...newUser, accessUntil: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                      />
                      <motion.button
                        type="button"
                        onClick={() => {
                          const oneYearFromNow = new Date();
                          oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
                          const formattedDate = oneYearFromNow.toISOString().split('T')[0];
                          setNewUser({ ...newUser, accessUntil: formattedDate });
                        }}
                        className="mt-2 w-full flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg text-sm font-semibold shadow-md hover:shadow-lg transition-all"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Calendar size={16} />
                        На год
                      </motion.button>
                    </div>

                    {/* Показываем поле "Менеджер" только если тариф НЕ "Работник" */}
                    {newUser.tariff !== 'free' && (
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Менеджер *
                        </label>
                        <select
                          value={newUser.manager}
                          onChange={(e) => setNewUser({ ...newUser, manager: e.target.value })}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                        >
                          <option value="">Выберите менеджера</option>
                          {managers.map((manager) => (
                            <option key={manager} value={manager}>
                              {manager}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    {/* Показываем поле "Профессия" только если тариф НЕ "Работник" */}
                    {newUser.tariff !== 'free' && (
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                          <Briefcase size={16} className="text-violet-600" />
                          Профессия
                        </label>
                        <input
                          type="text"
                          value={newUser.profession}
                          onChange={(e) => setNewUser({ ...newUser, profession: e.target.value })}
                          placeholder="Психолог, коуч, бизнес-тренер..."
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                        />
                      </div>
                    )}

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                        <MessageCircle size={16} className="text-violet-600" />
                        Ник в Telegram
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium">@</span>
                        <input
                          type="text"
                          value={newUser.telegramNick}
                          onChange={(e) => setNewUser({ ...newUser, telegramNick: e.target.value })}
                          placeholder="username"
                          className="w-full pl-9 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                        />
                      </div>
                    </div>

                    {/* Чекбокс "Менеджер" только для тарифа "Работник" */}
                    {newUser.tariff === 'free' && (
                      <div className="flex items-center gap-3 p-4 bg-violet-50 rounded-xl border-2 border-violet-200">
                        <input
                          type="checkbox"
                          id="isManagerAdd"
                          checked={newUser.isManager}
                          onChange={(e) => setNewUser({ ...newUser, isManager: e.target.checked })}
                          className="w-5 h-5 text-violet-600 bg-white border-violet-300 rounded focus:ring-2 focus:ring-violet-500 cursor-pointer"
                        />
                        <label htmlFor="isManagerAdd" className="text-sm font-semibold text-slate-700 cursor-pointer flex items-center gap-2">
                          <UserCog size={18} className="text-violet-600" />
                          Менеджер
                        </label>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="space-y-3 pt-4">
                      <div className="flex gap-3">
                        <motion.button
                          type="submit"
                          className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-500 to-purple-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Save size={20} />
                          Добавить
                        </motion.button>
                        <button
                          type="button"
                          onClick={() => onAddUserComplete && onAddUserComplete()}
                          className="px-6 py-3 bg-slate-100 text-slate-700 rounded-xl font-semibold hover:bg-slate-200 transition-colors"
                        >
                          Отмена
                        </button>
                      </div>
                      
                      <motion.button
                        type="button"
                        onClick={handleSendInvitation}
                        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Mail size={20} />
                        Отправить приглашение на почту
                      </motion.button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* User Detail Panel */}
      {selectedUser && (
        <UserDetailPanel
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          onUpdate={(userId, updatedData) => {
            // Обновляем данные пользователя в списке
            setUsers(users.map(u => 
              u.id === userId 
                ? { ...u, ...updatedData }
                : u
            ));
            // Обновляем selectedUser для отображения актуальных данных
            setSelectedUser({ ...selectedUser, ...updatedData });
          }}
          onDelete={(userId) => {
            // Удаляем пользователя из списка
            setUsers(users.filter(u => u.id !== userId));
            // Закрываем панель деталей
            setSelectedUser(null);
          }}
        />
      )}
    </div>
  );
}