import { useState, useCallback, useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft, Save, Eye, FileText, ClipboardList, X, Blocks } from 'lucide-react';
import { ContentBlockEditor, ContentBlock } from '../components/admin/ContentBlockEditor';
import { TestBuilder, Question } from '../components/admin/TestBuilder';

interface LessonFormData {
  title: string;
  type: 'constructor' | 'test';
  moduleId: number;
  tariff: string;
  description: string;
  status: 'published' | 'draft';
}

interface LessonEditorPageProps {
  mode: 'create' | 'edit';
}

const MODULES = [
  { id: 0, title: '0. Предобучение' },
  { id: 1, title: '1. Аутентичность' },
  { id: 2, title: '2. Ниша' },
  { id: 3, title: '3. Маркетинг' },
  { id: 4, title: '4. Продажи' },
  { id: 5, title: '5. AI-агенты' },
  { id: 6, title: '6. Автоворонки' },
  { id: 7, title: '7. Масштабирование' },
];

const TARIFFS = [
  { value: 'free', label: '👤 Работник' },
  { value: 'standard', label: '⭐ Самостоятельный' },
  { value: 'curator', label: '💼 С куратором' },
  { value: 'mentor', label: '👑 С наставником' },
];

const STATUSES = [
  { value: 'draft', label: '📝 Черновик (не виден пользователям)', icon: '📝' },
  { value: 'published', label: '✅ Опубликован', icon: '✅' },
];

export function LessonEditorPage({ mode }: LessonEditorPageProps) {
  const navigate = useNavigate();
  const { lessonId } = useParams();
  const [searchParams] = useSearchParams();
  const moduleIdFromUrl = searchParams.get('moduleId');

  console.log('=== LESSON EDITOR PAGE DEBUG ===');
  console.log('Mode:', mode);
  console.log('LessonId from params:', lessonId);
  console.log('ModuleId from URL:', moduleIdFromUrl);
  console.log('Search params:', Object.fromEntries(searchParams.entries()));

  const [formData, setFormData] = useState<LessonFormData>({
    title: '',
    type: 'constructor',
    moduleId: moduleIdFromUrl ? parseInt(moduleIdFromUrl) : 1,
    tariff: 'standard',
    description: '',
    status: 'draft',
  });

  const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>([]);
  const [testQuestions, setTestQuestions] = useState<Question[]>([]);

  // TODO: При режиме edit загрузить существующий урок
  useEffect(() => {
    if (mode === 'edit' && lessonId) {
      // Здесь будет загрузка урока из базы/state
      console.log('Loading lesson:', lessonId);
    }
    
    if (moduleIdFromUrl) {
      console.log('Setting moduleId from URL:', moduleIdFromUrl);
      setFormData(prev => ({ ...prev, moduleId: parseInt(moduleIdFromUrl) }));
    }
  }, [mode, lessonId, moduleIdFromUrl]);

  const handleSave = () => {
    if (!formData.title.trim()) {
      return;
    }

    if (formData.type === 'constructor' && contentBlocks.length === 0) {
      return;
    }

    if (formData.type === 'test' && testQuestions.length === 0) {
      return;
    }

    const lessonData = {
      ...formData,
      blocks: formData.type === 'constructor' ? contentBlocks : undefined,
      questions: formData.type === 'test' ? testQuestions : undefined,
    };

    console.log('Saving lesson:', lessonData);

    // Переходим на главную страницу (админка останется открытой)
    console.log('Navigating back to home after save');
    navigate('/');
  };

  const handleCancel = () => {
    console.log('Cancel clicked, navigating back to home');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-pink-50/20 pb-20">
      {/* Космический фон */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-violet-400/10 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      {/* Header - sticky */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={handleCancel}
                className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
              >
                <ArrowLeft size={24} className="text-slate-600" />
              </button>
              <div>
                <h1 className="text-3xl font-bold text-slate-800">
                  {mode === 'create' ? (
                    <>
                      <span className="text-violet-600">+</span> Создать новый урок
                    </>
                  ) : (
                    <>
                      <span className="text-violet-600">✏️</span> Редактировать урок
                    </>
                  )}
                </h1>
                <p className="text-slate-500 text-sm mt-1">
                  Курс: Школа аутентичного маркетинга
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleCancel}
                className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold transition-all"
              >
                <X size={18} className="inline mr-2" />
                Отменить
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                <Save size={18} className="inline mr-2" />
                Сохранить урок
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - scrollable */}
      <div className="max-w-7xl mx-auto px-8 py-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden"
        >
          {/* Form Section */}
          <div className="p-8 border-b border-slate-200 bg-gradient-to-r from-violet-50/50 to-purple-50/30">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Основная информация</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Название урока */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Название урока <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Например: Введение в аутентичный маркетинг"
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Тип урока */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Тип урока <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as 'constructor' | 'test' })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all bg-white"
                >
                  <option value="constructor">🧱 Конструктор (видео, текст, медиа)</option>
                  <option value="test">📝 Тест</option>
                </select>
              </div>

              {/* Модуль */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Модуль <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.moduleId}
                  onChange={(e) => setFormData({ ...formData, moduleId: parseInt(e.target.value) })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all bg-white"
                >
                  {MODULES.map((module) => (
                    <option key={module.id} value={module.id}>
                      {module.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Доступ */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Доступ <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.tariff}
                  onChange={(e) => setFormData({ ...formData, tariff: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all bg-white"
                >
                  {TARIFFS.map((tariff) => (
                    <option key={tariff.value} value={tariff.value}>
                      {tariff.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Статус публикации */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Статус публикации <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as 'published' | 'draft' })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all bg-white"
                >
                  {STATUSES.map((status) => (
                    <option key={status.value} value={status.value}>
                      {status.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Описание */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Описание
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Краткое описание урока..."
                  rows={3}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all resize-none"
                />
              </div>
            </div>
          </div>

          {/* Content Editor */}
          <div className="p-8">
            {formData.type === 'constructor' ? (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <Blocks size={24} className="text-violet-600" />
                  <h2 className="text-2xl font-bold text-slate-800">Блоки контента</h2>
                </div>
                <ContentBlockEditor
                  blocks={contentBlocks}
                  onChange={setContentBlocks}
                />
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <ClipboardList size={24} className="text-violet-600" />
                  <h2 className="text-2xl font-bold text-slate-800">Вопросы теста</h2>
                </div>
                <TestBuilder
                  questions={testQuestions}
                  onChange={setTestQuestions}
                />
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}