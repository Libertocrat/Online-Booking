# Generated by Django 4.1.4 on 2022-12-24 02:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('eventcalendar', '0007_remove_appointment_duration'),
    ]

    operations = [
        migrations.AlterField(
            model_name='appointment',
            name='end_hour',
            field=models.TimeField(),
        ),
        migrations.AlterField(
            model_name='appointment',
            name='start_hour',
            field=models.TimeField(),
        ),
    ]
