from rest_framework import status, generics, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.utils import timezone
from datetime import timedelta

from .models import AccessLog, SecurityAlert
from .serializers import (
    AccessLogSerializer, SecurityAlertSerializer, SecurityDashboardSerializer
)
from accounts.models import TrustedDevice


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def security_dashboard(request):
    user = request.user
    
    # Get trust score
    trust_score = user.trust_score
    
    # Biometric status
    biometric_status = 'Active' if user.is_biometric_enabled else 'Inactive'
    
    # Active sessions (trusted devices)
    active_sessions = TrustedDevice.objects.filter(user=user, is_trusted=True)
    active_sessions_list = [
        {
            'id': device.id,
            'device': device.device_name,
            'location': device.location or 'Unknown',
            'ip': str(device.ip_address) if device.ip_address else 'Unknown',
            'current': device.id == active_sessions.first().id if active_sessions.exists() else False
        }
        for device in active_sessions[:5]
    ]
    
    # Login attempts
    login_attempts = AccessLog.objects.filter(user=user)[:10]
    
    # Alerts
    alerts = SecurityAlert.objects.filter(user=user, is_resolved=False)[:10]
    
    data = {
        'trust_score': trust_score,
        'biometric_status': biometric_status,
        'active_sessions': active_sessions.count(),
        'alerts_count': alerts.count(),
        'login_attempts': login_attempts,
        'active_sessions_list': active_sessions_list,
        'alerts': alerts,
    }
    
    serializer = SecurityDashboardSerializer(data)
    return Response(serializer.data)


class AccessLogListView(generics.ListAPIView):
    serializer_class = AccessLogSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return AccessLog.objects.filter(user=self.request.user)


class SecurityAlertListView(generics.ListAPIView):
    serializer_class = SecurityAlertSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return SecurityAlert.objects.filter(user=self.request.user, is_resolved=False)

