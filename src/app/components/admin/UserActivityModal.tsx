import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  CheckCircle, 
  Eye, 
  DollarSign, 
  LogIn, 
  TrendingUp, 
  Users as UsersIcon,
  Clock,
  Activity
} from 'lucide-react';

interface UserActivity {
  id: string;
  action: string;
  resource: string;
  timestamp: string;
  details?: string;
  type: 'lesson_view' | 'lesson_complete' | 'payment' | 'login' | 'module_start' | 'registration';
  duration?: number;
}

interface UserActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  activities: UserActivity[];
}

export function UserActivityModal({ isOpen, onClose, userName, activities }: UserActivityModalProps) {
  const getActionIcon = (type: string) => {
    switch (type) {
      case 'lesson_complete':
        return <CheckCircle size={18} className="text-green-600" />;
      case 'lesson_view':
        return <Eye size={18} className="text-blue-600" />;
      case 'payment':
        return <DollarSign size={18} className="text-purple-600" />;
      case 'login':
        return <LogIn size={18} className="text-indigo-600" />;
      case 'module_start':
        return <TrendingUp size={18} className="text-cyan-600" />;
      case 'registration':
        return <UsersIcon size={18} className="text-violet-600" />;
      default:
        return <Activity size={18} className="text-slate-600" />;
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
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <div 
              className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="px-8 py-6 border-b border-slate-200 bg-gradient-to-r from-violet-50 to-purple-50">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-[#2E1065] via-[#7C3AED] to-[#EC4899] bg-clip-text text-transparent">
                      История активности
                    </h2>
                    <p className="text-slate-600 mt-1">
                      Пользователь: <strong>{userName}</strong>
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-white rounded-xl transition-colors"
                  >
                    <X size={24} className="text-slate-400" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 overflow-y-auto max-h-[calc(90vh-140px)]">
                {activities.length === 0 ? (
                  <div className="text-center py-12">
                    <Activity size={48} className="mx-auto text-slate-300 mb-4" />
                    <p className="text-slate-500 text-lg">Активность не найдена</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {activities.map((activity, idx) => (
                      <motion.div
                        key={activity.id}
                        className={`rounded-xl p-5 border-l-4 ${getActionColor(activity.type)}`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                      >
                        <div className="flex items-start gap-4">
                          {/* Icon */}
                          <div className={`p-2.5 rounded-lg ${getIconBgColor(activity.type)}`}>
                            {getActionIcon(activity.type)}
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-4">
                              <div>
                                <p className="font-semibold text-slate-800">
                                  {activity.action}
                                </p>
                                <p className="text-sm text-slate-600 mt-0.5">
                                  {activity.resource}
                                </p>
                              </div>
                              <div className="flex items-center gap-1 text-sm text-slate-500">
                                <Clock size={14} />
                                <span>{formatTime(activity.timestamp)}</span>
                              </div>
                            </div>

                            {activity.details && (
                              <p className="text-sm text-slate-500 bg-white/50 rounded-lg p-2 mt-2">
                                {activity.details}
                              </p>
                            )}

                            {activity.duration && (
                              <div className="flex items-center gap-2 mt-2">
                                <div className="text-xs text-slate-500 bg-white/50 rounded-lg px-3 py-1.5">
                                  ⏱ Длительность: <strong>{formatDuration(activity.duration)}</strong>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
