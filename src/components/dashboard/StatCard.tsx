import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    type: 'increase' | 'decrease';
  };
  icon: LucideIcon;
  className?: string;
  delay?: number;
}

export default function StatCard({ title, value, change, icon: Icon, className, delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay, duration: 0.4 }}
      className={cn('stat-card', className)}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold">{value}</p>
          {change && (
            <p className={cn(
              'text-sm font-medium',
              change.type === 'increase' ? 'text-success' : 'text-destructive'
            )}>
              {change.type === 'increase' ? '+' : '-'}{Math.abs(change.value)}%
              <span className="text-muted-foreground ml-1">vs last month</span>
            </p>
          )}
        </div>
        <div className="p-3 rounded-xl bg-primary/10">
          <Icon className="text-primary" size={24} />
        </div>
      </div>
    </motion.div>
  );
}