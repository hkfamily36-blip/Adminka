import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { motion } from 'motion/react';
import type { Identifier, XYCoord } from 'dnd-core';
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
  Smile,
  Settings,
  Upload
} from 'lucide-react';
import { ContentBlock } from './ContentBlockEditor';
import { TiptapEditor } from './TiptapEditor';
import type { ContainerSettings } from './ContentBlockEditor';

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
  onUpdateBlockStyle?: (id: string, style: ContentBlock['style']) => void;
  onOpenSettings?: (id: string) => void;
  containerSettings?: ContainerSettings;
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
  onUpdateBlockStyle,
  onOpenSettings,
  containerSettings,
}: DraggableBlockProps) {
  const ref = useRef<HTMLDivElement>(null);
  const dragHandleRef = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: ITEM_TYPE,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ITEM_TYPE,
    hover: (item: { index: number }, monitor) => {
      if (!ref.current) return;
      
      const dragIndex = item.index;
      const hoverIndex = index;

      // Не делаем ничего если элемент наведён на самого себя
      if (dragIndex === hoverIndex) return;

      // Определяем границы элемента
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      
      // Получаем вертикальную середину
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      
      // Определяем позицию курсора
      const clientOffset = monitor.getClientOffset();
      
      // Получаем позицию курсора относительно элемента
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Перетаскивание вниз
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Перетаскивание вверх
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Выполняем перемещение
      moveBlock(dragIndex, hoverIndex);
      
      // Обновляем индекс для следующего hover
      item.index = hoverIndex;
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  // Применяем drag только к drag handle, а drop к всему блоку
  drag(dragHandleRef);
  drop(ref);

  // Функция для загрузки изображения
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, updateContent: (content: string) => void) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Проверяем тип файла
    if (!file.type.startsWith('image/')) {
      alert('Пожалуйста, выберите изображение');
      return;
    }

    // Проверяем размер файла (максимум 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Размер изображения не должен превышать 5MB');
      return;
    }

    // Конвертируем в base64
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      updateContent(base64);
    };
    reader.readAsDataURL(file);
  };

  return (
    <motion.div
      ref={ref}
      style={{
        background: containerSettings?.background,
        borderColor: containerSettings?.borderColor,
        borderWidth: containerSettings?.borderWidth,
        borderRadius: containerSettings?.borderRadius,
        padding: containerSettings?.padding,
      }}
      className={`bg-white border-2 rounded-xl p-4 transition-all ${
        isDragging 
          ? 'opacity-30 border-[#583B8B] shadow-xl scale-105 rotate-2' 
          : isOver 
          ? 'border-[#583B8B] shadow-lg bg-[#D1C4E9]/20' 
          : 'border-slate-200 hover:border-[#D1C4E9]'
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={!isDragging ? { scale: 1.01 } : {}}
    >
      <div className="flex items-center gap-3 mb-3">
        <div 
          ref={dragHandleRef}
          className="cursor-move hover:bg-slate-100 p-1 rounded transition-colors" 
          title="Перетащите для изменения порядка"
        >
          <GripVertical size={20} className="text-slate-400 hover:text-[#583B8B] transition-colors" />
        </div>
        <div className={`p-2 rounded-lg ${
          block.type === 'text' ? 'bg-[#D1C4E9]/30 text-[#583B8B]' :
          block.type === 'heading' ? 'bg-blue-100 text-blue-600' :
          block.type === 'video' ? 'bg-[#FDE4FF] text-[#8C2F5E]' :
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
          {(block.type === 'text' || block.type === 'heading' || block.type === 'button' || block.type === 'image') && (
            <button
              type="button"
              onClick={() => onOpenSettings?.(block.id)}
              className="p-1.5 hover:bg-slate-100 rounded transition-colors"
              title="Настройки блока"
            >
              <Settings size={18} className="text-slate-600" />
            </button>
          )}
        </div>
      </div>

      {/* Контент блока */}
      <div className="ml-9">
        {block.type === 'text' ? (
          <div className="tiptap-editor-wrapper">
            <TiptapEditor
              key={`tiptap-${block.id}`}
              editorId={block.id}
              content={block.content}
              onChange={(content) => updateBlock(block.id, content)}
              placeholder="Начните печатать..."
              style={block.style}
            />
          </div>
        ) : block.type === 'heading' ? (
          <input
            type="text"
            value={block.content}
            onChange={(e) => updateBlock(block.id, e.target.value)}
            placeholder="Введите заголовок..."
            style={{
              color: block.style?.color,
              fontFamily: block.style?.fontFamily !== 'inherit' ? block.style?.fontFamily : undefined,
              fontWeight: block.style?.fontWeight,
              fontSize: block.style?.fontSize,
              lineHeight: block.style?.lineHeight,
              textAlign: block.style?.textAlign,
            }}
            className={`w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#583B8B] focus:border-transparent transition-all font-bold ${deviceType === 'mobile' ? 'text-xl' : deviceType === 'tablet' ? 'text-2xl' : 'text-2xl'}`}
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
              className={`w-full bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#583B8B] focus:border-transparent transition-all font-semibold ${deviceType === 'mobile' ? 'px-3 py-2 text-sm' : 'px-4 py-3'}`}
            />
            <input
              type="text"
              value={block.content.split('|')[1] || ''}
              onChange={(e) => {
                const parts = block.content.split('|');
                updateBlock(block.id, `${parts[0] || ''}|${e.target.value}`);
              }}
              placeholder="Ссылка кнопки"
              className={`w-full bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#583B8B] focus:border-transparent transition-all ${deviceType === 'mobile' ? 'px-3 py-2 text-sm' : 'px-4 py-3'}`}
            />
            {block.content.split('|')[0] && (
              <div
                style={{
                  textAlign: block.style?.textAlign || 'left',
                }}
              >
                <button
                  style={{
                    color: block.style?.color || '#ffffff',
                    backgroundColor: block.style?.backgroundColor || undefined,
                    fontFamily: block.style?.fontFamily !== 'inherit' ? block.style?.fontFamily : undefined,
                    fontWeight: block.style?.fontWeight || '600',
                    fontSize: block.style?.fontSize,
                    lineHeight: block.style?.lineHeight,
                    borderRadius: block.style?.borderRadius,
                    padding: block.style?.padding,
                  }}
                  className={`${!block.style?.backgroundColor ? 'bg-gradient-to-r from-[#2E1065] to-[#8C2F5E]' : ''} text-white font-semibold shadow-lg ${deviceType === 'mobile' && !block.style?.padding ? 'px-4 py-2 text-sm' : !block.style?.padding ? 'px-6 py-3' : ''} ${!block.style?.borderRadius ? 'rounded-xl' : ''}`}
                >
                  {block.content.split('|')[0]}
                </button>
              </div>
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
              className={`w-full bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#583B8B] focus:border-transparent transition-all resize-none ${deviceType === 'mobile' ? 'px-3 py-2 text-sm' : 'px-4 py-3'}`}
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
              className={`w-full bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#583B8B] focus:border-transparent transition-all resize-none ${deviceType === 'mobile' ? 'px-3 py-2 text-sm' : 'px-4 py-3'}`}
            />
            <input
              type="text"
              value={block.content.split('|')[1] || ''}
              onChange={(e) => {
                const parts = block.content.split('|');
                updateBlock(block.id, `${parts[0] || ''}|${e.target.value}`);
              }}
              placeholder="Ссылка на изображение"
              className={`w-full bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#583B8B] focus:border-transparent transition-all ${deviceType === 'mobile' ? 'px-3 py-2 text-sm' : 'px-4 py-3'}`}
            />
            <div className="flex items-center gap-3">
              <span className="text-slate-500 text-sm">или</span>
              <label className="flex-1">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, (imageContent) => {
                    const parts = block.content.split('|');
                    updateBlock(block.id, `${parts[0] || ''}|${imageContent}`);
                  })}
                  className="hidden"
                />
                <div className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl cursor-pointer hover:from-red-600 hover:to-pink-600 transition-all shadow-md hover:shadow-lg">
                  <Upload size={20} />
                  <span className="font-semibold">Загрузить изображение</span>
                </div>
              </label>
            </div>
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
              className={`w-full bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#583B8B] focus:border-transparent transition-all text-center ${deviceType === 'mobile' ? 'px-3 py-2 text-2xl' : 'px-4 py-3 text-4xl'}`}
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
              className={`w-full bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#583B8B] focus:border-transparent transition-all ${deviceType === 'mobile' ? 'px-3 py-2 text-sm' : 'px-4 py-3'}`}
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
              className={`w-full bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#583B8B] focus:border-transparent transition-all ${deviceType === 'mobile' ? 'px-3 py-2 text-sm' : 'px-4 py-3'}`}
            />
            {block.content && (
              <div className={`mt-3 bg-slate-100 rounded-lg flex items-center justify-center ${deviceType === 'mobile' ? 'h-16' : 'h-20'}`}>
                <Headphones size={deviceType === 'mobile' ? 24 : 36} className="text-slate-400" />
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            <input
              type="text"
              value={block.content}
              onChange={(e) => updateBlock(block.id, e.target.value)}
              placeholder="Вставьте ссылку на изображение"
              className={`w-full bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#583B8B] focus:border-transparent transition-all ${deviceType === 'mobile' ? 'px-3 py-2 text-sm' : 'px-4 py-3'}`}
            />
            <div className="flex items-center gap-3">
              <span className="text-slate-500 text-sm">или</span>
              <label className="flex-1">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, (content) => updateBlock(block.id, content))}
                  className="hidden"
                />
                <div className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl cursor-pointer hover:from-amber-600 hover:to-orange-600 transition-all shadow-md hover:shadow-lg">
                  <Upload size={20} />
                  <span className="font-semibold">Загрузить изображение</span>
                </div>
              </label>
            </div>
            {block.content && (
              <div 
                className="mt-3 bg-slate-100 rounded-lg overflow-hidden"
                style={{
                  display: 'flex',
                  justifyContent: 
                    block.style?.imageAlign === 'left' ? 'flex-start' :
                    block.style?.imageAlign === 'right' ? 'flex-end' :
                    'center',
                }}
              >
                <div
                  style={{
                    width: block.style?.width || '100%',
                    height: block.style?.height || 'auto',
                    minHeight: block.style?.height === 'auto' ? '200px' : undefined,
                    borderRadius: block.style?.borderRadius || '16px',
                    boxShadow: block.style?.boxShadow || '0 4px 6px rgba(0,0,0,0.1)',
                    overflow: 'hidden',
                  }}
                >
                  <img 
                    src={block.content} 
                    alt="Preview" 
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: (block.style?.objectFit as any) || 'cover',
                    }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}