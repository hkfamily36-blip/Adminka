import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  PlayCircle,
  CheckCircle2,
  Lock,
  Clock,
  Star,
  Crown,
  AlertCircle
} from 'lucide-react';
import { getTariffLabel } from '../config/tariffs';
import type { TariffKey } from '../config/tariffs';

interface StudentUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
  tariff: TariffKey;
  accessUntil?: string;
  selectedLessons?: string[];
}

// Моковые данные студента (в реальности будут приходить с сервера)
const STUDENT_DATA: Record<string, StudentUser> = {
  '1': {
    id: '1',
    name: 'Алексей Смирнов',
    email: 'alexey@example.com',
    avatar: 'https://images.unsplash.com/photo-1629507208649-70919ca33793?w=150',
    tariff: 'curator',
    accessUntil: '2026-06-15',
    selectedLessons: ['lesson-1', 'lesson-2', 'lesson-3', 'lesson-4']
  },
  '2': {
    id: '2',
    name: 'Мария Петрова',
    email: 'maria@example.com',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
    tariff: 'standard',
    accessUntil: '2026-05-20',
  },
  '3': {
    id: '3',
    name: 'Дмитрий Иванов',
    email: 'dmitry@example.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    tariff: 'mentor',
    accessUntil: '2026-12-31',
  }
};

// Моковые данные курса
const MODULES = [
  { id: 0, name: 'Предобучение', icon: '📚', lessons: 5, completed: 3 },
  { id: 1, name: 'Аутентичность', icon: '✨', lessons: 8, completed: 5 },
  { id: 2, name: 'Ниша', icon: '🎯', lessons: 6, completed: 0 },
  { id: 3, name: 'Маркетинг', icon: '📢', lessons: 10, completed: 0 },
  { id: 4, name: 'Продажи', icon: '💰', lessons: 7, completed: 0 },
  { id: 5, name: 'AI-агенты', icon: '🤖', lessons: 9, completed: 0 },
  { id: 6, name: 'Автоворонки', icon: '🔄', lessons: 8, completed: 0 },
  { id: 7, name: 'Масштабирование', icon: '🚀', lessons: 12, completed: 0 },
];

export function StudentDashboardPage() {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const [student, setStudent] = useState<StudentUser | null>(null);
  const [isImpersonating, setIsImpersonating] = useState(true);

  useEffect(() => {
    if (userId && STUDENT_DATA[userId]) {
      setStudent(STUDENT_DATA[userId]);
    }
  }, [userId]);

  if (!student) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle size={64} className="text-violet-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Пользователь не найден</h2>
          <button
            onClick={() => navigate('/')}
            className="mt-4 px-6 py-3 bg-violet-600 text-white rounded-lg font-semibold hover:bg-violet-700 transition-colors"
          >
            Вернуться в админ-панель
          </button>
        </div>
      </div>
    );
  }

  const totalLessons = MODULES.reduce((acc, m) => acc + m.lessons, 0);
  const completedLessons = MODULES.reduce((acc, m) => acc + m.completed, 0);
  const progress = Math.round((completedLessons / totalLessons) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2E1065] via-purple-900 to-violet-900 relative overflow-hidden">
      {/* Космический фон */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-2 h-2 bg-white rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-white rounded-full animate-pulse delay-100"></div>
        <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-white rounded-full animate-pulse delay-200"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-white rounded-full animate-pulse delay-300"></div>
      </div>

      {/* Impersonation Banner */}
      {isImpersonating && (
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="bg-amber-500 text-white px-6 py-3 relative z-50"
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertCircle size={20} />
              <span className="font-semibold">
                Режим просмотра от имени пользователя: {student.name}
              </span>
            </div>
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2 bg-white text-amber-600 rounded-lg font-semibold hover:bg-amber-50 transition-colors flex items-center gap-2"
            >
              <ArrowLeft size={18} />
              Вернуться в админ-панель
            </button>
          </div>
        </motion.div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center gap-6 mb-8">
            {student.avatar ? (
              <img
                src={student.avatar}
                alt={student.name}
                className="w-24 h-24 rounded-full border-4 border-white/20 shadow-xl"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-violet-600 flex items-center justify-center text-white text-3xl font-bold border-4 border-white/20 shadow-xl">
                {student.name[0]}
              </div>
            )}
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                Добро пожаловать, {student.name.split(' ')[0]}!
              </h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                  <Crown size={18} className="text-yellow-400" />
                  <span className="text-white font-semibold">
                    {getTariffLabel(student.tariff)}
                  </span>
                </div>
                {student.accessUntil && (
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                    <Clock size={18} className="text-green-400" />
                    <span className="text-white text-sm">
                      Доступ до: {new Date(student.accessUntil).toLocaleDateString('ru-RU')}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Progress */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">Ваш прогресс</h2>
              <div className="text-2xl font-bold text-white">{progress}%</div>
            </div>
            <div className="w-full h-4 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-full bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500"
              />
            </div>
            <div className="flex items-center gap-6 mt-4 text-white/80 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-green-400" />
                <span>Завершено: {completedLessons} из {totalLessons}</span>
              </div>
              <div className="flex items-center gap-2">
                <Star size={16} className="text-yellow-400" />
                <span>Модулей пройдено: {MODULES.filter(m => m.completed > 0).length} из {MODULES.length}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Modules */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MODULES.map((module, index) => {
            const moduleProgress = module.lessons > 0 ? Math.round((module.completed / module.lessons) * 100) : 0;
            const isLocked = false; // В реальности проверяем доступ по тарифу

            return (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 transition-all ${
                  isLocked ? 'opacity-60' : 'hover:bg-white/15 hover:border-white/30 cursor-pointer'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-5xl">{module.icon}</div>
                  {isLocked ? (
                    <Lock size={24} className="text-white/60" />
                  ) : moduleProgress === 100 ? (
                    <CheckCircle2 size={24} className="text-green-400" />
                  ) : (
                    <PlayCircle size={24} className="text-violet-400" />
                  )}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Модуль {module.id}: {module.name}
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm text-white/70">
                    <span>{module.completed} / {module.lessons} уроков</span>
                    <span>{moduleProgress}%</span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${moduleProgress}%` }}
                      className="h-full bg-gradient-to-r from-violet-500 to-purple-500 transition-all duration-500"
                    />
                  </div>
                </div>
                {isLocked && (
                  <div className="mt-4 text-xs text-white/60 flex items-center gap-2">
                    <Lock size={14} />
                    <span>Доступно на тарифе "Наставник"</span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
