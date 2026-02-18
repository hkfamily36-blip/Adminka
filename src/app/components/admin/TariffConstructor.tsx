import { useState } from 'react';
import { motion } from 'motion/react';
import { Plus, Trash2, Edit2, Check, X, ChevronDown, ChevronUp, DollarSign, Package, CheckSquare, Square, Save } from 'lucide-react';
import { toast } from 'sonner';

interface Module {
  id: number;
  title: string;
  lessons: Array<{
    id: string;
    title: string;
  }>;
}

interface TariffModuleSelection {
  moduleId: number;
  moduleName: string;
  allLessons: boolean;
  selectedLessons: string[];
}

interface TariffData {
  id: string;
  name: string;
  key: string;
  price: number;
  modules: TariffModuleSelection[];
  additionalOptions: string[];
}

// Моковые данные модулей (в реальном приложении это будет из контекста или API)
const MOCK_MODULES: Module[] = [
  { 
    id: 0, 
    title: '0. Предобучение',
    lessons: [
      { id: '0.1', title: 'Организационный урок' },
      { id: '0.2', title: 'Мышление предпринимателя' },
      { id: '0.3', title: 'Проверка готовности' },
      { id: '0.4', title: 'Постановка целей' },
    ]
  },
  { 
    id: 1, 
    title: '1. Аутентичность',
    lessons: [
      { id: '1.1', title: 'Распаковка личности' },
      { id: '1.2', title: 'Архитектура продукта' },
      { id: '1.3', title: 'Ценообразование' },
      { id: '1.4', title: 'Разбор ДЗ куратором' },
      { id: '1.5', title: 'Групповой созвон: Вопросы' },
      { id: '1.6', title: 'VIP Стратегия: Личный бренд' },
      { id: '1.7', title: 'Секретные связки продаж' },
    ]
  },
  { 
    id: 2, 
    title: '2. Своя ЦА',
    lessons: [
      { id: '2.1', title: 'Сегментация ЦА' },
      { id: '2.2', title: 'Проведение CustDev' },
      { id: '2.3', title: 'Мастермайнд: Разбор аватаров' },
    ]
  },
  { id: 3, title: '3. Продукты и Метод', lessons: [] },
  { id: 4, title: '4. Воронка продаж', lessons: [] },
  { id: 5, title: '5. Технология продаж', lessons: [] },
  { id: 6, title: '6. Блог и Соцсети', lessons: [] },
  { id: 7, title: '7. Команда', lessons: [] },
];

const DEFAULT_ADDITIONAL_OPTIONS = [
  'Доступ к закрытому Telegram-чату',
  'Еженедельные групповые созвоны',
  'Проверка домашних заданий',
  'Персональная обратная связь',
  'Доступ к базе знаний',
  'Сертификат о прохождении',
];

