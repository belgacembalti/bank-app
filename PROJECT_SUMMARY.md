# Banking Identity App - Full Stack Project

## Overview

This is a full-stack banking identity application with a React frontend and Django backend. The application features user authentication with biometric support, virtual card management, transaction tracking, and comprehensive security features.

## Project Structure

```
bank app/
├── Banking Identity App Design/     # React Frontend
│   ├── src/
│   │   ├── components/             # React components
│   │   ├── utils/
│   │   │   └── api.ts              # API client utility
│   │   └── ...
│   └── package.json
│
└── backend/                        # Django Backend
    ├── banking_backend/            # Django project settings
    ├── accounts/                   # User authentication app
    ├── banking/                    # Banking features app
    ├── security/                   # Security features app
    ├── admin_panel/                # Admin dashboard app
    ├── requirements.txt
    └── README.md
```

## Features

### Frontend (React + TypeScript)
- Modern UI with Tailwind CSS
- Authentication pages (Login, Register, OTP, Biometric)
- Banking dashboard with virtual cards
- Security dashboard with trust scores
- Admin dashboard with analytics
- Responsive design with dark mode support

### Backend (Django + SQLite)
- RESTful API with Django REST Framework
- JWT authentication
- User management with biometric support
- Virtual card generation and management
- Transaction tracking
- Security features (access logs, trusted devices, alerts)
- Admin analytics dashboard

## Quick Start

### Backend Setup

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Create virtual environment:
   ```bash
   python -m venv venv
   venv\Scripts\activate  # Windows
   # or
   source venv/bin/activate  # macOS/Linux
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Run migrations:
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

5. Create test data (optional):
   ```bash
   python setup.py
   ```
   This creates a test user:
   - Email: `test@example.com`
   - Password: `testpass123`

6. Start server:
   ```bash
   python manage.py runserver
   ```
   Backend runs on `http://localhost:8000`

### Frontend Setup

1. Navigate to frontend directory:
   ```bash
   cd "Banking Identity App Design"
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file:
   ```
   VITE_API_BASE_URL=http://localhost:8000/api
   ```

4. Start development server:
   ```bash
   npm run dev
   ```
   Frontend runs on `http://localhost:5173`

## API Endpoints

### Authentication
- `POST /api/auth/register/` - Register new user
- `POST /api/auth/login/` - Login user
- `POST /api/auth/verify-otp/` - Verify OTP code
- `POST /api/auth/facial-login/` - Facial recognition login
- `GET /api/auth/me/` - Get current user
- `POST /api/auth/biometric/` - Save biometric data
- `GET /api/auth/devices/` - Get trusted devices
- `DELETE /api/auth/devices/<id>/` - Delete trusted device

### Banking
- `GET /api/banking/dashboard/` - Get dashboard data
- `GET /api/banking/account/balance/` - Get account balance
- `GET /api/banking/cards/` - List virtual cards
- `POST /api/banking/cards/` - Create virtual card
- `GET /api/banking/cards/<id>/` - Get card details
- `GET /api/banking/transactions/` - List transactions

### Security
- `GET /api/security/dashboard/` - Get security dashboard
- `GET /api/security/access-logs/` - Get access logs
- `GET /api/security/alerts/` - Get security alerts

### Admin
- `GET /api/admin/dashboard/` - Admin dashboard (staff only)
- `GET /api/admin/users/` - User monitoring (staff only)
- `GET /api/admin/biometric-audit/` - Biometric audit (staff only)

## Database Models

### Accounts App
- **User** - Custom user model with biometric support
- **OTPCode** - OTP codes for 2FA
- **BiometricData** - Encrypted biometric templates
- **TrustedDevice** - Trusted devices for users

### Banking App
- **Account** - User bank accounts
- **VirtualCard** - Virtual payment cards
- **Transaction** - Financial transactions

### Security App
- **AccessLog** - Login and access attempts
- **SecurityAlert** - Security alerts and notifications

## Frontend Integration

The frontend includes an API client (`src/utils/api.ts`) that handles all API communication. See `INTEGRATION_EXAMPLE.md` for detailed integration examples.

### Basic Usage

```typescript
import { apiClient } from './utils/api';

// Login
const response = await apiClient.login('user@example.com', 'password', false);
if (response.data) {
  // Success - token is automatically stored
}

// Get dashboard
const dashboard = await apiClient.getDashboard();
if (dashboard.data) {
  // Use dashboard.data.balance, dashboard.data.virtual_cards, etc.
}
```

## Testing

### Test User Credentials
After running `python setup.py`:
- Email: `test@example.com`
- Password: `testpass123`

### Creating Admin User
```bash
python manage.py createsuperuser
```

## Development Notes

- CORS is configured for `localhost:5173` and `localhost:3000`
- JWT tokens expire after 24 hours (access) and 7 days (refresh)
- SQLite database is used for development
- All sensitive data should use environment variables in production

## Production Considerations

Before deploying:

1. **Security**
   - Change `SECRET_KEY` in `settings.py`
   - Set `DEBUG = False`
   - Configure proper `ALLOWED_HOSTS`
   - Use HTTPS
   - Set up proper CORS origins

2. **Database**
   - Use PostgreSQL or MySQL instead of SQLite
   - Set up database backups

3. **Email**
   - Configure email service for OTP delivery
   - Set up SMTP settings

4. **Environment Variables**
   - Use `python-decouple` or similar
   - Store secrets in environment variables

## Documentation

- `backend/README.md` - Backend setup and API documentation
- `backend/INTEGRATION.md` - Frontend-backend integration guide
- `Banking Identity App Design/INTEGRATION_EXAMPLE.md` - Code examples

## Technologies Used

### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- Radix UI
- Recharts
- Motion (Framer Motion)

### Backend
- Django 4.2
- Django REST Framework
- Django CORS Headers
- Simple JWT
- SQLite

## License

This is a development project. Update with appropriate license for production use.

