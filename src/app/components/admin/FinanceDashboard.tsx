import { motion } from 'motion/react';
import { DollarSign, TrendingUp, TrendingDown, Users, CreditCard } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const revenueData = [
  { month: 'Сен', revenue: 320000 },
  { month: 'Окт', revenue: 385000 },
  { month: 'Ноя', revenue: 425000 },
  { month: 'Дек', revenue: 450000 },
  { month: 'Янв', revenue: 485000 },
  { month: 'Фев', revenue: 520000 },
];

const tariffDistribution = [
  { name: 'Бесплатный', value: 45, color: '#64748b' },
  { name: 'Стандарт', value: 120, color: '#3b82f6' },
  { name: 'Куратор', value: 85, color: '#a855f7' },
  { name: 'Наставник', value: 42, color: '#ec4899' },
];

export function FinanceDashboard() {
  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          className="bg-white rounded-2xl p-6 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 shadow-lg">
              <DollarSign size={24} className="text-white" />
            </div>
            <span className="text-sm font-semibold text-green-600 flex items-center gap-1">
              <TrendingUp size={16} />
              +23%
            </span>
          </div>
          <h3 className="text-3xl font-bold text-slate-800 mb-1">₽520,000</h3>
          <p className="text-sm text-slate-600">Выручка за февраль</p>
        </motion.div>

        <motion.div
          className="bg-white rounded-2xl p-6 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-fuchsia-500 to-pink-500 shadow-lg">
              <Users size={24} className="text-white" />
            </div>
            <span className="text-sm font-semibold text-green-600 flex items-center gap-1">
              <TrendingUp size={16} />
              +12%
            </span>
          </div>
          <h3 className="text-3xl font-bold text-slate-800 mb-1">247</h3>
          <p className="text-sm text-slate-600">Платных студентов</p>
        </motion.div>

        <motion.div
          className="bg-white rounded-2xl p-6 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 shadow-lg">
              <CreditCard size={24} className="text-white" />
            </div>
            <span className="text-sm font-semibold text-slate-600">AVG</span>
          </div>
          <h3 className="text-3xl font-bold text-slate-800 mb-1">₽42,500</h3>
          <p className="text-sm text-slate-600">Средний чек</p>
        </motion.div>

        <motion.div
          className="bg-white rounded-2xl p-6 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 shadow-lg">
              <TrendingUp size={24} className="text-white" />
            </div>
            <span className="text-sm font-semibold text-green-600">+8%</span>
          </div>
          <h3 className="text-3xl font-bold text-slate-800 mb-1">78%</h3>
          <p className="text-sm text-slate-600">Конверсия в оплату</p>
        </motion.div>
      </div>

      {/* Revenue Chart */}
      <motion.div
        className="bg-white rounded-2xl p-8 shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-xl font-bold text-slate-800 mb-6">Динамика выручки</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="month" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                padding: '12px',
              }}
              formatter={(value: number) => [`₽${value.toLocaleString()}`, 'Выручка']}
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="url(#revenueGradient)"
              strokeWidth={3}
              dot={{ fill: '#7c3aed', strokeWidth: 2, r: 5 }}
              activeDot={{ r: 8 }}
            />
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#7c3aed" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Tariff Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          className="bg-white rounded-2xl p-8 shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-xl font-bold text-slate-800 mb-6">Распределение по тарифам</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={tariffDistribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '12px',
                }}
              />
              <Bar dataKey="value" fill="#7c3aed" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          className="bg-white rounded-2xl p-8 shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-xl font-bold text-slate-800 mb-6">Топ источников дохода</h2>
          <div className="space-y-4">
            {[
              { name: 'Тариф "Наставник"', revenue: 285000, percent: 55 },
              { name: 'Тариф "Куратор"', revenue: 165000, percent: 32 },
              { name: 'Тариф "Стандарт"', revenue: 70000, percent: 13 },
            ].map((item, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-slate-700">{item.name}</span>
                  <span className="text-sm font-bold text-violet-600">₽{item.revenue.toLocaleString()}</span>
                </div>
                <div className="relative w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${item.percent}%` }}
                    transition={{ duration: 1, delay: 0.6 + idx * 0.1 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recent Transactions */}
      <motion.div
        className="bg-white rounded-2xl p-8 shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <h2 className="text-xl font-bold text-slate-800 mb-6">Последние транзакции</h2>
        <div className="space-y-4">
          {[
            { user: 'Алексей Смирнов', amount: 45000, tariff: 'Куратор', date: '8 фев 2026' },
            { user: 'Мария Петрова', amount: 25000, tariff: 'Стандарт', date: '8 фев 2026' },
            { user: 'Дмитрий Иванов', amount: 85000, tariff: 'Наставник', date: '7 фев 2026' },
            { user: 'Анна Кузнецова', amount: 45000, tariff: 'Куратор', date: '7 фев 2026' },
          ].map((tx, idx) => (
            <motion.div
              key={idx}
              className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-violet-50 transition-colors"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + idx * 0.05 }}
            >
              <div>
                <p className="font-semibold text-slate-800">{tx.user}</p>
                <p className="text-sm text-slate-500">Тариф: {tx.tariff}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-green-600">+₽{tx.amount.toLocaleString()}</p>
                <p className="text-sm text-slate-500">{tx.date}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
