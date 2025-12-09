from django.db import models
from accounts.models import User
from django.utils import timezone


class AccessLog(models.Model):
    STATUS_CHOICES = [
        ('success', 'Success'),
        ('failed', 'Failed'),
        ('blocked', 'Blocked'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='access_logs', null=True, blank=True)
    device_name = models.CharField(max_length=255)
    ip_address = models.GenericIPAddressField()
    location = models.CharField(max_length=255, null=True, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.status} - {self.device_name} - {self.created_at}"


class SecurityAlert(models.Model):
    SEVERITY_CHOICES = [
        ('low', 'Low'),
        ('medium', 'Medium'),
        ('high', 'High'),
        ('critical', 'Critical'),
    ]

    ALERT_TYPES = [
        ('suspicious_login', 'Suspicious Login'),
        ('multiple_failed_attempts', 'Multiple Failed Attempts'),
        ('new_device', 'New Device Authorized'),
        ('unusual_location', 'Unusual Location'),
        ('high_risk_transaction', 'High Risk Transaction'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='security_alerts', null=True, blank=True)
    alert_type = models.CharField(max_length=50, choices=ALERT_TYPES)
    severity = models.CharField(max_length=20, choices=SEVERITY_CHOICES)
    message = models.TextField()
    is_resolved = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.alert_type} - {self.severity} - {self.created_at}"

