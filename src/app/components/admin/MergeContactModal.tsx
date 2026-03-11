import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Search, Users, AlertCircle, ArrowRight, Check } from 'lucide-react';
import { getTariffLabel } from '../../config/tariffs';
import type { TariffKey } from '../../config/tariffs';

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'user' | 'manager' | 'super_admin';
  tariff: TariffKey;
  status: 'active' | 'blocked';
}

interface MergeContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User;
  allUsers: User[];
  onMerge: (sourceUserId: string, targetUserId: string) => void;
}

export function MergeContactModal({ isOpen, onClose, currentUser, allUsers, onMerge }: MergeContactModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);

  // Фильтруем пользователей: исключаем текущего и фильтруем по поиску
  const filteredUsers = allUsers
    .filter(u => u.id !== currentUser.id)
    .filter(u => {
      if (!searchQuery.trim()) return true;
      const query = searchQuery.toLowerCase();
      return (
        u.name.toLowerCase().includes(query) ||
        u.email.toLowerCase().includes(query)
      );
    });

  const handleMerge = () => {
    if (selectedUser) {
      onMerge(currentUser.id, selectedUser.id);
      onClose();
      setSelectedUser(null);
      setShowConfirm(false);
    }
  };

  const handleClose = () => {
    onClose();
    setSelectedUser(null);
    setShowConfirm(false);
    setSearchQuery('');
  };

  useEffect(() => {
    if (!isOpen) {
      setSelectedUser(null);
      setShowConfirm(false);
      setSearchQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={handleClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Users size={24} className="text-white" />
              <h2 className="text-xl font-bold text-white">Объединить с другим контактом</h2>
            </div>
            <button
              onClick={handleClose}
              className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Confirmation View */}
          {showConfirm && selectedUser ? (
            <div className="p-6">
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
                <div className="flex items-start gap-3">
                  <AlertCircle size={24} className="text-amber-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-amber-900 mb-2">Внимание! Это действие необратимо</h3>
                    <p className="text-sm text-amber-800">
                      Все данные, история активности, платежи и прогресс обучения будут объединены.
                      Контакт <span className="font-semibold">{currentUser.name}</span> будет удалён.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-xl p-6 mb-6">
                <div className="flex items-center justify-center gap-8">
                  {/* Source User */}
                  <div className="text-center">
                    <div className="mb-3 text-sm font-semibold text-slate-600">Исходный контакт</div>
                    {currentUser.avatar ? (
                      <img
                        src={currentUser.avatar}
                        alt={currentUser.name}
                        className="w-20 h-20 rounded-full mx-auto mb-3 border-4 border-red-200"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-full bg-red-200 text-red-700 flex items-center justify-center text-2xl font-bold mx-auto mb-3 border-4 border-red-300">
                        {currentUser.name[0]}
                      </div>
                    )}
                    <div className="font-bold text-slate-800">{currentUser.name}</div>
                    <div className="text-sm text-slate-600">{currentUser.email}</div>
                    <div className="text-xs text-red-600 font-semibold mt-2">Будет удалён</div>
                  </div>

                  {/* Arrow */}
                  <ArrowRight size={32} className="text-violet-600 flex-shrink-0" />

                  {/* Target User */}
                  <div className="text-center">
                    <div className="mb-3 text-sm font-semibold text-slate-600">Целевой контакт</div>
                    {selectedUser.avatar ? (
                      <img
                        src={selectedUser.avatar}
                        alt={selectedUser.name}
                        className="w-20 h-20 rounded-full mx-auto mb-3 border-4 border-green-200"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-full bg-green-200 text-green-700 flex items-center justify-center text-2xl font-bold mx-auto mb-3 border-4 border-green-300">
                        {selectedUser.name[0]}
                      </div>
                    )}
                    <div className="font-bold text-slate-800">{selectedUser.name}</div>
                    <div className="text-sm text-slate-600">{selectedUser.email}</div>
                    <div className="text-xs text-green-600 font-semibold mt-2">Сохранится с объединёнными данными</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="flex-1 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold transition-colors"
                >
                  Назад
                </button>
                <button
                  onClick={handleMerge}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white rounded-xl font-semibold transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <Check size={20} />
                  Подтвердить объединение
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Search */}
              <div className="p-6 border-b border-slate-200">
                <div className="relative">
                  <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Поиск по имени или email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                    autoFocus
                  />
                </div>
                <p className="text-sm text-slate-600 mt-3">
                  Выберите контакт, с которым нужно объединить <span className="font-semibold">{currentUser.name}</span>
                </p>
              </div>

              {/* Users List */}
              <div className="overflow-y-auto max-h-[400px]">
                {filteredUsers.length === 0 ? (
                  <div className="p-12 text-center">
                    <Users size={48} className="text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-600 font-semibold">Контакты не найдены</p>
                    <p className="text-sm text-slate-500 mt-2">Попробуйте изменить поисковый запрос</p>
                  </div>
                ) : (
                  <div className="divide-y divide-slate-100">
                    {filteredUsers.map((user) => (
                      <button
                        key={user.id}
                        onClick={() => {
                          setSelectedUser(user);
                          setShowConfirm(true);
                        }}
                        className="w-full px-6 py-4 hover:bg-violet-50 transition-colors text-left flex items-center gap-4"
                      >
                        {user.avatar ? (
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-12 h-12 rounded-full border-2 border-slate-200"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-violet-200 text-violet-700 flex items-center justify-center text-lg font-bold border-2 border-slate-200">
                            {user.name[0]}
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-slate-800 truncate">{user.name}</div>
                          <div className="text-sm text-slate-600 truncate">{user.email}</div>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <div className="px-3 py-1 bg-violet-100 text-violet-700 rounded-lg text-xs font-semibold">
                            {getTariffLabel(user.tariff)}
                          </div>
                          {user.status === 'blocked' && (
                            <div className="text-xs text-red-600 font-semibold">Заблокирован</div>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t border-slate-200 bg-slate-50">
                <button
                  onClick={handleClose}
                  className="w-full px-6 py-3 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl font-semibold transition-colors"
                >
                  Отмена
                </button>
              </div>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
