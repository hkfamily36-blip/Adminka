// Конфигурация типов уроков

export const LESSON_TYPE_LABELS = {
  video: 'Видео',
  audio: 'Аудио',
  test: 'Тест',
  text: 'Инструкция',
  default: 'Урок'
} as const;

export type LessonType = keyof typeof LESSON_TYPE_LABELS;
