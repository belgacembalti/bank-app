from rest_framework import serializers
from accounts.models import User
from security.models import AccessLog, SecurityAlert
from banking.models import Transaction, VirtualCard


class AdminDashboardSerializer(serializers.Serializer):
    total_users = serializers.IntegerField()
    auth_success_rate = serializers.FloatField()
    active_threats = serializers.IntegerField()
    avg_response_time = serializers.IntegerField()
    login_trends = serializers.ListField()
    biometric_accuracy = serializers.DictField()
    risk_distribution = serializers.ListField()
    recent_alerts = serializers.ListField()


class UserMonitoringSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'username', 'is_biometric_enabled', 'trust_score', 'created_at', 'last_login']
        read_only_fields = ['id', 'created_at', 'last_login']


class BiometricAuditSerializer(serializers.Serializer):
    user = serializers.CharField()
    verification_count = serializers.IntegerField()
    success_rate = serializers.FloatField()
    last_verified = serializers.DateTimeField()

