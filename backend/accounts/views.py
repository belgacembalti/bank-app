from rest_framework import status, generics, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.utils import timezone
from datetime import timedelta
import random

from .models import User, OTPCode, BiometricData, TrustedDevice
from .serializers import (
    UserSerializer, RegisterSerializer, LoginSerializer,
    OTPSerializer, BiometricDataSerializer, TrustedDeviceSerializer
)


# ---------------------- REGISTER ----------------------
@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def register(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        refresh = RefreshToken.for_user(user)

        return Response({
            'user': UserSerializer(user).data,
            'tokens': {
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }
        }, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



# ---------------------- LOGIN ----------------------
@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def login(request):
    serializer = LoginSerializer(data=request.data)

    if serializer.is_valid():
        user = serializer.validated_data['user']
        use_2fa = serializer.validated_data.get('use_2fa', False)

        if use_2fa:
            # Generate OTP
            code = ''.join([str(random.randint(0, 9)) for _ in range(6)])
            expires_at = timezone.now() + timedelta(minutes=5)

            OTPCode.objects.create(
                user=user,
                code=code,
                expires_at=expires_at
            )

            # Send via email/SMS here in production
            return Response({
                'message': 'OTP sent to your email',
                'otp_required': True
            }, status=status.HTTP_200_OK)

        # -------- If 2FA disabled => return tokens --------
        refresh = RefreshToken.for_user(user)

        # Track device
        device_id = request.META.get('HTTP_DEVICE_ID')
        if device_id:
            TrustedDevice.objects.update_or_create(
                device_id=device_id,
                user=user,
                defaults={
                    'device_name': request.META.get('HTTP_DEVICE_NAME', 'Unknown'),
                    'ip_address': request.META.get('REMOTE_ADDR'),
                    'is_trusted': True,
                }
            )

        return Response({
            'user': UserSerializer(user).data,
            'tokens': {
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }
        }, status=status.HTTP_200_OK)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



# ---------------------- VERIFY OTP ----------------------
@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def verify_otp(request):
    serializer = OTPSerializer(data=request.data)

    if serializer.is_valid():
        code = serializer.validated_data['code']
        email = serializer.validated_data['email']

        try:
            user = User.objects.get(email=email)

            otp = OTPCode.objects.filter(
                user=user,
                code=code,
                is_used=False,
                expires_at__gt=timezone.now()
            ).order_by('-created_at').first()

            if otp is None:
                return Response({'error': 'Invalid or expired OTP code'},
                                status=status.HTTP_400_BAD_REQUEST)

            otp.is_used = True
            otp.save()

            refresh = RefreshToken.for_user(user)

            # Track device
            device_id = request.META.get('HTTP_DEVICE_ID')
            if device_id:
                TrustedDevice.objects.update_or_create(
                    device_id=device_id,
                    user=user,
                    defaults={
                        'device_name': request.META.get('HTTP_DEVICE_NAME', 'Unknown'),
                        'ip_address': request.META.get('REMOTE_ADDR'),
                        'is_trusted': True,
                    }
                )

            return Response({
                'user': UserSerializer(user).data,
                'tokens': {
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                }
            }, status=status.HTTP_200_OK)

        except User.DoesNotExist:
            return Response({'error': 'User not found'},
                            status=status.HTTP_400_BAD_REQUEST)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



# ---------------------- BIOMETRIC (FACIAL) LOGIN ----------------------
@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def facial_login(request):
    """
    Expected input:
    {
        "email": "...",
        "biometric_token": "...encrypted data..."
    }
    """
    email = request.data.get("email")
    biometric_token = request.data.get("biometric_token")

    if not email or not biometric_token:
        return Response({"error": "email and biometric_token required"},
                        status=status.HTTP_400_BAD_REQUEST)

    try:
        user = User.objects.get(email=email)

        if not hasattr(user, "biometric_data"):
            return Response({"error": "Biometric login not enabled"},
                            status=status.HTTP_400_BAD_REQUEST)

        # In production → verify facial match using ML model
        if biometric_token != user.biometric_data.encrypted_data:
            return Response({"error": "Biometric verification failed"},
                            status=status.HTTP_401_UNAUTHORIZED)

        # Update last verification
        user.biometric_data.last_verified_at = timezone.now()
        user.biometric_data.save()

        # Issue token
        refresh = RefreshToken.for_user(user)

        # Track device
        device_id = request.META.get('HTTP_DEVICE_ID')
        if device_id:
            TrustedDevice.objects.update_or_create(
                device_id=device_id,
                user=user,
                defaults={
                    'device_name': request.META.get('HTTP_DEVICE_NAME', 'Unknown'),
                    'ip_address': request.META.get('REMOTE_ADDR'),
                    'is_trusted': True,
                }
            )

        return Response({
            "message": "Biometric login successful",
            "user": UserSerializer(user).data,
            "tokens": {
                "refresh": str(refresh),
                "access": str(refresh.access_token)
            }
        }, status=status.HTTP_200_OK)

    except User.DoesNotExist:
        return Response({"error": "User not found"},
                        status=status.HTTP_404_NOT_FOUND)



# ---------------------- CURRENT USER ----------------------
@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def get_current_user(request):
    return Response(UserSerializer(request.user).data)




# ---------------------- SAVE BIOMETRIC DATA ----------------------
@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def save_biometric_data(request):
    user = request.user
    serializer = BiometricDataSerializer(data=request.data)

    if serializer.is_valid():
        biometric_data, created = BiometricData.objects.update_or_create(
            user=user,
            defaults={
                "encrypted_data": serializer.validated_data["encrypted_data"],
                "is_active": True,
            }
        )

        user.is_biometric_enabled = True
        user.save()

        return Response(BiometricDataSerializer(biometric_data).data,
                        status=status.HTTP_200_OK)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



# ---------------------- TRUSTED DEVICES ----------------------
class TrustedDeviceListCreateView(generics.ListCreateAPIView):
    serializer_class = TrustedDeviceSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return TrustedDevice.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)



class TrustedDeviceDeleteView(generics.DestroyAPIView):
    serializer_class = TrustedDeviceSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return TrustedDevice.objects.filter(user=self.request.user)
