import { motion } from 'motion/react';
import { ContentBlock } from './ContentBlockEditor';
import { Question } from './TestBuilder';

interface LessonPreviewProps {
  type: 'constructor' | 'test';
  blocks?: ContentBlock[];
  questions?: Question[];
  deviceType?: 'desktop' | 'tablet' | 'mobile';
  lessonTitle: string;
}

export function LessonPreview({ 
  type, 
  blocks = [], 
  questions = [], 
  deviceType = 'desktop',
  lessonTitle 
}: LessonPreviewProps) {
  
  if (type === 'constructor') {
    return (
      <div className={`space-y-6 ${deviceType === 'mobile' ? 'space-y-4' : ''}`}>
        {/* Заголовок урока */}
        <div className="mb-8">
          <h1 className={`font-bold text-slate-900 ${deviceType === 'mobile' ? 'text-2xl' : deviceType === 'tablet' ? 'text-3xl' : 'text-4xl'}`}>
            {lessonTitle || 'Урок без названия'}
          </h1>
        </div>

        {/* Блоки контента */}
        {blocks.length === 0 ? (
          <div className={`text-center py-12 bg-slate-100 rounded-xl ${deviceType === 'mobile' ? 'py-8' : ''}`}>
            <p className={`text-slate-500 ${deviceType === 'mobile' ? 'text-sm' : ''}`}>
              Контент еще не добавлен
            </p>
          </div>
        ) : (
          blocks.map((block, index) => (
            <motion.div
              key={block.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="animate-in"
            >
              {block.type === 'heading' && block.content && (
                <h2 className={`font-bold text-slate-800 ${deviceType === 'mobile' ? 'text-xl' : deviceType === 'tablet' ? 'text-2xl' : 'text-2xl'}`}>
                  {block.content}
                </h2>
              )}

              {block.type === 'text' && block.content && (
                <div 
                  className={`prose max-w-none text-slate-700 ${deviceType === 'mobile' ? 'prose-sm' : 'prose-lg'}`}
                  dangerouslySetInnerHTML={{ __html: block.content }}
                />
              )}

              {block.type === 'video' && block.content && (
                <div className={`aspect-video bg-slate-900 rounded-xl overflow-hidden ${deviceType === 'mobile' ? 'rounded-lg' : ''}`}>
                  {block.content.includes('youtube.com') || block.content.includes('youtu.be') ? (
                    <iframe
                      src={block.content.replace('watch?v=', 'embed/')}
                      className="w-full h-full"
                      allowFullScreen
                    />
                  ) : (
                    <video 
                      src={block.content} 
                      controls 
                      className="w-full h-full"
                    />
                  )}
                </div>
              )}

              {block.type === 'audio' && block.content && (
                <div className={`bg-slate-100 rounded-xl overflow-hidden ${deviceType === 'mobile' ? 'p-3' : 'p-4'}`}>
                  <audio 
                    src={block.content} 
                    controls 
                    className="w-full"
                  />
                </div>
              )}

              {block.type === 'image' && block.content && (
                <div className={`rounded-xl overflow-hidden ${deviceType === 'mobile' ? 'rounded-lg' : ''}`}>
                  <img 
                    src={block.content} 
                    alt="Изображение урока" 
                    className="w-full h-auto"
                  />
                </div>
              )}

              {block.type === 'button' && block.content && (
                <div className="flex justify-center">
                  <a
                    href={block.content.split('|')[1] || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all ${deviceType === 'mobile' ? 'px-6 py-3 text-sm' : 'px-8 py-4'}`}
                  >
                    {block.content.split('|')[0] || 'Кнопка'}
                  </a>
                </div>
              )}

              {block.type === 'columns' && block.content && (
                <div className={`gap-4 ${deviceType === 'mobile' ? 'grid grid-cols-1 gap-3' : deviceType === 'tablet' ? 'grid grid-cols-2' : 'grid grid-cols-3'}`}>
                  {block.content.split('|').map((col, idx) => (
                    <div key={idx} className={`bg-white border border-slate-200 rounded-xl shadow-sm ${deviceType === 'mobile' ? 'p-4' : 'p-6'}`}>
                      <p className={`text-slate-700 ${deviceType === 'mobile' ? 'text-sm' : ''}`}>
                        {col.trim()}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {block.type === 'text-image' && block.content && (
                <div className={`gap-6 bg-white border border-slate-200 rounded-xl shadow-sm ${deviceType === 'mobile' ? 'grid grid-cols-1 gap-4 p-4' : 'grid md:grid-cols-2 p-6'}`}>
                  <div className={`text-slate-700 ${deviceType === 'mobile' ? 'text-sm' : ''}`}>
                    {block.content.split('|')[0]}
                  </div>
                  {block.content.split('|')[1] && (
                    <div className="aspect-video bg-slate-200 rounded-lg overflow-hidden">
                      <img
                        src={block.content.split('|')[1]}
                        alt="Изображение"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
              )}

              {block.type === 'icon' && block.content && (
                <div className="flex items-center justify-center">
                  <div className={`bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl ${deviceType === 'mobile' ? 'p-6' : 'p-8'}`}>
                    <span className={deviceType === 'mobile' ? 'text-5xl' : 'text-7xl'}>
                      {block.content}
                    </span>
                  </div>
                </div>
              )}
            </motion.div>
          ))
        )}
      </div>
    );
  }

  // Тестовый режим
  return (
    <div className={`space-y-6 ${deviceType === 'mobile' ? 'space-y-4' : ''}`}>
      {/* Заголовок теста */}
      <div className="mb-8">
        <h1 className={`font-bold text-slate-900 ${deviceType === 'mobile' ? 'text-2xl' : deviceType === 'tablet' ? 'text-3xl' : 'text-4xl'}`}>
          {lessonTitle || 'Тест без названия'}
        </h1>
        <p className={`text-slate-600 mt-2 ${deviceType === 'mobile' ? 'text-sm' : ''}`}>
          Вопросов: {questions.length}
        </p>
      </div>

      {/* Вопросы */}
      {questions.length === 0 ? (
        <div className={`text-center py-12 bg-slate-100 rounded-xl ${deviceType === 'mobile' ? 'py-8' : ''}`}>
          <p className={`text-slate-500 ${deviceType === 'mobile' ? 'text-sm' : ''}`}>
            Вопросы еще не добавлены
          </p>
        </div>
      ) : (
        questions.map((question, index) => (
          <motion.div
            key={question.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-white border-2 border-slate-200 rounded-2xl shadow-sm ${deviceType === 'mobile' ? 'p-4' : 'p-6'}`}
          >
            <div className="flex items-start gap-4">
              <div className={`flex-shrink-0 flex items-center justify-center bg-violet-600 text-white rounded-full font-bold ${deviceType === 'mobile' ? 'w-8 h-8 text-sm' : 'w-10 h-10'}`}>
                {index + 1}
              </div>
              <div className="flex-1">
                <h3 className={`font-semibold text-slate-800 mb-2 ${deviceType === 'mobile' ? 'text-base' : 'text-lg'}`}>
                  {question.title}
                  {question.required && <span className="text-red-500 ml-1">*</span>}
                </h3>
                
                {question.description && (
                  <p className={`text-slate-600 mb-4 ${deviceType === 'mobile' ? 'text-xs' : 'text-sm'}`}>
                    {question.description}
                  </p>
                )}

                {/* Варианты ответов */}
                <div className={`space-y-2 ${deviceType === 'mobile' ? 'space-y-1.5' : ''}`}>
                  {question.type === 'single-choice' && question.options?.map((option, idx) => (
                    <label 
                      key={option.id}
                      className={`flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-lg cursor-pointer hover:bg-violet-50 hover:border-violet-300 transition-all ${deviceType === 'mobile' ? 'p-2' : 'p-3'}`}
                    >
                      <input 
                        type="radio" 
                        name={`question-${question.id}`}
                        className="w-4 h-4 text-violet-600"
                        disabled
                      />
                      <span className={`text-slate-700 ${deviceType === 'mobile' ? 'text-sm' : ''}`}>
                        {option.text}
                      </span>
                    </label>
                  ))}

                  {question.type === 'multiple-choice' && question.options?.map((option, idx) => (
                    <label 
                      key={option.id}
                      className={`flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-lg cursor-pointer hover:bg-violet-50 hover:border-violet-300 transition-all ${deviceType === 'mobile' ? 'p-2' : 'p-3'}`}
                    >
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 text-violet-600 rounded"
                        disabled
                      />
                      <span className={`text-slate-700 ${deviceType === 'mobile' ? 'text-sm' : ''}`}>
                        {option.text}
                      </span>
                    </label>
                  ))}

                  {question.type === 'short-answer' && (
                    <input
                      type="text"
                      placeholder="Введите ответ..."
                      className={`w-full bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 ${deviceType === 'mobile' ? 'px-3 py-2 text-sm' : 'px-4 py-3'}`}
                      disabled
                    />
                  )}

                  {question.type === 'long-answer' && (
                    <textarea
                      placeholder="Введите развернутый ответ..."
                      rows={4}
                      className={`w-full bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none ${deviceType === 'mobile' ? 'px-3 py-2 text-sm' : 'px-4 py-3'}`}
                      disabled
                    />
                  )}

                  {question.type === 'scale' && (
                    <div className={`space-y-2 ${deviceType === 'mobile' ? 'space-y-1' : ''}`}>
                      <div className="flex items-center justify-between gap-2">
                        {Array.from({ length: (question.scaleMax || 10) - (question.scaleMin || 1) + 1 }, (_, i) => i + (question.scaleMin || 1)).map(num => (
                          <button
                            key={num}
                            className={`flex-1 bg-slate-100 hover:bg-violet-100 border border-slate-300 rounded-lg font-semibold text-slate-700 transition-all ${deviceType === 'mobile' ? 'py-2 text-sm' : 'py-3'}`}
                            disabled
                          >
                            {num}
                          </button>
                        ))}
                      </div>
                      <div className="flex justify-between text-xs text-slate-500">
                        <span>{question.scaleMinLabel || 'Минимум'}</span>
                        <span>{question.scaleMaxLabel || 'Максимум'}</span>
                      </div>
                    </div>
                  )}

                  {question.type === 'dropdown' && question.options && (
                    <select 
                      className={`w-full bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 ${deviceType === 'mobile' ? 'px-3 py-2 text-sm' : 'px-4 py-3'}`}
                      disabled
                    >
                      <option value="">Выберите ответ...</option>
                      {question.options.map(option => (
                        <option key={option.id} value={option.id}>
                          {option.text}
                        </option>
                      ))}
                    </select>
                  )}

                  {question.type === 'date' && (
                    <input
                      type="date"
                      className={`w-full bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 ${deviceType === 'mobile' ? 'px-3 py-2 text-sm' : 'px-4 py-3'}`}
                      disabled
                    />
                  )}

                  {question.type === 'time' && (
                    <input
                      type="time"
                      className={`w-full bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 ${deviceType === 'mobile' ? 'px-3 py-2 text-sm' : 'px-4 py-3'}`}
                      disabled
                    />
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))
      )}

      {/* Кнопка отправки теста */}
      {questions.length > 0 && (
        <div className="flex justify-center pt-4">
          <button
            className={`bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg ${deviceType === 'mobile' ? 'px-8 py-3 text-sm' : 'px-12 py-4'}`}
            disabled
          >
            Отправить ответы
          </button>
        </div>
      )}
    </div>
  );
}
