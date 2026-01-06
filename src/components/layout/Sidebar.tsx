import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Users,
  Settings,
  LogOut,
  User,
  BarChart3,
  FileText,
  Shield,
  Bell,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  roles?: ('admin' | 'user' | 'moderator')[];
}

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: <LayoutDashboard size={20} /> },
  { label: 'Analytics', href: '/analytics', icon: <BarChart3 size={20} /> },
  { label: 'Users', href: '/users', icon: <Users size={20} />, roles: ['admin', 'moderator'] },
  { label: 'Reports', href: '/reports', icon: <FileText size={20} /> },
  { label: 'Notifications', href: '/notifications', icon: <Bell size={20} /> },
  { label: 'Admin Panel', href: '/admin', icon: <Shield size={20} />, roles: ['admin'] },
];

const bottomNavItems: NavItem[] = [
  { label: 'Profile', href: '/profile', icon: <User size={20} /> },
  { label: 'Settings', href: '/settings', icon: <Settings size={20} /> },
];

export default function Sidebar() {
  const location = useLocation();
  const { user, logout } = useAuth();

  const filteredNavItems = navItems.filter(
    item => !item.roles || (user && item.roles.includes(user.role))
  );

  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="fixed left-0 top-0 h-screen w-64 bg-sidebar border-r border-sidebar-border flex flex-col z-50"
    >
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <Link to="/dashboard" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">AI</span>
          </div>
          <span className="text-xl font-bold text-sidebar-foreground"> Aritifical Inteligence</span>
        </Link>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {filteredNavItems.map((item, index) => (
          <motion.div
            key={item.href}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.05 }}
          >
            <Link
              to={item.href}
              className={cn(
                'sidebar-item',
                location.pathname === item.href && 'sidebar-item-active'
              )}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          </motion.div>
        ))}
      </nav>

      {/* Bottom Navigation */}
      <div className="p-4 border-t border-sidebar-border space-y-1">
        {bottomNavItems.map(item => (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              'sidebar-item',
              location.pathname === item.href && 'sidebar-item-active'
            )}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
        <button
          onClick={logout}
          className="sidebar-item w-full text-destructive hover:bg-destructive/10"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>

      {/* User Info */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
            <span className="text-primary font-medium">
              {user?.name?.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-sidebar-foreground truncate">
              {user?.name}
            </p>
            <p className="text-xs text-muted-foreground truncate capitalize">
              {user?.role}
            </p>
          </div>
        </div>
      </div>
    </motion.aside>
  );
}