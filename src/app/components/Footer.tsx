import { motion } from 'motion/react';
import { MessageCircle, Mail, Instagram, Send } from 'lucide-react';
import { Logo } from '../App';

export function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-[#1a0b2e] to-slate-900 text-white overflow-hidden">
      {/* Космический фон */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-20 w-64 h-64 bg-violet-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-20 w-80 h-80 bg-fuchsia-500/20 rounded-full blur-3xl"></div>
      </div>

      {/* Звездная пыль */}
      {[...Array(40)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-[2px] h-[2px] bg-white rounded-full"
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

      <div className="relative max-w-7xl mx-auto px-8 py-16">
        {/* Верхний блок: Призыв к действию */}
        <div className="text-center mb-16">
          <motion.h3
            className="text-3xl font-bold mb-4 bg-gradient-to-r from-pink-300 via-violet-300 to-fuchsia-300 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Остались вопросы?
          </motion.h3>
          <motion.p
            className="text-slate-300 mb-8 text-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Наша служба заботы всегда готова помочь
          </motion.p>
          <motion.button
            className="group relative px-8 py-4 bg-gradient-to-r from-pink-500 via-violet-500 to-fuchsia-500 rounded-2xl font-semibold text-white shadow-lg hover:shadow-pink-500/50 transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="flex items-center gap-2">
              <MessageCircle size={20} />
              Написать в службу заботы
            </span>
            {/* Мерцающее свечение */}
            <motion.div
              className="absolute inset-0 rounded-2xl bg-gradient-to-r from-pink-400 via-violet-400 to-fuchsia-400 opacity-0 group-hover:opacity-20 blur-xl"
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
          </motion.button>
        </div>

        {/* Разделитель с градиентом */}
        <div className="h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent mb-12"></div>

        {/* Нижний блок: Логотип от Захи Хадид - флюидное размещение */}
        <div className="grid md:grid-cols-3 gap-12 items-center">
          {/* Левая колонка: Ссылки */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h4 className="text-sm font-semibold text-violet-300 uppercase tracking-wider mb-4">Полезные ссылки</h4>
            <a href="#" className="block text-slate-300 hover:text-pink-300 transition-colors duration-300">О программе</a>
            <a href="#" className="block text-slate-300 hover:text-pink-300 transition-colors duration-300">Политика конфиденциальности</a>
            <a href="#" className="block text-slate-300 hover:text-pink-300 transition-colors duration-300">Условия использования</a>
            <a href="#" className="block text-slate-300 hover:text-pink-300 transition-colors duration-300">FAQ</a>
          </motion.div>

          {/* Центральная колонка: Логотип - ЗАХА СТИЛЬ */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Органичное свечение под логотипом */}
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/30 via-fuchsia-500/30 to-pink-500/30 blur-3xl transform -rotate-12 scale-110"></div>
            
            <div className="relative text-center">
              {/* Логотип с эффектом парения */}
              <motion.div
                className="inline-block"
                animate={{
                  y: [0, -8, 0],
                  rotate: [-1, 1, -1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <Logo />
                
                {/* Звездная пыль вокруг логотипа */}
                {[...Array(12)].map((_, i) => {
                  const angle = (i * 30 * Math.PI) / 180;
                  const distance = 60;
                  const x = Math.cos(angle) * distance;
                  const y = Math.sin(angle) * distance;
                  
                  return (
                    <motion.div
                      key={i}
                      className="absolute w-[2px] h-[2px] rounded-full bg-pink-300"
                      style={{
                        left: '50%',
                        top: '50%',
                        marginLeft: `${x}px`,
                        marginTop: `${y}px`,
                      }}
                      animate={{
                        opacity: [0, 1, 0],
                        scale: [0, 2, 0],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                    />
                  );
                })}
              </motion.div>
              
              <p className="text-slate-400 text-sm italic mt-4 leading-relaxed">
                Создано с любовью<br />
                Анастасией Сухаревой<br />
                и искусственным интеллектом ✨
              </p>
            </div>
          </motion.div>

          {/* Правая колонка: Контакты */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h4 className="text-sm font-semibold text-violet-300 uppercase tracking-wider mb-4">Свяжитесь с нами</h4>
            <a href="mailto:hello@example.com" className="flex items-center gap-3 text-slate-300 hover:text-pink-300 transition-colors duration-300">
              <Mail size={18} />
              hello@school.com
            </a>
            <a href="#" className="flex items-center gap-3 text-slate-300 hover:text-pink-300 transition-colors duration-300">
              <Instagram size={18} />
              @sukhareva_school
            </a>
            <a href="#" className="flex items-center gap-3 text-slate-300 hover:text-pink-300 transition-colors duration-300">
              <Send size={18} />
              Telegram
            </a>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          className="text-center mt-12 pt-8 border-t border-violet-500/20 text-slate-500 text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          © 2026 Школа аутентичного маркетинга. Все права защищены.
        </motion.div>
      </div>
    </footer>
  );
}