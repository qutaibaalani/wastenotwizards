# Generated by Django 4.2.3 on 2023-07-20 18:37

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('WasteNotWizards', '0005_remove_user_user_type_user_is_provider_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='user',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]