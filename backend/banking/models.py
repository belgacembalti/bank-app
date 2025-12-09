from django.db import models
from accounts.models import User
from django.utils import timezone
import random
import string


class Account(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='account')
    balance = models.DecimalField(max_digits=12, decimal_places=2, default=0.00)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Account for {self.user.email}"


class VirtualCard(models.Model):
    CARD_TYPES = [
        ('single_use', 'Single Use'),
        ('recurring', 'Recurring'),
    ]

    STATUS_CHOICES = [
        ('active', 'Active'),
        ('inactive', 'Inactive'),
        ('expired', 'Expired'),
        ('blocked', 'Blocked'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='virtual_cards')
    card_number = models.CharField(max_length=19)  # Formatted: XXXX XXXX XXXX XXXX
    expiry_month = models.IntegerField()
    expiry_year = models.IntegerField()
    cvv = models.CharField(max_length=3)
    token_id = models.CharField(max_length=50, unique=True)
    card_type = models.CharField(max_length=20, choices=CARD_TYPES, default='single_use')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='active')
    spending_limit = models.DecimalField(max_digits=10, decimal_places=2, default=1000.00)
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField()

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Card {self.card_number[-4:]} - {self.user.email}"

    @staticmethod
    def generate_card_number():
        """Generate a random 16-digit card number"""
        number = ''.join([str(random.randint(0, 9)) for _ in range(16)])
        return ' '.join([number[i:i+4] for i in range(0, 16, 4)])

    @staticmethod
    def generate_token_id():
        """Generate a unique token ID"""
        return f"TKN-{''.join(random.choices(string.ascii_uppercase + string.digits, k=9))}"


class Transaction(models.Model):
    TRANSACTION_TYPES = [
        ('deposit', 'Deposit'),
        ('withdrawal', 'Withdrawal'),
        ('purchase', 'Purchase'),
        ('transfer', 'Transfer'),
        ('blocked', 'Blocked'),
    ]

    RISK_LEVELS = [
        ('low', 'Low'),
        ('medium', 'Medium'),
        ('high', 'High'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='transactions')
    virtual_card = models.ForeignKey(VirtualCard, on_delete=models.SET_NULL, null=True, blank=True, related_name='transactions')
    merchant = models.CharField(max_length=255)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    transaction_type = models.CharField(max_length=20, choices=TRANSACTION_TYPES)
    verification_score = models.IntegerField(default=100)
    risk_level = models.CharField(max_length=20, choices=RISK_LEVELS, default='low')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.transaction_type} - {self.merchant} - ${self.amount}"

