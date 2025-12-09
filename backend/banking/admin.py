from django.contrib import admin
from .models import Account, VirtualCard, Transaction


@admin.register(Account)
class AccountAdmin(admin.ModelAdmin):
    list_display = ['user', 'balance', 'created_at']
    list_filter = ['created_at']
    search_fields = ['user__email']


@admin.register(VirtualCard)
class VirtualCardAdmin(admin.ModelAdmin):
    list_display = ['user', 'card_number', 'token_id', 'status', 'card_type', 'created_at']
    list_filter = ['status', 'card_type', 'created_at']
    search_fields = ['user__email', 'card_number', 'token_id']


@admin.register(Transaction)
class TransactionAdmin(admin.ModelAdmin):
    list_display = ['user', 'merchant', 'amount', 'transaction_type', 'risk_level', 'created_at']
    list_filter = ['transaction_type', 'risk_level', 'created_at']
    search_fields = ['user__email', 'merchant']

