from django.db import models
from django.contrib.auth import get_user_model


class VirtualCard(models.Model):
    """
    Minimal virtual card representation for demo purposes.
    Stores only the data required by the frontend to display a card.
    """

    STATUS_ACTIVE = "active"
    STATUS_FROZEN = "frozen"

    user = models.ForeignKey(
        get_user_model(),
        on_delete=models.CASCADE,
        related_name="virtual_cards",
    )
    card_number = models.CharField(max_length=19)  # stored with spaces (#### #### #### ####)
    expiry_month = models.PositiveSmallIntegerField()
    expiry_year = models.PositiveSmallIntegerField()
    cvv = models.CharField(max_length=4)
    token_id = models.CharField(max_length=32, unique=True)
    status = models.CharField(max_length=16, default=STATUS_ACTIVE)
    spending_limit = models.DecimalField(max_digits=10, decimal_places=2, default=1000)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ("-created_at",)

    def __str__(self):
        return f"{self.user.username} - {self.token_id}"
