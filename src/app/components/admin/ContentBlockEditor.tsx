import { useState, useEffect, useRef } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { motion, AnimatePresence } from 'motion/react';
import {
  FileText,
  Type,
  MousePointer,
  Columns,
  Image as ImageIcon,
  FileImage,
  Video,
  Headphones,
  Settings as SettingsIcon,
} from 'lucide-react';
import { DraggableBlock } from './DraggableBlock';
import { TextBlockSettings } from './TextBlockSettings';
import { HeadingSettings } from './HeadingSettings';
import { ButtonSettings } from './ButtonSettings';
import { ImageSettings } from './ImageSettings';
import { ContainerSettings as ContainerSettingsPanel } from './ContainerSettings';

export interface ContentBlock {
  id: string;
  type: 'text' | 'video' | 'audio' | 'image' | 'heading' | 'button' | 'columns' | 'text-image' | 'icon';
  content: string;
  order: number;
  // Настройки стилизации
  style?: {
    color?: string;
    fontFamily?: string;
    fontWeight?: string;
    fontSize?: string;
    lineHeight?: string;
    textAlign?: 'left' | 'center' | 'right' | 'justify';
    // Для кнопки
    backgroundColor?: string;
    borderRadius?: string;
    padding?: string;
    // Для изображения
    width?: string;
    height?: string;
    objectFit?: string;
    imageAlign?: 'left' | 'center' | 'right';
    boxShadow?: string;
  };
}

export interface ContainerSettings {
  gap?: string; // расстояние между блоками
  background?: string; // фон блоков
  borderColor?: string; // цвет обводки
  borderWidth?: string; // толщина обводки
  borderRadius?: string; // скругление углов
  padding?: string; // внутренние отступы блоков
}

interface ContentBlockEditorProps {
  blocks: ContentBlock[];
  onChange: (blocks: ContentBlock[]) => void;
  deviceType?: 'desktop' | 'tablet' | 'mobile';
  onAddBlock?: (type: ContentBlock['type']) => void;
  showAddButton?: boolean;
  containerSettings?: ContainerSettings;
  onContainerSettingsChange?: (settings: ContainerSettings) => void;
}

