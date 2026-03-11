import { Mail, Instagram, Send } from 'lucide-react';
import { Logo } from '../App';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <div className="max-w-6xl mx-auto px-6 pb-8">
      <footer className="bg-white/50 backdrop-blur-2xl rounded-[2rem] border border-white/60 px-8 py-5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Логотип */}
          <div className="w-[160px] shrink-0 opacity-70">
            <Logo />
          </div>

          {/* Навигация · Соцсети · Копирайт */}
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
            <nav className="flex flex-wrap items-center gap-x-5 gap-y-1 text-[11px] text-slate-400">
              <a href="#" className="hover:text-[#583B8B] transition-colors duration-300">О программе</a>
              <a href="#" className="hover:text-[#583B8B] transition-colors duration-300">Конфиденциальность</a>
              <a href="#" className="hover:text-[#583B8B] transition-colors duration-300">Условия</a>
              <a href="#" className="hover:text-[#583B8B] transition-colors duration-300">FAQ</a>
            </nav>

            <div className="hidden md:block w-px h-4 bg-slate-200/60"></div>

            <div className="flex items-center gap-3.5 text-slate-300">
              <a href="mailto:hello@school.com" className="hover:text-[#583B8B] transition-colors duration-300" aria-label="Email">
                <Mail size={14} strokeWidth={1.5} />
              </a>
              <a href="#" className="hover:text-[#583B8B] transition-colors duration-300" aria-label="Instagram">
                <Instagram size={14} strokeWidth={1.5} />
              </a>
              <a href="#" className="hover:text-[#583B8B] transition-colors duration-300" aria-label="Telegram">
                <Send size={14} strokeWidth={1.5} />
              </a>
            </div>

            <div className="hidden md:block w-px h-4 bg-slate-200/60"></div>

            <span className="text-[10px] text-slate-300 tracking-wide whitespace-nowrap">
              © {year} Школа Сухаревой Анастасии
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}