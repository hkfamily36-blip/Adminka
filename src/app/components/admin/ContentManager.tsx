import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Plus, Save, X, Edit, Video, Headphones, FileText, Eye, EyeOff, Blocks, ClipboardList, List, FolderTree, MessageSquare, Star, BookOpen, ArrowLeft, Copy } from 'lucide-react';
import { ContentBlockEditor, ContentBlock, ContainerSettings } from './ContentBlockEditor';
import { TestBuilder, Question } from './TestBuilder';
import { CourseStructure } from './CourseStructure';
import { ReviewsSection, Review } from './ReviewsSection';

interface Course {
  id: string;
  title: string;
  description: string;
  createdAt: string;
}

interface Lesson {
  id: string;
  title: string;
  type: 'constructor' | 'test';
  moduleId: number;
  courseId: string;
  tariff: string;
  description?: string;
  status?: 'published' | 'draft';
  module?: string;
  blocks?: ContentBlock[];
  questions?: Question[];
  order: number;
}

type TabType = 'structure' | 'reviews';

export function ContentManager() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('structure');
  const [showModuleForm, setShowModuleForm] = useState(false);
  const [showLessonForm, setShowLessonForm] = useState(false);
  const [editingModule, setEditingModule] = useState<{ id: number; title: string } | null>(null);
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);
  const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>([]);
  const [testQuestions, setTestQuestions] = useState<Question[]>([]);
  
  // Настройки контейнера блоков
  const [containerSettings, setContainerSettings] = useState<ContainerSettings>({
    gap: '0.75rem',
    background: '#ffffff',
    borderColor: '#e2e8f0',
    borderWidth: '2px',
    borderRadius: '0.75rem',
    padding: '1rem',
  });

  const [moduleFormData, setModuleFormData] = useState({
    title: '',
    description: '',
  });

  const [lessonFormData, setLessonFormData] = useState({
    title: '',
    type: 'constructor' as const,
    moduleId: 1,
    tariff: 'standard',
    description: '',
    status: 'draft' as 'published' | 'draft',
  });

  // Единственный курс - фиксированный
  const currentCourse: Course = {
    id: 'course-1',
    title: 'Школа аутентичного маркетинга',
    description: 'Полный курс по построению бизнес-системы из 8 элементов с использованием AI-агентов',
    createdAt: '2025-01-15',
  };

  // Тестовые данные уроков
  const [lessons, setLessons] = useState<Lesson[]>([
    { 
      id: 'lesson-1',
      title: 'Организационный урок', 
      module: 'Предобучение', 
      type: 'constructor', 
      status: 'published',
      moduleId: 0,
      courseId: 'course-1',
      tariff: 'standard',
      order: 1,
    },
    { 
      id: 'lesson-2',
      title: 'Мышление предпринимателя', 
      module: 'Предобучение', 
      type: 'constructor', 
      status: 'published',
      moduleId: 0,
      courseId: 'course-1',
      tariff: 'standard',
      order: 2,
    },
    { 
      id: 'lesson-3',
      title: 'Тест по предобучению', 
      module: 'Предобучение', 
      type: 'test', 
      status: 'published',
      moduleId: 0,
      courseId: 'course-1',
      tariff: 'standard',
      order: 3,
    },
    { 
      id: 'lesson-4',
      title: 'Распаковка личности', 
      module: 'Аутентичность', 
      type: 'constructor', 
      status: 'published',
      moduleId: 1,
      courseId: 'course-1',
      tariff: 'curator',
      order: 4,
    },
    { 
      id: 'lesson-5',
      title: 'Ценности и миссия', 
      module: 'Аутентичность', 
      type: 'constructor', 
      status: 'draft',
      moduleId: 1,
      courseId: 'course-1',
      tariff: 'curator',
      order: 5,
    },
    { 
      id: 'lesson-6',
      title: 'Поиск целевой аудитории', 
      module: 'Ниша', 
      type: 'constructor', 
      status: 'draft',
      moduleId: 2,
      courseId: 'course-1',
      tariff: 'standard',
      order: 6,
    },
  ]);

  // Тестовые данные отзывов
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 'review-1',
      userId: 'user-1',
      userName: 'Анна Петрова',
      lessonId: 'lesson-1',
      lessonTitle: 'Организационный урок',
      rating: 5,
      comment: 'Отличный урок! Все четко и понятно объяснено. Особенно понравилась структура подачи материала. Спасибо!',
      date: '2025-02-09T10:30:00',
      isRead: false,
      moduleId: 0,
    },
    {
      id: 'review-2',
      userId: 'user-2',
      userName: 'Мария Соколова',
      lessonId: 'lesson-2',
      lessonTitle: 'Мышление предпринимателя',
      rating: 5,
      comment: 'Урок просто бомба! Наконец-то поняла, как нужно думать в бизнесе. Много инсайтов и практических советов.',
      date: '2025-02-09T09:15:00',
      isRead: false,
      moduleId: 0,
    },
    {
      id: 'review-3',
      userId: 'user-3',
      userName: 'Елена Кузнецова',
      lessonId: 'lesson-3',
      lessonTitle: 'Тест по предобучению',
      rating: 4,
      comment: 'Хороший тест, помог закрепить материал. Некоторые вопросы показались сложными, но это только плюс.',
      date: '2025-02-08T18:45:00',
      isRead: true,
      moduleId: 0,
    },
    {
      id: 'review-4',
      userId: 'user-4',
      userName: 'Ольга Смирнова',
      lessonId: 'lesson-4',
      lessonTitle: 'Распаковка личности',
      rating: 5,
      comment: 'Невероятно полезный урок! Впервые за долгое время действительно поняла себя и свои ценности.',
      date: '2025-02-08T16:20:00',
      isRead: false,
      moduleId: 1,
    },
    {
      id: 'review-5',
      userId: 'user-5',
      userName: 'Наталья Волкова',
      lessonId: 'lesson-1',
      lessonTitle: 'Организационный урок',
      rating: 5,
      date: '2025-02-08T14:10:00',
      isRead: true,
      moduleId: 0,
    },
    {
      id: 'review-6',
      userId: 'user-6',
      userName: 'Ирина Морозова',
      lessonId: 'lesson-4',
      lessonTitle: 'Распаковка личности',
      rating: 4,
      comment: 'Очень глубокий материал. Пришлось пересматривать несколько раз, чтобы все осознать.',
      date: '2025-02-07T12:30:00',
      isRead: true,
      moduleId: 1,
    },
    {
      id: 'review-7',
      userId: 'user-7',
      userName: 'Светлана Белова',
      lessonId: 'lesson-5',
      lessonTitle: 'Ценности и миссия',
      rating: 5,
      comment: 'Урок перевернул мое представление о бизнесе. Теперь понимаю, что важно идти от своих ценностей!',
      date: '2025-02-07T10:00:00',
      isRead: false,
      moduleId: 1,
    },
    {
      id: 'review-8',
      userId: 'user-8',
      userName: 'Татьяна Новикова',
      lessonId: 'lesson-2',
      lessonTitle: 'Мышление предпринимателя',
      rating: 3,
      comment: 'Урок хороший, но ожидала больше конкретных примеров из практики.',
      date: '2025-02-06T15:45:00',
      isRead: true,
      moduleId: 0,
    },
  ]);

  const unreadReviewsCount = reviews.filter(r => !r.isRead).length;

  const handleMarkAsRead = (reviewId: string) => {
    setReviews(reviews.map(review => 
      review.id === reviewId ? { ...review, isRead: true } : review
    ));
  };

  const handleMarkAllAsRead = () => {
    setReviews(reviews.map(review => ({ ...review, isRead: true })));
  };

  // Обработчики для модулей
  const handleModuleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingModule) {
      // Обновление существующего модул��
      // Здесь можно добавить логику обновления модуля, если это необходимо
    } else {
      // Создание нового модуля
      // Здесь можно добавить логику создания нового модуля, если это необходимо
    }
    setShowModuleForm(false);
    setEditingModule(null);
    setModuleFormData({ title: '', description: '' });
  };

  const handleEditModule = (module: { id: number; title: string }) => {
    setEditingModule(module);
    setModuleFormData({
      title: module.title,
      description: '',
    });
    setShowModuleForm(true);
  };

  const handleCancelModule = () => {
    setShowModuleForm(false);
    setEditingModule(null);
    setModuleFormData({ title: '', description: '' });
  };

  // Обработчики для уроков
  const handleLessonSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingLesson) {
      setLessons(lessons.map(lesson =>
        lesson.id === editingLesson.id
          ? {
              ...lesson,
              ...lessonFormData,
              blocks: contentBlocks,
              questions: testQuestions,
            }
          : lesson
      ));
    } else {
      const newLesson: Lesson = {
        id: `lesson-${Date.now()}`,
        ...lessonFormData,
        courseId: currentCourse.id,
        blocks: contentBlocks,
        questions: testQuestions,
        order: lessons.filter(l => l.courseId === currentCourse.id).length + 1,
      };
      setLessons([...lessons, newLesson]);
    }
    setShowLessonForm(false);
    setEditingLesson(null);
    setContentBlocks([]);
    setTestQuestions([]);
    setLessonFormData({
      title: '',
      type: 'constructor',
      moduleId: 1,
      tariff: 'standard',
      description: '',
      status: 'draft',
    });
  };

  const handleEditLesson = (lesson: Lesson) => {
    // Навигация на страницу редактирования урока
    navigate(`/admin/lessons/${lesson.id}/edit`);
  };

  const handleCancelLesson = () => {
    setShowLessonForm(false);
    setEditingLesson(null);
    setLessonFormData({
      title: '',
      type: 'constructor',
      moduleId: 1,
      tariff: 'standard',
      description: '',
      status: 'draft',
    });
    setContentBlocks([]);
    setTestQuestions([]);
  };

  const handleCreateLessonInModule = (moduleId: number) => {
    // Навигация на страницу создания урока с параметром модуля
    const targetUrl = `/admin/lessons/create?moduleId=${moduleId}`;
    navigate(targetUrl);
  };

  const toggleStatus = (lessonId: string) => {
    setLessons(lessons.map(lesson => {
      if (lesson.id === lessonId) {
        return {
          ...lesson,
          status: lesson.status === 'published' ? 'draft' : 'published'
        };
      }
      return lesson;
    }));
  };

  const courseLessons = currentCourse 
    ? lessons.filter(l => l.courseId === currentCourse.id)
    : [];

  const copyLesson = (lesson: Lesson) => {
    const newLesson: Lesson = {
      ...lesson,
      id: `lesson-${Date.now()}`,
      title: `${lesson.title} (копия)`,
      status: 'draft',
      order: lessons.filter(l => l.moduleId === lesson.moduleId).length + 1,
    };

    setLessons([...lessons, newLesson]);
  };

  const copyModule = (moduleId: number) => {
    const moduleLessons = lessons.filter(l => l.moduleId === moduleId);
    
    if (moduleLessons.length === 0) {
      return;
    }

    const copiedLessons = moduleLessons.map((lesson, index) => ({
      ...lesson,
      id: `lesson-${Date.now()}-${index}`,
      title: `${lesson.title} (копия модуля)`,
      status: 'draft' as const,
      order: lessons.length + index + 1,
    }));

    setLessons([...lessons, ...copiedLessons]);
  };

  return (
    <div className="space-y-6">
      {/* Header with Add Button */}
      <motion.div
        className="flex items-center justify-between"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Управление контентом</h2>
          <p className="text-slate-600 mt-1">
            Создание и редактирование модулей
          </p>
        </div>
        
        {/* Кнопки действий */}
        <div className="flex items-center gap-3">
          {/* Кнопка "Добавить модуль" */}
          <motion.button
            onClick={() => {
              if (showModuleForm) {
                handleCancelModule();
              } else {
                setEditingModule(null);
                setShowModuleForm(true);
              }
            }}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#2E1065] to-[#8C2F5E] text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {showModuleForm ? <X size={20} /> : <Plus size={20} />}
            {showModuleForm ? 'Закрыть' : 'Добавить модуль'}
          </motion.button>
        </div>
      </motion.div>

      {/* Форма создания/редактирования модуля */}
      {showModuleForm && (
        <motion.div
          className="bg-white rounded-2xl p-8 shadow-lg"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <div className="mb-6">
            <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              {editingModule ? (
                <>
                  <Edit size={24} className="text-[#583B8B]" />
                  Редактировать модуль
                </>
              ) : (
                <>
                  <Plus size={24} className="text-[#583B8B]" />
                  Создать новый модуль
                </>
              )}
            </h3>
            <p className="text-slate-500 text-sm mt-1">
              {editingModule ? 'Внесите изменения и сохраните' : 'Заполните информацию о модуле'}
            </p>
          </div>
          <form onSubmit={handleModuleSubmit} className="space-y-6">
            {/* Навание модуля */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Название модуля *
              </label>
              <input
                type="text"
                required
                value={moduleFormData.title}
                onChange={(e) => setModuleFormData({ ...moduleFormData, title: e.target.value })}
                placeholder="Например: Предобучение"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#583B8B] focus:border-transparent transition-all"
              />
            </div>

            {/* Описание модуля */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Описание модуля *
              </label>
              <textarea
                required
                value={moduleFormData.description}
                onChange={(e) => setModuleFormData({ ...moduleFormData, description: e.target.value })}
                placeholder="раткое описание модуля..."
                rows={4}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#583B8B] focus:border-transparent transition-all resize-none"
              />
            </div>

            {/* Действия */}
            <div className="flex gap-4 pt-4">
              <motion.button
                type="submit"
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#2E1065] to-[#8C2F5E] text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Save size={20} />
                Сохранить модуль
              </motion.button>
              <button
                type="button"
                onClick={handleCancelModule}
                className="px-6 py-3 bg-slate-100 text-slate-700 rounded-xl font-semibold hover:bg-slate-200 transition-colors"
              >
                Отмена
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Форма создания/редактирования урока */}
      {(showLessonForm || editingLesson) && currentCourse && (
        <motion.div
          className="bg-white rounded-2xl shadow-lg p-8 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-slate-800">
              {editingLesson ? (
                <>
                  <Edit size={24} className="inline mr-2 text-[#583B8B]" />
                  Редактировать урок
                </>
              ) : (
                <>
                  <Plus size={24} className="inline mr-2 text-[#583B8B]" />
                  Создать новый урок
                </>
              )}
            </h3>
            <p className="text-slate-500 text-sm mt-1">
              Курс: {currentCourse.title}
            </p>
          </div>
          <form onSubmit={handleLessonSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Title */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Название урока *
                </label>
                <input
                  type="text"
                  required
                  value={lessonFormData.title}
                  onChange={(e) => setLessonFormData({ ...lessonFormData, title: e.target.value })}
                  placeholder="Например: Введение в аутентичный маркетинг"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#583B8B] focus:border-transparent transition-all"
                />
              </div>

              {/* Type */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Тип урока *
                </label>
                <select
                  value={lessonFormData.type}
                  onChange={(e) => setLessonFormData({ ...lessonFormData, type: e.target.value as any })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#583B8B] focus:border-transparent transition-all"
                >
                  <option value="constructor">✨ Конструктор</option>
                  <option value="test">✅ Тест</option>
                </select>
              </div>

              {/* Module */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Модуль *
                </label>
                <select
                  value={lessonFormData.moduleId}
                  onChange={(e) => setLessonFormData({ ...lessonFormData, moduleId: Number(e.target.value) })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#583B8B] focus:border-transparent transition-all"
                >
                  <option value={0}>0. Предобучение</option>
                  <option value={1}>1. Аутентичность</option>
                  <option value={2}>2. Ниша</option>
                  <option value={3}>3. Маркетинг</option>
                  <option value={4}>4. Продажи</option>
                  <option value={5}>5. AI-агенты</option>
                  <option value={6}>6. Автоворонки</option>
                  <option value={7}>7. Масштабирование</option>
                </select>
              </div>

              {/* Tariff */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Доступ *
                </label>
                <select
                  value={lessonFormData.tariff}
                  onChange={(e) => setLessonFormData({ ...lessonFormData, tariff: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#583B8B] focus:border-transparent transition-all"
                >
                  <option value="standard">Самостоятельный</option>
                  <option value="curator">С куратором</option>
                  <option value="mentor">С наставником</option>
                </select>
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Статус публикации *
                </label>
                <select
                  value={lessonFormData.status}
                  onChange={(e) => setLessonFormData({ ...lessonFormData, status: e.target.value as 'published' | 'draft' })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#583B8B] focus:border-transparent transition-all"
                >
                  <option value="draft">📝 Черновик (не виден пользователям)</option>
                  <option value="published">👁️ Опубликовано (виден пользователям)</option>
                </select>
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Описание
                </label>
                <textarea
                  value={lessonFormData.description}
                  onChange={(e) => setLessonFormData({ ...lessonFormData, description: e.target.value })}
                  placeholder="Краткое описание урока..."
                  rows={4}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#583B8B] focus:border-transparent transition-all resize-none"
                />
              </div>

              {/* Content Blocks or Test Questions */}
              <div className="md:col-span-2">
                {lessonFormData.type === 'constructor' ? (
                  <>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Блоки контента
                    </label>
                    <div className="mb-4 p-4 bg-[#D1C4E9]/20 border border-[#D1C4E9] rounded-xl">
                      <p className="text-sm text-[#2E1065]">
                        ✨ <strong>Конструктор урока:</strong> Добавьте текстовые блоки с форматированием, видео, аудио и изображения. 
                        <br />
                        🎯 <strong>Управление блоками:</strong> Перетаскивайте блоки мышью, используйте стрелки ⬆️⬇️ для перемещения, 
                        копируйте блоки 📋 одним кликом и удаляйте ненужные 🗑️.
                      </p>
                    </div>
                    <ContentBlockEditor
                      blocks={contentBlocks}
                      onChange={setContentBlocks}
                      containerSettings={containerSettings}
                      onContainerSettingsChange={setContainerSettings}
                    />
                  </>
                ) : (
                  <>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Вопросы теста
                    </label>
                    <div className="mb-4 p-4 bg-cyan-50 border border-cyan-200 rounded-xl">
                      <p className="text-sm text-cyan-800">
                        ✅ <strong>Конструктор теста:</strong> Создайте вопросы с различными типами ответов (один вариант, несколько, текст, шкала и др.).
                        <br />
                        🎯 <strong>Управление вопросами:</strong> Перетаскивайте вопросы для изменения порядка, копируйте и удаляйте ненужные.
                      </p>
                    </div>
                    <TestBuilder
                      questions={testQuestions}
                      onChange={setTestQuestions}
                    />
                  </>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-4">
              <motion.button
                type="submit"
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#2E1065] to-[#8C2F5E] text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Save size={20} />
                Сохранить урок
              </motion.button>
              <button
                type="button"
                onClick={handleCancelLesson}
                className="px-6 py-3 bg-slate-100 text-slate-700 rounded-xl font-semibold hover:bg-slate-200 transition-colors"
              >
                Отмена
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Tabs and Content */}
      <motion.div
        className="bg-white rounded-2xl shadow-lg overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {/* Tabs */}
        <div className="flex border-b border-slate-200">
          <button
            onClick={() => setActiveTab('structure')}
            className={`flex items-center gap-2 px-6 py-4 font-semibold transition-all ${
              activeTab === 'structure'
                ? 'text-[#583B8B] border-b-2 border-[#583B8B] bg-[#D1C4E9]/20'
                : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50'
            }`}
          >
            <FolderTree size={18} />
            Список модулей
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`flex items-center gap-2 px-6 py-4 font-semibold transition-all relative ${
              activeTab === 'reviews'
                ? 'text-[#583B8B] border-b-2 border-[#583B8B] bg-[#D1C4E9]/20'
                : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50'
            }`}
          >
            <Star size={18} />
            Оценки и отзывы
            <span className="px-2 py-0.5 bg-[#583B8B] text-white rounded-full text-xs font-semibold">{reviews.length}</span>
            {unreadReviewsCount > 0 && activeTab !== 'reviews' && (
              <span className="absolute top-2 right-2 w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
            )}
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-8">
          {activeTab === 'structure' && (
            <CourseStructure
              lessons={courseLessons}
              onEdit={handleEditLesson}
              onToggleStatus={toggleStatus}
              onReorder={setLessons}
              onCreateLesson={handleCreateLessonInModule}
              onCopyLesson={copyLesson}
              onCopyModule={copyModule}
            />
          )}

          {activeTab === 'reviews' && (
            <ReviewsSection
              reviews={reviews}
              onMarkAsRead={handleMarkAsRead}
              onMarkAllAsRead={handleMarkAllAsRead}
            />
          )}
        </div>
      </motion.div>
    </div>
  );
}