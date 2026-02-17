import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Underline } from '@tiptap/extension-underline';
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
import { useState, useCallback } from 'react';

interface TiptapEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

export function TiptapEditor({ content, onChange, placeholder = 'Начните печатать...' }: TiptapEditorProps) {
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [showImageInput, setShowImageInput] = useState(false);
  const [showYoutubeInput, setShowYoutubeInput] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Highlight.configure({
        multicolor: true,
      }),
      Link.configure({
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
  });

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
      <div className="bg-gradient-to-r from-violet-50/50 to-purple-50/30 border-b border-slate-200 p-2">
        <div className="flex flex-wrap gap-1">
          {/* Text Formatting */}
          <div className="flex gap-0.5 border-r border-slate-300 pr-2">
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={`p-2 rounded hover:bg-white transition-colors ${
                editor.isActive('bold') ? 'bg-violet-600 text-white' : 'text-slate-700'
              }`}
              title="Жирный"
            >
              <Bold size={18} />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={`p-2 rounded hover:bg-white transition-colors ${
                editor.isActive('italic') ? 'bg-violet-600 text-white' : 'text-slate-700'
              }`}
              title="Курсив"
            >
              <Italic size={18} />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              className={`p-2 rounded hover:bg-white transition-colors ${
                editor.isActive('underline') ? 'bg-violet-600 text-white' : 'text-slate-700'
              }`}
              title="Подчеркнутый"
            >
              <UnderlineIcon size={18} />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleStrike().run()}
              className={`p-2 rounded hover:bg-white transition-colors ${
                editor.isActive('strike') ? 'bg-violet-600 text-white' : 'text-slate-700'
              }`}
              title="Зачеркнутый"
            >
              <Strikethrough size={18} />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleHighlight({ color: '#fbbf24' }).run()}
              className={`p-2 rounded hover:bg-white transition-colors ${
                editor.isActive('highlight') ? 'bg-amber-600 text-white' : 'text-slate-700'
              }`}
              title="Выделить текст"
            >
              <Highlighter size={18} />
            </button>
          </div>

          {/* Headings */}
          <div className="flex gap-0.5 border-r border-slate-300 pr-2">
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
              className={`p-2 rounded hover:bg-white transition-colors ${
                editor.isActive('heading', { level: 1 }) ? 'bg-violet-600 text-white' : 'text-slate-700'
              }`}
              title="Заголовок 1"
            >
              <Heading1 size={18} />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              className={`p-2 rounded hover:bg-white transition-colors ${
                editor.isActive('heading', { level: 2 }) ? 'bg-violet-600 text-white' : 'text-slate-700'
              }`}
              title="Заголовок 2"
            >
              <Heading2 size={18} />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
              className={`p-2 rounded hover:bg-white transition-colors ${
                editor.isActive('heading', { level: 3 }) ? 'bg-violet-600 text-white' : 'text-slate-700'
              }`}
              title="Заголовок 3"
            >
              <Heading3 size={18} />
            </button>
          </div>

          {/* Lists */}
          <div className="flex gap-0.5 border-r border-slate-300 pr-2">
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={`p-2 rounded hover:bg-white transition-colors ${
                editor.isActive('bulletList') ? 'bg-violet-600 text-white' : 'text-slate-700'
              }`}
              title="Маркированный список"
            >
              <List size={18} />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={`p-2 rounded hover:bg-white transition-colors ${
                editor.isActive('orderedList') ? 'bg-violet-600 text-white' : 'text-slate-700'
              }`}
              title="Нумерованный список"
            >
              <ListOrdered size={18} />
            </button>
          </div>

          {/* Alignment */}
          <div className="flex gap-0.5 border-r border-slate-300 pr-2">
            <button
              type="button"
              onClick={() => editor.chain().focus().setTextAlign('left').run()}
              className={`p-2 rounded hover:bg-white transition-colors ${
                editor.isActive({ textAlign: 'left' }) ? 'bg-violet-600 text-white' : 'text-slate-700'
              }`}
              title="По левому краю"
            >
              <AlignLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().setTextAlign('center').run()}
              className={`p-2 rounded hover:bg-white transition-colors ${
                editor.isActive({ textAlign: 'center' }) ? 'bg-violet-600 text-white' : 'text-slate-700'
              }`}
              title="По центру"
            >
              <AlignCenter size={18} />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().setTextAlign('right').run()}
              className={`p-2 rounded hover:bg-white transition-colors ${
                editor.isActive({ textAlign: 'right' }) ? 'bg-violet-600 text-white' : 'text-slate-700'
              }`}
              title="По правому краю"
            >
              <AlignRight size={18} />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().setTextAlign('justify').run()}
              className={`p-2 rounded hover:bg-white transition-colors ${
                editor.isActive({ textAlign: 'justify' }) ? 'bg-violet-600 text-white' : 'text-slate-700'
              }`}
              title="По ширине"
            >
              <AlignJustify size={18} />
            </button>
          </div>

          {/* Other */}
          <div className="flex gap-0.5 border-r border-slate-300 pr-2">
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              className={`p-2 rounded hover:bg-white transition-colors ${
                editor.isActive('blockquote') ? 'bg-violet-600 text-white' : 'text-slate-700'
              }`}
              title="Цитата"
            >
              <Quote size={18} />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              className={`p-2 rounded hover:bg-white transition-colors ${
                editor.isActive('codeBlock') ? 'bg-violet-600 text-white' : 'text-slate-700'
              }`}
              title="Блок кода"
            >
              <Code size={18} />
            </button>
          </div>

          {/* Insert Media */}
          <div className="flex gap-0.5 border-r border-slate-300 pr-2">
            <button
              type="button"
              onClick={() => setShowLinkInput(!showLinkInput)}
              className={`p-2 rounded hover:bg-white transition-colors ${
                editor.isActive('link') ? 'bg-violet-600 text-white' : 'text-slate-700'
              }`}
              title="Вставить ссылку"
            >
              <LinkIcon size={18} />
            </button>
            <button
              type="button"
              onClick={() => setShowImageInput(!showImageInput)}
              className="p-2 rounded hover:bg-white transition-colors text-slate-700"
              title="Вставить изображение"
            >
              <ImageIcon size={18} />
            </button>
            <button
              type="button"
              onClick={() => setShowYoutubeInput(!showYoutubeInput)}
              className="p-2 rounded hover:bg-white transition-colors text-slate-700"
              title="Вставить YouTube видео"
            >
              <Video size={18} />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
              className="p-2 rounded hover:bg-white transition-colors text-slate-700"
              title="Вставить таблицу"
            >
              <TableIcon size={18} />
            </button>
          </div>

          {/* Text Color */}
          <div className="flex gap-0.5 border-r border-slate-300 pr-2">
            <div className="flex gap-1 items-center">
              <Palette size={16} className="text-slate-500" />
              <button
                type="button"
                onClick={() => editor.chain().focus().setColor('#ef4444').run()}
                className="w-6 h-6 bg-red-500 rounded hover:ring-2 hover:ring-red-300"
                title="Красный"
              />
              <button
                type="button"
                onClick={() => editor.chain().focus().setColor('#3b82f6').run()}
                className="w-6 h-6 bg-blue-500 rounded hover:ring-2 hover:ring-blue-300"
                title="Синий"
              />
              <button
                type="button"
                onClick={() => editor.chain().focus().setColor('#22c55e').run()}
                className="w-6 h-6 bg-green-500 rounded hover:ring-2 hover:ring-green-300"
                title="Зеленый"
              />
              <button
                type="button"
                onClick={() => editor.chain().focus().setColor('#8b5cf6').run()}
                className="w-6 h-6 bg-violet-500 rounded hover:ring-2 hover:ring-violet-300"
                title="Фиолетовый"
              />
              <button
                type="button"
                onClick={() => editor.chain().focus().unsetColor().run()}
                className="w-6 h-6 bg-slate-200 rounded hover:ring-2 hover:ring-slate-300 text-xs flex items-center justify-center"
                title="По умолчанию"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Undo/Redo */}
          <div className="flex gap-0.5">
            <button
              type="button"
              onClick={() => editor.chain().focus().undo().run()}
              disabled={!editor.can().undo()}
              className="p-2 rounded hover:bg-white transition-colors text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed"
              title="Отменить"
            >
              <Undo size={18} />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().redo().run()}
              disabled={!editor.can().redo()}
              className="p-2 rounded hover:bg-white transition-colors text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed"
              title="Вернуть"
            >
              <Redo size={18} />
            </button>
          </div>
        </div>

        {/* Link Input */}
        {showLinkInput && (
          <div className="mt-2 flex gap-2 p-2 bg-white rounded-lg border border-violet-200">
            <input
              type="url"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              placeholder="https://example.com"
              className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  setLink();
                }
              }}
            />
            <button
              type="button"
              onClick={setLink}
              className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
            >
              Вставить
            </button>
            <button
              type="button"
              onClick={() => {
                editor.chain().focus().unsetLink().run();
                setShowLinkInput(false);
              }}
              className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors"
            >
              Удалить
            </button>
          </div>
        )}

        {/* Image Input */}
        {showImageInput && (
          <div className="mt-2 flex gap-2 p-2 bg-white rounded-lg border border-violet-200">
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addImage();
                }
              }}
            />
            <button
              type="button"
              onClick={addImage}
              className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
            >
              Вставить
            </button>
            <button
              type="button"
              onClick={() => setShowImageInput(false)}
              className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors"
            >
              Отмена
            </button>
          </div>
        )}

        {/* YouTube Input */}
        {showYoutubeInput && (
          <div className="mt-2 flex gap-2 p-2 bg-white rounded-lg border border-violet-200">
            <input
              type="url"
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
              className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addYoutube();
                }
              }}
            />
            <button
              type="button"
              onClick={addYoutube}
              className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
            >
              Вставить
            </button>
            <button
              type="button"
              onClick={() => setShowYoutubeInput(false)}
              className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors"
            >
              Отмена
            </button>
          </div>
        )}
      </div>

      {/* Editor Content */}
      <EditorContent editor={editor} className="prose-editor" />
    </div>
  );
}