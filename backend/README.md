# Banking Identity App - Django Backend

Django REST API backend for the Banking Identity App with SQLite database.

## Features

- User authentication (Registration, Login, OTP, Facial Login)
- Biometric data management
- Virtual card generation and management
- Transaction tracking
- Security features (Access logs, Trusted devices, Security alerts)
- Admin dashboard with analytics

## Setup Instructions

### Prerequisites

- Python 3.8 or higher
- pip (Python package manager)

### Installation

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Create a virtual environment (recommended):**
   ```bash
   python -m venv venv
   ```

3. **Activate the virtual environment:**
   - On Windows:
     ```bash
     venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```bash
     source venv/bin/activate
     ```

4. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

5. **Run migrations:**
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

6. **Create a superuser (for admin access):**
   ```bash
   python manage.py createsuperuser
   ```
   Follow the prompts to create an admin user.

7. **Run the development server:**
   ```bash
   python manage.py runserver
   ```

The API will be available at `http://localhost:8000`

## API Endpoints

### Authentication (`/api/auth/`)
- `POST /api/auth/register/` - Register a new user
- `POST /api/auth/login/` - Login user
- `POST /api/auth/verify-otp/` - Verify OTP code
- `POST /api/auth/facial-login/` - Facial recognition login
- `GET /api/auth/me/` - Get current user
- `POST /api/auth/biometric/` - Save biometric data
- `GET /api/auth/devices/` - Get trusted devices
- `DELETE /api/auth/devices/<id>/` - Delete trusted device

### Banking (`/api/banking/`)
- `GET /api/banking/dashboard/` - Get banking dashboard data
- `GET /api/banking/account/balance/` - Get account balance
- `GET /api/banking/cards/` - List virtual cards
- `POST /api/banking/cards/` - Create virtual card
- `GET /api/banking/cards/<id>/` - Get virtual card details
- `GET /api/banking/transactions/` - List transactions

### Security (`/api/security/`)
- `GET /api/security/dashboard/` - Get security dashboard
- `GET /api/security/access-logs/` - Get access logs
- `GET /api/security/alerts/` - Get security alerts

### Admin (`/api/admin/`)
- `GET /api/admin/dashboard/` - Get admin dashboard (staff only)
- `GET /api/admin/users/` - List all users (staff only)
- `GET /api/admin/biometric-audit/` - Get biometric audit (staff only)

## Frontend Integration

The frontend is configured to connect to the backend API. Make sure:

1. The backend is running on `http://localhost:8000`
2. The frontend is configured to use the API base URL (default: `http://localhost:8000/api`)

You can set the API URL in the frontend by creating a `.env` file:
```
VITE_API_BASE_URL=http://localhost:8000/api
```

## Database

The project uses SQLite by default. The database file (`db.sqlite3`) will be created automatically when you run migrations.

## Admin Panel

Access the Django admin panel at `http://localhost:8000/admin/` using the superuser credentials you created.

## Development Notes

- CORS is configured to allow requests from `localhost:5173` and `localhost:3000`
- JWT tokens are used for authentication
- Access tokens expire after 24 hours
- Refresh tokens expire after 7 days

## Production Considerations

Before deploying to production:

1. Change `SECRET_KEY` in `settings.py`
2. Set `DEBUG = False`
3. Configure proper `ALLOWED_HOSTS`
4. Use a production database (PostgreSQL recommended)
5. Set up proper email service for OTP delivery
6. Configure HTTPS
7. Set up proper CORS origins
8. Use environment variables for sensitive settings

