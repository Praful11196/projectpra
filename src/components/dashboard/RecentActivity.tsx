import { motion } from 'framer-motion';
import { User, FileText, Settings, Bell } from 'lucide-react';

const activities = [
  {
    id: 1,
    user: 'Sarah Johnson',
    action: 'created a new project',
    target: 'Marketing Campaign Q1',
    time: '5 minutes ago',
    icon: FileText,
  },
  {
    id: 2,
    user: 'Mike Chen',
    action: 'updated settings for',
    target: 'Team Workspace',
    time: '15 minutes ago',
    icon: Settings,
  },
  {
    id: 3,
    user: 'Emma Wilson',
    action: 'joined the team as',
    target: 'Developer',
    time: '1 hour ago',
    icon: User,
  },
  {
    id: 4,
    user: 'Alex Brown',
    action: 'sent a notification to',
    target: 'All Team Members',
    time: '2 hours ago',
    icon: Bell,
  },
  {
    id: 5,
    user: 'Lisa Park',
    action: 'completed task',
    target: 'API Integration',
    time: '3 hours ago',
    icon: FileText,
  },
];

export default function RecentActivity() {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="glass-card rounded-xl p-6"
    >
      <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 + index * 0.1 }}
            className="flex items-start gap-4 p-3 rounded-lg hover:bg-secondary/50 transition-colors"
          >
            <div className="p-2 rounded-lg bg-primary/10">
              <activity.icon size={16} className="text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm">
                <span className="font-medium">{activity.user}</span>{' '}
                <span className="text-muted-foreground">{activity.action}</span>{' '}
                <span className="font-medium">{activity.target}</span>
              </p>
              <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}