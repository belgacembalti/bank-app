# Frontend Integration Examples

This file shows how to integrate the API client with your React components.

## Example 1: LoginPage Integration

Update `src/components/auth/LoginPage.tsx`:

```typescript
import React, { useState } from 'react';
import { apiClient } from '../../utils/api';
// ... other imports

export function LoginPage({ onNavigate }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [use2FA, setUse2FA] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    
    const response = await apiClient.login(email, password, use2FA);
    
    if (response.data) {
      if (response.data.otp_required) {
        // Store OTP code for demo (remove in production)
        if (response.data.otp_code) {
          console.log('OTP Code:', response.data.otp_code);
        }
        onNavigate('otp');
      } else {
        onNavigate('dashboard');
      }
    } else {
      setError(response.error || 'Login failed');
    }
    
    setLoading(false);
  };

  const handleFacialLogin = async () => {
    setLoading(true);
    const response = await apiClient.facialLogin();
    
    if (response.data) {
      onNavigate('dashboard');
    } else {
      setError(response.error || 'Facial login failed');
    }
    setLoading(false);
  };

  // ... rest of component
}
```

## Example 2: RegisterPage Integration

Update `src/components/auth/RegisterPage.tsx`:

```typescript
import { apiClient } from '../../utils/api';

const handleRegister = async () => {
  setLoading(true);
  setError('');
  
  if (password !== confirmPassword) {
    setError('Passwords do not match');
    setLoading(false);
    return;
  }

  const response = await apiClient.register(
    email,
    password,
    email.split('@')[0], // Use email prefix as username
    enableBiometric
  );

  if (response.data) {
    if (enableBiometric) {
      onNavigate('biometric-onboarding');
    } else {
      onNavigate('dashboard');
    }
  } else {
    setError(response.error || 'Registration failed');
  }
  
  setLoading(false);
};
```

## Example 3: OTPPage Integration

Update `src/components/auth/OTPPage.tsx`:

```typescript
import { apiClient } from '../../utils/api';

const handleVerify = async () => {
  setLoading(true);
  const code = otp.join('');
  
  const response = await apiClient.verifyOTP(code);
  
  if (response.data) {
    onNavigate('dashboard');
  } else {
    setError(response.error || 'Invalid OTP code');
  }
  
  setLoading(false);
};
```

## Example 4: BankingDashboard Integration

Update `src/components/banking/BankingDashboard.tsx`:

```typescript
import { useEffect, useState } from 'react';
import { apiClient } from '../../utils/api';

export function BankingDashboard() {
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showBalance, setShowBalance] = useState(true);
  const [showCardModal, setShowCardModal] = useState(false);

  useEffect(() => {
    const fetchDashboard = async () => {
      const response = await apiClient.getDashboard();
      if (response.data) {
        setDashboardData(response.data);
      }
      setLoading(false);
    };
    fetchDashboard();
  }, []);

  const handleCreateCard = async () => {
    const response = await apiClient.createVirtualCard();
    if (response.data) {
      // Refresh dashboard
      const dashboardResponse = await apiClient.getDashboard();
      if (dashboardResponse.data) {
        setDashboardData(dashboardResponse.data);
      }
      setShowCardModal(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!dashboardData) {
    return <div>Error loading dashboard</div>;
  }

  return (
    <div className="space-y-6">
      {/* Use dashboardData.balance, dashboardData.virtual_cards, etc. */}
      <Card className="bg-gradient-to-br from-navy-700 to-navy-900">
        <div className="flex items-start justify-between mb-8">
          <div>
            <p className="text-gray-300 mb-2">Total Balance</p>
            <div className="flex items-center gap-3">
              {showBalance ? (
                <h2 className="text-white">${dashboardData.balance.toFixed(2)}</h2>
              ) : (
                <h2 className="text-white">••••••</h2>
              )}
              {/* ... */}
            </div>
          </div>
        </div>
        {/* ... */}
      </Card>

      {/* Virtual Cards */}
      <Card>
        <div className="grid md:grid-cols-2 gap-4">
          {dashboardData.virtual_cards.map((card: any) => (
            <div key={card.id} className="bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl p-6 text-white">
              {/* Card details */}
            </div>
          ))}
        </div>
      </Card>

      {/* Transactions */}
      <Card>
        <div className="space-y-3">
          {dashboardData.recent_transactions.map((transaction: any) => (
            <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-navy-700 rounded-lg">
              {/* Transaction details */}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
```

## Example 5: SecurityDashboard Integration

Update `src/components/security/SecurityDashboard.tsx`:

```typescript
import { useEffect, useState } from 'react';
import { apiClient } from '../../utils/api';

export function SecurityDashboard() {
  const [securityData, setSecurityData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSecurityData = async () => {
      const response = await apiClient.getSecurityDashboard();
      if (response.data) {
        setSecurityData(response.data);
      }
      setLoading(false);
    };
    fetchSecurityData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!securityData) return <div>Error loading security data</div>;

  return (
    <div className="space-y-6">
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-navy-900 dark:text-white">Trust Score</h3>
          <Badge variant="success">Excellent</Badge>
        </div>
        <TrustScore score={securityData.trust_score} size="lg" />
        {/* ... */}
      </Card>

      {/* Active Sessions */}
      <Card>
        <div className="space-y-4">
          {securityData.active_sessions_list.map((session: any) => (
            <div key={session.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-navy-700 rounded-lg">
              {/* Session details */}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
```

## Example 6: AdminDashboard Integration

Update `src/components/admin/AdminDashboard.tsx`:

```typescript
import { useEffect, useState } from 'react';
import { apiClient } from '../../utils/api';

export function AdminDashboard() {
  const [adminData, setAdminData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminData = async () => {
      const response = await apiClient.getAdminDashboard();
      if (response.data) {
        setAdminData(response.data);
      }
      setLoading(false);
    };
    fetchAdminData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!adminData) return <div>Error loading admin data</div>;

  return (
    <div className="space-y-6">
      {/* Use adminData.total_users, adminData.login_trends, etc. */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card>
          <h4>Total Users</h4>
          <p className="text-3xl">{adminData.total_users}</p>
        </Card>
        {/* ... */}
      </div>

      {/* Charts using adminData.login_trends, adminData.risk_distribution, etc. */}
    </div>
  );
}
```

## Error Handling Pattern

Always wrap API calls in try-catch and handle errors:

```typescript
try {
  const response = await apiClient.someMethod();
  if (response.error) {
    // Show error to user
    setError(response.error);
  } else {
    // Use response.data
    setData(response.data);
  }
} catch (error) {
  setError('An unexpected error occurred');
}
```

## Loading States

Always show loading states during API calls:

```typescript
const [loading, setLoading] = useState(false);

const handleAction = async () => {
  setLoading(true);
  try {
    const response = await apiClient.someMethod();
    // Handle response
  } finally {
    setLoading(false);
  }
};
```

