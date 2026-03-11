import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Plus,
  Trash2,
  Clock,
  Calendar,
  Eye,
  Users,
  Settings,
  X,
  Save,
  Mail,
  ChevronDown,
  ChevronUp,
  Info
} from 'lucide-react';

interface EmailStep {
  id: string;
  templateId: string;
  templateName: string;
  conditions: EmailCondition[];
  enabled: boolean;
}

interface EmailCondition {
  id: string;
  type: 'delay' | 'time_window' | 'specific_date' | 'not_opened' | 'no_login';
  operator?: 'AND' | 'OR';
  delayValue?: number;
  delayUnit?: 'minutes' | 'hours' | 'days';
  startTime?: string;
  endTime?: string;
  weekDays?: number[];
  specificDate?: string;
  notOpenedDays?: number;
  noLoginDays?: number;
}

interface FunnelData {
  id?: string;
  name: string;
  description: string;
  steps: EmailStep[];
  recipientEmails: string[];
  status?: 'active' | 'paused' | 'draft';
}

const MOCK_TEMPLATES = [
  { id: '1', name: 'Приглашение на платформу' },
  { id: '2', name: 'Сброс пароля' },
  { id: '3', name: 'Напоминание о первом уроке' },
  { id: '4', name: 'Поздравление с завершением модуля' },
  { id: '5', name: 'Ремайндер о незавершенном уроке' },
  { id: '6', name: 'Специальное предложение' }
];

// Моковые email-адреса пользователей
const MOCK_USER_EMAILS = [
  { email: 'anna.petrova@example.com', name: 'Анна Петрова', tariff: 'с куратором' },
  { email: 'maria.ivanova@example.com', name: 'Мария Иванова', tariff: 'самостоятельный' },
  { email: 'elena.sidorova@example.com', name: 'Елена Сидорова', tariff: 'с наставником' },
  { email: 'olga.smirnova@example.com', name: 'Ольга Смирнова', tariff: 'работник' },
  { email: 'natalia.kozlova@example.com', name: 'Наталия Козлова', tariff: 'с куратором' },
  { email: 'irina.novikova@example.com', name: 'Ирина Новикова', tariff: 'самостоятельный' },
];

interface FunnelEditorProps {
  funnel?: FunnelData;
  onSave: (funnel: FunnelData) => void;
  onClose: () => void;
}

