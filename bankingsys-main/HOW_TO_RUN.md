# How to Run the Banking Identity Project

## Prerequisites

1. ✅ Python installed (Python 3.8+)
2. ✅ Node.js and npm installed
3. ✅ WAMP Server installed and running (MySQL service active)
4. ✅ Virtual environment created and dependencies installed

## Step-by-Step Instructions

### Part 1: Setup MySQL Database (One-time setup)

1. **Open phpMyAdmin**
   - Go to: `http://localhost/phpmyadmin`
   - Or click WAMP icon → phpMyAdmin

2. **Create Database**
   - Click "New" in left sidebar
   - Database name: `banking_identity_db`
   - Collation: `utf8mb4_general_ci`
   - Click "Create"

3. **Verify Database Created**
   - You should see `banking_identity_db` in the left sidebar

### Part 2: Run Backend (Django)

1. **Open Terminal/PowerShell**

2. **Navigate to backend folder**
   ```bash
   cd backend
   ```

3. **Activate Virtual Environment**
   ```bash
   # Windows
   venv\Scripts\activate
   
   # You should see (venv) in your terminal prompt
   ```

4. **Check MySQL Password** (if needed)
   - Open `backend/banking_identity/settings.py`
   - If your MySQL has a password, update line with `'PASSWORD': ''` to your password
   - Default WAMP has no password, so leave it as `''`

5. **Run Migrations** (if not done already)
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

6. **Start Django Server**
   ```bash
   python manage.py runserver
   ```

7. **Verify Backend is Running**
   - You should see: `Starting development server at http://127.0.0.1:8000/`
   - Open browser: `http://localhost:8000/api/auth/register/`
   - You should see a page (even if it shows an error, that means server is running)

**✅ Backend is now running on `http://localhost:8000`**

### Part 3: Run Frontend (React)

1. **Open a NEW Terminal/PowerShell window** (keep backend running)

2. **Navigate to project root**
   ```bash
   cd Banking-Identity-main
   # or wherever your project is located
   ```

3. **Install Dependencies** (if not done already)
   ```bash
   npm install
   ```

4. **Start Frontend Server**
   ```bash
   npm run dev
   ```

5. **Verify Frontend is Running**
   - You should see: `Local: http://localhost:5173/` (or port 3000)
   - The browser should automatically open
   - If not, manually open: `http://localhost:5173`

**✅ Frontend is now running**

## Testing the Application

### Test Registration:

1. On the frontend, click "Create Account" or navigate to register page
2. Fill in the form:
   - Email: `test@example.com`
   - Password: `TestPass123`
   - Confirm Password: `TestPass123`
   - Toggle biometric (optional)
3. Click "Create Secure Account"
4. **Check:**
   - Browser console (F12) for API response
   - Django terminal for request logs
   - Should navigate to dashboard or biometric onboarding

### Test Login:

1. Use the email and password from registration
2. Go to Login page
3. Enter credentials
4. Click "Sign In"
5. Should navigate to dashboard on success

## Quick Command Reference

### Backend Commands:
```bash
# Activate venv
venv\Scripts\activate

# Run migrations
python manage.py makemigrations
python manage.py migrate

# Start server
python manage.py runserver

# Create admin user (optional)
python manage.py createsuperuser
```

### Frontend Commands:
```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

## Troubleshooting

### Backend won't start:

**Error: "Module not found"**
```bash
# Make sure venv is activated and dependencies installed
venv\Scripts\activate
pip install -r requirements.txt
```

**Error: "Can't connect to MySQL"**
- Check WAMP MySQL service is running (green icon)
- Verify database `banking_identity_db` exists in phpMyAdmin
- Check password in `settings.py` matches your MySQL password

**Error: "No module named 'pymysql'"**
```bash
pip install PyMySQL
```

### Frontend won't start:

**Error: "Port already in use"**
- Change port in `vite.config.ts` or kill the process using the port

**Error: "Cannot connect to backend"**
- Make sure Django server is running on port 8000
- Check `API_BASE_URL` in `src/services/api.ts` is `http://localhost:8000/api`

### CORS Errors:

- Make sure Django server is running
- Check `CORS_ALLOWED_ORIGINS` in `backend/banking_identity/settings.py` includes your frontend port

## Running Both Servers

You need **TWO terminal windows**:

**Terminal 1 (Backend):**
```bash
cd backend
venv\Scripts\activate
python manage.py runserver
```

**Terminal 2 (Frontend):**
```bash
cd Banking-Identity-main
npm run dev
```

Both should be running simultaneously!

## Stopping Servers

- **Backend:** Press `CTRL+C` in the backend terminal
- **Frontend:** Press `CTRL+C` in the frontend terminal

## Next Steps

- Access Django admin: `http://localhost:8000/admin/` (create superuser first)
- View API endpoints: `http://localhost:8000/api/auth/register/` or `/login/`
- Check database: `http://localhost/phpmyadmin` → `banking_identity_db`



