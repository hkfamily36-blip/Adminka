import { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
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
  Smile,
  ChevronDown,
} from 'lucide-react';
import { DraggableBlock } from './DraggableBlock';
import { motion, AnimatePresence } from 'motion/react';

export interface ContentBlock {
  id: string;
  type: 'text' | 'video' | 'audio' | 'image' | 'heading' | 'button' | 'columns' | 'text-image' | 'icon';
  content: string;
  order: number;
}

interface ContentBlockEditorProps {
  blocks: ContentBlock[];
  onChange: (blocks: ContentBlock[]) => void;
  deviceType?: 'desktop' | 'tablet' | 'mobile';
}

export function ContentBlockEditor({ blocks, onChange, deviceType = 'desktop' }: ContentBlockEditorProps) {
  const [localBlocks, setLocalBlocks] = useState<ContentBlock[]>(blocks);
  const [showElementMenu, setShowElementMenu] = useState(false);

  useEffect(() => {
    onChange(localBlocks);
  }, [localBlocks]);

  const addBlock = (type: ContentBlock['type']) => {
    const newBlock: ContentBlock = {
      id: `block-${Date.now()}`,
      type,
      content: '',
      order: localBlocks.length,
    };
    setLocalBlocks([...localBlocks, newBlock]);
    setShowElementMenu(false);
  };

  const updateBlock = (id: string, content: string) => {
    setLocalBlocks(localBlocks.map(block => 
      block.id === id ? { ...block, content } : block
    ));
  };

  const deleteBlock = (id: string) => {
    setLocalBlocks(localBlocks.filter(block => block.id !== id));
  };

  const moveBlock = (id: string, direction: 'up' | 'down') => {
    const index = localBlocks.findIndex(block => block.id === id);
    if (
      (direction === 'up' && index === 0) || 
      (direction === 'down' && index === localBlocks.length - 1)
    ) {
      return;
    }

    const newBlocks = [...localBlocks];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newBlocks[index], newBlocks[targetIndex]] = [newBlocks[targetIndex], newBlocks[index]];
    
    // Обновляем order
    newBlocks.forEach((block, idx) => {
      block.order = idx;
    });
    
    setLocalBlocks(newBlocks);
  };

  const copyBlock = (id: string) => {
    const blockToCopy = localBlocks.find(block => block.id === id);
    if (!blockToCopy) return;

    const newBlock: ContentBlock = {
      ...blockToCopy,
      id: `block-${Date.now()}`,
      order: localBlocks.length,
    };
    setLocalBlocks([...localBlocks, newBlock]);
  };

  const moveBlockDnd = (dragIndex: number, hoverIndex: number) => {
    const newBlocks = [...localBlocks];
    const draggedBlock = newBlocks[dragIndex];
    newBlocks.splice(dragIndex, 1);
    newBlocks.splice(hoverIndex, 0, draggedBlock);
    
    // Обновляем order
    newBlocks.forEach((block, idx) => {
      block.order = idx;
    });
    
    setLocalBlocks(newBlocks);
  };

  // Массив доступных элементов
  const elementTypes = [
    { type: 'text' as const, label: 'Текст', icon: FileText, color: 'text-slate-700' },
    { type: 'heading' as const, label: 'Заголовок', icon: Type, color: 'text-slate-700' },
    { type: 'button' as const, label: 'Кнопка', icon: MousePointer, color: 'text-slate-700' },
    { type: 'columns' as const, label: 'Колонки', icon: Columns, color: 'text-slate-700' },
    { type: 'image' as const, label: 'Картинка', icon: ImageIcon, color: 'text-slate-700' },
    { type: 'text-image' as const, label: 'Текст + Картинка', icon: FileImage, color: 'text-slate-700' },
    { type: 'icon' as const, label: 'Иконка', icon: Smile, color: 'text-slate-700' },
    { type: 'video' as const, label: 'Видео', icon: Video, color: 'text-slate-700' },
    { type: 'audio' as const, label: 'Аудио', icon: Headphones, color: 'text-slate-700' },
  ];

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="space-y-4">
        {/* Добавление блоков */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowElementMenu(!showElementMenu)}
              className={`flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all ${
                deviceType === 'mobile' ? 'text-sm px-4 py-2' : ''
              }`}
            >
              <Plus size={deviceType === 'mobile' ? 16 : 20} />
              {deviceType === 'mobile' ? 'Добавить' : 'Добавить элемент'}
              <ChevronDown size={deviceType === 'mobile' ? 14 : 18} className={`transition-transform ${showElementMenu ? 'rotate-180' : ''}`} />
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
                    className={`absolute top-full left-0 mt-2 bg-white rounded-xl shadow-2xl border border-slate-200 py-2 z-50 max-h-96 overflow-y-auto ${
                      deviceType === 'mobile' ? 'w-64' : 'w-80'
                    }`}
                  >
                    {elementTypes.map((element) => {
                      const Icon = element.icon;
                      return (
                        <button
                          key={element.type}
                          type="button"
                          onClick={() => addBlock(element.type)}
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

          {localBlocks.length > 0 && (
            <div className={`px-4 py-2 bg-slate-100 text-slate-700 rounded-lg font-semibold ${
              deviceType === 'mobile' ? 'text-xs' : 'text-sm'
            }`}>
              📦 Блоков: {localBlocks.length}
            </div>
          )}
        </div>

        {/* Список блоков */}
        <div className="space-y-3">
          {localBlocks.length === 0 ? (
            <div className="text-center py-12 bg-gradient-to-br from-violet-50 to-purple-50 rounded-xl border-2 border-dashed border-violet-200">
              <FileText size={48} className="mx-auto mb-3 text-violet-400" />
              <p className="text-violet-700 font-semibold mb-1">Начните создавать урок</p>
              <p className="text-slate-500 text-sm">Добавьте первый блок контента выше 👆</p>
            </div>
          ) : (
            <AnimatePresence>
              {localBlocks.map((block, index) => (
                <motion.div
                  key={block.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <DraggableBlock
                    key={block.id}
                    block={block}
                    index={index}
                    moveBlock={moveBlockDnd}
                    updateBlock={updateBlock}
                    deleteBlock={deleteBlock}
                    copyBlock={copyBlock}
                    moveBlockByButton={moveBlock}
                    isFirst={index === 0}
                    isLast={index === localBlocks.length - 1}
                    quillModules={{}}
                    quillFormats={[]}
                    deviceType={deviceType}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>
      </div>
    </DndProvider>
  );
}