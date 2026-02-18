import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, FileText, Sparkles, Bold, Italic, List, Link2, Image as ImageIcon, Loader2, Mail, ListOrdered } from 'lucide-react';
import { toast } from 'sonner';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import './EmailEditor.css';

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  category: 'welcome' | 'reminder' | 'marketing' | 'support';
}

interface EmailComposerModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipientEmail: string;
  recipientName: string;
  userId: string;
  onEmailSent?: (emailData: EmailLogEntry) => void;
}

export interface EmailLogEntry {
  id: string;
  userId: string;
  to: string;
  subject: string;
  body: string;
  sentAt: string;
  status: 'queued' | 'sent' | 'delivered' | 'failed';
  error?: string;
}

const EMAIL_TEMPLATES: EmailTemplate[] = [
  {
    id: 'welcome',
    name: 'Приветственное письмо',
    subject: 'Добро пожаловать в Школу аутентичного маркетинга!',
    body: `<p>Здравствуйте, <strong>{{name}}</strong>!</p>
<p>Рады приветствовать вас в нашей школе. Мы создали для вас уникальную образовательную программу, которая поможет построить бизнес-систему из 8 элементов с использованием AI-агентов.</p>
<p>Ваши следующие шаги:</p>
<ul>
  <li>Изучите первый модуль "Основы маркетинга"</li>
  <li>Присоединяйтесь к нашему сообществу в Telegram</li>
  <li>Задавайте вопросы вашему куратору</li>
</ul>
<p>С уважением,<br/>Команда Школы Сухаревой Анастасии</p>`,
    category: 'welcome',
  },
  {
    id: 'reminder-lesson',
    name: 'Напоминание о незавершённых уроках',
    subject: 'У вас есть незавершённые уроки',
    body: `<p>Здравствуйте, <strong>{{name}}</strong>!</p>
<p>Мы заметили, что у вас остались незавершённые уроки. Продолжайте обучение, чтобы достичь максимальных результатов!</p>
<p>Ваш прогресс важен для нас. Если у вас возникли вопросы или сложности, наша команда всегда готова помочь.</p>
<p>С уважением,<br/>Команда Школы Сухаревой Анастасии</p>`,
    category: 'reminder',
  },
  {
    id: 'upgrade-offer',
    name: 'Предложение об апгрейде тарифа',
    subject: 'Специальное предложение: расширьте свои возможности',
    body: `<p>Здравствуйте, <strong>{{name}}</strong>!</p>
<p>Мы подготовили для вас специальное предложение на повышение тарифа. Получите доступ к:</p>
<ul>
  <li>Индивидуальным консультациям с куратором</li>
  <li>Эксклюзивным материалам и кейсам</li>
  <li>Приоритетной поддержке</li>
</ul>
<p>Это предложение действует ограниченное время!</p>
<p>С уважением,<br/>Команда Школы Сухаревой Анастасии</p>`,
    category: 'marketing',
  },
  {
    id: 'support-response',
    name: 'Ответ в поддержку',
    subject: 'Re: Ваш вопрос',
    body: `<p>Здравствуйте, <strong>{{name}}</strong>!</p>
<p>Спасибо за ваш вопрос. Мы рады помочь вам.</p>
<p>[Ваш ответ здесь]</p>
<p>Если у вас остались вопросы, не стесняйтесь обращаться!</p>
<p>С уважением,<br/>Команда Школы Сухаревой Анастасии</p>`,
    category: 'support',
  },
];

