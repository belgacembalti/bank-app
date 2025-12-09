@echo off
REM Setup script for the Django backend (Windows)

echo Setting up Django backend...

REM Check if virtual environment exists
if not exist "venv" (
    echo Creating virtual environment...
    python -m venv venv
)

REM Activate virtual environment
echo Activating virtual environment...
call venv\Scripts\activate.bat

REM Install dependencies
echo Installing dependencies...
pip install -r requirements.txt

REM Run migrations
echo Running migrations...
python manage.py makemigrations
python manage.py migrate

REM Create test data
echo Creating test data...
python setup.py

echo Setup complete!
echo Run 'python manage.py runserver' to start the server
pause