export function TariffConstructor() {
  const [tariffs, setTariffs] = useState<TariffData[]>([
    {
      id: 'tariff-1',
      name: 'Работник',
      key: 'free',
      price: 0,
      modules: [],
      additionalOptions: [],
    },
    {
      id: 'tariff-2',
      name: 'Самостоятельный',
      key: 'standard',
      price: 29900,
      modules: [
        {
          moduleId: 0,
          moduleName: '0. Предобучение',
          allLessons: true,
          selectedLessons: [],
        },
        {
          moduleId: 1,
          moduleName: '1. Аутентичность',
          allLessons: false,
          selectedLessons: ['1.1', '1.2', '1.3'],
        },
      ],
      additionalOptions: ['Доступ к базе знаний', 'Сертификат о прохождении'],
    },
    {
      id: 'tariff-3',
      name: 'С куратором',
      key: 'curator',
      price: 59900,
      modules: [
        {
          moduleId: 0,
          moduleName: '0. Предобучение',
          allLessons: true,
          selectedLessons: [],
        },
        {
          moduleId: 1,
          moduleName: '1. Аутентичность',
          allLessons: true,
          selectedLessons: [],
        },
      ],
      additionalOptions: [
        'Доступ к закрытому Telegram-чату',
        'Еженедельные групповые созвоны',
        'Проверка домашних заданий',
        'Доступ к базе знаний',
        'Сертификат о прохождении',
      ],
    },
    {
      id: 'tariff-4',
      name: 'С наставником',
      key: 'mentor',
      price: 99900,
      modules: [
        {
          moduleId: 0,
          moduleName: '0. Предобучение',
          allLessons: true,
          selectedLessons: [],
        },
        {
          moduleId: 1,
          moduleName: '1. Аутентичность',
          allLessons: true,
          selectedLessons: [],
        },
        {
          moduleId: 2,
          moduleName: '2. Своя ЦА',
          allLessons: true,
          selectedLessons: [],
        },
      ],
      additionalOptions: DEFAULT_ADDITIONAL_OPTIONS,
    },
  ]);

  const [editingTariff, setEditingTariff] = useState<string | null>(null);
  const [expandedTariff, setExpandedTariff] = useState<string | null>(null);
  const [expandedModules, setExpandedModules] = useState<Record<string, number[]>>({});

  const handleAddTariff = () => {
    const newTariff: TariffData = {
      id: `tariff-${Date.now()}`,
      name: 'Новый тариф',
      key: 'new-tariff',
      price: 0,
      modules: [],
      additionalOptions: [],
    };
    setTariffs([newTariff, ...tariffs]); // Добавляем в начало массива
    setEditingTariff(newTariff.id);
    setExpandedTariff(newTariff.id);
  };

  const handleDeleteTariff = (id: string) => {
    setTariffs(tariffs.filter(t => t.id !== id));
  };

  const handleUpdateTariff = (id: string, updates: Partial<TariffData>) => {
    setTariffs(tariffs.map(t => t.id === id ? { ...t, ...updates } : t));
  };

  const handleToggleModule = (tariffId: string, moduleId: number) => {
    const tariff = tariffs.find(t => t.id === tariffId);
    if (!tariff) return;

    const module = MOCK_MODULES.find(m => m.id === moduleId);
    if (!module) return;

    const existingModule = tariff.modules.find(m => m.moduleId === moduleId);
    
    if (existingModule) {
      // Удаляем модуль
      handleUpdateTariff(tariffId, {
        modules: tariff.modules.filter(m => m.moduleId !== moduleId),
      });
    } else {
      // Добавляем модуль
      handleUpdateTariff(tariffId, {
        modules: [
          ...tariff.modules,
          {
            moduleId,
            moduleName: module.title,
            allLessons: true,
            selectedLessons: [],
          },
        ],
      });
    }
  };

  const handleToggleAllLessons = (tariffId: string, moduleId: number) => {
    const tariff = tariffs.find(t => t.id === tariffId);
    if (!tariff) return;

    const tariffModule = tariff.modules.find(m => m.moduleId === moduleId);
    if (!tariffModule) return;

    // Если переключаем на "не все уроки", автоматически раскрываем модуль
    if (tariffModule.allLessons) {
      // Раскрываем модуль для выбора отдельных уроков
      setExpandedModules(prev => {
        const tariffModules = prev[tariffId] || [];
        if (!tariffModules.includes(moduleId)) {
          return {
            ...prev,
            [tariffId]: [...tariffModules, moduleId],
          };
        }
        return prev;
      });
    }

    handleUpdateTariff(tariffId, {
      modules: tariff.modules.map(m =>
        m.moduleId === moduleId
          ? { ...m, allLessons: !m.allLessons, selectedLessons: [] }
          : m
      ),
    });
  };

  const handleToggleLesson = (tariffId: string, moduleId: number, lessonId: string) => {
    const tariff = tariffs.find(t => t.id === tariffId);
    if (!tariff) return;

    handleUpdateTariff(tariffId, {
      modules: tariff.modules.map(m => {
        if (m.moduleId === moduleId) {
          const isSelected = m.selectedLessons.includes(lessonId);
          return {
            ...m,
            selectedLessons: isSelected
              ? m.selectedLessons.filter(id => id !== lessonId)
              : [...m.selectedLessons, lessonId],
          };
        }
        return m;
      }),
    });
  };

  const handleToggleOption = (tariffId: string, option: string) => {
    const tariff = tariffs.find(t => t.id === tariffId);
    if (!tariff) return;

    const hasOption = tariff.additionalOptions.includes(option);
    handleUpdateTariff(tariffId, {
      additionalOptions: hasOption
        ? tariff.additionalOptions.filter(o => o !== option)
        : [...tariff.additionalOptions, option],
    });
  };

  const toggleModuleExpansion = (tariffId: string, moduleId: number) => {
    setExpandedModules(prev => {
      const tariffModules = prev[tariffId] || [];
      const isExpanded = tariffModules.includes(moduleId);
      return {
        ...prev,
        [tariffId]: isExpanded
          ? tariffModules.filter(id => id !== moduleId)
          : [...tariffModules, moduleId],
      };
    });
  };

  const handleSaveTariff = (tariffId: string) => {
    const tariff = tariffs.find(t => t.id === tariffId);
    if (!tariff) return;

    // В реальном приложении здесь был бы API-запрос на сохранение
    // Например: await saveTariffToDatabase(tariff);

    toast.success('Тариф сохранён', {
      description: `Настройки тарифа "${tariff.name}" успешно сохранены`,
    });

    // Выходим из режима редактирования
    if (editingTariff === tariffId) {
      setEditingTariff(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-[#2E1065] via-[#7C3AED] to-[#EC4899] bg-clip-text text-transparent">
            Конструктор тарифов
          </h2>
          <p className="text-slate-600 mt-1">Управление тарифными планами и доступом к контенту</p>
        </div>
        <button
          onClick={handleAddTariff}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl hover:shadow-lg hover:shadow-violet-300/50 transition-all hover:-translate-y-0.5"
        >
          <Plus size={20} />
          Добавить тариф
        </button>
      </div>

      {/* Tariffs List */}
      <div className="space-y-4">
        {tariffs.map((tariff, idx) => {
          const isExpanded = expandedTariff === tariff.id;
          const isEditing = editingTariff === tariff.id;

          return (
            <motion.div
              key={tariff.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              {/* Tariff Header */}
              <div className="p-6 border-b border-slate-100">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    {isEditing ? (
                      <div className="flex items-center gap-3">
                        <input
                          type="text"
                          value={tariff.name}
                          onChange={(e) => handleUpdateTariff(tariff.id, { name: e.target.value })}
                          className="text-xl font-bold text-slate-800 bg-slate-50 px-3 py-1 rounded-lg border-2 border-violet-300 focus:outline-none focus:border-violet-500"
                          placeholder="Название тарифа"
                        />
                        <button
                          onClick={() => setEditingTariff(null)}
                          className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                        >
                          <Check size={18} />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <h3 className="text-xl font-bold text-slate-800">{tariff.name}</h3>
                        <button
                          onClick={() => setEditingTariff(tariff.id)}
                          className="p-1.5 text-slate-400 hover:text-violet-600 transition-colors"
                        >
                          <Edit2 size={16} />
                        </button>
                      </div>
                    )}
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-2">
                        <DollarSign size={16} className="text-slate-400" />
                        <input
                          type="number"
                          value={tariff.price}
                          onChange={(e) => handleUpdateTariff(tariff.id, { price: parseInt(e.target.value) || 0 })}
                          className="text-lg font-semibold text-green-600 bg-slate-50 px-2 py-0.5 rounded-lg border border-slate-200 focus:outline-none focus:border-green-500 w-32"
                        />
                        <span className="text-slate-500">₽</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <Package size={16} />
                        <span>{tariff.modules.length} модулей</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setExpandedTariff(isExpanded ? null : tariff.id)}
                      className="p-2 text-slate-400 hover:text-violet-600 transition-colors"
                    >
                      {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                    <button
                      onClick={() => handleDeleteTariff(tariff.id)}
                      className="p-2 text-slate-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Tariff Content */}
              {isExpanded && (
                <div className="p-6 space-y-6">
                  {/* Modules Section */}
                  <div>
                    <h4 className="text-lg font-bold text-slate-800 mb-3">Модули и уроки</h4>
                    <div className="space-y-3">
                      {MOCK_MODULES.map((module) => {
                        const tariffModule = tariff.modules.find(m => m.moduleId === module.id);
                        const isModuleExpanded = expandedModules[tariff.id]?.includes(module.id);
                        const isModuleSelected = !!tariffModule;

                        return (
                          <div key={module.id} className="bg-slate-50 rounded-xl p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3 flex-1">
                                <button
                                  onClick={() => handleToggleModule(tariff.id, module.id)}
                                  className="text-violet-600 hover:text-violet-700 transition-colors"
                                >
                                  {isModuleSelected ? <CheckSquare size={20} /> : <Square size={20} />}
                                </button>
                                <span className="font-semibold text-slate-700">{module.title}</span>
                                {module.lessons.length > 0 && (
                                  <span className="text-sm text-slate-500">({module.lessons.length} уроков)</span>
                                )}
                              </div>
                              {isModuleSelected && module.lessons.length > 0 && (
                                <button
                                  onClick={() => toggleModuleExpansion(tariff.id, module.id)}
                                  className="p-1 text-slate-400 hover:text-violet-600 transition-colors"
                                >
                                  {isModuleExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                                </button>
                              )}
                            </div>

                            {/* Module Settings */}
                            {isModuleSelected && module.lessons.length > 0 && (
                              <div className="mt-3 space-y-2">
                                <div className="flex items-center gap-2 pl-8">
                                  <input
                                    type="checkbox"
                                    checked={tariffModule.allLessons}
                                    onChange={() => handleToggleAllLessons(tariff.id, module.id)}
                                    className="w-4 h-4 text-violet-600 rounded focus:ring-violet-500"
                                  />
                                  <label className="text-sm text-slate-600">Все уроки модуля</label>
                                </div>

                                {/* Individual Lessons */}
                                {!tariffModule.allLessons && isModuleExpanded && (
                                  <div className="pl-8 space-y-2 mt-2">
                                    {module.lessons.map((lesson) => {
                                      const isLessonSelected = tariffModule.selectedLessons.includes(lesson.id);
                                      return (
                                        <div key={lesson.id} className="flex items-center gap-2">
                                          <button
                                            onClick={() => handleToggleLesson(tariff.id, module.id, lesson.id)}
                                            className="text-violet-600 hover:text-violet-700 transition-colors"
                                          >
                                            {isLessonSelected ? <CheckSquare size={16} /> : <Square size={16} />}
                                          </button>
                                          <span className="text-sm text-slate-600">{lesson.title}</span>
                                        </div>
                                      );
                                    })}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Additional Options Section */}
                  <div>
                    <h4 className="text-lg font-bold text-slate-800 mb-3">Дополнительные опции</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {DEFAULT_ADDITIONAL_OPTIONS.map((option) => {
                        const isSelected = tariff.additionalOptions.includes(option);
                        return (
                          <div
                            key={option}
                            className="flex items-center gap-2 bg-slate-50 rounded-lg p-3 cursor-pointer hover:bg-slate-100 transition-colors"
                            onClick={() => handleToggleOption(tariff.id, option)}
                          >
                            {isSelected ? (
                              <CheckSquare size={18} className="text-violet-600" />
                            ) : (
                              <Square size={18} className="text-slate-400" />
                            )}
                            <span className="text-sm text-slate-700">{option}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Save Button */}
                  <div className="flex justify-end pt-4 border-t border-slate-100">
                    <button
                      onClick={() => handleSaveTariff(tariff.id)}
                      className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:shadow-lg transition-all"
                    >
                      <Save size={18} />
                      Сохранить изменения
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}