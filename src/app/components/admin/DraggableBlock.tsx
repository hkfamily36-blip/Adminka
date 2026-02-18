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
  Copy,
  Type,
  MousePointer,
  Columns,
  FileImage,
  Smile
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
  deviceType?: 'desktop' | 'tablet' | 'mobile';
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
  deviceType = 'desktop',
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
          block.type === 'heading' ? 'bg-blue-100 text-blue-600' :
          block.type === 'video' ? 'bg-fuchsia-100 text-fuchsia-600' :
          block.type === 'audio' ? 'bg-cyan-100 text-cyan-600' :
          block.type === 'image' ? 'bg-amber-100 text-amber-600' :
          block.type === 'button' ? 'bg-green-100 text-green-600' :
          block.type === 'columns' ? 'bg-gray-100 text-gray-600' :
          block.type === 'text-image' ? 'bg-red-100 text-red-600' :
          block.type === 'icon' ? 'bg-yellow-100 text-yellow-600' :
          'bg-slate-100 text-slate-600'
        }`}>
          {block.type === 'text' && <FileText size={18} />}
          {block.type === 'heading' && <Type size={18} />}
          {block.type === 'video' && <Video size={18} />}
          {block.type === 'audio' && <Headphones size={18} />}
          {block.type === 'image' && <ImageIcon size={18} />}
          {block.type === 'button' && <MousePointer size={18} />}
          {block.type === 'columns' && <Columns size={18} />}
          {block.type === 'text-image' && <FileImage size={18} />}
          {block.type === 'icon' && <Smile size={18} />}
        </div>
        <span className="font-semibold text-slate-700 flex-1">
          {block.type === 'text' && 'Текстовый блок'}
          {block.type === 'heading' && 'Заголовок'}
          {block.type === 'video' && 'Видео'}
          {block.type === 'audio' && 'Аудио'}
          {block.type === 'image' && 'Изображение'}
          {block.type === 'button' && 'Кнопка'}
          {block.type === 'columns' && 'Колонки'}
          {block.type === 'text-image' && 'Текст + Картинка'}
          {block.type === 'icon' && 'Иконка'}
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
        ) : block.type === 'heading' ? (
          <input
            type="text"
            value={block.content}
            onChange={(e) => updateBlock(block.id, e.target.value)}
            placeholder="Введите заголовок..."
            className={`w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all font-bold ${deviceType === 'mobile' ? 'text-xl' : deviceType === 'tablet' ? 'text-2xl' : 'text-2xl'}`}
          />
        ) : block.type === 'button' ? (
          <div className="space-y-3">
            <input
              type="text"
              value={block.content.split('|')[0] || ''}
              onChange={(e) => {
                const parts = block.content.split('|');
                updateBlock(block.id, `${e.target.value}|${parts[1] || ''}`);
              }}
              placeholder="Текст кнопки"
              className={`w-full bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all font-semibold ${deviceType === 'mobile' ? 'px-3 py-2 text-sm' : 'px-4 py-3'}`}
            />
            <input
              type="text"
              value={block.content.split('|')[1] || ''}
              onChange={(e) => {
                const parts = block.content.split('|');
                updateBlock(block.id, `${parts[0] || ''}|${e.target.value}`);
              }}
              placeholder="Ссылка кнопки"
              className={`w-full bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all ${deviceType === 'mobile' ? 'px-3 py-2 text-sm' : 'px-4 py-3'}`}
            />
            {block.content.split('|')[0] && (
              <button className={`bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg ${deviceType === 'mobile' ? 'px-4 py-2 text-sm' : 'px-6 py-3'}`}>
                {block.content.split('|')[0]}
              </button>
            )}
          </div>
        ) : block.type === 'columns' ? (
          <div className="space-y-3">
            <p className={`text-slate-600 mb-2 ${deviceType === 'mobile' ? 'text-xs' : 'text-sm'}`}>Разделяйте колонки символом "|"</p>
            <textarea
              value={block.content}
              onChange={(e) => updateBlock(block.id, e.target.value)}
              placeholder="Колонка 1 | Колонка 2 | Колонка 3"
              rows={4}
              className={`w-full bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all resize-none ${deviceType === 'mobile' ? 'px-3 py-2 text-sm' : 'px-4 py-3'}`}
            />
            {block.content && (
              <div className={`gap-4 mt-3 ${deviceType === 'mobile' ? 'grid grid-cols-1' : deviceType === 'tablet' ? 'grid grid-cols-2' : 'grid grid-cols-3'}`}>
                {block.content.split('|').map((col, idx) => (
                  <div key={idx} className={`bg-slate-100 rounded-lg ${deviceType === 'mobile' ? 'p-3' : 'p-4'}`}>
                    <p className={`text-slate-700 ${deviceType === 'mobile' ? 'text-xs' : 'text-sm'}`}>{col.trim()}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : block.type === 'text-image' ? (
          <div className="space-y-3">
            <textarea
              value={block.content.split('|')[0] || ''}
              onChange={(e) => {
                const parts = block.content.split('|');
                updateBlock(block.id, `${e.target.value}|${parts[1] || ''}`);
              }}
              placeholder="Введите текст..."
              rows={4}
              className={`w-full bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all resize-none ${deviceType === 'mobile' ? 'px-3 py-2 text-sm' : 'px-4 py-3'}`}
            />
            <input
              type="text"
              value={block.content.split('|')[1] || ''}
              onChange={(e) => {
                const parts = block.content.split('|');
                updateBlock(block.id, `${parts[0] || ''}|${e.target.value}`);
              }}
              placeholder="Ссылка на изображение"
              className={`w-full bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all ${deviceType === 'mobile' ? 'px-3 py-2 text-sm' : 'px-4 py-3'}`}
            />
            {block.content.split('|')[0] && block.content.split('|')[1] && (
              <div className={`gap-4 mt-3 p-4 bg-slate-100 rounded-lg ${deviceType === 'mobile' ? 'grid grid-cols-1' : 'grid md:grid-cols-2'}`}>
                <div className={`text-slate-700 ${deviceType === 'mobile' ? 'text-xs' : 'text-sm'}`}>{block.content.split('|')[0]}</div>
                <div className="aspect-video bg-slate-200 rounded-lg overflow-hidden">
                  <img
                    src={block.content.split('|')[1]}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}
          </div>
        ) : block.type === 'icon' ? (
          <div className="space-y-3">
            <input
              type="text"
              value={block.content}
              onChange={(e) => updateBlock(block.id, e.target.value)}
              placeholder="Введите эмодзи или текст иконки..."
              className={`w-full bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all text-center ${deviceType === 'mobile' ? 'px-3 py-2 text-2xl' : 'px-4 py-3 text-4xl'}`}
            />
            {block.content && (
              <div className={`flex items-center justify-center bg-slate-100 rounded-lg ${deviceType === 'mobile' ? 'p-4' : 'p-6'}`}>
                <span className={deviceType === 'mobile' ? 'text-4xl' : 'text-6xl'}>{block.content}</span>
              </div>
            )}
          </div>
        ) : block.type === 'video' ? (
          <div>
            <input
              type="text"
              value={block.content}
              onChange={(e) => updateBlock(block.id, e.target.value)}
              placeholder="Вставьте ссылку на видео (YouTube, Vimeo и т.д.)"
              className={`w-full bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all ${deviceType === 'mobile' ? 'px-3 py-2 text-sm' : 'px-4 py-3'}`}
            />
            {block.content && (
              <div className="mt-3 aspect-video bg-slate-100 rounded-lg flex items-center justify-center">
                <Video size={deviceType === 'mobile' ? 32 : 48} className="text-slate-400" />
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
              className={`w-full bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all ${deviceType === 'mobile' ? 'px-3 py-2 text-sm' : 'px-4 py-3'}`}
            />
            {block.content && (
              <div className={`mt-3 bg-slate-100 rounded-lg flex items-center justify-center ${deviceType === 'mobile' ? 'h-16' : 'h-20'}`}>
                <Headphones size={deviceType === 'mobile' ? 24 : 36} className="text-slate-400" />
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
              className={`w-full bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all ${deviceType === 'mobile' ? 'px-3 py-2 text-sm' : 'px-4 py-3'}`}
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