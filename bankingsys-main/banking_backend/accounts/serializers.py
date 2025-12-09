from django.contrib.auth.models import User
from rest_framework import serializers

from .models import VirtualCard


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ("username", "email", "password")

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"],
        )
        return user


class VirtualCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = VirtualCard
        fields = (
            "id",
            "card_number",
            "expiry_month",
            "expiry_year",
            "cvv",
            "token_id",
            "status",
            "spending_limit",
            "created_at",
        )
        read_only_fields = (
            "id",
            "card_number",
            "expiry_month",
            "expiry_year",
            "cvv",
            "token_id",
            "status",
            "created_at",
        )

    def create(self, validated_data):
        """
        Override creation to auto-generate the secure card details server-side.
        """
        from secrets import token_hex
        from random import randint

        user = self.context["request"].user

        raw_number = "".join(str(randint(0, 9)) for _ in range(16))
        formatted_number = " ".join(raw_number[i:i + 4] for i in range(0, 16, 4))
        expiry_month = randint(1, 12)
        expiry_year = randint(25, 30)  # demo range: 2025-2030
        cvv = f"{randint(100, 999)}"
        token_id = f"TKN-{token_hex(4).upper()}"

        return VirtualCard.objects.create(
            user=user,
            card_number=formatted_number,
            expiry_month=expiry_month,
            expiry_year=expiry_year,
            cvv=cvv,
            token_id=token_id,
            status=VirtualCard.STATUS_ACTIVE,
            spending_limit=validated_data.get("spending_limit", 1000),
        )
