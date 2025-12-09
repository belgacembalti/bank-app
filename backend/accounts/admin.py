from django.contrib import admin
from .models import User, OTPCode, BiometricData, TrustedDevice


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ['email', 'username', 'is_biometric_enabled', 'trust_score', 'is_staff', 'created_at']
    list_filter = ['is_staff', 'is_biometric_enabled', 'created_at']
    search_fields = ['email', 'username']


@admin.register(OTPCode)
class OTPCodeAdmin(admin.ModelAdmin):
    list_display = ['user', 'code', 'is_used', 'created_at', 'expires_at']
    list_filter = ['is_used', 'created_at']
    search_fields = ['user__email', 'code']


@admin.register(BiometricData)
class BiometricDataAdmin(admin.ModelAdmin):
    list_display = ['user', 'is_active', 'created_at', 'last_verified_at']
    list_filter = ['is_active', 'created_at']
    search_fields = ['user__email']


@admin.register(TrustedDevice)
class TrustedDeviceAdmin(admin.ModelAdmin):
    list_display = ['user', 'device_name', 'ip_address', 'is_trusted', 'last_used']
    list_filter = ['is_trusted', 'created_at']
    search_fields = ['user__email', 'device_name', 'device_id']

