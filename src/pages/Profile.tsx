import { motion } from 'framer-motion';
import { Mail, Calendar, MapPin, Link as LinkIcon, Edit } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';

export default function Profile() {
  const { user } = useAuth();

  const stats = [
    { label: 'Projects', value: 24 },
    { label: 'Tasks Completed', value: 156 },
    { label: 'Team Members', value: 8 },
    { label: 'Reports', value: 42 },
  ];

  const recentProjects = [
    { name: 'Marketing Dashboard', status: 'In Progress', progress: 75 },
    { name: 'E-commerce Platform', status: 'Completed', progress: 100 },
    { name: 'Mobile App Redesign', status: 'In Progress', progress: 45 },
    { name: 'Analytics Integration', status: 'Planning', progress: 10 },
  ];

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Profile Header */}
        <div className="glass-card rounded-xl p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-primary font-bold text-3xl">
                {user?.name?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-2xl font-bold">{user?.name}</h1>
                  <p className="text-muted-foreground capitalize">{user?.role}</p>
                </div>
                <button className="btn-secondary flex items-center gap-2">
                  <Edit size={16} />
                  Edit Profile
                </button>
              </div>
              <div className="flex flex-wrap gap-4 mt-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail size={16} />
                  <span className="text-sm">{user?.email}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar size={16} />
                  <span className="text-sm">
                    Joined {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'Recently'}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin size={16} />
                  <span className="text-sm">San Francisco, CA</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <LinkIcon size={16} />
                  <span className="text-sm text-primary">AI.dev/profile</span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-border">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <p className="text-3xl font-bold text-primary">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Recent Projects */}
        <div className="glass-card rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Projects</h2>
          <div className="space-y-4">
            {recentProjects.map((project, index) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
              >
                <div className="flex-1">
                  <p className="font-medium">{project.name}</p>
                  <p className="text-sm text-muted-foreground">{project.status}</p>
                </div>
                <div className="w-32">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">{project.progress}%</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${project.progress}%` }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                      className="h-full bg-primary rounded-full"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bio Section */}
        <div className="glass-card rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4">About</h2>
          <p className="text-muted-foreground leading-relaxed">
            Passionate software developer with a focus on creating intuitive and beautiful user interfaces. 
            Experienced in building scalable web applications using modern technologies. 
            When not coding, I enjoy exploring new technologies, contributing to open-source projects, 
            and mentoring junior developers.
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            {['React', 'TypeScript', 'Node.js', 'UI/UX', 'API Design', 'Team Leadership'].map(skill => (
              <span
                key={skill}
                className="px-3 py-1 rounded-full text-sm bg-primary/10 text-primary font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
}