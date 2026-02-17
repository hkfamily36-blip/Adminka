import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { useDrag, useDrop } from 'react-dnd';
import { 
  ChevronDown, 
  ChevronRight, 
  GripVertical, 
  Edit,
  Eye,
  EyeOff,
  Blocks,
  ClipboardList,
  Plus,
  Copy,
  Folders
} from 'lucide-react';

interface Lesson {
  id: string;
  title: string;
  type: 'constructor' | 'test';
  moduleId: number;
  status?: 'published' | 'draft';
  order: number;
}

interface Module {
  id: number;
  name: string;
  expanded: boolean;
}

interface CourseStructureProps {
  lessons: Lesson[];
  onEdit: (lesson: Lesson) => void;
  onToggleStatus: (lessonId: string) => void;
  onReorder: (lessons: Lesson[]) => void;
  onCreateLesson: (moduleId: number) => void;
  onCopyLesson: (lesson: Lesson) => void;
  onCopyModule: (moduleId: number) => void;
}

const ITEM_TYPE = 'LESSON';

const modules: Module[] = [
  { id: 0, name: 'Предобучение', expanded: true },
  { id: 1, name: 'Аутентичность', expanded: true },
  { id: 2, name: 'Ниша', expanded: false },
  { id: 3, name: 'Маркетинг', expanded: false },
  { id: 4, name: 'Продажи', expanded: false },
  { id: 5, name: 'AI-агенты', expanded: false },
  { id: 6, name: 'Автоворонки', expanded: false },
  { id: 7, name: 'Масштабирование', expanded: false },
];

