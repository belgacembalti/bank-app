from django.contrib import admin
from .models import AccessLog, SecurityAlert


@admin.register(AccessLog)
class AccessLogAdmin(admin.ModelAdmin):
    list_display = ['user', 'device_name', 'ip_address', 'status', 'created_at']
    list_filter = ['status', 'created_at']
    search_fields = ['user__email', 'device_name', 'ip_address']


@admin.register(SecurityAlert)
class SecurityAlertAdmin(admin.ModelAdmin):
    list_display = ['user', 'alert_type', 'severity', 'is_resolved', 'created_at']
    list_filter = ['alert_type', 'severity', 'is_resolved', 'created_at']
    search_fields = ['user__email', 'message']

