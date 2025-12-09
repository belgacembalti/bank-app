from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.register, name='register'),
    path('login/', views.login, name='login'),
    path('verify-otp/', views.verify_otp, name='verify_otp'),
    path('facial-login/', views.facial_login, name='facial_login'),
    path('me/', views.get_current_user, name='get_current_user'),
    path('biometric/', views.save_biometric_data, name='save_biometric_data'),
    path('devices/', views.TrustedDeviceListCreateView.as_view(), name='trusted_devices'),
    path('devices/<int:pk>/', views.TrustedDeviceDeleteView.as_view(), name='delete_device'),
]

