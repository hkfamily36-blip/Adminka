import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Filter,
  MessageCircle,
  User,
  Clock,
  CheckCircle,
  Circle,
  Bot,
  UserCog,
  ArrowRight,
  Send,
  Paperclip,
  MoreVertical,
  Sparkles,
  BookOpen,
  CreditCard,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Activity,
  FileText,
  AlertCircle,
  X,
  ArrowLeft,
} from 'lucide-react';

// Типы
type TicketStatus = 'ai_active' | 'awaiting_operator' | 'in_progress' | 'resolved';
type MessageSender = 'user' | 'ai' | 'operator';

interface Message {
  id: string;
  sender: MessageSender;
  text: string;
  timestamp: string;
  operatorName?: string;
}

interface Ticket {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  subject: string;
  lastMessage: string;
  lastMessageTime: string;
  status: TicketStatus;
  unreadCount: number;
  messages: Message[];
  aiSummary?: string;
  userProfile?: {
    email: string;
    phone: string;
    tariff: string;
    currentModule: string;
    registeredAt: string;
    lastActive: string;
  };
}

const mockTickets: Ticket[] = [
  {
    id: '1',
    userId: 'user-1',
    userName: 'Анна Петрова',
    userAvatar: 'AP',
    subject: 'Не могу открыть урок 2.3',
    lastMessage: 'Спасибо за помощь! Разобралась',
    lastMessageTime: '10:42',
    status: 'resolved',
    unreadCount: 0,
    messages: [
      {
        id: 'm1',
        sender: 'user',
        text: 'Здравствуйте! Не могу открыть урок 2.3, пишет ошибку доступа',
        timestamp: '10:30',
      },
      {
        id: 'm2',
        sender: 'ai',
        text: 'Здравствуйте, Анна! Я проверил ваш профиль. У вас активен тариф "Самостоятельный", который включает доступ к урокам 2.1-2.3. Попробуйте обновить страницу или очистить кэш браузера.',
        timestamp: '10:31',
      },
      {
        id: 'm3',
        sender: 'user',
        text: 'Обновила, но все равно не открывается',
        timestamp: '10:35',
      },
      {
        id: 'm4',
        sender: 'ai',
        text: 'Передаю ваше обращение оператору для детальной проверки технической части.',
        timestamp: '10:36',
      },
      {
        id: 'm5',
        sender: 'operator',
        text: 'Анна, добрый день! Проверил вашу учетную запись. Проблема была на нашей стороне - произвел синхронизацию доступов. Теперь урок должен открыться. Попробуйте, пожалуйста.',
        timestamp: '10:40',
        operatorName: 'Дмитрий',
      },
      {
        id: 'm6',
        sender: 'user',
        text: 'Спасибо за помощь! Разобралась',
        timestamp: '10:42',
      },
    ],
    aiSummary: 'Пользователь не может открыть урок 2.3 из-за ошибки доступа. Обновление страницы не помогло. Требуется проверка технической части.',
    userProfile: {
      email: 'anna.petrova@mail.ru',
      phone: '+7 (915) 234-56-78',
      tariff: 'Самостоятельный',
      currentModule: 'Модуль 2: AI-агенты в практике',
      registeredAt: '15.01.2026',
      lastActive: '10:42',
    },
  },
  {
    id: '2',
    userId: 'user-2',
    userName: 'Елена Смирнова',
    userAvatar: 'ЕС',
    subject: 'Вопрос по оплате тарифа',
    lastMessage: 'Спасибо, оплатила через СБП',
    lastMessageTime: '11:15',
    status: 'ai_active',
    unreadCount: 0,
    messages: [
      {
        id: 'm1',
        sender: 'user',
        text: 'Здравствуйте! Хочу перейти на тариф "С куратором". Как это сделать?',
        timestamp: '11:10',
      },
      {
        id: 'm2',
        sender: 'ai',
        text: 'Добрый день, Елена! Для перехода на тариф "С куратором" вам нужно оплатить разницу в 15 000 ₽. Я могу отправить вам ссылку на оплату через СБП или по карте. Какой способ вам удобнее?',
        timestamp: '11:11',
      },
      {
        id: 'm3',
        sender: 'user',
        text: 'СБП, пожалуйста',
        timestamp: '11:12',
      },
      {
        id: 'm4',
        sender: 'ai',
        text: 'Отлично! Вот ссылка для оплаты: [payment-link]. После оплаты доступ к расширенным урокам откроется автоматически в течение 5 минут.',
        timestamp: '11:13',
      },
      {
        id: 'm5',
        sender: 'user',
        text: 'Спасибо, оплатила через СБП',
        timestamp: '11:15',
      },
    ],
    aiSummary: 'Пользователь хочет перейти на тариф "С куратором". ИИ предоставил информацию об оплате и отправил ссылку. Ожидается подтверждение платежа.',
    userProfile: {
      email: 'elena.smirnova@gmail.com',
      phone: '+7 (926) 345-67-89',
      tariff: 'Самостоятельный',
      currentModule: 'Модуль 1: Основы маркетинга',
      registeredAt: '22.01.2026',
      lastActive: '11:15',
    },
  },
  {
    id: '3',
    userId: 'user-3',
    userName: 'Ирина Волкова',
    userAvatar: 'ИВ',
    subject: 'Не приходят уведомления',
    lastMessage: 'ИИ-ассистент анализирует проблему...',
    lastMessageTime: '11:20',
    status: 'awaiting_operator',
    unreadCount: 2,
    messages: [
      {
        id: 'm1',
        sender: 'user',
        text: 'Добрый день! Перестали приходить уведомления о новых уроках на почту. Проверила спам - там тоже нет',
        timestamp: '11:18',
      },
      {
        id: 'm2',
        sender: 'ai',
        text: 'Здравствуйте, Ирина! Проверяю настройки вашего профиля и статус email-подписок. Один момент...',
        timestamp: '11:19',
      },
      {
        id: 'm3',
        sender: 'user',
        text: 'Жду, спасибо',
        timestamp: '11:20',
      },
    ],
    aiSummary: 'Пользователь не получает email-уведомления о новых уроках. Проверила спам - писем нет. ИИ анализирует настройки подписок.',
    userProfile: {
      email: 'irina.volkova@yandex.ru',
      phone: '+7 (903) 456-78-90',
      tariff: 'С куратором',
      currentModule: 'Модуль 3: Бизнес-системы',
      registeredAt: '10.02.2026',
      lastActive: '11:20',
    },
  },
  {
    id: '4',
    userId: 'user-4',
    userName: 'Мария Козлова',
    userAvatar: 'МК',
    subject: 'Консультация по модулю 4',
    lastMessage: 'Буду ждать звонка, спасибо!',
    lastMessageTime: '09:45',
    status: 'in_progress',
    unreadCount: 0,
    messages: [
      {
        id: 'm1',
        sender: 'user',
        text: 'Здравствуйте! У меня вопрос по модулю 4 "Продажи и воронки". е понимаю, как пименит эту схему к моему бизнесу',
        timestamp: '09:30',
      },
      {
        id: 'm2',
        sender: 'ai',
        text: 'Добрый день, Мария! Вижу, что вы на тарифе "С наставником", который включает индивидуальные консультации. Вам нужна консультация по применению воронки продаж к вашему бизнесу?',
        timestamp: '09:31',
      },
      {
        id: 'm3',
        sender: 'user',
        text: 'Да, именно! Хотелось бы разобрать мой конкретный случай',
        timestamp: '09:35',
      },
      {
        id: 'm4',
        sender: 'ai',
        text: 'Передаю ваш запрос наставнику. Это требует детальной проработки вашего кейса.',
        timestamp: '09:36',
      },
      {
        id: 'm5',
        sender: 'operator',
        text: 'Мария, здравствуйте! Анастасия на связи. Давайте разберем ваш кейс. Удобно созвониться сегодня в 15:00?',
        timestamp: '09:40',
        operatorName: 'Анастасия',
      },
      {
        id: 'm6',
        sender: 'user',
        text: 'Буду ждать звонка, спасибо!',
        timestamp: '09:45',
      },
    ],
    aiSummary: 'Пользователь на тарифе "С наставником" запрашивает консультацию по применению воронки продаж к своему бизнесу. Требуется индивидуальный разбор кейса.',
    userProfile: {
      email: 'maria.kozlova@gmail.com',
      phone: '+7 (916) 567-89-01',
      tariff: 'С наставником',
      currentModule: 'Модуль 4: Продажи и воронки',
      registeredAt: '05.02.2026',
      lastActive: '09:45',
    },
  },
];

