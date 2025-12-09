from django.urls import path
from . import views

urlpatterns = [
    path('dashboard/', views.dashboard, name='dashboard'),
    path('account/balance/', views.account_balance, name='account_balance'),
    path('cards/', views.VirtualCardListCreateView.as_view(), name='virtual_cards'),
    path('cards/<int:pk>/', views.VirtualCardDetailView.as_view(), name='virtual_card_detail'),
    path('transactions/', views.TransactionListView.as_view(), name='transactions'),
]

