import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Mail,
  Plus,
  Edit2,
  Trash2,
  Clock,
  Calendar,
  Eye,
  Play,
  Pause,
  ChevronDown,
  ChevronUp,
  Settings,
  Zap,
  GitBranch,
  Users
} from 'lucide-react';
import { FunnelEditor } from './FunnelEditor';

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

interface EmailFunnel {
  id: string;
  name: string;
  description: string;
  steps: EmailStep[];
  status: 'active' | 'paused' | 'draft';
  createdAt: string;
  updatedAt: string;
  recipientsCount: number;
  recipientEmails: string[];
}

const INITIAL_FUNNELS: EmailFunnel[] = [
  {
    id: '1',
    name: 'Онбординг новых пользователей',
    description: 'Серия писем для новых участников платформы',
    status: 'active',
    recipientEmails: ['anna.petrova@example.com', 'maria.ivanova@example.com'],
    steps: [
      {
        id: 'step-1',
        templateId: '1',
        templateName: 'Приглашение на платформу',
        conditions: [
          { id: 'cond-1', type: 'delay', delayValue: 0, delayUnit: 'minutes' }
        ],
        enabled: true
      },
      {
        id: 'step-2',
        templateId: '2',
        templateName: 'Напоминание о первом уроке',
        conditions: [
          { id: 'cond-2', type: 'delay', delayValue: 1, delayUnit: 'days' },
          { id: 'cond-3', type: 'time_window', startTime: '09:00', endTime: '18:00', operator: 'AND' }
        ],
        enabled: true
      },
      {
        id: 'step-3',
        templateId: '1',
        templateName: 'Ремайндер (не открыл письмо)',
        conditions: [
          { id: 'cond-4', type: 'not_opened', notOpenedDays: 3 }
        ],
        enabled: true
      }
    ],
    createdAt: '2026-01-10',
    updatedAt: '2026-02-05',
    recipientsCount: 2
  }
];

