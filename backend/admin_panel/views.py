from rest_framework import status, generics, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.db.models import Count, Q, Avg
from django.utils import timezone
from datetime import timedelta
from collections import defaultdict

from accounts.models import User, BiometricData
from security.models import AccessLog, SecurityAlert
from banking.models import Transaction
from .serializers import AdminDashboardSerializer, UserMonitoringSerializer, BiometricAuditSerializer


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def admin_dashboard(request):
    if not request.user.is_staff:
        return Response(
            {'error': 'Permission denied'},
            status=status.HTTP_403_FORBIDDEN
        )
    
    # Total users
    total_users = User.objects.count()
    
    # Auth success rate
    last_7_days = timezone.now() - timedelta(days=7)
    total_logins = AccessLog.objects.filter(created_at__gte=last_7_days).count()
    successful_logins = AccessLog.objects.filter(
        created_at__gte=last_7_days,
        status='success'
    ).count()
    auth_success_rate = (successful_logins / total_logins * 100) if total_logins > 0 else 0
    
    # Active threats
    active_threats = SecurityAlert.objects.filter(
        is_resolved=False,
        severity__in=['high', 'critical']
    ).count()
    
    # Avg response time (mock)
    avg_response_time = 245
    
    # Login trends (last 7 days)
    login_trends = []
    for i in range(7):
        date = timezone.now() - timedelta(days=6-i)
        day_start = date.replace(hour=0, minute=0, second=0, microsecond=0)
        day_end = day_start + timedelta(days=1)
        
        success = AccessLog.objects.filter(
            created_at__gte=day_start,
            created_at__lt=day_end,
            status='success'
        ).count()
        
        failed = AccessLog.objects.filter(
            created_at__gte=day_start,
            created_at__lt=day_end,
            status='failed'
        ).count()
        
        blocked = AccessLog.objects.filter(
            created_at__gte=day_start,
            created_at__lt=day_end,
            status='blocked'
        ).count()
        
        login_trends.append({
            'date': day_start.strftime('%m/%d'),
            'success': success,
            'failed': failed,
            'blocked': blocked,
        })
    
    # Biometric accuracy (mock data)
    biometric_accuracy = {
        'excellent': 85,
        'good': 12,
        'poor': 3,
    }
    
    # Risk distribution by hour
    risk_distribution = []
    hours = ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00']
    for hour in hours:
        hour_int = int(hour.split(':')[0])
        hour_start = timezone.now().replace(hour=hour_int, minute=0, second=0, microsecond=0)
        hour_end = hour_start + timedelta(hours=4)
        
        transactions = Transaction.objects.filter(
            created_at__gte=hour_start,
            created_at__lt=hour_end
        )
        
        low = transactions.filter(risk_level='low').count()
        medium = transactions.filter(risk_level='medium').count()
        high = transactions.filter(risk_level='high').count()
        
        risk_distribution.append({
            'hour': hour,
            'low': low,
            'medium': medium,
            'high': high,
        })
    
    # Recent alerts
    recent_alerts = SecurityAlert.objects.filter(is_resolved=False).order_by('-created_at')[:10]
    alerts_data = [
        {
            'id': alert.id,
            'type': alert.alert_type,
            'user': alert.user.email if alert.user else 'System',
            'time': alert.created_at.strftime('%Y-%m-%d %H:%M:%S'),
            'severity': alert.severity,
        }
        for alert in recent_alerts
    ]
    
    data = {
        'total_users': total_users,
        'auth_success_rate': round(auth_success_rate, 1),
        'active_threats': active_threats,
        'avg_response_time': avg_response_time,
        'login_trends': login_trends,
        'biometric_accuracy': biometric_accuracy,
        'risk_distribution': risk_distribution,
        'recent_alerts': alerts_data,
    }
    
    serializer = AdminDashboardSerializer(data)
    return Response(serializer.data)


class UserMonitoringListView(generics.ListAPIView):
    serializer_class = UserMonitoringSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        if not self.request.user.is_staff:
            return User.objects.none()
        return User.objects.all().order_by('-created_at')


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def biometric_audit(request):
    if not request.user.is_staff:
        return Response(
            {'error': 'Permission denied'},
            status=status.HTTP_403_FORBIDDEN
        )
    
    users_with_biometric = User.objects.filter(is_biometric_enabled=True)
    audit_data = []
    
    for user in users_with_biometric:
        if hasattr(user, 'biometric_data'):
            biometric = user.biometric_data
            # Mock verification count and success rate
            audit_data.append({
                'user': user.email,
                'verification_count': 42,  # Mock data
                'success_rate': 98.5,  # Mock data
                'last_verified': biometric.last_verified_at,
            })
    
    serializer = BiometricAuditSerializer(audit_data, many=True)
    return Response(serializer.data)

