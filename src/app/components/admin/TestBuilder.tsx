import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { 
  Plus, 
  Trash2,
  GripVertical,
  Copy,
  ChevronDown,
  ChevronUp,
  Circle,
  Square,
  AlignLeft,
  List,
  ToggleLeft,
  Calendar,
  Clock,
  Star
} from 'lucide-react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export type QuestionType = 
  | 'single-choice' 
  | 'multiple-choice' 
  | 'short-answer' 
  | 'long-answer' 
  | 'scale' 
  | 'dropdown'
  | 'date'
  | 'time';

export interface QuestionOption {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  type: QuestionType;
  title: string;
  description?: string;
  required: boolean;
  options?: QuestionOption[];
  scaleMin?: number;
  scaleMax?: number;
  scaleMinLabel?: string;
  scaleMaxLabel?: string;
  order: number;
}

interface TestBuilderProps {
  questions: Question[];
  onChange: (questions: Question[]) => void;
}

const ITEM_TYPE = 'TEST_QUESTION';

function DraggableQuestion({
  question,
  index,
  moveQuestion,
  updateQuestion,
  deleteQuestion,
  copyQuestion,
  isFirst,
  isLast,
}: {
  question: Question;
  index: number;
  moveQuestion: (dragIndex: number, hoverIndex: number) => void;
  updateQuestion: (id: string, updates: Partial<Question>) => void;
  deleteQuestion: (id: string) => void;
  copyQuestion: (id: string) => void;
  isFirst: boolean;
  isLast: boolean;
}) {
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
      moveQuestion(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  drag(drop(ref));

  const addOption = () => {
    const newOption: QuestionOption = {
      id: `option-${Date.now()}`,
      text: '',
    };
    updateQuestion(question.id, {
      options: [...(question.options || []), newOption],
    });
  };

  const updateOption = (optionId: string, text: string) => {
    updateQuestion(question.id, {
      options: question.options?.map(opt => 
        opt.id === optionId ? { ...opt, text } : opt
      ),
    });
  };

  const deleteOption = (optionId: string) => {
    updateQuestion(question.id, {
      options: question.options?.filter(opt => opt.id !== optionId),
    });
  };

  return (
    <motion.div
      ref={ref}
      className={`bg-white border-2 rounded-xl p-6 transition-all ${
        isDragging 
          ? 'opacity-30 border-violet-400 shadow-xl' 
          : isOver 
          ? 'border-violet-500 shadow-lg bg-violet-50' 
          : 'border-slate-200 hover:border-violet-300'
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Заголовок вопроса */}
      <div className="flex items-start gap-3 mb-4">
        <div className="cursor-move mt-2" title="Перетащите для изменения порядка">
          <GripVertical size={20} className="text-slate-400" />
        </div>
        <div className="flex-1 space-y-3">
          <input
            type="text"
            value={question.title}
            onChange={(e) => updateQuestion(question.id, { title: e.target.value })}
            placeholder="Вопрос"
            className="w-full px-4 py-3 bg-slate-50 border-b-2 border-slate-200 focus:border-violet-500 focus:outline-none text-lg font-medium transition-colors"
          />
          <input
            type="text"
            value={question.description || ''}
            onChange={(e) => updateQuestion(question.id, { description: e.target.value })}
            placeholder="Описание (необязательно)"
            className="w-full px-4 py-2 bg-slate-50 border-b border-slate-200 focus:border-violet-500 focus:outline-none text-sm text-slate-600 transition-colors"
          />
        </div>
        <select
          value={question.type}
          onChange={(e) => updateQuestion(question.id, { type: e.target.value as QuestionType })}
          className="px-3 py-2 bg-slate-100 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 text-sm"
        >
          <option value="single-choice">Один вариант</option>
          <option value="multiple-choice">Несколько вариантов</option>
          <option value="short-answer">Короткий ответ</option>
          <option value="long-answer">Развернутый ответ</option>
          <option value="dropdown">Раскрывающийся список</option>
          <option value="scale">Шкала</option>
          <option value="date">Дата</option>
          <option value="time">Время</option>
        </select>
      </div>

      {/* Контент вопроса в зависимости от типа */}
      <div className="ml-9 mb-4">
        {(question.type === 'single-choice' || question.type === 'multiple-choice') && (
          <div className="space-y-2">
            {question.options?.map((option, idx) => (
              <div key={option.id} className="flex items-center gap-3">
                {question.type === 'single-choice' ? (
                  <Circle size={20} className="text-slate-400" />
                ) : (
                  <Square size={20} className="text-slate-400" />
                )}
                <input
                  type="text"
                  value={option.text}
                  onChange={(e) => updateOption(option.id, e.target.value)}
                  placeholder={`Вариант ${idx + 1}`}
                  className="flex-1 px-3 py-2 border-b border-slate-200 focus:border-violet-500 focus:outline-none transition-colors"
                />
                {question.options && question.options.length > 1 && (
                  <button
                    type="button"
                    onClick={() => deleteOption(option.id)}
                    className="p-1 hover:bg-red-50 rounded transition-colors"
                  >
                    <Trash2 size={16} className="text-red-500" />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addOption}
              className="flex items-center gap-2 px-3 py-2 text-violet-600 hover:bg-violet-50 rounded-lg transition-colors text-sm font-medium"
            >
              <Plus size={16} />
              Добавить вариант
            </button>
          </div>
        )}

        {question.type === 'dropdown' && (
          <div className="space-y-2">
            {question.options?.map((option, idx) => (
              <div key={option.id} className="flex items-center gap-3">
                <span className="text-slate-400 text-sm">{idx + 1}.</span>
                <input
                  type="text"
                  value={option.text}
                  onChange={(e) => updateOption(option.id, e.target.value)}
                  placeholder={`Вариант ${idx + 1}`}
                  className="flex-1 px-3 py-2 border-b border-slate-200 focus:border-violet-500 focus:outline-none transition-colors"
                />
                {question.options && question.options.length > 1 && (
                  <button
                    type="button"
                    onClick={() => deleteOption(option.id)}
                    className="p-1 hover:bg-red-50 rounded transition-colors"
                  >
                    <Trash2 size={16} className="text-red-500" />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addOption}
              className="flex items-center gap-2 px-3 py-2 text-violet-600 hover:bg-violet-50 rounded-lg transition-colors text-sm font-medium"
            >
              <Plus size={16} />
              Добавить вариант
            </button>
          </div>
        )}

        {question.type === 'short-answer' && (
          <input
            type="text"
            disabled
            placeholder="Короткий ответ пользователя"
            className="w-full px-3 py-2 border-b border-slate-200 bg-slate-50 text-slate-400"
          />
        )}

        {question.type === 'long-answer' && (
          <textarea
            disabled
            placeholder="Развернутый ответ пользователя"
            rows={3}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-slate-50 text-slate-400 resize-none"
          />
        )}

        {question.type === 'scale' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-600 mb-1">От</label>
                <input
                  type="number"
                  value={question.scaleMin || 1}
                  onChange={(e) => updateQuestion(question.id, { scaleMin: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-600 mb-1">До</label>
                <input
                  type="number"
                  value={question.scaleMax || 5}
                  onChange={(e) => updateQuestion(question.id, { scaleMax: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                value={question.scaleMinLabel || ''}
                onChange={(e) => updateQuestion(question.id, { scaleMinLabel: e.target.value })}
                placeholder="Название (мин)"
                className="px-3 py-2 border-b border-slate-200 focus:border-violet-500 focus:outline-none text-sm"
              />
              <input
                type="text"
                value={question.scaleMaxLabel || ''}
                onChange={(e) => updateQuestion(question.id, { scaleMaxLabel: e.target.value })}
                placeholder="Название (макс)"
                className="px-3 py-2 border-b border-slate-200 focus:border-violet-500 focus:outline-none text-sm"
              />
            </div>
            <div className="flex justify-between items-center text-sm text-slate-500">
              <span>{question.scaleMin || 1}</span>
              <div className="flex gap-2">
                {Array.from({ length: (question.scaleMax || 5) - (question.scaleMin || 1) + 1 }).map((_, i) => (
                  <div key={i} className="w-8 h-8 border-2 border-slate-300 rounded-full flex items-center justify-center">
                    {(question.scaleMin || 1) + i}
                  </div>
                ))}
              </div>
              <span>{question.scaleMax || 5}</span>
            </div>
          </div>
        )}

        {question.type === 'date' && (
          <input
            type="date"
            disabled
            className="px-3 py-2 border border-slate-200 rounded-lg bg-slate-50 text-slate-400"
          />
        )}

        {question.type === 'time' && (
          <input
            type="time"
            disabled
            className="px-3 py-2 border border-slate-200 rounded-lg bg-slate-50 text-slate-400"
          />
        )}
      </div>

      {/* Футер вопроса */}
      <div className="flex items-center justify-between ml-9 pt-4 border-t border-slate-100">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={question.required}
            onChange={(e) => updateQuestion(question.id, { required: e.target.checked })}
            className="w-4 h-4 text-violet-600 border-slate-300 rounded focus:ring-2 focus:ring-violet-500"
          />
          <span className="text-sm text-slate-600">Обязательный вопрос</span>
        </label>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => copyQuestion(question.id)}
            className="p-2 hover:bg-green-50 rounded-lg transition-colors"
            title="Копировать вопрос"
          >
            <Copy size={18} className="text-green-600" />
          </button>
          <button
            type="button"
            onClick={() => deleteQuestion(question.id)}
            className="p-2 hover:bg-red-50 rounded-lg transition-colors"
            title="Удалить вопрос"
          >
            <Trash2 size={18} className="text-red-600" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export function TestBuilder({ questions, onChange }: TestBuilderProps) {
  const [localQuestions, setLocalQuestions] = useState<Question[]>(questions);

  useEffect(() => {
    onChange(localQuestions);
  }, [localQuestions]);

  const addQuestion = (type: QuestionType) => {
    const newQuestion: Question = {
      id: `question-${Date.now()}`,
      type,
      title: '',
      required: false,
      order: localQuestions.length,
      options: (type === 'single-choice' || type === 'multiple-choice' || type === 'dropdown') 
        ? [{ id: `option-${Date.now()}`, text: '' }] 
        : undefined,
      scaleMin: type === 'scale' ? 1 : undefined,
      scaleMax: type === 'scale' ? 5 : undefined,
    };
    setLocalQuestions([...localQuestions, newQuestion]);
  };

  const updateQuestion = (id: string, updates: Partial<Question>) => {
    setLocalQuestions(localQuestions.map(q => 
      q.id === id ? { ...q, ...updates } : q
    ));
  };

  const deleteQuestion = (id: string) => {
    setLocalQuestions(localQuestions.filter(q => q.id !== id));
  };

  const copyQuestion = (id: string) => {
    const questionToCopy = localQuestions.find(q => q.id === id);
    if (!questionToCopy) return;

    const newQuestion: Question = {
      ...questionToCopy,
      id: `question-${Date.now()}`,
      order: localQuestions.length,
      options: questionToCopy.options?.map(opt => ({
        ...opt,
        id: `option-${Date.now()}-${Math.random()}`,
      })),
    };
    setLocalQuestions([...localQuestions, newQuestion]);
  };

  const moveQuestion = (dragIndex: number, hoverIndex: number) => {
    const newQuestions = [...localQuestions];
    const draggedQuestion = newQuestions[dragIndex];
    newQuestions.splice(dragIndex, 1);
    newQuestions.splice(hoverIndex, 0, draggedQuestion);
    
    newQuestions.forEach((q, idx) => {
      q.order = idx;
    });
    
    setLocalQuestions(newQuestions);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="space-y-4">
        {/* Кнопки добавления вопросов */}
        <div className="flex gap-2 flex-wrap items-center">
          <button
            type="button"
            onClick={() => addQuestion('single-choice')}
            className="flex items-center gap-2 px-4 py-2 bg-violet-100 hover:bg-violet-200 text-violet-700 rounded-lg transition-colors font-semibold text-sm"
          >
            <Circle size={16} />
            Один вариант
          </button>
          <button
            type="button"
            onClick={() => addQuestion('multiple-choice')}
            className="flex items-center gap-2 px-4 py-2 bg-fuchsia-100 hover:bg-fuchsia-200 text-fuchsia-700 rounded-lg transition-colors font-semibold text-sm"
          >
            <Square size={16} />
            Несколько вариантов
          </button>
          <button
            type="button"
            onClick={() => addQuestion('short-answer')}
            className="flex items-center gap-2 px-4 py-2 bg-cyan-100 hover:bg-cyan-200 text-cyan-700 rounded-lg transition-colors font-semibold text-sm"
          >
            <AlignLeft size={16} />
            Короткий ответ
          </button>
          <button
            type="button"
            onClick={() => addQuestion('dropdown')}
            className="flex items-center gap-2 px-4 py-2 bg-amber-100 hover:bg-amber-200 text-amber-700 rounded-lg transition-colors font-semibold text-sm"
          >
            <List size={16} />
            Список
          </button>
          <button
            type="button"
            onClick={() => addQuestion('scale')}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-700 rounded-lg transition-colors font-semibold text-sm"
          >
            <Star size={16} />
            Шкала
          </button>
          {localQuestions.length > 0 && (
            <div className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg font-semibold text-sm ml-auto">
              📝 Вопросов: {localQuestions.length}
            </div>
          )}
        </div>

        {/* Список вопросов */}
        <div className="space-y-4">
          {localQuestions.length === 0 ? (
            <div className="text-center py-12 bg-gradient-to-br from-violet-50 to-purple-50 rounded-xl border-2 border-dashed border-violet-200">
              <List size={48} className="mx-auto mb-3 text-violet-400" />
              <p className="text-violet-700 font-semibold mb-1">Создайте первый вопрос</p>
              <p className="text-slate-500 text-sm">Выберите тип вопроса выше 👆</p>
            </div>
          ) : (
            localQuestions.map((question, index) => (
              <DraggableQuestion
                key={question.id}
                question={question}
                index={index}
                moveQuestion={moveQuestion}
                updateQuestion={updateQuestion}
                deleteQuestion={deleteQuestion}
                copyQuestion={copyQuestion}
                isFirst={index === 0}
                isLast={index === localQuestions.length - 1}
              />
            ))
          )}
        </div>
      </div>
    </DndProvider>
  );
}