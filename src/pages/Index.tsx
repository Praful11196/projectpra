import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Zap, Users, BarChart3, Lock, Globe } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Role-Based Access',
    description: 'Secure dashboards with granular permissions for admins, moderators, and users.',
  },
  {
    icon: BarChart3,
    title: 'Advanced Analytics',
    description: 'Track performance with real-time charts, insights, and comprehensive reports.',
  },
  {
    icon: Users,
    title: 'User Management',
    description: 'Easily manage users, track activity, and control access across your platform.',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Built with modern technologies for blazing fast performance and smooth UX.',
  },
  {
    icon: Lock,
    title: 'Secure by Design',
    description: 'Enterprise-grade security with authentication flows and data protection.',
  },
  {
    icon: Globe,
    title: 'API Ready',
    description: 'Seamlessly integrate with any backend through our RESTful API architecture.',
  },
];

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold">AI</span>
            </div>
            <span className="text-xl font-bold"> AI</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/login" className="btn-ghost px-4 py-2 text-sm">
              Sign In
            </Link>
            <Link to="/signup" className="btn-primary px-4 py-2 text-sm">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-1/4 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute bottom-20 right-1/4 w-80 h-80 rounded-full bg-primary/5 blur-3xl" />
        </div>
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary mb-6">
              🚀 Enterprise Platform Ready
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              Build Powerful{' '}
              <span className="gradient-text">Dashboards</span>
              <br />
              in Minutes
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              A complete frontend solution with role-based access, authentication, 
              analytics, and beautiful UI components. Perfect for hackathons and enterprise projects.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/signup" className="btn-primary flex items-center gap-2 text-lg">
                Start Building
                <ArrowRight size={20} />
              </Link>
              <Link to="/login" className="btn-secondary flex items-center gap-2 text-lg">
                View Demo
              </Link>
            </div>
          </motion.div>

          {/* Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-16 relative"
          >
            <div className="glass-card rounded-2xl p-2 shadow-2xl border border-border/50">
              <div className="rounded-xl bg-gradient-to-br from-background to-secondary/50 p-8 min-h-[400px] flex items-center justify-center">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-3xl">
                  {[
                    { label: 'Total Users', value: '12,847', color: 'bg-primary/20' },
                    { label: 'Revenue', value: '$48.5K', color: 'bg-success/20' },
                    { label: 'Growth', value: '+23.4%', color: 'bg-warning/20' },
                    { label: 'Active', value: '1,429', color: 'bg-accent/20' },
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className={`${stat.color} rounded-xl p-4 text-center`}
                    >
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-20 bg-primary/20 blur-3xl rounded-full" />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Built with modern best practices for responsive design, accessibility, 
              and seamless integration.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card rounded-xl p-6 hover:shadow-lg transition-all duration-300"
              >
                <div className="p-3 rounded-xl bg-primary/10 w-fit mb-4">
                  <feature.icon className="text-primary" size={24} />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center glass-card rounded-2xl p-12 relative overflow-hidden"
        >
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-primary/5 blur-3xl" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Sign up now and explore the full potential of AI platform.
            Built for Business , ready for production.
          </p>
          <Link to="/signup" className="btn-primary inline-flex items-center gap-2 text-lg">
            Create Free Account
            <ArrowRight size={20} />
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">AI</span>
            </div>
            <span className="font-semibold"> Artifical Intelligence</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2025 AI Platform. Built for  Business.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/login" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Login
            </Link>
            <Link to="/signup" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Sign Up
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}