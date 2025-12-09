from rest_framework import status, generics, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.db.models import Sum, Q
from django.utils import timezone
from datetime import datetime, timedelta
import random

from .models import Account, VirtualCard, Transaction
from .serializers import (
    AccountSerializer, VirtualCardSerializer,
    TransactionSerializer, DashboardSerializer
)


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def dashboard(request):
    user = request.user
    
    # Get or create account
    account, _ = Account.objects.get_or_create(user=user)
    
    # Calculate income and expenses
    income = Transaction.objects.filter(
        user=user,
        transaction_type='deposit',
        created_at__gte=timezone.now() - timedelta(days=30)
    ).aggregate(total=Sum('amount'))['total'] or 0
    
    expenses = abs(Transaction.objects.filter(
        user=user,
        transaction_type__in=['purchase', 'withdrawal'],
        amount__lt=0,
        created_at__gte=timezone.now() - timedelta(days=30)
    ).aggregate(total=Sum('amount'))['total'] or 0)
    
    # Get virtual cards
    virtual_cards = VirtualCard.objects.filter(user=user, status='active')[:2]
    
    # Get recent transactions
    recent_transactions = Transaction.objects.filter(user=user)[:10]
    
    data = {
        'balance': account.balance,
        'income': income,
        'expenses': expenses,
        'virtual_cards': virtual_cards,
        'recent_transactions': recent_transactions,
    }
    
    serializer = DashboardSerializer(data)
    return Response(serializer.data)


class VirtualCardListCreateView(generics.ListCreateAPIView):
    serializer_class = VirtualCardSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return VirtualCard.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        # Generate card details
        card_number = VirtualCard.generate_card_number()
        expiry_date = timezone.now() + timedelta(days=365 * 2)
        cvv = ''.join([str(random.randint(0, 9)) for _ in range(3)])
        token_id = VirtualCard.generate_token_id()
        
        card = serializer.save(
            user=self.request.user,
            card_number=card_number,
            expiry_month=expiry_date.month,
            expiry_year=expiry_date.year,
            cvv=cvv,
            token_id=token_id,
            expires_at=expiry_date
        )
        return card


class VirtualCardDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = VirtualCardSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return VirtualCard.objects.filter(user=self.request.user)


class TransactionListView(generics.ListAPIView):
    serializer_class = TransactionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Transaction.objects.filter(user=self.request.user)


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def account_balance(request):
    account, _ = Account.objects.get_or_create(user=request.user)
    return Response({
        'balance': account.balance,
        'account_id': account.id
    })

