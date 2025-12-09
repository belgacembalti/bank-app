from rest_framework import serializers
from django.contrib.auth import authenticate
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.tokens import RefreshToken
from .models import User, OTPCode, BiometricData, TrustedDevice
from datetime import timedelta
from django.utils import timezone
import random


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'username', 'is_biometric_enabled', 'trust_score', 'created_at']
        read_only_fields = ['id', 'trust_score', 'created_at']


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    enable_biometric = serializers.BooleanField(write_only=True, default=False)

    class Meta:
        model = User
        fields = ['email', 'username', 'password', 'password2', 'enable_biometric']

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        return attrs

    def create(self, validated_data):
        validated_data.pop('password2')
        enable_biometric = validated_data.pop('enable_biometric', False)
        user = User.objects.create_user(
            email=validated_data['email'],
            username=validated_data['username'],
            password=validated_data['password'],
            is_biometric_enabled=enable_biometric
        )
        return user


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    use_2fa = serializers.BooleanField(default=False)

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')

        if email and password:
            user = authenticate(username=email, password=password)
            if not user:
                raise serializers.ValidationError('Invalid email or password.')
            if not user.is_active:
                raise serializers.ValidationError('User account is disabled.')
            attrs['user'] = user
        else:
            raise serializers.ValidationError('Must include "email" and "password".')
        return attrs


class OTPSerializer(serializers.Serializer):
    code = serializers.CharField(max_length=6, min_length=6)


class BiometricDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = BiometricData
        fields = ['encrypted_data', 'is_active', 'created_at', 'last_verified_at']
        read_only_fields = ['created_at', 'last_verified_at']


class TrustedDeviceSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrustedDevice
        fields = ['id', 'device_name', 'device_id', 'ip_address', 'location', 'is_trusted', 'last_used', 'created_at']
        read_only_fields = ['id', 'last_used', 'created_at']