export function EmailComposerModal({
  isOpen,
  onClose,
  recipientEmail,
  recipientName,
  userId,
  onEmailSent,
}: EmailComposerModalProps) {
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [showTemplates, setShowTemplates] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Введите текст письма',
      }),
    ],
    content: body,
    onUpdate: ({ editor }) => {
      setBody(editor.getHTML());
    },
  });

  const handleTemplateSelect = (template: EmailTemplate) => {
    const personalizedBody = template.body.replace(/{{name}}/g, recipientName);
    setSubject(template.subject);
    setBody(personalizedBody);
    
    // Обновляем содержимое редактора
    if (editor) {
      editor.commands.setContent(personalizedBody);
    }
    
    setSelectedTemplate(template.id);
    setShowTemplates(false);
    toast.success('Шаблон применён');
  };

  const handleSend = async () => {
    if (!subject.trim()) {
      toast.error('Введите тему письма');
      return;
    }
    if (!body.trim() || body === '<p><br></p>') {
      toast.error('Введите текст письма');
      return;
    }

    setIsSending(true);

    // Симулируем отправку email через Message Queue
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const emailLog: EmailLogEntry = {
      id: `email-${Date.now()}`,
      userId,
      to: recipientEmail,
      subject,
      body,
      sentAt: new Date().toISOString(),
      status: 'queued', // Сначала ставим в очередь
    };

    // Через 2 секунды меняем статус на "sent"
    setTimeout(() => {
      emailLog.status = 'sent';
      if (onEmailSent) {
        onEmailSent({ ...emailLog, status: 'delivered' });
      }
    }, 2000);

    setIsSending(false);
    toast.success('Email поставлен в очередь на отправку', {
      description: `Письмо будет отправлено на ${recipientEmail}`,
    });

    // Логируем в консоль для демонстрации
    console.log('📧 Email добавлен в Message Queue:', emailLog);

    onClose();
    setSubject('');
    setBody('');
    setSelectedTemplate(null);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-gradient-to-r from-violet-50 to-purple-50">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-violet-100 rounded-lg">
                <Mail className="text-violet-600" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-800">Отправить письмо</h3>
                <p className="text-sm text-slate-600">
                  Кому: <span className="font-semibold">{recipientName}</span> ({recipientEmail})
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white rounded-lg transition-colors"
              disabled={isSending}
            >
              <X size={24} className="text-slate-600" />
            </button>
          </div>

          {/* Templates Toggle */}
          <div className="px-6 py-3 bg-slate-50 border-b border-slate-200">
            <button
              onClick={() => setShowTemplates(!showTemplates)}
              className="flex items-center gap-2 text-sm text-violet-600 hover:text-violet-700 font-semibold transition-colors"
            >
              <FileText size={16} />
              {showTemplates ? 'Скрыть шаблоны' : 'Выбрать шаблон'}
            </button>
          </div>

          {/* Templates List */}
          <AnimatePresence>
            {showTemplates && (
              <motion.div
                className="px-6 py-4 bg-slate-50 border-b border-slate-200"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {EMAIL_TEMPLATES.map((template) => (
                    <button
                      key={template.id}
                      onClick={() => handleTemplateSelect(template)}
                      className={`p-3 rounded-xl border-2 text-left transition-all hover:shadow-md ${
                        selectedTemplate === template.id
                          ? 'border-violet-500 bg-violet-50'
                          : 'border-slate-200 bg-white hover:border-violet-300'
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        <Sparkles
                          size={16}
                          className={selectedTemplate === template.id ? 'text-violet-600' : 'text-slate-400'}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm text-slate-800 truncate">{template.name}</p>
                          <p className="text-xs text-slate-500 truncate">{template.subject}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Email Form */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {/* Subject */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Тема письма</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Введите тему письма"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                disabled={isSending}
              />
            </div>

            {/* Body - WYSIWYG Editor */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Текст письма</label>
              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                <EditorContent editor={editor} className="email-editor" />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
            <div className="text-xs text-slate-500">
              <p>💡 Email будет добавлен в очередь и отправлен асинхронно</p>
              <p>История отправки сохраняется в разделе "Email Logs"</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
                disabled={isSending}
              >
                Отмена
              </button>
              <button
                onClick={handleSend}
                disabled={isSending}
                className="flex items-center gap-2 px-6 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSending ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Отправка...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Отправить
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}