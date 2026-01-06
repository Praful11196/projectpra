import { motion } from 'framer-motion';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import DashboardLayout from '@/components/layout/DashboardLayout';

const areaData = [
  { name: 'Week 1', visitors: 4000, pageViews: 2400 },
  { name: 'Week 2', visitors: 3000, pageViews: 1398 },
  { name: 'Week 3', visitors: 2000, pageViews: 9800 },
  { name: 'Week 4', visitors: 2780, pageViews: 3908 },
  { name: 'Week 5', visitors: 1890, pageViews: 4800 },
  { name: 'Week 6', visitors: 2390, pageViews: 3800 },
  { name: 'Week 7', visitors: 3490, pageViews: 4300 },
];

const barData = [
  { name: 'Mon', sessions: 400 },
  { name: 'Tue', sessions: 300 },
  { name: 'Wed', sessions: 500 },
  { name: 'Thu', sessions: 280 },
  { name: 'Fri', sessions: 590 },
  { name: 'Sat', sessions: 320 },
  { name: 'Sun', sessions: 200 },
];

const pieData = [
  { name: 'Desktop', value: 400, color: 'hsl(173, 80%, 40%)' },
  { name: 'Mobile', value: 300, color: 'hsl(190, 80%, 50%)' },
  { name: 'Tablet', value: 100, color: 'hsl(210, 80%, 60%)' },
];

export default function Analytics() {
  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Analytics</h1>
          <p className="text-muted-foreground mt-1">
            Track your platform performance and user engagement
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total Visitors', value: '45.2K', change: '+12%' },
            { label: 'Page Views', value: '128.5K', change: '+8%' },
            { label: 'Bounce Rate', value: '42.3%', change: '-3%' },
            { label: 'Avg. Session', value: '4m 32s', change: '+15%' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card rounded-xl p-4"
            >
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <div className="flex items-end gap-2 mt-1">
                <span className="text-2xl font-bold">{stat.value}</span>
                <span className={`text-sm ${stat.change.startsWith('+') ? 'text-success' : 'text-destructive'}`}>
                  {stat.change}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Traffic Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card rounded-xl p-6"
          >
            <h3 className="text-lg font-semibold mb-4">Traffic Overview</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={areaData}>
                  <defs>
                    <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(173, 80%, 40%)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(173, 80%, 40%)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorPageViews" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(190, 80%, 50%)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(190, 80%, 50%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="visitors"
                    stroke="hsl(173, 80%, 40%)"
                    fill="url(#colorVisitors)"
                    strokeWidth={2}
                  />
                  <Area
                    type="monotone"
                    dataKey="pageViews"
                    stroke="hsl(190, 80%, 50%)"
                    fill="url(#colorPageViews)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Sessions by Day */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card rounded-xl p-6"
          >
            <h3 className="text-lg font-semibold mb-4">Sessions by Day</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                  <Bar dataKey="sessions" fill="hsl(173, 80%, 40%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Device Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card rounded-xl p-6"
          >
            <h3 className="text-lg font-semibold mb-4">Device Distribution</h3>
            <div className="h-72 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Top Pages */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass-card rounded-xl p-6"
          >
            <h3 className="text-lg font-semibold mb-4">Top Pages</h3>
            <div className="space-y-4">
              {[
                { page: '/dashboard', views: 12453, percentage: 32 },
                { page: '/analytics', views: 8234, percentage: 21 },
                { page: '/users', views: 6521, percentage: 17 },
                { page: '/settings', views: 4312, percentage: 11 },
                { page: '/profile', views: 3890, percentage: 10 },
              ].map((item, index) => (
                <div key={item.page} className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground w-8">{index + 1}</span>
                  <div className="flex-1">
                    <p className="font-medium">{item.page}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${item.percentage}%` }}
                          transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                          className="h-full bg-primary rounded-full"
                        />
                      </div>
                      <span className="text-sm text-muted-foreground w-20 text-right">
                        {item.views.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
}