function DraggableLesson({
  lesson,
  index,
  moveLesson,
  onEdit,
  onToggleStatus,
  onCopyLesson,
}: {
  lesson: Lesson;
  index: number;
  moveLesson: (dragIndex: number, hoverIndex: number, dragModuleId: number, hoverModuleId: number) => void;
  onEdit: (lesson: Lesson) => void;
  onToggleStatus: (lessonId: string) => void;
  onCopyLesson: (lesson: Lesson) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: ITEM_TYPE,
    item: { index, moduleId: lesson.moduleId },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ isOver }, drop] = useDrop({
    accept: ITEM_TYPE,
    hover: (item: { index: number; moduleId: number }) => {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;
      const dragModuleId = item.moduleId;
      const hoverModuleId = lesson.moduleId;

      if (dragIndex === hoverIndex && dragModuleId === hoverModuleId) return;

      moveLesson(dragIndex, hoverIndex, dragModuleId, hoverModuleId);
      item.index = hoverIndex;
      item.moduleId = hoverModuleId;
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  drag(drop(ref));

  return (
    <motion.div
      ref={ref}
      className={`flex items-center gap-3 p-3 rounded-lg transition-all group ${
        isDragging 
          ? 'opacity-30 bg-violet-100' 
          : isOver 
          ? 'bg-violet-100 border-l-4 border-violet-500' 
          : 'hover:bg-slate-50'
      }`}
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <div className="cursor-move opacity-0 group-hover:opacity-100 transition-opacity">
        <GripVertical size={18} className="text-slate-400" />
      </div>
      <div className={`p-2 rounded-lg ${
        lesson.type === 'constructor' ? 'bg-violet-100 text-violet-600' :
        'bg-cyan-100 text-cyan-600'
      }`}>
        {lesson.type === 'constructor' ? <Blocks size={16} /> : <ClipboardList size={16} />}
      </div>
      <div className="flex-1">
        <p className="font-medium text-slate-800">{lesson.title}</p>
        <p className="text-xs text-slate-500">
          {lesson.type === 'constructor' ? '✨ Конструктор' : '✅ Тест'}
        </p>
      </div>
      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => onToggleStatus(lesson.id)}
          className={`min-w-[140px] px-3 py-2 rounded-lg transition-colors font-medium text-sm flex items-center justify-center gap-1 ${
            lesson.status === 'published' 
              ? 'bg-green-100 text-green-600 hover:bg-green-200' 
              : 'bg-amber-100 text-amber-600 hover:bg-amber-200'
          }`}
          title={lesson.status === 'published' ? 'Опубликовано - нажмите для перевода в черновик' : 'Черновик - нажмите для публикации'}
        >
          {lesson.status === 'published' ? (
            <>
              <Eye size={14} />
              Опубликовано
            </>
          ) : (
            <>
              <EyeOff size={14} />
              Черновик
            </>
          )}
        </button>
        <button
          onClick={() => onCopyLesson(lesson)}
          className="p-2 bg-cyan-100 text-cyan-600 rounded-lg hover:bg-cyan-200 transition-colors"
          title="Копировать урок"
        >
          <Copy size={16} />
        </button>
        <button
          onClick={() => onEdit(lesson)}
          className="p-2 bg-violet-100 text-violet-600 rounded-lg hover:bg-violet-200 transition-colors"
          title="Редактировать"
        >
          <Edit size={16} />
        </button>
      </div>
    </motion.div>
  );
}

export function CourseStructure({ lessons, onEdit, onToggleStatus, onReorder, onCreateLesson, onCopyLesson, onCopyModule }: CourseStructureProps) {
  const [expandedModules, setExpandedModules] = useState<Set<number>>(new Set([0, 1]));
  const [localLessons, setLocalLessons] = useState<Lesson[]>(lessons);

  // Синхронизация локального состояния с пропсами
  useEffect(() => {
    setLocalLessons(lessons);
  }, [lessons]);

  const toggleModule = (moduleId: number) => {
    const newExpanded = new Set(expandedModules);
    if (newExpanded.has(moduleId)) {
      newExpanded.delete(moduleId);
    } else {
      newExpanded.add(moduleId);
    }
    setExpandedModules(newExpanded);
  };

  const moveLesson = (dragIndex: number, hoverIndex: number, dragModuleId: number, hoverModuleId: number) => {
    const dragLessons = localLessons.filter(l => l.moduleId === dragModuleId);
    const hoverLessons = localLessons.filter(l => l.moduleId === hoverModuleId);
    const otherLessons = localLessons.filter(l => l.moduleId !== dragModuleId && l.moduleId !== hoverModuleId);

    const draggedLesson = dragLessons[dragIndex];

    if (dragModuleId === hoverModuleId) {
      // Перемещение внутри одного модуля
      const newLessons = [...dragLessons];
      newLessons.splice(dragIndex, 1);
      newLessons.splice(hoverIndex, 0, draggedLesson);
      
      // Обновляем order для уроков в модуле
      const reorderedLessons = newLessons.map((lesson, idx) => ({
        ...lesson,
        order: idx
      }));
      
      const updated = [...otherLessons, ...reorderedLessons];
      
      setLocalLessons(updated);
      onReorder(updated);
    } else {
      // Перемещение между модулями
      const newDragLessons = dragLessons.filter((_, idx) => idx !== dragIndex);
      const updatedLesson = { ...draggedLesson, moduleId: hoverModuleId };
      const newHoverLessons = [...hoverLessons];
      newHoverLessons.splice(hoverIndex, 0, updatedLesson);
      
      const updated = [...otherLessons, ...newDragLessons, ...newHoverLessons];
      
      setLocalLessons(updated);
      onReorder(updated);
    }
  };

  const copyLesson = (lesson: Lesson) => {
    const newLesson: Lesson = {
      ...lesson,
      id: `lesson-${Date.now()}`,
      title: `${lesson.title} (копия)`,
      status: 'draft',
      order: localLessons.filter(l => l.moduleId === lesson.moduleId).length + 1,
    };

    const updated = [...localLessons, newLesson];
    setLocalLessons(updated);
    onReorder(updated);
  };

  const copyModule = (moduleId: number) => {
    const moduleLessons = localLessons.filter(l => l.moduleId === moduleId);
    
    if (moduleLessons.length === 0) {
      return;
    }

    const maxModuleId = Math.max(...modules.map(m => m.id));
    const newModuleId = maxModuleId + 1;
    
    const copiedLessons = moduleLessons.map((lesson, index) => ({
      ...lesson,
      id: `lesson-${Date.now()}-${index}`,
      moduleId: newModuleId,
      title: `${lesson.title} (копия модуля)`,
      status: 'draft' as const,
      order: localLessons.length + index + 1,
    }));

    const updated = [...localLessons, ...copiedLessons];
    setLocalLessons(updated);
    onReorder(updated);
  };

  const getLessonsForModule = (moduleId: number) => {
    return localLessons.filter(l => l.moduleId === moduleId);
  };

  return (
    <div className="space-y-4">
      {modules.map((module) => {
        const moduleLessons = getLessonsForModule(module.id);
        const isExpanded = expandedModules.has(module.id);

        return (
          <motion.div
            key={module.id}
            className="bg-gradient-to-r from-violet-50/50 to-purple-50/30 border-2 border-violet-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: module.id * 0.05 }}
          >
            {/* Module Header */}
            <div className="flex items-center justify-between p-4 bg-white/50">
              <button
                onClick={() => toggleModule(module.id)}
                className="flex items-center gap-3 flex-1"
              >
                {isExpanded ? <ChevronDown size={20} className="text-violet-600" /> : <ChevronRight size={20} className="text-violet-600" />}
                <h3 className="font-bold text-slate-800">
                  Модуль {module.id}: {module.name}
                </h3>
                <span className="px-3 py-1 bg-violet-200 text-violet-700 rounded-full text-xs font-semibold">
                  {moduleLessons.length} {moduleLessons.length === 1 ? 'урок' : moduleLessons.length < 5 ? 'урока' : 'уроков'}
                </span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => copyModule(module.id)}
                  className="px-3 py-2 bg-gradient-to-r from-pink-100 to-purple-100 text-violet-700 rounded-lg hover:from-pink-200 hover:to-purple-200 transition-colors font-semibold text-sm flex items-center gap-2"
                  title="Копировать модуль со всеми уроками"
                >
                  <Folders size={16} />
                  <span className="hidden sm:inline">Копировать модуль</span>
                </button>
              </div>
            </div>

            {/* Module Lessons */}
            {isExpanded && (
              <motion.div
                className="p-4 space-y-2 bg-white/30"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                {moduleLessons.length > 0 ? (
                  moduleLessons.map((lesson, index) => (
                    <DraggableLesson
                      key={lesson.id}
                      lesson={lesson}
                      index={index}
                      moveLesson={moveLesson}
                      onEdit={onEdit}
                      onToggleStatus={onToggleStatus}
                      onCopyLesson={copyLesson}
                    />
                  ))
                ) : (
                  <p className="text-center text-slate-500 py-4">
                    Уроков пока нет
                  </p>
                )}

                {/* Create Lesson Button */}
                <button
                  onClick={() => onCreateLesson(module.id)}
                  className="w-full flex items-center justify-center gap-2 p-3 border-2 border-dashed border-violet-300 rounded-lg text-violet-600 hover:bg-violet-50 hover:border-violet-400 transition-all font-medium"
                >
                  <Plus size={18} />
                  Создать урок в этом модуле
                </button>
              </motion.div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}