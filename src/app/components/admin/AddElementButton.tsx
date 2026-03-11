import { useState } from 'react';
import { 
  Plus, 
  Video, 
  FileText, 
  Image as ImageIcon, 
  Headphones,
  Type,
  MousePointer,
  Columns,
  FileImage,
  ChevronDown,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ContentBlock } from './ContentBlockEditor';

interface AddElementButtonProps {
  onAddBlock: (type: ContentBlock['type']) => void;
  deviceType?: 'desktop' | 'tablet' | 'mobile';
}

export function AddElementButton({ onAddBlock, deviceType = 'desktop' }: AddElementButtonProps) {
  const [showElementMenu, setShowElementMenu] = useState(false);

  const elementTypes = [
    { type: 'text' as const, label: 'Текст', icon: FileText, color: 'text-slate-700' },
    { type: 'heading' as const, label: 'Заголовок', icon: Type, color: 'text-slate-700' },
    { type: 'button' as const, label: 'Кнопка', icon: MousePointer, color: 'text-slate-700' },
    { type: 'columns' as const, label: 'Колонки', icon: Columns, color: 'text-slate-700' },
    { type: 'image' as const, label: 'Картинка', icon: ImageIcon, color: 'text-slate-700' },
    { type: 'text-image' as const, label: 'Текст + Картинка', icon: FileImage, color: 'text-slate-700' },
    { type: 'video' as const, label: 'Видео', icon: Video, color: 'text-slate-700' },
    { type: 'audio' as const, label: 'Аудио', icon: Headphones, color: 'text-slate-700' },
  ];

  const handleAddBlock = (type: ContentBlock['type']) => {
    onAddBlock(type);
    setShowElementMenu(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setShowElementMenu(!showElementMenu)}
        className={`flex items-center gap-2 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all ${
          deviceType === 'mobile' ? 'text-sm px-4 py-2.5' : 'text-base px-5 py-2.5'
        }`}
      >
        <Plus size={deviceType === 'mobile' ? 18 : 20} className="flex-shrink-0" />
        <span className="whitespace-nowrap">{deviceType === 'mobile' ? 'Элемент' : 'Добавить элемент'}</span>
        <ChevronDown size={deviceType === 'mobile' ? 16 : 18} className={`transition-transform flex-shrink-0 ${showElementMenu ? 'rotate-180' : ''}`} />
      </button>

      {/* Выпадающее меню элементов */}
      <AnimatePresence>
        {showElementMenu && (
          <>
            {/* Overlay для закрытия меню */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setShowElementMenu(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className={`absolute top-full right-0 mt-2 bg-white rounded-xl shadow-2xl border border-slate-200 py-2 z-50 ${
                deviceType === 'mobile' ? 'w-64' : 'w-80'
              }`}
            >
              {elementTypes.map((element) => {
                const Icon = element.icon;
                return (
                  <button
                    key={element.type}
                    type="button"
                    onClick={() => handleAddBlock(element.type)}
                    className={`w-full flex items-center gap-3 hover:bg-blue-50 transition-colors text-left border-b border-dashed border-slate-200 last:border-b-0 ${
                      deviceType === 'mobile' ? 'px-3 py-2' : 'px-4 py-3'
                    }`}
                  >
                    <Icon size={deviceType === 'mobile' ? 16 : 20} className={element.color} />
                    <span className={`text-slate-700 font-medium ${deviceType === 'mobile' ? 'text-sm' : ''}`}>{element.label}</span>
                  </button>
                );
              })}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
