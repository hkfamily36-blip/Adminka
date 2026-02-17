import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, X, Check, AlertCircle } from 'lucide-react';

interface TestEmailSenderProps {
  templateName: string;
  subject: string;
  body: string;
  onClose: () => void;
}

export function TestEmailSender({ templateName, subject, body, onClose }: TestEmailSenderProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSendTest = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim() || !email.includes('@')) {
      setStatus('error');
      setMessage('Введите корректный email-адрес');
      return;
    }

    setStatus('sending');
    setMessage('Отправка письма...');

    // Simulate sending email
    setTimeout(() => {
      setStatus('success');
      setMessage(`Тестовое письмо отправлено на ${email}!`);
      
      // Auto close after 2 seconds
      setTimeout(() => {
        onClose();
      }, 2000);
    }, 1500);
  };

  return (
    <>
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        className="fixed inset-0 flex items-center justify-center z-[60] p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative"
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Cosmic effects */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-fuchsia-500/20 to-pink-500/20 rounded-full blur-3xl"></div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>

          <div className="relative">
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-3 bg-gradient-to-br from-fuchsia-100 to-pink-100 rounded-xl">
                  <Send size={24} className="text-fuchsia-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-800">Отправить тест</h2>
                  <p className="text-sm text-slate-600">{templateName}</p>
                </div>
              </div>
            </div>

            {/* Preview */}
            <div className="mb-6 p-4 bg-slate-50 rounded-xl border border-slate-200">
              <h3 className="text-xs font-semibold text-slate-500 mb-2">Предпросмотр:</h3>
              <div className="space-y-2">
                <div>
                  <p className="text-xs text-slate-500">Тема:</p>
                  <p className="text-sm font-semibold text-slate-800 line-clamp-2">{subject}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Текст:</p>
                  <p className="text-sm text-slate-700 line-clamp-3">{body.replace(/<[^>]*>/g, '')}</p>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSendTest} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Email для тестовой отправки *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setStatus('idle');
                    setMessage('');
                  }}
                  placeholder="example@email.com"
                  className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent transition-all"
                  disabled={status === 'sending' || status === 'success'}
                />
              </div>

              {/* Status Message */}
              <AnimatePresence>
                {message && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`flex items-center gap-2 p-3 rounded-xl ${
                      status === 'success'
                        ? 'bg-green-50 text-green-700'
                        : status === 'error'
                        ? 'bg-red-50 text-red-700'
                        : 'bg-blue-50 text-blue-700'
                    }`}
                  >
                    {status === 'success' && <Check size={18} />}
                    {status === 'error' && <AlertCircle size={18} />}
                    {status === 'sending' && (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      >
                        <Send size={18} />
                      </motion.div>
                    )}
                    <span className="text-sm font-semibold">{message}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-6 py-3 bg-slate-100 text-slate-700 rounded-xl font-semibold hover:bg-slate-200 transition-colors"
                  disabled={status === 'sending'}
                >
                  Отмена
                </button>
                <motion.button
                  type="submit"
                  className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold shadow-lg transition-all ${
                    status === 'sending' || status === 'success'
                      ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white hover:shadow-xl'
                  }`}
                  whileHover={status === 'idle' || status === 'error' ? { scale: 1.02 } : {}}
                  whileTap={status === 'idle' || status === 'error' ? { scale: 0.98 } : {}}
                  disabled={status === 'sending' || status === 'success'}
                >
                  <Send size={18} />
                  {status === 'sending' ? 'Отправка...' : status === 'success' ? 'Отправлено!' : 'Отправить тест'}
                </motion.button>
              </div>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}
