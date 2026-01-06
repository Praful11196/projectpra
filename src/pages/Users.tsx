import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Plus, MoreHorizontal, Edit, Trash2, Mail } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

interface UserData {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'moderator';
  status: 'active' | 'inactive' | 'pending';
  joinedAt: string;
  avatar?: string;
}

const mockUsers: UserData[] = [
  { id: '1', name: 'Sarah Johnson', email: 'sarah@example.com', role: 'admin', status: 'active', joinedAt: '2024-01-15' },
  { id: '2', name: 'Mike Chen', email: 'mike@example.com', role: 'user', status: 'active', joinedAt: '2024-02-20' },
  { id: '3', name: 'Emma Wilson', email: 'emma@example.com', role: 'moderator', status: 'active', joinedAt: '2024-03-10' },
  { id: '4', name: 'Alex Brown', email: 'alex@example.com', role: 'user', status: 'inactive', joinedAt: '2024-01-05' },
  { id: '5', name: 'Lisa Park', email: 'lisa@example.com', role: 'user', status: 'pending', joinedAt: '2024-04-01' },
  { id: '6', name: 'David Kim', email: 'david@example.com', role: 'user', status: 'active', joinedAt: '2024-03-25' },
  { id: '7', name: 'Rachel Green', email: 'rachel@example.com', role: 'moderator', status: 'active', joinedAt: '2024-02-14' },
  { id: '8', name: 'Tom Hardy', email: 'tom@example.com', role: 'user', status: 'active', joinedAt: '2024-04-10' },
];

export default function Users() {
  const [searchQuery, setSearchQuery] = useState('');
  const [users] = useState<UserData[]>(mockUsers);

  const filteredUsers = users.filter(
    user =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: UserData['status']) => {
    switch (status) {
      case 'active':
        return <span className="badge-success">Active</span>;
      case 'inactive':
        return <span className="badge-destructive">Inactive</span>;
      case 'pending':
        return <span className="badge-warning">Pending</span>;
    }
  };

  const getRoleBadge = (role: UserData['role']) => {
    const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
    switch (role) {
      case 'admin':
        return <span className={`${baseClasses} bg-primary/10 text-primary`}>Admin</span>;
      case 'moderator':
        return <span className={`${baseClasses} bg-accent/20 text-accent-foreground`}>Moderator</span>;
      case 'user':
        return <span className={`${baseClasses} bg-secondary text-secondary-foreground`}>User</span>;
    }
  };

  return (
    <DashboardLayout requiredRoles={['admin', 'moderator']}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Users</h1>
            <p className="text-muted-foreground mt-1">
              Manage and monitor user accounts
            </p>
          </div>
          <button
            onClick={() => toast.info('Add user modal would open here')}
            className="btn-primary flex items-center gap-2"
          >
            <Plus size={18} />
            Add User
          </button>
        </div>

        {/* Search & Filters */}
        <div className="glass-card rounded-xl p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-input pl-11"
                placeholder="Search users..."
              />
            </div>
            <div className="flex gap-2">
              <select className="form-input w-auto">
                <option value="">All Roles</option>
                <option value="admin">Admin</option>
                <option value="moderator">Moderator</option>
                <option value="user">User</option>
              </select>
              <select className="form-input w-auto">
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-xl overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="table-header px-6 py-4">User</th>
                  <th className="table-header px-6 py-4">Role</th>
                  <th className="table-header px-6 py-4">Status</th>
                  <th className="table-header px-6 py-4">Joined</th>
                  <th className="table-header px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user, index) => (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-border/50 hover:bg-secondary/30 transition-colors"
                  >
                    <td className="table-cell px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                          <span className="text-primary font-medium">
                            {user.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="table-cell px-6">{getRoleBadge(user.role)}</td>
                    <td className="table-cell px-6">{getStatusBadge(user.status)}</td>
                    <td className="table-cell px-6 text-muted-foreground">
                      {new Date(user.joinedAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </td>
                    <td className="table-cell px-6 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
                            <MoreHorizontal size={18} className="text-muted-foreground" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => toast.info('Edit user')}>
                            <Edit size={16} className="mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toast.info('Send email')}>
                            <Mail size={16} className="mr-2" />
                            Send Email
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => toast.error('User deleted')}
                            className="text-destructive focus:text-destructive"
                          >
                            <Trash2 size={16} className="mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-border">
            <p className="text-sm text-muted-foreground">
              Showing {filteredUsers.length} of {users.length} users
            </p>
            <div className="flex gap-2">
              <button className="btn-ghost px-4 py-2 text-sm">Previous</button>
              <button className="btn-primary px-4 py-2 text-sm">Next</button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}