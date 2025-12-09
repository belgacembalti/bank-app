import React from 'react';
import { 
  Home, 
  Shield, 
  CreditCard, 
  Activity, 
  Settings, 
  Users,
  Database,
  BarChart3,
  LogOut
} from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  userRole: 'user' | 'admin';
}

export function Sidebar({ activeSection, onSectionChange, userRole }: SidebarProps) {
  const userMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'security', label: 'Security Center', icon: Shield },
    { id: 'cards', label: 'Virtual Cards', icon: CreditCard },
    { id: 'transactions', label: 'Transactions', icon: Activity },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const adminMenuItems = [
    { id: 'admin-dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'user-monitoring', label: 'User Monitoring', icon: Users },
    { id: 'biometric-audit', label: 'Biometric Audit', icon: Shield },
    { id: 'token-management', label: 'Token Management', icon: Database },
    { id: 'security-policies', label: 'Security Policies', icon: Settings },
  ];

  const menuItems = userRole === 'admin' ? adminMenuItems : userMenuItems;

  return (
    <aside className="w-64 bg-white dark:bg-navy-800 border-r border-gray-200 dark:border-navy-700 h-full overflow-y-auto">
      <div className="p-4">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                  ${isActive 
                    ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-navy-700'
                  }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-navy-700">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-danger-600 hover:bg-danger-50 dark:hover:bg-danger-900/20 transition-colors">
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
