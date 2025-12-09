import React, { useState, useEffect } from 'react';

// Auth Components
import { LandingPage } from './components/auth/LandingPage';
import { RegisterPage } from './components/auth/RegisterPage';
import { LoginPage } from './components/auth/LoginPage';
import { BiometricOnboarding } from './components/auth/BiometricOnboarding';
import { FacialLogin } from './components/auth/FacialLogin';
import { OTPPage } from './components/auth/OTPPage';

// Layout Components
import { Navigation } from './components/layout/Navigation';
import { Sidebar } from './components/layout/Sidebar';

// Security Components
import { SecurityDashboard } from './components/security/SecurityDashboard';
import { TrustedDevices } from './components/security/TrustedDevices';
import { AccessLogs } from './components/security/AccessLogs';

// Banking Components
import { BankingDashboard } from './components/banking/BankingDashboard';
import { VirtualCardDetails } from './components/banking/VirtualCardDetails';

// Admin Components
import { AdminDashboard } from './components/admin/AdminDashboard';
import { UserMonitoring } from './components/admin/UserMonitoring';
import { BiometricAudit } from './components/admin/BiometricAudit';
import { SecurityPolicies } from './components/admin/SecurityPolicies';

// DevOps Components
import { SystemHealth } from './components/devops/SystemHealth';
import { DesignSystemShowcase } from './components/design-system/DesignSystemShowcase';

export default function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [userRole, setUserRole] = useState<'user' | 'admin'>('user');
  const [showDesignSystem, setShowDesignSystem] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    if (page === 'admin-portal') {
      setUserRole('admin');
      setActiveSection('admin-dashboard');
    } else if (page === 'dashboard') {
      setActiveSection('dashboard');
    }
  };

  // Auth Pages
  if (currentPage === 'landing') {
    return <LandingPage onNavigate={handleNavigate} />;
  }

  if (currentPage === 'register') {
    return <RegisterPage onNavigate={handleNavigate} />;
  }

  if (currentPage === 'login') {
    return <LoginPage onNavigate={handleNavigate} />;
  }

  if (currentPage === 'biometric-onboarding') {
    return <BiometricOnboarding onNavigate={handleNavigate} />;
  }

  if (currentPage === 'facial-login') {
    return <FacialLogin onNavigate={handleNavigate} />;
  }

  if (currentPage === 'otp') {
    return <OTPPage onNavigate={handleNavigate} />;
  }

  // Main App (Dashboard)
  const renderContent = () => {
    // User Sections
    if (activeSection === 'dashboard') {
      return <BankingDashboard />;
    }
    if (activeSection === 'security') {
      return <SecurityDashboard />;
    }
    if (activeSection === 'cards') {
      return <VirtualCardDetails />;
    }
    if (activeSection === 'transactions') {
      return <AccessLogs />;
    }
    if (activeSection === 'settings') {
      return <TrustedDevices />;
    }

    // Admin Sections
    if (activeSection === 'admin-dashboard') {
      return <AdminDashboard />;
    }
    if (activeSection === 'user-monitoring') {
      return <UserMonitoring />;
    }
    if (activeSection === 'biometric-audit') {
      return <BiometricAudit />;
    }
    if (activeSection === 'token-management') {
      return <SystemHealth />;
    }
    if (activeSection === 'security-policies') {
      return <SecurityPolicies />;
    }

    return <BankingDashboard />;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-navy-900">
      <Navigation darkMode={darkMode} toggleDarkMode={() => setDarkMode(!darkMode)} />
      
      <div className="flex h-[calc(100vh-73px)]">
        <Sidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          userRole={userRole}
        />
        
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>

      {/* Quick Access FAB - Demo/Development Features */}
      <div className="fixed bottom-8 right-8 flex flex-col gap-3">
        <button
          onClick={() => setUserRole(userRole === 'user' ? 'admin' : 'user')}
          className="w-14 h-14 bg-primary-600 hover:bg-primary-700 text-white rounded-full shadow-xl flex items-center justify-center transition-all hover:scale-110"
          title={`Switch to ${userRole === 'user' ? 'Admin' : 'User'} View`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
            />
          </svg>
        </button>
        <button
          onClick={() => handleNavigate('landing')}
          className="w-14 h-14 bg-navy-700 hover:bg-navy-800 text-white rounded-full shadow-xl flex items-center justify-center transition-all hover:scale-110"
          title="Back to Login"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
        </button>
        <button
          onClick={() => setShowDesignSystem(!showDesignSystem)}
          className="w-14 h-14 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-xl flex items-center justify-center transition-all hover:scale-110"
          title="Toggle Design System Showcase"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </button>
      </div>

      {/* Design System Showcase */}
      {showDesignSystem && (
        <div className="fixed inset-0 z-50 bg-gray-50 dark:bg-navy-900 overflow-y-auto">
          <div className="sticky top-0 bg-white dark:bg-navy-800 border-b border-gray-200 dark:border-navy-700 px-6 py-4 flex items-center justify-between z-10">
            <h2 className="text-navy-900 dark:text-white">Design System Showcase</h2>
            <button
              onClick={() => setShowDesignSystem(false)}
              className="px-4 py-2 bg-danger-600 hover:bg-danger-700 text-white rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
          <DesignSystemShowcase />
        </div>
      )}
    </div>
  );
}