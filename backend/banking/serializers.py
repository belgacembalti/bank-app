from rest_framework import serializers
from .models import Account, VirtualCard, Transaction
from accounts.serializers import UserSerializer
from datetime import datetime, timedelta
import random


class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ['id', 'balance', 'created_at']
        read_only_fields = ['id', 'created_at']


class VirtualCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = VirtualCard
        fields = [
            'id', 'card_number', 'expiry_month', 'expiry_year', 'cvv',
            'token_id', 'card_type', 'status', 'spending_limit',
            'created_at', 'expires_at'
        ]
        read_only_fields = ['id', 'card_number', 'expiry_month', 'expiry_year', 'cvv', 'token_id', 'created_at', 'expires_at']


class TransactionSerializer(serializers.ModelSerializer):
    virtual_card = VirtualCardSerializer(read_only=True)

    class Meta:
        model = Transaction
        fields = [
            'id', 'virtual_card', 'merchant', 'amount', 'transaction_type',
            'verification_score', 'risk_level', 'created_at'
        ]
        read_only_fields = ['id', 'created_at']


class DashboardSerializer(serializers.Serializer):
    balance = serializers.DecimalField(max_digits=12, decimal_places=2)
    income = serializers.DecimalField(max_digits=12, decimal_places=2)
    expenses = serializers.DecimalField(max_digits=12, decimal_places=2)
    virtual_cards = VirtualCardSerializer(many=True, read_only=True)
    recent_transactions = TransactionSerializer(many=True, read_only=True)
    
    def to_representation(self, instance):
        """Custom representation to handle querysets"""
        representation = super().to_representation(instance)
        representation['virtual_cards'] = VirtualCardSerializer(instance['virtual_cards'], many=True).data
        representation['recent_transactions'] = TransactionSerializer(instance['recent_transactions'], many=True).data
        return representation