const statusLabels: Record<TicketStatus, string> = {
  ai_active: 'Диалог с ИИ',
  awaiting_operator: 'Ожидает оператора',
  in_progress: 'В работе',
  resolved: 'Решено',
};

const statusIcons: Record<TicketStatus, typeof Circle> = {
  ai_active: Bot,
  awaiting_operator: Clock,
  in_progress: UserCog,
  resolved: CheckCircle,
};

export function Helpdesk({ onBack }: { onBack?: () => void }) {
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<TicketStatus | 'all'>('all');
  const [messageText, setMessageText] = useState('');
  const [isOperatorControlled, setIsOperatorControlled] = useState(false);
  const [showContextPanel, setShowContextPanel] = useState(false);

  const selectedTicket = mockTickets.find((t) => t.id === selectedTicketId);

  const filteredTickets = mockTickets.filter((ticket) => {
    const matchesSearch =
      ticket.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleTakeOver = () => {
    setIsOperatorControlled(true);
  };

  const handleSendMessage = () => {
    if (!messageText.trim()) return;
    // Логика отправки сообщения
    setMessageText('');
  };

  return (
    <div className="h-screen flex bg-slate-50">
      {/* ЛЕВАЯ КОЛОНКА: Навигация и фильтры - всегда видна */}
      <div className="w-72 bg-white border-r border-slate-200 flex flex-col">
        {/* Заголовок */}
        <div className="p-6 border-b border-slate-200">
          <button
            onClick={() => onBack?.()}
            className="flex items-center gap-2 px-3 py-2 mb-6 hover:bg-slate-100 rounded-lg transition-colors group w-full"
          >
            <ArrowLeft size={18} className="text-slate-600 group-hover:text-violet-600 transition-colors" />
            <span className="text-sm text-slate-600 group-hover:text-violet-600 font-medium transition-colors">
              Выйти в панель
            </span>
          </button>

          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
              <MessageCircle size={20} className="text-white" />
            </div>
            <div>
              <h1 className="font-bold text-slate-800">Техподдержка</h1>
              <p className="text-xs text-slate-500">Helpdesk</p>
            </div>
          </div>

          {/* Поиск */}
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Поиск обращений..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Фильтры по статусам */}
        <div className="p-4 border-b border-slate-200">
          <div className="flex items-center gap-2 mb-3">
            <Filter size={16} className="text-slate-500" />
            <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Фильтры</span>
          </div>

          <div className="space-y-1">
            <button
              onClick={() => setStatusFilter('all')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                statusFilter === 'all'
                  ? 'bg-violet-50 text-violet-700 font-semibold'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span>Все обращения</span>
              <span className="text-xs font-bold">{mockTickets.length}</span>
            </button>

            {(Object.keys(statusLabels) as TicketStatus[]).map((status) => {
              const Icon = statusIcons[status];
              const count = mockTickets.filter((t) => t.status === status).length;
              return (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                    statusFilter === status
                      ? 'bg-violet-50 text-violet-700 font-semibold'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Icon size={16} />
                    {statusLabels[status]}
                  </span>
                  <span className="text-xs font-bold">{count}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Статистика */}
        <div className="p-4 mt-auto">
          <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-xl p-4 border border-violet-100">
            <div className="text-xs text-slate-600 mb-2">Сегодня обработано</div>
            <div className="text-2xl font-bold text-violet-700">12</div>
            <div className="text-xs text-slate-500 mt-1">обращений</div>
          </div>
        </div>
      </div>

      {/* СРЕДНЯЯ КОЛОНКА: Список тикетов - скрывается когда выбран тикет */}
      {!selectedTicketId && (
        <div className="w-96 bg-white border-r border-slate-200 flex flex-col">
          {/* Заголовок */}
          <div className="p-4 border-b border-slate-200">
            <h2 className="font-bold text-slate-800">
              Входящие обращения
              {statusFilter !== 'all' && (
                <span className="text-sm font-normal text-slate-500 ml-2">
                  · {statusLabels[statusFilter]}
                </span>
              )}
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              {filteredTickets.length} {filteredTickets.length === 1 ? 'обращение' : 'обращений'}
            </p>
          </div>

          {/* Список тикетов */}
          <div className="flex-1 overflow-y-auto">
            {filteredTickets.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-slate-400">
                <MessageCircle size={48} className="mb-3 opacity-50" />
                <p className="text-sm">Обращения не найдены</p>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {filteredTickets.map((ticket) => {
                  const StatusIcon = statusIcons[ticket.status];
                  const isResolved = ticket.status === 'resolved';

                  return (
                    <motion.button
                      key={ticket.id}
                      onClick={() => setSelectedTicketId(ticket.id)}
                      className="w-full p-4 text-left hover:bg-slate-50 border-l-4 border-transparent transition-colors relative"
                      whileHover={{ x: 2 }}
                    >
                      <div className="flex items-start gap-3">
                        {/* Аватар */}
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                          {ticket.userAvatar}
                        </div>

                        {/* Контент */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <span
                              className={`font-semibold text-sm truncate ${
                                isResolved ? 'text-slate-500' : 'text-slate-800'
                              }`}
                            >
                              {ticket.userName}
                            </span>
                            <span className="text-xs text-slate-500 flex-shrink-0 ml-2">
                              {ticket.lastMessageTime}
                            </span>
                          </div>

                          <p
                            className={`text-sm mb-2 truncate ${
                              isResolved ? 'text-slate-400' : 'text-slate-600'
                            }`}
                          >
                            {ticket.subject}
                          </p>

                          <div className="flex items-center justify-between">
                            {/* Статус */}
                            <div className="flex items-center gap-1.5">
                              <StatusIcon size={14} className="text-slate-400" />
                              <span className="text-xs text-slate-500">{statusLabels[ticket.status]}</span>
                            </div>

                            {/* Непрочитанные */}
                            {ticket.unreadCount > 0 && (
                              <div className="w-5 h-5 rounded-full bg-violet-600 text-white text-xs font-bold flex items-center justify-center">
                                {ticket.unreadCount}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ПРАВАЯ ЧАСТЬ: Чат + Контекст - занимает все оставшееся пространство когда тикет выбран */}
      {selectedTicket ? (
        <div className="flex-1 flex">
          {/* Основная зона чата */}
          <div className="flex-1 flex flex-col bg-white">
            {/* Заголовок чата с кнопкой "Назад" */}
            <div className="p-4 border-b border-slate-200 bg-gradient-to-r from-violet-50 to-purple-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      setSelectedTicketId(null);
                      setShowContextPanel(false);
                    }}
                    className="p-2 hover:bg-white/70 rounded-lg transition-colors"
                  >
                    <ArrowLeft size={20} className="text-slate-600" />
                  </button>
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center text-white font-bold">
                    {selectedTicket.userAvatar}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800">{selectedTicket.userName}</h3>
                    <p className="text-sm text-slate-600">{selectedTicket.subject}</p>
                  </div>
                </div>

                <button
                  onClick={() => setShowContextPanel(!showContextPanel)}
                  className={`p-2 rounded-lg transition-colors ${
                    showContextPanel
                      ? 'bg-violet-100 text-violet-700'
                      : 'hover:bg-white/50 text-slate-600'
                  }`}
                >
                  <MoreVertical size={20} />
                </button>
              </div>
            </div>

            {/* История сообщений */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50">
              {selectedTicket.messages.map((message, index) => {
                const isUser = message.sender === 'user';
                const isAI = message.sender === 'ai';
                const isOperator = message.sender === 'operator';

                // Проверяем, есть ли handover (передача от ИИ к оператору)
                const isHandover =
                  index > 0 &&
                  selectedTicket.messages[index - 1].sender === 'ai' &&
                  isOperator;

                return (
                  <div key={message.id}>
                    {/* Маркер передачи */}
                    {isHandover && (
                      <div className="flex items-center gap-3 my-6">
                        <div className="flex-1 h-px bg-slate-200"></div>
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-full border border-slate-200 shadow-sm">
                          <ArrowRight size={14} className="text-slate-500" />
                          <span className="text-xs text-slate-600 font-medium">
                            Передано оператору
                          </span>
                        </div>
                        <div className="flex-1 h-px bg-slate-200"></div>
                      </div>
                    )}

                    {/* Сообщение пользователя */}
                    {isUser && (
                      <div className="flex justify-end">
                        <div className="max-w-lg">
                          <div className="bg-violet-600 text-white rounded-2xl rounded-tr-sm px-4 py-3">
                            <p className="text-sm leading-relaxed">{message.text}</p>
                          </div>
                          <div className="flex items-center justify-end gap-2 mt-1 px-2">
                            <span className="text-xs text-slate-500">{message.timestamp}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Сообщение ИИ */}
                    {isAI && (
                      <div className="flex justify-start">
                        <div className="max-w-lg">
                          <div className="flex items-start gap-2">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center flex-shrink-0">
                              <Bot size={16} className="text-white" />
                            </div>
                            <div>
                              <div className="bg-white border-2 border-cyan-100 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
                                <p className="text-sm leading-relaxed text-slate-700">{message.text}</p>
                              </div>
                              <div className="flex items-center gap-2 mt-1 px-2">
                                <span className="text-xs text-cyan-600 font-medium">ИИ-ассистент</span>
                                <span className="text-xs text-slate-400">·</span>
                                <span className="text-xs text-slate-500">{message.timestamp}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Сообщение оператора */}
                    {isOperator && (
                      <div className="flex justify-start">
                        <div className="max-w-lg">
                          <div className="flex items-start gap-2">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center flex-shrink-0">
                              <UserCog size={16} className="text-white" />
                            </div>
                            <div>
                              <div className="bg-white border-2 border-slate-200 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
                                <p className="text-sm leading-relaxed text-slate-700">{message.text}</p>
                              </div>
                              <div className="flex items-center gap-2 mt-1 px-2">
                                <span className="text-xs text-violet-600 font-medium">
                                  {message.operatorName}
                                </span>
                                <span className="text-xs text-slate-400">·</span>
                                <span className="text-xs text-slate-500">{message.timestamp}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Зона ввода */}
            <div className="p-4 border-t border-slate-200 bg-white">
              {selectedTicket.status === 'ai_active' && !isOperatorControlled ? (
                <div className="flex items-center justify-between p-4 bg-cyan-50 rounded-xl border border-cyan-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                      <Bot size={20} className="text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">
                        Диалог ведет ИИ-ассистент
                      </p>
                      <p className="text-xs text-slate-600">
                        Система автоматически обрабатывает запрос
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleTakeOver}
                    className="px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg font-semibold text-sm transition-colors flex items-center gap-2"
                  >
                    <UserCog size={16} />
                    Перехватить управление
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-end gap-3">
                    <button className="p-3 hover:bg-slate-100 rounded-lg transition-colors">
                      <Paperclip size={20} className="text-slate-600" />
                    </button>
                    <div className="flex-1 relative">
                      <textarea
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        placeholder="Введите сообщение..."
                        rows={3}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all text-sm"
                      />
                    </div>
                    <button
                      onClick={handleSendMessage}
                      disabled={!messageText.trim()}
                      className="p-3 bg-violet-600 hover:bg-violet-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
                    >
                      <Send size={20} />
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <button className="text-xs text-slate-600 hover:text-violet-600 font-medium transition-colors">
                      + Внутренняя заметка
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ПАНЕЛЬ КОНТЕКСТА (справа) */}
          <AnimatePresence>
            {showContextPanel && (
              <motion.div
                className="w-80 bg-slate-50 border-l border-slate-200 overflow-y-auto"
                initial={{ x: 320, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 320, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              >
                {/* ИИ-Резюме */}
                {selectedTicket.aiSummary && (
                  <div className="p-4 bg-gradient-to-br from-cyan-50 to-blue-50 border-b border-cyan-100">
                    <div className="flex items-center gap-2 mb-3">
                      <Sparkles size={18} className="text-cyan-600" />
                      <span className="text-sm font-bold text-slate-800">ИИ-Резюме</span>
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed">{selectedTicket.aiSummary}</p>
                  </div>
                )}

                {/* Информация о пользователе */}
                {selectedTicket.userProfile && (
                  <div className="p-4">
                    <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
                      <User size={16} />
                      Информация о пользователе
                    </h3>

                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <Mail size={16} className="text-slate-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-xs text-slate-500">Email</p>
                          <p className="text-sm text-slate-800 font-medium">
                            {selectedTicket.userProfile.email}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Phone size={16} className="text-slate-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-xs text-slate-500">Телефон</p>
                          <p className="text-sm text-slate-800 font-medium">
                            {selectedTicket.userProfile.phone}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <CreditCard size={16} className="text-slate-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-xs text-slate-500">Тариф</p>
                          <p className="text-sm text-slate-800 font-medium">
                            {selectedTicket.userProfile.tariff}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <BookOpen size={16} className="text-slate-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-xs text-slate-500">Текущий модуль</p>
                          <p className="text-sm text-slate-800 font-medium">
                            {selectedTicket.userProfile.currentModule}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Calendar size={16} className="text-slate-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-xs text-slate-500">Дата регистрации</p>
                          <p className="text-sm text-slate-800 font-medium">
                            {selectedTicket.userProfile.registeredAt}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Activity size={16} className="text-slate-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-xs text-slate-500">Последняя активность</p>
                          <p className="text-sm text-slate-800 font-medium">
                            {selectedTicket.userProfile.lastActive}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Быстрые действия */}
                <div className="p-4 border-t border-slate-200">
                  <h3 className="text-sm font-bold text-slate-800 mb-3">Быстрые действия</h3>
                  <div className="space-y-2">
                    <button className="w-full flex items-center gap-2 px-3 py-2 bg-white hover:bg-violet-50 border border-slate-200 rounded-lg text-sm text-slate-700 hover:text-violet-700 font-medium transition-colors">
                      <FileText size={16} />
                      Открыть профиль
                    </button>
                    <button className="w-full flex items-center gap-2 px-3 py-2 bg-white hover:bg-violet-50 border border-slate-200 rounded-lg text-sm text-slate-700 hover:text-violet-700 font-medium transition-colors">
                      <Mail size={16} />
                      Отправить Email
                    </button>
                    <button className="w-full flex items-center gap-2 px-3 py-2 bg-white hover:bg-violet-50 border border-slate-200 rounded-lg text-sm text-slate-700 hover:text-violet-700 font-medium transition-colors">
                      <CheckCircle size={16} />
                      Закрыть обращение
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center bg-slate-50">
          <div className="text-center">
            <MessageCircle size={64} className="mx-auto text-slate-300 mb-4" />
            <p className="text-slate-500 text-lg font-medium">Выберите обращение</p>
            <p className="text-slate-400 text-sm mt-2">
              Выберите обращение из списка слева
            </p>
          </div>
        </div>
      )}
    </div>
  );
}