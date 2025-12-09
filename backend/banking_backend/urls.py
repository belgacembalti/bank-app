"""
URL configuration for banking_backend project.
"""
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('accounts.urls')),
    path('api/banking/', include('banking.urls')),
    path('api/security/', include('security.urls')),
    path('api/admin/', include('admin_panel.urls')),
]

