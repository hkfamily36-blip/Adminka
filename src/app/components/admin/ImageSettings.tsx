import { X, Image as ImageIcon, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ContentBlock } from './ContentBlockEditor';

interface ImageSettingsProps {
  isOpen: boolean;
  onClose: () => void;
  block: ContentBlock;
  onUpdateBlockStyle?: (id: string, style: ContentBlock['style']) => void;
}

const widthOptions = [
  { value: '100%', label: 'Полная ширина (100%)' },
  { value: '75%', label: 'Широкое (75%)' },
  { value: '50%', label: 'Среднее (50%)' },
  { value: '33%', label: 'Треть ширины (33%)' },
  { value: '25%', label: 'Узкое (25%)' },
  { value: 'auto', label: 'Оригинальный размер' },
];

const heightOptions = [
  { value: 'auto', label: 'Автоматическая' },
  { value: '200px', label: 'Маленькая (200px)' },
  { value: '300px', label: 'Средняя (300px)' },
  { value: '400px', label: 'Большая (400px)' },
  { value: '500px', label: 'Очень большая (500px)' },
  { value: '600px', label: 'Максимальная (600px)' },
];

const objectFitOptions = [
  { value: 'cover', label: 'Обрезать (Cover)', description: 'Заполняет контейнер, обрезая изображение' },
  { value: 'contain', label: 'Вместить (Contain)', description: 'Показывает всё изображение целиком' },
  { value: 'fill', label: 'Растянуть (Fill)', description: 'Растягивает на весь контейнер' },
  { value: 'scale-down', label: 'Уменьшить (Scale Down)', description: 'Уменьшает до размера контейнера' },
  { value: 'none', label: 'Без масштабирования', description: 'Оригинальный размер' },
];

const borderRadiusOptions = [
  { value: '0px', label: 'Без скругления' },
  { value: '8px', label: 'Маленькое (8px)' },
  { value: '16px', label: 'Среднее (16px)' },
  { value: '24px', label: 'Большое (24px)' },
  { value: '32px', label: 'Очень большое (32px)' },
  { value: '9999px', label: 'Круглое' },
];

const shadowOptions = [
  { value: 'none', label: 'Без тени' },
  { value: '0 1px 3px rgba(0,0,0,0.12)', label: 'Маленькая' },
  { value: '0 4px 6px rgba(0,0,0,0.1)', label: 'Средняя' },
  { value: '0 10px 15px rgba(0,0,0,0.1)', label: 'Большая' },
  { value: '0 20px 25px rgba(0,0,0,0.15)', label: 'Очень большая' },
  { value: '0 25px 50px rgba(0,0,0,0.25)', label: 'Максимальная' },
];

export function ImageSettings({ isOpen, onClose, block, onUpdateBlockStyle }: ImageSettingsProps) {
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
            <div className="sticky top-0 bg-gradient-to-r from-amber-600 to-orange-600 text-white p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                  <ImageIcon size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Настройки изображения</h3>
                  <p className="text-amber-100 text-sm">Размер и стилизация</p>
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
              {/* Ширина изображения */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Ширина изображения
                </label>
                <select
                  value={style.width || '100%'}
                  onChange={(e) => handleChange('width', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                >
                  {widthOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Высота изображения */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Высота изображения
                </label>
                <select
                  value={style.height || 'auto'}
                  onChange={(e) => handleChange('height', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                >
                  {heightOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Режим отображения */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Режим отображения
                </label>
                <div className="space-y-2">
                  {objectFitOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handleChange('objectFit', option.value)}
                      className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                        (style.objectFit || 'cover') === option.value
                          ? 'border-amber-500 bg-amber-50'
                          : 'border-slate-200 hover:border-amber-300'
                      }`}
                    >
                      <div className="font-semibold text-slate-800">{option.label}</div>
                      <div className="text-xs text-slate-500 mt-1">{option.description}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Выравнивание изображения */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Выравнивание изображения
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => handleChange('imageAlign', 'left')}
                    className={`p-3 rounded-lg border-2 transition-all flex flex-col items-center justify-center gap-2 ${
                      (style.imageAlign || 'center') === 'left'
                        ? 'border-amber-500 bg-amber-50 text-amber-600'
                        : 'border-slate-200 hover:border-amber-300'
                    }`}
                    title="По левому краю"
                  >
                    <AlignLeft size={20} />
                    <span className="text-xs">Слева</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleChange('imageAlign', 'center')}
                    className={`p-3 rounded-lg border-2 transition-all flex flex-col items-center justify-center gap-2 ${
                      (style.imageAlign || 'center') === 'center'
                        ? 'border-amber-500 bg-amber-50 text-amber-600'
                        : 'border-slate-200 hover:border-amber-300'
                    }`}
                    title="По центру"
                  >
                    <AlignCenter size={20} />
                    <span className="text-xs">По центру</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleChange('imageAlign', 'right')}
                    className={`p-3 rounded-lg border-2 transition-all flex flex-col items-center justify-center gap-2 ${
                      (style.imageAlign || 'center') === 'right'
                        ? 'border-amber-500 bg-amber-50 text-amber-600'
                        : 'border-slate-200 hover:border-amber-300'
                    }`}
                    title="По правому краю"
                  >
                    <AlignRight size={20} />
                    <span className="text-xs">Справа</span>
                  </button>
                </div>
              </div>

              {/* Скругление углов */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Скругление углов
                </label>
                <select
                  value={style.borderRadius || '16px'}
                  onChange={(e) => handleChange('borderRadius', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                >
                  {borderRadiusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Тень */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Тень
                </label>
                <select
                  value={style.boxShadow || '0 4px 6px rgba(0,0,0,0.1)'}
                  onChange={(e) => handleChange('boxShadow', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                >
                  {shadowOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Preview */}
              <div className="border-t pt-6 mt-6">
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Предпросмотр
                </label>
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 
                        style.imageAlign === 'left' ? 'flex-start' :
                        style.imageAlign === 'right' ? 'flex-end' :
                        'center',
                    }}
                  >
                    <div
                      style={{
                        width: style.width || '100%',
                        height: style.height || 'auto',
                        minHeight: style.height === 'auto' ? '200px' : undefined,
                        borderRadius: style.borderRadius || '16px',
                        boxShadow: style.boxShadow || '0 4px 6px rgba(0,0,0,0.1)',
                        overflow: 'hidden',
                        backgroundColor: '#e2e8f0',
                      }}
                    >
                      {block.content ? (
                        <img
                          src={block.content}
                          alt="Preview"
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: (style.objectFit as any) || 'cover',
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ImageIcon size={48} className="text-slate-400" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Подсказка */}
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-xs text-blue-800">
                    <strong>Совет:</strong> Используйте режим "Обрезать" для фиксированных размеров 
                    и "Вместить" чтобы показать всё изображение целиком.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
