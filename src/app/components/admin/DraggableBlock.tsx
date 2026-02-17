import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { motion } from 'motion/react';
import { 
  Video, 
  FileText, 
  Image as ImageIcon, 
  Headphones,
  Trash2,
  GripVertical,
  ChevronUp,
  ChevronDown,
  Copy
} from 'lucide-react';
import { ContentBlock } from './ContentBlockEditor';
import { TiptapEditor } from './TiptapEditor';

const ITEM_TYPE = 'CONTENT_BLOCK';

interface DraggableBlockProps {
  block: ContentBlock;
  index: number;
  moveBlock: (dragIndex: number, hoverIndex: number) => void;
  updateBlock: (id: string, content: string) => void;
  deleteBlock: (id: string) => void;
  copyBlock: (id: string) => void;
  moveBlockByButton: (id: string, direction: 'up' | 'down') => void;
  isFirst: boolean;
  isLast: boolean;
  quillModules: any;
  quillFormats: string[];
}

export function DraggableBlock({
  block,
  index,
  moveBlock,
  updateBlock,
  deleteBlock,
  copyBlock,
  moveBlockByButton,
  isFirst,
  isLast,
  quillModules,
  quillFormats,
}: DraggableBlockProps) {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: ITEM_TYPE,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ isOver }, drop] = useDrop({
    accept: ITEM_TYPE,
    hover: (item: { index: number }) => {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      moveBlock(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  drag(drop(ref));

  return (
    <motion.div
      ref={ref}
      className={`bg-white border-2 rounded-xl p-4 transition-all ${
        isDragging 
          ? 'opacity-30 border-violet-400 shadow-xl scale-105 rotate-2' 
          : isOver 
          ? 'border-violet-500 shadow-lg bg-violet-50' 
          : 'border-slate-200 hover:border-violet-300'
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={!isDragging ? { scale: 1.01 } : {}}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="cursor-move" title="Перетащите для изменения порядка">
          <GripVertical size={20} className="text-slate-400" />
        </div>
        <div className={`p-2 rounded-lg ${
          block.type === 'text' ? 'bg-violet-100 text-violet-600' :
          block.type === 'video' ? 'bg-fuchsia-100 text-fuchsia-600' :
          block.type === 'audio' ? 'bg-cyan-100 text-cyan-600' :
          'bg-amber-100 text-amber-600'
        }`}>
          {block.type === 'text' && <FileText size={18} />}
          {block.type === 'video' && <Video size={18} />}
          {block.type === 'audio' && <Headphones size={18} />}
          {block.type === 'image' && <ImageIcon size={18} />}
        </div>
        <span className="font-semibold text-slate-700 flex-1">
          {block.type === 'text' && 'Текстовый блок'}
          {block.type === 'video' && 'Видео'}
          {block.type === 'audio' && 'Аудио'}
          {block.type === 'image' && 'Изображение'}
        </span>
        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => moveBlockByButton(block.id, 'up')}
            disabled={isFirst}
            className="p-1.5 hover:bg-slate-100 rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            title="Переместить вверх"
          >
            <ChevronUp size={18} className="text-slate-600" />
          </button>
          <button
            type="button"
            onClick={() => moveBlockByButton(block.id, 'down')}
            disabled={isLast}
            className="p-1.5 hover:bg-slate-100 rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            title="Переместить вниз"
          >
            <ChevronDown size={18} className="text-slate-600" />
          </button>
          <button
            type="button"
            onClick={() => copyBlock(block.id)}
            className="p-1.5 hover:bg-green-50 rounded transition-colors group"
            title="Копировать блок"
          >
            <Copy size={18} className="text-green-600 group-hover:scale-110 transition-transform" />
          </button>
          <button
            type="button"
            onClick={() => deleteBlock(block.id)}
            className="p-1.5 hover:bg-red-50 rounded transition-colors"
            title="Удалить блок"
          >
            <Trash2 size={18} className="text-red-600" />
          </button>
        </div>
      </div>

      {/* Контент блока */}
      <div className="ml-9">
        {block.type === 'text' ? (
          <div className="tiptap-editor-wrapper">
            <TiptapEditor
              content={block.content}
              onChange={(content) => updateBlock(block.id, content)}
              placeholder="Начните печатать..."
            />
          </div>
        ) : block.type === 'video' ? (
          <div>
            <input
              type="text"
              value={block.content}
              onChange={(e) => updateBlock(block.id, e.target.value)}
              placeholder="Вставьте ссылку на видео (YouTube, Vimeo и т.д.)"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
            />
            {block.content && (
              <div className="mt-3 aspect-video bg-slate-100 rounded-lg flex items-center justify-center">
                <Video size={48} className="text-slate-400" />
              </div>
            )}
          </div>
        ) : block.type === 'audio' ? (
          <div>
            <input
              type="text"
              value={block.content}
              onChange={(e) => updateBlock(block.id, e.target.value)}
              placeholder="Вставьте ссылку на аудио файл"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
            />
            {block.content && (
              <div className="mt-3 h-20 bg-slate-100 rounded-lg flex items-center justify-center">
                <Headphones size={36} className="text-slate-400" />
              </div>
            )}
          </div>
        ) : (
          <div>
            <input
              type="text"
              value={block.content}
              onChange={(e) => updateBlock(block.id, e.target.value)}
              placeholder="Вставьте ссылку на изображение"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
            />
            {block.content && (
              <div className="mt-3 aspect-video bg-slate-100 rounded-lg flex items-center justify-center overflow-hidden">
                <img 
                  src={block.content} 
                  alt="Preview" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}