import { useEditor, EditorContent } from '@tiptap/react';
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code,
  Undo,
  Redo,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Link as LinkIcon,
  Image as ImageIcon,
  Video,
  Highlighter,
  Table as TableIcon,
  Palette,
} from 'lucide-react';
import { useState, useCallback, useEffect } from 'react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import { TextAlign } from '@tiptap/extension-text-align';
import { Highlight } from '@tiptap/extension-highlight';
import { Link } from '@tiptap/extension-link';
import { Image } from '@tiptap/extension-image';
import { Youtube } from '@tiptap/extension-youtube';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableCell } from '@tiptap/extension-table-cell';
import { TableHeader } from '@tiptap/extension-table-header';

interface TiptapEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
  editorId?: string; // Уникальный ID для этого экземпляра редактора
  style?: {
    color?: string;
    fontFamily?: string;
    fontWeight?: string;
    fontSize?: string;
    lineHeight?: string;
    textAlign?: 'left' | 'center' | 'right' | 'justify';
  };
}

export function TiptapEditor({ content, onChange, placeholder = 'Начните печатать...', editorId, style }: TiptapEditorProps) {
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [showImageInput, setShowImageInput] = useState(false);
  const [showYoutubeInput, setShowYoutubeInput] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showHighlightPicker, setShowHighlightPicker] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');

  // Генерируем уникальный ID для этого редактора, если не передан
  const uniqueId = editorId || `editor-${Math.random().toString(36).substr(2, 9)}`;

  const editor = useEditor(
    {
      extensions: [
        StarterKit,
        Underline.extend({
          name: `underline-${uniqueId}`,
        }),
        TextAlign.configure({
          types: ['heading', 'paragraph'],
        }),
        Highlight.configure({
          multicolor: true,
        }),
        Link.extend({
          name: `link-${uniqueId}`,
        }).configure({
          openOnClick: false,
          autolink: true,
          HTMLAttributes: {
            class: 'text-violet-600 underline hover:text-violet-800',
          },
        }),
        Image.configure({
          HTMLAttributes: {
            class: 'max-w-full h-auto rounded-lg',
          },
        }),
        Youtube.configure({
          width: 640,
          height: 360,
          HTMLAttributes: {
            class: 'rounded-lg',
          },
        }),
        TextStyle,
        Color,
        Table.configure({
          resizable: true,
          HTMLAttributes: {
            class: 'border-collapse border border-slate-300',
          },
        }),
        TableRow,
        TableCell.configure({
          HTMLAttributes: {
            class: 'border border-slate-300 p-2',
          },
        }),
        TableHeader.configure({
          HTMLAttributes: {
            class: 'border border-slate-300 p-2 bg-slate-100 font-bold',
          },
        }),
      ],
      content,
      onUpdate: ({ editor }) => {
        onChange(editor.getHTML());
      },
      editorProps: {
        attributes: {
          class: 'prose prose-violet max-w-none focus:outline-none min-h-[200px] px-4 py-3',
        },
      },
    },
    [] // Создаем редактор только один раз
  );

  // Обновляем контент редактора когда prop content меняется извне
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  // Применяем стили из настроек напрямую к DOM-элементу ProseMirror
  useEffect(() => {
    if (!editor) return;
    const dom = editor.view.dom as HTMLElement;
    dom.style.color      = style?.color      || '';
    dom.style.fontFamily = (style?.fontFamily && style.fontFamily !== 'inherit') ? style.fontFamily : '';
    dom.style.fontWeight = style?.fontWeight || '';
    dom.style.fontSize   = style?.fontSize   || '';
    dom.style.lineHeight = style?.lineHeight || '';
    dom.style.textAlign  = style?.textAlign  || '';
  }, [editor, style]);

  // Уничтожаем редактор при размонтировании компонента
  useEffect(() => {
    return () => {
      editor?.destroy();
    };
  }, [editor]);

  const setLink = useCallback(() => {
    if (linkUrl === '') {
      editor?.chain().focus().extendMarkRange('link').unsetLink().run();
      setShowLinkInput(false);
      return;
    }

    editor?.chain().focus().extendMarkRange('link').setLink({ href: linkUrl }).run();
    setLinkUrl('');
    setShowLinkInput(false);
  }, [editor, linkUrl]);

  const addImage = useCallback(() => {
    if (imageUrl) {
      editor?.chain().focus().setImage({ src: imageUrl }).run();
      setImageUrl('');
      setShowImageInput(false);
    }
  }, [editor, imageUrl]);

  const addYoutube = useCallback(() => {
    if (youtubeUrl) {
      editor?.chain().focus().setYoutubeVideo({ src: youtubeUrl }).run();
      setYoutubeUrl('');
      setShowYoutubeInput(false);
    }
  }, [editor, youtubeUrl]);

  if (!editor) {
    return (
      <div className="bg-slate-50 rounded-lg p-8 text-center text-slate-400">
        Загрузка редактора...
      </div>
    );
  }

  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">
      {/* Toolbar */}
      <div className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200 p-2 flex flex-wrap gap-1 items-center sticky top-0 z-10">
        {/* Text Formatting */}
        <div className="flex gap-1 border-r border-slate-300 pr-2">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`p-2 rounded hover:bg-white transition-colors ${
              editor.isActive('bold') ? 'bg-violet-100 text-violet-700' : 'text-slate-600'
            }`}
            title="Жирный (Ctrl+B)"
          >
            <Bold size={18} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`p-2 rounded hover:bg-white transition-colors ${
              editor.isActive('italic') ? 'bg-violet-100 text-violet-700' : 'text-slate-600'
            }`}
            title="Курсив (Ctrl+I)"
          >
            <Italic size={18} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`p-2 rounded hover:bg-white transition-colors ${
              editor.isActive('underline') ? 'bg-violet-100 text-violet-700' : 'text-slate-600'
            }`}
            title="Подчеркнутый (Ctrl+U)"
          >
            <UnderlineIcon size={18} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={`p-2 rounded hover:bg-white transition-colors ${
              editor.isActive('strike') ? 'bg-violet-100 text-violet-700' : 'text-slate-600'
            }`}
            title="Зачеркнутый"
          >
            <Strikethrough size={18} />
          </button>
        </div>

        {/* Headings */}
        <div className="flex gap-1 border-r border-slate-300 pr-2">
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={`p-2 rounded hover:bg-white transition-colors ${
              editor.isActive('heading', { level: 1 }) ? 'bg-violet-100 text-violet-700' : 'text-slate-600'
            }`}
            title="Заголовок 1"
          >
            <Heading1 size={18} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={`p-2 rounded hover:bg-white transition-colors ${
              editor.isActive('heading', { level: 2 }) ? 'bg-violet-100 text-violet-700' : 'text-slate-600'
            }`}
            title="Заголовок 2"
          >
            <Heading2 size={18} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={`p-2 rounded hover:bg-white transition-colors ${
              editor.isActive('heading', { level: 3 }) ? 'bg-violet-100 text-violet-700' : 'text-slate-600'
            }`}
            title="Заголовок 3"
          >
            <Heading3 size={18} />
          </button>
        </div>

        {/* Alignment */}
        <div className="flex gap-1 border-r border-slate-300 pr-2">
          <button
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            className={`p-2 rounded hover:bg-white transition-colors ${
              editor.isActive({ textAlign: 'left' }) ? 'bg-violet-100 text-violet-700' : 'text-slate-600'
            }`}
            title="По левому краю"
          >
            <AlignLeft size={18} />
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            className={`p-2 rounded hover:bg-white transition-colors ${
              editor.isActive({ textAlign: 'center' }) ? 'bg-violet-100 text-violet-700' : 'text-slate-600'
            }`}
            title="По центру"
          >
            <AlignCenter size={18} />
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            className={`p-2 rounded hover:bg-white transition-colors ${
              editor.isActive({ textAlign: 'right' }) ? 'bg-violet-100 text-violet-700' : 'text-slate-600'
            }`}
            title="По правому краю"
          >
            <AlignRight size={18} />
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('justify').run()}
            className={`p-2 rounded hover:bg-white transition-colors ${
              editor.isActive({ textAlign: 'justify' }) ? 'bg-violet-100 text-violet-700' : 'text-slate-600'
            }`}
            title="По ширине"
          >
            <AlignJustify size={18} />
          </button>
        </div>

        {/* Lists */}
        <div className="flex gap-1 border-r border-slate-300 pr-2">
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`p-2 rounded hover:bg-white transition-colors ${
              editor.isActive('bulletList') ? 'bg-violet-100 text-violet-700' : 'text-slate-600'
            }`}
            title="Маркированный список"
          >
            <List size={18} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`p-2 rounded hover:bg-white transition-colors ${
              editor.isActive('orderedList') ? 'bg-violet-100 text-violet-700' : 'text-slate-600'
            }`}
            title="Нумерованный список"
          >
            <ListOrdered size={18} />
          </button>
        </div>

        {/* Color & Highlight */}
        <div className="flex gap-1 border-r border-slate-300 pr-2 relative">
          <div className="relative">
            <button
              onClick={() => setShowColorPicker(!showColorPicker)}
              className={`p-2 rounded hover:bg-white transition-colors ${
                showColorPicker ? 'bg-violet-100 text-violet-700' : 'text-slate-600'
              }`}
              title="Цвет текста"
            >
              <Palette size={18} />
            </button>
            {showColorPicker && (
              <div className="absolute top-full left-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg p-2 z-20">
                <div className="grid grid-cols-5 gap-1">
                  {['#000000', '#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#583B8B', '#8C2F5E', '#6B7280', '#FFFFFF'].map(color => (
                    <button
                      key={color}
                      onClick={() => {
                        editor.chain().focus().setColor(color).run();
                        setShowColorPicker(false);
                      }}
                      className="w-8 h-8 rounded border-2 border-slate-300 hover:border-violet-500 transition-colors"
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
                <button
                  onClick={() => {
                    editor.chain().focus().unsetColor().run();
                    setShowColorPicker(false);
                  }}
                  className="mt-2 w-full text-xs text-slate-600 hover:text-violet-600 py-1"
                >
                  Сбросить цвет
                </button>
              </div>
            )}
          </div>
          <div className="relative">
            <button
              onClick={() => setShowHighlightPicker(!showHighlightPicker)}
              className={`p-2 rounded hover:bg-white transition-colors ${
                showHighlightPicker ? 'bg-violet-100 text-violet-700' : 'text-slate-600'
              }`}
              title="Выделение цветом"
            >
              <Highlighter size={18} />
            </button>
            {showHighlightPicker && (
              <div className="absolute top-full left-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg p-2 z-20">
                <div className="grid grid-cols-4 gap-1">
                  {['#FEF3C7', '#DBEAFE', '#E0E7FF', '#FCE7F3', '#D1FAE5', '#FED7AA'].map(color => (
                    <button
                      key={color}
                      onClick={() => {
                        editor.chain().focus().toggleHighlight({ color }).run();
                        setShowHighlightPicker(false);
                      }}
                      className="w-8 h-8 rounded border-2 border-slate-300 hover:border-violet-500 transition-colors"
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
                <button
                  onClick={() => {
                    editor.chain().focus().unsetHighlight().run();
                    setShowHighlightPicker(false);
                  }}
                  className="mt-2 w-full text-xs text-slate-600 hover:text-violet-600 py-1"
                >
                  Убрать выделение
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Other Formatting */}
        <div className="flex gap-1 border-r border-slate-300 pr-2">
          <button
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={`p-2 rounded hover:bg-white transition-colors ${
              editor.isActive('blockquote') ? 'bg-violet-100 text-violet-700' : 'text-slate-600'
            }`}
            title="Цитата"
          >
            <Quote size={18} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleCode().run()}
            className={`p-2 rounded hover:bg-white transition-colors ${
              editor.isActive('code') ? 'bg-violet-100 text-violet-700' : 'text-slate-600'
            }`}
            title="Код"
          >
            <Code size={18} />
          </button>
        </div>

        {/* Link */}
        <div className="flex gap-1 border-r border-slate-300 pr-2 relative">
          <button
            onClick={() => setShowLinkInput(!showLinkInput)}
            className={`p-2 rounded hover:bg-white transition-colors ${
              editor.isActive('link') || showLinkInput ? 'bg-violet-100 text-violet-700' : 'text-slate-600'
            }`}
            title="Ссылка"
          >
            <LinkIcon size={18} />
          </button>
          {showLinkInput && (
            <div className="absolute top-full left-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg p-3 z-20 w-64">
              <input
                type="url"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                placeholder="https://example.com"
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 text-sm"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setLink();
                  }
                }}
              />
              <div className="flex gap-2 mt-2">
                <button
                  onClick={setLink}
                  className="flex-1 px-3 py-1.5 bg-violet-500 text-white rounded-lg hover:bg-violet-600 text-sm"
                >
                  Вставить
                </button>
                <button
                  onClick={() => {
                    editor.chain().focus().unsetLink().run();
                    setShowLinkInput(false);
                  }}
                  className="px-3 py-1.5 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 text-sm"
                >
                  Удалить
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Undo/Redo */}
        <div className="flex gap-1">
          <button
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            className="p-2 rounded hover:bg-white transition-colors text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed"
            title="Отменить (Ctrl+Z)"
          >
            <Undo size={18} />
          </button>
          <button
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            className="p-2 rounded hover:bg-white transition-colors text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed"
            title="Повторить (Ctrl+Y)"
          >
            <Redo size={18} />
          </button>
        </div>
      </div>

      {/* Editor Content */}
      <EditorContent editor={editor} className="prose-editor" />
    </div>
  );
}