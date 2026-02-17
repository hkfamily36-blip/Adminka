import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Mail,
  Plus,
  Edit2,
  Trash2,
  Save,
  X,
  Bold,
  Italic,
  Underline,
  Link as LinkIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Code,
  Type,
  RotateCcw,
  GitBranch,
  FileText,
  Send
} from 'lucide-react';
import { EmailFunnels } from './EmailFunnels';
import { TestEmailSender } from './TestEmailSender';

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  preheader: string;
  body: string;
  createdAt: string;
  updatedAt: string;
}

const INITIAL_TEMPLATES: EmailTemplate[] = [
  {
    id: '1',
    name: 'Приглашение на платформу',
    subject: 'Добро пожаловать в Школу аутентичного маркетинга!',
    preheader: 'Подтвердите регистрацию',
    body: 'Для того, чтобы подтвердить регистрацию, перейдите, пожалуйста, по <a href="{link}">ссылке</a>.',
    createdAt: '2026-01-15',
    updatedAt: '2026-02-05',
  },
  {
    id: '2',
    name: 'Сброс пароля',
    subject: 'Восстановление пароля',
    preheader: 'Запрос на сброс пароля',
    body: 'Вы запросили сброс пароля. Для создания нового пароля перейдите по <a href="{link}">ссылке</a>.',
    createdAt: '2026-01-10',
    updatedAt: '2026-01-20',
  },
];

