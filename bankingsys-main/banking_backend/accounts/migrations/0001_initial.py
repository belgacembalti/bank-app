from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='VirtualCard',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('card_number', models.CharField(max_length=19)),
                ('expiry_month', models.PositiveSmallIntegerField()),
                ('expiry_year', models.PositiveSmallIntegerField()),
                ('cvv', models.CharField(max_length=4)),
                ('token_id', models.CharField(max_length=32, unique=True)),
                ('status', models.CharField(default='active', max_length=16)),
                ('spending_limit', models.DecimalField(decimal_places=2, default=1000, max_digits=10)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='virtual_cards', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ('-created_at',),
            },
        ),
    ]

