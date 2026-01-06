import { motion } from 'framer-motion';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { name: 'Jan', users: 400, revenue: 2400 },
  { name: 'Feb', users: 520, revenue: 3000 },
  { name: 'Mar', users: 600, revenue: 3800 },
  { name: 'Apr', users: 780, revenue: 4200 },
  { name: 'May', users: 890, revenue: 5100 },
  { name: 'Jun', users: 1200, revenue: 6800 },
  { name: 'Jul', users: 1400, revenue: 7500 },
];

export default function OverviewChart() {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="glass-card rounded-xl p-6"
    >
      <h3 className="text-lg font-semibold mb-4">Overview</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(173, 80%, 40%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(173, 80%, 40%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(190, 80%, 50%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(190, 80%, 50%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="name"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              }}
              labelStyle={{ color: 'hsl(var(--foreground))' }}
            />
            <Area
              type="monotone"
              dataKey="users"
              stroke="hsl(173, 80%, 40%)"
              fillOpacity={1}
              fill="url(#colorUsers)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="hsl(190, 80%, 50%)"
              fillOpacity={1}
              fill="url(#colorRevenue)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="flex items-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-primary" />
          <span className="text-sm text-muted-foreground">Users</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'hsl(190, 80%, 50%)' }} />
          <span className="text-sm text-muted-foreground">Revenue</span>
        </div>
      </div>
    </motion.div>
  );
}