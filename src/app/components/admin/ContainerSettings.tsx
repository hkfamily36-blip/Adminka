import { motion, AnimatePresence } from 'motion/react';
import { X, Sliders } from 'lucide-react';
import { ContainerSettings as ContainerSettingsType } from './ContentBlockEditor';

interface ContainerSettingsProps {
  isOpen: boolean;
  onClose: () => void;
  settings: ContainerSettingsType;
  onUpdate: (settings: ContainerSettingsType) => void;
}

export function ContainerSettings({ isOpen, onClose, settings, onUpdate }: ContainerSettingsProps) {
  const updateSetting = (key: keyof ContainerSettingsType, value: string) => {
    onUpdate({ ...settings, [key]: value });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 z-40"
            onClick={onClose}
          />

          {/* Панель настроек */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-96 bg-white shadow-2xl z-50 overflow-y-auto"
          >
            {/* Заголовок */}
            <div className="sticky top-0 bg-gradient-to-r from-violet-600 to-purple-600 text-white p-6 shadow-lg z-10">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-lg backdrop-blur">
                    <Sliders size={20} />
                  </div>
                  <h3 className="text-lg font-bold">Общие настройки</h3>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  title="Закрыть"
                >
                  <X size={20} />
                </button>
              </div>
              <p className="text-violet-100 text-sm">
                Настройте внешний вид всех блоков
              </p>
            </div>

            {/* Контент настроек */}
            <div className="p-6 space-y-6">
              {/* Расстояние между блоками */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Расстояние между блоками
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {['0.5rem', '0.75rem', '1rem', '1.5rem', '2rem', '3rem', '4rem', '6rem'].map((gap) => (
                    <button
                      key={gap}
                      onClick={() => updateSetting('gap', gap)}
                      className={`px-3 py-2 text-xs rounded-lg border-2 transition-all ${
                        settings.gap === gap
                          ? 'border-violet-500 bg-violet-50 text-violet-700 font-semibold'
                          : 'border-slate-200 bg-white text-slate-600 hover:border-violet-300'
                      }`}
                    >
                      {gap}
                    </button>
                  ))}
                </div>
              </div>

              {/* Внутренние отступы */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Внутренние отступы блоков
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {['0.5rem', '1rem', '1.5rem', '2rem', '2.5rem', '3rem', '4rem', '5rem'].map((padding) => (
                    <button
                      key={padding}
                      onClick={() => updateSetting('padding', padding)}
                      className={`px-3 py-2 text-xs rounded-lg border-2 transition-all ${
                        settings.padding === padding
                          ? 'border-violet-500 bg-violet-50 text-violet-700 font-semibold'
                          : 'border-slate-200 bg-white text-slate-600 hover:border-violet-300'
                      }`}
                    >
                      {padding}
                    </button>
                  ))}
                </div>
              </div>

              {/* Фон блоков */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Фон блоков
                </label>
                <div className="space-y-2">
                  <input
                    type="color"
                    value={settings.background || '#ffffff'}
                    onChange={(e) => updateSetting('background', e.target.value)}
                    className="w-full h-12 rounded-lg cursor-pointer border-2 border-slate-200"
                  />
                  <input
                    type="text"
                    value={settings.background || '#ffffff'}
                    onChange={(e) => updateSetting('background', e.target.value)}
                    placeholder="#ffffff"
                    className="w-full px-4 py-2 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent text-sm font-mono"
                  />
                </div>
                <div className="mt-3 grid grid-cols-6 gap-2">
                  {[
                    '#ffffff',
                    '#f8fafc',
                    '#f1f5f9',
                    '#e2e8f0',
                    '#faf5ff',
                    '#f3e8ff',
                    '#e9d5ff',
                    '#fef3c7',
                    '#dbeafe',
                    '#fee2e2',
                    '#d1fae5',
                    '#000000',
                  ].map((color) => (
                    <button
                      key={color}
                      onClick={() => updateSetting('background', color)}
                      className={`w-full aspect-square rounded-lg border-2 transition-all ${
                        settings.background === color
                          ? 'border-violet-500 scale-110 shadow-lg'
                          : 'border-slate-300 hover:border-violet-400'
                      }`}
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
              </div>

              {/* Цвет обводки */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Цвет обводки
                </label>
                <div className="space-y-2">
                  <input
                    type="color"
                    value={settings.borderColor || '#e2e8f0'}
                    onChange={(e) => updateSetting('borderColor', e.target.value)}
                    className="w-full h-12 rounded-lg cursor-pointer border-2 border-slate-200"
                  />
                  <input
                    type="text"
                    value={settings.borderColor || '#e2e8f0'}
                    onChange={(e) => updateSetting('borderColor', e.target.value)}
                    placeholder="#e2e8f0"
                    className="w-full px-4 py-2 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent text-sm font-mono"
                  />
                </div>
                <div className="mt-3 grid grid-cols-6 gap-2">
                  {[
                    '#e2e8f0',
                    '#cbd5e1',
                    '#94a3b8',
                    '#583B8B',
                    '#8C2F5E',
                    '#C9A96E',
                    '#D1C4E9',
                    '#f59e0b',
                    '#3b82f6',
                    '#ef4444',
                    '#10b981',
                    '#000000',
                  ].map((color) => (
                    <button
                      key={color}
                      onClick={() => updateSetting('borderColor', color)}
                      className={`w-full aspect-square rounded-lg border-2 transition-all ${
                        settings.borderColor === color
                          ? 'border-violet-500 scale-110 shadow-lg'
                          : 'border-slate-300 hover:border-violet-400'
                      }`}
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
              </div>

              {/* Толщина обводки */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Толщина обводки
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {['0px', '1px', '2px', '3px', '4px', '6px', '8px'].map((width) => (
                    <button
                      key={width}
                      onClick={() => updateSetting('borderWidth', width)}
                      className={`px-3 py-2 text-xs rounded-lg border-2 transition-all ${
                        settings.borderWidth === width
                          ? 'border-violet-500 bg-violet-50 text-violet-700 font-semibold'
                          : 'border-slate-200 bg-white text-slate-600 hover:border-violet-300'
                      }`}
                    >
                      {width}
                    </button>
                  ))}
                </div>
              </div>

              {/* Скругление углов */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Скругление углов
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {['0px', '0.25rem', '0.5rem', '0.75rem', '1rem', '1.5rem', '2rem', '9999px'].map((radius) => (
                    <button
                      key={radius}
                      onClick={() => updateSetting('borderRadius', radius)}
                      className={`px-3 py-2 text-xs rounded-lg border-2 transition-all ${
                        settings.borderRadius === radius
                          ? 'border-violet-500 bg-violet-50 text-violet-700 font-semibold'
                          : 'border-slate-200 bg-white text-slate-600 hover:border-violet-300'
                      }`}
                    >
                      {radius === '9999px' ? 'Полное' : radius}
                    </button>
                  ))}
                </div>
              </div>

              {/* Сброс настроек */}
              <div className="pt-4 border-t border-slate-200">
                <button
                  onClick={() => onUpdate({
                    gap: '0.75rem',
                    background: '#ffffff',
                    borderColor: '#e2e8f0',
                    borderWidth: '2px',
                    borderRadius: '0.75rem',
                    padding: '1rem',
                  })}
                  className="w-full px-4 py-3 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors font-semibold"
                >
                  Сбросить настройки
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}