# Generated by Django 4.1.4 on 2022-12-24 01:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('eventcalendar', '0005_alter_appointment_duration_alter_service_duration'),
    ]

    operations = [
        migrations.AlterField(
            model_name='appointment',
            name='end_hour',
            field=models.DateTimeField(),
        ),
        migrations.AlterField(
            model_name='appointment',
            name='start_hour',
            field=models.DateTimeField(),
        ),
    ]