export function EmailFunnels() {
  const [funnels, setFunnels] = useState<EmailFunnel[]>(INITIAL_FUNNELS);
  const [showEditor, setShowEditor] = useState(false);
  const [editingFunnel, setEditingFunnel] = useState<EmailFunnel | null>(null);
  const [expandedFunnel, setExpandedFunnel] = useState<string | null>(null);

  const openEditor = (funnel?: EmailFunnel) => {
    setEditingFunnel(funnel || null);
    setShowEditor(true);
  };

  const closeEditor = () => {
    setShowEditor(false);
    setEditingFunnel(null);
  };

  const handleSave = (funnelData: any) => {
    if (editingFunnel) {
      // Update existing funnel
      setFunnels(funnels.map(f => 
        f.id === editingFunnel.id 
          ? { 
              ...f, 
              ...funnelData,
              recipientsCount: funnelData.recipientEmails.length,
              updatedAt: new Date().toISOString().split('T')[0] 
            }
          : f
      ));
    } else {
      // Create new funnel
      const newFunnel: EmailFunnel = {
        id: `funnel-${Date.now()}`,
        ...funnelData,
        status: 'draft' as const,
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0],
        recipientsCount: funnelData.recipientEmails.length,
      };
      setFunnels([newFunnel, ...funnels]);
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Вы уверены, что хотите удалить эту воронку?')) {
      setFunnels(funnels.filter(f => f.id !== id));
    }
  };

  const toggleStatus = (id: string) => {
    setFunnels(funnels.map(f => 
      f.id === id 
        ? { ...f, status: f.status === 'active' ? 'paused' : 'active' as const }
        : f
    ));
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      active: 'bg-green-100 text-green-700',
      paused: 'bg-yellow-100 text-yellow-700',
      draft: 'bg-slate-100 text-slate-700',
    };
    const labels = {
      active: 'Активна',
      paused: 'Приостановлена',
      draft: 'Черновик',
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[status as keyof typeof styles]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  const getConditionLabel = (condition: EmailCondition) => {
    switch (condition.type) {
      case 'delay':
        if (condition.delayValue === 0) return 'Сразу';
        return `Через ${condition.delayValue} ${getDelayUnitLabel(condition.delayUnit!)}`;
      case 'time_window':
        return `С ${condition.startTime} до ${condition.endTime}`;
      case 'specific_date':
        return `${new Date(condition.specificDate!).toLocaleDateString('ru-RU')}`;
      case 'not_opened':
        return `Не открыл письмо ${condition.notOpenedDays} дн.`;
      case 'no_login':
        return `Не заходил ${condition.noLoginDays} дн.`;
      default:
        return '';
    }
  };

  const getDelayUnitLabel = (unit: string) => {
    const labels = {
      minutes: 'мин',
      hours: 'ч',
      days: 'дн',
    };
    return labels[unit as keyof typeof labels];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800">Email-воронки</h2>
          <p className="text-sm sm:text-base text-slate-600 mt-1">Автоматизация последовательных рассылок</p>
        </div>
        <motion.button
          onClick={() => openEditor()}
          className="flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-violet-500 to-purple-500 text-white rounded-xl text-sm sm:text-base font-semibold shadow-lg hover:shadow-xl transition-all w-full sm:w-auto justify-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Plus size={18} className="sm:w-5 sm:h-5" />
          Создать воронку
        </motion.button>
      </motion.div>

      {/* Funnels List */}
      <motion.div
        className="space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {funnels.map((funnel, idx) => (
          <motion.div
            key={funnel.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            {/* Funnel Header */}
            <div className="p-4 sm:p-6 bg-gradient-to-r from-violet-50 to-purple-50">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-gradient-to-br from-violet-100 to-purple-100 rounded-xl">
                      <GitBranch size={20} className="text-violet-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-slate-800 text-base sm:text-lg line-clamp-1">{funnel.name}</h3>
                      <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 mt-1">{funnel.description}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 mt-3">
                    {getStatusBadge(funnel.status)}
                    <span className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-600">
                      <Users size={14} />
                      {funnel.recipientsCount} получателей
                    </span>
                    <span className="text-xs text-slate-500">
                      Обновлено: {new Date(funnel.updatedAt).toLocaleDateString('ru-RU')}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2 flex-shrink-0">
                  <motion.button
                    onClick={() => toggleStatus(funnel.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      funnel.status === 'active' 
                        ? 'bg-yellow-50 text-yellow-600 hover:bg-yellow-100' 
                        : 'bg-green-50 text-green-600 hover:bg-green-100'
                    }`}
                    title={funnel.status === 'active' ? 'Приостановить' : 'Запустить'}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {funnel.status === 'active' ? <Pause size={18} /> : <Play size={18} />}
                  </motion.button>

                  <motion.button
                    onClick={() => openEditor(funnel)}
                    className="p-2 bg-violet-50 text-violet-600 rounded-lg hover:bg-violet-100 transition-colors"
                    title="Редактировать"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Edit2 size={18} />
                  </motion.button>

                  <motion.button
                    onClick={() => handleDelete(funnel.id)}
                    className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                    title="Удалить"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Trash2 size={18} />
                  </motion.button>

                  <motion.button
                    onClick={() => setExpandedFunnel(expandedFunnel === funnel.id ? null : funnel.id)}
                    className="p-2 bg-slate-50 text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {expandedFunnel === funnel.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Funnel Steps - Expanded */}
            <AnimatePresence>
              {expandedFunnel === funnel.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="p-4 sm:p-6 space-y-4">
                    {funnel.steps.length === 0 ? (
                      <div className="text-center py-8 text-slate-500">
                        <Mail size={48} className="mx-auto mb-3 text-slate-300" />
                        <p className="mb-2">Шаги воронки не настроены</p>
                        <button
                          onClick={() => openEditor(funnel)}
                          className="mt-4 px-6 py-2.5 bg-gradient-to-r from-violet-500 to-purple-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                        >
                          Настроить шаги воронки
                        </button>
                      </div>
                    ) : (
                      <>
                        {funnel.steps.map((step, stepIdx) => (
                          <div key={step.id} className="relative">
                            {/* Connector Line */}
                            {stepIdx > 0 && (
                              <div className="absolute left-6 -top-4 w-0.5 h-4 bg-gradient-to-b from-violet-200 to-violet-400"></div>
                            )}

                            <div className="flex items-start gap-4">
                              {/* Step Number */}
                              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-lg">
                                {stepIdx + 1}
                              </div>

                              {/* Step Content */}
                              <div className="flex-1 min-w-0 bg-slate-50 rounded-xl p-4">
                                <div className="flex items-start justify-between gap-3">
                                  <div className="flex-1 min-w-0">
                                    <h4 className="font-semibold text-slate-800 mb-2 line-clamp-1">{step.templateName}</h4>
                                    
                                    {/* Conditions */}
                                    <div className="space-y-2">
                                      {step.conditions.map((condition, condIdx) => (
                                        <div key={condition.id}>
                                          {condIdx > 0 && condition.operator && (
                                            <div className="flex items-center gap-2 my-1">
                                              <div className="h-px flex-1 bg-slate-200"></div>
                                              <span className="px-2 py-0.5 bg-violet-100 text-violet-700 text-xs font-bold rounded">
                                                {condition.operator}
                                              </span>
                                              <div className="h-px flex-1 bg-slate-200"></div>
                                            </div>
                                          )}
                                          <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600">
                                            {condition.type === 'delay' && <Clock size={14} className="text-violet-500" />}
                                            {condition.type === 'time_window' && <Clock size={14} className="text-blue-500" />}
                                            {condition.type === 'specific_date' && <Calendar size={14} className="text-green-500" />}
                                            {condition.type === 'not_opened' && <Eye size={14} className="text-orange-500" />}
                                            {condition.type === 'no_login' && <Users size={14} className="text-red-500" />}
                                            <span className="font-medium">{getConditionLabel(condition)}</span>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>

                                  {/* Step Status */}
                                  <div className="flex-shrink-0">
                                    {step.enabled ? (
                                      <span className="flex items-center gap-1 text-xs font-semibold text-green-600">
                                        <Zap size={14} />
                                        Активен
                                      </span>
                                    ) : (
                                      <span className="text-xs font-semibold text-slate-400">Отключен</span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </motion.div>

      {/* Empty State */}
      {funnels.length === 0 && (
        <div className="text-center py-20">
          <GitBranch size={64} className="mx-auto text-slate-300 mb-4" />
          <p className="text-slate-500 text-lg">Нет созданных воронок</p>
          <p className="text-sm text-slate-400 mt-2">Создайте первую автоматическую воронку писем</p>
        </div>
      )}

      {/* Funnel Editor */}
      <AnimatePresence>
        {showEditor && (
          <FunnelEditor
            funnel={editingFunnel ? {
              id: editingFunnel.id,
              name: editingFunnel.name,
              description: editingFunnel.description,
              steps: editingFunnel.steps,
              recipientEmails: editingFunnel.recipientEmails,
              status: editingFunnel.status
            } : undefined}
            onSave={handleSave}
            onClose={closeEditor}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
