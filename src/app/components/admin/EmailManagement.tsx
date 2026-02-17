import { useState } from 'react';
import { motion } from 'motion/react';
import { FileText, GitBranch } from 'lucide-react';
import { EmailTemplates } from './EmailTemplates';
import { EmailFunnels } from './EmailFunnels';

export function EmailManagement() {
  const [activeTab, setActiveTab] = useState<'templates' | 'funnels'>('templates');

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <motion.div
        className="bg-white rounded-2xl shadow-lg p-2 flex gap-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <button
          onClick={() => setActiveTab('templates')}
          className={`flex-1 flex items-center justify-center gap-2 px-4 sm:px-6 py-3 rounded-xl font-semibold transition-all ${
            activeTab === 'templates'
              ? 'bg-gradient-to-r from-violet-500 to-purple-500 text-white shadow-lg'
              : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          <FileText size={20} />
          <span className="hidden sm:inline">Шаблоны писем</span>
          <span className="sm:hidden">Шаблоны</span>
        </button>
        <button
          onClick={() => setActiveTab('funnels')}
          className={`flex-1 flex items-center justify-center gap-2 px-4 sm:px-6 py-3 rounded-xl font-semibold transition-all ${
            activeTab === 'funnels'
              ? 'bg-gradient-to-r from-violet-500 to-purple-500 text-white shadow-lg'
              : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          <GitBranch size={20} />
          <span className="hidden sm:inline">Email-воронки</span>
          <span className="sm:hidden">Воронки</span>
        </button>
      </motion.div>

      {/* Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'templates' ? <EmailTemplates /> : <EmailFunnels />}
      </motion.div>
    </div>
  );
}
