import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Paperclip, Smile, MoreVertical, Minimize2, Maximize2 } from 'lucide-react';
import { UserAvatar } from './UserAvatar';
import type { User } from '../../types/rbac';

interface Message {
  id: string;
  text: string;
  sender: 'admin' | 'user';
  timestamp: Date;
  status?: 'sent' | 'delivered' | 'read';
}

interface ChatWindowProps {
  user: User;
  onClose: () => void;
}

export function ChatWindow({ user, onClose }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Здравствуйте! Чем могу помочь?',
      sender: 'admin',
      timestamp: new Date(Date.now() - 3600000),
      status: 'read'
    },
    {
      id: '2',
      text: 'Добрый день! У меня вопрос по курсу...',
      sender: 'user',
      timestamp: new Date(Date.now() - 3000000),
      status: 'read'
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Чат открыт
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        text: newMessage,
        sender: 'admin',
        timestamp: new Date(),
        status: 'sent'
      };
      setMessages([...messages, message]);
      setNewMessage('');
      
      // Симуляция ответа пользователя (для демонстрации)
      setTimeout(() => {
        setIsTyping(true);
      }, 1000);
      
      setTimeout(() => {
        setIsTyping(false);
        const userReply: Message = {
          id: (Date.now() + 1).toString(),
          text: 'Спасибо за ответ!',
          sender: 'user',
          timestamp: new Date(),
          status: 'delivered'
        };
        setMessages(prev => [...prev, userReply]);
      }, 3000);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <motion.div
      key="chat-window"
      className="fixed bottom-6 right-6 z-50 flex flex-col bg-white rounded-2xl shadow-2xl overflow-hidden border border-purple-200"
        style={{ 
          width: '400px', 
          height: isMinimized ? 'auto' : '600px',
          boxShadow: '0 20px 60px rgba(139, 92, 246, 0.3), 0 0 0 1px rgba(139, 92, 246, 0.1)'
        }}
        initial={{ opacity: 0, scale: 0.8, y: 100 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 100 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-violet-600 px-5 py-4 flex items-center justify-between relative overflow-hidden">
          {/* Cosmic Background Effect */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-2 left-4 w-1 h-1 bg-white rounded-full animate-pulse"></div>
            <div className="absolute top-6 right-8 w-1 h-1 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute bottom-3 left-12 w-0.5 h-0.5 bg-white rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-4 right-16 w-0.5 h-0.5 bg-white rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
          </div>
          
          {/* Content */}
          <div className="relative z-10 w-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <UserAvatar src={user.avatar} name={user.name} size="md" />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <h3 className="text-white font-bold text-sm">{user.name}</h3>
              <p className="text-purple-100 text-xs">В сети</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <motion.button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isMinimized ? (
                <Maximize2 size={18} className="text-white" />
              ) : (
                <Minimize2 size={18} className="text-white" />
              )}
            </motion.button>
            <motion.button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={18} className="text-white" />
            </motion.button>
          </div>
          </div>
        </div>

        {/* Messages Area */}
        {!isMinimized && (
          <>
            <div className="flex-1 overflow-y-auto p-5 bg-gradient-to-b from-slate-50 to-purple-50/30 space-y-4 relative">
              {/* Subtle cosmic background */}
              <div className="absolute inset-0 opacity-5" style={{
                backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(139, 92, 246, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(167, 139, 250, 0.3) 0%, transparent 50%)',
              }}></div>
              
              <div className="relative z-10 space-y-4">
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  className={`flex ${message.sender === 'admin' ? 'justify-end' : 'justify-start'}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className={`max-w-[75%] ${message.sender === 'admin' ? 'order-2' : 'order-1'}`}>
                    <div
                      className={`px-4 py-3 rounded-2xl ${
                        message.sender === 'admin'
                          ? 'bg-gradient-to-r from-purple-600 to-violet-600 text-white rounded-br-md'
                          : 'bg-white text-slate-800 rounded-bl-md border border-slate-200'
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.text}</p>
                    </div>
                    <div className={`flex items-center gap-2 mt-1 px-1 ${message.sender === 'admin' ? 'justify-end' : 'justify-start'}`}>
                      <span className="text-xs text-slate-400">{formatTime(message.timestamp)}</span>
                      {message.sender === 'admin' && message.status && (
                        <span className="text-xs text-slate-400">
                          {message.status === 'sent' && '✓'}
                          {message.status === 'delivered' && '✓✓'}
                          {message.status === 'read' && <span className="text-purple-600">✓✓</span>}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  className="flex justify-start"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                >
                  <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-md border border-slate-200">
                    <div className="flex gap-1">
                      <motion.div
                        className="w-2 h-2 bg-slate-400 rounded-full"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-slate-400 rounded-full"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-slate-400 rounded-full"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-slate-200">
              <div className="flex items-end gap-2">
                <div className="flex-1 relative">
                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    placeholder="Напишите сообщение..."
                    className="w-full px-4 py-3 pr-20 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none text-sm bg-slate-50"
                    rows={1}
                    style={{ minHeight: '44px', maxHeight: '120px' }}
                  />
                  <div className="absolute right-2 bottom-2 flex items-center gap-1">
                    <motion.button
                      className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Paperclip size={16} className="text-slate-400" />
                    </motion.button>
                    <motion.button
                      className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Smile size={16} className="text-slate-400" />
                    </motion.button>
                  </div>
                </div>
                
                <motion.button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className={`p-3 rounded-xl transition-all relative overflow-hidden ${
                    newMessage.trim()
                      ? 'bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 shadow-lg hover:shadow-purple-500/50'
                      : 'bg-slate-200'
                  }`}
                  whileHover={newMessage.trim() ? { scale: 1.05 } : {}}
                  whileTap={newMessage.trim() ? { scale: 0.95 } : {}}
                >
                  {newMessage.trim() && (
                    <motion.div
                      className="absolute inset-0 bg-white opacity-0"
                      whileHover={{ opacity: 0.1 }}
                    />
                  )}
                  <Send size={18} className={newMessage.trim() ? 'text-white relative z-10' : 'text-slate-400'} />
                </motion.button>
              </div>
              
              <p className="text-xs text-slate-400 mt-2 text-center">
                Enter - отправить • Shift+Enter - новая строка
              </p>
            </div>
          </>
        )}

        {/* Minimized State */}
        {isMinimized && (
          <div className="px-5 py-3 bg-slate-50">
            <p className="text-sm text-slate-600">Чат свёрнут</p>
          </div>
        )}
      </motion.div>
  );
}
