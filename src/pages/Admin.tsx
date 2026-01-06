import { motion } from 'framer-motion';
import { Shield, Users, Settings, Database, Activity, AlertTriangle } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { toast } from 'sonner';

export default function Admin() {
  const adminModules = [
    {
      title: 'User Management',
      description: 'Manage user accounts, roles, and permissions',
      icon: Users,
      action: () => toast.info('Navigate to user management'),
    },
    {
      title: 'System Settings',
      description: 'Configure platform-wide settings and preferences',
      icon: Settings,
      action: () => toast.info('Open system settings'),
    },
    {
      title: 'Database Management',
      description: 'Monitor and manage database operations',
      icon: Database,
      action: () => toast.info('Open database panel'),
    },
    {
      title: 'Activity Logs',
      description: 'View detailed logs of all system activities',
      icon: Activity,
      action: () => toast.info('View activity logs'),
    },
    {
      title: 'Security Center',
      description: 'Monitor security events and configure policies',
      icon: Shield,
      action: () => toast.info('Open security center'),
    },
    {
      title: 'System Alerts',
      description: 'Manage system alerts and notifications',
      icon: AlertTriangle,
      action: () => toast.info('View system alerts'),
    },
  ];

  const systemHealth = [
    { name: 'API Status', status: 'operational', uptime: '99.99%' },
    { name: 'Database', status: 'operational', uptime: '99.95%' },
    { name: 'Auth Service', status: 'operational', uptime: '99.99%' },
    { name: 'File Storage', status: 'degraded', uptime: '98.50%' },
  ];

  return (
    <DashboardLayout requiredRoles={['admin']}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Header */}
        <div>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Shield className="text-primary" size={24} />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Admin Panel</h1>
              <p className="text-muted-foreground">
                Manage and monitor your platform
              </p>
            </div>
          </div>
        </div>

        {/* System Health */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card rounded-xl p-6"
        >
          <h2 className="text-lg font-semibold mb-4">System Health</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {systemHealth.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="p-4 rounded-lg bg-secondary/30"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{item.name}</span>
                  <span
                    className={`w-3 h-3 rounded-full ${
                      item.status === 'operational' ? 'bg-success' : 'bg-warning'
                    }`}
                  />
                </div>
                <p className="text-sm text-muted-foreground capitalize">{item.status}</p>
                <p className="text-xs text-muted-foreground mt-1">Uptime: {item.uptime}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Admin Modules */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {adminModules.map((module, index) => (
            <motion.button
              key={module.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.05 }}
              onClick={module.action}
              className="glass-card rounded-xl p-6 text-left hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
            >
              <div className="p-3 rounded-xl bg-primary/10 w-fit mb-4">
                <module.icon className="text-primary" size={24} />
              </div>
              <h3 className="font-semibold mb-1">{module.title}</h3>
              <p className="text-sm text-muted-foreground">{module.description}</p>
            </motion.button>
          ))}
        </div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-card rounded-xl p-6"
        >
          <h2 className="text-lg font-semibold mb-4">Quick Statistics</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Total Users', value: '12,847', change: '+127 today' },
              { label: 'Active Sessions', value: '1,429', change: '+23 now' },
              { label: 'API Requests', value: '2.4M', change: '+18% this week' },
              { label: 'Error Rate', value: '0.02%', change: '-0.01% vs last week' },
            ].map((stat, index) => (
              <div key={stat.label}>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
                <p className="text-xs text-success mt-1">{stat.change}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}