import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Calendar, Filter, Eye, Trash2 } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { toast } from 'sonner';

interface Report {
  id: string;
  name: string;
  type: 'financial' | 'analytics' | 'performance' | 'user';
  date: string;
  size: string;
  status: 'ready' | 'generating' | 'failed';
}

const mockReports: Report[] = [
  { id: '1', name: 'Q4 Financial Summary', type: 'financial', date: '2024-01-15', size: '2.4 MB', status: 'ready' },
  { id: '2', name: 'User Analytics Report', type: 'analytics', date: '2024-01-14', size: '1.8 MB', status: 'ready' },
  { id: '3', name: 'Performance Metrics', type: 'performance', date: '2024-01-13', size: '856 KB', status: 'ready' },
  { id: '4', name: 'Monthly User Growth', type: 'user', date: '2024-01-12', size: '1.2 MB', status: 'generating' },
  { id: '5', name: 'Revenue Analysis', type: 'financial', date: '2024-01-11', size: '3.1 MB', status: 'ready' },
  { id: '6', name: 'Traffic Overview', type: 'analytics', date: '2024-01-10', size: '920 KB', status: 'failed' },
];

export default function Reports() {
  const [reports] = useState<Report[]>(mockReports);
  const [filter, setFilter] = useState<string>('all');

  const filteredReports = filter === 'all' ? reports : reports.filter(r => r.type === filter);

  const getTypeBadge = (type: Report['type']) => {
    const styles: Record<string, string> = {
      financial: 'bg-success/10 text-success',
      analytics: 'bg-primary/10 text-primary',
      performance: 'bg-warning/10 text-warning',
      user: 'bg-accent/20 text-accent-foreground',
    };
    return (
      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${styles[type]}`}>
        {type}
      </span>
    );
  };

  const getStatusIndicator = (status: Report['status']) => {
    switch (status) {
      case 'ready':
        return <span className="w-2 h-2 rounded-full bg-success" />;
      case 'generating':
        return <span className="w-2 h-2 rounded-full bg-warning animate-pulse" />;
      case 'failed':
        return <span className="w-2 h-2 rounded-full bg-destructive" />;
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
            <h1 className="text-3xl font-bold">Reports</h1>
            <p className="text-muted-foreground mt-1">
              View and download generated reports
            </p>
          </div>
          <button
            onClick={() => toast.info('Generate report dialog would open')}
            className="btn-primary flex items-center gap-2"
          >
            <FileText size={18} />
            Generate Report
          </button>
        </div>

        {/* Filters */}
        <div className="glass-card rounded-xl p-4 flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Filter size={18} />
            <span className="text-sm font-medium">Filter by type:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {['all', 'financial', 'analytics', 'performance', 'user'].map(type => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filter === type
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Reports Grid */}
        <div className="grid gap-4">
          {filteredReports.map((report, index) => (
            <motion.div
              key={report.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="glass-card rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-primary/10">
                  <FileText className="text-primary" size={24} />
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold">{report.name}</h3>
                    {getTypeBadge(report.type)}
                  </div>
                  <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>
                        {new Date(report.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                    <span>{report.size}</span>
                    <div className="flex items-center gap-1.5">
                      {getStatusIndicator(report.status)}
                      <span className="capitalize">{report.status}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toast.info('Preview report')}
                  className="p-2 rounded-lg hover:bg-secondary transition-colors"
                  title="Preview"
                >
                  <Eye size={18} className="text-muted-foreground" />
                </button>
                <button
                  onClick={() => toast.success('Download started')}
                  className="p-2 rounded-lg hover:bg-secondary transition-colors"
                  title="Download"
                  disabled={report.status !== 'ready'}
                >
                  <Download size={18} className={report.status === 'ready' ? 'text-primary' : 'text-muted-foreground/50'} />
                </button>
                <button
                  onClick={() => toast.error('Report deleted')}
                  className="p-2 rounded-lg hover:bg-destructive/10 transition-colors"
                  title="Delete"
                >
                  <Trash2 size={18} className="text-destructive" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredReports.length === 0 && (
          <div className="glass-card rounded-xl p-12 text-center">
            <FileText className="mx-auto mb-4 text-muted-foreground" size={48} />
            <h3 className="text-lg font-semibold mb-2">No reports found</h3>
            <p className="text-muted-foreground">
              No reports match the selected filter. Try a different filter or generate a new report.
            </p>
          </div>
        )}
      </motion.div>
    </DashboardLayout>
  );
}