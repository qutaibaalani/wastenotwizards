# Generated by Django 4.2.3 on 2023-08-02 21:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('WasteNotWizards', '0014_post_reservation_status_post_reservation_time'),
    ]

    operations = [
        migrations.AddField(
            model_name='reservation',
            name='lat',
            field=models.CharField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='reservation',
            name='long',
            field=models.CharField(blank=True, null=True),
        ),
    ]