export function ContentBlockEditor({ blocks, onChange, deviceType = 'desktop', onAddBlock, showAddButton = true, containerSettings, onContainerSettingsChange }: ContentBlockEditorProps) {
  const [localBlocks, setLocalBlocks] = useState<ContentBlock[]>(blocks);
  const [showElementMenu, setShowElementMenu] = useState(false);
  const [activeSettingsBlockId, setActiveSettingsBlockId] = useState<string | null>(null);
  const [showContainerSettings, setShowContainerSettings] = useState(false);
  const isInternalUpdate = useRef(false);

  // Синхронизация с родительским компонентом только при внешних изменениях
  useEffect(() => {
    if (!isInternalUpdate.current) {
      setLocalBlocks(blocks);
    }
    isInternalUpdate.current = false;
  }, [blocks]);

  const updateAndNotify = (updatedBlocks: ContentBlock[]) => {
    isInternalUpdate.current = true;
    setLocalBlocks(updatedBlocks);
    onChange(updatedBlocks);
  };

  const addBlock = (type: ContentBlock['type']) => {
    const newBlock: ContentBlock = {
      id: `block-${Date.now()}`,
      type,
      content: '',
      order: localBlocks.length,
    };
    const updatedBlocks = [...localBlocks, newBlock];
    updateAndNotify(updatedBlocks);
    setShowElementMenu(false);
    if (onAddBlock) {
      onAddBlock(type);
    }
  };

  const updateBlock = (id: string, content: string) => {
    const updatedBlocks = localBlocks.map(block => 
      block.id === id ? { ...block, content } : block
    );
    updateAndNotify(updatedBlocks);
  };

  const updateBlockStyle = (id: string, style: ContentBlock['style']) => {
    const updatedBlocks = localBlocks.map(block => 
      block.id === id ? { ...block, style } : block
    );
    updateAndNotify(updatedBlocks);
  };

  const deleteBlock = (id: string) => {
    const updatedBlocks = localBlocks.filter(block => block.id !== id);
    updateAndNotify(updatedBlocks);
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
    
    updateAndNotify(newBlocks);
  };

  const copyBlock = (id: string) => {
    const blockToCopy = localBlocks.find(block => block.id === id);
    if (!blockToCopy) return;

    const newBlock: ContentBlock = {
      ...blockToCopy,
      id: `block-${Date.now()}`,
      order: localBlocks.length,
    };
    const updatedBlocks = [...localBlocks, newBlock];
    updateAndNotify(updatedBlocks);
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
    
    updateAndNotify(newBlocks);
  };

  // Массив доступных элементов
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

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="space-y-4">
        {/* Кнопка общих настроек */}
        {containerSettings && onContainerSettingsChange && (
          <div className="flex justify-end">
            <button
              onClick={() => setShowContainerSettings(true)}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#2E1065] to-[#8C2F5E] text-white rounded-lg hover:from-[#3B1A7E] hover:to-[#9C3F6E] transition-all shadow-md hover:shadow-lg"
            >
              <SettingsIcon size={18} />
              <span className="font-semibold">Общие настройки</span>
            </button>
          </div>
        )}

        {/* Список блоков */}
        <div 
          className="space-y-3"
          style={{
            gap: containerSettings?.gap,
          }}
        >
          {localBlocks.length === 0 ? (
            <div className="text-center py-12 bg-gradient-to-br from-[#D1C4E9]/20 to-[#FDE4FF]/20 rounded-xl border-2 border-dashed border-[#D1C4E9]">
              <FileText size={48} className="mx-auto mb-3 text-[#583B8B]" />
              <p className="text-[#2E1065] font-semibold mb-1">Начните создавать урок</p>
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
                    onUpdateBlockStyle={updateBlockStyle}
                    onOpenSettings={(id) => setActiveSettingsBlockId(id)}
                    containerSettings={containerSettings}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>

        {/* Кнопка добавления нового блока */}
        {showAddButton && !activeSettingsBlockId && (
          <div className="mt-8 mb-4 relative">
            <button
              className="block w-full bg-[#583B8B] text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-[#2E1065] focus:outline-none focus:ring-2 focus:ring-[#D1C4E9] focus:ring-opacity-50"
              onClick={() => setShowElementMenu(!showElementMenu)}
            >
              Добавить блок
            </button>
            {showElementMenu && (
              <div className="absolute left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                <div className="grid grid-cols-3 gap-2 p-2">
                  {elementTypes.map(type => (
                    <button
                      key={type.type}
                      className="flex flex-col items-center justify-center p-2 rounded-lg hover:bg-gray-100"
                      onClick={() => addBlock(type.type)}
                    >
                      <type.icon size={24} className={type.color} />
                      <p className="text-xs text-gray-500 mt-1">{type.label}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Панель настроек (фиксированная) */}
        {activeSettingsBlockId && (() => {
          const activeBlock = localBlocks.find(b => b.id === activeSettingsBlockId);
          if (!activeBlock) return null;
          
          if (activeBlock.type === 'heading') {
            return (
              <HeadingSettings
                isOpen={true}
                onClose={() => setActiveSettingsBlockId(null)}
                block={activeBlock}
                onUpdateBlockStyle={updateBlockStyle}
              />
            );
          } else if (activeBlock.type === 'text') {
            return (
              <TextBlockSettings
                isOpen={true}
                onClose={() => setActiveSettingsBlockId(null)}
                block={activeBlock}
                onUpdateBlockStyle={updateBlockStyle}
              />
            );
          } else if (activeBlock.type === 'button') {
            return (
              <ButtonSettings
                isOpen={true}
                onClose={() => setActiveSettingsBlockId(null)}
                block={activeBlock}
                onUpdateBlockStyle={updateBlockStyle}
              />
            );
          } else if (activeBlock.type === 'image') {
            return (
              <ImageSettings
                isOpen={true}
                onClose={() => setActiveSettingsBlockId(null)}
                block={activeBlock}
                onUpdateBlockStyle={updateBlockStyle}
              />
            );
          }
          return null;
        })()}

        {/* Панель настроек контейнера */}
        {containerSettings && onContainerSettingsChange && (
          <ContainerSettingsPanel
            isOpen={showContainerSettings}
            onClose={() => setShowContainerSettings(false)}
            settings={containerSettings}
            onUpdate={onContainerSettingsChange}
          />
        )}
      </div>
    </DndProvider>
  );
}