import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Search, Filter, Check, X, ChevronDown, User, Calendar, MessageSquare } from 'lucide-react';

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  lessonId: string;
  lessonTitle: string;
  rating: number;
  comment?: string;
  date: string;
  isRead: boolean;
  moduleId: number;
}

interface ReviewsSectionProps {
  reviews: Review[];
  onMarkAsRead: (reviewId: string) => void;
  onMarkAllAsRead: () => void;
}

export function ReviewsSection({ reviews, onMarkAsRead, onMarkAllAsRead }: ReviewsSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRating, setFilterRating] = useState<number | 'all'>('all');
  const [filterRead, setFilterRead] = useState<'all' | 'read' | 'unread'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'rating'>('date');

  const unreadCount = reviews.filter(r => !r.isRead).length;
  const totalCount = reviews.length;
  const averageRating = reviews.length > 0 
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : '0.0';

  // Фильтрация и сортировка
  const filteredReviews = reviews
    .filter(review => {
      // Поиск
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        if (
          !review.userName.toLowerCase().includes(query) &&
          !review.lessonTitle.toLowerCase().includes(query) &&
          !(review.comment?.toLowerCase().includes(query))
        ) {
          return false;
        }
      }

      // Фильтр по рейтингу
      if (filterRating !== 'all' && review.rating !== filterRating) {
        return false;
      }

      // Фильтр по прочитанности
      if (filterRead === 'read' && !review.isRead) return false;
      if (filterRead === 'unread' && review.isRead) return false;

      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else {
        return b.rating - a.rating;
      }
    });

  // Подсчет по рейтингам
  const ratingCounts = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(r => r.rating === rating).length,
    percentage: reviews.length > 0 ? (reviews.filter(r => r.rating === rating).length / reviews.length) * 100 : 0,
  }));

  return (
    <div className="space-y-6">
      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Общий рейтинг */}
        <motion.div
          className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-amber-800">Средний рейтинг</h3>
            <Star size={20} className="text-amber-500 fill-amber-500" />
          </div>
          <div className="flex items-end gap-2">
            <p className="text-4xl font-bold text-amber-600">{averageRating}</p>
            <p className="text-lg text-amber-500 mb-1">/ 5.0</p>
          </div>
          <div className="flex gap-1 mt-2">
            {[1, 2, 3, 4, 5].map(star => (
              <Star
                key={star}
                size={16}
                className={`${
                  star <= Math.round(parseFloat(averageRating))
                    ? 'text-amber-400 fill-amber-400'
                    : 'text-amber-200'
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* Всего отзывов */}
        <motion.div
          className="bg-gradient-to-br from-violet-50 to-purple-50 border-2 border-violet-200 rounded-xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-violet-800">Всего отзывов</h3>
            <MessageSquare size={20} className="text-violet-500" />
          </div>
          <p className="text-4xl font-bold text-violet-600">{totalCount}</p>
          <p className="text-sm text-violet-500 mt-2">
            {reviews.filter(r => r.comment).length} с комментарием
          </p>
        </motion.div>

        {/* Непрочитанные */}
        <motion.div
          className="bg-gradient-to-br from-cyan-50 to-blue-50 border-2 border-cyan-200 rounded-xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-cyan-800">Непрочитанные</h3>
            <div className="w-3 h-3 bg-cyan-500 rounded-full animate-pulse" />
          </div>
          <p className="text-4xl font-bold text-cyan-600">{unreadCount}</p>
          {unreadCount > 0 && (
            <button
              onClick={onMarkAllAsRead}
              className="text-sm text-cyan-600 hover:text-cyan-700 font-medium mt-2 flex items-center gap-1"
            >
              <Check size={14} />
              Отметить все как прочитанные
            </button>
          )}
        </motion.div>
      </div>

      {/* Распределение по рейтингам */}
      <motion.div
        className="bg-white border-2 border-slate-200 rounded-xl p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="text-lg font-bold text-slate-800 mb-4">Распределение оценок</h3>
        <div className="space-y-3">
          {ratingCounts.map(({ rating, count, percentage }) => (
            <div key={rating} className="flex items-center gap-4">
              <div className="flex items-center gap-1 w-16">
                <span className="text-sm font-medium text-slate-700">{rating}</span>
                <Star size={14} className="text-amber-400 fill-amber-400" />
              </div>
              <div className="flex-1 bg-slate-100 rounded-full h-2 overflow-hidden">
                <motion.div
                  className="bg-amber-400 h-full rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                />
              </div>
              <span className="text-sm text-slate-600 w-12 text-right">{count}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Фильтры и поиск */}
      <div className="bg-white border-2 border-slate-200 rounded-xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Поиск */}
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Поиск по имени, уроку или комментарию..."
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Фильтр по рейтингу */}
          <div>
            <select
              value={filterRating}
              onChange={(e) => setFilterRating(e.target.value === 'all' ? 'all' : Number(e.target.value))}
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
            >
              <option value="all">Все рейтинги</option>
              <option value="5">⭐ 5 звезд</option>
              <option value="4">⭐ 4 звезды</option>
              <option value="3">⭐ 3 звезды</option>
              <option value="2">⭐ 2 звезды</option>
              <option value="1">⭐ 1 звезда</option>
            </select>
          </div>

          {/* Фильтр по прочитанности */}
          <div>
            <select
              value={filterRead}
              onChange={(e) => setFilterRead(e.target.value as any)}
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
            >
              <option value="all">Все отзывы</option>
              <option value="unread">Непрочитанные</option>
              <option value="read">Прочитанные</option>
            </select>
          </div>
        </div>

        {/* Сортировка */}
        <div className="flex items-center gap-3 mt-4">
          <span className="text-sm text-slate-600 font-medium">Сортировка:</span>
          <button
            onClick={() => setSortBy('date')}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
              sortBy === 'date'
                ? 'bg-violet-100 text-violet-700'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            По дате
          </button>
          <button
            onClick={() => setSortBy('rating')}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
              sortBy === 'rating'
                ? 'bg-violet-100 text-violet-700'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            По рейтингу
          </button>
        </div>
      </div>

      {/* Список отзывов */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-800">
          Отзывы ({filteredReviews.length})
        </h3>

        <AnimatePresence>
          {filteredReviews.length === 0 ? (
            <div className="text-center py-12 bg-slate-50 rounded-xl">
              <MessageSquare size={48} className="mx-auto mb-3 text-slate-300" />
              <p className="text-slate-500">Отзывов не найдено</p>
            </div>
          ) : (
            filteredReviews.map((review, idx) => (
              <motion.div
                key={review.id}
                className={`bg-white border-2 rounded-xl p-6 transition-all ${
                  !review.isRead
                    ? 'border-cyan-300 bg-cyan-50'
                    : 'border-slate-200 hover:border-violet-300'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: idx * 0.05 }}
              >
                {/* Заголовок */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {/* Аватар */}
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                      {review.userName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800 flex items-center gap-2">
                        {review.userName}
                        {!review.isRead && (
                          <span className="px-2 py-0.5 bg-cyan-500 text-white text-xs rounded-full font-semibold">
                            Новый
                          </span>
                        )}
                      </p>
                      <p className="text-sm text-slate-500 flex items-center gap-2">
                        <Calendar size={14} />
                        {new Date(review.date).toLocaleDateString('ru-RU', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                  </div>

                  {/* Кнопка прочитать */}
                  {!review.isRead && (
                    <button
                      onClick={() => onMarkAsRead(review.id)}
                      className="flex items-center gap-1 px-3 py-1 bg-cyan-100 hover:bg-cyan-200 text-cyan-700 rounded-lg text-sm font-medium transition-colors"
                    >
                      <Check size={14} />
                      Отметить прочитанным
                    </button>
                  )}
                </div>

                {/* Рейтинг */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map(star => (
                      <Star
                        key={star}
                        size={18}
                        className={`${
                          star <= review.rating
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-slate-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-slate-700">
                    {review.rating}.0
                  </span>
                </div>

                {/* Урок */}
                <div className="mb-3 px-3 py-2 bg-violet-50 border border-violet-200 rounded-lg inline-block">
                  <p className="text-sm text-violet-700 font-medium">
                    📚 {review.lessonTitle}
                  </p>
                </div>

                {/* Комментарий */}
                {review.comment && (
                  <div className="mt-3 p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <p className="text-slate-700 leading-relaxed">{review.comment}</p>
                  </div>
                )}
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