export function FunnelEditor({ funnel, onSave, onClose }: FunnelEditorProps) {
  const [name, setName] = useState(funnel?.name || '');
  const [description, setDescription] = useState(funnel?.description || '');
  const [steps, setSteps] = useState<EmailStep[]>(funnel?.steps || []);
  const [recipientEmails, setRecipientEmails] = useState<string[]>(funnel?.recipientEmails || []);
  const [showEmailSelector, setShowEmailSelector] = useState(false);
  const [emailSearch, setEmailSearch] = useState('');
  const [expandedStep, setExpandedStep] = useState<string | null>(null);

  const addStep = () => {
    const newStep: EmailStep = {
      id: `step-${Date.now()}`,
      templateId: MOCK_TEMPLATES[0].id,
      templateName: MOCK_TEMPLATES[0].name,
      conditions: [
        { id: `cond-${Date.now()}`, type: 'delay', delayValue: 1, delayUnit: 'days' }
      ],
      enabled: true
    };
    setSteps([...steps, newStep]);
    setExpandedStep(newStep.id);
  };

  const deleteStep = (stepId: string) => {
    setSteps(steps.filter(s => s.id !== stepId));
  };

  const updateStep = (stepId: string, updates: Partial<EmailStep>) => {
    setSteps(steps.map(s => s.id === stepId ? { ...s, ...updates } : s));
  };

  const addCondition = (stepId: string) => {
    setSteps(steps.map(step => {
      if (step.id === stepId) {
        const newCondition: EmailCondition = {
          id: `cond-${Date.now()}`,
          type: 'delay',
          operator: 'AND',
          delayValue: 1,
          delayUnit: 'days'
        };
        return { ...step, conditions: [...step.conditions, newCondition] };
      }
      return step;
    }));
  };

  const deleteCondition = (stepId: string, conditionId: string) => {
    setSteps(steps.map(step => {
      if (step.id === stepId) {
        return { ...step, conditions: step.conditions.filter(c => c.id !== conditionId) };
      }
      return step;
    }));
  };

  const updateCondition = (stepId: string, conditionId: string, updates: Partial<EmailCondition>) => {
    setSteps(steps.map(step => {
      if (step.id === stepId) {
        return {
          ...step,
          conditions: step.conditions.map(c =>
            c.id === conditionId ? { ...c, ...updates } : c
          )
        };
      }
      return step;
    }));
  };

  const toggleEmailSelection = (email: string) => {
    if (recipientEmails.includes(email)) {
      setRecipientEmails(recipientEmails.filter(e => e !== email));
    } else {
      setRecipientEmails([...recipientEmails, email]);
    }
  };

  const handleSave = () => {
    if (!name.trim()) {
      alert('Укажите название воронки');
      return;
    }
    
    if (recipientEmails.length === 0) {
      alert('Выберите хотя бы один email для отслеживания');
      return;
    }

    onSave({
      id: funnel?.id,
      name,
      description,
      steps,
      recipientEmails,
      status: funnel?.status || 'draft'
    });
    onClose();
  };

  const filteredEmails = MOCK_USER_EMAILS.filter(user =>
    user.email.toLowerCase().includes(emailSearch.toLowerCase()) ||
    user.name.toLowerCase().includes(emailSearch.toLowerCase()) ||
    user.tariff.toLowerCase().includes(emailSearch.toLowerCase())
  );

  return (
    <>
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        className="fixed inset-0 flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-hidden shadow-2xl relative flex flex-col"
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#2E1065] to-[#8C2F5E] p-6 text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              {[...Array(20)].map((_, i) => (
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
            
            <div className="relative flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">
                  {funnel ? 'Редактировать воронку' : 'Создать воронку'}
                </h2>
                <p className="text-[#D1C4E9] mt-1">Настройте последовательность писем с условиями</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X size={24} />
              </button>
            </div>
          </div>

          {/* Content - Scrollable */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Basic Info */}
            <div className="bg-gradient-to-br from-[#D1C4E9]/20 to-[#FDE4FF]/20 rounded-2xl p-6 border-2 border-[#D1C4E9]">
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Info size={20} className="text-[#583B8B]" />
                Основная информация
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Название воронки *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Онбординг новых пользователей"
                    className="w-full px-4 py-3 bg-white border-2 border-[#D1C4E9] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#583B8B] focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Описание
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Описание воронки и её целей"
                    rows={3}
                    className="w-full px-4 py-3 bg-white border-2 border-[#D1C4E9] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#583B8B] focus:border-transparent transition-all resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Email Recipients */}
            <div className="bg-gradient-to-br from-[#FDE4FF]/20 to-[#D1C4E9]/20 rounded-2xl p-6 border-2 border-[#D1C4E9]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <Mail size={20} className="text-[#8C2F5E]" />
                  Получатели воронки *
                  <span className="text-sm font-normal text-slate-600">
                    ({recipientEmails.length} выбрано)
                  </span>
                </h3>
                <button
                  onClick={() => setShowEmailSelector(!showEmailSelector)}
                  className="flex items-center gap-2 px-4 py-2 bg-[#8C2F5E] text-white rounded-lg hover:bg-[#2E1065] transition-colors font-semibold text-sm"
                >
                  {showEmailSelector ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  {showEmailSelector ? 'Скрыть' : 'Выбрать'}
                </button>
              </div>

              {/* Selected Emails Display */}
              {recipientEmails.length > 0 && (
                <div className="mb-4 flex flex-wrap gap-2">
                  {recipientEmails.map(email => {
                    const user = MOCK_USER_EMAILS.find(u => u.email === email);
                    return (
                      <span
                        key={email}
                        className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg text-sm border border-[#D1C4E9]"
                      >
                        <span className="font-medium text-slate-800">{user?.name}</span>
                        <button
                          onClick={() => toggleEmailSelection(email)}
                          className="text-slate-400 hover:text-red-600 transition-colors"
                        >
                          <X size={14} />
                        </button>
                      </span>
                    );
                  })}
                </div>
              )}

              {/* Email Selector */}
              {showEmailSelector && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="space-y-3"
                >
                  {/* Search */}
                  <input
                    type="text"
                    value={emailSearch}
                    onChange={(e) => setEmailSearch(e.target.value)}
                    placeholder="Поиск по имени, email или тарифу..."
                    className="w-full px-4 py-2.5 bg-white border-2 border-[#D1C4E9] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8C2F5E] focus:border-transparent"
                  />

                  {/* Email List */}
                  <div className="max-h-60 overflow-y-auto space-y-2 bg-white rounded-xl p-3 border border-[#D1C4E9]">
                    <div className="flex items-center gap-2 mb-2 pb-2 border-b border-[#FDE4FF]">
                      <input
                        type="checkbox"
                        checked={recipientEmails.length === MOCK_USER_EMAILS.length}
                        onChange={() => {
                          if (recipientEmails.length === MOCK_USER_EMAILS.length) {
                            setRecipientEmails([]);
                          } else {
                            setRecipientEmails(MOCK_USER_EMAILS.map(u => u.email));
                          }
                        }}
                        className="w-4 h-4 rounded border-[#D1C4E9] text-[#8C2F5E] focus:ring-[#8C2F5E]"
                      />
                      <span className="font-semibold text-sm text-slate-700">Выбрать всех</span>
                    </div>

                    {filteredEmails.map(user => (
                      <label
                        key={user.email}
                        className="flex items-center gap-3 p-3 hover:bg-[#FDE4FF]/20 rounded-lg cursor-pointer transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={recipientEmails.includes(user.email)}
                          onChange={() => toggleEmailSelection(user.email)}
                          className="w-4 h-4 rounded border-[#D1C4E9] text-[#8C2F5E] focus:ring-[#8C2F5E]"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm text-slate-800">{user.name}</p>
                          <p className="text-xs text-slate-600">{user.email}</p>
                        </div>
                        <span className="px-2 py-1 bg-[#D1C4E9]/30 text-[#2E1065] rounded text-xs font-semibold">
                          {user.tariff}
                        </span>
                      </label>
                    ))}

                    {filteredEmails.length === 0 && (
                      <p className="text-center py-4 text-slate-500 text-sm">
                        Пользователи не найдены
                      </p>
                    )}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Steps */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <Settings size={20} className="text-[#583B8B]" />
                Шаги воронки
                {steps.length > 0 && (
                  <span className="text-sm font-normal text-slate-600">
                    ({steps.length} {steps.length === 1 ? 'шаг' : 'шага'})
                  </span>
                )}
              </h3>

              {steps.length === 0 ? (
                <div className="text-center py-12 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-300">
                  <Settings size={48} className="mx-auto text-slate-300 mb-4" />
                  <p className="text-slate-500 mb-4">Воронка пуста</p>
                  <button
                    onClick={addStep}
                    className="px-6 py-3 bg-gradient-to-r from-[#2E1065] to-[#8C2F5E] text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                  >
                    Добавить первый шаг
                  </button>
                </div>
              ) : (
                steps.map((step, stepIdx) => (
                  <div key={step.id} className="relative">
                    {/* Connector */}
                    {stepIdx > 0 && (
                      <div className="absolute left-8 -top-4 w-0.5 h-4 bg-gradient-to-b from-[#D1C4E9] to-[#583B8B]"></div>
                    )}

                    <div className="bg-slate-50 rounded-2xl p-6 border-2 border-slate-200">
                      {/* Step Header */}
                      <div className="flex items-start gap-4 mb-4">
                        <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-[#2E1065] to-[#8C2F5E] flex items-center justify-center text-white font-bold text-xl shadow-lg">
                          {stepIdx + 1}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Выберите шаблон письма
                          </label>
                          <select
                            value={step.templateId}
                            onChange={(e) => {
                              const template = MOCK_TEMPLATES.find(t => t.id === e.target.value);
                              updateStep(step.id, {
                                templateId: e.target.value,
                                templateName: template?.name || ''
                              });
                            }}
                            className="w-full px-4 py-3 bg-white border-2 border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#583B8B]"
                          >
                            {MOCK_TEMPLATES.map(template => (
                              <option key={template.id} value={template.id}>
                                {template.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="flex gap-2 flex-shrink-0">
                          <button
                            onClick={() => updateStep(step.id, { enabled: !step.enabled })}
                            className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
                              step.enabled
                                ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                            }`}
                          >
                            {step.enabled ? 'Активен' : 'Отключен'}
                          </button>
                          <button
                            onClick={() => setExpandedStep(expandedStep === step.id ? null : step.id)}
                            className="p-2 bg-[#D1C4E9]/20 text-[#583B8B] rounded-lg hover:bg-[#D1C4E9]/30 transition-colors"
                          >
                            {expandedStep === step.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                          </button>
                          <button
                            onClick={() => deleteStep(step.id)}
                            className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>

                      {/* Conditions - Collapsible */}
                      <AnimatePresence>
                        {expandedStep === step.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="space-y-3"
                          >
                            <div className="flex items-center justify-between pt-4 border-t-2 border-slate-300">
                              <h4 className="font-semibold text-slate-700">Условия отправки:</h4>
                              <button
                                onClick={() => addCondition(step.id)}
                                className="flex items-center gap-1 px-3 py-1.5 bg-[#D1C4E9]/20 text-[#583B8B] rounded-lg hover:bg-[#D1C4E9]/30 text-sm font-semibold transition-colors"
                              >
                                <Plus size={14} />
                                Добавить условие
                              </button>
                            </div>

                            {step.conditions.map((condition, condIdx) => (
                              <div key={condition.id}>
                                {/* Operator */}
                                {condIdx > 0 && (
                                  <div className="flex items-center gap-2 my-2">
                                    <div className="h-px flex-1 bg-slate-300"></div>
                                    <select
                                      value={condition.operator || 'AND'}
                                      onChange={(e) => updateCondition(step.id, condition.id, { operator: e.target.value as 'AND' | 'OR' })}
                                      className="px-3 py-1 bg-[#D1C4E9]/30 text-[#2E1065] rounded-lg font-bold text-sm focus:outline-none focus:ring-2 focus:ring-[#583B8B]"
                                    >
                                      <option value="AND">И (AND)</option>
                                      <option value="OR">ИЛИ (OR)</option>
                                    </select>
                                    <div className="h-px flex-1 bg-slate-300"></div>
                                  </div>
                                )}

                                {/* Condition Card */}
                                <div className="bg-white rounded-xl p-4 border-2 border-slate-200">
                                  <div className="flex items-start gap-4">
                                    {/* Icon */}
                                    <div className="flex-shrink-0 mt-1">
                                      {condition.type === 'delay' && <Clock className="text-[#583B8B]" size={20} />}
                                      {condition.type === 'time_window' && <Clock className="text-blue-500" size={20} />}
                                      {condition.type === 'specific_date' && <Calendar className="text-green-500" size={20} />}
                                      {condition.type === 'not_opened' && <Eye className="text-orange-500" size={20} />}
                                      {condition.type === 'no_login' && <Users className="text-red-500" size={20} />}
                                    </div>

                                    {/* Condition Type */}
                                    <div className="flex-1 space-y-3">
                                      <select
                                        value={condition.type}
                                        onChange={(e) => updateCondition(step.id, condition.id, { type: e.target.value as any })}
                                        className="w-full px-4 py-2 bg-slate-50 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#583B8B] font-semibold text-sm"
                                      >
                                        <option value="delay">⏱️ Тайм-аут (Delay)</option>
                                        <option value="time_window">🕐 Временное окно</option>
                                        <option value="specific_date">📅 Конкретная дата</option>
                                        <option value="not_opened">👁️ Не открыл письмо</option>
                                        <option value="no_login">🚫 Не заходил на платформу</option>
                                      </select>

                                      {/* Delay */}
                                      {condition.type === 'delay' && (
                                        <div className="flex gap-2">
                                          <input
                                            type="number"
                                            min="0"
                                            value={condition.delayValue || 0}
                                            onChange={(e) => updateCondition(step.id, condition.id, { delayValue: parseInt(e.target.value) })}
                                            className="flex-1 px-4 py-2 bg-slate-50 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#583B8B]"
                                            placeholder="0"
                                          />
                                          <select
                                            value={condition.delayUnit || 'days'}
                                            onChange={(e) => updateCondition(step.id, condition.id, { delayUnit: e.target.value as any })}
                                            className="px-4 py-2 bg-slate-50 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#583B8B]"
                                          >
                                            <option value="minutes">минут</option>
                                            <option value="hours">часов</option>
                                            <option value="days">дней</option>
                                          </select>
                                        </div>
                                      )}

                                      {/* Time Window */}
                                      {condition.type === 'time_window' && (
                                        <div className="space-y-2">
                                          <div className="flex gap-2">
                                            <div className="flex-1">
                                              <label className="block text-xs text-slate-600 mb-1">С:</label>
                                              <input
                                                type="time"
                                                value={condition.startTime || '09:00'}
                                                onChange={(e) => updateCondition(step.id, condition.id, { startTime: e.target.value })}
                                                className="w-full px-4 py-2 bg-slate-50 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#583B8B]"
                                              />
                                            </div>
                                            <div className="flex-1">
                                              <label className="block text-xs text-slate-600 mb-1">До:</label>
                                              <input
                                                type="time"
                                                value={condition.endTime || '18:00'}
                                                onChange={(e) => updateCondition(step.id, condition.id, { endTime: e.target.value })}
                                                className="w-full px-4 py-2 bg-slate-50 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#583B8B]"
                                              />
                                            </div>
                                          </div>
                                          <p className="text-xs text-slate-500">
                                            📌 Письмо будет отправлено только в указанное время
                                          </p>
                                        </div>
                                      )}

                                      {/* Specific Date */}
                                      {condition.type === 'specific_date' && (
                                        <div>
                                          <input
                                            type="date"
                                            value={condition.specificDate || ''}
                                            onChange={(e) => updateCondition(step.id, condition.id, { specificDate: e.target.value })}
                                            className="w-full px-4 py-2 bg-slate-50 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#583B8B]"
                                          />
                                        </div>
                                      )}

                                      {/* Not Opened */}
                                      {condition.type === 'not_opened' && (
                                        <div>
                                          <div className="flex gap-2 items-center">
                                            <span className="text-sm text-slate-600">Если не открыл письмо в течение</span>
                                            <input
                                              type="number"
                                              min="1"
                                              value={condition.notOpenedDays || 3}
                                              onChange={(e) => updateCondition(step.id, condition.id, { notOpenedDays: parseInt(e.target.value) })}
                                              className="w-20 px-3 py-2 bg-slate-50 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#583B8B]"
                                            />
                                            <span className="text-sm text-slate-600">дней</span>
                                          </div>
                                          <p className="text-xs text-slate-500 mt-2">
                                            📌 Отправить ремайндер, если пользователь не открыл предыдущее письмо
                                          </p>
                                        </div>
                                      )}

                                      {/* No Login */}
                                      {condition.type === 'no_login' && (
                                        <div>
                                          <div className="flex gap-2 items-center">
                                            <span className="text-sm text-slate-600">Если не заходил на платформу</span>
                                            <input
                                              type="number"
                                              min="1"
                                              value={condition.noLoginDays || 7}
                                              onChange={(e) => updateCondition(step.id, condition.id, { noLoginDays: parseInt(e.target.value) })}
                                              className="w-20 px-3 py-2 bg-slate-50 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#583B8B]"
                                            />
                                            <span className="text-sm text-slate-600">дней</span>
                                          </div>
                                          <p className="text-xs text-slate-500 mt-2">
                                            📌 Отправить письмо, если пользователь не посещал платформу
                                          </p>
                                        </div>
                                      )}
                                    </div>

                                    {/* Delete Button */}
                                    <button
                                      onClick={() => deleteCondition(step.id, condition.id)}
                                      className="flex-shrink-0 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                      title="Удалить условие"
                                    >
                                      <Trash2 size={16} />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                ))
              )}

              {/* Add Step Button */}
              {steps.length > 0 && (
                <button
                  onClick={addStep}
                  className="w-full py-4 border-2 border-dashed border-[#D1C4E9] rounded-2xl text-[#583B8B] font-semibold hover:bg-[#D1C4E9]/20 transition-colors flex items-center justify-center gap-2"
                >
                  <Plus size={20} />
                  Добавить следующий шаг
                </button>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t-2 border-slate-200 bg-slate-50 flex gap-3">
            <button
              onClick={onClose}
              className="px-6 py-3 bg-white border-2 border-slate-300 text-slate-700 rounded-xl font-semibold hover:bg-slate-50 transition-colors"
            >
              Отмена
            </button>
            <button
              onClick={handleSave}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#2E1065] to-[#8C2F5E] text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              <Save size={20} />
              Сохранить воронку
            </button>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}