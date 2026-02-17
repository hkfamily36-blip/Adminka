import { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { 
  Plus, 
  Video, 
  FileText, 
  Image as ImageIcon, 
  Headphones,
} from 'lucide-react';
import { DraggableBlock } from './DraggableBlock';

export interface ContentBlock {
  id: string;
  type: 'text' | 'video' | 'audio' | 'image';
  content: string;
  order: number;
}

interface ContentBlockEditorProps {
  blocks: ContentBlock[];
  onChange: (blocks: ContentBlock[]) => void;
}

export function ContentBlockEditor({ blocks, onChange }: ContentBlockEditorProps) {
  const [localBlocks, setLocalBlocks] = useState<ContentBlock[]>(blocks);

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

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="space-y-4">
        {/* Добавление блоков */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex gap-2 flex-wrap">
            <button
              type="button"
              onClick={() => addBlock('text')}
              className="flex items-center gap-2 px-4 py-2 bg-violet-100 hover:bg-violet-200 text-violet-700 rounded-lg transition-colors font-semibold"
            >
              <FileText size={18} />
              Добавить текст
            </button>
            <button
              type="button"
              onClick={() => addBlock('video')}
              className="flex items-center gap-2 px-4 py-2 bg-fuchsia-100 hover:bg-fuchsia-200 text-fuchsia-700 rounded-lg transition-colors font-semibold"
            >
              <Video size={18} />
              Добавить видео
            </button>
            <button
              type="button"
              onClick={() => addBlock('audio')}
              className="flex items-center gap-2 px-4 py-2 bg-cyan-100 hover:bg-cyan-200 text-cyan-700 rounded-lg transition-colors font-semibold"
            >
              <Headphones size={18} />
              Добавить аудио
            </button>
            <button
              type="button"
              onClick={() => addBlock('image')}
              className="flex items-center gap-2 px-4 py-2 bg-amber-100 hover:bg-amber-200 text-amber-700 rounded-lg transition-colors font-semibold"
            >
              <ImageIcon size={18} />
              Добавить изображение
            </button>
          </div>
          {localBlocks.length > 0 && (
            <div className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg font-semibold text-sm">
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
            localBlocks.map((block, index) => (
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
              />
            ))
          )}
        </div>
      </div>
    </DndProvider>
  );
}
