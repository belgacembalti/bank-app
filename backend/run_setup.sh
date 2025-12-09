#!/bin/bash
# Setup script for the Django backend

echo "Setting up Django backend..."

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python -m venv venv
fi

# Activate virtual environment
echo "Activating virtual environment..."
source venv/bin/activate

# Install dependencies
echo "Installing dependencies..."
pip install -r requirements.txt

# Run migrations
echo "Running migrations..."
python manage.py makemigrations
python manage.py migrate

# Create superuser (optional)
echo "Do you want to create a superuser? (y/n)"
read -r response
if [ "$response" = "y" ]; then
    python manage.py createsuperuser
fi

# Create test data
echo "Do you want to create test data? (y/n)"
read -r response
if [ "$response" = "y" ]; then
    python setup.py
fi

echo "Setup complete!"
echo "Run 'python manage.py runserver' to start the server"

