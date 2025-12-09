from rest_framework import serializers
from .models import AccessLog, SecurityAlert


class AccessLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = AccessLog
        fields = ['id', 'device_name', 'ip_address', 'location', 'status', 'created_at']
        read_only_fields = ['id', 'created_at']


class SecurityAlertSerializer(serializers.ModelSerializer):
    class Meta:
        model = SecurityAlert
        fields = ['id', 'alert_type', 'severity', 'message', 'is_resolved', 'created_at']
        read_only_fields = ['id', 'created_at']


class SecurityDashboardSerializer(serializers.Serializer):
    trust_score = serializers.IntegerField()
    biometric_status = serializers.CharField()
    active_sessions = serializers.IntegerField()
    alerts_count = serializers.IntegerField()
    login_attempts = AccessLogSerializer(many=True)
    active_sessions_list = serializers.ListField()
    alerts = SecurityAlertSerializer(many=True)

