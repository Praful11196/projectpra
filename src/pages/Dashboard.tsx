import { motion } from 'framer-motion';
import { Users, DollarSign, TrendingUp, Activity } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import StatCard from '@/components/dashboard/StatCard';
import OverviewChart from '@/components/dashboard/OverviewChart';
import RecentActivity from '@/components/dashboard/RecentActivity';
import { useAuth } from '@/contexts/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">
            Welcome back, {user?.name?.split(' ')[0]}!
          </h1>
          <p className="text-muted-foreground mt-1">
            Here's what's happening with your platform today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Users"
            value="12,847"
            change={{ value: 12.5, type: 'increase' }}
            icon={Users}
            delay={0}
          />
          <StatCard
            title="Revenue"
            value="$48,574"
            change={{ value: 8.2, type: 'increase' }}
            icon={DollarSign}
            delay={0.1}
          />
          <StatCard
            title="Growth Rate"
            value="23.4%"
            change={{ value: 4.1, type: 'increase' }}
            icon={TrendingUp}
            delay={0.2}
          />
          <StatCard
            title="Active Sessions"
            value="1,429"
            change={{ value: 2.3, type: 'decrease' }}
            icon={Activity}
            delay={0.3}
          />
        </div>

        {/* Charts & Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <OverviewChart />
          </div>
          <div className="lg:col-span-1">
            <RecentActivity />
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
}