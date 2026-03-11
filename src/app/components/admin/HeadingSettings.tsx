import { X, Heading, AlignLeft, AlignCenter, AlignRight, AlignJustify } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ContentBlock } from './ContentBlockEditor';

interface HeadingSettingsProps {
  isOpen: boolean;
  onClose: () => void;
  block: ContentBlock;
  onUpdateBlockStyle?: (id: string, style: ContentBlock['style']) => void;
}

const fontFamilies = [
  { value: 'inherit', label: 'По умолчанию' },
  { value: 'Inter, sans-serif', label: 'Inter' },
  { value: 'Roboto, sans-serif', label: 'Roboto' },
  { value: 'Open Sans, sans-serif', label: 'Open Sans' },
  { value: 'Lato, sans-serif', label: 'Lato' },
  { value: 'Montserrat, sans-serif', label: 'Montserrat' },
  { value: 'Playfair Display, serif', label: 'Playfair Display' },
  { value: 'Georgia, serif', label: 'Georgia' },
  { value: 'Courier New, monospace', label: 'Courier New' },
];

const fontWeights = [
  { value: '300', label: 'Light (300)' },
  { value: '400', label: 'Regular (400)' },
  { value: '500', label: 'Medium (500)' },
  { value: '600', label: 'Semibold (600)' },
  { value: '700', label: 'Bold (700)' },
  { value: '800', label: 'Extra Bold (800)' },
  { value: '900', label: 'Black (900)' },
];

const fontSizes = [
  { value: '16px', label: '16px' },
  { value: '18px', label: '18px' },
  { value: '20px', label: '20px' },
  { value: '24px', label: '24px' },
  { value: '28px', label: '28px' },
  { value: '32px', label: '32px' },
  { value: '36px', label: '36px' },
  { value: '40px', label: '40px' },
  { value: '48px', label: '48px' },
  { value: '56px', label: '56px' },
  { value: '64px', label: '64px' },
  { value: '72px', label: '72px' },
];

const lineHeights = [
  { value: '1', label: '1' },
  { value: '1.1', label: '1.1' },
  { value: '1.2', label: '1.2' },
  { value: '1.3', label: '1.3' },
  { value: '1.4', label: '1.4' },
  { value: '1.5', label: '1.5' },
  { value: '1.6', label: '1.6' },
  { value: '1.8', label: '1.8' },
  { value: '2', label: '2' },
];

export function HeadingSettings({ isOpen, onClose, block, onUpdateBlockStyle }: HeadingSettingsProps) {
  const handleChange = (key: keyof ContentBlock['style'], value: string) => {
    if (onUpdateBlockStyle) {
      onUpdateBlockStyle(block.id, { ...(block.style || {}), [key]: value });
    }
  };

  const style = block.style || {};

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 z-40"
            onClick={onClose}
          />

          {/* Settings Panel */}
          <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-96 bg-white shadow-2xl z-50 overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-indigo-600 to-blue-600 text-white p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                  <Heading size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Настройки заголовка</h3>
                  <p className="text-indigo-100 text-sm">Стилизация заголовка</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Settings Content */}
            <div className="p-6 space-y-6">
              {/* Цвет текста */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Цвет заголовка
                </label>
                <div className="flex gap-2 items-center">
                  <input
                    type="color"
                    value={style.color || '#000000'}
                    onChange={(e) => handleChange('color', e.target.value)}
                    className="w-12 h-12 rounded-lg border-2 border-slate-200 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={style.color || '#000000'}
                    onChange={(e) => handleChange('color', e.target.value)}
                    className="flex-1 px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="#000000"
                  />
                </div>
              </div>

              {/* Шрифт */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Шрифт
                </label>
                <select
                  value={style.fontFamily || 'inherit'}
                  onChange={(e) => handleChange('fontFamily', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                >
                  {fontFamilies.map((font) => (
                    <option key={font.value} value={font.value}>
                      {font.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Насыщенность (толщина) шрифта */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Насыщенность шрифта
                </label>
                <select
                  value={style.fontWeight || '700'}
                  onChange={(e) => handleChange('fontWeight', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                >
                  {fontWeights.map((weight) => (
                    <option key={weight.value} value={weight.value}>
                      {weight.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Размер шрифта */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Размер шрифта
                </label>
                <select
                  value={style.fontSize || '32px'}
                  onChange={(e) => handleChange('fontSize', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                >
                  {fontSizes.map((size) => (
                    <option key={size.value} value={size.value}>
                      {size.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Высота строки */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Высота строки
                </label>
                <select
                  value={style.lineHeight || '1.2'}
                  onChange={(e) => handleChange('lineHeight', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                >
                  {lineHeights.map((height) => (
                    <option key={height.value} value={height.value}>
                      {height.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Выравнивание текста */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Выравнивание заголовка
                </label>
                <div className="grid grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => handleChange('textAlign', 'left')}
                    className={`p-3 rounded-lg border-2 transition-all flex items-center justify-center ${
                      style.textAlign === 'left' || !style.textAlign
                        ? 'border-indigo-500 bg-indigo-50 text-indigo-600'
                        : 'border-slate-200 hover:border-indigo-300'
                    }`}
                    title="По левому краю"
                  >
                    <AlignLeft size={20} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleChange('textAlign', 'center')}
                    className={`p-3 rounded-lg border-2 transition-all flex items-center justify-center ${
                      style.textAlign === 'center'
                        ? 'border-indigo-500 bg-indigo-50 text-indigo-600'
                        : 'border-slate-200 hover:border-indigo-300'
                    }`}
                    title="По центру"
                  >
                    <AlignCenter size={20} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleChange('textAlign', 'right')}
                    className={`p-3 rounded-lg border-2 transition-all flex items-center justify-center ${
                      style.textAlign === 'right'
                        ? 'border-indigo-500 bg-indigo-50 text-indigo-600'
                        : 'border-slate-200 hover:border-indigo-300'
                    }`}
                    title="По правому краю"
                  >
                    <AlignRight size={20} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleChange('textAlign', 'justify')}
                    className={`p-3 rounded-lg border-2 transition-all flex items-center justify-center ${
                      style.textAlign === 'justify'
                        ? 'border-indigo-500 bg-indigo-50 text-indigo-600'
                        : 'border-slate-200 hover:border-indigo-300'
                    }`}
                    title="По ширине"
                  >
                    <AlignJustify size={20} />
                  </button>
                </div>
              </div>

              {/* Preview */}
              <div className="border-t pt-6 mt-6">
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Предпросмотр
                </label>
                <div
                  className="p-4 bg-slate-50 rounded-lg border border-slate-200"
                  style={{
                    color: style.color,
                    fontFamily: style.fontFamily !== 'inherit' ? style.fontFamily : undefined,
                    fontWeight: style.fontWeight,
                    fontSize: style.fontSize,
                    lineHeight: style.lineHeight,
                    textAlign: style.textAlign,
                  }}
                >
                  Это пример заголовка с применёнными настройками
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
