from django.utils import timezone
from security.models import AccessLog


class AccessLoggingMiddleware:
    """
    Middleware to log all access attempts
    """
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Log access after response
        response = self.get_response(request)
        
        # Only log authenticated requests to auth endpoints
        if request.path.startswith('/api/auth/') and request.user.is_authenticated:
            device_name = request.META.get('HTTP_DEVICE_NAME', 'Unknown Device')
            ip_address = request.META.get('REMOTE_ADDR')
            
            # Determine status based on response
            if response.status_code == 200:
                status = 'success'
            elif response.status_code == 401 or response.status_code == 403:
                status = 'failed'
            else:
                status = 'blocked'
            
            AccessLog.objects.create(
                user=request.user if request.user.is_authenticated else None,
                device_name=device_name,
                ip_address=ip_address,
                status=status
            )
        
        return response

