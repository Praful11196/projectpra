import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Sidebar from './Sidebar';
import { useAuth } from '@/contexts/AuthContext';

interface DashboardLayoutProps {
  children: ReactNode;
  requiredRoles?: ('admin' | 'user' | 'moderator')[];
}

export default function DashboardLayout({ children, requiredRoles }: DashboardLayoutProps) {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRoles && user && !requiredRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="ml-64 min-h-screen"
      >
        <div className="content-container">
          {children}
        </div>
      </motion.main>
    </div>
  );
}