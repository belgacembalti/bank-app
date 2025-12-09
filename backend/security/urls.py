from django.urls import path
from . import views

urlpatterns = [
    path('dashboard/', views.security_dashboard, name='security_dashboard'),
    path('access-logs/', views.AccessLogListView.as_view(), name='access_logs'),
    path('alerts/', views.SecurityAlertListView.as_view(), name='security_alerts'),
]

