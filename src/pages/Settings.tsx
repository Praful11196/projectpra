import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Bell, Shield, Palette, Globe, Save } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

type SettingsTab = 'profile' | 'notifications' | 'security' | 'appearance' | 'language';

const tabs = [
  { id: 'profile' as SettingsTab, label: 'Profile', icon: User },
  { id: 'notifications' as SettingsTab, label: 'Notifications', icon: Bell },
  { id: 'security' as SettingsTab, label: 'Security', icon: Shield },
  { id: 'appearance' as SettingsTab, label: 'Appearance', icon: Palette },
  { id: 'language' as SettingsTab, label: 'Language', icon: Globe },
];

export default function Settings() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: 'Software developer passionate about creating beautiful interfaces.',
    emailNotifications: true,
    pushNotifications: false,
    weeklyDigest: true,
    securityAlerts: true,
  });

  const handleSave = () => {
    toast.success('Settings saved successfully!');
  };

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground mt-1">
            Manage your account preferences and settings
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Tabs */}
          <div className="lg:w-64 shrink-0">
            <nav className="glass-card rounded-xl p-2 space-y-1">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    'w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200',
                    activeTab === tab.id
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                  )}
                >
                  <tab.icon size={18} />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-card rounded-xl p-6"
            >
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">Profile Settings</h2>
                  
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-primary font-bold text-2xl">
                        {formData.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <button className="btn-secondary text-sm">Change Avatar</button>
                      <p className="text-xs text-muted-foreground mt-2">
                        JPG, PNG or GIF. Max size 2MB
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Full Name</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="form-input"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="form-input"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Bio</label>
                      <textarea
                        value={formData.bio}
                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                        className="form-input min-h-24 resize-none"
                        rows={3}
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">Notification Preferences</h2>
                  
                  <div className="space-y-4">
                    {[
                      { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive notifications via email' },
                      { key: 'pushNotifications', label: 'Push Notifications', desc: 'Receive push notifications in browser' },
                      { key: 'weeklyDigest', label: 'Weekly Digest', desc: 'Get a weekly summary of activity' },
                      { key: 'securityAlerts', label: 'Security Alerts', desc: 'Get notified about security events' },
                    ].map(item => (
                      <div key={item.key} className="flex items-center justify-between p-4 rounded-lg bg-secondary/30">
                        <div>
                          <p className="font-medium">{item.label}</p>
                          <p className="text-sm text-muted-foreground">{item.desc}</p>
                        </div>
                        <button
                          onClick={() => setFormData({ ...formData, [item.key]: !formData[item.key as keyof typeof formData] })}
                          className={cn(
                            'w-12 h-6 rounded-full transition-colors relative',
                            formData[item.key as keyof typeof formData] ? 'bg-primary' : 'bg-muted'
                          )}
                        >
                          <span
                            className={cn(
                              'absolute top-1 w-4 h-4 rounded-full bg-white transition-transform',
                              formData[item.key as keyof typeof formData] ? 'translate-x-7' : 'translate-x-1'
                            )}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'security' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">Security Settings</h2>
                  
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-secondary/30">
                      <h3 className="font-medium mb-1">Change Password</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Update your password to keep your account secure
                      </p>
                      <button className="btn-secondary text-sm">Change Password</button>
                    </div>
                    
                    <div className="p-4 rounded-lg bg-secondary/30">
                      <h3 className="font-medium mb-1">Two-Factor Authentication</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Add an extra layer of security to your account
                      </p>
                      <button className="btn-primary text-sm">Enable 2FA</button>
                    </div>
                    
                    <div className="p-4 rounded-lg bg-secondary/30">
                      <h3 className="font-medium mb-1">Active Sessions</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Manage your active sessions across devices
                      </p>
                      <button className="btn-ghost text-sm">View Sessions</button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'appearance' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">Appearance Settings</h2>
                  
                  <div>
                    <label className="block text-sm font-medium mb-4">Theme</label>
                    <div className="grid grid-cols-3 gap-4">
                      {['Light', 'Dark', 'System'].map(theme => (
                        <button
                          key={theme}
                          className={cn(
                            'p-4 rounded-lg border-2 transition-all text-center',
                            theme === 'Light'
                              ? 'border-primary bg-primary/5'
                              : 'border-border hover:border-muted-foreground'
                          )}
                        >
                          <span className="font-medium">{theme}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'language' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">Language & Region</h2>
                  
                  <div className="grid gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Language</label>
                      <select className="form-input">
                        <option>English (US)</option>
                        <option>English (UK)</option>
                        <option>Spanish</option>
                        <option>French</option>
                        <option>German</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Timezone</label>
                      <select className="form-input">
                        <option>UTC-08:00 Pacific Time</option>
                        <option>UTC-05:00 Eastern Time</option>
                        <option>UTC+00:00 GMT</option>
                        <option>UTC+01:00 Central European Time</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Date Format</label>
                      <select className="form-input">
                        <option>MM/DD/YYYY</option>
                        <option>DD/MM/YYYY</option>
                        <option>YYYY-MM-DD</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-6 pt-6 border-t border-border flex justify-end">
                <button onClick={handleSave} className="btn-primary flex items-center gap-2">
                  <Save size={18} />
                  Save Changes
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
}