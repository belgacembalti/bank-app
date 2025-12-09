# Frontend-Backend Integration Guide

This guide explains how to integrate the React frontend with the Django backend.

## Setup

### Backend Setup
1. Navigate to the backend directory
2. Install dependencies: `pip install -r requirements.txt`
3. Run migrations: `python manage.py migrate`
4. Create superuser: `python manage.py createsuperuser`
5. Start server: `python manage.py runserver`

The backend will run on `http://localhost:8000`

### Frontend Setup
1. Navigate to the frontend directory (`Banking Identity App Design`)
2. Install dependencies: `npm install`
3. Create a `.env` file with:
   ```
   VITE_API_BASE_URL=http://localhost:8000/api
   ```
4. Start dev server: `npm run dev`

The frontend will run on `http://localhost:5173` (or port 3000 if configured)

## API Integration

The frontend includes an API client utility (`src/utils/api.ts`) that handles all API calls. Here's how to use it:

### Example: Login

```typescript
import { apiClient } from './utils/api';

// Login
const response = await apiClient.login('user@example.com', 'password', false);

if (response.data) {
  // Login successful
  const { user, tokens } = response.data;
  // Token is automatically stored
} else {
  // Handle error
  console.error(response.error);
}
```

### Example: Get Dashboard Data

```typescript
import { apiClient } from './utils/api';

// Get banking dashboard
const response = await apiClient.getDashboard();

if (response.data) {
  const { balance, income, expenses, virtual_cards, recent_transactions } = response.data;
  // Use the data
}
```

## Authentication Flow

1. **Registration:**
   - User registers with email, password, username
   - Optionally enables biometric
   - Receives JWT tokens

2. **Login:**
   - User logs in with email/password
   - Can enable 2FA (OTP)
   - Receives JWT tokens

3. **OTP Verification:**
   - If 2FA enabled, user enters OTP
   - Receives JWT tokens

4. **Facial Login:**
   - User uses facial recognition
   - Receives JWT tokens

5. **Token Usage:**
   - All subsequent requests include `Authorization: Bearer <token>` header
   - Token is automatically added by the API client

## Updating Frontend Components

To integrate API calls in your components:

### 1. Update LoginPage.tsx

```typescript
import { apiClient } from '../utils/api';

const handleLogin = async () => {
  setLoading(true);
  const response = await apiClient.login(email, password, use2FA);
  
  if (response.data) {
    if (response.data.otp_required) {
      onNavigate('otp');
    } else {
      onNavigate('dashboard');
    }
  } else {
    // Show error
    alert(response.error);
  }
  setLoading(false);
};
```

### 2. Update RegisterPage.tsx

```typescript
import { apiClient } from '../utils/api';

const handleRegister = async () => {
  setLoading(true);
  const response = await apiClient.register(email, password, username, enableBiometric);
  
  if (response.data) {
    if (enableBiometric) {
      onNavigate('biometric-onboarding');
    } else {
      onNavigate('dashboard');
    }
  } else {
    alert(response.error);
  }
  setLoading(false);
};
```

### 3. Update BankingDashboard.tsx

```typescript
import { apiClient } from '../utils/api';
import { useEffect, useState } from 'react';

export function BankingDashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <div>Loading...</div>;
  if (!dashboardData) return <div>Error loading data</div>;

  // Use dashboardData.balance, dashboardData.virtual_cards, etc.
  // ...
}
```

## API Response Formats

### Success Response
```json
{
  "data": {
    // Response data
  }
}
```

### Error Response
```json
{
  "error": "Error message"
}
```

## Common API Endpoints

### Authentication
- `POST /api/auth/register/` - Register
- `POST /api/auth/login/` - Login
- `POST /api/auth/verify-otp/` - Verify OTP
- `POST /api/auth/facial-login/` - Facial login
- `GET /api/auth/me/` - Get current user

### Banking
- `GET /api/banking/dashboard/` - Dashboard data
- `GET /api/banking/cards/` - List cards
- `POST /api/banking/cards/` - Create card
- `GET /api/banking/transactions/` - List transactions

### Security
- `GET /api/security/dashboard/` - Security dashboard
- `GET /api/security/access-logs/` - Access logs
- `GET /api/security/alerts/` - Security alerts

### Admin
- `GET /api/admin/dashboard/` - Admin dashboard (staff only)
- `GET /api/admin/users/` - User monitoring (staff only)

## Error Handling

Always check for errors in API responses:

```typescript
const response = await apiClient.someMethod();

if (response.error) {
  // Handle error
  console.error(response.error);
  // Show error to user
} else {
  // Use response.data
}
```

## CORS Configuration

CORS is already configured in the backend to allow requests from:
- `http://localhost:5173`
- `http://localhost:3000`

If you're using a different port, update `CORS_ALLOWED_ORIGINS` in `backend/banking_backend/settings.py`.