export function EmailTemplates() {
  const [templates, setTemplates] = useState<EmailTemplate[]>(INITIAL_TEMPLATES);
  const [showEditor, setShowEditor] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<EmailTemplate | null>(null);
  const [showTestEmail, setShowTestEmail] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    preheader: '',
    body: '',
  });

  const openEditor = (template?: EmailTemplate) => {
    if (template) {
      setEditingTemplate(template);
      setFormData({
        name: template.name,
        subject: template.subject,
        preheader: template.preheader,
        body: template.body,
      });
    } else {
      setEditingTemplate(null);
      setFormData({
        name: '',
        subject: '',
        preheader: '',
        body: '',
      });
    }
    setShowEditor(true);
  };

  const closeEditor = () => {
    setShowEditor(false);
    setEditingTemplate(null);
    setFormData({
      name: '',
      subject: '',
      preheader: '',
      body: '',
    });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingTemplate) {
      // Update existing template
      setTemplates(templates.map(t =>
        t.id === editingTemplate.id
          ? { ...t, ...formData, updatedAt: new Date().toISOString().split('T')[0] }
          : t
      ));
    } else {
      // Create new template
      const newTemplate: EmailTemplate = {
        id: `template-${Date.now()}`,
        ...formData,
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0],
      };
      setTemplates([newTemplate, ...templates]);
    }
    closeEditor();
  };

  const handleDelete = (id: string) => {
    if (confirm('Вы уверены, что хотите удалить этот шаблон?')) {
      setTemplates(templates.filter(t => t.id !== id));
    }
  };

  const handleReset = () => {
    if (editingTemplate) {
      setFormData({
        name: editingTemplate.name,
        subject: editingTemplate.subject,
        preheader: editingTemplate.preheader,
        body: editingTemplate.body,
      });
    } else {
      setFormData({
        name: '',
        subject: '',
        preheader: '',
        body: '',
      });
    }
  };

  const insertVariable = (variable: string) => {
    setFormData({ ...formData, subject: `${formData.subject}{${variable}}` });
  };

  const insertVariableInBody = (variable: string) => {
    setFormData({ ...formData, body: `${formData.body}{${variable}}` });
  };

  const insertVariableInPreheader = (variable: string) => {
    setFormData({ ...formData, preheader: `${formData.preheader}{${variable}}` });
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
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800">Настройка почт</h2>
          <p className="text-sm sm:text-base text-slate-600 mt-1">Управление email-шаблонами для пользователей</p>
        </div>
        <motion.button
          onClick={() => openEditor()}
          className="flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-violet-500 to-purple-500 text-white rounded-xl text-sm sm:text-base font-semibold shadow-lg hover:shadow-xl transition-all w-full sm:w-auto justify-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Plus size={18} className="sm:w-5 sm:h-5" />
          Создать шаблон
        </motion.button>
      </motion.div>

      {/* Templates List */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {templates.map((template, idx) => (
          <motion.div
            key={template.id}
            className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all relative overflow-hidden group flex flex-col"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            {/* Cosmic effects */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 rounded-full blur-2xl group-hover:blur-3xl transition-all"></div>

            <div className="relative flex flex-col flex-1">
              <div className="flex items-start justify-between mb-3 sm:mb-4">
                <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                  <div className="p-2 sm:p-3 bg-gradient-to-br from-violet-100 to-purple-100 rounded-xl flex-shrink-0">
                    <Mail size={18} className="text-violet-600 sm:w-5 sm:h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold text-slate-800 text-sm sm:text-base line-clamp-2">{template.name}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Обновлено: {new Date(template.updatedAt).toLocaleDateString('ru-RU')}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2 sm:space-y-3 mb-3 sm:mb-4 flex-1">
                <div>
                  <p className="text-xs text-slate-500 mb-1">Тема:</p>
                  <p className="text-xs sm:text-sm text-slate-700 font-semibold line-clamp-2">{template.subject}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">Превьюер:</p>
                  <p className="text-xs sm:text-sm text-slate-600 line-clamp-2">{template.preheader}</p>
                </div>
              </div>

              <div className="flex gap-2 items-center mt-auto">
                <motion.button
                  onClick={() => openEditor(template)}
                  className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2.5 bg-violet-50 text-violet-600 rounded-lg text-xs sm:text-sm font-semibold hover:bg-violet-100 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Edit2 size={14} className="sm:w-4 sm:h-4" />
                  <span className="hidden xs:inline">Редактировать</span>
                  <span className="xs:hidden">Ред.</span>
                </motion.button>
                <motion.button
                  onClick={() => handleDelete(template.id)}
                  className="p-2.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors flex-shrink-0"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  title="Удалить"
                >
                  <Trash2 size={14} className="sm:w-4 sm:h-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Empty State */}
      {templates.length === 0 && (
        <div className="text-center py-20">
          <Mail size={64} className="mx-auto text-slate-300 mb-4" />
          <p className="text-slate-500 text-lg">Нет созданных шаблонов</p>
          <p className="text-sm text-slate-400 mt-2">Создайте первый шаблон email</p>
        </div>
      )}

      {/* Editor Modal */}
      <AnimatePresence>
        {showEditor && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeEditor}
            />

            {/* Modal */}
            <motion.div
              className="fixed inset-0 flex items-center justify-center z-50 p-4 overflow-y-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white rounded-3xl p-8 max-w-3xl w-full my-8 shadow-2xl relative"
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Космические эффекты */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-pink-500/20 to-purple-500/20 rounded-full blur-2xl"></div>

                {/* Close Button */}
                <button
                  onClick={closeEditor}
                  className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-lg transition-colors z-10"
                >
                  <X size={20} />
                </button>

                {/* Header */}
                <div className="relative mb-6">
                  <h2 className="text-2xl font-bold text-slate-800">
                    {editingTemplate ? 'Редактирование шаблона' : 'Создание шаблона'}
                  </h2>
                  <p className="text-slate-600 mt-1">Создайте шаблон email-письма для пользователей</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSave} className="relative space-y-4">
                  {/* Название */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Название
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Введите название"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                    />
                  </div>

                  {/* Тема письма */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-semibold text-slate-700">
                        Тема письма
                      </label>
                      <button
                        type="button"
                        onClick={() => insertVariable('name')}
                        className="text-xs text-violet-600 hover:text-violet-700 font-semibold"
                      >
                        + Добавить переменные
                      </button>
                    </div>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Подтверждение регистрации"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                    />
                  </div>

                  {/* Превьюер */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-semibold text-slate-700">
                        Превьюер
                      </label>
                      <button
                        type="button"
                        onClick={() => insertVariableInPreheader('name')}
                        className="text-xs text-violet-600 hover:text-violet-700 font-semibold"
                      >
                        + Добавить переменные
                      </button>
                    </div>
                    <input
                      type="text"
                      value={formData.preheader}
                      onChange={(e) => setFormData({ ...formData, preheader: e.target.value })}
                      placeholder="Введите превьюер"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                    />
                  </div>

                  {/* Тело письма */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-semibold text-slate-700">
                        Тело письма
                      </label>
                      <button
                        type="button"
                        onClick={() => insertVariableInBody('link')}
                        className="text-xs text-violet-600 hover:text-violet-700 font-semibold"
                      >
                        + Добавить переменные
                      </button>
                    </div>
                    
                    {/* Toolbar */}
                    <div className="flex flex-wrap gap-1 p-2 bg-slate-100 border border-slate-200 rounded-t-xl">
                      <button type="button" className="p-2 hover:bg-white rounded transition-colors" title="Жирный">
                        <Bold size={16} className="text-slate-600" />
                      </button>
                      <button type="button" className="p-2 hover:bg-white rounded transition-colors" title="Курсив">
                        <Italic size={16} className="text-slate-600" />
                      </button>
                      <button type="button" className="p-2 hover:bg-white rounded transition-colors" title="Подчеркнутый">
                        <Underline size={16} className="text-slate-600" />
                      </button>
                      <div className="w-px bg-slate-300 mx-1"></div>
                      <button type="button" className="p-2 hover:bg-white rounded transition-colors" title="По левому краю">
                        <AlignLeft size={16} className="text-slate-600" />
                      </button>
                      <button type="button" className="p-2 hover:bg-white rounded transition-colors" title="По центру">
                        <AlignCenter size={16} className="text-slate-600" />
                      </button>
                      <button type="button" className="p-2 hover:bg-white rounded transition-colors" title="По правому краю">
                        <AlignRight size={16} className="text-slate-600" />
                      </button>
                      <div className="w-px bg-slate-300 mx-1"></div>
                      <button type="button" className="p-2 hover:bg-white rounded transition-colors" title="Список">
                        <List size={16} className="text-slate-600" />
                      </button>
                      <button type="button" className="p-2 hover:bg-white rounded transition-colors" title="Нумерованный список">
                        <ListOrdered size={16} className="text-slate-600" />
                      </button>
                      <div className="w-px bg-slate-300 mx-1"></div>
                      <button type="button" className="p-2 hover:bg-white rounded transition-colors" title="Ссылка">
                        <LinkIcon size={16} className="text-slate-600" />
                      </button>
                      <button type="button" className="p-2 hover:bg-white rounded transition-colors" title="Код">
                        <Code size={16} className="text-slate-600" />
                      </button>
                      <button type="button" className="p-2 hover:bg-white rounded transition-colors" title="Размер текста">
                        <Type size={16} className="text-slate-600" />
                      </button>
                    </div>

                    <textarea
                      required
                      value={formData.body}
                      onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                      placeholder="Для того, чтобы подтвердить регистрацию, перейдите, пожалуйста, по ссылке."
                      rows={8}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 border-t-0 rounded-b-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all resize-none"
                    />
                    <p className="text-xs text-slate-500 mt-2">
                      Для того, чтобы подтвердить регистрацию, перейдите, пожалуйста, по <span className="text-violet-600 font-semibold">ссылке</span>.
                    </p>
                  </div>

                  {/* Текстовая версия (опционально) */}
                  <div className="pt-4">
                    <button
                      type="button"
                      className="text-sm text-violet-600 hover:text-violet-700 font-semibold"
                    >
                      Создать текстовую версию
                    </button>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="flex items-center gap-2 px-6 py-3 bg-slate-100 text-slate-700 rounded-xl font-semibold hover:bg-slate-200 transition-colors"
                    >
                      <RotateCcw size={18} />
                      Сброс
                    </button>
                    <motion.button
                      type="button"
                      onClick={() => setShowTestEmail(true)}
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Send size={18} />
                      Отправить тест
                    </motion.button>
                    <div className="flex-1"></div>
                    <button
                      type="button"
                      onClick={closeEditor}
                      className="px-6 py-3 bg-slate-100 text-slate-700 rounded-xl font-semibold hover:bg-slate-200 transition-colors"
                    >
                      Отмена
                    </button>
                    <motion.button
                      type="submit"
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Save size={20} />
                      Сохранить
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Test Email Sender */}
      <AnimatePresence>
        {showTestEmail && (
          <TestEmailSender
            templateName={formData.name || 'Email-шаблон'}
            subject={formData.subject}
            body={formData.body}
            onClose={() => setShowTestEmail(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}