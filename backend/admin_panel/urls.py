from django.urls import path
from . import views

urlpatterns = [
    path('dashboard/', views.admin_dashboard, name='admin_dashboard'),
    path('users/', views.UserMonitoringListView.as_view(), name='user_monitoring'),
    path('biometric-audit/', views.biometric_audit, name='biometric_audit'),
]

