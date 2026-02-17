import { 
  Video, 
  Headphones, 
  ClipboardList, 
  AlignLeft, 
  FileText 
} from 'lucide-react';

export const getLessonTypeConfig = (type: string) => {
  switch(type) {
    case 'video': return { icon: Video, label: 'Видео' };
    case 'audio': return { icon: Headphones, label: 'Аудио' };
    case 'test': return { icon: ClipboardList, label: 'Тест' };
    case 'text': return { icon: AlignLeft, label: 'Инструкция' };
    default: return { icon: FileText, label: 'Урок' };
  }
};
