map-markers


from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('WasteNotWizards', '0011_alter_post_posted_by_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='reservation',
            name='post',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='WasteNotWizards.post'),
        ),
        migrations.AlterField(
            model_name='reservation',
            name='receiver',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
