import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Check, CheckCheck, Trash2, Settings, User, Shield, FileText } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface Notification {
  id: string;
  type: 'user' | 'security' | 'system' | 'report';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'user',
    title: 'New team member joined',
    message: 'Sarah Johnson has joined the Marketing team',
    time: '5 minutes ago',
    read: false,
  },
  {
    id: '2',
    type: 'security',
    title: 'New device login detected',
    message: 'A new login was detected from Chrome on macOS',
    time: '1 hour ago',
    read: false,
  },
  {
    id: '3',
    type: 'report',
    title: 'Weekly report ready',
    message: 'Your weekly analytics report is ready for download',
    time: '2 hours ago',
    read: false,
  },
  {
    id: '4',
    type: 'system',
    title: 'System maintenance scheduled',
    message: 'Scheduled maintenance on Sunday 2:00 AM - 4:00 AM UTC',
    time: '5 hours ago',
    read: true,
  },
  {
    id: '5',
    type: 'user',
    title: 'Project completed',
    message: 'Mike Chen marked "API Integration" as complete',
    time: '1 day ago',
    read: true,
  },
  {
    id: '6',
    type: 'security',
    title: 'Password updated',
    message: 'Your password was successfully updated',
    time: '2 days ago',
    read: true,
  },
];

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const unreadCount = notifications.filter(n => !n.read).length;

  const filteredNotifications = filter === 'all' 
    ? notifications 
    : notifications.filter(n => !n.read);

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    toast.success('All notifications marked as read');
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    toast.success('Notification deleted');
  };

  const getIcon = (type: Notification['type']) => {
    const iconClass = "text-primary";
    switch (type) {
      case 'user':
        return <User size={18} className={iconClass} />;
      case 'security':
        return <Shield size={18} className={iconClass} />;
      case 'report':
        return <FileText size={18} className={iconClass} />;
      case 'system':
        return <Settings size={18} className={iconClass} />;
    }
  };

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold">Notifications</h1>
              {unreadCount > 0 && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary text-primary-foreground">
                  {unreadCount} new
                </span>
              )}
            </div>
            <p className="text-muted-foreground mt-1">
              Stay updated with your latest notifications
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={markAllAsRead}
              disabled={unreadCount === 0}
              className="btn-secondary flex items-center gap-2 disabled:opacity-50"
            >
              <CheckCheck size={18} />
              Mark all read
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={cn(
              'px-4 py-2 rounded-lg text-sm font-medium transition-all',
              filter === 'all'
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            )}
          >
            All
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={cn(
              'px-4 py-2 rounded-lg text-sm font-medium transition-all',
              filter === 'unread'
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            )}
          >
            Unread ({unreadCount})
          </button>
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {filteredNotifications.map((notification, index) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={cn(
                'glass-card rounded-xl p-4 flex items-start gap-4 hover:shadow-lg transition-all cursor-pointer',
                !notification.read && 'border-l-4 border-l-primary'
              )}
              onClick={() => markAsRead(notification.id)}
            >
              <div className="p-2.5 rounded-xl bg-primary/10">
                {getIcon(notification.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className={cn('font-medium', !notification.read && 'font-semibold')}>
                      {notification.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {notification.message}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {notification.time}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    {!notification.read && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          markAsRead(notification.id);
                        }}
                        className="p-2 rounded-lg hover:bg-secondary transition-colors"
                        title="Mark as read"
                      >
                        <Check size={16} className="text-muted-foreground" />
                      </button>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteNotification(notification.id);
                      }}
                      className="p-2 rounded-lg hover:bg-destructive/10 transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={16} className="text-destructive" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredNotifications.length === 0 && (
          <div className="glass-card rounded-xl p-12 text-center">
            <Bell className="mx-auto mb-4 text-muted-foreground" size={48} />
            <h3 className="text-lg font-semibold mb-2">No notifications</h3>
            <p className="text-muted-foreground">
              {filter === 'unread' 
                ? "You're all caught up! No unread notifications."
                : "You don't have any notifications yet."
              }
            </p>
          </div>
        )}
      </motion.div>
    </DashboardLayout>
  );
}