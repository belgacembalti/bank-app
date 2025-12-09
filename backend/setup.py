#!/usr/bin/env python
"""
Setup script to initialize the Django backend
"""
import os
import sys
import django

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'banking_backend.settings')
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
django.setup()

from django.contrib.auth import get_user_model
from accounts.models import BiometricData
from banking.models import Account, VirtualCard, Transaction
from security.models import AccessLog, SecurityAlert
from django.utils import timezone
from datetime import timedelta
import random

User = get_user_model()


def create_test_data():
    """Create test data for development"""
    print("Creating test data...")
    
    # Create test user if doesn't exist
    user, created = User.objects.get_or_create(
        email='test@example.com',
        defaults={
            'username': 'testuser',
            'is_biometric_enabled': True,
            'trust_score': 92,
        }
    )
    if created:
        user.set_password('testpass123')
        user.save()
        print(f"Created test user: {user.email} (password: testpass123)")
    else:
        print(f"Test user already exists: {user.email}")
    
    # Create account
    account, created = Account.objects.get_or_create(
        user=user,
        defaults={'balance': 24532.18}
    )
    if created:
        print(f"Created account with balance: ${account.balance}")
    
    # Create virtual cards
    if not VirtualCard.objects.filter(user=user).exists():
        card1 = VirtualCard.objects.create(
            user=user,
            card_number='4532 1234 5678 9010',
            expiry_month=12,
            expiry_year=2025,
            cvv='123',
            token_id='TKN-ABC123XYZ',
            status='active',
            spending_limit=1000.00,
            expires_at=timezone.now() + timedelta(days=365)
        )
        print(f"Created virtual card: {card1.card_number[-4:]}")
    
    # Create sample transactions
    if not Transaction.objects.filter(user=user).exists():
        transactions = [
            {
                'merchant': 'Apple Store',
                'amount': -299.99,
                'transaction_type': 'purchase',
                'verification_score': 98,
                'risk_level': 'low',
            },
            {
                'merchant': 'Salary Deposit',
                'amount': 5000.00,
                'transaction_type': 'deposit',
                'verification_score': 100,
                'risk_level': 'low',
            },
            {
                'merchant': 'Amazon',
                'amount': -45.32,
                'transaction_type': 'purchase',
                'verification_score': 95,
                'risk_level': 'low',
            },
            {
                'merchant': 'Suspicious Transaction',
                'amount': -1200.00,
                'transaction_type': 'blocked',
                'verification_score': 23,
                'risk_level': 'high',
            },
        ]
        
        for i, txn_data in enumerate(transactions):
            Transaction.objects.create(
                user=user,
                merchant=txn_data['merchant'],
                amount=txn_data['amount'],
                transaction_type=txn_data['transaction_type'],
                verification_score=txn_data['verification_score'],
                risk_level=txn_data['risk_level'],
                created_at=timezone.now() - timedelta(days=len(transactions)-i)
            )
        print(f"Created {len(transactions)} sample transactions")
    
    # Create biometric data
    if not BiometricData.objects.filter(user=user).exists():
        BiometricData.objects.create(
            user=user,
            encrypted_data='encrypted_biometric_template_here',
            is_active=True,
            last_verified_at=timezone.now() - timedelta(minutes=2)
        )
        print("Created biometric data")
    
    # Create access logs
    if not AccessLog.objects.filter(user=user).exists():
        AccessLog.objects.create(
            user=user,
            device_name='iPhone 14 Pro',
            ip_address='192.168.1.1',
            location='New York, US',
            status='success',
            created_at=timezone.now() - timedelta(minutes=2)
        )
        AccessLog.objects.create(
            user=user,
            device_name='MacBook Pro',
            ip_address='192.168.1.2',
            location='New York, US',
            status='success',
            created_at=timezone.now() - timedelta(hours=1)
        )
        print("Created access logs")
    
    print("\nTest data created successfully!")
    print("\nYou can now login with:")
    print(f"  Email: {user.email}")
    print(f"  Password: testpass123")


if __name__ == '__main__':
    create_test_data()

